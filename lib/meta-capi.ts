// Meta Conversions API forwarder.
//
// v29 lifts the payload build and the outbound POST out of
// app/api/meta-capi/route.ts so a server-side event can be sent without
// an HTTP hop back into our own API. The route still owns request
// concerns (same-site guard, rate limit, cookie and header extraction)
// and calls sendCapiEvent() with what it read; the Preflight fulfilment
// routine calls it directly, because the route deliberately rejects
// callers that are not the site's own browser (sameSiteOnly), which a
// server-to-server fetch from a webhook can never satisfy.

import { createHash } from "node:crypto";
import { normalizePhone } from "@/lib/phone";

export type CapiUserData = {
  em?: string;
  ph?: string;
  external_id?: string;
};

export type CapiCustomData = Record<string, unknown>;

export type CapiEvent = {
  event_name: string;
  event_id: string;
  // Raw, unhashed. Hashed here per Meta's spec before sending.
  user_data?: CapiUserData;
  custom_data?: CapiCustomData;
  event_source_url?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  // Pixel cookies, sent raw (Meta's spec).
  fbp?: string;
  fbc?: string;
};

export type CapiResult =
  | { ok: true; skipped?: "credentials_missing" }
  | { ok: false; error: string; status?: number; fbtrace_id?: string };

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function hashUserData(
  u: CapiUserData,
): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  if (u.em) out.em = sha256(u.em.trim().toLowerCase());
  // Normalize to country-code digits before hashing. Hashing the number
  // exactly as typed produces a value Meta's own hash can never match.
  if (u.ph) {
    const ph = normalizePhone(u.ph);
    if (ph) out.ph = sha256(ph);
  }
  if (u.external_id) out.external_id = sha256(u.external_id);
  return out;
}

export function isCapiConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN,
  );
}

export async function sendCapiEvent(ev: CapiEvent): Promise<CapiResult> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testEventCode = process.env.META_TEST_EVENT_CODE;
  const isProd = process.env.NODE_ENV === "production";

  if (!pixelId || !accessToken) {
    // Credentials not provisioned (local dev or pre-config deploy).
    return { ok: true, skipped: "credentials_missing" };
  }

  const event = {
    event_name: ev.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: ev.event_id,
    action_source: "website",
    event_source_url: ev.event_source_url,
    user_data: {
      ...hashUserData(ev.user_data ?? {}),
      ...(ev.fbp ? { fbp: ev.fbp } : {}),
      ...(ev.fbc ? { fbc: ev.fbc } : {}),
      client_ip_address: ev.client_ip_address,
      client_user_agent: ev.client_user_agent,
    },
    custom_data: ev.custom_data ?? {},
  };

  const payload: Record<string, unknown> = {
    data: [event],
    access_token: accessToken,
  };
  // Attach test_event_code only in non-production so the Test Events tab
  // catches preview and dev traffic without polluting prod conversions.
  if (!isProd && testEventCode) {
    payload.test_event_code = testEventCode;
  }

  // 5 s outbound timeout so a slow Meta response does not hang the
  // serverless function until the platform kills it.
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
      const text = await res.text();
      let fbtrace_id: string | undefined;
      try {
        fbtrace_id = JSON.parse(text)?.error?.fbtrace_id;
      } catch {
        // Non-JSON response, skip.
      }
      console.error(
        JSON.stringify({
          scope: "meta-capi",
          event: "forward_failed",
          event_name: ev.event_name,
          status: res.status,
          fbtrace_id: fbtrace_id ?? null,
          body: text.slice(0, 300),
        }),
      );
      return {
        ok: false,
        error: `meta_${res.status}`,
        status: res.status,
        fbtrace_id,
      };
    }
    return { ok: true };
  } catch (e) {
    clearTimeout(timeoutHandle);
    const err = e as Error;
    const reason = err.name === "AbortError" ? "timeout_5s" : err.message;
    console.error(
      JSON.stringify({
        scope: "meta-capi",
        event: "forward_threw",
        event_name: ev.event_name,
        reason,
      }),
    );
    return { ok: false, error: reason };
  }
}
