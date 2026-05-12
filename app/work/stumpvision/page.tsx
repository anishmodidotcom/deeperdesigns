import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";

import Hero from "./Hero";
import Card from "./Card";
import StartingXI from "./StartingXI";
import Features from "./Features";
import Parent from "./Parent";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PossibilityNote from "@/components/PossibilityNote";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StumpVision · Academy Platform · Deeper Designs",
  description:
    "Gamified player profiles, trading card stats, match records, and coach reports for a 250-player cricket academy in Gurgaon.",
};

const pageStyle = {
  "--page-bg": "#060E06",
  "--page-surface": "#0D1A0D",
  "--page-text": "#E8F0E8",
  "--page-text-2": "#7A9A7A",
  "--page-accent": "#4ADE80",
  "--page-accent-2": "#FCD34D",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function StumpVisionPage() {
  return (
    <div className={rajdhani.variable} style={pageStyle}>
      <Hero />
      <PossibilityNote
        number="008"
        archetype="a cricket coaching academy"
        timeline="10 days"
      />
      <Card />
      <StartingXI />
      <Features />
      <Parent />
      <Metrics />
      <About />
      <NextProject />
    </div>
  );
}
