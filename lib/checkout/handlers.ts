// The checkout request handlers (v33).
//
// These were the bodies of app/api/preflight/{order,verify,webhook,resend}
// /route.ts. They were already product-generic: each takes a slug, looks
// it up in lib/products.ts and uses whatever the record says. v33 moves
// them here so two route trees can share one implementation:
//
//   /api/checkout/*   the platform path, used by every new product
//   /api/preflight/*  thin aliases, kept because the live Razorpay
//                     webhook points at /api/preflight/webhook and a
//                     dashboard change is not something to couple to a
//                     deploy
//
// Both trees call the same function, so there is no second copy to
// drift. An unknown slug is a 400 in every handler. The log lines keep
// their original route names, so existing log searches still work.

import { checkRate, clientKey, originAllowed } from "@/lib/api-guards";
import { PREFLIGHT_FIELD_MAX, RAZORPAY_NOTE_MAX } from "@/lib/preflight";
import { resendToBuyer } from "@/lib/preflight-delivery";
import { fulfilPayment } from "@/lib/preflight-fulfil";
import { PRODUCTS, PRODUCT_CURRENCY, amountPaise, getProduct, missingCheckoutConfig } from "@/lib/products";
import { NextResponse } from "next/server";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

// POST /api/preflight/order — create a Razorpay Order (v29).
//
// The browser never chooses the amount. It sends the three form fields
// plus a product slug; this route looks the product up in lib/products.ts
// and creates an order for that product's price. An unknown slug is a
// 400. Rate limited per IP and per email with the site's existing guards.
//
// Nothing here is Preflight-specific any more. A second product posts its
// own slug to this same route.



const EMAIL_RE_order = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOUR_MS_order = 60 * 60 * 1000;

// Sized like the site's other form endpoints. A real buyer needs one or
// two attempts; a card that keeps failing is a support conversation, not
// twenty more orders.
const ORDER_LIMITS = {
  perIp: { limit: 20, windowMs: HOUR_MS_order },
  perEmail: { limit: 8, windowMs: HOUR_MS_order },
} as const;

function readString_order(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length > max) return null;
  return trimmed;
}

// A short unique receipt. Razorpay caps this at 40 characters.
function receiptId_order(): string {
  return `pf_${Date.now().toString(36)}${randomBytes(4).toString("hex")}`;
}

