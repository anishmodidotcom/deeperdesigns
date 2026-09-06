// Shared contact constants used across CTAs.

export const WHATSAPP_NUMBER = "+91 99687 16498";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi, I'd like to explore possibilities for my business.";
export const WHATSAPP_HREF = `https://wa.me/919968716498?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

// v29.2: one support address for the whole company, and one destination
// for the notifications products send. There is no per-product address:
// Preflight, the site footer, the privacy policy and the Organization
// JSON-LD all read these.
//
// Both are overridable by a single env var each, so the inbox can move
// without a deploy. Neither is NEXT_PUBLIC, so a client component that
// imports these gets the default rather than the override; that is the
// intended behaviour, because every surface that renders an address is a
// server component and the default is the real address anyway.
//
// Note on the name: process.env.NOTIFY_EMAIL is a different, older
// variable that only app/api/start-your-study reads, for lead
// notifications. It is deliberately left alone. DD_NOTIFY_EMAIL below is
// the product-sale notification destination and does not affect leads.
export const SUPPORT_EMAIL =
  process.env.DD_SUPPORT_EMAIL ?? "hey@deeperdesigns.in";
export const SUPPORT_EMAIL_HREF = `mailto:${SUPPORT_EMAIL}`;

export const NOTIFY_EMAIL =
  process.env.DD_NOTIFY_EMAIL ?? "hey@deeperdesigns.in";

export const FORM_HREF = "/start-your-study";
export const FORM_CTA = "Let's explore possibilities";
