import type { Metadata } from "next";
import { Playfair_Display_SC, Playfair_Display, DM_Sans } from "next/font/google";

import Hero from "./Hero";
import Farah from "./Farah";
import CakeBuild from "./CakeBuild";
import Menu from "./Menu";
import Studio from "./Studio";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

const playfairSc = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display-sc",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-script",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sugar Lane · Home Bakery · Deeper Designs",
  description:
    "An Abu Dhabi home baker could make forty cakes a week but only made four. An order studio captures the brief in three minutes, and now she makes fourteen.",
  openGraph: {
    title: "Sugar Lane · Home Bakery · Deeper Designs",
    description: "A home bakery in Abu Dhabi run by Farah, who could bake forty cakes a week but only baked four. We rebuilt the order so she gets the cakes back.",
    url: "/work/sugar-lane",
    images: [{ url: "/images/sugar-lane/hero-cake.webp", width: 1200, height: 800, alt: "Sugar Lane · Home Bakery · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sugar Lane · Home Bakery · Deeper Designs",
    description: "A home bakery in Abu Dhabi run by Farah, who could bake forty cakes a week but only baked four. We rebuilt the order so she gets the cakes back.",
    images: ["/images/sugar-lane/hero-cake.webp"],
  },
  alternates: { canonical: "/work/sugar-lane" },

};

const pageStyle = {
  "--page-bg": "#FAF5EE",
  "--page-bg-top": "#FFFFFF",
  "--page-surface-1": "#FFFFFF",
  "--page-surface-2": "#F4EBDF",
  "--page-blush": "rgba(161,74,92,0.08)",
  "--page-border": "rgba(42,31,26,0.12)",
  "--page-accent": "#A14A5C",
  "--page-accent-deep": "#7A3848",
  "--page-text": "#2A1F1A",
  "--page-text-2": "#5A463F",
  "--page-text-3": "#8B7B6E",
  background:
    "linear-gradient(180deg, #FFFFFF 0%, #FAF5EE 60%, #FAF5EE 100%)",
  color: "var(--page-text)",
  colorScheme: "light",
} as React.CSSProperties;

export default function SugarLanePage() {
  return (
    <div
      data-theme="light"
      className={`${playfairSc.variable} ${playfair.variable} ${dmSans.variable}`}
      style={pageStyle}
    >
      <StructuredData
        data={creativeWorkLd({
          name: "Sugar Lane",
          description: metadata.description as string,
          slug: "sugar-lane",
          image: "/images/sugar-lane/hero-cake.webp",
          archetype: "a home bakery",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "sugar-lane")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "10 days"}
            pattern={meta.pattern ?? "Home bakeries. Caterers. Custom-order food businesses run by one person and the oven."}
            pains={meta.pains}
          />
        );
      })()}
      <Farah />
      <CakeBuild />
      <Menu />
      <Studio />
      <Numbers />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
