import type { Metadata } from "next";
import { Spectral } from "next/font/google";

import Hero from "./Hero";
import StatementOfFacts from "./StatementOfFacts";
import Redaction from "./Redaction";
import Qualifier from "./Qualifier";
import Respondent from "./Respondent";
import Outcomes from "./Outcomes";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

// Spectral covers the editorial slab-serif feel of GT Sectra Display
// where Sectra is not on Google Fonts. Weights tuned for body and
// display headers.
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karan Legal · Lead Qualifier · Deeper Designs",
  description:
    "A custom prospect qualifier built for a Mumbai boutique startup lawyer. The chatbot intakes every prospect before he picks up the phone.",
  openGraph: {
    title: "Karan Legal · Lead Qualifier · Deeper Designs",
    description: "A custom prospect qualifier built for a Mumbai boutique startup lawyer. The chatbot intakes every prospect before he picks up the phone.",
    url: "/work/karan-legal",
    images: [{ url: "/images/karan-legal/hero-pen.webp", width: 1200, height: 800, alt: "Karan Legal · Lead Qualifier · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Legal · Lead Qualifier · Deeper Designs",
    description: "A custom prospect qualifier built for a Mumbai boutique startup lawyer. The chatbot intakes every prospect before he picks up the phone.",
    images: ["/images/karan-legal/hero-pen.webp"],
  },
  alternates: { canonical: "/work/karan-legal" },

};

const pageStyle = {
  "--page-bg": "#F4F2EE",
  "--page-surface-1": "#FFFFFF",
  "--page-surface-2": "#ECE9E3",
  "--page-border": "#1A1A1A",
  "--page-accent": "#1A1A1A",
  "--page-oxblood": "#8B0000",
  "--page-text": "#0A0A0A",
  "--page-text-2": "#525252",
  "--page-text-3": "#8A8A8A",
  background: "var(--page-bg)",
  color: "var(--page-text)",
  colorScheme: "light",
} as React.CSSProperties;

export default function KaranLegalPage() {
  return (
    <div
      data-theme="light"
      className={spectral.variable}
      style={pageStyle}
    >
      <StructuredData
        data={creativeWorkLd({
          name: "Karan Legal",
          description: metadata.description as string,
          slug: "karan-legal",
          image: "/images/karan-legal/hero-pen.webp",
          archetype: "an independent legal practice",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "karan-legal")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "9 days"}
            pattern={meta.pattern ?? "Independent lawyers. CAs. Consultants. Any solo practice drowning in unqualified intakes."}
            pains={meta.pains}
          />
        );
      })()}
      <StatementOfFacts />
      <Redaction />
      <Qualifier />
      <Respondent />
      <Outcomes />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
