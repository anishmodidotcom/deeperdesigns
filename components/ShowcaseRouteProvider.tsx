"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ShowcaseProvider } from "@/components/ShowcaseContext";

// Single source of truth for showcase metadata used by tracking
// context. Mirrors lib/showcases.ts industryLabel for each slug.
// Kept local to this file to avoid pulling the heavy SHOWCASES list
// (with copy, pains, etc.) into the layout client bundle.
const INDUSTRY_BY_SLUG: Record<string, string> = {
  "maplelens":        "Furniture Maker",
  "deeper-content":   "Deeper Designs",
  "veda-glow":        "Ayurvedic D2C",
  "bharat-steel":     "B2B Industrial",
  "meera-wellness":   "Wellness Studio",
  "zaatar-republic":  "QSR Chain",
  "studio-noor":      "Interior Design",
  "smilefirst":       "Dental Clinic",
  "autobazaar":       "Used-Car Lot",
  "stumpvision":      "Coaching Academy",
  "oud-and-ember":    "Perfume Atelier",
  "hivedesk":         "Coworking Space",
  "malabar-spice":    "Heritage Exporter",
  "pawstay":          "Pet Boarding",
  "sahaja-farms":     "Organic Farm",
  "karan-legal":      "Legal Practice",
  "zara-fitness":     "Fitness Creator",
  "earth-and-fire":   "Ceramics Studio",
  "kadak-chai":       "Craft Tea Brand",
  "nomad-trails":     "Trek Outfit",
  "sugar-lane":       "Home Bakery",
  "brightpath":       "Tutoring Practice",
};

const LIVE_PRODUCTS = new Set<string>(["maplelens", "deeper-content"]);

// Mounted once at the layout level. Reads the current pathname; if the
// URL is /work/<slug>, publishes the showcase context so sitewide
// WhatsApp CTAs (Nav 'Talk to us', WhatsAppButton FAB, Footer link)
// can fire the showcase-aware triple-stack:
//   trackLead + trackWhatsAppOpenedFromShowcase
//   + trackLiveProductCTAClick (live products only)
//
// On non-showcase routes (/, /about, /services, etc.) the provider
// renders children with no context, and sitewide CTAs fall back to plain
// trackLead.
export default function ShowcaseRouteProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const match = pathname.match(/^\/work\/([^/?#]+)/);
  const slug = match?.[1];
  const industry = slug ? INDUSTRY_BY_SLUG[slug] : undefined;

  if (!slug || !industry) {
    return <>{children}</>;
  }

  return (
    <ShowcaseProvider
      slug={slug}
      industry={industry}
      isLiveProduct={LIVE_PRODUCTS.has(slug)}
    >
      {children}
    </ShowcaseProvider>
  );
}
