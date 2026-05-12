import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import IdleNudge from "@/components/IdleNudge";
import { StructuredData, ORGANIZATION_LD } from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://deeperdesigns.in"),
  title: {
    default: "Deeper Designs · AI-powered build studio",
    template: "%s",
  },
  description:
    "Deeper Designs is an AI-led build studio. We design and ship custom tools, sites, and operational systems for modern businesses. Two to six weeks. ₹25,000 to ₹10L+.",
  openGraph: {
    type: "website",
    siteName: "Deeper Designs",
    url: "/",
    title: "Deeper Designs · AI-powered build studio",
    description:
      "An AI-led build studio. Custom tools, sites, and operational systems for modern businesses. Two to six weeks. ₹25,000 to ₹10L+.",
    images: [
      {
        url: "/images/about/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Deeper Designs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Designs · AI-powered build studio",
    description:
      "An AI-led build studio. Custom tools, sites, and operational systems for modern businesses. Two to six weeks. ₹25,000 to ₹10L+.",
    images: ["/images/about/og-default.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable}`}
      >
        <body>
          <StructuredData data={ORGANIZATION_LD} />
          <SmoothScroll>
            <Cursor />
            <Nav />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <IdleNudge />
          </SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}
