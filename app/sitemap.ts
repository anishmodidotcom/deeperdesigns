import type { MetadataRoute } from "next";
import { INDUSTRIES } from "@/lib/industries";
import { SHOWCASES } from "@/lib/showcases";
import { SOFTWARE } from "@/lib/software";
import { SEGMENTS } from "@/lib/segments";

// v25.5: showcase slugs are derived from lib/showcases.ts rather than a
// hand-copied list, so a new showcase cannot silently miss the sitemap.
//
// v26: lastModified is a real per-route date instead of the request time.
// Every entry used to stamp `new Date()`, so all 45 URLs claimed to have
// changed on every single fetch, which crawlers discount and which told
// search engines nothing. Each route now carries the date its content last
// meaningfully changed, updated by hand when the content changes. Routes
// added in a release share that release's date.
const V26 = "2026-08-30";
const V25_6 = "2026-08-30";
const V23 = "2026-07-13";
const V22 = "2026-07-10";
const V20 = "2026-06-18";
const V19 = "2026-06-15";
const V18 = "2026-06-05";
const V16 = "2026-06-02";
const V15 = "2026-06-01";

type Entry = {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const CORE: Entry[] = [
  { path: "/", lastModified: V26, changeFrequency: "weekly", priority: 1.0 },
  { path: "/software", lastModified: V26, changeFrequency: "monthly", priority: 0.9 },
  { path: "/what-software-costs", lastModified: V26, changeFrequency: "monthly", priority: 0.9 },
  { path: "/start-your-study", lastModified: V23, changeFrequency: "monthly", priority: 0.9 },
  { path: "/teardown", lastModified: V26, changeFrequency: "monthly", priority: 0.9 },
  { path: "/community", lastModified: V23, changeFrequency: "monthly", priority: 0.8 },
  { path: "/partners", lastModified: V26, changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", lastModified: V16, changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", lastModified: V18, changeFrequency: "monthly", priority: 0.8 },
  { path: "/process", lastModified: V15, changeFrequency: "monthly", priority: 0.8 },
  { path: "/colophon", lastModified: V18, changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", lastModified: V20, changeFrequency: "yearly", priority: 0.3 },
];

// Showcase content last changed in v16, except the four live product pages,
// which were reworked later.
const SHOWCASE_DATES: Record<string, string> = {
  outpost: V25_6,
  "oviya-studio": V22,
  maplelens: V25_6,
  "deeper-content": V18,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.deeperdesigns.in";
  return [
    ...CORE.map((e) => ({
      url: `${base}${e.path}`,
      lastModified: e.lastModified,
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    })),
    ...SHOWCASES.map((s) => ({
      url: `${base}/work/${s.slug}`,
      lastModified: SHOWCASE_DATES[s.slug] ?? V16,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // /for/[slug] industry pages. The live page ranks alongside the core
    // marketing pages; the scaffolds carry a lower priority until built.
    ...INDUSTRIES.map((ind) => ({
      url: `${base}/for/${ind.slug}`,
      lastModified: V19,
      changeFrequency: "monthly" as const,
      priority: ind.live ? 0.8 : 0.5,
    })),
    // v26: the software index and the B2B segments layer.
    ...SOFTWARE.map((s) => ({
      url: `${base}/software/${s.slug}`,
      lastModified: V26,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...SEGMENTS.map((s) => ({
      url: `${base}/business/${s.slug}`,
      lastModified: V26,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
