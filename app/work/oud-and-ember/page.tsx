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
    "A digital atelier for a bespoke Arabian perfume house. Fifteen signature scents, a personality quiz, and an AI-rendered bottle named for the customer.",
  openGraph: {
    title: "Oud & Ember · Find Your Fragrance · Deeper Designs",
    description: "A digital atelier for a bespoke Arabian perfume house. Fifteen signature scents, a personality quiz, and an AI-rendered bottle named for the customer.",
    url: "/work/oud-and-ember",
    images: [{ url: "/images/oud-and-ember/hero-bottle.webp", width: 1200, height: 800, alt: "Oud & Ember · Find Your Fragrance · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oud & Ember · Find Your Fragrance · Deeper Designs",
    description: "A digital atelier for a bespoke Arabian perfume house. Fifteen signature scents, a personality quiz, and an AI-rendered bottle named for the customer.",
    images: ["/images/oud-and-ember/hero-bottle.webp"],
  },
  alternates: { canonical: "/work/oud-and-ember" },

};

const pageStyle = {
  "--page-bg": "#07060A",
  "--page-surface": "#0F0B14",
  "--page-surface-2": "#18121E",
  "--page-border": "#1F1828",
  "--page-accent": "#C9A84C",
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
      <Client />
      <Quiz />
      <Library />
      <Output />
      <Atelier />
      <Metrics />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
