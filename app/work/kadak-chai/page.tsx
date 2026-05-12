import type { Metadata } from "next";
import { Archivo_Black, Crimson_Pro } from "next/font/google";

import Hero from "./Hero";
import Devika from "./Devika";
import TheTin from "./TheTin";
import TheRange from "./TheRange";
import Quiz from "./Quiz";
import Steam from "./Steam";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PossibilityNote from "@/components/PossibilityNote";

// Archivo Black is the closest open-source stand-in for the heavy
// tin-can headline style we wanted (Druk Wide Bold). Crimson Pro
// gives the body a warm editorial register without going florid.
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-bold",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kadak Chai · Tea Brand · Deeper Designs",
  description:
    "A third-generation Mumbai tea family selling sample-room blends out of a wholesale yard. We made it a brand. Tins. A range. A site that reads like a strong cup.",
};

const pageStyle = {
  "--page-bg": "#110906",
  "--page-surface-1": "#1A0E0A",
  "--page-surface-2": "#241410",
  "--page-border": "#3A2820",
  "--page-accent": "#C9803A",
  "--page-accent-2": "#F2E5C7",
  "--page-text": "#F5E5CC",
  "--page-text-2": "#C9B89A",
  "--page-text-3": "#85705A",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function KadakChaiPage() {
  return (
    <div className={`${archivoBlack.variable} ${crimsonPro.variable}`} style={pageStyle}>
      <Hero />
      <PossibilityNote
        number="017"
        archetype="a craft chai brand"
        timeline="7 weeks"
      />
      <Devika />
      <TheTin />
      <TheRange />
      <Quiz />
      <Steam />
      <Numbers />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
