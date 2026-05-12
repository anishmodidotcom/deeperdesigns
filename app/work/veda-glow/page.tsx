import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Problem from "./Problem";
import Solution from "./Solution";
import Quiz from "./Quiz";
import Features from "./Features";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PossibilityNote from "@/components/PossibilityNote";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Veda Glow · Skin Advisor · Deeper Designs",
  description:
    "AI-powered Ayurvedic skin consultation. A 2-minute personalized routine that replaces a 45-minute DM conversation.",
  openGraph: {
    title: "Veda Glow · Skin Advisor · Deeper Designs",
    description: "AI-powered Ayurvedic skin consultation. A 2-minute personalized routine that replaces a 45-minute DM conversation.",
    url: "/work/veda-glow",
    images: [{ url: "/images/veda-glow/hero-bottle.webp", width: 1200, height: 800, alt: "Veda Glow · Skin Advisor · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veda Glow · Skin Advisor · Deeper Designs",
    description: "AI-powered Ayurvedic skin consultation. A 2-minute personalized routine that replaces a 45-minute DM conversation.",
    images: ["/images/veda-glow/hero-bottle.webp"],
  },
  alternates: { canonical: "/work/veda-glow" },

};

const pageStyle = {
  "--page-bg": "#0F0A06",
  "--page-surface": "#1A1208",
  "--page-text": "#F5E6D0",
  "--page-text-2": "#B89A70",
  "--page-accent": "#D4A574",
  "--page-accent-2": "#E8C9A0",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function VedaGlowPage() {
  return (
    <div className={playfair.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Veda Glow",
          description: metadata.description as string,
          slug: "veda-glow",
          image: "/images/veda-glow/hero-bottle.webp",
          archetype: "an Ayurvedic skincare D2C brand",
        })}
      />
      <Hero />
      <PossibilityNote
        number="001"
        archetype="an Ayurvedic skincare D2C brand"
        timeline="5 days"
        pattern="Skincare brands. Wellness brands. Any DTC with high-volume customer questions."
      />
      <Founder />
      <Problem />
      <Solution />
      <Quiz />
      <Features />
      <Metrics />
      <About />
      <NextProject />
    </div>
  );
}
