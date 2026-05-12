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
import PossibilityNote from "@/components/PossibilityNote";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharat Steel Corp · Inventory Dashboard · Deeper Designs",
  description:
    "A live inventory dashboard with instant quote generation. Fed by warehouse delivery slips sent over WhatsApp.",
  openGraph: {
    title: "Bharat Steel Corp · Inventory Dashboard · Deeper Designs",
    description: "A live inventory dashboard with instant quote generation. Fed by warehouse delivery slips sent over WhatsApp.",
    url: "/work/bharat-steel",
    images: [{ url: "/images/bharat-steel/hero-coil.webp", width: 1200, height: 800, alt: "Bharat Steel Corp · Inventory Dashboard · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Steel Corp · Inventory Dashboard · Deeper Designs",
    description: "A live inventory dashboard with instant quote generation. Fed by warehouse delivery slips sent over WhatsApp.",
    images: ["/images/bharat-steel/hero-coil.webp"],
  },
  alternates: { canonical: "/work/bharat-steel" },

};

const pageStyle = {
  "--page-bg": "#0A0D12",
  "--page-surface": "#111820",
  "--page-text": "#E8ECF0",
  "--page-text-2": "#7A8A9E",
  "--page-accent": "#3B82F6",
  "--page-accent-2": "#60A5FA",
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
      <PossibilityNote
        number="002"
        archetype="a B2B steel trading company"
        timeline="7 days"
        pattern="Industrial wholesalers. Building material suppliers. Any B2B running quotes on WhatsApp."
      />
      <Family />
      <Story />
      <RebarGrid />
      <Problem />
      <Solution />
      <Capabilities />
      <Metrics />
      <About />
      <NextProject />
    </div>
  );
}
