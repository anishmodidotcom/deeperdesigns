// ARCHIVAL (v25.5): one-shot script from a shipped release. Kept for
// reference and for re-running that exact asset pass; not part of any
// build, deploy, or routine workflow. Safe to ignore during development.
// One-off (v19.6 cleanup): re-screenshot the demos whose accent changed
// (coaching, manufacturing, ca-firms, salons) so the embedded build shots
// match the new page accents, plus full-page shots of the real-estate page
// (new before/after + payback), the four re-accented pages, and the homepage
// (indigo nav + FAB). Run against a local `bun run start`. Not part of build.
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";

const DEMOS = [
  // coaching
  { slug: "coaching", route: "admissions", w: 1440, h: 900, file: "admissions.png" },
  { slug: "coaching", route: "fees", w: 390, h: 844, file: "fees.png" },
  { slug: "coaching", route: "attendance", w: 1440, h: 900, file: "attendance.png" },
  { slug: "coaching", route: "results", w: 1440, h: 900, file: "results.png" },
  // manufacturing
  { slug: "manufacturing", route: "lead-filter", w: 1440, h: 900, file: "lead-filter.png" },
  { slug: "manufacturing", route: "quote-engine", w: 1440, h: 900, file: "quote-engine.png" },
  { slug: "manufacturing", route: "outreach", w: 1440, h: 900, file: "outreach.png" },
  { slug: "manufacturing", route: "distributor-portal", w: 1440, h: 900, file: "distributor-portal.png" },
  // ca-firms
  { slug: "ca-firms", route: "document-portal", w: 1440, h: 900, file: "document-portal.png" },
  { slug: "ca-firms", route: "compliance-calendar", w: 1440, h: 900, file: "compliance-calendar.png" },
  { slug: "ca-firms", route: "client-hub", w: 390, h: 844, file: "client-hub.png" },
  { slug: "ca-firms", route: "extraction", w: 1440, h: 900, file: "extraction.png" },
  // salons
  { slug: "salons", route: "calendar", w: 1440, h: 900, file: "calendar.png" },
  { slug: "salons", route: "booking-assistant", w: 390, h: 844, file: "booking-assistant.png" },
  { slug: "salons", route: "rebook", w: 1440, h: 900, file: "rebook.png" },
  { slug: "salons", route: "studio-desk", w: 1440, h: 900, file: "studio-desk.png" },
];

const PAGES = ["real-estate", "coaching", "manufacturing", "ca-firms", "salons"];

const browser = await chromium.launch();

for (const s of DEMOS) {
  const pub = `public/builds/${s.slug}`;
  const art = `build-artifacts/for-${s.slug}`;
  mkdirSync(pub, { recursive: true });
  mkdirSync(art, { recursive: true });
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 2 });
  await page.goto(`${BASE}/demos/${s.slug}/${s.route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const out = `${pub}/${s.file}`;
  await page.screenshot({ path: out });
  copyFileSync(out, `${art}/${s.file}`);
  console.log(`demo ${s.slug}/${s.file}`);
  await page.close();
}

for (const slug of PAGES) {
  const art = `build-artifacts/for-${slug}`;
  mkdirSync(art, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  await page.goto(`${BASE}/for/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (let y = 0; y < 12; y++) {
    await page.evaluate((i) => window.scrollTo(0, i * window.innerHeight * 0.85), y);
    await page.waitForTimeout(350);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${art}/page-${slug}-full.png`, fullPage: true });
  console.log(`page ${slug}`);
  await page.close();
}

// Homepage hero (above the fold) to capture the indigo nav + FAB chrome.
{
  mkdirSync("build-artifacts/v196-chrome", { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "build-artifacts/v196-chrome/home-nav-fab.png" });
  console.log("chrome home-nav-fab");
  await page.close();
}

await browser.close();
console.log("done");
