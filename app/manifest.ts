import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Deeper Designs",
    short_name: "Deeper Designs",
    description:
      "Custom digital tools, sites, and operational systems for Indian businesses. Designed carefully and shipped in weeks.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0E",
    theme_color: "#0B0B0E",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        src: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  };
}
