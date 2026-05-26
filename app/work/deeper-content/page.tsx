import type { Metadata } from "next";

import Hero from "./Hero";
import Product from "./Product";
import Examples from "./Examples";
import Engine from "./Engine";
import Outcomes from "./Outcomes";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Deeper Content · Live Product · Deeper Designs",
  description:
    "An AI engine that produces strategic content in your brand voice. Custom-installed once. Running forever. By Deeper Designs.",
  openGraph: {
    title: "Deeper Content · Live Product · Deeper Designs",
    description:
      "An AI engine that produces strategic content in your brand voice. Custom-installed once. Running forever.",
    url: "/work/deeper-content",
    images: [
      {
        url: "/images/deeper-content/hero-screenshot.png",
        width: 1440,
        height: 900,
        alt: "Deeper Content · Live AI engine for brand-aware content generation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Content · Live Product · Deeper Designs",
    description:
      "An AI engine that produces strategic content in your brand voice. Custom-installed once. Running forever.",
    images: ["/images/deeper-content/hero-screenshot.png"],
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
          image: "/images/deeper-content/hero-screenshot.png",
          archetype: "a Deeper Designs product",
        })}
      />
      <Hero />
      <AnishNote
        text="We built this because every brand we worked with kept asking for the same thing. Content that sounds like them, every time, without having to brief a designer. So we built the engine. Then we used it for ourselves first."
        align="right"
        variant="inline"
      />
      <Product />
      <Examples />
      <Engine />
      <Outcomes />
      <AboutBuild />
      <EditorialPullQuote
        quote="Generic AI content is the gap your audience can already see. We close it by making your tone, your audience, and your visual world part of the engine itself."
        attribution="DEEPER CONTENT · LIVE PRODUCT"
        accent="var(--page-accent-deeper-content)"
      />
      <NextProject />
    </div>
  );
}
