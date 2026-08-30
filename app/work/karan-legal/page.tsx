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
import { showcaseMetadata } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

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
    "Concept build. A solo Mumbai lawyer stopped answering forty intake calls a week. A qualifier intakes every prospect first, so he only spends time on the clients worth it.",
  openGraph: {
    title: "Karan Legal · Lead Qualifier · Deeper Designs",
    siteName: "Deeper Designs",
    description: "A custom prospect qualifier built for a Mumbai boutique startup lawyer. The chatbot intakes every prospect before he picks up the phone.",
    url: "/work/karan-legal",
    images: [
      {
        url: "/api/og/karan-legal",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/karan-legal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Legal · Lead Qualifier · Deeper Designs",
    description: "A custom prospect qualifier built for a Mumbai boutique startup lawyer. The chatbot intakes every prospect before he picks up the phone.",
    images: ["/api/og/karan-legal"],
  },
  alternates: { canonical: "/work/karan-legal" },

};

const pageStyle = {
  "--page-bg": "#F4F2EE",
  "--page-surface-1": "#FFFFFF",
  "--page-surface-2": "#ECE9E3",
  "--page-border": "#1A1A1A",
  "--page-accent": "#1A1A1A",

  "--accent": "var(--page-accent)",
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
    <main id="main"
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
        const meta = showcaseMetadata("karan-legal");
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "9 days"}
            pattern={meta.pattern ?? "Independent lawyers. CAs. Consultants. Any solo practice drowning in unqualified intakes."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="The right number of clients to take is the number you can actually serve well. The qualifier protects Karan from his own Yes-to-everyone tendency."
        align="right"
        variant="inline"
      />

      <StatementOfFacts />
      <Redaction />
      <Qualifier />
      <Respondent />
      <Outcomes />
      <AboutBuild />
      <EditorialPullQuote
        quote="Karan was answering every call himself, and most were not worth his time."
        attribution="KARAN LEGAL · CONCEPT"
        accent="var(--page-accent-karan-legal)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="karan-legal" name="Karan Legal" industry="Legal Practice" />
    </main>
  );
}
