import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

import Hero from "./Hero";
import Story from "./Story";
import Spices from "./Spices";
import Hands from "./Hands";
import Ledger from "./Ledger";
import Kerala from "./Kerala";
import Tray from "./Tray";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Malabar Spice House · Heritage Brand Site · Deeper Designs",
  description:
    "A third-generation Kochi spice exporter got a website with the same dignity as the warehouse. Sixty-four years of work, finally online.",
  openGraph: {
    title: "Malabar Spice House · Heritage Brand Site · Deeper Designs",
    siteName: "Deeper Designs",
    description: "Sixty-four years, forty-five buyers, one website that finally feels like Kerala. An editorial brand site and digital archive for a third-generation Kochi spice exporter.",
    url: "/work/malabar-spice",
    images: [
      {
        url: "/api/og/malabar-spice",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/malabar-spice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malabar Spice House · Heritage Brand Site · Deeper Designs",
    description: "Sixty-four years, forty-five buyers, one website that finally feels like Kerala. An editorial brand site and digital archive for a third-generation Kochi spice exporter.",
    images: ["/api/og/malabar-spice"],
  },
  alternates: { canonical: "/work/malabar-spice" },

};

const pageStyle = {
  "--page-bg": "#0E0805",
  "--page-surface-1": "#1A100A",
  "--page-surface-2": "#241710",
  "--page-border": "#2E1F16",
  "--page-accent": "#E89B2D",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#F2C14E",
  "--page-accent-3": "#5A6B3D",
  "--page-text": "#F4E8D6",
  "--page-text-2": "#C0A881",
  "--page-text-3": "#7A6A52",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function MalabarSpicePage() {
  return (
    <main id="main" className={fraunces.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Malabar Spice",
          description: metadata.description as string,
          slug: "malabar-spice",
          image: "/images/malabar-spice/hero-pepper.webp",
          archetype: "a heritage spice exporter",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "malabar-spice")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "8 days"}
            pattern={meta.pattern ?? "Heritage exporters. Family-run trading houses. Any decades-old business whose website does not match the work."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="Some businesses don't need a dashboard. They need a digital warehouse with the same dignity as the physical one. Rashid's grandfather built one in 1962. We built the second."
        align="right"
        variant="inline"
      />

      <Story />
      <Spices />
      <Hands />
      <Ledger />
      <Kerala />
      <Tray />
      <AboutBuild />
      <EditorialPullQuote
        quote="Some businesses don't need to be optimized. They need to be honored."
        attribution="MALABAR SPICE HOUSE · CONCEPT"
        accent="var(--page-accent-malabar-spice)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="malabar-spice" name="Malabar Spice House" industry="Heritage Exporter" />
    </main>
  );
}
