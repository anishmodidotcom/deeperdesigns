// One-off: screenshot the four D2C build demos and the full pages from the
// running /for/d2c-brands route, for reuse in marketing. Run against a local
// `bun run start` server. Not part of the build.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const OUT = "build-artifacts/for-d2c";
mkdirSync(OUT, { recursive: true });

const DEMOS = [
  "behaviour-recovery",
  "profit-command",
  "cod-confirm",
  "studio-engine",
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1024 },
  deviceScaleFactor: 2,
});

await page.goto(`${BASE}/for/d2c-brands`, { waitUntil: "networkidle" });
// Let reveal animations settle.
await page.waitForTimeout(1200);

for (const key of DEMOS) {
  const el = page.locator(`[data-demo="${key}"]`).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await el.screenshot({ path: `${OUT}/demo-${key}.png` });
  console.log(`saved demo-${key}.png`);
}

// Full page for reference.
await page.screenshot({ path: `${OUT}/page-d2c-brands-full.png`, fullPage: true });
console.log("saved page-d2c-brands-full.png");

// A scaffold for reference.
await page.goto(`${BASE}/for/real-estate`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/page-real-estate-scaffold.png`, fullPage: true });
console.log("saved page-real-estate-scaffold.png");

await browser.close();
console.log("done");
