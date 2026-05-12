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

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmileFirst · Clinic Manager · Deeper Designs",
  description:
    "Patient CRM, automated recalls, appointment management, dental records, and intelligent follow-up. A full clinic operating system for a 3-chair dental practice.",
};

const pageStyle = {
  "--page-bg": "#060D10",
  "--page-surface": "#0D1A1F",
  "--page-text": "#E6F0F2",
  "--page-text-2": "#7A9CA5",
  "--page-accent": "#0FA89A",
  "--page-accent-2": "#2CC4B6",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function SmileFirstPage() {
  return (
    <div className={jakarta.variable} style={pageStyle}>
      <Hero />
      <Founder />
      <Funnel />
      <System />
      <Journey />
      <Metrics />
      <About />
      <NextProject />
    </div>
  );
}
