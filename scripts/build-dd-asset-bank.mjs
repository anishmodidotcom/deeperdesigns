// v24: assemble the DD asset bank (Parts A + B). Deterministic, no network.
// Copies + renames existing clean assets into marketing/design-assets/dd/,
// dedupes Part B by content hash keeping the highest-resolution copy, and
// emits assembled-index.json describing every asset for the manifest.
//
// Currency handling: known currency-bearing UI renders are held out of the
// auto-copy set (CURRENCY_HOLD) and reviewed / cropped separately, so no
// rupee figures land in the bank without a human pass.
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "/home/user/deeperdesigns";
const BANK = path.join(ROOT, "marketing/design-assets/dd");
const UI = path.join(BANK, "ui-screenshots");
const GEN = path.join(BANK, "generated-images");
mkdirSync(UI, { recursive: true });
mkdirSync(GEN, { recursive: true });

// ---- Part A: industry build-demo UI renders (public/builds/*.webp) ----
// UI dashboards/apps only. Studio photos + posters are Part B (PHOTO below).
// Names with a trailing "!" are held for currency review, not auto-copied.
const BUILD_UI = {
  automotive: ["service-desk", "service-recall", "test-drive-desk"],
  "ca-firms": ["client-hub", "compliance-calendar", "document-portal", "extraction"],
  clinics: ["calendar", "dashboard", "recall", "voice-receptionist"],
  coaching: ["admissions", "attendance", "results", "fees!"],
  d2c: ["studio-engine", "behaviour-recovery!", "cod-confirm!", "profit-command!"],
  fashion: ["catalogue-studio", "drop-engine", "try-on"],
  hotels: ["concierge", "direct-booking", "guest-return"],
  jewellery: ["try-on", "vault", "billing!", "khata!"],
  logistics: ["control-room", "epod", "fuel-watch", "freight-audit!"],
  manufacturing: ["distributor-portal", "lead-filter", "outreach", "quote-engine!"],
  "real-estate": ["lead-desk", "listing-studio", "pipeline"],
  restaurants: ["direct-order", "dish-studio", "kitchen-line", "reconciler!"],
  salons: ["booking-assistant", "calendar", "rebook", "studio-desk"],
};

// ---- Part B: generated PHOTO assets living under public/builds ----
const BUILD_PHOTO = [
  ["automotive", "walkaround-poster.webp", "automotive_walkaround_poster"],
  ["d2c/studio", "out-inhand.webp", "d2c_product_inhand"],
  ["d2c/studio", "out-lifestyle.webp", "d2c_product_lifestyle"],
  ["d2c/studio", "out-studio.webp", "d2c_product_studio"],
  ["d2c/studio", "raw-input.webp", "d2c_product_raw_input"],
  ["fashion", "runway-flat.webp", "fashion_runway_flat"],
  ["fashion", "runway-poster.webp", "fashion_runway_poster"],
  ["fashion/studio", "flat-dress.webp", "fashion_flat_dress"],
  ["fashion/studio", "onmodel-dress.webp", "fashion_onmodel_dress"],
  ["fashion/studio", "onmodel-lifestyle.webp", "fashion_onmodel_lifestyle"],
  ["fashion/try-on", "tryon-result.webp", "fashion_tryon_result"],
  ["hotels", "property-poster.webp", "hotels_property_poster"],
  ["jewellery/tryon", "tryon-before.webp", "jewellery_tryon_before"],
  ["jewellery/tryon", "tryon-after.webp", "jewellery_tryon_after"],
  ["real-estate", "film-before.webp", "realestate_film_before"],
  ["real-estate", "film-after.webp", "realestate_film_after"],
  ["real-estate/studio", "raw-room.webp", "realestate_raw_room"],
  ["real-estate/studio", "staged-classic.webp", "realestate_staged_classic"],
  ["real-estate/studio", "staged-modern.webp", "realestate_staged_modern"],
  ["real-estate/studio", "staged-warm.webp", "realestate_staged_warm"],
  ["restaurants/studio", "dish-hero.webp", "restaurants_dish_hero"],
  ["restaurants/studio", "dish-raw.webp", "restaurants_dish_raw"],
  ["restaurants/studio", "dish-reel.webp", "restaurants_dish_reel"],
  ["restaurants/studio", "dish-topdown.webp", "restaurants_dish_topdown"],
];

// ---- Part B: showcase + product generated imagery (public/images/<slug>) ----
// DD portfolio client showcases + DD's own MapleLens product + ambient bgs.
// Excluded per v24 scope: deeper-content, outpost, oviya-studio (sub-brands,
// separate banks later), about (site photos), sidonstage (off-limits).
const SHOWCASE_SLUGS = [
  "autobazaar", "bharat-steel", "brightpath", "earth-and-fire", "hivedesk",
  "kadak-chai", "karan-legal", "malabar-spice", "maplelens", "meera-wellness",
  "nomad-trails", "oud-and-ember", "pawstay", "sahaja-farms", "smilefirst",
  "studio-noor", "stumpvision", "sugar-lane", "veda-glow", "zaatar-republic",
  "zara-fitness",
];

