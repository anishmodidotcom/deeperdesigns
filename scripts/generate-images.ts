/**
 * Nano Banana (Google Gemini 2.5 Flash Image) image generator.
 *
 * Reads scripts/image-manifest.json, generates any image whose output
 * file does not already exist, and writes results to
 * public/images/<slug>/<filename>.webp.
 *
 * Run with: bun run gen-images
 */

import { existsSync, mkdirSync, readFileSync } from "node:fs";
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
  | {
      inlineData: { mimeType: string; data: string };
    }
  | {
      inline_data: { mime_type: string; data: string };
    };

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; status?: string; code?: number };
};

const API_BASE =
  process.env.GEMINI_API_BASE ??
  process.env.NANO_BANANA_API_BASE ??
  "https://generativelanguage.googleapis.com";
const MODEL = process.env.NANO_BANANA_MODEL ?? "gemini-2.5-flash-image";
const API_KEY =
  process.env.GEMINI_API_KEY ?? process.env.NANO_BANANA_API_KEY ?? "";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "scripts", "image-manifest.json");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

function fail(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function loadManifest(): ManifestEntry[] {
  if (!existsSync(MANIFEST_PATH)) {
    fail(`Manifest not found at ${MANIFEST_PATH}`);
  }
  let raw: string;
  try {
    raw = readFileSync(MANIFEST_PATH, "utf8");
  } catch (e) {
    fail(`Could not read manifest: ${(e as Error).message}`);
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
      fail("Manifest must be a JSON array.");
    }
    return data as ManifestEntry[];
  } catch (e) {
    fail(`Manifest is not valid JSON: ${(e as Error).message}`);
  }
}

function aspectFromSize(w?: number, h?: number): string {
  if (!w || !h) return "1:1";
  const r = w / h;
  if (r > 1.7) return "16:9";
  if (r > 1.4) return "3:2";
  if (r > 1.25) return "4:3";
  if (r > 0.9) return "1:1";
  if (r > 0.7) return "3:4";
  return "9:16";
}

function extractImage(json: GeminiResponse): Buffer {
  if (json.error) {
    throw new Error(
      `API error ${json.error.code ?? ""} ${json.error.status ?? ""}: ${
        json.error.message ?? ""
      }`.trim()
    );
  }
  if (json.promptFeedback?.blockReason) {
    throw new Error(
      `Prompt blocked: ${json.promptFeedback.blockReason}`
    );
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
  throw new Error(
    `No image data in response (finishReason=${finish}). ` +
      `First candidate parts: ${JSON.stringify(parts).slice(0, 240)}`
  );
}

async function generate(entry: ManifestEntry): Promise<Buffer> {
  const url = `${API_BASE}/v1beta/models/${MODEL}:generateContent`;
  const aspect = entry.aspectRatio ?? aspectFromSize(entry.width, entry.height);

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: entry.prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: aspect },
    },
  };

  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY,
    },
    body: JSON.stringify(body),
  });

  // If the API rejects imageConfig (older variants), retry without it.
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
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        body: JSON.stringify(fallback),
      });
      if (!res.ok) {
        const text2 = await res.text().catch(() => "");
        throw new Error(
          `API ${res.status} ${res.statusText} (fallback): ${text2 || "no body"}`
        );
      }
    } else {
      throw new Error(
        `API ${res.status} ${res.statusText}: ${text || "no body"}`
      );
    }
  }

  const json = (await res.json()) as GeminiResponse;
  return extractImage(json);
}

async function convertAndSave(
  source: Buffer,
  outPath: string,
  entry: ManifestEntry
) {
  let pipeline = sharp(source);
  if (entry.width || entry.height) {
    pipeline = pipeline.resize(entry.width, entry.height, {
      fit: "cover",
      position: "attention",
      withoutEnlargement: false,
    });
  }
  await pipeline.webp({ quality: 88, effort: 5 }).toFile(outPath);
}

async function main() {
  if (!API_KEY) {
    fail(
      "GEMINI_API_KEY (or legacy NANO_BANANA_API_KEY) is not set. Add it to .env.local before running."
    );
  }

  const manifest = loadManifest();
  const total = manifest.length;
  if (total === 0) {
    console.log(
      "Manifest is empty. Add entries to scripts/image-manifest.json and rerun."
    );
    return;
  }

  console.log(`Found ${total} manifest ${total === 1 ? "entry" : "entries"}.`);
  console.log(`Model: ${MODEL}`);

  let generated = 0;
  let skipped = 0;
  const failed: { entry: ManifestEntry; error: string }[] = [];

  for (let i = 0; i < total; i++) {
    const entry = manifest[i];
    const tag = `[${i + 1}/${total}]`;

    if (!entry.slug || !entry.filename || !entry.prompt) {
      const msg = "Entry missing required field (slug, filename, or prompt)";
      console.error(`${tag} Skipping invalid entry: ${msg}`);
      failed.push({ entry, error: msg });
      continue;
    }

    const dir = path.join(PUBLIC_IMAGES, entry.slug);
    const out = path.join(dir, `${entry.filename}.webp`);

    if (existsSync(out)) {
      console.log(
        `${tag} Skipping ${entry.slug}/${entry.filename}.webp (already exists)`
      );
      skipped++;
      continue;
    }

    console.log(`${tag} Generating ${entry.slug}/${entry.filename}.webp...`);
    try {
      mkdirSync(dir, { recursive: true });
      const image = await generate(entry);
      await convertAndSave(image, out, entry);
      generated++;
      console.log(`${tag} Saved ${path.relative(ROOT, out)}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`${tag} Failed: ${msg}`);
      failed.push({ entry, error: msg });
    }
  }

  console.log("");
  console.log("Summary");
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped:   ${skipped}`);
  console.log(`  Failed:    ${failed.length}`);
  if (failed.length) {
    console.log("");
    console.log("Failures:");
    for (const f of failed) {
      console.log(`  ${f.entry.slug}/${f.entry.filename}: ${f.error}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
