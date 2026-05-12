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
import PossibilityNote from "@/components/PossibilityNote";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HiveDesk · Member Hub · Deeper Designs",
  description:
    "A coworking operating system that runs the floor, profiles every member, and tells the owner where the revenue actually leaks.",
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
      <Hero />
      <PossibilityNote
        number="010"
        archetype="a neighborhood coworking space"
        timeline="22 days"
        pattern="Coworking spaces. Studios with memberships. Any space-based business losing track of who is in and who is leaving."
      />
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
