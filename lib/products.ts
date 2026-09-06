// Sellable products, as data (v29.2).
//
// Preflight is the first product sold through Razorpay Standard Checkout,
// and it will not be the last. Everything the payment path needs to know
// about a product lives in the record below: what it is called, what it
// costs, how its GST is composed, which sheet its sales queue is on, and
// where the buyer lands afterwards.
//
// ADDING A PRODUCT IS ADDING AN ENTRY HERE PLUS ITS PAGE. Nothing in
// /api/preflight/order, /verify or /webhook changes: they take the slug
// the form posts, look it up here, and use whatever the record says. The
// only work is the entry, the landing page that posts the slug, and the
// thank-you and terms pages it points at.
//
// SERVER ONLY. This module reads process.env, so a client component that
// imports it gets undefined for every override and silently falls back to
// the defaults. Pass what the browser needs down as props from a server
// component instead; app/preflight/page.tsx does exactly that.

export type Product = {
  slug: string;
  /** Shown in the Razorpay modal header and the notification subject. */
  name: string;
  /** Shown as the Razorpay line item. */
  description: string;
  /** Rupees, GST inclusive. */
  priceInr: number;
  /** Percent, already included in priceInr. */
  gstRatePercent: number;
  sac: string;
  /** Spreadsheet holding this product's fulfilment queue. */
  sheetId: string | undefined;
  thankYouPath: string;
  termsPath: string;
};

// Defaults come from the existing PREFLIGHT_* variables so nothing set in
// Vercel today has to change. A second product would introduce its own
// variables, or simply hardcode its price here.
export const PRODUCTS = {
  preflight: {
    slug: "preflight",
    name: "Preflight",
    description: "Preflight · Launch audit suite",
    priceInr: Number(process.env.PREFLIGHT_PRICE_INR ?? "10000"),
    gstRatePercent: Number(process.env.PREFLIGHT_GST_RATE ?? "18"),
    sac: process.env.PREFLIGHT_SAC ?? "998314",
    sheetId: process.env.GOOGLE_SHEETS_ID,
    thankYouPath: "/preflight/thank-you",
    termsPath: "/preflight/terms",
  },
} as const satisfies Record<string, Product>;

export type ProductSlug = keyof typeof PRODUCTS;

export const PRODUCT_CURRENCY = "INR";

// Narrows an untrusted value from a request body to a known product.
// Returns null for anything else, which the routes turn into a 400.
export function getProduct(slug: unknown): Product | null {
  if (typeof slug !== "string") return null;
  return (PRODUCTS as Record<string, Product>)[slug] ?? null;
}

// Paise, which is what Razorpay's Orders API takes.
export function amountPaise(product: Product): number {
  return Math.round(product.priceInr * 100);
}

export type GstBreakdown = {
  price: number;
  base: number;
  gst: number;
  rate: number;
  sac: string;
};

// The price is GST inclusive, so the base is the price divided by
// (1 + rate/100) and the GST is the remainder. Rounded to two decimals
// only at the point of display; the arithmetic stays in rupees.
export function gstBreakdown(product: Product): GstBreakdown {
  const price = product.priceInr;
  const base = price / (1 + product.gstRatePercent / 100);
  return {
    price,
    base: Math.round(base * 100) / 100,
    gst: Math.round((price - base) * 100) / 100,
    rate: product.gstRatePercent,
    sac: product.sac,
  };
}

// The variables checkout refuses to start without. Razorpay, because
// there is nothing to charge with; the sheet and its credential, because
// a payment that cannot be written to the fulfilment queue is a sale
// nobody sees. Checked before the order is created rather than
// discovered halfway through, when the buyer has already been charged.
//
// NEXT_PUBLIC_RAZORPAY_KEY_ID is in the list because Standard Checkout
// cannot open without it, and a missing one would fail after the order
// exists. It is read here on the server, never inlined into the bundle.
const GLOBAL_REQUIRED_ENV = [
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
  "GOOGLE_SERVICE_ACCOUNT_JSON",
] as const;

// Returns the names of every required variable that is absent or blank
// for this product. Empty array means the flow is safe to start.
export function missingCheckoutConfig(product: Product): string[] {
  const missing = GLOBAL_REQUIRED_ENV.filter(
    (name) => !(process.env[name] ?? "").trim(),
  ) as string[];
  // The sheet id is per product. Preflight's comes from GOOGLE_SHEETS_ID,
  // so that is the name worth logging when it is absent.
  if (!product.sheetId?.trim()) missing.push("GOOGLE_SHEETS_ID");
  return missing;
}
