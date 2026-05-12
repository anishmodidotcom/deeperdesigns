import type { Metadata } from "next";
import { Bodoni_Moda, Inter, IBM_Plex_Mono } from "next/font/google";

import Hero from "./Hero";
import Outfit from "./Outfit";
import Climb from "./Climb";
import Trips from "./Trips";
import Kit from "./Kit";
import Ridge from "./Ridge";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PossibilityNote from "@/components/PossibilityNote";

// Bodoni Moda gives the high-contrast editorial display the brief
// asked for (Didot stand-in). Inter for body. IBM Plex Mono for the
// utilitarian section tags and coordinates.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-editorial",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-clean",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-tech",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nomad Trails · Trek Outfit · Deeper Designs",
  description:
    "A husband-and-wife Himalayan trek outfitter based in Leh. Eight trekkers per trip. Three trips a year. We built them an editorial site, not a booking funnel.",
};

const pageStyle = {
  "--page-bg": "#FAF8F4",
  "--page-surface-1": "#F0EDE6",
  "--page-surface-2": "#E5E1D7",
  "--page-border": "rgba(26,31,38,0.14)",
  "--page-accent": "#C44536",
  "--page-accent-deep": "#2E3D4F",
  "--page-text": "#1A1F26",
  "--page-text-2": "#4A5260",
  "--page-text-3": "#8A8F99",
  background: "var(--page-bg)",
  color: "var(--page-text)",
  colorScheme: "light",
} as React.CSSProperties;

export default function NomadTrailsPage() {
  return (
    <div
      data-theme="light"
      className={`${bodoni.variable} ${inter.variable} ${plexMono.variable}`}
      style={pageStyle}
    >
      <Hero />
      <PossibilityNote
        number="018"
        archetype="a Himalayan trek outfit"
        timeline="10 days"
      />
      <Outfit />
      <Climb />
      <Trips />
      <Kit />
      <Ridge />
      <Numbers />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
