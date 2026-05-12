import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://deeperdesigns.in/sitemap.xml",
    host: "https://deeperdesigns.in",
  };
}
