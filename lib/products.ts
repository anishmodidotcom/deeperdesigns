// Sellable products, as data (v29.2, extended into a checkout platform in
// v33).
//
// ADDING A PRODUCT IS ADDING AN ENTRY HERE. The checkout routes take the
// slug the form posts, look it up here, and use whatever the record says:
// the price, the tax, the sheet, who gets told, which confirmation
// template the buyer receives and where they land. Nothing in
// /api/checkout/* knows about any particular product.
//
// SERVER ONLY. This module reads process.env, so a client component that
// imports it gets undefined for every override and silently falls back to
// the defaults. Pass what the browser needs down as props from a server
// component instead; app/preflight/page.tsx does exactly that.
//
// ON CURRENCY. Every order is created in INR and charged at priceInr.
// Razorpay settles in INR. Foreign cards are enabled, so an overseas
// buyer pays with their own card and their bank does the conversion at
// its own rate. displayPrices below is therefore presentation only: a
// figure shown beneath the price so a buyer abroad knows roughly what
// this costs them. Exact local pricing would need Razorpay multi-currency
// presentment, which is not enabled on this account. Until it is, the
// amount charged and the amount shown as the price are the same INR
// number, and a local figure is never presented as the amount charged.

export type Brand = "deeper-designs" | "anish-modi";

/** Which confirmation the buyer receives. null means none is sent. */
export type DeliveryTemplate = "file" | "scheduling";

/** Approximations only. See ON CURRENCY above. */
export type DisplayPrices = { AED?: number; USD?: number };

export type ProductTax = {
  /** Every price on this site includes tax. */
  inclusive: true;
  ratePercent: number;
  sac: string;
};

export type Product = {
  slug: string;
  /** Shown in the Razorpay modal header and the notification subject. */
  name: string;
  /** Shown as the Razorpay line item. */
  description: string;
  /** Whose product this is. Deeper Designs may be the payment rail only. */
  brand: Brand;
  /** May it appear on any Deeper Designs surface at all. */
  listed: boolean;
  /** Rupees. The amount actually charged. */
  priceInr: number;
  displayPrices: DisplayPrices;
  tax: ProductTax;
  /** Whether the form offers the optional GST invoice fields. */
  collectGstDetails: boolean;
  /** Spreadsheet holding this product's fulfilment queue. */
  sheetId: string | undefined;
  /** Where the sale notification goes. */
  notifyEmail: string;
  /**
   * v33.1: the Meta dataset this product reports to. An Anish Modi
   * product reports to the Anish Modi pixel, not to Deeper Designs'.
   * Both undefined means the product falls back to the DD dataset and
   * the fallback is logged, so tracking never goes dark.
   */
  metaPixelId: string | undefined;
  metaCapiToken: string | undefined;
  deliveryTemplate: DeliveryTemplate | null;
  /**
   * v29.3: where the buyer's download lives. A view-only link, emailed to
   * them on a verified payment. When it is absent the buyer email is
   * skipped, sent_at stays blank on the sheet row, and the sale falls
   * back to being delivered by hand from that row.
   */
  deliveryUrl?: string | undefined;
  /**
   * v29.4: the object key in the private Supabase bucket. Delivery signs
   * a per-buyer, expiring URL for this key. deliveryUrl above is now the
   * fallback, used only when storage is not configured or signing fails,
   * so delivery never stops on a storage problem.
   */
  deliveryObject?: string | undefined;
  /** Where a "scheduling" product sends the buyer to pick a time. */
  schedulingUrl?: string | undefined;
  /**
   * v29.4: whether the Razorpay account actually accepts international
   * cards. False until Razorpay approves it, and while false the claim
   * is not rendered anywhere. Flipping this env var is the whole change
   * on the day it is approved.
   */
  internationalCards: boolean;
  thankYouPath: string;
  termsPath?: string;
};

// The claim is off unless the variable explicitly says "true", so a
// typo or a blank value reads as false rather than as a claim we cannot
// currently honour.
function envFlag(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "true";
}

const DEFAULT_NOTIFY = "hey@deeperdesigns.in";

