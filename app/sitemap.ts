import type { MetadataRoute } from "next";

const SLUGS = [
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
  const base = "https://deeperdesigns.in";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...SLUGS.map((slug) => ({
      url: `${base}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
