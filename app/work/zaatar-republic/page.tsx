import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Numbers from "./Numbers";
import CoreProblem from "./CoreProblem";
import Solution from "./Solution";
import HowItWorks from "./HowItWorks";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PossibilityNote from "@/components/PossibilityNote";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaatar Republic · Operations Intelligence · Deeper Designs",
  description:
    "4 locations. 1,000 orders a day. Now running on data instead of gut feel. A live operations dashboard for a UAE shawarma chain.",
};

const pageStyle = {
  "--page-bg": "#0D0806",
  "--page-surface": "#1A1210",
  "--page-text": "#F5EDE5",
  "--page-text-2": "#A89080",
  "--page-accent": "#E85D2A",
  "--page-accent-2": "#FF8C5A",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function ZaatarRepublicPage() {
  return (
    <div className={dmSans.variable} style={pageStyle}>
      <Hero />
      <PossibilityNote
        number="004"
        archetype="a regional QSR chain"
        timeline="12 days"
        pattern="QSR chains. Multi-location restaurants. Any food brand running on gut feel and a POS dump."
      />
      <Founder />
      <Numbers />
      <CoreProblem />
      <Solution />
      <HowItWorks />
      <Metrics />
      <About />
      <NextProject />
    </div>
  );
}
