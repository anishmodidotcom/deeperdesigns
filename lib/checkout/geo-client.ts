"use client";

// The browser half of the country check (v33).
//
// Split from geo.ts because that file reads next/headers, which a client
// component may not import. Used only when the Vercel geo header is
// absent, and only to decide whether to show an approximation beneath
// the price.

export function localeCountry(): string | null {
  if (typeof navigator === "undefined") return null;
  const tag = navigator.language;
  if (!tag) return null;
  // en-AE -> AE. A bare "en" has no region and tells us nothing.
  const parts = tag.split("-");
  const region = parts.length > 1 ? parts[parts.length - 1] : "";
  return /^[A-Za-z]{2}$/.test(region) ? region.toUpperCase() : null;
}
