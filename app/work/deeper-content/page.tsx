import type { Metadata } from "next";

import Hero from "./Hero";
import Problem from "./Problem";
import Gap from "./Gap";
import HowItWorks from "./HowItWorks";
import Brands from "./Brands";
import BeyondTool from "./BeyondTool";
import Output from "./Output";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Deeper Content · Live Product · Deeper Designs",
  description:
    "An AI engine that reasons before it generates. Funnel stage, audience, brand, thought through before any image is made. Brand-consistent social creative, by Deeper Designs.",
  openGraph: {
    title: "Deeper Content · Live Product · Deeper Designs",
    description:
      "An AI engine that reasons before it generates. Brand-consistent social creative, by Deeper Designs.",
    url: "/work/deeper-content",
    images: [
      {
        url: "/images/deeper-content/card.jpg",
        width: 1200,
        height: 720,
        alt: "Deeper Content · sample outputs across three brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Content · Live Product · Deeper Designs",
    description:
      "An AI engine that reasons before it generates. Brand-consistent social creative, by Deeper Designs.",
    images: ["/images/deeper-content/card.jpg"],
  },
  alternates: { canonical: "https://www.deeperdesigns.in/work/deeper-content" },
};

const pageStyle = {
  "--page-bg": "#0A0A12",
  "--page-surface": "#10101A",
  "--page-surface-2": "#171724",
  "--page-border": "rgba(99,102,241,0.16)",
  "--page-accent": "#6366F1",
  "--accent": "var(--page-accent)",
  "--page-accent-2": "#818CF8",
  "--page-text": "#F5F5F5",
  "--page-text-2": "#A8A8A8",
  "--page-text-3": "#6B6B6B",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function DeeperContentPage() {
  return (
    <div data-slug="deeper-content" style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Deeper Content",
          description: metadata.description as string,
          slug: "deeper-content",
          image: "/images/deeper-content/card.jpg",
          archetype: "a Deeper Designs product",
        })}
      />
      <Hero />
      <AnishNote
        text="We kept hitting the same wall building content tools for clients. The AI made beautiful images that looked like nobody's brand. So we built the part that was missing, the reasoning layer that thinks about your brand before it makes anything."
        align="right"
        variant="inline"
      />
      <Problem />
      <Gap />
      <HowItWorks />
      <Brands />
      <BeyondTool />
      <Output />
      <EditorialPullQuote
        quote="Generic AI makes generic content. The reasoning layer is the whole product."
        attribution="DEEPER CONTENT · LIVE PRODUCT"
        accent="var(--page-accent-deeper-content)"
      />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
