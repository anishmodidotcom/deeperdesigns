// v25.5: the industry slug set, split out from lib/industries.ts so client
// components can validate a slug without pulling the full 147 KB industry
// dataset into their route bundle.
//
// lib/industries.ts types Industry["slug"] as IndustrySlug, so adding an
// industry there without adding it here is a type error, not silent drift.

export const INDUSTRY_SLUGS = [
  "d2c-brands",
  "real-estate",
  "coaching",
  "clinics",
  "restaurants",
  "jewellery",
  "manufacturing",
  "fashion",
  "ca-firms",
  "salons",
  "logistics",
  "automotive",
  "hotels",
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

const SLUG_SET: ReadonlySet<string> = new Set(INDUSTRY_SLUGS);

export function isIndustrySlug(value: string): value is IndustrySlug {
  return SLUG_SET.has(value);
}

// v30.1: non-industry ?from values. The Preflight service tier sends a
// visitor to the strategy-call form with from=preflight, which is a
// source rather than an industry, so it is kept out of INDUSTRY_SLUGS:
// that list types the /for/[slug] routes and must stay exactly the
// thirteen industries.
export const EXTRA_FROM_SOURCES = ["preflight"] as const;

const EXTRA_SET: ReadonlySet<string> = new Set(EXTRA_FROM_SOURCES);

// Every value the ?from param accepts: the thirteen industries plus the
// extra sources above.
export function isKnownFrom(value: string): boolean {
  return SLUG_SET.has(value) || EXTRA_SET.has(value);
}
