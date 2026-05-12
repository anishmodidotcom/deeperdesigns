import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";

import Hero from "./Hero";
import Farmer from "./Farmer";
import Dashboard from "./Dashboard";
import WhatToPlant from "./WhatToPlant";
import Walk from "./Walk";
import Subscribers from "./Subscribers";
import Evidence from "./Evidence";
import Compost from "./Compost";
import Metrics from "./Metrics";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PossibilityNote from "@/components/PossibilityNote";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

// Bricolage Grotesque on Google Fonts ships normal-only. Italic display
// moments use CSS synthesized italic via fontStyle: italic; the variable
// font's opsz axis is still honoured.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Sahaja Farms · Farm Management Dashboard · Deeper Designs",
  description:
    "A farm management dashboard that knows what to plant, when to harvest, and which subscribers are about to cancel. Built for a 200-acre organic farm outside Mysore.",
  openGraph: {
    title: "Sahaja Farms · Farm Management Dashboard · Deeper Designs",
    description: "A farm management dashboard that knows what to plant, when to harvest, and which subscribers are about to cancel. Built for a 200-acre organic farm outside Mysore.",
    url: "/work/sahaja-farms",
    images: [{ url: "/images/sahaja-farms/hero-field.webp", width: 1200, height: 800, alt: "Sahaja Farms · Farm Management Dashboard · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahaja Farms · Farm Management Dashboard · Deeper Designs",
    description: "A farm management dashboard that knows what to plant, when to harvest, and which subscribers are about to cancel. Built for a 200-acre organic farm outside Mysore.",
    images: ["/images/sahaja-farms/hero-field.webp"],
  },
  alternates: { canonical: "/work/sahaja-farms" },

};

const pageStyle = {
  "--page-bg": "#0B100A",
  "--page-surface-1": "#131914",
  "--page-surface-2": "#1B231D",
  "--page-border": "#232C25",
  "--page-border-2": "#2D3830",
  "--page-accent": "#D4A537",
  "--page-accent-2": "#6BA572",
  "--page-accent-3": "#B85530",
  "--page-text": "#F0EBDD",
  "--page-text-2": "#AFA68F",
  "--page-text-3": "#6B6553",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function SahajaFarmsPage() {
  return (
    <div className={bricolage.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Sahaja Farms",
          description: metadata.description as string,
          slug: "sahaja-farms",
          image: "/images/sahaja-farms/hero-field.webp",
          archetype: "an organic farm CSA",
        })}
      />
      <Hero />
      <PossibilityNote
        number="013"
        archetype="an organic farm CSA"
        timeline="12 days"
        pattern="CSA farms. Organic brands. Subscription-based food businesses with seasonal supply."
      />
      <Farmer />
      <Dashboard />
      <WhatToPlant />
      <Walk />
      <Subscribers />
      <Evidence />
      <Compost />
      <Metrics />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
