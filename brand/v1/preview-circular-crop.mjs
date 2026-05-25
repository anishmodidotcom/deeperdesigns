// Verify that the LinkedIn avatar fits inside a circular crop.
// Renders two previews:
//  1. linkedin-avatar-circular.png — the avatar masked to a circle (what LinkedIn shows)
//  2. linkedin-avatar-overlay.png  — the avatar with a faint ring at the circular boundary
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname);

// 1. Circular-cropped preview
const ring = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <defs><mask id="m"><rect width="300" height="300" fill="black"/><circle cx="150" cy="150" r="150" fill="white"/></mask></defs>
  <rect width="300" height="300" fill="black" mask="url(#m)"/>
</svg>`);

await sharp(resolve(ROOT, "linkedin-company-avatar.png"))
  .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><defs><mask id="circleMask"><rect width="300" height="300" fill="black"/><circle cx="150" cy="150" r="150" fill="white"/></mask></defs><rect width="300" height="300" fill="white" mask="url(#circleMask)"/></svg>`), blend: "dest-in" }])
  .png()
  .toFile(resolve(ROOT, "preview/linkedin-avatar-circular.png"));

// 2. Overlay preview — show the boundary
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <circle cx="150" cy="150" r="150" fill="none" stroke="#FF3B3B" stroke-width="2" stroke-dasharray="6 4"/>
</svg>`);
await sharp(resolve(ROOT, "linkedin-company-avatar.png"))
  .composite([{ input: overlay }])
  .png()
  .toFile(resolve(ROOT, "preview/linkedin-avatar-overlay.png"));

console.log("✓ preview/linkedin-avatar-circular.png");
console.log("✓ preview/linkedin-avatar-overlay.png");
