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
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://connect.facebook.net https://*.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.deeperdesigns.in https://*.vercel.app https://www.facebook.com https://*.facebook.com https://connect.facebook.net",
  "media-src 'self' https://*.deeperdesigns.in",
  "connect-src 'self' https://*.deeperdesigns.in https://vitals.vercel-insights.com https://vercel.live https://va.vercel-scripts.com https://www.facebook.com https://*.facebook.com https://connect.facebook.net https://graph.facebook.com",
  "frame-src 'self' https://vercel.live https://www.facebook.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
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
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS.map((h) => ({ key: h.key, value: h.value })),
      },
    ];
  },
};

export default nextConfig;
