// ARCHIVAL (v25.5): one-shot script from a shipped release. Kept for
// reference and for re-running that exact asset pass; not part of any
// build, deploy, or routine workflow. Safe to ignore during development.
// One-off: screenshot the four real D2C demo routes at 2x and save to
// public/builds/d2c/ (embedded in device frames on /for/d2c-brands) and
// build-artifacts/for-d2c/ (review + marketing reuse). Run against a local
// `bun run start`. Not part of the build.
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const PUB = "public/builds/d2c";
const ART = "build-artifacts/for-d2c";
mkdirSync(PUB, { recursive: true });
mkdirSync(ART, { recursive: true });

const SHOTS = [
  { route: "behaviour-recovery", w: 390, h: 844, file: "behaviour-recovery.png" },
  { route: "profit-command", w: 1440, h: 900, file: "profit-command.png" },
  { route: "cod-confirm", w: 1440, h: 900, file: "cod-confirm.png" },
  { route: "studio-engine", w: 1440, h: 900, file: "studio-engine.png" },
];

const browser = await chromium.launch();
for (const s of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: s.w, height: s.h },
    deviceScaleFactor: 2,
  });
  await page.goto(`${BASE}/demos/d2c/${s.route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const out = `${PUB}/${s.file}`;
  await page.screenshot({ path: out }); // viewport clip
  copyFileSync(out, `${ART}/${s.file}`);
  console.log(`saved ${s.file} (${s.w}x${s.h})`);
  await page.close();
}
await browser.close();
console.log("done");
