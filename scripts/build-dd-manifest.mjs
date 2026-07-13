// v24: build marketing/design-assets/dd/manifest.json by scanning the actual
// bank folders (ground truth), enriched with tags/notes from the assembly
// index and the Part C asset table. Every asset:
//   { filename, type (ui|generated|texture), tag, dimensions, best_use }
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const BANK = "/home/user/deeperdesigns/marketing/design-assets/dd";
const UI = path.join(BANK, "ui-screenshots");
const GEN = path.join(BANK, "generated-images");

// Tags/notes for surviving Part A/B assets, keyed by filename.
const idx = existsSync(path.join(BANK, "assembled-index.json"))
  ? JSON.parse(readFileSync(path.join(BANK, "assembled-index.json"), "utf8"))
  : { assembled: [] };
const idxByName = new Map(idx.assembled.map((a) => [a.filename, a]));

// Part C new assets (type: texture), with tag + best_use.
const PART_C = {
  "gen_bg_indigo_bloom.png": ["universal", "universal dark background, text overlay"],
  "gen_network_nodes.png": ["universal", "intelligence and infrastructure hero background"],
  "gen_amber_orb.png": ["universal", "minimal hero, text floats over the dark space"],
  "gen_dark_topography.png": ["universal", "calm premium section background"],
  "gen_grid_dissolve.png": ["universal", "order-becoming-motion hero background"],
  "gen_texture_metal.png": ["universal", "premium surface texture, card or panel fill"],
  "gen_founder_desk.png": ["universal", "founder-at-work mood, warm story section"],
  "gen_split_field.png": ["comparison", "manual versus AI comparison background"],
  "gen_growth_line.png": ["growth", "growth motif for a results or outcomes section"],
  "gen_gradient_mesh.png": ["universal", "soft hero background with centre space for type"],
  "gen_gradient_mesh_tall.png": ["universal", "story and reel background, centre type space, 9:16"],
};

const TAG_FIX = { cafirms: "ca-firms", realestate: "real-estate" };

function uiTag(name) {
  const m = name.match(/^ui_([a-z0-9]+)_/i);
  if (!m) return "universal";
  return TAG_FIX[m[1]] ?? m[1];
}

async function dims(file) {
  const m = await sharp(file).metadata();
  return `${m.width}x${m.height}`;
}

const manifest = [];

for (const f of readdirSync(UI).filter((x) => x.endsWith(".png")).sort()) {
  const rec = idxByName.get(f);
  const isCrop = f.endsWith("_crop.png");
  manifest.push({
    filename: `ui-screenshots/${f}`,
    type: "ui",
    tag: rec?.tag ?? uiTag(f),
    dimensions: await dims(path.join(UI, f)),
    best_use: isCrop
      ? "accent crop, single striking UI element"
      : "portfolio UI reference, dark operator dashboard",
  });
}

for (const f of readdirSync(GEN).filter((x) => /\.(png|webp|jpg|jpeg)$/i.test(x)).sort()) {
  const partC = PART_C[f];
  const rec = idxByName.get(f);
  manifest.push({
    filename: `generated-images/${f}`,
    type: partC ? "texture" : "generated",
    tag: partC ? partC[0] : rec?.tag ?? "universal",
    dimensions: await dims(path.join(GEN, f)),
    best_use: partC
      ? partC[1]
      : (rec?.note ?? "generated imagery").replace(/^showcase \/ product imagery$/, "showcase or product imagery"),
  });
}

writeFileSync(path.join(BANK, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

const by = (t) => manifest.filter((m) => m.type === t).length;
console.log(`manifest.json written: ${manifest.length} assets`);
console.log(`  ui:        ${by("ui")}`);
console.log(`  generated: ${by("generated")}`);
console.log(`  texture:   ${by("texture")}`);
