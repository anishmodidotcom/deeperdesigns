import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Lot from "./Lot";
import Pricing from "./Pricing";
import Dashboard from "./Dashboard";
import Buyer from "./Buyer";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoBazaar · Dynamic Pricing · Deeper Designs",
  description:
    "A 60-car Dubai dealership stopped pricing by feel. Every car now prices itself overnight on market data, and the average car sells 18 days faster.",
  openGraph: {
    title: "AutoBazaar · Dynamic Pricing · Deeper Designs",
    description: "A dynamic pricing engine and live inventory system for a 60-car Dubai dealership. Cars priced daily on market data, days on lot, and competitor analysis.",
    url: "/work/autobazaar",
    images: [{ url: "/images/autobazaar/hero-sedan.webp", width: 1200, height: 800, alt: "AutoBazaar · Dynamic Pricing · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoBazaar · Dynamic Pricing · Deeper Designs",
    description: "A dynamic pricing engine and live inventory system for a 60-car Dubai dealership. Cars priced daily on market data, days on lot, and competitor analysis.",
    images: ["/images/autobazaar/hero-sedan.webp"],
  },
  alternates: { canonical: "/work/autobazaar" },

};

const pageStyle = {
  "--page-bg": "#08080C",
  "--page-surface": "#12121A",
  "--page-text": "#EAEDF0",
  "--page-text-2": "#787E8C",
  "--page-accent": "#22D3EE",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#67E8F9",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function AutoBazaarPage() {
  return (
    <div className={outfit.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Autobazaar",
          description: metadata.description as string,
          slug: "autobazaar",
          image: "/images/autobazaar/hero-sedan.webp",
          archetype: "a used-car dealership",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "autobazaar")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "8 days"}
            pattern={meta.pattern ?? "Used-car lots. Dealerships. Any inventory business pricing by feel."}
            pains={meta.pains}
          />
        );
      })()}
      <AnishNote
        text="Pricing every car on the lot by walking around with a clipboard at 9pm. Two hours every night. Now it's done by the time Tariq finishes his coffee."
        align="right"
        variant="inline"
      />

      <Founder />
      <Lot />
      <Pricing />
      <Dashboard />
      <Buyer />
      <Metrics />
      <About />
      <EditorialPullQuote
        quote="Sixty cars priced last night by Tariq walking the lot with a clipboard."
        attribution="AUTOBAZAAR · CONCEPT"
        accent="var(--page-accent-autobazaar)"
      />
      <NextProject />
    </div>
  );
}
