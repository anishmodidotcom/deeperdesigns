import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Hero from "./Hero";
import Problem from "./Problem";
import Solution from "./Solution";
import Showcase from "./Showcase";
import BuildNote from "./BuildNote";
import FloatingCTA from "./FloatingCTA";
import NextProject from "./NextProject";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maple Lens · Live Product · Deeper Designs",
  description:
    "The client build that started it. A photo tool for Indian furniture makers: one phone photo becomes a catalogue-ready shot, no studio needed.",
  openGraph: {
    title: "Maple Lens · Live Product · Deeper Designs",
    siteName: "Deeper Designs",
    description:
      "The client build that started it. A photo tool for Indian furniture makers: one phone photo becomes a catalogue-ready shot, no studio needed.",
    url: "/work/maplelens",
    images: [
      {
        url: "/api/og/maplelens",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/maplelens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Lens · Live Product · Deeper Designs",
    description:
      "The client build that started it. A photo tool for Indian furniture makers: one phone photo becomes a catalogue-ready shot, no studio needed.",
    images: ["/api/og/maplelens"],
  },
  alternates: { canonical: "/work/maplelens" },
};

const pageStyle = {
  "--page-bg": "#1A1410",
  "--page-surface": "#231B15",
  "--page-surface-2": "#2C2218",
  "--page-border": "rgba(200,149,109,0.18)",
  "--page-accent": "#C8956D",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#8B6F47",
  "--page-text": "#F5EFE6",
  "--page-text-2": "#B6A28A",
  "--page-text-3": "#6B5D4F",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function MapleLensPage() {
  return (
    <main id="main" className={inter.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          // v25.5: a real, live product, not a concept build.
          concept: false,
          name: "Maple Lens",
          description: metadata.description as string,
          slug: "maplelens",
          image: "/images/maplelens/hero-catalog.webp",
          archetype: "an Indian furniture maker",
        })}
      />
      <Hero />
      <AnishNote
        text="We built this end to end. It's earning. Furniture makers in three cities use it every week."
        align="right"
        variant="inline"
      />
      <Problem />
      <Solution />
      <Showcase />
      <BuildNote />
      <FloatingCTA />
      <EditorialPullQuote
        quote="The shoot used to take a day, cost forty thousand, and still not look like the catalog needed it to."
        attribution="MAPLE LENS · LIVE BUILD"
        accent="var(--page-accent-maplelens)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="maplelens" name="Maple Lens" industry="Furniture Maker" />
    </main>
  );
}
