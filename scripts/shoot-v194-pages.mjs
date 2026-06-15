// One-off: fresh full-page screenshots of the three finished v19.4 /for pages
// (manufacturing, automotive, hotels), for review + marketing reuse. Run
// against a local `bun run start`. Not part of the build.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const SLUGS = ["manufacturing", "automotive", "hotels"];

const browser = await chromium.launch();
for (const slug of SLUGS) {
  const art = `build-artifacts/for-${slug}`;
  mkdirSync(art, { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });
  await page.goto(`${BASE}/for/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (let y = 0; y < 12; y++) {
    await page.evaluate((i) => window.scrollTo(0, i * window.innerHeight * 0.85), y);
    await page.waitForTimeout(350);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${art}/page-${slug}-full.png`, fullPage: true });
  console.log(`saved page-${slug}-full.png`);
  await page.close();
}
await browser.close();
console.log("done");
