// Checkout constants and formatting (v29.2).
//
// Everything commercial about a product moved to lib/products.ts, which
// reads process.env and is server only. What is left here is safe to
// import from a client component: literals, field caps, and a pure
// formatter. Nothing in this file touches the environment.

// Indian digit grouping, two decimals only when the value has them.
export function formatInr(value: number): string {
  const fixed = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2);
  const [whole, fraction] = fixed.split(".");
  const last3 = whole.slice(-3);
  const rest = whole.slice(0, -3);
  const grouped = rest
    ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${last3}`
    : last3;
  return fraction ? `${grouped}.${fraction}` : grouped;
}

export function priceLabel(priceInr: number): string {
  return `₹${formatInr(priceInr)}`;
}

// Razorpay checkout chrome. The modal header is the studio plus the
// product; the line item is the product's own description.
export const RAZORPAY_CHECKOUT_NAME_PREFIX = "Deeper Designs";
export const RAZORPAY_THEME_COLOR = "#7C6CFF";

export function checkoutName(productName: string): string {
  return `${RAZORPAY_CHECKOUT_NAME_PREFIX} · ${productName}`;
}

// Field caps for the order form. The note cap is the 500 characters the
// textarea enforces; the Razorpay notes object caps each value at 512
// characters, so the UTM suffix is appended inside RAZORPAY_NOTE_MAX.
export const PREFLIGHT_FIELD_MAX = {
  name: 120,
  email: 254,
  note: 500,
} as const;

// Razorpay rejects a notes value over 512 characters outright, which
// would fail the order creation rather than degrade. Truncate before
// sending.
export const RAZORPAY_NOTE_MAX = 500;
