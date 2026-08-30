// ARCHIVAL (v25.5): one-shot script from a shipped release. Kept for
// reference and for re-running that exact asset pass; not part of any
// build, deploy, or routine workflow. Safe to ignore during development.
// One-off: screenshot the eleven real v19.3 demo routes (Coaching, Clinics,
// Fashion) at 2x and save to public/builds/<slug>/ (embedded in device frames
// on the /for pages) and build-artifacts/for-<slug>/ (review + marketing
// reuse). Run against a local `bun run start`. Not part of the build.
// The Fashion "Runway" build uses VideoFrame (poster + fal clip), so it has
// no coded demo route to screenshot here.
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";

const SHOTS = [
  // Coaching
  { slug: "coaching", route: "admissions", w: 1440, h: 900, file: "admissions.png" },
  { slug: "coaching", route: "fees", w: 390, h: 844, file: "fees.png" },
  { slug: "coaching", route: "attendance", w: 1440, h: 900, file: "attendance.png" },
  { slug: "coaching", route: "results", w: 1440, h: 900, file: "results.png" },
  // Clinics
  { slug: "clinics", route: "voice-receptionist", w: 390, h: 844, file: "voice-receptionist.png" },
  { slug: "clinics", route: "calendar", w: 1440, h: 900, file: "calendar.png" },
  { slug: "clinics", route: "recall", w: 1440, h: 900, file: "recall.png" },
  { slug: "clinics", route: "dashboard", w: 1440, h: 900, file: "dashboard.png" },
  // Fashion
  { slug: "fashion", route: "try-on", w: 390, h: 844, file: "try-on.png" },
  { slug: "fashion", route: "catalogue-studio", w: 1440, h: 900, file: "catalogue-studio.png" },
  { slug: "fashion", route: "drop-engine", w: 1440, h: 900, file: "drop-engine.png" },
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