// Preflight's defaults come from the existing PREFLIGHT_* variables so
// nothing set in Vercel today has to change.
export const PRODUCTS = {
  preflight: {
    slug: "preflight",
    name: "Preflight",
    description: "Preflight · Launch audit suite",
    brand: "deeper-designs",
    listed: true,
    priceInr: Number(process.env.PREFLIGHT_PRICE_INR ?? "10000"),
    displayPrices: {},
    tax: {
      inclusive: true,
      ratePercent: Number(process.env.PREFLIGHT_GST_RATE ?? "18"),
      sac: process.env.PREFLIGHT_SAC ?? "998314",
    },
    collectGstDetails: true,
    sheetId: process.env.GOOGLE_SHEETS_ID,
    notifyEmail: process.env.DD_NOTIFY_EMAIL ?? DEFAULT_NOTIFY,
    // The sitewide Deeper Designs dataset, which is what Preflight has
    // always reported to.
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    metaCapiToken: process.env.META_CAPI_ACCESS_TOKEN,
    deliveryTemplate: "file",
    deliveryUrl: process.env.PREFLIGHT_DELIVERY_URL,
    deliveryObject:
      process.env.PREFLIGHT_DELIVERY_OBJECT ??
      "preflight-audit-suite/current.zip",
    internationalCards: envFlag(process.env.PREFLIGHT_INTERNATIONAL_CARDS),
    thankYouPath: "/preflight/thank-you",
    termsPath: "/preflight/terms",
  },

  // v33: an Anish Modi product. Deeper Designs is the payment rail and
  // nothing else: listed is false, so it appears on no DD surface, and
  // its confirmation and notification go to its own addresses.
  //
  // SAC 998311 is management consulting, which fits a paid working
  // session better than Preflight's 998314 (IT design and development).
  // It is a config value; change it here if an accountant prefers
  // another.
  "claude-setup-intensive": {
    slug: "claude-setup-intensive",
    name: "Claude Setup Intensive",
    description: "Claude Setup Intensive · A working session with Anish Modi",
    brand: "anish-modi",
    listed: false,
    priceInr: 25000,
    displayPrices: { AED: 1000, USD: 300 },
    tax: { inclusive: true, ratePercent: 18, sac: "998311" },
    collectGstDetails: true,
    sheetId: process.env.AM_SHEETS_ID,
    notifyEmail: process.env.AM_NOTIFY_EMAIL ?? DEFAULT_NOTIFY,
    metaPixelId: process.env.AM_META_PIXEL_ID,
    metaCapiToken: process.env.AM_META_CAPI_TOKEN,
    deliveryTemplate: "scheduling",
    schedulingUrl: "https://calendly.com/modianish",
    internationalCards: true,
    thankYouPath: "/checkout/claude-setup-intensive/thank-you",
  },
} as const satisfies Record<string, Product>;

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
  const base = price / (1 + product.tax.ratePercent / 100);
  return {
    price,
    base: Math.round(base * 100) / 100,
    gst: Math.round((price - base) * 100) / 100,
    rate: product.tax.ratePercent,
    sac: product.tax.sac,
  };
}

// The approximation shown beneath the price to a buyer outside India.
// Never the amount charged: that is always priceInr. Returns null when
// the product has no figure for that country, which is the normal case.
export function approximatePriceLine(
  product: Product,
  country: string | null,
): string | null {
  if (!country) return null;
  const cc = country.trim().toUpperCase();
  if (!cc || cc === "IN") return null;
  const format = (n: number) => n.toLocaleString("en-US");
  if (cc === "AE" && product.displayPrices.AED) {
    return `About AED ${format(product.displayPrices.AED)} on a UAE card.`;
  }
  if (product.displayPrices.USD) {
    return `About USD ${format(product.displayPrices.USD)} on an international card.`;
  }
  return null;
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

// Which env var holds a given product's sheet id, for the log line when
// it is absent.
const SHEET_ENV: Record<string, string> = {
  preflight: "GOOGLE_SHEETS_ID",
  "claude-setup-intensive": "AM_SHEETS_ID",
};

// Returns the names of every required variable that is absent or blank
// for this product. Empty array means the flow is safe to start.
export function missingCheckoutConfig(product: Product): string[] {
  const missing = GLOBAL_REQUIRED_ENV.filter(
    (name) => !(process.env[name] ?? "").trim(),
  ) as string[];
  if (!product.sheetId?.trim()) {
    missing.push(SHEET_ENV[product.slug] ?? "SHEET_ID");
  }
  return missing;
}
