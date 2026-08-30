// v25.5: phone normalization for Meta advanced matching.
//
// Meta hashes phone numbers as digits only, including the country code, with
// no plus and no separators. The form previously sent the number exactly as
// typed, so an Indian mobile entered as "9876543210" hashed to a value that
// could never match Meta's own hash of "919876543210". That silently cost
// match quality on every Lead.
//
// DD serves India first, with some UAE traffic, so those two country codes
// are the ones inferred. Anything already carrying a country code is kept.

const INDIA_CC = "91";
const UAE_CC = "971";

export function normalizePhone(raw: string): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) return "";

  // Already carries a known country code.
  if (digits.startsWith(INDIA_CC) && digits.length === 12) return digits;
  if (digits.startsWith(UAE_CC) && digits.length === 12) return digits;

  // Indian mobile numbers are 10 digits starting 6 to 9.
  if (digits.length === 10 && /^[6-9]/.test(digits)) return INDIA_CC + digits;

  // UAE mobile numbers are 9 digits starting 5, or 10 with a leading 0.
  if (digits.length === 9 && digits.startsWith("5")) return UAE_CC + digits;
  if (digits.length === 10 && digits.startsWith("05"))
    return UAE_CC + digits.slice(1);

  // Local trunk prefix on an Indian number.
  if (digits.length === 11 && digits.startsWith("0"))
    return INDIA_CC + digits.slice(1);

  // Unknown shape. Send the digits through unchanged rather than guessing.
  return digits;
}
