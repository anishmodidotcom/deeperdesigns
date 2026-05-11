import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

import Hero from "./Hero";
import Story from "./Story";
import Spices from "./Spices";
import Hands from "./Hands";
import Ledger from "./Ledger";
import Kerala from "./Kerala";
import Tray from "./Tray";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Malabar Spice House · Heritage Brand Site · Deeper Designs",
  description:
    "Sixty-three years, forty-five buyers, one website that finally feels like Kerala. An editorial brand site and digital archive for a third-generation Kochi spice exporter.",
};

const pageStyle = {
  "--page-bg": "#0E0805",
  "--page-surface-1": "#1A100A",
  "--page-surface-2": "#241710",
  "--page-border": "#2E1F16",
  "--page-accent": "#E89B2D",
  "--page-accent-2": "#F2C14E",
  "--page-accent-3": "#5A6B3D",
  "--page-text": "#F4E8D6",
  "--page-text-2": "#C0A881",
  "--page-text-3": "#7A6A52",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function MalabarSpicePage() {
  return (
    <div className={fraunces.variable} style={pageStyle}>
      <Hero />
      <Story />
      <Spices />
      <Hands />
      <Ledger />
      <Kerala />
      <Tray />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
