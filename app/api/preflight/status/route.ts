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
import { isPaymentConfigured } from "@/lib/preflight";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { configured: isPaymentConfigured() },
    { headers: { "cache-control": "no-store" } },
  );
}
