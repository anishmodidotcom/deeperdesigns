import type { Metadata } from "next";
import { Anton } from "next/font/google";

import Hero from "./Hero";
import Problem from "./Problem";
import Platform from "./Platform";
import Programs from "./Programs";
import ProductLine from "./ProductLine";
import VideoCTA from "./VideoCTA";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

// Anton stands in for Druk Wide Bold (paid). Single regular weight, but
// the condensed CAPS energy is the right brand register for the athletic
// magazine-cover treatment this page leans on.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zara Fitness · Training Platform · Deeper Designs",
  description:
    "Concept build. A Dubai fitness creator with 280K followers and a PDF guide got a real platform. 12,400 members in 90 days, and a sportswear line to come.",
  openGraph: {
    title: "Zara Fitness · Training Platform · Deeper Designs",
    siteName: "Deeper Designs",
    description: "From followers to members. A web platform, workout engine, AI trainer, and sportswear launch for a Dubai-based fitness creator with 280K followers.",
    url: "/work/zara-fitness",
    images: [
      {
        url: "/api/og/zara-fitness",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/zara-fitness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zara Fitness · Training Platform · Deeper Designs",
    description: "From followers to members. A web platform, workout engine, AI trainer, and sportswear launch for a Dubai-based fitness creator with 280K followers.",
    images: ["/api/og/zara-fitness"],
  },
  alternates: { canonical: "/work/zara-fitness" },

};

const pageStyle = {
  "--page-bg": "#0E0E0E",
  "--page-surface-1": "#161616",
  "--page-surface-2": "#1F1F1F",
  "--page-border": "#2A2A2A",
  "--page-accent": "#D7FF5C",

  "--accent": "var(--page-accent)",
  "--page-accent-2": "#F5F5F0",
  "--page-text": "#FFFFFF",
  "--page-text-2": "#B5B5B5",
  "--page-text-3": "#6E6E6E",
  background: "var(--page-bg)",
  color: "var(--page-text)",
} as React.CSSProperties;

export default function ZaraFitnessPage() {
  return (
    <main id="main" className={anton.variable} style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          name: "Zara Fitness",
          description: metadata.description as string,
          slug: "zara-fitness",
          image: "/images/zara-fitness/hero-zara.webp",
          archetype: "a personal-brand fitness platform",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "zara-fitness")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "12 days"}
            pattern={meta.pattern ?? "Personal trainers. Fitness creators. Anyone trying to turn followers into paying members."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="280K followers and a PDF guide is not a product. The platform is. So is the sportswear line that ships with it."
        align="right"
        variant="inline"
      />

      <Problem />
      <Platform />
      <Programs />
      <ProductLine />
      <VideoCTA />
      <Numbers />
      <AboutBuild />
      <EditorialPullQuote
        quote="280,000 followers. A PDF workout guide. A three-week dropoff cliff."
        attribution="ZARA FITNESS · CONCEPT"
        accent="var(--page-accent-zara-fitness)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="zara-fitness" name="Zara Fitness" industry="Fitness Creator" />
    </main>
  );
}
