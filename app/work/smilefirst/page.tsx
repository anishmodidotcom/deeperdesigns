import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Funnel from "./Funnel";
import System from "./System";
import Journey from "./Journey";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { showcaseMetadata } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmileFirst · Clinic Manager · Deeper Designs",
  description:
    "Concept build. A three-chair dental clinic turned recommended treatments into booked ones. Follow-up runs itself, and the clinic recovers ₹2.4L a month it used to lose.",
  openGraph: {
    title: "SmileFirst · Clinic Manager · Deeper Designs",
    siteName: "Deeper Designs",
    description: "Patient CRM, automated recalls, appointment management, dental records, and intelligent follow-up. A full clinic operating system for a 3-chair dental practice.",
    url: "/work/smilefirst",
    images: [
      {
        url: "/api/og/smilefirst",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/smilefirst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmileFirst · Clinic Manager · Deeper Designs",
    description: "Patient CRM, automated recalls, appointment management, dental records, and intelligent follow-up. A full clinic operating system for a 3-chair dental practice.",
    images: ["/api/og/smilefirst"],
  },
  alternates: { canonical: "/work/smilefirst" },

};

const pageStyle = {
  "--page-bg": "#060D10",
  "--page-surface": "#0D1A1F",
  "--page-text": "#E6F0F2",
  "--page-text-2": "#7A9CA5",
  "--page-accent": "#0FA89A",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#2CC4B6",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function SmileFirstPage() {
  return (
    <main id="main" className={jakarta.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Smilefirst",
          description: metadata.description as string,
          slug: "smilefirst",
          image: "/images/smilefirst/hero-clinic.webp",
          archetype: "an urban dental clinic",
        })}
      />
      <Hero />
      {(() => {
        const meta = showcaseMetadata("smilefirst");
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "10 days"}
            pattern={meta.pattern ?? "Dental clinics. Med spas. Hair clinics. Any private practice losing leads to slow follow-up."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="Sixty percent of recommended treatments never get booked. That's not a treatment problem. That's a follow-up problem. We solved the follow-up."
        align="right"
        variant="inline"
      />

      <Founder />
      <Funnel />
      <System />
      <Journey />
      <Metrics />
      <About />
      <EditorialPullQuote
        quote="Forty patients a day. Three dentists. A front desk holding every recall in their heads."
        attribution="SMILEFIRST · CONCEPT"
        accent="var(--page-accent-smilefirst)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="smilefirst" name="SmileFirst" industry="Dental Clinic" />
    </main>
  );
}
