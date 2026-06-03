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

  const event = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id,
    action_source: "website",
    event_source_url: req.headers.get("referer") ?? undefined,
    user_data: {
      ...hashUserData(user_data),
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

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      const text = await res.text();
      // Log status only, no body, no PII.
      // eslint-disable-next-line no-console
      console.error(`[meta-capi] ${event_name} failed ${res.status}`, text.slice(0, 200));
      return NextResponse.json(
        { ok: false, error: `meta_${res.status}` },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`[meta-capi] ${event_name} threw`, (e as Error).message);
    return NextResponse.json(
      { ok: false, error: "fetch_failed" },
      { status: 502 },
    );
  }
}
