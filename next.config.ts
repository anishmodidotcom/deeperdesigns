import type { NextConfig } from "next";

// Content-Security-Policy.
//
// F8 v16 retry on A+ (the v15.2 deferred item): the nonce-based migration
// hit the same wall a second time.
//   - With 'strict-dynamic' + nonce, framework chunk <script src=...>
//     tags were blocked (v15.2 finding).
//   - Without 'strict-dynamic', script chunks load via 'self' fine, but
//     Next.js's inline RSC bootstrap scripts are blocked — they cannot
//     receive an auto-nonce on statically-prerendered pages because the
//     render-time HTML mutation never happens at request time.
// Static prerendering is the architectural constraint. Forcing every
// page through `connection()` to opt out would cost site-wide TTFB for
// one letter on securityheaders.com.
// Per spec, A is accepted and we keep 'unsafe-inline' on script-src.
// Path to A+ in a future PR: pick the highest-traffic surfaces (root,
// /work/maplelens, /work/deeper-content), force them dynamic with
// `await connection()`, measure TTFB, ratchet outward if acceptable.
//
// Tailwind v4 and the inline-styled showcase pages also need
// `style-src 'unsafe-inline'`.
// Vercel Analytics needs vercel.live + va.vercel-scripts.com on
// script/connect. Per-site links into deeperdesigns subdomains
// (cge.deeperdesigns.in, etc.) land via img + connect; allow
// *.deeperdesigns.in across the relevant directives.
//
// v17.1: Meta Pixel needs Facebook + connect.facebook.net domains
// allowlisted on script-src (loads fbevents.js), img-src (the noscript
// tracking pixel + tr beacons), connect-src (fbq POSTs back to FB), and
// frame-src (Pixel uses an iframe for some matching surfaces).
// v29: Razorpay Standard Checkout on /preflight. checkout.js is fetched
// from checkout.razorpay.com and renders the payment modal in an iframe
// served from api.razorpay.com, which then talks back to *.razorpay.com
// and loads bank and wallet artwork from cdn.razorpay.com. Card and
// netbanking flows submit forms into that iframe, so form-action needs
// the same origins.
//
// These are added to the single site-wide CSP rather than a second
// header scoped to /preflight: two Content-Security-Policy headers are
// enforced as their intersection, so a narrower second one would still
// block the script. The origins are inert on every other route because
// nothing else references them.
const RAZORPAY_SCRIPT = "https://checkout.razorpay.com";
const RAZORPAY_API = "https://api.razorpay.com";
const RAZORPAY_ANY = "https://*.razorpay.com";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://connect.facebook.net https://*.facebook.net ${RAZORPAY_SCRIPT} ${RAZORPAY_ANY}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  `img-src 'self' data: blob: https://*.deeperdesigns.in https://*.vercel.app https://www.facebook.com https://*.facebook.com https://connect.facebook.net ${RAZORPAY_ANY}`,
  "media-src 'self' https://*.deeperdesigns.in",
  `connect-src 'self' https://*.deeperdesigns.in https://vitals.vercel-insights.com https://vercel.live https://va.vercel-scripts.com https://www.facebook.com https://*.facebook.com https://connect.facebook.net https://graph.facebook.com ${RAZORPAY_API} ${RAZORPAY_ANY}`,
  `frame-src 'self' https://vercel.live https://www.facebook.com ${RAZORPAY_API} ${RAZORPAY_SCRIPT} ${RAZORPAY_ANY}`,
  "object-src 'none'",
  "base-uri 'self'",
  `form-action 'self' ${RAZORPAY_API} ${RAZORPAY_ANY}`,
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Content-Security-Policy", value: CSP },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  // F14: override any upstream-injected wildcard. Our codebase never sets
  // ACAO, but the v15.0 audit caught `Access-Control-Allow-Origin: *` on
  // the HTML document response. That can only be coming from the Vercel
  // edge (e.g. on redirect responses or CDN defaults). Pinning it to our
  // own origin here makes user-defined-header precedence win and locks
  // the document to same-origin reads.
  { key: "Access-Control-Allow-Origin", value: "https://www.deeperdesigns.in" },
] as const;

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    // v29: /preflight relaxes Cross-Origin-Opener-Policy by exactly one
    // step, from same-origin to same-origin-allow-popups. Razorpay's
    // netbanking and some UPI flows open the bank in a popup and post
    // the result back through window.opener, which same-origin severs.
    // allow-popups keeps this document isolated from anything that opens
    // IT, which is the property that matters here, and only loosens the
    // link to windows this page opens itself.
    //
    // It is a replacement, not an addition: two COOP headers on one
    // response is undefined behaviour, so the Preflight list is built by
    // swapping the value rather than appending a second entry.
    const preflightHeaders = SECURITY_HEADERS.map((h) =>
      h.key === "Cross-Origin-Opener-Policy"
        ? { key: h.key, value: "same-origin-allow-popups" }
        : { key: h.key, value: h.value },
    );
    // Order matters: Next merges matching entries by header key and the
    // last match wins, so the Preflight entries sit after the catch-all.
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS.map((h) => ({ key: h.key, value: h.value })),
      },
      {
        source: "/preflight",
        headers: preflightHeaders,
      },
      {
        source: "/preflight/:path*",
        headers: preflightHeaders,
      },
    ];
  },
};

export default nextConfig;
