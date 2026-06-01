import type { NextConfig } from "next";

// Content-Security-Policy.
// Tailwind v4 and the inline-styled showcase pages need `style-src 'unsafe-inline'`.
// Vercel Analytics needs vercel.live + va.vercel-scripts.com on script/connect.
// Per-site links into deeperdesigns subdomains (cge.deeperdesigns.in, etc.)
// land via img + connect; allow *.deeperdesigns.in across the relevant directives.
const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' is required for the Next.js App Router hydration boot
  // and route-prefetch scripts. 'unsafe-eval' is kept defensively for
  // libraries that compile expressions at runtime (some font / analytics
  // shims need it). Tighten to a nonce-based policy in a follow-up PR.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.deeperdesigns.in https://*.vercel.app",
  "media-src 'self' https://*.deeperdesigns.in",
  "connect-src 'self' https://*.deeperdesigns.in https://vitals.vercel-insights.com https://vercel.live https://va.vercel-scripts.com",
  "frame-src 'self' https://vercel.live",
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
