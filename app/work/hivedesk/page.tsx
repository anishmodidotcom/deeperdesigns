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
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HiveDesk · Member Hub · Deeper Designs",
  description:
    "A coworking space stopped losing members it never saw leaving. One dashboard runs the floor and flags churn thirty days early.",
  openGraph: {
    title: "HiveDesk · Member Hub · Deeper Designs",
    description: "A coworking operating system that runs the floor, profiles every member, and tells the owner where the revenue actually leaks.",
    url: "/work/hivedesk",
    images: [{ url: "/images/hivedesk/hero-space.webp", width: 1200, height: 800, alt: "HiveDesk · Member Hub · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiveDesk · Member Hub · Deeper Designs",
    description: "A coworking operating system that runs the floor, profiles every member, and tells the owner where the revenue actually leaks.",
    images: ["/images/hivedesk/hero-space.webp"],
  },
  alternates: { canonical: "/work/hivedesk" },

};

const pageStyle = {
  "--page-bg": "#09090B",
  "--page-surface-1": "#111113",
  "--page-surface-2": "#17171A",
  "--page-border": "#1F1F22",
  "--page-border-2": "#2A2A2E",
  "--page-accent": "#8B5CF6",
  "--page-accent-2": "#A78BFA",
  "--page-text": "#FAFAFA",
  "--page-text-2": "#A1A1AA",
  "--page-text-3": "#71717A",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function HiveDeskPage() {
  return (
    <div className={inter.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Hivedesk",
          description: metadata.description as string,
          slug: "hivedesk",
          image: "/images/hivedesk/hero-space.webp",
          archetype: "a neighborhood coworking space",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "hivedesk")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "22 days"}
            pattern={meta.pattern ?? "Coworking spaces. Studios with memberships. Any space-based business losing track of who is in and who is leaving."}
            pains={meta.pains}
          />
        );
      })()}
      <Occupancy />
      <Problem />
      <TwoHalves />
      <Dashboard />
      <Waterfall />
      <Details />
      <Metrics />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
