import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ShowcaseNavigator from "@/components/ShowcaseNavigator";
import MetaPixel from "@/components/MetaPixel";
import MetaPageViewOnRouteChange from "@/components/MetaPageViewOnRouteChange";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.deeperdesigns.in"),
  title: "Deeper Designs · Custom tools for Indian businesses",
  description: "Deeper Designs is an India-first studio building custom digital tools and operational systems for ambitious Indian businesses. From ₹25,000.",
  alternates: { canonical: "https://www.deeperdesigns.in/" },
  openGraph: {
    title: "Deeper Designs · Custom tools for Indian businesses",
    description: "Custom digital tools and operational systems for ambitious Indian businesses. From ₹25,000.",
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
  other: {
    "facebook-domain-verification": "ctti8c403wm28szc3zwnntg41ljhgc",
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
          <SmoothScroll>
            <Nav />
            {children}
            <Footer />
            <WhatsAppButton />
            <ShowcaseNavigator />
          </SmoothScroll>
          <Analytics />
          <MetaPixel />
          <MetaPageViewOnRouteChange />
        </body>
      </html>
    </ViewTransitions>
  );
}
