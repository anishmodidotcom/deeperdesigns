// ARCHIVAL (v25.5): one-shot script from a shipped release. Kept for
// reference and for re-running that exact asset pass; not part of any
// build, deploy, or routine workflow. Safe to ignore during development.
// v22.2 hotfix: re-shoot the live product hero screenshots that were
// deleted from main. Captures the deployed products at 1920x1200 with a
// 2x deviceScaleFactor (retina) and writes optimized, metadata-free WebP
// straight to the paths /work/outpost and /work/oviya-studio reference.
// One-off, not part of the build. Run: bun run scripts/shoot-v22-2-live-heroes.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const SHOTS = [
  {
    url: "https://outpost.deeperdesigns.in",
    out: "public/images/outpost/live-hero.webp",
  },
  {
    url: "https://oviyastudio.com",
    out: "public/images/oviya-studio/live-hero.webp",
  },
];

// PLAYWRIGHT_CHROMIUM_PATH: escape hatch for sandboxes with a
// pre-installed Chromium that doesn't match this Playwright version.
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
  // Sandboxed sessions route egress through HTTPS_PROXY; Chromium only
  // honours it when passed explicitly, and the proxy's TLS terminator
  // rejects Chromium's TLS 1.3 ClientHello (cert verification stays on).
  proxy: process.env.HTTPS_PROXY
    ? { server: process.env.HTTPS_PROXY }
    : undefined,
  args: process.env.HTTPS_PROXY ? ["--ssl-version-max=tls1.2"] : [],
});
for (const { url, out } of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 2,
  });
  console.log(`shooting ${url}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  // Let fonts, hero animations, and lazy assets settle.
  await page.waitForTimeout(2500);
  const png = await page.screenshot({ type: "png" });
  mkdirSync(out.replace(/\/[^/]+$/, ""), { recursive: true });
  // sharp strips metadata by default; quality 82 keeps the retina shot lean.
  const info = await sharp(png).webp({ quality: 82, effort: 6 }).toFile(out);
  console.log(`saved ${out} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB)`);
  await page.close();
}
await browser.close();
console.log("done");
