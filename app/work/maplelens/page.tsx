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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maple Lens · Live Product · Deeper Designs",
  description:
    "Catalog-ready studio and lifestyle images from a phone photo. Built by Deeper Designs for Indian furniture makers. Live, working, and yours to try.",
  openGraph: {
    title: "Maple Lens · Live Product · Deeper Designs",
    description:
      "Workshop photo in. Studio shot out. A catalog generator for Indian furniture makers.",
    url: "/work/maplelens",
    images: [
      {
        url: "/images/maplelens/hero-catalog.webp",
        width: 1024,
        height: 1024,
        alt: "Maple Lens · catalog generator for Indian furniture makers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Lens · Live Product · Deeper Designs",
    description:
      "Workshop photo in. Studio shot out. A catalog generator for Indian furniture makers.",
    images: ["/images/maplelens/hero-catalog.webp"],
  },
  alternates: { canonical: "/work/maplelens" },
};

const pageStyle = {
  "--page-bg": "#0E0C0A",
  "--page-surface": "#161311",
  "--page-surface-2": "#1E1A16",
  "--page-border": "rgba(212,168,87,0.18)",
  "--page-accent": "#D4A857",
  "--page-accent-2": "#F2E5C7",
  "--page-text": "#F5F1E8",
  "--page-text-2": "#B5AC9A",
  "--page-text-3": "#6C6357",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function MapleLensPage() {
  return (
    <div className={inter.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Maple Lens",
          description: metadata.description as string,
          slug: "maplelens",
          image: "/images/maplelens/hero-catalog.webp",
          archetype: "an Indian furniture maker",
        })}
      />
      <Hero />
      <Problem />
      <Solution />
      <Showcase />
      <BuildNote />
      <FloatingCTA />
      <NextProject />
    </div>
  );
}
