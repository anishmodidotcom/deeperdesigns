// v28.2: full-page desktop and mobile screenshots of the live site for the
// design system asset bank. Run against a local `bun run start`, not against
// production, so the shots always match the committed code.
//
//   bun run build && bun run start -p 3210
//   node scripts/shoot-v28-2-site-screenshots.mjs
//
// Output: marketing/design-assets/dd/site-screenshots/<slug>-{desktop,mobile}.webp
//
// Note on the 16383px cap. WebP's container format stores width and height
// as 14-bit values, so no side can exceed 16383 pixels. At deviceScaleFactor
// 2 a few of our longer pages exceed that (the homepage mobile shot is
// 33766px tall), and libwebp refuses them outright. Those pages are captured
// at 2x anyway, then downscaled by the smallest factor that fits, so the
// asset is still the full page rather than a crop. The script prints the
// effective scale for every capped file and writes it into the manifest via
// build-dd-manifest.mjs, so nobody mistakes a capped shot for a true 2x one.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const OUT = "marketing/design-assets/dd/site-screenshots";

// WebP hard limit. Both dimensions must be <= this.
const WEBP_MAX = 16383;

const ROUTES = [
  "/",
  "/trust",
  "/software",
  "/what-software-costs",
  "/teardown",
  "/partners",
  "/community",
  "/about",
  "/services",
  "/process",
  "/start-your-study",
  "/software/crm",
  "/software/receivables",
  "/software/job-work",
  "/business/manufacturers",
  "/business/traders",
  "/business/packaging",
  "/work/outpost",
  "/work/oviya-studio",
  "/work/deeper-content",
  "/work/maplelens",
];

// "/" -> home, "/software/crm" -> software-crm, "/work/outpost" -> work-outpost
const slugFor = (route) =>
  route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");

const VIEWPORTS = [
  { name: "desktop", width: 1920, height: 1080, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
];

// Scroll the whole page once so lazy images, IntersectionObserver reveals and
// scroll-triggered animations have all fired, then return to the top and let
// it settle before the capture.
async function settle(page) {
  await page.waitForTimeout(1200);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = await page.evaluate(() => window.innerHeight * 0.8);
  for (let y = 0; y < height; y += step) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(160);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  // Settle any font swap or in-flight image decode before we shoot.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
}

// Use the browser Playwright resolves by default. Set CHROMIUM_PATH when the
// installed browser build does not match the one this Playwright version
// pins, which is the case on machines that share a prebuilt browser cache.
const CHROMIUM_PATH = process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium";
const browser = await chromium.launch(
  existsSync(CHROMIUM_PATH) ? { executablePath: CHROMIUM_PATH } : {},
);
mkdirSync(OUT, { recursive: true });

const results = [];
let failed = 0;

for (const route of ROUTES) {
  const slug = slugFor(route);

  for (const vp of VIEWPORTS) {
    const label = `${slug}-${vp.name}`;
    const file = path.join(OUT, `${label}.webp`);

    // A fresh context per shot so the once-per-session WhatsApp nudge and any
    // dismissed-tooltip state never leak from one capture into the next.
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    });
    const page = await ctx.newPage();

    try {
      const res = await page.goto(`${BASE}${route}`, { waitUntil: "load" });
      if (!res || res.status() !== 200) {
        throw new Error(`HTTP ${res ? res.status() : "no response"}`);
      }
      await settle(page);

      const png = await page.screenshot({ fullPage: true });
      const meta = await sharp(png).metadata();

      // Largest factor <= 1 that brings both sides under the WebP limit.
      const fit = Math.min(1, WEBP_MAX / meta.width, WEBP_MAX / meta.height);
      let pipeline = sharp(png);
      let capped = false;
      if (fit < 1) {
        capped = true;
        pipeline = pipeline.resize({
          width: Math.floor(meta.width * fit),
          height: Math.floor(meta.height * fit),
          fit: "fill",
        });
      }

      // sharp drops EXIF, ICC and XMP unless withMetadata() is called, so
      // simply not calling it is what strips the metadata.
      const webp = await pipeline.webp({ quality: 85, effort: 6 }).toBuffer();
      writeFileSync(file, webp);

      const out = await sharp(webp).metadata();
      results.push({
        slug,
        variant: vp.name,
        file: `site-screenshots/${label}.webp`,
        width: out.width,
        height: out.height,
        captured: `${meta.width}x${meta.height}`,
        scale: capped ? +(2 * fit).toFixed(2) : 2,
        capped,
        bytes: webp.length,
      });

      console.log(
        `${label.padEnd(34)} ${String(out.width).padStart(5)}x${String(out.height).padEnd(6)}` +
          ` ${(webp.length / 1024).toFixed(0).padStart(5)} KB` +
          (capped ? `  capped from ${meta.width}x${meta.height} (${(2 * fit).toFixed(2)}x)` : ""),
      );
    } catch (err) {
      failed++;
      console.error(`${label.padEnd(34)} FAILED: ${err.message.split("\n")[0]}`);
    } finally {
      await ctx.close();
    }
  }
}

await browser.close();

// Hand the capture facts to the manifest builder so it does not have to
// re-open and re-measure every file, and so the capped flag survives.
writeFileSync(
  path.join(OUT, "capture-log.json"),
  JSON.stringify({ base: BASE, shot: results.length, results }, null, 2) + "\n",
);

const totalMB = results.reduce((a, r) => a + r.bytes, 0) / 1024 / 1024;
console.log(`\n${results.length} shot, ${failed} failed, ${totalMB.toFixed(1)} MB total`);
const cappedList = results.filter((r) => r.capped);
if (cappedList.length) {
  console.log(`capped to the WebP ${WEBP_MAX}px limit: ${cappedList.map((r) => `${r.slug}-${r.variant}`).join(", ")}`);
}
if (failed) process.exit(1);
