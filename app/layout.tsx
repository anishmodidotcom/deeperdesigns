import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://deeperdesigns.in"),
  title: "Deeper Designs · Custom tools for Indian businesses",
  description: "Deeper Designs is an India-first studio building custom digital tools and operational systems for ambitious Indian businesses. From ₹25,000.",
  openGraph: {
    title: "Deeper Designs · Custom tools for Indian businesses",
    description: "Custom digital tools and operational systems for ambitious Indian businesses. From ₹25,000.",
    url: "https://deeperdesigns.in",
    siteName: "Deeper Designs",
    images: [{ url: "/images/about/og-default.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Designs · Custom tools for Indian businesses",
    description: "Custom digital tools and operational systems for ambitious Indian businesses. From ₹25,000.",
    images: ["/images/about/og-default.webp"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body>
          <SmoothScroll>
            <Nav />
            {children}
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}
