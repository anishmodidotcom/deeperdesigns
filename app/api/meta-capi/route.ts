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

export const runtime = "nodejs";

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
  if (u.ph) out.ph = sha256(u.ph.replace(/\D+/g, ""));
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
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testEventCode = process.env.META_TEST_EVENT_CODE;
  const isProd = process.env.NODE_ENV === "production";

  if (!pixelId || !accessToken) {
    // Credentials not provisioned (local dev or pre-config deploy).
    // Return ok so the browser doesn't bubble a network failure to the
    // user; the event still fires browser-side via fbq.
    return NextResponse.json({ ok: true, skipped: "credentials_missing" });
  }

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
    custom_data,
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
      // eslint-disable-next-line no-console
      console.error(
        `[meta-capi] ${event_name} failed status=${res.status} fbtrace_id=${fbtrace_id ?? "none"} body=${text.slice(0, 200)}`,
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
    // eslint-disable-next-line no-console
    console.error(`[meta-capi] ${event_name} threw ${reason}`);
    return NextResponse.json(
      { ok: false, error: `fetch_failed_${reason}` },
      { status: 502 },
    );
  }
}
