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
import { createHash } from "node:crypto";
import { LIMITS, checkRate, clientKey, sameSiteOnly } from "@/lib/api-guards";
import { normalizePhone } from "@/lib/phone";

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

type UserData = { em?: string; ph?: string; external_id?: string };
type CustomData = Record<string, unknown>;

type Body = {
  event_name?: string;
  event_id?: string;
  user_data?: UserData;
  custom_data?: CustomData;
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashUserData(u: UserData): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  if (u.em) out.em = sha256(u.em.trim().toLowerCase());
  // v25.5: normalize to country-code digits before hashing. Hashing the
  // number exactly as typed produced a value Meta's own hash could never
  // match, silently degrading match quality on every Lead.
  if (u.ph) {
    const ph = normalizePhone(u.ph);
    if (ph) out.ph = sha256(ph);
  }
  if (u.external_id) out.external_id = sha256(u.external_id);
  return out;
}

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

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testEventCode = process.env.META_TEST_EVENT_CODE;
  const isProd = process.env.NODE_ENV === "production";

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

  if (!pixelId || !accessToken) {
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

  const event = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id,
    action_source: "website",
    event_source_url: req.headers.get("referer") ?? undefined,
    user_data: {
      ...hashUserData(mergedUserData),
      // Pixel cookies are sent raw, not hashed (Meta's spec).
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
      client_ip_address: clientIp(req),
      client_user_agent: req.headers.get("user-agent") ?? undefined,
    },
    custom_data: pickCustomData(custom_data),
  };

  const payload: Record<string, unknown> = {
    data: [event],
    access_token: accessToken,
  };
  // Attach test_event_code only in non-production so Test Events tab
  // catches preview + dev traffic without polluting prod conversions.
  if (!isProd && testEventCode) {
    payload.test_event_code = testEventCode;
  }

  // 5 s outbound timeout so a slow Meta response doesn't hang the
  // serverless function until Vercel kills it (which previously
  // looked like "CAPI event silently lost").
  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );
    clearTimeout(timeoutHandle);

    if (!res.ok) {
      // Pull fbtrace_id out of the response so the next debugging
      // session has something to grep for in Meta's logs.
      const text = await res.text();
      let fbtrace_id: string | undefined;
      try {
        const parsed = JSON.parse(text);
        fbtrace_id = parsed?.error?.fbtrace_id;
      } catch {
        // Non-JSON response, skip.
      }
      // v25.5: structured so a broken forward is greppable in Vercel logs
      // rather than buried in prose. The browser never sees this failure
      // (fireServer is fire and forget), so the log is the only signal.
      console.error(
        JSON.stringify({
          route: "meta-capi",
          event: "forward_failed",
          event_name,
          status: res.status,
          fbtrace_id: fbtrace_id ?? null,
          body: text.slice(0, 300),
        }),
      );
      return NextResponse.json(
        { ok: false, error: `meta_${res.status}`, fbtrace_id },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    clearTimeout(timeoutHandle);
    const err = e as Error;
    const reason = err.name === "AbortError" ? "timeout_5s" : err.message;
    console.error(
      JSON.stringify({
        route: "meta-capi",
        event: "forward_threw",
        event_name,
        reason,
      }),
    );
    return NextResponse.json(
      { ok: false, error: `fetch_failed_${reason}` },
      { status: 502 },
    );
  }
}
