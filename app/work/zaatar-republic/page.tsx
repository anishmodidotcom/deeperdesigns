import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import Hero from "./Hero";
import Founder from "./Founder";
import Numbers from "./Numbers";
import CoreProblem from "./CoreProblem";
import Solution from "./Solution";
import HowItWorks from "./HowItWorks";
import Metrics from "./Metrics";
import About from "./About";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaatar Republic · Operations Intelligence · Deeper Designs",
  description:
    "4 locations. 1,000 orders a day. Now running on data instead of gut feel. A live operations dashboard for a UAE shawarma chain.",
  openGraph: {
    title: "Zaatar Republic · Operations Intelligence · Deeper Designs",
    description: "4 locations. 1,000 orders a day. Now running on data instead of gut feel. A live operations dashboard for a UAE shawarma chain.",
    url: "/work/zaatar-republic",
    images: [{ url: "/images/zaatar-republic/hero-wrap.webp", width: 1200, height: 800, alt: "Zaatar Republic · Operations Intelligence · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaatar Republic · Operations Intelligence · Deeper Designs",
    description: "4 locations. 1,000 orders a day. Now running on data instead of gut feel. A live operations dashboard for a UAE shawarma chain.",
    images: ["/images/zaatar-republic/hero-wrap.webp"],
  },
  alternates: { canonical: "/work/zaatar-republic" },

};

const pageStyle = {
  "--page-bg": "#0D0806",
  "--page-surface": "#1A1210",
  "--page-text": "#F5EDE5",
  "--page-text-2": "#A89080",
  "--page-accent": "#E85D2A",
  "--page-accent-2": "#FF8C5A",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function ZaatarRepublicPage() {
  return (
    <div className={dmSans.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Zaatar Republic",
          description: metadata.description as string,
          slug: "zaatar-republic",
          image: "/images/zaatar-republic/hero-wrap.webp",
          archetype: "a regional QSR chain",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "zaatar-republic")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "12 days"}
            pattern={meta.pattern ?? "QSR chains. Multi-location restaurants. Any food brand running on gut feel and a POS dump."}
            pains={meta.pains}
          />
        );
      })()}
      <Founder />
      <Numbers />
      <CoreProblem />
      <Solution />
      <HowItWorks />
      <Metrics />
      <About />
      <NextProject />
    </div>
  );
}
