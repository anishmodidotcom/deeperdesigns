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

import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { checkRate, clientKey } from "@/lib/api-guards";
import { resendToBuyer } from "@/lib/preflight-delivery";
import { PRODUCTS, getProduct } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HOUR_MS = 60 * 60 * 1000;
const RESEND_LIMIT = { limit: 20, windowMs: HOUR_MS } as const;

function tokenMatches(provided: string | null): boolean {
  const expected = process.env.PREFLIGHT_ADMIN_TOKEN?.trim();
  // An unset token means the route is closed, not open to everyone.
  if (!expected) return false;
  if (!provided) return false;
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(provided.trim(), "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function readPaymentId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v || v.length > 64 || !/^[A-Za-z0-9_-]+$/.test(v)) return null;
  return v;
}

export async function POST(req: Request) {
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

  if (!tokenMatches(req.headers.get("x-preflight-admin"))) {
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

  const paymentId = readPaymentId(raw.razorpay_payment_id);
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
