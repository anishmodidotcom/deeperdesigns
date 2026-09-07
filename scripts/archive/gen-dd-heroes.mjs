// v24 Part C: generate 10 new DD hero/texture assets via the locked Gemini
// pipeline (same call shape as scripts/generate-images.ts). DD palette only:
// indigo #7C6CFF, amber #F5B544, near-black #0A0A0B. No text, no faces, no
// teal. Output PNG at exact dimensions into the DD bank generated-images/.
//
// Run: GEMINI_API_KEY=... bun run scripts/gen-dd-heroes.mjs
// The key is read from the environment only and is never written to disk.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path, { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const API_BASE =
  process.env.GEMINI_API_BASE ?? "https://generativelanguage.googleapis.com";
const MODEL = process.env.NANO_BANANA_MODEL ?? "gemini-2.5-flash-image";
const API_KEY = process.env.GEMINI_API_KEY ?? process.env.NANO_BANANA_API_KEY ?? "";

// v25.5: was an absolute path from the sandbox this was first run in, so
// the script only worked on that one machine. Resolved from the repo root
// instead, with an override for anyone who wants the output elsewhere.
const REPO_ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT =
  process.env.DD_ASSET_OUT ??
  join(REPO_ROOT, "marketing/design-assets/dd/generated-images");
mkdirSync(OUT, { recursive: true });

const PALETTE =
  "Colour palette strictly limited to: near-black #0A0A0B base, deep indigo " +
  "#7C6CFF as the primary accent, warm amber-gold #F5B544 as the secondary " +
  "accent, and off-white #F5F3EF for the faintest highlights. Absolutely no " +
  "teal, no green, no cyan. Dark, premium, restrained, operator-grade. " +
  "No text, no letters, no numbers, no logos, no watermarks, no human faces, " +
  "no people. Photographic depth, tasteful film grain, high detail.";

// [name, prompt, width, height]
const ASSETS = [
  ["gen_bg_indigo_bloom", "A deep near-black field with a slow indigo-to-black gradient bloom emanating from one corner, subtle film grain, faint drifting particle dust suspended in the dark. A calm universal background with generous empty space.", 1080, 1350],
  ["gen_network_nodes", "Abstract intelligence infrastructure: a dark scene of softly glowing connected nodes and thin light-traces forming an elegant network, indigo and amber accents on the nodes and traces, strong depth of field with foreground nodes sharp and background dissolving into darkness, premium and restrained, not a sci-fi cliche.", 1080, 1350],
  ["gen_amber_orb", "A single warm amber glow orb diffused softly behind darkness, minimal and clean, most of the frame is deep near-black negative space so text could float over it later, gentle bloom and haze around the orb.", 1080, 1350],
  ["gen_dark_topography", "Organic flowing dark topography of smooth ridges and valleys, soft indigo rim light catching the crests, deep shadow in the troughs, calm and expensive, minimal and abstract like a dark relief map at dusk.", 1080, 1350],
  ["gen_grid_dissolve", "A precise geometric grid on a dark base dissolving into fine particles at one edge, indigo glow along the surviving grid lines, a sense of order becoming motion, clean and minimal with deep negative space.", 1080, 1350],
  ["gen_texture_metal", "Close macro of dark brushed metal transitioning to matte stone, a faint indigo sheen skating across the fine brushed grain, tactile and physical, an expensive premium surface texture under raking low light.", 1080, 1350],
  ["gen_founder_desk", "A calm dark desk-adjacent scene shot with a very shallow depth of field so everything is softly out of focus, warm amber practical light pooling on one side, hints of a notebook and a matte surface, absolutely no people and no faces, a quiet founder-at-work mood late in the evening.", 1080, 1350],
  ["gen_split_field", "A clean two-tone split field divided by a single crisp vertical line down the centre, the left half deep near-black, the right half faintly lit with a soft indigo glow, minimal and balanced, built for a manual-versus-AI comparison layout.", 1080, 1350],
  ["gen_growth_line", "A single rising light-line motif abstracted into fine art, sweeping upward from lower left to upper right across a dark base, the line graduating from warm amber into deep indigo with a soft glow and trailing particles, growth expressed without any literal chart or axis.", 1080, 1350],
  ["gen_gradient_mesh", "A soft dark gradient mesh blending deep indigo, warm amber and near-black at low opacity, smooth and cloudlike with a clean calm centre reserved as negative space for type, premium and minimal.", 1080, 1350],
  // Required tall export of the gradient mesh.
  ["gen_gradient_mesh_tall", "A soft dark gradient mesh blending deep indigo, warm amber and near-black at low opacity, smooth and cloudlike with a clean calm centre reserved as negative space for type, premium and minimal, tall vertical composition.", 1080, 1920],
];

