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

type Entry = { code: string; createdAt: number; attempts: number };

const TTL_MS = 10 * 60 * 1000;
const TTL_SEC = TTL_MS / 1000;
const MAX_ATTEMPTS = 5;

const KV_ENABLED = !!process.env.KV_REST_API_URL;

const inMemoryStore = new Map<string, Entry>();

export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
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
  if (entry.code !== code) {
    await writeEntry(key, next);
    return { ok: false, reason: "Incorrect code." };
  }
  await deleteEntry(key);
  return { ok: true };
}

export function emailKey(email: string): string {
  return `otp:${email.trim().toLowerCase()}`;
}
