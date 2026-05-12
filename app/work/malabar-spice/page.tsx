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
import PossibilityNote from "@/components/PossibilityNote";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

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
    "Sixty-three years, forty-five buyers, one website that finally feels like Kerala. An editorial brand site and digital archive for a third-generation Kochi spice exporter.",
  openGraph: {
    title: "Malabar Spice House · Heritage Brand Site · Deeper Designs",
    description: "Sixty-three years, forty-five buyers, one website that finally feels like Kerala. An editorial brand site and digital archive for a third-generation Kochi spice exporter.",
    url: "/work/malabar-spice",
    images: [{ url: "/images/malabar-spice/hero-pepper.webp", width: 1200, height: 800, alt: "Malabar Spice House · Heritage Brand Site · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malabar Spice House · Heritage Brand Site · Deeper Designs",
    description: "Sixty-three years, forty-five buyers, one website that finally feels like Kerala. An editorial brand site and digital archive for a third-generation Kochi spice exporter.",
    images: ["/images/malabar-spice/hero-pepper.webp"],
  },
  alternates: { canonical: "/work/malabar-spice" },

};

const pageStyle = {
  "--page-bg": "#0E0805",
  "--page-surface-1": "#1A100A",
  "--page-surface-2": "#241710",
  "--page-border": "#2E1F16",
  "--page-accent": "#E89B2D",
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
    <div className={fraunces.variable} style={pageStyle}>
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
      <PossibilityNote
        number="011"
        archetype="a heritage spice exporter"
        timeline="8 days"
        pattern="Heritage exporters. Family-run trading houses. Any decades-old business whose website does not match the work."
      />
      <Story />
      <Spices />
      <Hands />
      <Ledger />
      <Kerala />
      <Tray />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
