import type { Metadata } from "next";
import { Fraunces, DM_Serif_Display } from "next/font/google";

import Hero from "./Hero";
import Maker from "./Maker";
import Wheel from "./Wheel";
import Collection from "./Collection";
import Workshop from "./Workshop";
import Builder from "./Builder";
import VideoMoment from "./VideoMoment";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";

// Fraunces stands in as the editorial serif for body and small display.
// DM Serif Display covers the italic display headlines that anchor the
// script-feeling display register.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Earth and Fire · Pottery Brand · Deeper Designs",
  description:
    "A Jaipur ceramicist who sold out in 90 minutes got a heritage brand, a custom builder, and a queue. Slower drops, higher prices, a better business.",
  openGraph: {
    title: "Earth and Fire · Pottery Brand · Deeper Designs",
    description: "A Jaipur ceramicist who sells out in 90 minutes. We built her a heritage brand, a custom builder, and a queue. Slower drops. Higher prices. Better business.",
    url: "/work/earth-and-fire",
    images: [{ url: "/images/earth-and-fire/hero-vase.webp", width: 1200, height: 800, alt: "Earth and Fire · Pottery Brand · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earth and Fire · Pottery Brand · Deeper Designs",
    description: "A Jaipur ceramicist who sells out in 90 minutes. We built her a heritage brand, a custom builder, and a queue. Slower drops. Higher prices. Better business.",
    images: ["/images/earth-and-fire/hero-vase.webp"],
  },
  alternates: { canonical: "/work/earth-and-fire" },

};

const pageStyle = {
  "--page-bg": "#F5EFE3",
  "--page-surface-1": "#FAF6EC",
  "--page-surface-2": "#EBE2D0",
  "--page-border": "#9C8B73",
  "--page-accent": "#B85530",
  "--page-accent-2": "#7A5C2E",
  "--page-text": "#2B1C0E",
  "--page-text-2": "#5C4A38",
  "--page-text-3": "#8A7860",
  background: "var(--page-bg)",
  color: "var(--page-text)",
  colorScheme: "light",
  fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
} as React.CSSProperties;

export default function EarthAndFirePage() {
  return (
    <div
      data-theme="light"
      className={`${fraunces.variable} ${dmSerifDisplay.variable}`}
      style={pageStyle}
    >
      <StructuredData
        data={creativeWorkLd({
          name: "Earth And Fire",
          description: metadata.description as string,
          slug: "earth-and-fire",
          image: "/images/earth-and-fire/hero-vase.webp",
          archetype: "a handmade ceramics studio",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "earth-and-fire")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "9 weeks"}
            pattern={meta.pattern ?? "Ceramicists. Woodworkers. Any maker selling drops and running out of stock in minutes."}
            pains={meta.pains}
          />
        );
      })()}
      <AnishNote
        text="Selling out in 90 minutes sounds like a win. It's a ceiling. The builder turns the constraint, Nia's two hands, into the offer."
        align="right"
        variant="inline"
      />

      <Maker />
      <Wheel />
      <Collection />
      <Workshop />
      <Builder />
      <VideoMoment />
      <Numbers />
      <AboutBuild />
      <EditorialPullQuote
        quote="Her drops sold out in 90 minutes. That is not a humble brag. That is a business problem."
        attribution="EARTH & FIRE · CONCEPT"
        accent="var(--page-accent-earth-and-fire)"
      />
      <NextProject />
    </div>
  );
}
