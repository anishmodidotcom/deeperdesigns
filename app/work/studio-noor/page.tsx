import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Chaos from "./Chaos";
import Walkthrough from "./Walkthrough";
import Bridge from "./Bridge";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PossibilityNote from "@/components/PossibilityNote";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Noor · Client Portal · Deeper Designs",
  description:
    "A living workspace where interior design clients track every detail of their home transformation. Updated daily through WhatsApp.",
  openGraph: {
    title: "Studio Noor · Client Portal · Deeper Designs",
    description: "A living workspace where interior design clients track every detail of their home transformation. Updated daily through WhatsApp.",
    url: "/work/studio-noor",
    images: [{ url: "/images/studio-noor/hero-room.webp", width: 1200, height: 800, alt: "Studio Noor · Client Portal · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Noor · Client Portal · Deeper Designs",
    description: "A living workspace where interior design clients track every detail of their home transformation. Updated daily through WhatsApp.",
    images: ["/images/studio-noor/hero-room.webp"],
  },
  alternates: { canonical: "/work/studio-noor" },

};

const pageStyle = {
  "--page-bg": "#0E0C10",
  "--page-surface": "#171419",
  "--page-text": "#EDE8F0",
  "--page-text-2": "#8E8494",
  "--page-accent": "#9B7EC8",
  "--page-accent-2": "#B89EDB",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function StudioNoorPage() {
  return (
    <div className={instrument.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Studio Noor",
          description: metadata.description as string,
          slug: "studio-noor",
          image: "/images/studio-noor/hero-room.webp",
          archetype: "a boutique interior design studio",
        })}
      />
      <Hero />
      <PossibilityNote
        number="005"
        archetype="a boutique interior design studio"
        timeline="14 days"
        pattern="Interior designers. Architects. Any project-based service business juggling clients on WhatsApp."
      />
      <Founder />
      <Chaos />
      <Walkthrough />
      <Bridge />
      <Metrics />
      <About />
      <NextProject />
    </div>
  );
}
