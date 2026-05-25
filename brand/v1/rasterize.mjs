// Rasterize all brand SVGs to PNG using Sharp.
// Run from repo root: node brand/v1/rasterize.mjs
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname);
const PREVIEW = resolve(ROOT, "preview");
await mkdir(PREVIEW, { recursive: true });

const jobs = [
  // Logo + monogram previews
  { svg: "logo/monogram-primary.svg",            out: "preview/monogram-primary.png",         w: 1280, bg: "#0A0A0A", color: "#F5F5F5" },
  { svg: "logo/monogram-scales-preview.svg",     out: "preview/monogram-scales-preview.png",  w: 1920 },
  { svg: "logo/logo-wordmark-white.svg",         out: "preview/logo-wordmark-white.png",      w: 1600, bg: "#0A0A0A" },
  { svg: "logo/logo-wordmark-black.svg",         out: "preview/logo-wordmark-black.png",      w: 1600, bg: "#FAFAF7" },
  { svg: "logo/logo-wordmark-indigo.svg",        out: "preview/logo-wordmark-indigo.png",     w: 1600, bg: "#0A0A0A" },
  // Palette
  { svg: "palette/swatch-sheet.svg",             out: "preview/swatch-sheet.png",             w: 1800 },
  // Favicons
  { svg: "assets/favicon-16.svg",                out: "assets/favicon-16.png",                w: 16   },
  { svg: "assets/favicon-32.svg",                out: "assets/favicon-32.png",                w: 32   },
  { svg: "assets/apple-touch-180.svg",           out: "assets/apple-touch-180.png",           w: 180  },
  // Social
  { svg: "assets/instagram-avatar-indigo.svg",   out: "assets/instagram-avatar-indigo.png",   w: 1080 },
  { svg: "assets/instagram-avatar-dark.svg",     out: "assets/instagram-avatar-dark.png",     w: 1080 },
  { svg: "assets/whatsapp-profile.svg",          out: "assets/whatsapp-profile.png",          w: 640  },
  { svg: "assets/linkedin-banner.svg",           out: "assets/linkedin-banner.png",           w: 1584 },
  { svg: "assets/twitter-header.svg",            out: "assets/twitter-header.png",            w: 1500 },
  { svg: "assets/og-image-template.svg",         out: "assets/og-image-template.png",         w: 1200 },
  { svg: "assets/notion-header.svg",             out: "assets/notion-header.png",             w: 1500 },
  { svg: "assets/video-signoff-frame.svg",       out: "assets/video-signoff-frame.png",       w: 1920 },
];

for (const j of jobs) {
  const inPath  = resolve(ROOT, j.svg);
  const outPath = resolve(ROOT, j.out);
  await mkdir(dirname(outPath), { recursive: true });
  let buf = await readFile(inPath);
  if (j.color) {
    buf = Buffer.from(buf.toString("utf8").replaceAll("currentColor", j.color));
  }
  let pipeline = sharp(buf, { density: 384 }).resize({ width: j.w });
  if (j.bg) pipeline = pipeline.flatten({ background: j.bg });
  await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
  console.log(`✓ ${j.svg} -> ${j.out} (${j.w}px${j.bg ? ` on ${j.bg}` : ""})`);
}

// favicon.ico from 32px PNG (multi-size ICO not strictly required;
// modern browsers also accept PNG via <link rel="icon" type="image/png">).
// We just rename the 32px PNG into .ico as a single-image ICO substitute.
import { copyFile } from "node:fs/promises";
await copyFile(resolve(ROOT, "assets/favicon-32.png"), resolve(ROOT, "assets/favicon.ico"));
console.log("✓ assets/favicon.ico (copy of favicon-32.png)");

console.log("\nDone.");
