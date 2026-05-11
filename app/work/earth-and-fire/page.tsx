import type { Metadata } from "next";
import { Fraunces, DM_Serif_Display } from "next/font/google";

import Hero from "./Hero";
import Maker from "./Maker";
import Wheel from "./Wheel";
import Collection from "./Collection";
import Workshop from "./Workshop";
import Builder from "./Builder";
import VideoMoment from "./VideoMoment";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";

// Fraunces stands in as the editorial serif for body and small display.
// DM Serif Display covers the italic display headlines that anchor the
// script-feeling display register.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Earth and Fire · Pottery Brand · Deeper Designs",
  description:
    "A Jaipur ceramicist who sells out in 90 minutes. We built her a heritage brand, a custom builder, and a queue. Slower drops. Higher prices. Better business.",
};

const pageStyle = {
  "--page-bg": "#F5EFE3",
  "--page-surface-1": "#FAF6EC",
  "--page-surface-2": "#EBE2D0",
  "--page-border": "#9C8B73",
  "--page-accent": "#B85530",
  "--page-accent-2": "#7A5C2E",
  "--page-text": "#2B1C0E",
  "--page-text-2": "#5C4A38",
  "--page-text-3": "#8A7860",
  background: "var(--page-bg)",
  color: "var(--page-text)",
  colorScheme: "light",
  fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
} as React.CSSProperties;

export default function EarthAndFirePage() {
  return (
    <div
      data-theme="light"
      className={`${fraunces.variable} ${dmSerifDisplay.variable}`}
      style={pageStyle}
    >
      <Hero />
      <Maker />
      <Wheel />
      <Collection />
      <Workshop />
      <Builder />
      <VideoMoment />
      <Numbers />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
