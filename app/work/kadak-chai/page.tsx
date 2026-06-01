import type { Metadata } from "next";
import { Archivo_Black, Crimson_Pro } from "next/font/google";

import Hero from "./Hero";
import Devika from "./Devika";
import TheTin from "./TheTin";
import TheRange from "./TheRange";
import Quiz from "./Quiz";
import Steam from "./Steam";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";

// Archivo Black is the closest open-source stand-in for the heavy
// tin-can headline style we wanted (Druk Wide Bold). Crimson Pro
// gives the body a warm editorial register without going florid.
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-bold",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kadak Chai · Tea Brand · Deeper Designs",
  description:
    "A third-generation Mumbai tea family went direct. We built the brand, the tins, the range, and a quiz-led store, and the middleman is gone.",
  openGraph: {
    title: "Kadak Chai · Tea Brand · Deeper Designs",
    description: "A third-generation Mumbai tea family selling sample-room blends out of a wholesale yard. We made it a brand. Tins. A range. A site that reads like a strong cup.",
    url: "/work/kadak-chai",
    images: [
      {
        url: "/api/og/kadak-chai",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/kadak-chai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kadak Chai · Tea Brand · Deeper Designs",
    description: "A third-generation Mumbai tea family selling sample-room blends out of a wholesale yard. We made it a brand. Tins. A range. A site that reads like a strong cup.",
    images: ["/api/og/kadak-chai"],
  },
  alternates: { canonical: "/work/kadak-chai" },

};

const pageStyle = {
  "--page-bg": "#110906",
  "--page-surface-1": "#1A0E0A",
  "--page-surface-2": "#241410",
  "--page-border": "#3A2820",
  "--page-accent": "#C9803A",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#F2E5C7",
  "--page-text": "#F5E5CC",
  "--page-text-2": "#C9B89A",
  "--page-text-3": "#85705A",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function KadakChaiPage() {
  return (
    <div className={`${archivoBlack.variable} ${crimsonPro.variable}`} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Kadak Chai",
          description: metadata.description as string,
          slug: "kadak-chai",
          image: "/images/kadak-chai/hero-tin.webp",
          archetype: "a craft chai brand",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "kadak-chai")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "7 weeks"}
            pattern={meta.pattern ?? "Wholesale-to-D2C brands. Family supply businesses going direct. Any product worth a tin."}
            pains={meta.pains}
          />
        );
      })()}
      <AnishNote
        text="Three generations of the family ran a wholesale business. Devika is the first to sell direct. Same blends. Half the middlemen. Twice the margin."
        align="right"
        variant="inline"
      />

      <Devika />
      <TheTin />
      <TheRange />
      <Quiz />
      <Steam />
      <Numbers />
      <AboutBuild />
      <EditorialPullQuote
        quote="For sixty years the family sold loose-leaf chai to other tea shops, who put their own names on the packaging."
        attribution="KADAK CHAI · CONCEPT"
        accent="var(--page-accent-kadak-chai)"
      />
      <NextProject />
    </div>
  );
}
