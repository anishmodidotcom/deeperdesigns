// Meta Conversions API server-side endpoint.
//
// Every event fired from the browser via lib/meta-events.ts is also
// POSTed here. We forward to Meta's CAPI with the same event_id, so
// Meta deduplicates the pair and we recover iOS 14+ users where the
// browser Pixel signal is degraded.
//
// PII hashing per Meta spec:
//   - em (email)        → SHA-256(lowercase trim)
//   - ph (phone)        → SHA-256(digits only, with country code)
//   - external_id       → SHA-256(value)
// IP + UA are sent raw (Meta wants them un-hashed for match quality).
//
// v18.1: pull _fbp, _fbc, and dd_visitor_id from cookies on every
// request and feed them to Meta. The first two are the cookies
// fbevents.js writes when the Pixel loads; without them Meta can't
// link CAPI events to the same browser identity that fired the Pixel,
// and EMQ caps at ~3.0. dd_visitor_id is set by a beforeInteractive
// inline script in app/layout.tsx; hashed and sent as external_id so
// returning visitors aggregate. Also adds a 5 s timeout on the
// outbound fetch and logs Meta's fbtrace_id so silent failures stop
// being silent.

import { NextResponse } from "next/server";
import { LIMITS, checkRate, clientKey, sameSiteOnly } from "@/lib/api-guards";
import {
  type CapiUserData,
  isCapiConfigured,
  sendCapiEvent,
} from "@/lib/meta-capi";

export const runtime = "nodejs";

// v25.5: this route forwards to Meta using the server access token, and
// used to accept any event name with any custom_data from any caller with
// no origin check and no rate limit. That is an open relay into the pixel
// dataset. Only the names lib/meta-events.ts can emit are accepted.
const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "Lead",
  "Contact",
  "InitiateCheckout",
  "ShowcaseScrolled75",
  "LiveProductCTAClick",
  "WhatsAppOpenedFromShowcase",
  "ForPageView",
  "ForScrolled75",
  "ForBuildCTAClick",
  "ForLeadCTAClick",
  "ForWhatsAppClick",
  "LeadFormStart",
  "CommunityFormStart",
  "CommunityJoin",
  // v26: teardown and partner offers, plus the software index.
  "TeardownRequest",
  "PartnerEnquiry",
  "SoftwareIndexView",
  // v29: Preflight. Purchase is a standard event and is fired server-side
  // first by the fulfilment routine, then echoed by the browser on the
  // thank-you page under the same event_id so Meta deduplicates.
  "Purchase",
  "PreflightView",
]);

// v25.5: custom_data is forwarded key by key, not verbatim, so a caller
// cannot inject arbitrary fields into the dataset.
const ALLOWED_CUSTOM_KEYS = new Set([
  "content_name",
  "content_category",
  "content_ids",
  "content_type",
  "source_page",
  "value_band",
  "showcase_slug",
  "showcase_industry",
  "for_slug",
  "for_industry",
  "product",
  "industry",
  "build",
  "cta",
  "path",
  "source",
  "category",
  // v29: Purchase carries a real money value, which Meta reads off
  // custom_data rather than the event root.
  "value",
  "currency",
  "num_items",
]);

const CUSTOM_VALUE_MAX = 200;

function pickCustomData(input: CustomData): CustomData {
  const out: CustomData = {};
  for (const [key, value] of Object.entries(input)) {
    if (!ALLOWED_CUSTOM_KEYS.has(key)) continue;
    if (typeof value === "string") {
      out[key] = value.slice(0, CUSTOM_VALUE_MAX);
    } else if (typeof value === "number" || typeof value === "boolean") {
      out[key] = value;
    } else if (Array.isArray(value)) {
      out[key] = value
        .filter((v): v is string => typeof v === "string")
        .slice(0, 10)
        .map((v) => v.slice(0, CUSTOM_VALUE_MAX));
    }
  }
  return out;
}

type UserData = CapiUserData;
type CustomData = Record<string, unknown>;

type Body = {
  event_name?: string;
  event_id?: string;
  user_data?: UserData;
  custom_data?: CustomData;
};


function clientIp(req: Request): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return undefined;
}

// Parse a single cookie value from the Cookie header without depending
// on next/headers (which would force this route to be dynamic). Cookies
// flow automatically on same-origin POSTs.
function readCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return undefined;
}

export async function POST(req: Request) {
  // v25.5: same-site callers only, and rate limited like the form routes.
  if (!sameSiteOnly(req)) {
    return NextResponse.json(
      { ok: false, error: "forbidden" },
      { status: 403 },
    );
  }
  const rate = await checkRate(
    `capi:${clientKey(req)}`,
    LIMITS.capi.limit,
    LIMITS.capi.windowMs,
  );
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  // v25.5: the request is validated before the credentials check, which
  // used to short-circuit first. Validation should not depend on whether
  // the deployment happens to be configured, and a caller sending a bad
  // payload should hear about it either way.
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const { event_name, event_id, user_data = {}, custom_data = {} } = body;
  if (!event_name || !event_id) {
    return NextResponse.json(
      { ok: false, error: "missing_event_name_or_id" },
      { status: 400 },
    );
  }
  if (!ALLOWED_EVENTS.has(event_name)) {
    console.error(
      JSON.stringify({
        route: "meta-capi",
        event: "event_name_rejected",
        event_name: event_name.slice(0, 64),
      }),
    );
    return NextResponse.json(
      { ok: false, error: "unknown_event_name" },
      { status: 400 },
    );
  }

  if (!isCapiConfigured()) {
    // Credentials not provisioned (local dev or pre-config deploy).
    // Return ok so the browser doesn't bubble a network failure to the
    // user; the event still fires browser-side via fbq.
    return NextResponse.json({ ok: true, skipped: "credentials_missing" });
  }

  // v18.1: pull the Pixel-side identifiers Meta uses for matching.
  const fbp = readCookie(req, "_fbp");
  const fbc = readCookie(req, "_fbc");
  const visitorId = readCookie(req, "dd_visitor_id");

  // Merge client-supplied user_data (currently empty from the typed
  // wrappers, future-proofed for form-bearing events with em/ph) with
  // server-derived identifiers. external_id prefers an explicit value
  // from the client; falls back to the visitor cookie.
  const mergedUserData: UserData = {
    ...user_data,
    external_id: user_data.external_id ?? visitorId,
  };

  const result = await sendCapiEvent({
    event_name,
    event_id,
    user_data: mergedUserData,
    custom_data: pickCustomData(custom_data),
    event_source_url: req.headers.get("referer") ?? undefined,
    client_ip_address: clientIp(req),
    client_user_agent: req.headers.get("user-agent") ?? undefined,
    fbp,
    fbc,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, fbtrace_id: result.fbtrace_id },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
