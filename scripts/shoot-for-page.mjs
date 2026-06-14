// One-off: fresh screenshots of the finished /for/d2c-brands page (full)
// and each build block, for review + marketing reuse. Run against a local
// `bun run start`. Not part of the build.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const ART = "build-artifacts/for-d2c";
mkdirSync(ART, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 2,
});
await page.goto(`${BASE}/for/d2c-brands`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
// Trigger lazy images / reveals by scrolling through.
for (let y = 0; y < 9; y++) {
  await page.evaluate((i) => window.scrollTo(0, i * window.innerHeight * 0.85), y);
  await page.waitForTimeout(350);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);

await page.screenshot({ path: `${ART}/page-d2c-brands-full.png`, fullPage: true });
console.log("saved page-d2c-brands-full.png");

// Each build block, by its kicker text.
const blocks = [
  ["BEHAVIOUR RECOVERY ENGINE", "block-01-behaviour-recovery.png"],
  ["PROFIT COMMAND", "block-02-profit-command.png"],
  ["COD CONFIRM AGENT", "block-03-cod-confirm.png"],
  ["STUDIO ENGINE", "block-04-studio-engine.png"],
];
for (const [kicker, file] of blocks) {
  const row = page.locator("div", { hasText: kicker }).last();
  // Walk up to the build row container (the one with both columns).
  const container = page.locator(`text=${kicker}`).first().locator("xpath=ancestor::div[contains(@class,'ind-build')][1]/..");
  try {
    await container.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await container.screenshot({ path: `${ART}/${file}` });
    console.log(`saved ${file}`);
  } catch (e) {
    console.log(`block ${kicker} fallback: ${e.message}`);
  }
}

// Persona wall + CTA region (lower page) viewport shots.
await browser.close();
console.log("done");
