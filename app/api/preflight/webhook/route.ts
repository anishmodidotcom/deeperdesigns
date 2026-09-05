// POST /api/preflight/webhook — Razorpay webhook (v29).
//
// The signature is computed over the RAW body, so the body is read as
// text and only parsed after the comparison passes. Anything that fails
// the check gets a 400 and writes nothing.
//
// Only payment.captured does work. Every other event is acknowledged with
// a 200 and ignored, because Razorpay retries anything it does not see a
// 2xx for and a retry loop on an event we do not handle is noise.
//
// Fulfilment is idempotent on the payment id, so a replay of the same
// event is a no-op: no second sheet row, no second email.

import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { fulfilPayment } from "@/lib/preflight-fulfil";

export const runtime = "nodejs";
// The signature covers the exact bytes Razorpay sent. Never let a caching
// or body-parsing layer near this route.
export const dynamic = "force-dynamic";

type WebhookBody = {
  event?: string;
  payload?: {
    payment?: {
      entity?: { id?: string };
    };
  };
};

function signatureMatches(rawBody: string, provided: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(provided, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const provided = req.headers.get("x-razorpay-signature");
  const rawBody = await req.text();

  if (!provided || !signatureMatches(rawBody, provided)) {
    console.error(
      JSON.stringify({
        route: "preflight-webhook",
        event: "signature_rejected",
        has_header: Boolean(provided),
        configured: Boolean(process.env.RAZORPAY_WEBHOOK_SECRET),
      }),
    );
    return NextResponse.json(
      { ok: false, error: "bad_signature" },
      { status: 400 },
    );
  }

  let body: WebhookBody;
  try {
    body = JSON.parse(rawBody) as WebhookBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  if (body.event !== "payment.captured") {
    // Acknowledged and ignored, so Razorpay stops retrying it.
    return NextResponse.json({ ok: true, ignored: body.event ?? "unknown" });
  }

  const paymentId = body.payload?.payment?.entity?.id;
  if (typeof paymentId !== "string" || !paymentId) {
    console.error(
      JSON.stringify({
        route: "preflight-webhook",
        event: "missing_payment_id",
      }),
    );
    return NextResponse.json(
      { ok: false, error: "missing_payment_id" },
      { status: 400 },
    );
  }

  const result = await fulfilPayment(paymentId, "webhook");
  if (!result.ok) {
    // A non-2xx tells Razorpay to retry, which is what we want when the
    // sheet write failed: the next delivery gets another go.
    console.error(
      JSON.stringify({
        route: "preflight-webhook",
        event: "fulfilment_failed",
        payment_id: paymentId,
        error: result.error,
      }),
    );
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, fulfilled: result.fulfilled });
}
