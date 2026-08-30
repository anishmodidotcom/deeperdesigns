import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { MotionConfig } from "motion/react";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ShowcaseNavigator from "@/components/ShowcaseNavigator";
import MetaPixel from "@/components/MetaPixel";
import MetaPageViewOnRouteChange from "@/components/MetaPageViewOnRouteChange";
import ShowcaseRouteProvider from "@/components/ShowcaseRouteProvider";
import { StructuredData, ORGANIZATION_LD } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// v25.5: two fixes here.
//
// 1. alternates.canonical is gone. A canonical in the root layout is
//    inherited by every route that does not set its own, which meant the
//    48 /demos pages and the 404 all declared the homepage as their
//    canonical while also being noindexed, a contradictory pair of
//    signals. The homepage sets its own canonical in app/page.tsx.
// 2. The title and description here were the v21 homepage copy, kept
//    alive only as a fallback and already superseded by app/page.tsx. They
//    now describe the site generically, so any route that somehow lacks
//    metadata gets something accurate rather than stale homepage copy.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.deeperdesigns.in"),
  title: "Deeper Designs",
  description: "An India-first studio building custom digital tools and operational systems for ambitious businesses.",
  openGraph: {
    title: "Deeper Designs",
    description: "An India-first studio building custom digital tools and operational systems for ambitious businesses.",
    url: "https://www.deeperdesigns.in/",
    siteName: "Deeper Designs",
    images: [{ url: "/brand/og-deeperdesigns.png", width: 1200, height: 630, alt: "Deeper Designs · Custom tools, built around how your business actually works." }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Designs · Custom tools for Indian businesses",
    description: "Custom digital tools and operational systems for ambitious Indian businesses. From ₹25,000.",
    images: ["/brand/og-deeperdesigns.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-light.svg", media: "(prefers-color-scheme: light)" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  // Meta domain verification (v17). Required for Business Manager to
  // attribute deeperdesigns.in to the DD ad account.
  // Google Search Console verification (v18) added alongside so GSC
  // can confirm ownership when Cowork submits the sitemap.
  other: {
    "facebook-domain-verification": "ctti8c403wm28szc3zwnntg41ljhgc",
    "google-site-verification": "xBf34m461jwmjJwAyBWOmSr5PsnrDPcQ21Ut6rzEVfM",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      >
        <body>
          {/* v18.1: dd_visitor_id cookie, set once per browser, BEFORE
              hydration / any tracking event fires. Hashed and sent as
              external_id on every CAPI event so returning visitors
              aggregate in Meta. 1-year expiry, SameSite=Lax. */}
          <Script id="dd-visitor-id" strategy="beforeInteractive">
            {`(function(){
              try {
                if (!/(^|;\\s*)dd_visitor_id=/.test(document.cookie)) {
                  var id = (window.crypto && crypto.randomUUID)
                    ? crypto.randomUUID()
                    : (Date.now() + '-' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2));
                  document.cookie = 'dd_visitor_id=' + id + '; path=/; max-age=31536000; SameSite=Lax';
                }
              } catch (e) { /* cookies disabled, silent */ }
            })();`}
          </Script>
          {/* v25.5: skip link. The site opens with a fixed nav carrying a
              13-item industries menu, so a keyboard or screen reader user
              had to pass all of it on every page to reach the content. */}
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {/* v25.5: one MotionConfig retrofits reduced-motion onto every
              motion/react component in the tree. GSAP, Lenis and the
              ambient videos already honoured the preference; the 144 files
              animating through motion/react did not. */}
          <MotionConfig reducedMotion="user">
            <ShowcaseRouteProvider>
              {/* v25.5: SmoothScroll no longer wraps the page. It attaches
                  scroll behaviour and renders nothing, so it sits beside
                  the content and loads as a lazy chunk. */}
              <SmoothScroll />
              <Nav />
              {children}
              <Footer />
              <WhatsAppButton />
              <ShowcaseNavigator />
            </ShowcaseRouteProvider>
          </MotionConfig>
          {/* v18: Organization JSON-LD lives in the head for every route. */}
          <StructuredData data={ORGANIZATION_LD} />
          <Analytics />
          <MetaPixel />
          <MetaPageViewOnRouteChange />
        </body>
      </html>
    </ViewTransitions>
  );
}
