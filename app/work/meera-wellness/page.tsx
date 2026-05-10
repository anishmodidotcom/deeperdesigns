import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import Hero from "./Hero";
import Client from "./Client";
import PanelHeading from "./PanelHeading";
import SchedulingPanel from "./SchedulingPanel";
import WhatsAppPanel from "./WhatsAppPanel";
import PortalPanel from "./PortalPanel";
import DailyFlow from "./DailyFlow";
import Impact from "./Impact";
import About from "./About";
import NextProject from "./NextProject";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meera Wellness · Wellness Hub · Deeper Designs",
  description:
    "A complete wellness platform. Scheduling, client management, WhatsApp integration, and personalized programs. All in one place.",
};

const pageStyle = {
  "--page-bg": "#F8F6F2",
  "--page-surface": "#EFECE6",
  "--page-text": "#1A1715",
  "--page-text-2": "#6B635A",
  "--page-accent": "#5B7F6E",
  "--page-accent-2": "#7DA08E",
  background: "var(--page-bg)",
  color: "var(--page-text)",
  colorScheme: "light",
} as React.CSSProperties;

export default function MeeraWellnessPage() {
  return (
    <div
      data-theme="light"
      className={cormorant.variable}
      style={pageStyle}
    >
      <Hero />
      <Client />
      <PanelHeading />
      <SchedulingPanel />
      <WhatsAppPanel />
      <PortalPanel />
      <DailyFlow />
      <Impact />
      <About />
      <NextProject />
    </div>
  );
}