// Product-page portfolio UI heroes (Part A). Included per the Part A capture
// list; flagged in README/PR against the scope note that Outpost/Oviya/Deeper
// Content get dedicated banks later. MapleLens is in-scope DD product.
const PRODUCT_HEROES = [
  ["outpost/live-hero.webp", "ui_outpost_hero.png", "outpost"],
  ["oviya-studio/live-hero.webp", "ui_oviya_studio_hero.png", "oviya-studio"],
];

const assembled = [];
const seenHashes = new Map(); // hash -> {file, area}

function sha(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

async function dims(file) {
  try {
    const m = await sharp(file).metadata();
    return { w: m.width ?? 0, h: m.height ?? 0 };
  } catch {
    return { w: 0, h: 0 };
  }
}

async function copyAsset(srcAbs, destDir, destName, type, tag, note) {
  if (!existsSync(srcAbs)) {
    console.warn("MISSING", srcAbs);
    return;
  }
  const buf = readFileSync(srcAbs);
  const h = sha(buf);
  const { w, h: hh } = await dims(srcAbs);
  const area = w * hh;
  // Dedupe Part B by exact content; keep the higher-resolution copy.
  if (type !== "ui") {
    const prev = seenHashes.get(h);
    if (prev) {
      console.log("DUP(skip)", destName, "==", prev.name);
      return;
    }
    seenHashes.set(h, { name: destName, area });
  }
  const destAbs = path.join(destDir, destName);
  cpSync(srcAbs, destAbs);
  assembled.push({
    filename: destName,
    folder: path.basename(destDir),
    type,
    tag,
    width: w,
    height: hh,
    note: note ?? "",
  });
}

const PUB = path.join(ROOT, "public");

// Part A: build UI (skip the currency-hold "!" ones).
const held = [];
for (const [industry, names] of Object.entries(BUILD_UI)) {
  for (const raw of names) {
    const hold = raw.endsWith("!");
    const name = hold ? raw.slice(0, -1) : raw;
    const src = path.join(PUB, "builds", industry, `${name}.png`);
    if (hold) {
      held.push([industry, name, src]);
      continue;
    }
    await copyAsset(
      src, UI, `ui_${industry.replace(/-/g, "")}_${name.replace(/-/g, "")}.png`,
      "ui", industry, "industry build demo"
    );
  }
}

// Part A: product portfolio heroes.
for (const [rel, destName, tag] of PRODUCT_HEROES) {
  await copyAsset(
    path.join(PUB, "images", rel), UI, destName,
    "ui", tag, "product portfolio hero (sub-brand, dedicated bank later)"
  );
}

// Part B: build photos.
for (const [sub, file, subject] of BUILD_PHOTO) {
  const ext = path.extname(file);
  await copyAsset(
    path.join(PUB, "builds", sub, file), GEN, `photo_${subject}${ext}`,
    "generated", sub.split("/")[0], "build studio render"
  );
}

// Part B: showcase + product generated imagery.
for (const slug of SHOWCASE_SLUGS) {
  const dir = path.join(PUB, "images", slug);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!/\.(webp|png|jpg|jpeg|avif)$/i.test(f)) continue;
    const base = path.basename(f, path.extname(f)).replace(/[^a-z0-9]+/gi, "");
    const ext = path.extname(f);
    await copyAsset(
      path.join(dir, f), GEN, `gen_${slug.replace(/-/g, "")}_${base}${ext}`,
      "generated", slug, "showcase / product imagery"
    );
  }
}

// Part B: ambient DD backgrounds.
const ambient = path.join(PUB, "images", "_ambient");
if (existsSync(ambient)) {
  for (const f of readdirSync(ambient)) {
    if (!/\.(webp|png|jpg)$/i.test(f)) continue;
    const base = path.basename(f, path.extname(f)).replace(/[^a-z0-9]+/gi, "");
    await copyAsset(
      path.join(ambient, f), GEN, `gen_ambient_${base}${path.extname(f)}`,
      "generated", "universal", "ambient background"
    );
  }
}

writeFileSync(
  path.join(BANK, "assembled-index.json"),
  JSON.stringify({ assembled, held }, null, 2)
);

console.log(`\nUI assets:        ${assembled.filter((a) => a.type === "ui").length}`);
console.log(`Generated assets: ${assembled.filter((a) => a.type === "generated").length}`);
console.log(`Currency-hold (review): ${held.length}`);
console.log(`Total assembled:  ${assembled.length}`);
