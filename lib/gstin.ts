// GSTIN handling (v33).
//
// A GSTIN is fifteen characters: two digits of state code, the ten
// characters of the holder's PAN (five letters, four digits, one
// letter), one alphanumeric entity number, the literal Z, and one
// alphanumeric checksum.
//
// Nothing here is verified against any government API. The format check
// catches a typo and a paste of the wrong field; it does not claim the
// number exists. An invoice raised against it is still a human decision.

export const GSTIN_LENGTH = 15;

export const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

export const GSTIN_ERROR =
  "That does not look like a valid GSTIN. It is 15 characters, for example 07AAACD1234A1Z5.";

/** What the input does on every keystroke: upper-case, no spaces. */
export function normalizeGstin(value: string): string {
  return value.toUpperCase().replace(/\s+/g, "");
}

export function isValidGstin(value: string): boolean {
  return GSTIN_RE.test(normalizeGstin(value));
}

export type BillingDetails = {
  companyName: string;
  companyAddress: string;
  gstin: string;
};

export const EMPTY_BILLING: BillingDetails = {
  companyName: "",
  companyAddress: "",
  gstin: "",
};

/** True when the buyer supplied anything at all. */
export function hasBilling(b: BillingDetails): boolean {
  return Boolean(
    b.companyName.trim() || b.companyAddress.trim() || b.gstin.trim(),
  );
}
