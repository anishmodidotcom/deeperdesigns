// POST /api/checkout/order — see lib/checkout/handlers.ts.
//
// The platform path. Takes a product slug and works for any product in
// lib/products.ts. /api/preflight/order is an alias onto the same handler.

import { handleOrder } from "@/lib/checkout/handlers";

export const runtime = "nodejs";


export async function POST(req: Request) {
  return handleOrder(req);
}
