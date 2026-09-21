// POST /api/checkout/resend — see lib/checkout/handlers.ts.
//
// The platform path. Takes a product slug and works for any product in
// lib/products.ts. /api/preflight/resend is an alias onto the same handler.

import { handleResend } from "@/lib/checkout/handlers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handleResend(req);
}
