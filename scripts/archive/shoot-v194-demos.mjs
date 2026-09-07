// ARCHIVAL (v25.5): one-shot script from a shipped release. Kept for
// reference and for re-running that exact asset pass; not part of any
// build, deploy, or routine workflow. Safe to ignore during development.
// One-off: screenshot the ten real v19.4 demo routes (Manufacturing,
// Automotive, Hotels) at 2x and save to public/builds/<slug>/ (embedded in
// device frames on the /for pages) and build-artifacts/for-<slug>/ (review +
// marketing reuse). Run against a local `bun run start`. Not part of the build.
// The two video builds (automotive walkaround, hotels property-film) use
// VideoFrame (poster + fal clip), so they have no coded demo route here.
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";

const SHOTS = [
  // Manufacturing
  { slug: "manufacturing", route: "lead-filter", w: 1440, h: 900, file: "lead-filter.png" },
  { slug: "manufacturing", route: "quote-engine", w: 1440, h: 900, file: "quote-engine.png" },
  { slug: "manufacturing", route: "outreach", w: 1440, h: 900, file: "outreach.png" },
  { slug: "manufacturing", route: "distributor-portal", w: 1440, h: 900, file: "distributor-portal.png" },
  // Automotive
  { slug: "automotive", route: "test-drive-desk", w: 1440, h: 900, file: "test-drive-desk.png" },
  { slug: "automotive", route: "service-recall", w: 390, h: 844, file: "service-recall.png" },
  { slug: "automotive", route: "service-desk", w: 1440, h: 900, file: "service-desk.png" },
  // Hotels
  { slug: "hotels", route: "direct-booking", w: 1440, h: 900, file: "direct-booking.png" },
  { slug: "hotels", route: "concierge", w: 390, h: 844, file: "concierge.png" },
  { slug: "hotels", route: "guest-return", w: 1440, h: 900, file: "guest-return.png" },
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
  await page.screenshot({ path: out });
  copyFileSync(out, `${art}/${s.file}`);
  console.log(`saved ${s.slug}/${s.file} (${s.w}x${s.h})`);
  await page.close();
}
await browser.close();
console.log("done");
