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

// v25.5: the OTP store degrades on a KV failure instead of throwing.
//
// v25 fixed this for the rate limiter in lib/api-guards.ts but left the
// code store unguarded, which is why the funnel stayed down after that
// hotfix shipped: a dead KV made setCode throw, otp-send caught it, and
// every visitor got a generic 500. A rate-limit or code-store backend
// being unreachable must never stop a lead from completing.
//
// The in-memory fallback is weaker than KV: it does not survive a cold
// start and is not shared across serverless instances, so a code written
// on one instance may not verify on another. That is a degraded service,
// not a dead one, and it is strictly better than refusing every request.
const KV_RETRY_MS = 60_000;
let kvBrokenUntil = 0;

function kvUsable(): boolean {
  return KV_ENABLED && Date.now() >= kvBrokenUntil;
}

function noteKvFailure(op: "read" | "write" | "delete", e: unknown): void {
  kvBrokenUntil = Date.now() + KV_RETRY_MS;
  console.error(
    JSON.stringify({
      scope: "otp-store",
      event: "kv_unavailable",
      op,
      fallback: "in-memory",
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
    }),
  );
}

async function readEntry(key: string): Promise<Entry | null> {
  if (kvUsable()) {
    try {
      return (await kv.get<Entry>(key)) ?? null;
    } catch (e) {
      noteKvFailure("read", e);
    }
  }
  return inMemoryStore.get(key) ?? null;
}

async function writeEntry(key: string, entry: Entry): Promise<void> {
  if (kvUsable()) {
    try {
      await kv.set(key, entry, { ex: TTL_SEC });
      return;
    } catch (e) {
      noteKvFailure("write", e);
    }
  }
  inMemoryStore.set(key, entry);
}

async function deleteEntry(key: string): Promise<void> {
  if (kvUsable()) {
    try {
      await kv.del(key);
      return;
    } catch (e) {
      noteKvFailure("delete", e);
    }
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
  if (kvUsable()) {
    try {
      await kv.set(verifiedKey(key), expiresAt, { ex: VERIFIED_TTL_SEC });
      return;
    } catch (e) {
      noteKvFailure("write", e);
    }
  }
  inMemoryVerified.set(verifiedKey(key), expiresAt);
}

export async function hasVerified(key: string): Promise<boolean> {
  const vk = verifiedKey(key);
  if (kvUsable()) {
    try {
      const expiresAt = await kv.get<number>(vk);
      if (expiresAt) return expiresAt > Date.now();
    } catch (e) {
      noteKvFailure("read", e);
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
  if (kvUsable()) {
    try {
      await kv.del(vk);
    } catch (e) {
      noteKvFailure("delete", e);
    }
  }
  inMemoryVerified.delete(vk);
}
