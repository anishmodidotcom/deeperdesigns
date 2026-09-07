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
    // v30.2: the monogram, near-black on off-white. Raster copies live in
    // public/ rather than being the app/ file-convention icons, because a
    // manifest is fetched as a plain URL and the file-convention routes
    // carry a build hash.
    icons: [
      {
        src: "/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  };
}
