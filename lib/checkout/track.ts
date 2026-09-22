"use client";

// Checkout tracking, shared by every product's form (v33.1).
//
// WHY THIS EXISTS. InitiateCheckout used to be fired by a Preflight
// specific wrapper called from the Preflight form. When v33 added a
// second product with its own form, the new form created the order and
// opened Razorpay but fired nothing: the event lived in the page, not in
// the checkout. The routes had been made product-generic; the tracking
// had not.
//
// So it lives here now, beside the shared Razorpay client, and both
// forms call it. A third product gets the event by using the same
// helper, not by remembering to copy a line.
//
// The value and currency come from the product record rather than being
// passed in loose, so the event can never disagree with what is charged.

import { trackEvent } from "@/lib/meta-events";

export type TrackableProduct = {
  slug: string;
  name: string;
  priceInr: number;
};

export const CHECKOUT_CURRENCY = "INR";

/**
 * Fired on the pay button, before the order is created. Browser and
 * CAPI, one event_id, so Meta collapses the pair.
 */
export function trackCheckoutInitiate(product: TrackableProduct): void {
  trackEvent(
    "InitiateCheckout",
    {
      content_name: product.name,
      content_category: "digital_product",
      value: product.priceInr,
      currency: CHECKOUT_CURRENCY,
    },
    {},
    undefined,
    // v33.1: which dataset this belongs to. Preflight resolves to the
    // Deeper Designs pixel, an Anish Modi product to its own.
    product.slug,
  );
}

/**
 * The browser half of the Purchase pair, echoed on the thank-you page.
 * The server half is fired by fulfilment under the same id, which is the
 * Razorpay payment id, so the two collapse into one conversion.
 */
export function trackCheckoutPurchase(
  product: TrackableProduct,
  paymentId: string,
): void {
  trackEvent(
    "Purchase",
    {
      content_name: product.name,
      content_category: "digital_product",
      value: product.priceInr,
      currency: CHECKOUT_CURRENCY,
    },
    {},
    paymentId,
    product.slug,
  );
}