function aspectFor(w, h) {
  const r = w / h;
  if (r > 1.7) return "16:9";
  if (r > 1.25) return "4:3";
  if (r > 0.9) return "1:1";
  if (r > 0.6) return "3:4";
  return "9:16";
}

// The API POST goes through curl, which honours the sandbox HTTPS_PROXY and
// the CA bundle (bun's fetch does not route through the proxy here). Body and
// response are passed via temp files to avoid huge argv/stdout buffers.
function curlPost(url, bodyObj) {
  // v25.5: the counter used to be incremented inside the template literal,
  // which hid a side effect in what reads as a plain string.
  curlPost._n = (curlPost._n ?? 0) + 1;
  const stamp = `${process.pid}-${curlPost._n}`;
  const bodyFile = path.join(tmpdir(), `ddgen-body-${stamp}.json`);
  const respFile = path.join(tmpdir(), `ddgen-resp-${stamp}.json`);
  writeFileSync(bodyFile, JSON.stringify(bodyObj));
  try {
    const code = execFileSync("curl", [
      "-sS", "--max-time", "180", "-X", "POST", url,
      "-H", "Content-Type: application/json",
      "-H", `x-goog-api-key: ${API_KEY}`,
      "-d", `@${bodyFile}`,
      "-o", respFile,
      "-w", "%{http_code}",
    ], { encoding: "utf8" });
    const json = JSON.parse(readFileSync(respFile, "utf8"));
    return { status: Number(code), json };
  } finally {
    rmSync(bodyFile, { force: true });
    rmSync(respFile, { force: true });
  }
}

async function generate(prompt, w, h) {
  const url = `${API_BASE}/v1beta/models/${MODEL}:generateContent`;
  const full = `${prompt}\n\n${PALETTE}`;
  const body = {
    contents: [{ role: "user", parts: [{ text: full }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: aspectFor(w, h) },
    },
  };
  let { status, json } = curlPost(url, body);
  if (status >= 400 && /imageConfig|aspectRatio|responseModalities/i.test(JSON.stringify(json))) {
    ({ status, json } = curlPost(url, {
      contents: body.contents,
      generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
    }));
  }
  if (json.error) throw new Error(`API ${status} error: ${json.error.message ?? ""}`);
  if (json.promptFeedback?.blockReason) throw new Error(`blocked: ${json.promptFeedback.blockReason}`);
  const parts = json.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) {
    const data = p.inlineData?.data ?? p.inline_data?.data;
    if (data) return Buffer.from(data, "base64");
  }
  throw new Error(`no image (status=${status} finish=${json.candidates?.[0]?.finishReason ?? "?"})`);
}

const only = process.argv[2]; // optional: generate just one named asset (smoke)
if (!API_KEY) { console.error("GEMINI_API_KEY not set"); process.exit(1); }

let ok = 0;
const failed = [];
for (const [name, prompt, w, h] of ASSETS) {
  if (only && name !== only) continue;
  const out = path.join(OUT, `${name}.png`);
  if (existsSync(out)) { console.log(`skip ${name} (exists)`); ok++; continue; }
  try {
    console.log(`generating ${name} (${w}x${h})...`);
    const img = await generate(prompt, w, h);
    await sharp(img).resize(w, h, { fit: "cover", position: "attention" }).png().toFile(out);
    const m = await sharp(out).metadata();
    console.log(`  saved ${name}.png ${m.width}x${m.height}`);
    ok++;
  } catch (e) {
    console.error(`  FAILED ${name}: ${e.message}`);
    failed.push(name);
  }
}
console.log(`\nGenerated/present: ${ok}  Failed: ${failed.length}${failed.length ? " -> " + failed.join(", ") : ""}`);
if (failed.length) process.exit(1);
