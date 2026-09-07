// Run after `bunx next dev -p 3399` is up: node scripts/v6-capture/capture.mjs
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/images/_ambient";
const BASE = "http://localhost:3399";

// yPct is the section's vertical center (0..1) of total scrollable height.
const TARGETS = [
  { slug: "zaatar-republic", yPct: 0.74, w: 1280, h: 800 },
  { slug: "smilefirst",      yPct: 0.65, w: 1280, h: 800 },
  { slug: "autobazaar",      yPct: 0.50, w: 1280, h: 800 },
  { slug: "stumpvision",     yPct: 0.34, w: 1280, h: 800 },
  { slug: "pawstay",         yPct: 0.42, w: 1280, h: 800 },
  { slug: "malabar-spice",   yPct: 0.36, w: 1280, h: 800 },
  { slug: "hivedesk",        yPct: 0.55, w: 1280, h: 800 },
  { slug: "maplelens",       yPct: 0.72, w: 1280, h: 800 },
];

const HIDE_CHROME_CSS = `
  nav, footer, a[href*="wa.me"], a[aria-label="WhatsApp us"] { display: none !important; }
  html { scroll-behavior: auto !important; }
`;

async function captureOne(browser, t) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    storageState: {
      cookies: [],
      origins: [{
        origin: BASE,
        localStorage: [],
        sessionStorage: [{ name: "wa-nudge-dismissed", value: "1" }],
      }],
    },
  });
  // Pre-seed sessionStorage so the nudge never appears (1st-load page sets it from there)
  await ctx.addInitScript(() => {
    try { sessionStorage.setItem("wa-nudge-dismissed", "1"); } catch (_e) {}
  });

  const page = await ctx.newPage();
  const url = `${BASE}/work/${t.slug}`;
  console.log(`[${t.slug}] loading ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3500);

  await page.addStyleTag({ content: HIDE_CHROME_CSS });
  // Aggressive cleanup: nuke every fixed-position element that's part of layout chrome
  await page.evaluate(() => {
    document.querySelectorAll("body *").forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.position === "fixed") {
        const z = parseInt(cs.zIndex, 10);
        if (!Number.isNaN(z) && z >= 30 && z <= 100) el.remove();
      }
    });
  });
  await page.waitForTimeout(300);

  const docH = await page.evaluate(() => document.documentElement.scrollHeight);
  const targetCenter = docH * t.yPct;
  const scrollY = Math.max(0, Math.round(targetCenter - 450));
  await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
  await page.waitForTimeout(1800);

  // Re-cleanup after scroll: some FloatingCTAs only mount on scroll
  await page.evaluate(() => {
    document.querySelectorAll("body *").forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.position === "fixed") {
        const z = parseInt(cs.zIndex, 10);
        if (!Number.isNaN(z) && z >= 30 && z <= 100) el.remove();
      }
    });
  });
  await page.waitForTimeout(200);

  const clipX = Math.max(0, Math.round((1440 - t.w) / 2));
  const buf = await page.screenshot({
    type: "png",
    clip: { x: clipX, y: 50, width: t.w, height: t.h },
  });
  await ctx.close();

  const outPath = `${OUT}/${t.slug}.webp`;
  await sharp(buf)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath);
  console.log(`[${t.slug}] saved ${outPath}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const t of TARGETS) {
    try {
      await captureOne(browser, t);
    } catch (err) {
      console.error(`[${t.slug}] FAILED`, err.message);
    }
  }
  await browser.close();
}

main().then(() => process.exit(0));
