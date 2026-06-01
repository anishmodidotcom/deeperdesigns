import type { Metadata } from "next";
import { Cormorant } from "next/font/google";

import Hero from "./Hero";
import Client from "./Client";
import Quiz from "./Quiz";
import Library from "./Library";
import Output from "./Output";
import Atelier from "./Atelier";
import Metrics from "./Metrics";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oud & Ember · Find Your Fragrance · Deeper Designs",
  description:
    "A bespoke perfume house stopped losing online customers to twenty-message WhatsApp threads. A quiz finds their scent and shows them the bottle with their name on it.",
  openGraph: {
    title: "Oud & Ember · Find Your Fragrance · Deeper Designs",
    description: "A digital atelier for a bespoke Arabian perfume house. Fifteen signature scents, a personality quiz, and an AI-rendered bottle named for the customer.",
    url: "/work/oud-and-ember",
    images: [
      {
        url: "/api/og/oud-and-ember",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/oud-and-ember",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oud & Ember · Find Your Fragrance · Deeper Designs",
    description: "A digital atelier for a bespoke Arabian perfume house. Fifteen signature scents, a personality quiz, and an AI-rendered bottle named for the customer.",
    images: ["/api/og/oud-and-ember"],
  },
  alternates: { canonical: "/work/oud-and-ember" },

};

const pageStyle = {
  "--page-bg": "#07060A",
  "--page-surface": "#0F0B14",
  "--page-surface-2": "#18121E",
  "--page-border": "#1F1828",
  "--page-accent": "#C9A84C",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#8A6F2A",
  "--page-text": "#F4EFE3",
  "--page-text-2": "#B8A982",
  "--page-text-3": "#6D6354",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function OudAndEmberPage() {
  return (
    <div className={cormorant.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Oud And Ember",
          description: metadata.description as string,
          slug: "oud-and-ember",
          image: "/images/oud-and-ember/hero-bottle.webp",
          archetype: "a bespoke perfume atelier",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "oud-and-ember")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "11 days"}
            pattern={meta.pattern ?? "Bespoke perfumeries. Custom blends. Any taste-led product business with a quiz to give."}
            pains={meta.pains}
          />
        );
      })()}
      <AnishNote
        text="Heritage doesn't translate to a contact form. It translates to a quiz that earns the customer's interest before the atelier ever opens its door."
        align="right"
        variant="inline"
      />

      <Client />
      <Quiz />
      <Library />
      <Output />
      <Atelier />
      <Metrics />
      <AboutBuild />
      <EditorialPullQuote
        quote="The atelier magic does not survive twenty WhatsApp messages."
        attribution="OUD & EMBER · CONCEPT"
        accent="var(--page-accent-oud-and-ember)"
      />
      <NextProject />
    </div>
  );
}
