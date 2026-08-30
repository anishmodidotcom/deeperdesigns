// v25.5: industry attribution that survives navigation.
//
// The ?from={slug} param used to be read only at submit time, straight off
// the live URL. Anyone who landed on a /for page and then reached the form
// by any route that did not carry the param (the nav "Talk to us" button,
// the scaffold CTA, or any intermediate page) arrived unattributed, so
// industry pages were under-credited for the leads they produced.
//
// The industry is now recorded when the visitor is on a /for page and read
// back at submit time, with the URL param still winning when present. Kept
// in sessionStorage: it is per-tab, expires with the session, and holds no
// personal data. Every read and write is validated against the known slugs.

import { isIndustrySlug } from "@/lib/industry-slugs";

const KEY = "dd_from_industry";

export function rememberIndustry(slug: string): void {
  if (typeof window === "undefined") return;
  if (!isIndustrySlug(slug)) return;
  try {
    window.sessionStorage.setItem(KEY, slug);
  } catch {
    // storage disabled or full, attribution is best effort
  }
}

// Returns the attributed industry slug: the ?from param when it is a known
// slug, else the last /for page seen in this tab, else "".
export function attributedIndustry(): string {
  if (typeof window === "undefined") return "";
  try {
    const param = new URLSearchParams(window.location.search).get("from");
    if (param && isIndustrySlug(param)) return param;
  } catch {
    // malformed query string, fall through to storage
  }
  try {
    const stored = window.sessionStorage.getItem(KEY);
    if (stored && isIndustrySlug(stored)) return stored;
  } catch {
    // storage disabled
  }
  return "";
}
