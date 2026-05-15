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
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

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
    "A one-man tutoring practice in Al Ain got a parent portal that does the talking. Every parent renews, and there is a waitlist by design.",
  openGraph: {
    title: "BrightPath · Tutoring Practice · Deeper Designs",
    description: "A one-man IGCSE and SAT tutoring practice in Al Ain. We built Omar a parent portal that does the talking. 100 percent renewals. A waitlist, by design.",
    url: "/work/brightpath",
    images: [{ url: "/images/brightpath/hero-classroom.webp", width: 1200, height: 800, alt: "BrightPath · Tutoring Practice · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrightPath · Tutoring Practice · Deeper Designs",
    description: "A one-man IGCSE and SAT tutoring practice in Al Ain. We built Omar a parent portal that does the talking. 100 percent renewals. A waitlist, by design.",
    images: ["/images/brightpath/hero-classroom.webp"],
  },
  alternates: { canonical: "/work/brightpath" },

};

const pageStyle = {
  "--page-bg": "#0A1428",
  "--page-surface-1": "#14213D",
  "--page-surface-2": "#1B2A4F",
  "--page-border": "rgba(212,168,87,0.18)",
  "--page-accent": "#D4A857",
  "--page-accent-deep": "#A37F36",
  "--page-text": "#F5F1E8",
  "--page-text-2": "#B5BBC8",
  "--page-text-3": "#6C7588",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function BrightPathPage() {
  return (
    <div
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
        const meta = SHOWCASES.find((s) => s.slug === "brightpath")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "9 weeks"}
            pattern={meta.pattern ?? "Tutors. Coaches. Any one-person education practice that needs to look like an institution."}
            pains={meta.pains}
          />
        );
      })()}
      <Omar />
      <Progress />
      <Programs />
      <Portal />
      <Numbers />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
