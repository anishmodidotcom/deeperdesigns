// One-off: screenshot the twelve real v19.5 demo routes (CA Firms, Salons,
// Logistics) at 2x and save to public/builds/<slug>/ (embedded in device
// frames on the /for pages) and build-artifacts/for-<slug>/ (review +
// marketing reuse). Run against a local `bun run start`. Not part of the build.
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";

const SHOTS = [
  // CA & Professional Services
  { slug: "ca-firms", route: "document-portal", w: 1440, h: 900, file: "document-portal.png" },
  { slug: "ca-firms", route: "compliance-calendar", w: 1440, h: 900, file: "compliance-calendar.png" },
  { slug: "ca-firms", route: "client-hub", w: 390, h: 844, file: "client-hub.png" },
  { slug: "ca-firms", route: "extraction", w: 1440, h: 900, file: "extraction.png" },
  // Salons & Wellness
  { slug: "salons", route: "calendar", w: 1440, h: 900, file: "calendar.png" },
  { slug: "salons", route: "booking-assistant", w: 390, h: 844, file: "booking-assistant.png" },
  { slug: "salons", route: "rebook", w: 1440, h: 900, file: "rebook.png" },
  { slug: "salons", route: "studio-desk", w: 1440, h: 900, file: "studio-desk.png" },
  // Logistics & Fleet
  { slug: "logistics", route: "control-room", w: 1440, h: 900, file: "control-room.png" },
  { slug: "logistics", route: "epod", w: 390, h: 844, file: "epod.png" },
  { slug: "logistics", route: "fuel-watch", w: 1440, h: 900, file: "fuel-watch.png" },
  { slug: "logistics", route: "freight-audit", w: 1440, h: 900, file: "freight-audit.png" },
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
