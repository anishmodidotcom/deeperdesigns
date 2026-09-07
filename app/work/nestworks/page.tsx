import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Hero from "./Hero";
import Occupancy from "./Occupancy";
import Problem from "./Problem";
import TwoHalves from "./TwoHalves";
import Dashboard from "./Dashboard";
import Waterfall from "./Waterfall";
import Details from "./Details";
import Metrics from "./Metrics";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { showcaseMetadata } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nestworks · Member Hub · Deeper Designs",
  description:
    "Concept build. A coworking space stopped losing members it never saw leaving. One dashboard runs the floor and flags churn thirty days early.",
  openGraph: {
    title: "Nestworks · Member Hub · Deeper Designs",
    siteName: "Deeper Designs",
    description: "A coworking operating system that runs the floor, profiles every member, and tells the owner where the revenue actually leaks.",
    url: "/work/nestworks",
    images: [
      {
        url: "/api/og/nestworks",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/nestworks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestworks · Member Hub · Deeper Designs",
    description: "A coworking operating system that runs the floor, profiles every member, and tells the owner where the revenue actually leaks.",
    images: ["/api/og/nestworks"],
  },
  alternates: { canonical: "/work/nestworks" },

};

const pageStyle = {
  "--page-bg": "#09090B",
  "--page-surface-1": "#111113",
  "--page-surface-2": "#17171A",
  "--page-border": "#1F1F22",
  "--page-border-2": "#2A2A2E",
  "--page-accent": "#8B5CF6",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#A78BFA",
  "--page-text": "#FAFAFA",
  "--page-text-2": "#A1A1AA",
  "--page-text-3": "#71717A",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function NestworksPage() {
  return (
    <main id="main" className={inter.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Nestworks",
          description: metadata.description as string,
          slug: "nestworks",
          image: "/images/nestworks/hero-space.webp",
          archetype: "a neighborhood coworking space",
        })}
      />
      <Hero />
      {(() => {
        const meta = showcaseMetadata("nestworks");
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "22 days"}
            pattern={meta.pattern ?? "Coworking spaces. Studios with memberships. Any space-based business losing track of who is in and who is leaving."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="Amit could feel the churn. He couldn't see it. Once he saw it, the conversation with members changed completely."
        align="right"
        variant="inline"
      />

      <Occupancy />
      <Problem />
      <TwoHalves />
      <Dashboard />
      <Waterfall />
      <Details />
      <Metrics />
      <AboutBuild />
      <EditorialPullQuote
        quote="He was running it on Excel and goodwill, chasing renewals on WhatsApp the day they lapsed."
        attribution="NESTWORKS · CONCEPT"
        accent="var(--page-accent-nestworks)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="nestworks" name="Nestworks" industry="Coworking Space" />
    </main>
  );
}
