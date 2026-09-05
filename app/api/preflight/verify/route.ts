// POST /api/preflight/verify — verify the checkout callback (v29).
//
// Razorpay's success handler hands the browser three values. None of them
// are trusted: the signature is recomputed here from the order id and the
// payment id with the key secret, and compared in constant time. Only a
// good signature reaches the fulfilment routine, which is idempotent on
// the payment id, so this racing the webhook is safe.

import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { checkRate, clientKey, originAllowed } from "@/lib/api-guards";
import { fulfilPayment } from "@/lib/preflight-fulfil";

export const runtime = "nodejs";

const HOUR_MS = 60 * 60 * 1000;
const VERIFY_LIMIT = { limit: 40, windowMs: HOUR_MS } as const;

function readId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  // Razorpay ids are short ASCII tokens. Anything else is not one.
  if (!v || v.length > 64 || !/^[A-Za-z0-9_-]+$/.test(v)) return null;
  return v;
}

function signatureMatches(
  orderId: string,
  paymentId: string,
  provided: string,
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(provided, "utf8");
  // timingSafeEqual throws on a length mismatch, which is itself a leak
  // of nothing useful here, but the guard keeps the call total.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const rate = await checkRate(
    `preflight-verify:${clientKey(req)}`,
    VERIFY_LIMIT.limit,
    VERIFY_LIMIT.windowMs,
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

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const orderId = readId(raw.razorpay_order_id);
  const paymentId = readId(raw.razorpay_payment_id);
  const signature = readId(raw.razorpay_signature);

  if (!orderId || !paymentId || !signature) {
    console.error(
      JSON.stringify({
        route: "preflight-verify",
        event: "missing_fields",
        has_order: Boolean(orderId),
        has_payment: Boolean(paymentId),
        has_signature: Boolean(signature),
      }),
    );
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 },
    );
  }

  if (!signatureMatches(orderId, paymentId, signature)) {
    console.error(
      JSON.stringify({
        route: "preflight-verify",
        event: "signature_mismatch",
        order_id: orderId,
        payment_id: paymentId,
      }),
    );
    return NextResponse.json(
      { ok: false, error: "bad_signature" },
      { status: 400 },
    );
  }

  const result = await fulfilPayment(paymentId, "verify");
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
