// POST /api/checkout/verify — see lib/checkout/handlers.ts.
//
// The platform path. Takes a product slug and works for any product in
// lib/products.ts. /api/preflight/verify is an alias onto the same handler.

import { handleVerify } from "@/lib/checkout/handlers";

export const runtime = "nodejs";


export async function POST(req: Request) {
  return handleVerify(req);
}
