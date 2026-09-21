// GET /api/checkout/status?product=<slug> — is checkout available? (v33)
//
// The product pages are statically prerendered, so anything they read
// from process.env at render time is frozen at build time. That would
// make the test-key to live-key swap a redeploy rather than an
// environment change. So the form asks this route instead: it is
// request-time, it returns a boolean and nothing else, and the page
// stays static.
//
// It asks the same question the order route asks, so the button is
// disabled whenever that route would refuse. No secret leaves here; the
// publishable key is handed to the browser by the order route, once,
// alongside the order it belongs to.

import { NextResponse } from "next/server";
import { getProduct, missingCheckoutConfig } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("product");
  const product = getProduct(slug);
  if (!product) {
    return NextResponse.json(
      { configured: false, error: "unknown_product" },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }
  return NextResponse.json(
    { configured: missingCheckoutConfig(product).length === 0 },
    { headers: { "cache-control": "no-store" } },
  );
}
