import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Breath from "./Breath";
import Client from "./Client";
import PanelHeading from "./PanelHeading";
import SchedulingPanel from "./SchedulingPanel";
import WhatsAppPanel from "./WhatsAppPanel";
import PortalPanel from "./PortalPanel";
import DailyFlow from "./DailyFlow";
import Impact from "./Impact";
import About from "./About";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

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
    "A Dubai yoga instructor got her time back. One platform handles scheduling, client portals, and WhatsApp bookings, so she teaches instead of doing admin.",
  openGraph: {
    title: "Meera Wellness · Wellness Hub · Deeper Designs",
    description: "A complete wellness platform. Scheduling, client management, WhatsApp integration, and personalized programs. All in one place.",
    url: "/work/meera-wellness",
    images: [{ url: "/images/meera-wellness/hero-pose.webp", width: 1200, height: 800, alt: "Meera Wellness · Wellness Hub · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meera Wellness · Wellness Hub · Deeper Designs",
    description: "A complete wellness platform. Scheduling, client management, WhatsApp integration, and personalized programs. All in one place.",
    images: ["/images/meera-wellness/hero-pose.webp"],
  },
  alternates: { canonical: "/work/meera-wellness" },

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
      <StructuredData
        data={creativeWorkLd({
          name: "Meera Wellness",
          description: metadata.description as string,
          slug: "meera-wellness",
          image: "/images/meera-wellness/hero-pose.webp",
          archetype: "a yoga and wellness studio",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "meera-wellness")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "10 days"}
            pattern={meta.pattern ?? "Yoga studios. Pilates studios. Therapists. Any wellness practice with packages and renewals."}
            pains={meta.pains}
          />
        );
      })()}
      <Founder />
      <Breath />
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
