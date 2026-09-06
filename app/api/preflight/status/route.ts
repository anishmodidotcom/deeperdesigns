// GET /api/preflight/status — is checkout available right now? (v29)
//
// /preflight is a statically prerendered marketing page, so anything it
// reads from process.env at render time is frozen at build time. That
// would make the test-key to live-key swap a redeploy rather than an
// environment change, which the v29 spec explicitly says it must not be.
//
// So the form asks this route instead. It is request-time, it returns a
// boolean and nothing else, and the page stays static.
//
// No secret leaves here. The publishable key is handed to the browser by
// /api/preflight/order, once, alongside the order it belongs to.

import { NextResponse } from "next/server";
import { PRODUCTS, missingCheckoutConfig } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// v29.1: this asks the same question the order route asks, so the button
// is disabled whenever that route would refuse. Checking only the
// Razorpay keys here let the button enable while the order route would
// 503 on a missing Sheets credential, which meant filling the form and
// then hitting a wall. The names of the absent variables stay in the
// server log; this returns a boolean and nothing else.
export async function GET() {
  return NextResponse.json(
    { configured: missingCheckoutConfig(PRODUCTS.preflight).length === 0 },
    { headers: { "cache-control": "no-store" } },
  );
}
