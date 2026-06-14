/**
 * One-off: generate the four Studio Engine product images for the D2C
 * /for page using Gemini 2.5 Flash Image (the same Nano Banana path as
 * scripts/generate-images.ts), writing webp to public/builds/d2c/studio/.
 *
 * Run: GEMINI_API_KEY=... bun run scripts/gen-studio-images.ts
 *
 * The product is kept identical across all four: an amber glass skincare
 * serum bottle with a matte black dropper cap, plain and unbranded.
 */
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const API_BASE =
  process.env.GEMINI_API_BASE ?? "https://generativelanguage.googleapis.com";
const MODEL = process.env.NANO_BANANA_MODEL ?? "gemini-2.5-flash-image";
const API_KEY = process.env.GEMINI_API_KEY ?? process.env.NANO_BANANA_API_KEY ?? "";

const OUT_DIR = path.join(process.cwd(), "public", "builds", "d2c", "studio");

type Entry = { filename: string; prompt: string; aspect: string; w: number; h: number };

const ENTRIES: Entry[] = [
  {
    filename: "raw-input",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Casual phone snapshot of an amber glass skincare serum bottle with a matte black dropper cap, sitting on a cluttered wooden home table with a few random objects, flat dull indoor lighting, slightly soft focus, faint dust, no styling, looks like a quick photo taken by a small brand owner. Unbranded bottle. No text or logos.",
  },
  {
    filename: "out-studio",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Premium studio product photograph of an amber glass skincare serum bottle with a matte black dropper cap, on a seamless warm-beige backdrop, soft directional studio light from upper left, crisp clean reflection beneath, editorial skincare campaign look, centered, minimal, high detail. Unbranded bottle. No text or logos.",
  },
  {
    filename: "out-lifestyle",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "An amber glass skincare serum bottle with a matte black dropper cap on a marble bathroom ledge in soft morning light, a sprig of eucalyptus beside it, gentle shadows, calm premium skincare aesthetic, high detail. Unbranded bottle. No text or logos.",
  },
  {
    filename: "out-inhand",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "An amber glass skincare serum bottle with a matte black dropper cap held in a person's hand against a soft neutral background, natural skin, premium skincare editorial, only the hand visible and no face. Unbranded bottle. No text or logos.",
  },
];

type GeminiPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } }
  | { inline_data: { mime_type: string; data: string } };
type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: GeminiPart[] }; finishReason?: string }>;
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; status?: string; code?: number };
};

function extractImage(json: GeminiResponse): Buffer {
  if (json.error) throw new Error(`API error ${json.error.code ?? ""}: ${json.error.message ?? ""}`);
  if (json.promptFeedback?.blockReason) throw new Error(`Prompt blocked: ${json.promptFeedback.blockReason}`);
  const parts = json.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if ("inlineData" in part && part.inlineData?.data) return Buffer.from(part.inlineData.data, "base64");
    if ("inline_data" in part && part.inline_data?.data) return Buffer.from(part.inline_data.data, "base64");
  }
  throw new Error(`No image data (finishReason=${json.candidates?.[0]?.finishReason ?? "unknown"})`);
}

async function generate(entry: Entry): Promise<Buffer> {
  const url = `${API_BASE}/v1beta/models/${MODEL}:generateContent`;
  const body = {
    contents: [{ role: "user", parts: [{ text: entry.prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: entry.aspect },
    },
  };
  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if ((res.status === 400 || res.status === 404) && /imageConfig|aspectRatio|responseModalities/i.test(text)) {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
        body: JSON.stringify({ contents: body.contents, generationConfig: { responseModalities: ["IMAGE", "TEXT"] } }),
      });
      if (!res.ok) throw new Error(`API ${res.status} (fallback): ${await res.text().catch(() => "")}`);
    } else {
      throw new Error(`API ${res.status} ${res.statusText}: ${text || "no body"}`);
    }
  }
  return extractImage((await res.json()) as GeminiResponse);
}

async function main() {
  if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY not set.");
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  let ok = 0;
  const failed: string[] = [];
  for (const e of ENTRIES) {
    const out = path.join(OUT_DIR, `${e.filename}.webp`);
    if (existsSync(out)) {
      console.log(`skip ${e.filename}.webp (exists)`);
      ok++;
      continue;
    }
    try {
      console.log(`generating ${e.filename}.webp...`);
      const img = await generate(e);
      await sharp(img).resize(e.w, e.h, { fit: "cover", position: "attention" }).webp({ quality: 90, effort: 5 }).toFile(out);
      console.log(`saved ${path.relative(process.cwd(), out)}`);
      ok++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`FAILED ${e.filename}: ${msg}`);
      failed.push(`${e.filename}: ${msg}`);
    }
  }
  console.log(`\nDone. ok=${ok} failed=${failed.length}`);
  if (failed.length) {
    failed.forEach((f) => console.log("  " + f));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
