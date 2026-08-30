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
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StumpVision · Academy Platform · Deeper Designs",
  description:
    "A 250-player cricket academy gave every kid a stats card and every parent a real answer. Selections stopped being arguments, and renewals stopped being guesswork.",
  openGraph: {
    title: "StumpVision · Academy Platform · Deeper Designs",
    siteName: "Deeper Designs",
    description: "Gamified player profiles, trading card stats, match records, and coach reports for a 250-player cricket academy in Gurgaon.",
    url: "/work/stumpvision",
    images: [
      {
        url: "/api/og/stumpvision",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/stumpvision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StumpVision · Academy Platform · Deeper Designs",
    description: "Gamified player profiles, trading card stats, match records, and coach reports for a 250-player cricket academy in Gurgaon.",
    images: ["/api/og/stumpvision"],
  },
  alternates: { canonical: "/work/stumpvision" },

};

const pageStyle = {
  "--page-bg": "#060E06",
  "--page-surface": "#0D1A0D",
  "--page-text": "#E8F0E8",
  "--page-text-2": "#7A9A7A",
  "--page-accent": "#4ADE80",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#FCD34D",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function StumpVisionPage() {
  return (
    <main id="main" className={rajdhani.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Stumpvision",
          description: metadata.description as string,
          slug: "stumpvision",
          image: "/images/stumpvision/hero-batsman.webp",
          archetype: "a cricket coaching academy",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "stumpvision")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "10 days"}
            pattern={meta.pattern ?? "Coaching academies. Music schools. Skill-building businesses with parents on the sidelines."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="Parents pay for cricket coaching but can't see if their kid is improving. The card tells the story. The card sells the renewal."
        align="right"
        variant="inline"
      />

      <Card />
      <StartingXI />
      <Features />
      <Parent />
      <Metrics />
      <About />
      <EditorialPullQuote
        quote="Two hundred and fifty players. Stats in a coach's notebook. Parents on the sideline with no real answers."
        attribution="STUMPVISION · CONCEPT"
        accent="var(--page-accent-stumpvision)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="stumpvision" name="StumpVision" industry="Coaching Academy" />
    </main>
  );
}
