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
import PossibilityNote from "@/components/PossibilityNote";

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
      <Hero />
      <PossibilityNote
        number="009"
        archetype="a bespoke perfume atelier"
        timeline="11 days"
        pattern="Bespoke perfumeries. Custom blends. Any taste-led product business with a quiz to give."
      />
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
