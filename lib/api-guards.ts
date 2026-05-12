// In-memory rate limiter and Origin guard for API routes.
// Buckets reset on server boot. Good enough for the launch volume;
// move to Upstash or Vercel KV when traffic grows.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

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

// Returns true if request is within limit, false if rate limit hit.
export function checkRate(
  key: string,
  limit: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  bucket.count += 1;
  return { ok: true };
}

const HOUR_MS = 60 * 60 * 1000;

export const LIMITS = {
  otpSend: { limit: 5, windowMs: HOUR_MS },
  otpVerify: { limit: 10, windowMs: HOUR_MS },
  submit: { limit: 3, windowMs: HOUR_MS },
} as const;
