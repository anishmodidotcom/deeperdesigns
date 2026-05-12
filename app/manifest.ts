import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Deeper Designs",
    short_name: "Deeper Designs",
    description:
      "An AI-led build studio. Custom digital tools, designed carefully and shipped in weeks.",
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
        src: "/apple-icon.svg",
        type: "image/svg+xml",
        sizes: "180x180",
      },
    ],
  };
}
