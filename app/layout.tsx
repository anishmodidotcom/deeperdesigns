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
    default: "Deeper Designs · Custom systems for modern businesses",
    template: "%s",
  },
  description:
    "We design and build custom digital tools, sites, and operational systems for modern businesses. Two to six weeks. From ₹25,000.",
  openGraph: {
    type: "website",
    siteName: "Deeper Designs",
    url: "/",
    title: "Deeper Designs · Custom systems for modern businesses",
    description:
      "Custom digital tools, sites, and operational systems for modern businesses. Two to six weeks. From ₹25,000.",
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
    title: "Deeper Designs · Custom systems for modern businesses",
    description:
      "Custom digital tools, sites, and operational systems for modern businesses. Two to six weeks. From ₹25,000.",
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
