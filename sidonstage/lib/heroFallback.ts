/**
 * Probes available hero portrait assets at build time without breaking
 * static export. Returns the first existing path. The site looks finished
 * even if the PDF extraction never ran, by falling back to the atmospheric
 * spotlight cone as a stage backdrop.
 *
 * Drop a higher-res photo at any of these paths to swap it in with no code
 * change:
 *   public/assets/extracted/hero/main.webp
 *   public/assets/extracted/portraits/01.webp
 */
import fs from "node:fs";
import path from "node:path";

const CANDIDATES = [
  "assets/extracted/hero/main.webp",
  "assets/extracted/hero/01.webp",
  "assets/extracted/portraits/main.webp",
  "assets/extracted/portraits/01.webp",
];

export function getHeroPortrait(): string | null {
  const pub = path.join(process.cwd(), "public");
  for (const rel of CANDIDATES) {
    if (fs.existsSync(path.join(pub, rel))) return "/" + rel;
  }
  return null;
}

export function hasHeroVideo(): boolean {
  const pub = path.join(process.cwd(), "public");
  return fs.existsSync(path.join(pub, "videos/hero/hero-loop.mp4"));
}

export function hasHeroPoster(): boolean {
  const pub = path.join(process.cwd(), "public");
  return fs.existsSync(path.join(pub, "videos/hero/hero-poster.webp"));
}
