import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import Hero from "./Hero";
import ActivityFeed from "./ActivityFeed";
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
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";

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
    "A Delhi dog boarding facility gave anxious parents a live window in. The owner got two hours of her day back, and the panicked WhatsApp messages stopped.",
  openGraph: {
    title: "PawStay · Pet Parent Portal · Deeper Designs",
    description: "A pet parent portal with live camera, real-time daily tracker, and a booking system. For Pooja's 20-dog Delhi daycare and the parents who finally relax.",
    url: "/work/pawstay",
    images: [
      {
        url: "/api/og/pawstay",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/pawstay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PawStay · Pet Parent Portal · Deeper Designs",
    description: "A pet parent portal with live camera, real-time daily tracker, and a booking system. For Pooja's 20-dog Delhi daycare and the parents who finally relax.",
    images: ["/api/og/pawstay"],
  },
  alternates: { canonical: "/work/pawstay" },

};

const pageStyle = {
  "--page-bg": "#0F1310",
  "--page-surface-1": "#161B17",
  "--page-surface-2": "#1E2520",
  "--page-border": "#252D27",
  "--page-border-2": "#313A33",
  "--page-accent": "#E8A557",

  "--accent": "var(--page-accent)",
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
      <ActivityFeed />
      <StructuredData
        data={creativeWorkLd({
          name: "Pawstay",
          description: metadata.description as string,
          slug: "pawstay",
          image: "/images/pawstay/hero-dog.webp",
          archetype: "a dog boarding facility",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "pawstay")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "10 days"}
            pattern={meta.pattern ?? "Boarding facilities. Salons. Service businesses with anxious clients."}
            pains={meta.pains}
            showcaseSlug={meta.slug}
            showcaseIndustry={meta.industryLabel}
          />
        );
      })()}
      <AnishNote
        text="Pooja was losing two hours a day to update messages. She wasn't going to charge more. She just needed her time back. So did the parents."
        align="right"
        variant="inline"
      />

      <Problem />
      <LiveCamera />
      <TheDay />
      <Profiles />
      <Facility />
      <Booking />
      <PawDetail />
      <Metrics />
      <AboutBuild />
      <EditorialPullQuote
        quote="Pooja sent photos. Then videos. Then she lost two hours a day to it."
        attribution="PAWSTAY · CONCEPT"
        accent="var(--page-accent-pawstay)"
      />
      <NextProject />
      <ShowcaseAnalytics slug="pawstay" name="PawStay" industry="Pet Boarding" />
    </div>
  );
}
