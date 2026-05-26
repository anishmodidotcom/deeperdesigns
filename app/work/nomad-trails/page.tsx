import type { Metadata } from "next";
import { Bodoni_Moda, Inter, IBM_Plex_Mono } from "next/font/google";

import Hero from "./Hero";
import Outfit from "./Outfit";
import Climb from "./Climb";
import Trips from "./Trips";
import Kit from "./Kit";
import Ridge from "./Ridge";
import Numbers from "./Numbers";
import AboutBuild from "./AboutBuild";
import NextProject from "./NextProject";
import PainBlock from "@/components/PainBlock";
import { SHOWCASES } from "@/lib/showcases";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";

// Bodoni Moda gives the high-contrast editorial display the brief
// asked for (Didot stand-in). Inter for body. IBM Plex Mono for the
// utilitarian section tags and coordinates.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-editorial",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-clean",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-tech",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nomad Trails · Trek Outfit · Deeper Designs",
  description:
    "A husband-and-wife Himalayan trek outfit got an editorial site, not a booking funnel. Direct bookings tripled, and the trip rate tripled with them.",
  openGraph: {
    title: "Nomad Trails · Trek Outfit · Deeper Designs",
    description: "A husband-and-wife Himalayan trek outfitter based in Leh. Eight trekkers per trip. Three trips a year. We built them an editorial site, not a booking funnel.",
    url: "/work/nomad-trails",
    images: [{ url: "/images/nomad-trails/hero-ridge.webp", width: 1200, height: 800, alt: "Nomad Trails · Trek Outfit · Deeper Designs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomad Trails · Trek Outfit · Deeper Designs",
    description: "A husband-and-wife Himalayan trek outfitter based in Leh. Eight trekkers per trip. Three trips a year. We built them an editorial site, not a booking funnel.",
    images: ["/images/nomad-trails/hero-ridge.webp"],
  },
  alternates: { canonical: "/work/nomad-trails" },

};

const pageStyle = {
  "--page-bg": "#FAF8F4",
  "--page-surface-1": "#F0EDE6",
  "--page-surface-2": "#E5E1D7",
  "--page-border": "rgba(26,31,38,0.14)",
  "--page-accent": "#C44536",

  "--accent": "var(--page-accent)",
  "--page-accent-deep": "#2E3D4F",
  "--page-text": "#1A1F26",
  "--page-text-2": "#4A5260",
  "--page-text-3": "#8A8F99",
  background: "var(--page-bg)",
  color: "var(--page-text)",
  colorScheme: "light",
} as React.CSSProperties;

export default function NomadTrailsPage() {
  return (
    <div
      data-theme="light"
      className={`${bodoni.variable} ${inter.variable} ${plexMono.variable}`}
      style={pageStyle}
    >
      <StructuredData
        data={creativeWorkLd({
          name: "Nomad Trails",
          description: metadata.description as string,
          slug: "nomad-trails",
          image: "/images/nomad-trails/hero-ridge.webp",
          archetype: "a Himalayan trek outfit",
        })}
      />
      <Hero />
      {(() => {
        const meta = SHOWCASES.find((s) => s.slug === "nomad-trails")!;
        return (
          <PainBlock
            number={meta.number}
            archetype={meta.archetype}
            timeline={meta.timeline ?? "10 days"}
            pattern={meta.pattern ?? "Trek outfits. Small-group tours. Niche travel brands selling experience, not seats."}
            pains={meta.pains}
          />
        );
      })()}
      <AnishNote
        text="Selling spots in a treking trip is a booking funnel. Selling an experience is a phone call. The site is built for the call, not the cart."
        align="right"
        variant="inline"
      />

      <Outfit />
      <Climb />
      <Trips />
      <Kit />
      <Ridge />
      <Numbers />
      <AboutBuild />
      <EditorialPullQuote
        quote="They got tired of group sizes of twenty, and of clients picking treks off a brochure they couldn't pronounce."
        attribution="NOMAD TRAILS · CONCEPT"
        accent="var(--page-accent-nomad-trails)"
      />
      <NextProject />
    </div>
  );
}
