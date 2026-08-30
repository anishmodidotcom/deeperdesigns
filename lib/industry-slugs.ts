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
