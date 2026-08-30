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
import PainBlock from "@/components/PainBlock";
import { showcaseMetadata } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

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
    "Concept build. An Ayurvedic skincare brand got a skin advisor that answers every customer in two minutes, so the founder stopped losing her week to DMs.",
  openGraph: {
    title: "Veda Glow · Skin Advisor · Deeper Designs",
    siteName: "Deeper Designs",
    description: "A skin advisor for an Ayurvedic skincare brand that recommends like the founder would, every time, in under two minutes.",
    url: "/work/veda-glow",
    images: [
      {
        url: "/api/og/veda-glow",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/veda-glow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veda Glow · Skin Advisor · Deeper Designs",
    description: "A skin advisor for an Ayurvedic skincare brand that recommends like the founder would, every time, in under two minutes.",
    images: ["/api/og/veda-glow"],
  },
  alternates: { canonical: "/work/veda-glow" },

};

const pageStyle = {
  "--page-bg": "#0F0A06",
  "--page-surface": "#1A1208",
  "--page-text": "#F5E6D0",
  "--page-text-2": "#B89A70",
  "--page-accent": "#D4A574",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#E8C9A0",
  // F2: amber gold brightened for eyebrow AA contrast.
  "--page-eyebrow": "#F0DDB8",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function VedaGlowPage() {
  return (
    <main id="main" className={playfair.variable} style={pageStyle}>
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
      {(() => {
        const meta = showcaseMetadata("veda-glow");
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "5 days"}
            pattern={meta.pattern ?? "Skincare brands. Wellness brands. Any DTC with high-volume customer questions."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="An Ayurvedic founder shouldn't be writing forty DM replies a day. The product knows skin. The system should know how to recommend it."
        align="right"
        variant="inline"
      />

      <Founder />
      <Problem />
      <Solution />
      <Quiz />
      <Features />
      <Metrics />
      <About />
      <EditorialPullQuote
        quote="The product was never the problem. The consultation was."
        attribution="VEDA GLOW · CONCEPT"
        accent="var(--page-accent-veda-glow)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="veda-glow" name="Veda Glow" industry="Ayurvedic D2C" />
    </main>
  );
}
