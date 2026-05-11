import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import Hero from "./Hero";
import Problem from "./Problem";
import LiveCamera from "./LiveCamera";
import TheDay from "./TheDay";
import Profiles from "./Profiles";
import Facility from "./Facility";
import Booking from "./Booking";
import PawDetail from "./PawDetail";
import Metrics from "./Metrics";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PawStay · Pet Parent Portal · Deeper Designs",
  description:
    "A pet parent portal with live camera, real-time daily tracker, and a booking system. For Pooja's 20-dog Delhi daycare and the parents who finally relax.",
};

const pageStyle = {
  "--page-bg": "#0F1310",
  "--page-surface-1": "#161B17",
  "--page-surface-2": "#1E2520",
  "--page-border": "#252D27",
  "--page-border-2": "#313A33",
  "--page-accent": "#E8A557",
  "--page-accent-2": "#88A682",
  "--page-text": "#F2EDE2",
  "--page-text-2": "#B5AC9A",
  "--page-text-3": "#74705F",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function PawStayPage() {
  return (
    <div className={jakarta.variable} style={pageStyle}>
      <Hero />
      <Problem />
      <LiveCamera />
      <TheDay />
      <Profiles />
      <Facility />
      <Booking />
      <PawDetail />
      <Metrics />
      <AboutBuild />
      <NextProject />
    </div>
  );
}
