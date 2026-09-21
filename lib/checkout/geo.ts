// Where the buyer is, for the price approximation only (v33).
//
// SERVER ONLY: this reads next/headers. The browser fallback lives in
// geo-client.ts, because a client component importing this file would
// pull next/headers into the browser bundle and fail the build.
//
// Vercel puts the request country in x-vercel-ip-country. Off Vercel the
// header is absent, and the client falls back to the browser's own
// locale region. Neither is used for anything but choosing whether to
// show an approximation beneath the price: the amount charged is the
// same INR number wherever the buyer is.

import { headers } from "next/headers";

export async function requestCountry(): Promise<string | null> {
  try {
    const h = await headers();
    const cc = h.get("x-vercel-ip-country");
    return cc?.trim().toUpperCase() || null;
  } catch {
    return null;
  }
}
