import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Chaos from "./Chaos";
import Walkthrough from "./Walkthrough";
import Bridge from "./Bridge";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Noor · Client Portal · Deeper Designs",
  description:
    "An interior design studio replaced six WhatsApp groups per project with one portal. Clients see progress without asking, and projects close faster.",
  openGraph: {
    title: "Studio Noor · Client Portal · Deeper Designs",
    description: "A living workspace where interior design clients track every detail of their home transformation. Updated daily through WhatsApp.",
    url: "/work/studio-noor",
    images: [{ url: "/images/studio-noor/hero-room.webp", width: 1200, height: 800, alt: "Studio Noor · Client Portal · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Noor · Client Portal · Deeper Designs",
    description: "A living workspace where interior design clients track every detail of their home transformation. Updated daily through WhatsApp.",
    images: ["/images/studio-noor/hero-room.webp"],
  },
  alternates: { canonical: "/work/studio-noor" },

};

const pageStyle = {
  "--page-bg": "#0E0C10",
  "--page-surface": "#171419",
  "--page-text": "#EDE8F0",
  "--page-text-2": "#8E8494",
  "--page-accent": "#9B7EC8",
  "--page-accent-2": "#B89EDB",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function StudioNoorPage() {
  return (
    <div className={instrument.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Studio Noor",
          description: metadata.description as string,
          slug: "studio-noor",
          image: "/images/studio-noor/hero-room.webp",
          archetype: "a boutique interior design studio",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "studio-noor")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "14 days"}
            pattern={meta.pattern ?? "Interior designers. Architects. Any project-based service business juggling clients on WhatsApp."}
            pains={meta.pains}
          />
        );
      })()}
      <AnishNote
        text="Clients aren't anxious because the project is late. They're anxious because they can't see it. Show them. The anxiety goes away."
        align="right"
        variant="inline"
      />

      <Founder />
      <Chaos />
      <Walkthrough />
      <Bridge />
      <Metrics />
      <About />
      <EditorialPullQuote
        quote="Mood boards on Pinterest. Floor plans on Drive. Material photos on WhatsApp. Invoices as screenshots."
        attribution="STUDIO NOOR · CONCEPT"
        accent="var(--page-accent-studio-noor)"
      />
      <NextProject />
    </div>
  );
}
