import type { MetadataRoute } from "next";
import { INDUSTRIES } from "@/lib/industries";

const SLUGS = [
  "maplelens",
  "deeper-content",
  "veda-glow",
  "bharat-steel",
  "meera-wellness",
  "zaatar-republic",
  "studio-noor",
  "smilefirst",
  "autobazaar",
  "stumpvision",
  "oud-and-ember",
  "hivedesk",
  "malabar-spice",
  "pawstay",
  "sahaja-farms",
  "karan-legal",
  "zara-fitness",
  "earth-and-fire",
  "kadak-chai",
  "nomad-trails",
  "sugar-lane",
  "brightpath",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.deeperdesigns.in";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/start-your-study`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/colophon`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...SLUGS.map((slug) => ({
      url: `${base}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // /for/[slug] industry pages. The live page ranks alongside the core
    // marketing pages; the scaffolds carry a lower priority until built.
    ...INDUSTRIES.map((ind) => ({
      url: `${base}/for/${ind.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: ind.live ? 0.8 : 0.5,
    })),
  ];
}
