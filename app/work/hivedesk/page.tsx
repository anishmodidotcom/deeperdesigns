import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Hero from "./Hero";
import Problem from "./Problem";
import TwoHalves from "./TwoHalves";
import Dashboard from "./Dashboard";
import Waterfall from "./Waterfall";
import Details from "./Details";
import Metrics from "./Metrics";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";

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
