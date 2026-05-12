// In-memory OTP store used as a default for local dev when no third-party
// provider (Supabase, MSG91, Twilio Verify) is configured. Resets on each
// server boot, which is the right behaviour for short-lived codes.

type Entry = { code: string; createdAt: number; attempts: number };

const TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const store = new Map<string, Entry>();

export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function setCode(key: string, code: string): void {
  store.set(key, { code, createdAt: Date.now(), attempts: 0 });
}

export function verifyCode(
  key: string,
  code: string
): { ok: true } | { ok: false; reason: string } {
  const entry = store.get(key);
  if (!entry) return { ok: false, reason: "Code expired. Request a new one." };
  if (Date.now() - entry.createdAt > TTL_MS) {
    store.delete(key);
    return { ok: false, reason: "Code expired. Request a new one." };
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    store.delete(key);
    return { ok: false, reason: "Too many attempts. Request a new code." };
  }
  entry.attempts += 1;
  if (entry.code !== code) {
    return { ok: false, reason: "Incorrect code." };
  }
  store.delete(key);
  return { ok: true };
}

export function phoneKey(country: string, phone: string): string {
  return `${country}:${phone}`;
}
