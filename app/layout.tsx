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

export const metadata: Metadata = {
  metadataBase: new URL("https://deeperdesigns.in"),
  title: {
    default: "Deeper Designs · AI-powered build studio",
    template: "%s",
  },
  description:
    "Enterprise software costs a million dollars. We build the same thing for businesses that could never afford it. AI-led, taste-finished, shipped in 14 to 28 days.",
  openGraph: {
    type: "website",
    siteName: "Deeper Designs",
    url: "/",
    title: "Deeper Designs · AI-powered build studio",
    description:
      "Enterprise software costs a million dollars. We build the same thing for businesses that could never afford it.",
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
      "Enterprise software costs a million dollars. We build the same thing for businesses that could never afford it.",
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
          <SmoothScroll>
            <Cursor />
            <Nav />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}
