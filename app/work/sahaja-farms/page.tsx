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
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";

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
    "A 200-acre organic farm got a brain that survives the founder taking a Sunday off. It plans planting from real demand and flags subscribers before they cancel.",
  openGraph: {
    title: "Sahaja Farms · Farm Management Dashboard · Deeper Designs",
    description: "A farm management dashboard that knows what to plant, when to harvest, and which subscribers are about to cancel. Built for a 200-acre organic farm outside Mysore.",
    url: "/work/sahaja-farms",
    images: [
      {
        url: "/api/og/sahaja-farms",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/sahaja-farms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahaja Farms · Farm Management Dashboard · Deeper Designs",
    description: "A farm management dashboard that knows what to plant, when to harvest, and which subscribers are about to cancel. Built for a 200-acre organic farm outside Mysore.",
    images: ["/api/og/sahaja-farms"],
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

  "--accent": "var(--page-accent)",
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
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "sahaja-farms")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "12 days"}
            pattern={meta.pattern ?? "CSA farms. Organic brands. Subscription-based food businesses with seasonal supply."}
            pains={meta.pains}
          />
        );
      })()}
      <AnishNote
        text="Lata isn't a tech founder. She's the best organic farmer in her region. The dashboard isn't there to teach her farming. It's there to make sure the farm survives if she takes a Sunday off."
        align="right"
        variant="inline"
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
      <EditorialPullQuote
        quote="Half her crop decisions lived in her head, from memory of last year."
        attribution="SAHAJA FARMS · CONCEPT"
        accent="var(--page-accent-sahaja-farms)"
      />
      <NextProject />
    </div>
  );
}