export async function handleOrder(req: Request) {
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

  // The slug decides the price, the sheet and the receipt, so it is
  // resolved before anything else is validated.
  const product = getProduct(raw.product);
  if (!product) {
    console.error(
      JSON.stringify({
        route: "preflight-order",
        event: "unknown_product",
        // The raw value is logged truncated so a probe is visible without
        // letting an arbitrary string into the log line.
        got: typeof raw.product === "string" ? raw.product.slice(0, 40) : null,
      }),
    );
    return NextResponse.json(
      { ok: false, error: "That product is not available." },
      { status: 400 },
    );
  }

  const name = readString_order(raw.name, PREFLIGHT_FIELD_MAX.name);
  const email = readString_order(raw.email, PREFLIGHT_FIELD_MAX.email);
  // The note carries the UTM suffix the client appends, so it is capped
  // at the Razorpay notes limit rather than the textarea's 500.
  const note = readString_order(raw.note, RAZORPAY_NOTE_MAX) ?? "";

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Enter your name." },
      { status: 400 },
    );
  }
  if (!email || !EMAIL_RE_order.test(email)) {
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
  const missing = missingCheckoutConfig(product);
  if (missing.length > 0) {
    console.error(
      JSON.stringify({
        route: "preflight-order",
        event: "config_missing",
        product: product.slug,
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
        amount: amountPaise(product),
        currency: PRODUCT_CURRENCY,
        receipt: receiptId_order(),
        // The notes travel with the payment and are what the fulfilment
        // routine reads back, so the form fields never have to be
        // trusted from a second client call.
        notes: {
          name: name.slice(0, RAZORPAY_NOTE_MAX),
          email: email.slice(0, RAZORPAY_NOTE_MAX),
          note: note.slice(0, RAZORPAY_NOTE_MAX),
          // The webhook and the callback both read the slug back off the
          // payment, so neither has to be told which product it was.
          product: product.slug,
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(
        JSON.stringify({
          route: "preflight-order",
          event: "order_create_failed",
          product: product.slug,
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

// POST /api/preflight/verify — verify the checkout callback (v29).
//
// Razorpay's success handler hands the browser three values. None of them
// are trusted: the signature is recomputed here from the order id and the
// payment id with the key secret, and compared in constant time. Only a
// good signature reaches the fulfilment routine, which is idempotent on
// the payment id, so this racing the webhook is safe.



const HOUR_MS_verify = 60 * 60 * 1000;
const VERIFY_LIMIT = { limit: 40, windowMs: HOUR_MS_verify } as const;

function readId_verify(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  // Razorpay ids are short ASCII tokens. Anything else is not one.
  if (!v || v.length > 64 || !/^[A-Za-z0-9_-]+$/.test(v)) return null;
  return v;
}

function signatureMatches_verify(
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

export async function handleVerify(req: Request) {
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

  // v29.2: the product the browser says this was. fulfilPayment
  // cross-checks it against the slug stored on the order's own notes, so
  // a wrong one cannot reach another product's record.
  const product = getProduct(raw.product);
  if (!product) {
    console.error(
      JSON.stringify({
        route: "preflight-verify",
        event: "unknown_product",
        got: typeof raw.product === "string" ? raw.product.slice(0, 40) : null,
      }),
    );
    return NextResponse.json(
      { ok: false, error: "unknown_product" },
      { status: 400 },
    );
  }

  const orderId = readId_verify(raw.razorpay_order_id);
  const paymentId = readId_verify(raw.razorpay_payment_id);
  const signature = readId_verify(raw.razorpay_signature);

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

  if (!signatureMatches_verify(orderId, paymentId, signature)) {
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

  const result = await fulfilPayment(product, paymentId, "verify");
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}

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


// The signature covers the exact bytes Razorpay sent. Never let a caching
// or body-parsing layer near this route.

type WebhookBody = {
  event?: string;
  payload?: {
    payment?: {
      // notes.product is the slug the order route stamped on the order,
      // so the webhook learns which product this was from Razorpay's own
      // record rather than from anything a caller supplies.
      entity?: { id?: string; notes?: Record<string, string> };
    };
  };
};

function signatureMatches_webhook(rawBody: string, provided: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(provided, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function handleWebhook(req: Request) {
  const provided = req.headers.get("x-razorpay-signature");
  const rawBody = await req.text();

  if (!provided || !signatureMatches_webhook(rawBody, provided)) {
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

  const entity = body.payload?.payment?.entity;
  const paymentId = entity?.id;
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

  // v29.2: which product this sale was. A captured payment with no
  // recognisable slug is not ours to fulfil, and returning 400 stops
  // Razorpay retrying something this route can never complete.
  const product = getProduct(entity?.notes?.product);
  if (!product) {
    console.error(
      JSON.stringify({
        route: "preflight-webhook",
        event: "unknown_product",
        payment_id: paymentId,
        got:
          typeof entity?.notes?.product === "string"
            ? entity.notes.product.slice(0, 40)
            : null,
      }),
    );
    return NextResponse.json(
      { ok: false, error: "unknown_product" },
      { status: 400 },
    );
  }

  const result = await fulfilPayment(product, paymentId, "webhook");
  if (!result.ok) {
    // A non-2xx tells Razorpay to retry, which is what we want when the
    // sheet write failed: the next delivery gets another go.
    console.error(
      JSON.stringify({
        route: "preflight-webhook",
        event: "fulfilment_failed",
        payment_id: paymentId,
        product: product.slug,
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

// POST /api/preflight/resend — re-send a buyer's download (v29.4).
//
// For support. A buyer whose link expired, or who lost the email, gets a
// freshly signed URL sent to the address already on their sheet row.
// The address is never taken from the request: only the payment id is,
// so this cannot be used to redirect someone else's download.
//
// Auth is a shared token in x-preflight-admin. That is deliberately
// modest, because the route reveals nothing and does nothing except mail
// the buyer their own file. It is rate limited on top.
//
//   curl -X POST https://www.deeperdesigns.in/api/preflight/resend \
//     -H 'content-type: application/json' \
//     -H "x-preflight-admin: $PREFLIGHT_ADMIN_TOKEN" \
//     -d '{"razorpay_payment_id":"pay_XXXXXXXX"}'



const HOUR_MS_resend = 60 * 60 * 1000;
const RESEND_LIMIT = { limit: 20, windowMs: HOUR_MS_resend } as const;

function tokenMatches_resend(provided: string | null): boolean {
  const expected = process.env.PREFLIGHT_ADMIN_TOKEN?.trim();
  // An unset token means the route is closed, not open to everyone.
  if (!expected) return false;
  if (!provided) return false;
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(provided.trim(), "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function readPaymentId_resend(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v || v.length > 64 || !/^[A-Za-z0-9_-]+$/.test(v)) return null;
  return v;
}

export async function handleResend(req: Request) {
  // Rate limit before the token check, so a token-guessing loop is
  // capped the same way a legitimate caller is.
  const rate = await checkRate(
    `preflight-resend:${clientKey(req)}`,
    RESEND_LIMIT.limit,
    RESEND_LIMIT.windowMs,
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

  if (!tokenMatches_resend(req.headers.get("x-preflight-admin"))) {
    console.error(
      JSON.stringify({
        route: "preflight-resend",
        event: "unauthorized",
        configured: Boolean(process.env.PREFLIGHT_ADMIN_TOKEN?.trim()),
      }),
    );
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 },
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

  const paymentId = readPaymentId_resend(raw.razorpay_payment_id);
  if (!paymentId) {
    return NextResponse.json(
      { ok: false, error: "invalid_payment_id" },
      { status: 400 },
    );
  }

  // Defaults to Preflight; a second product can name itself.
  const product = raw.product ? getProduct(raw.product) : PRODUCTS.preflight;
  if (!product) {
    return NextResponse.json(
      { ok: false, error: "unknown_product" },
      { status: 400 },
    );
  }

  const result = await resendToBuyer(product, paymentId);
  if (!result.ok) {
    const status = result.reason === "row_not_found" ? 404 : 502;
    return NextResponse.json(
      { ok: false, error: result.reason },
      { status },
    );
  }

  // The address is echoed so support can confirm it went where expected.
  return NextResponse.json({
    ok: true,
    sent_to: result.email,
    link: result.link,
  });
}
