import type { Metadata } from "next";
import { Yellowtail, DM_Sans } from "next/font/google";

import Hero from "./Hero";
import Farah from "./Farah";
import CakeBuild from "./CakeBuild";
import Menu from "./Menu";
import Studio from "./Studio";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";

// Yellowtail carries the script-led personality (a single-weight
// cursive that handles display sizes well). DM Sans is the quiet
// modern body sans the script needs to read against.
const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-script",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sugar Lane · Home Bakery · Deeper Designs",
  description:
    "A home bakery in Abu Dhabi run by Farah, who could bake forty cakes a week but only baked four. We rebuilt the order so she gets the cakes back.",
};

const pageStyle = {
  "--page-bg": "#FFF8F2",
  "--page-surface-1": "#FCEDE3",
  "--page-surface-2": "#F8E0D2",
  "--page-blush": "rgba(242,212,201,0.45)",
  "--page-border": "rgba(74,46,58,0.12)",
  "--page-accent": "#C9405A",
  "--page-accent-deep": "#6B2F44",
  "--page-text": "#4A2E3A",
  "--page-text-2": "#7E5C68",
  "--page-text-3": "#A88E97",
  background: "var(--page-bg)",
  color: "var(--page-text)",
  colorScheme: "light",
} as React.CSSProperties;

export default function SugarLanePage() {
  return (
    <div
      data-theme="light"
      className={`${yellowtail.variable} ${dmSans.variable}`}
      style={pageStyle}
    >
      <Hero />
      <Farah />
      <CakeBuild />
      <Menu />
      <Studio />
      <Numbers />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
