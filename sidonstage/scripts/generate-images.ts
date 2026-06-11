/**
 * Sid on Stage atmospheric still generator.
 * Mirrors the proven DD Nano Banana pipeline. Reads image-manifest.json,
 * generates any image whose output file does not already exist, and
 * writes WebP to public/assets/atmos/.
 *
 * Run: bun run scripts/generate-images.ts
 * Requires GEMINI_API_KEY in sidonstage/.env.local (or process env).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

type ManifestEntry = {
  slug: string;
  filename: string;
  prompt: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
};

type GeminiPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } }
  | { inline_data: { mime_type: string; data: string } };

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; status?: string; code?: number };
};

const API_BASE =
  process.env.GEMINI_API_BASE ?? "https://generativelanguage.googleapis.com";
const MODEL = process.env.NANO_BANANA_MODEL ?? "gemini-2.5-flash-image";
const API_KEY = process.env.GEMINI_API_KEY ?? "";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "scripts", "image-manifest.json");
const OUT_DIR = path.join(ROOT, "public", "assets", "atmos");
const COST_LOG = path.join(ROOT, "scripts", "cost-log.json");

const COST_PER_IMAGE_USD = 0.039;

function fail(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function loadManifest(): ManifestEntry[] {
  if (!existsSync(MANIFEST_PATH)) fail(`Manifest missing: ${MANIFEST_PATH}`);
  const raw = readFileSync(MANIFEST_PATH, "utf8");
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) fail("Manifest must be a JSON array.");
  return data as ManifestEntry[];
}

function loadCostLog(): { total_usd: number; events: Array<{ ts: string; image: string; usd: number }> } {
  if (!existsSync(COST_LOG)) return { total_usd: 0, events: [] };
  try {
    return JSON.parse(readFileSync(COST_LOG, "utf8"));
  } catch {
    return { total_usd: 0, events: [] };
  }
}

function recordCost(filename: string) {
  const log = loadCostLog();
  log.events.push({ ts: new Date().toISOString(), image: filename, usd: COST_PER_IMAGE_USD });
  log.total_usd = Number((log.total_usd + COST_PER_IMAGE_USD).toFixed(4));
  writeFileSync(COST_LOG, JSON.stringify(log, null, 2));
  return log.total_usd;
}

function extractImage(json: GeminiResponse): Buffer {
  if (json.error) {
    throw new Error(
      `API error ${json.error.code ?? ""} ${json.error.status ?? ""}: ${json.error.message ?? ""}`.trim(),
    );
  }
  if (json.promptFeedback?.blockReason) {
    throw new Error(`Prompt blocked: ${json.promptFeedback.blockReason}`);
  }
  const parts = json.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if ("inlineData" in part && part.inlineData?.data) {
      return Buffer.from(part.inlineData.data, "base64");
    }
    if ("inline_data" in part && part.inline_data?.data) {
      return Buffer.from(part.inline_data.data, "base64");
    }
  }
  const finish = json.candidates?.[0]?.finishReason ?? "unknown";
  throw new Error(`No image in response (finishReason=${finish}).`);
}

async function generate(entry: ManifestEntry): Promise<Buffer> {
  const url = `${API_BASE}/v1beta/models/${MODEL}:generateContent`;
  const body = {
    contents: [{ role: "user", parts: [{ text: entry.prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: entry.aspectRatio ?? "1:1" },
    },
  };

  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (
      (res.status === 400 || res.status === 404) &&
      /imageConfig|aspectRatio|responseModalities/i.test(text)
    ) {
      const fallback = {
        contents: body.contents,
        generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
      };
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
        body: JSON.stringify(fallback),
      });
      if (!res.ok) {
        const text2 = await res.text().catch(() => "");
        throw new Error(`API ${res.status} ${res.statusText} (fallback): ${text2 || "no body"}`);
      }
    } else {
      throw new Error(`API ${res.status} ${res.statusText}: ${text || "no body"}`);
    }
  }

  const json = (await res.json()) as GeminiResponse;
  return extractImage(json);
}

async function convertAndSave(source: Buffer, outPath: string, entry: ManifestEntry) {
  let p = sharp(source);
  if (entry.width || entry.height) {
    p = p.resize(entry.width, entry.height, { fit: "cover", position: "attention" });
  }
  await p.webp({ quality: 88, effort: 5 }).toFile(outPath);
}

async function main() {
  if (!API_KEY) {
    fail("GEMINI_API_KEY not set. Add it to sidonstage/.env.local or pass inline.");
  }
  mkdirSync(OUT_DIR, { recursive: true });

  const manifest = loadManifest();
  console.log(`Manifest: ${manifest.length} entries. Model: ${MODEL}`);

  let generated = 0;
  let skipped = 0;
  const failed: Array<{ entry: ManifestEntry; error: string }> = [];

  for (let i = 0; i < manifest.length; i++) {
    const entry = manifest[i];
    const tag = `[${i + 1}/${manifest.length}]`;
    const out = path.join(OUT_DIR, `${entry.filename}.webp`);
    if (existsSync(out)) {
      console.log(`${tag} ${entry.filename}.webp exists, skipping`);
      skipped++;
      continue;
    }
    console.log(`${tag} generating ${entry.filename}.webp ...`);
    try {
      const raw = await generate(entry);
      await convertAndSave(raw, out, entry);
      const total = recordCost(entry.filename);
      generated++;
      console.log(`${tag} saved ${path.relative(ROOT, out)} (cost so far: $${total.toFixed(3)})`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`${tag} FAILED ${entry.filename}: ${msg}`);
      failed.push({ entry, error: msg });
    }
  }

  console.log(`\nGenerated: ${generated}  Skipped: ${skipped}  Failed: ${failed.length}`);
  if (failed.length) {
    for (const f of failed) console.log(`  FAIL ${f.entry.filename}: ${f.error}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
