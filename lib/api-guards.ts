// Rate limiter and Origin guard for API routes.
//
// Storage strategy: Vercel KV (Redis) when KV_REST_API_URL is set,
// in-memory Map otherwise. The in-memory fallback is intentional —
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

export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : "anonymous";
  return ip;
}

async function readBucket(key: string): Promise<Bucket | null> {
  if (kvUsable()) {
    try {
      return (await kv.get<Bucket>(key)) ?? null;
    } catch (e) {
      noteKvFailure("read", e);
    }
  }
  return inMemoryBuckets.get(key) ?? null;
}

async function writeBucket(key: string, bucket: Bucket, ttlSec: number): Promise<void> {
  if (kvUsable()) {
    try {
      await kv.set(key, bucket, { ex: ttlSec });
      return;
    } catch (e) {
      noteKvFailure("write", e);
    }
  }
  inMemoryBuckets.set(key, bucket);
}

// Returns ok=true if request is within limit, ok=false if rate limit hit.
export async function checkRate(
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ ok: true } | { ok: false; retryAfterSeconds: number }> {
  const fullKey = `rl:${key}`;
  const now = Date.now();
  const bucket = await readBucket(fullKey);
  if (!bucket || bucket.resetAt < now) {
    await writeBucket(
      fullKey,
      { count: 1, resetAt: now + windowMs },
      Math.ceil(windowMs / 1000),
    );
    return { ok: true };
  }
  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  await writeBucket(
    fullKey,
    { count: bucket.count + 1, resetAt: bucket.resetAt },
    Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  );
  return { ok: true };
}

const HOUR_MS = 60 * 60 * 1000;

export const LIMITS = {
  otpSend: { limit: 5, windowMs: HOUR_MS },
  otpVerify: { limit: 10, windowMs: HOUR_MS },
  submit: { limit: 3, windowMs: HOUR_MS },
} as const;
