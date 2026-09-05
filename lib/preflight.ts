// Preflight product configuration (v29).
//
// Every commercial value on the page, in the emails, on the confirmation
// receipt and in the Razorpay order comes from here, and here reads it
// from the environment. Nothing is hardcoded at a call site, so the price
// or the GST rate can move without a copy edit anywhere else.
//
// The build must compile and render with none of these set: the page
// renders, the payment button disables itself, and a dev-only notice
// explains why. See isPaymentConfigured() below.

export const PREFLIGHT_PRICE_INR = Number(
  process.env.PREFLIGHT_PRICE_INR ?? "10000",
);

export const PREFLIGHT_GST_RATE = Number(
  process.env.PREFLIGHT_GST_RATE ?? "18",
);

export const PREFLIGHT_SAC = process.env.PREFLIGHT_SAC ?? "998314";

export const PREFLIGHT_NOTIFY_EMAIL =
  process.env.PREFLIGHT_NOTIFY_EMAIL ?? "hey@deeperdesigns.in";

export const PREFLIGHT_SUPPORT_EMAIL =
  process.env.PREFLIGHT_SUPPORT_EMAIL ?? "hey@deeperdesigns.in";

export const PREFLIGHT_CURRENCY = "INR";

// Paise, which is what Razorpay's Orders API takes.
export const PREFLIGHT_AMOUNT_PAISE = Math.round(PREFLIGHT_PRICE_INR * 100);

// The price is GST inclusive, so the base is the price divided by
// (1 + rate/100) and the GST is the remainder. Both are rounded to two
// decimals only at the point of display; the arithmetic stays in rupees.
export type GstBreakdown = {
  price: number;
  base: number;
  gst: number;
  rate: number;
  sac: string;
};

export function gstBreakdown(): GstBreakdown {
  const price = PREFLIGHT_PRICE_INR;
  const base = price / (1 + PREFLIGHT_GST_RATE / 100);
  return {
    price,
    base: Math.round(base * 100) / 100,
    gst: Math.round((price - base) * 100) / 100,
    rate: PREFLIGHT_GST_RATE,
    sac: PREFLIGHT_SAC,
  };
}

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

export const PREFLIGHT_PRICE_LABEL = `₹${formatInr(PREFLIGHT_PRICE_INR)}`;

// Razorpay checkout copy, fixed by the v29 spec.
export const RAZORPAY_CHECKOUT_NAME = "Deeper Designs · Preflight";
export const RAZORPAY_CHECKOUT_DESCRIPTION = "Preflight · Launch audit suite";
export const RAZORPAY_THEME_COLOR = "#7C6CFF";

// Field caps for the order form. The note cap is the 500 characters the
// textarea enforces; the Razorpay notes object caps each value at 512
// characters, so the UTM suffix is appended inside NOTE_NOTES_MAX.
export const PREFLIGHT_FIELD_MAX = {
  name: 120,
  email: 254,
  note: 500,
} as const;

// Razorpay rejects a notes value over 512 characters outright, which would
// fail the order creation rather than degrade. Truncate before sending.
export const RAZORPAY_NOTE_MAX = 500;

// v29.1: the variables the order route refuses to start a payment
// without. Razorpay, because there is nothing to charge with; Sheets,
// because a payment that cannot be written to the fulfilment queue is a
// sale nobody will see. Checked before the order is created rather than
// discovered halfway through the flow, when the buyer has already been
// charged.
//
// NEXT_PUBLIC_RAZORPAY_KEY_ID is in the list because Standard Checkout
// cannot open without it, and a missing one would fail after the order
// exists. It is read here on the server, never inlined into the bundle.
export const PREFLIGHT_REQUIRED_ENV = [
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
  "GOOGLE_SHEETS_ID",
  "GOOGLE_SERVICE_ACCOUNT_JSON",
] as const;

// Returns the names of every required variable that is absent or blank.
// Empty array means the flow is safe to start.
export function missingPreflightConfig(): string[] {
  return PREFLIGHT_REQUIRED_ENV.filter(
    (name) => !(process.env[name] ?? "").trim(),
  );
}

export function isPaymentConfigured(): boolean {
  return Boolean(
    process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  );
}

// Client-side counterpart. Only the public key is readable in the browser,
// and Next inlines it at build time, so it has to be referenced as a whole
// property access rather than through a dynamic lookup.
export function isCheckoutConfiguredClient(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
}
