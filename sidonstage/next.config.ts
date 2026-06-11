import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  basePath: "/sidonstage",
  assetPrefix: "/sidonstage",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: { root: __dirname },
};

export default config;
