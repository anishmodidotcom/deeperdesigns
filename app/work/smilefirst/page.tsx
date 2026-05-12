import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Funnel from "./Funnel";
import System from "./System";
import Journey from "./Journey";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmileFirst · Clinic Manager · Deeper Designs",
  description:
    "Patient CRM, automated recalls, appointment management, dental records, and intelligent follow-up. A full clinic operating system for a 3-chair dental practice.",
  openGraph: {
    title: "SmileFirst · Clinic Manager · Deeper Designs",
    description: "Patient CRM, automated recalls, appointment management, dental records, and intelligent follow-up. A full clinic operating system for a 3-chair dental practice.",
    url: "/work/smilefirst",
    images: [{ url: "/images/smilefirst/hero-clinic.webp", width: 1200, height: 800, alt: "SmileFirst · Clinic Manager · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmileFirst · Clinic Manager · Deeper Designs",
    description: "Patient CRM, automated recalls, appointment management, dental records, and intelligent follow-up. A full clinic operating system for a 3-chair dental practice.",
    images: ["/images/smilefirst/hero-clinic.webp"],
  },
  alternates: { canonical: "/work/smilefirst" },

};

const pageStyle = {
  "--page-bg": "#060D10",
  "--page-surface": "#0D1A1F",
  "--page-text": "#E6F0F2",
  "--page-text-2": "#7A9CA5",
  "--page-accent": "#0FA89A",
  "--page-accent-2": "#2CC4B6",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function SmileFirstPage() {
  return (
    <div className={jakarta.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Smilefirst",
          description: metadata.description as string,
          slug: "smilefirst",
          image: "/images/smilefirst/hero-clinic.webp",
          archetype: "an urban dental clinic",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "smilefirst")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "10 days"}
            pattern={meta.pattern ?? "Dental clinics. Med spas. Hair clinics. Any private practice losing leads to slow follow-up."}
            pains={meta.pains}
          />
        );
      })()}
      <Founder />
      <Funnel />
      <System />
      <Journey />
      <Metrics />
      <About />
      <NextProject />
    </div>
  );
}
