// v35 part 1: the rotating hero hooks.
//
// Five approved H1 lines. Which one a visitor sees is decided on the
// server, once per request, from a session cookie, so the page ships with
// the line already in the HTML: no layout shift, no client swap, and one
// <h1> either way.
//
// Deterministic per visitor: the same session cookie always hashes to the
// same line, so a refresh does not reshuffle the headline under someone
// who is reading it. A new session may draw a different one.
//
// The serif markers are read by renderSerif in components/industry/text.

export const HERO_HOOKS = [
  "Your business is a set of systems. {serif}We build the ones you have been missing.{/serif}",
  "Build the next level's systems {serif}before the revenue arrives.{/serif}",
  // The brief marks "the second sentence" for this line. Its three
  // sentences are two beats, and the payoff is the last one, which is
  // what carries the italic on lines 1 and 5 too. Flagged in the PR:
  // moving it to "A lawyer for the contracts." is a one-token change.
  "A CA for the books. A lawyer for the contracts. {serif}Now someone for the AI.{/serif}",
  "Ten subscriptions that almost fit, {serif}or one system built around how you actually work.{/serif}",
  "Strategy first. {serif}Technology where it creates leverage.{/serif}",
] as const;

export const HERO_SUBLINE =
  "We find the systems your business is missing, build them around how you already work, and stand behind them once they run.";

export const HOOK_COUNT = HERO_HOOKS.length;

/** The cookie that identifies a browsing session. Session-scoped: no
 *  Max-Age, so it dies with the browser and a later visit may draw a
 *  different line. */
export const SESSION_COOKIE = "dd_hook_sid";

/** The chosen line, 1-based, written back so the browser can report it
 *  on PageView without a second source of truth. Readable by script on
 *  purpose. */
export const HOOK_COOKIE = "dd_hook_n";

/** A ?h= override, held for the rest of the session so the message match
 *  survives the visitor clicking into the site and back. */
export const FORCED_COOKIE = "dd_hook_forced";

export const HOOK_HEADER = "x-dd-hero-hook";

// FNV-1a, 32-bit. Small, stable, and dependency-free; this picks a
// headline, so it does not need to be a cryptographic hash.
function fnv1a(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** 1-based hook number for a session id. */
export function hookForSession(sessionId: string): number {
  return (fnv1a(sessionId) % HOOK_COUNT) + 1;
}

/** Accepts a ?h= value or a cookie value. Returns null for anything that
 *  is not 1..HOOK_COUNT, so the caller falls back to the hash. */
export function normaliseHook(value: string | null | undefined): number | null {
  if (!value) return null;
  if (!/^[0-9]+$/.test(value)) return null;
  const n = Number(value);
  return n >= 1 && n <= HOOK_COUNT ? n : null;
}

/** The line itself, clamped so a bad number can never render nothing. */
export function hookLine(n: number): string {
  const i = normaliseHook(String(n)) ?? 1;
  return HERO_HOOKS[i - 1];
}
