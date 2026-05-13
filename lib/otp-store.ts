// In-memory OTP store keyed by email address (post-v3) or any string
// identifier. Resets on each server boot; short-lived codes are the
// intended use, so a process-local store is correct here.

type Entry = { code: string; createdAt: number; attempts: number };

const TTL_MS = 10 * 60 * 1000;
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

export function emailKey(email: string): string {
  return `email:${email.trim().toLowerCase()}`;
}
