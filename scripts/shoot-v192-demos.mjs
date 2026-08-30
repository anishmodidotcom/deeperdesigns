// ARCHIVAL (v25.5): one-shot script from a shipped release. Kept for
// reference and for re-running that exact asset pass; not part of any
// build, deploy, or routine workflow. Safe to ignore during development.
// One-off: screenshot the eleven real v19.2 demo routes (Real Estate,
// Jewellery, Restaurants) at 2x and save to public/builds/<slug>/ (embedded
// in device frames on the /for pages) and build-artifacts/for-<slug>/
// (review + marketing reuse). Run against a local `bun run start`.
// Not part of the build.
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";

const SHOTS = [
  // Real Estate
  { slug: "real-estate", route: "lead-desk", w: 1440, h: 900, file: "lead-desk.png" },
  { slug: "real-estate", route: "listing-studio", w: 1440, h: 900, file: "listing-studio.png" },
  { slug: "real-estate", route: "pipeline", w: 1440, h: 900, file: "pipeline.png" },
  // Jewellery
  { slug: "jewellery", route: "try-on", w: 390, h: 844, file: "try-on.png" },
  { slug: "jewellery", route: "billing", w: 1440, h: 900, file: "billing.png" },
  { slug: "jewellery", route: "vault", w: 1440, h: 900, file: "vault.png" },
  { slug: "jewellery", route: "khata", w: 390, h: 844, file: "khata.png" },
  // Restaurants
  { slug: "restaurants", route: "reconciler", w: 1440, h: 900, file: "reconciler.png" },
  { slug: "restaurants", route: "dish-studio", w: 1440, h: 900, file: "dish-studio.png" },
  { slug: "restaurants", route: "direct-order", w: 390, h: 844, file: "direct-order.png" },
  { slug: "restaurants", route: "kitchen-line", w: 1440, h: 900, file: "kitchen-line.png" },
];

const browser = await chromium.launch();
for (const s of SHOTS) {
  const pub = `public/builds/${s.slug}`;
  const art = `build-artifacts/for-${s.slug}`;
  mkdirSync(pub, { recursive: true });
  mkdirSync(art, { recursive: true });
  const page = await browser.newPage({
    viewport: { width: s.w, height: s.h },
    deviceScaleFactor: 2,
  });
  await page.goto(`${BASE}/demos/${s.slug}/${s.route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const out = `${pub}/${s.file}`;
  await page.screenshot({ path: out }); // viewport clip
  copyFileSync(out, `${art}/${s.file}`);
  console.log(`saved ${s.slug}/${s.file} (${s.w}x${s.h})`);
  await page.close();
}
await browser.close();
console.log("done");
