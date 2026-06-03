import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import Hero from "./Hero";
import Family from "./Family";
import Story from "./Story";
import RebarGrid from "./RebarGrid";
import Problem from "./Problem";
import Solution from "./Solution";
import Capabilities from "./Capabilities";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharat Steel Corp · Inventory Dashboard · Deeper Designs",
  description:
    "A father-son steel trader went from thirty-minute phone quotes to thirty-second ones, with a live inventory dashboard fed straight from WhatsApp.",
  openGraph: {
    title: "Bharat Steel Corp · Inventory Dashboard · Deeper Designs",
    description: "A live inventory dashboard with instant quote generation. Fed by warehouse delivery slips sent over WhatsApp.",
    url: "/work/bharat-steel",
    images: [
      {
        url: "/api/og/bharat-steel",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/bharat-steel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Steel Corp · Inventory Dashboard · Deeper Designs",
    description: "A live inventory dashboard with instant quote generation. Fed by warehouse delivery slips sent over WhatsApp.",
    images: ["/api/og/bharat-steel"],
  },
  alternates: { canonical: "/work/bharat-steel" },

};

const pageStyle = {
  "--page-bg": "#0A0D12",
  "--page-surface": "#111820",
  "--page-text": "#E8ECF0",
  "--page-text-2": "#7A8A9E",
  "--page-accent": "#3B82F6",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#60A5FA",
  // F2: mono eyebrow contrast, lifted to a brighter blue that hits AA on near-black.
  "--page-eyebrow": "#93C5FD",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function BharatSteelPage() {
  return (
    <div className={spaceGrotesk.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Bharat Steel",
          description: metadata.description as string,
          slug: "bharat-steel",
          image: "/images/bharat-steel/hero-coil.webp",
          archetype: "a B2B steel trading company",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "bharat-steel")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "7 days"}
            pattern={meta.pattern ?? "Industrial wholesalers. Building material suppliers. Any B2B running quotes on WhatsApp."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="The Excel sheet that ran the yard for thirty years wasn't the problem. The Excel sheet that nobody trusted at 7am was."
        align="right"
        variant="inline"
      />

      <Family />
      <Story />
      <RebarGrid />
      <Problem />
      <Solution />
      <Capabilities />
      <Metrics />
      <About />
      <EditorialPullQuote
        quote="A buyer calls. Someone walks the yard. The buyer calls the next trader."
        attribution="BHARAT STEEL · CONCEPT"
        accent="var(--page-accent-bharat-steel)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="bharat-steel" name="Bharat Steel Corp" industry="B2B Industrial" />
    </div>
  );
}
