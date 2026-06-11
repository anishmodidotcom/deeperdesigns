/**
 * Lists files for each gallery rail by scanning the on-disk public folder
 * at build time. This means: drop a new photo into
 * `public/assets/extracted/<category>/`, rebuild, and it appears in the
 * rail. No code change required.
 */
import fs from "node:fs";
import path from "node:path";

const CATEGORIES = ["corporate", "teambuilding", "sports"] as const;
type Category = (typeof CATEGORIES)[number];

const EXT = /\.(webp|jpg|jpeg|png|avif)$/i;

export function listGallery(category: Category): string[] {
  const dir = path.join(process.cwd(), "public", "assets", "extracted", category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => EXT.test(f))
    .sort()
    .map((f) => `/assets/extracted/${category}/${f}`);
}

export function listLogos(): string[] {
  const dir = path.join(process.cwd(), "public", "assets", "extracted", "logos");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => EXT.test(f) || /\.svg$/i.test(f))
    .sort()
    .map((f) => `/assets/extracted/logos/${f}`);
}

export function logoNameFor(file: string): string {
  const stem = path
    .basename(file)
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .trim();
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}
