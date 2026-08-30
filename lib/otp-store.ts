// OTP store keyed by email address (or any string identifier).
//
// Storage strategy: Vercel KV (Redis) when KV_REST_API_URL is set,
// in-memory Map otherwise. The in-memory fallback is intentional —
// pre-flight 2 of v15 requires this path to keep working before the
// KV instance is provisioned in the Vercel dashboard.
//
// The in-memory store does not survive cold starts or scale across
// Vercel function instances. Short-lived 6-digit OTPs make that
// tolerable as a launch fallback, not a steady state.

import { kv } from "@vercel/kv";
import { randomInt, timingSafeEqual } from "node:crypto";

type Entry = { code: string; createdAt: number; attempts: number };

const TTL_MS = 10 * 60 * 1000;
const TTL_SEC = TTL_MS / 1000;
const MAX_ATTEMPTS = 5;

// v25.5: after a code is verified, the email holds a verified session for
// this long. The completion route requires one, and clears it only once the
// submission is fully accepted, so a failed completion email can be retried
// (it used to dead-end at "code expired") while a second submission cannot
// reuse the same verification.
const VERIFIED_TTL_MS = 15 * 60 * 1000;
const VERIFIED_TTL_SEC = VERIFIED_TTL_MS / 1000;

const KV_ENABLED = !!process.env.KV_REST_API_URL;

const inMemoryStore = new Map<string, Entry>();
const inMemoryVerified = new Map<string, number>();

// v25.5: CSPRNG. Math.random is not suitable for a credential, even a
// short-lived one.
export function generateCode(): string {
  return String(randomInt(100000, 1000000));
}

// v25.5: constant-time compare so verification cannot be timed.
function codesMatch(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

async function readEntry(key: string): Promise<Entry | null> {
  if (KV_ENABLED) {
    return (await kv.get<Entry>(key)) ?? null;
  }
  return inMemoryStore.get(key) ?? null;
}

async function writeEntry(key: string, entry: Entry): Promise<void> {
  if (KV_ENABLED) {
    await kv.set(key, entry, { ex: TTL_SEC });
    return;
  }
  inMemoryStore.set(key, entry);
}

async function deleteEntry(key: string): Promise<void> {
  if (KV_ENABLED) {
    await kv.del(key);
    return;
  }
  inMemoryStore.delete(key);
}

export async function setCode(key: string, code: string): Promise<void> {
  await writeEntry(key, { code, createdAt: Date.now(), attempts: 0 });
}

export async function verifyCode(
  key: string,
  code: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const entry = await readEntry(key);
  if (!entry) return { ok: false, reason: "Code expired. Request a new one." };
  if (Date.now() - entry.createdAt > TTL_MS) {
    await deleteEntry(key);
    return { ok: false, reason: "Code expired. Request a new one." };
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    await deleteEntry(key);
    return { ok: false, reason: "Too many attempts. Request a new code." };
  }
  const next = { ...entry, attempts: entry.attempts + 1 };
  if (!codesMatch(entry.code, code)) {
    await writeEntry(key, next);
    return { ok: false, reason: "Incorrect code." };
  }
  await deleteEntry(key);
  await setVerified(key);
  return { ok: true };
}

export function emailKey(email: string): string {
  return `otp:${email.trim().toLowerCase()}`;
}

// v25.5: verified-session helpers. The completion route calls hasVerified
// to prove the caller actually holds a verified OTP for this email, and
// clearVerified only after the submission is accepted.
function verifiedKey(key: string): string {
  return `vfy:${key}`;
}

async function setVerified(key: string): Promise<void> {
  const expiresAt = Date.now() + VERIFIED_TTL_MS;
  if (KV_ENABLED) {
    try {
      await kv.set(verifiedKey(key), expiresAt, { ex: VERIFIED_TTL_SEC });
      return;
    } catch {
      // fall through to the in-memory store
    }
  }
  inMemoryVerified.set(verifiedKey(key), expiresAt);
}

export async function hasVerified(key: string): Promise<boolean> {
  const vk = verifiedKey(key);
  if (KV_ENABLED) {
    try {
      const expiresAt = await kv.get<number>(vk);
      if (expiresAt) return expiresAt > Date.now();
    } catch {
      // fall through to the in-memory store
    }
  }
  const local = inMemoryVerified.get(vk);
  if (!local) return false;
  if (local <= Date.now()) {
    inMemoryVerified.delete(vk);
    return false;
  }
  return true;
}

export async function clearVerified(key: string): Promise<void> {
  const vk = verifiedKey(key);
  if (KV_ENABLED) {
    try {
      await kv.del(vk);
    } catch {
      // fall through to the in-memory store
    }
  }
  inMemoryVerified.delete(vk);
}
