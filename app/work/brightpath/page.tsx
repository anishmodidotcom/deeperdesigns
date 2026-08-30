import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";

import Hero from "./Hero";
import Omar from "./Omar";
import Progress from "./Progress";
import Programs from "./Programs";
import Portal from "./Portal";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { showcaseMetadata } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

// Source Serif 4 carries the academic gravitas the brief asked for
// (a contemporary cousin of the IBM Plex Serif). Source Sans 3 keeps
// the family for body, slightly looser than Inter, more readable on
// long-form sections.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-academic",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-soft",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BrightPath · Tutoring Practice · Deeper Designs",
  description:
    "Concept build. A one-man tutoring practice in Al Ain got a parent portal that does the talking. Every parent renews, and there is a waitlist by design.",
  openGraph: {
    title: "BrightPath · Tutoring Practice · Deeper Designs",
    siteName: "Deeper Designs",
    description: "A one-man IGCSE and SAT tutoring practice in Al Ain. We built Omar a parent portal that does the talking. 100 percent renewals. A waitlist, by design.",
    url: "/work/brightpath",
    images: [
      {
        url: "/api/og/brightpath",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/brightpath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrightPath · Tutoring Practice · Deeper Designs",
    description: "A one-man IGCSE and SAT tutoring practice in Al Ain. We built Omar a parent portal that does the talking. 100 percent renewals. A waitlist, by design.",
    images: ["/api/og/brightpath"],
  },
  alternates: { canonical: "/work/brightpath" },

};

const pageStyle = {
  "--page-bg": "#0A1428",
  "--page-surface-1": "#14213D",
  "--page-surface-2": "#1B2A4F",
  "--page-border": "rgba(212,168,87,0.18)",
  "--page-accent": "#D4A857",

  "--accent": "var(--page-accent)",
  "--page-accent-deep": "#A37F36",
  "--page-text": "#F5F1E8",
  "--page-text-2": "#B5BBC8",
  "--page-text-3": "#6C7588",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function BrightPathPage() {
  return (
    <main id="main"
      className={`${sourceSerif.variable} ${sourceSans.variable}`}
      style={pageStyle}
    >
      <StructuredData
        data={creativeWorkLd({
          name: "Brightpath",
          description: metadata.description as string,
          slug: "brightpath",
          image: "/images/brightpath/hero-classroom.webp",
          archetype: "a neighborhood tutoring practice",
        })}
      />
      <Hero />
      {(() => {
        const meta = showcaseMetadata("brightpath");
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "9 weeks"}
            pattern={meta.pattern ?? "Tutors. Coaches. Any one-person education practice that needs to look like an institution."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="Every parent of every tutoring client wants to know the same thing. Is my kid improving. The portal answers that before they ask."
        align="right"
        variant="inline"
      />

      <Omar />
      <Progress />
      <Programs />
      <Portal />
      <Numbers />
      <AboutBuild />
      <EditorialPullQuote
        quote="Parents pay for results they cannot see in real time."
        attribution="BRIGHTPATH · CONCEPT"
        accent="var(--page-accent-brightpath)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="brightpath" name="BrightPath" industry="Tutoring Practice" />
    </main>
  );
}
