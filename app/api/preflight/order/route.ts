// POST /api/preflight/order — create a Razorpay Order (v29).
//
// The browser never chooses the amount. It sends the three form fields;
// this route validates them, creates an order for the configured price,
// and returns the order id plus the public key so Standard Checkout can
// open. Rate limited per IP and per email with the site's existing
// guards.

import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { checkRate, clientKey, originAllowed } from "@/lib/api-guards";
import {
  PREFLIGHT_AMOUNT_PAISE,
  PREFLIGHT_CURRENCY,
  PREFLIGHT_FIELD_MAX,
  RAZORPAY_NOTE_MAX,
  missingPreflightConfig,
} from "@/lib/preflight";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOUR_MS = 60 * 60 * 1000;

// Sized like the site's other form endpoints. A real buyer needs one or
// two attempts; a card that keeps failing is a support conversation, not
// twenty more orders.
const ORDER_LIMITS = {
  perIp: { limit: 20, windowMs: HOUR_MS },
  perEmail: { limit: 8, windowMs: HOUR_MS },
} as const;

function readString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length > max) return null;
  return trimmed;
}

// A short unique receipt. Razorpay caps this at 40 characters.
function receiptId(): string {
  return `pf_${Date.now().toString(36)}${randomBytes(4).toString("hex")}`;
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const ipRate = await checkRate(
    `preflight-order:${clientKey(req)}`,
    ORDER_LIMITS.perIp.limit,
    ORDER_LIMITS.perIp.windowMs,
  );
  if (!ipRate.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a little while." },
      {
        status: 429,
        headers: { "Retry-After": String(ipRate.retryAfterSeconds) },
      },
    );
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again." },
      { status: 400 },
    );
  }

  const name = readString(raw.name, PREFLIGHT_FIELD_MAX.name);
  const email = readString(raw.email, PREFLIGHT_FIELD_MAX.email);
  // The note carries the UTM suffix the client appends, so it is capped
  // at the Razorpay notes limit rather than the textarea's 500.
  const note = readString(raw.note, RAZORPAY_NOTE_MAX) ?? "";

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Enter your name." },
      { status: 400 },
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter an email address we can send the package to." },
      { status: 400 },
    );
  }

  const emailRate = await checkRate(
    `preflight-order-email:${email.toLowerCase()}`,
    ORDER_LIMITS.perEmail.limit,
    ORDER_LIMITS.perEmail.windowMs,
  );
  if (!emailRate.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts for this address. Message us on WhatsApp and we will sort it there." },
      {
        status: 429,
        headers: { "Retry-After": String(emailRate.retryAfterSeconds) },
      },
    );
  }

  // v29.1: fail here, before an order exists, if anything the rest of the
  // flow depends on is missing. The alternative is discovering it after
  // the buyer has been charged, when the sale cannot be written to the
  // fulfilment queue. The log names the absent variables; the response
  // deliberately does not, because it is public.
  const missing = missingPreflightConfig();
  if (missing.length > 0) {
    console.error(
      JSON.stringify({
        route: "preflight-order",
        event: "config_missing",
        missing,
      }),
    );
    return NextResponse.json(
      { ok: false, error: "Payments are not available right now. Message us on WhatsApp and we will sort it there." },
      { status: 503 },
    );
  }

  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
  ).toString("base64");

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        authorization: `Basic ${auth}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        amount: PREFLIGHT_AMOUNT_PAISE,
        currency: PREFLIGHT_CURRENCY,
        receipt: receiptId(),
        // The notes travel with the payment and are what the fulfilment
        // routine reads back, so the form fields never have to be
        // trusted from a second client call.
        notes: {
          name: name.slice(0, RAZORPAY_NOTE_MAX),
          email: email.slice(0, RAZORPAY_NOTE_MAX),
          note: note.slice(0, RAZORPAY_NOTE_MAX),
          product: "Preflight",
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(
        JSON.stringify({
          route: "preflight-order",
          event: "order_create_failed",
          status: res.status,
          body: text.slice(0, 300),
        }),
      );
      return NextResponse.json(
        { ok: false, error: "We could not start the payment. Try again, or message us on WhatsApp." },
        { status: 502 },
      );
    }

    const order = (await res.json()) as {
      id: string;
      amount: number;
      currency: string;
    };

    return NextResponse.json({
      ok: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (e) {
    console.error(
      JSON.stringify({
        route: "preflight-order",
        event: "order_create_threw",
        error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      }),
    );
    return NextResponse.json(
      { ok: false, error: "We could not start the payment. Try again, or message us on WhatsApp." },
      { status: 502 },
    );
  }
}
