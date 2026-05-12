import type { Metadata } from "next";
import { Anton } from "next/font/google";

import Hero from "./Hero";
import Problem from "./Problem";
import Platform from "./Platform";
import Programs from "./Programs";
import ProductLine from "./ProductLine";
import VideoCTA from "./VideoCTA";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PossibilityNote from "@/components/PossibilityNote";

// Anton stands in for Druk Wide Bold (paid). Single regular weight, but
// the condensed CAPS energy is the right brand register for the athletic
// magazine-cover treatment this page leans on.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zara Fitness · Training Platform · Deeper Designs",
  description:
    "From followers to members. A web platform, workout engine, AI trainer, and sportswear launch for a Dubai-based fitness creator with 280K followers.",
};

const pageStyle = {
  "--page-bg": "#0E0E0E",
  "--page-surface-1": "#161616",
  "--page-surface-2": "#1F1F1F",
  "--page-border": "#2A2A2A",
  "--page-accent": "#D7FF5C",
  "--page-accent-2": "#F5F5F0",
  "--page-text": "#FFFFFF",
  "--page-text-2": "#B5B5B5",
  "--page-text-3": "#6E6E6E",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function ZaraFitnessPage() {
  return (
    <div className={anton.variable} style={pageStyle}>
      <Hero />
      <PossibilityNote
        number="015"
        archetype="a personal-brand fitness platform"
        timeline="12 days"
      />
      <Problem />
      <Platform />
      <Programs />
      <ProductLine />
      <VideoCTA />
      <Numbers />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
