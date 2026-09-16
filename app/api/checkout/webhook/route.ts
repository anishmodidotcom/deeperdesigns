// POST /api/checkout/webhook — see lib/checkout/handlers.ts.
//
// The platform path. Takes a product slug and works for any product in
// lib/products.ts. /api/preflight/webhook is an alias onto the same handler.

import { handleWebhook } from "@/lib/checkout/handlers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handleWebhook(req);
}
