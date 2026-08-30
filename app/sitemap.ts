import type { MetadataRoute } from "next";
import { INDUSTRIES } from "@/lib/industries";
import { SHOWCASES } from "@/lib/showcases";

// v25.5: two fixes here.
//
// 1. The showcase slugs are derived from lib/showcases.ts instead of being
//    a hand-maintained copy of it. The duplicate list meant a showcase
//    added to the registry but forgotten here would silently never be
//    submitted for indexing.
// 2. lastModified used to be `new Date()` on every entry, so all 45 URLs
//    claimed to change on every deploy. That trains search engines to
//    ignore the field. A single build-time constant is still not per-page
//    truth, but it stops the churn and is honest at the deploy level: the
//    date the currently deployed build was made. Vercel sets
//    VERCEL_GIT_COMMIT_SHA-adjacent build metadata, but no commit date, so
//    build time is the closest available signal.
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.deeperdesigns.in";
  return [
    { url: `${base}/`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/start-your-study`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/community`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/colophon`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    ...SHOWCASES.map((s) => ({
      url: `${base}/work/${s.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // /for/[slug] industry pages. The live page ranks alongside the core
    // marketing pages; the scaffolds carry a lower priority until built.
    ...INDUSTRIES.map((ind) => ({
      url: `${base}/for/${ind.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: ind.live ? 0.8 : 0.5,
    })),
  ];
}
