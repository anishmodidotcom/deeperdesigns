// Rate limiter and Origin guard for API routes.
//
// Storage strategy: Vercel KV (Redis) when KV_REST_API_URL is set,
// in-memory Map otherwise. The in-memory fallback is intentional:
// pre-flight 2 of v15 requires this path to keep working before the
// KV instance is provisioned in the Vercel dashboard.

import { kv } from "@vercel/kv";

const KV_ENABLED = !!process.env.KV_REST_API_URL;

type Bucket = { count: number; resetAt: number };

const inMemoryBuckets = new Map<string, Bucket>();

// v25 hotfix: a KV outage must degrade to the in-memory limiter, never
// throw. checkRate is called before the routes' try/catch, so an
// unhandled KV error here used to 500 all three form endpoints at once.
// After a failure, skip KV for a cooldown so requests are not stuck
// waiting out the KV client's retries while the backend is down.
const KV_RETRY_MS = 60_000;
let kvBrokenUntil = 0;

function kvUsable(): boolean {
  return KV_ENABLED && Date.now() >= kvBrokenUntil;
}

function noteKvFailure(op: "read" | "write", e: unknown): void {
  kvBrokenUntil = Date.now() + KV_RETRY_MS;
  console.error(
    JSON.stringify({
      scope: "api-guards",
      event: "kv_unavailable",
      op,
      fallback: "in-memory",
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
    }),
  );
}

const ALLOWED_ORIGINS = [
  "https://deeperdesigns.in",
  "https://www.deeperdesigns.in",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // Same-origin POSTs from the site have no Origin header in some browsers.
  if (process.env.NODE_ENV !== "production") return true;
  return ALLOWED_ORIGINS.includes(origin);
}

// v25.5: stricter than originAllowed, for endpoints that must never accept
// off-site callers. originAllowed intentionally lets through requests with
// no Origin header (some browsers omit it on same-origin POSTs), which also
// lets through any scripted client. This variant requires positive evidence
// of a same-site request: an allowed Origin, an allowed Referer, or a
// same-origin Sec-Fetch-Site.
export function sameSiteOnly(req: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;

  const origin = req.headers.get("origin");
  if (origin) return ALLOWED_ORIGINS.includes(origin);

  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin" || fetchSite === "same-site") return true;

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return ALLOWED_ORIGINS.includes(new URL(referer).origin);
    } catch {
      return false;
    }
  }
  return false;
}

// v25.5: shared field validation for the form routes, which used to cast
// req.json() straight to a type and trust it. Trims, enforces a max length,
// and rejects anything that is not a string.
export function readField(
  value: unknown,
  maxLength: number,
): { ok: true; value: string } | { ok: false } {
  if (typeof value !== "string") return { ok: false };
  const trimmed = value.trim();
  if (trimmed.length > maxLength) return { ok: false };
  return { ok: true, value: trimmed };
}

export const FIELD_MAX = {
  name: 120,
  business: 160,
  email: 254,
  phone: 32,
  industry: 64,
} as const;

export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : "anonymous";
  return ip;
}

// v25.5: in-memory counter. Node is single threaded per instance, so
// read-modify-write here cannot interleave; the KV path below is the one
// that needed an atomic primitive.
function countInMemory(
  fullKey: string,
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = inMemoryBuckets.get(fullKey);
  if (!bucket || bucket.resetAt < now) {
    inMemoryBuckets.set(fullKey, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((bucket.resetAt - now) / 1000),
  );
  if (bucket.count >= limit) return { ok: false, retryAfterSeconds };
  bucket.count += 1;
  return { ok: true };
}

// Returns ok=true if request is within limit, ok=false if rate limit hit.
//
// v25.5: the KV path is now a single atomic INCR plus an EXPIRE on first
// use, instead of GET then SET. The old read-modify-write let concurrent
// requests read the same count and each write count+1, so a burst could
// exceed the cap.
export async function checkRate(
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ ok: true } | { ok: false; retryAfterSeconds: number }> {
  const fullKey = `rl:${key}`;
  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));

  if (kvUsable()) {
    try {
      const count = await kv.incr(fullKey);
      if (count === 1) await kv.expire(fullKey, windowSec);
      if (count > limit) {
        const ttl = await kv.ttl(fullKey);
        return {
          ok: false,
          retryAfterSeconds: ttl && ttl > 0 ? ttl : windowSec,
        };
      }
      return { ok: true };
    } catch (e) {
      noteKvFailure("write", e);
    }
  }
  return countInMemory(fullKey, limit, windowMs);
}

const HOUR_MS = 60 * 60 * 1000;

export const LIMITS = {
  // v28: the per-IP caps were sized for a single person and locked out real
  // customers. A shared office, a co-working space or an Indian mobile
  // carrier behind NAT can front dozens of people on one address, so two
  // colleagues filling the form in the same hour hit the old limit of 5.
  // The per-IP caps are raised substantially; the per-email cap below stays
  // strict, because that is the cap that actually stops abuse (it is what
  // prevents mail-bombing one inbox, and it is per address, not per office).
  //
  //            was   now
  // otpSend      5    40
  // otpVerify   10    60
  // submit       3    20
  otpSend: { limit: 40, windowMs: HOUR_MS },
  otpVerify: { limit: 60, windowMs: HOUR_MS },
  submit: { limit: 20, windowMs: HOUR_MS },
  // v25.5: per-email cap on code sends, on top of the per-IP cap. Without
  // it, a distributed sender could mail-bomb one inbox at 5 per IP.
  otpSendPerEmail: { limit: 5, windowMs: HOUR_MS },
  // v25.5: meta-capi was an unauthenticated relay with no limit at all.
  capi: { limit: 120, windowMs: HOUR_MS },
} as const;
