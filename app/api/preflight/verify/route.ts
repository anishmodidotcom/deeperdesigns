// POST /api/preflight/verify — alias onto /api/checkout/verify (v33).
//
// The implementation moved to lib/checkout/handlers.ts. This path is kept
// because it is live: the Razorpay webhook in the dashboard points at
// /api/preflight/webhook, and the Preflight page has been posting to
// these paths since v29. Both trees call the same function, so behaviour
// here is identical by construction rather than by inspection.

import { handleVerify } from "@/lib/checkout/handlers";

export const runtime = "nodejs";


export async function POST(req: Request) {
  return handleVerify(req);
}
