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
    "A custom prospect qualifier built for a Mumbai boutique startup lawyer. The chatbot intakes every prospect before he picks up the phone.",
};

const pageStyle = {
  "--page-bg": "#F4F2EE",
  "--page-surface-1": "#FFFFFF",
  "--page-surface-2": "#ECE9E3",
  "--page-border": "#1A1A1A",
  "--page-accent": "#1A1A1A",
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
    <div
      data-theme="light"
      className={spectral.variable}
      style={pageStyle}
    >
      <Hero />
      <StatementOfFacts />
      <Redaction />
      <Qualifier />
      <Respondent />
      <Outcomes />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
