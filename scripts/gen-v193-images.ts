// ARCHIVAL (v25.5): one-shot script from a shipped release. Kept for
// reference and for re-running that exact asset pass; not part of any
// build, deploy, or routine workflow. Safe to ignore during development.
/**
 * One-off: generate the v19.3 Fashion images (Runway flat + on-model poster,
 * Catalogue Studio inputs/outputs, Try-On result) using Gemini 2.5 Flash
 * Image (the same Nano Banana path as scripts/gen-v192-images.ts), writing
 * optimized webp with stripped metadata to public/builds/fashion/...
 *
 * Run: GEMINI_API_KEY=... bun run scripts/gen-v193-images.ts
 *
 * Coaching and Clinics demos are pure coded UI and need no generated images.
 * Garments are kept consistent: an olive-green linen co-ord set is the hero
 * piece across Runway, Catalogue Studio and Try-On.
 */
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const API_BASE =
  process.env.GEMINI_API_BASE ?? "https://generativelanguage.googleapis.com";
const MODEL = process.env.NANO_BANANA_MODEL ?? "gemini-2.5-flash-image";
const API_KEY = process.env.GEMINI_API_KEY ?? process.env.NANO_BANANA_API_KEY ?? "";

const PUB = path.join(process.cwd(), "public", "builds");

type Entry = { out: string; aspect: string; w: number; h: number; prompt: string };

const ENTRIES: Entry[] = [
  {
    out: "fashion/runway-flat",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Flat lay product photo of an olive-green linen co-ord set, a short top and wide-leg trousers, neatly arranged on a plain neutral light background, simple clean ecommerce product shot, soft even lighting, no model, no people. No text or logos.",
  },
  {
    out: "fashion/runway-poster",
    aspect: "9:16",
    w: 720,
    h: 1280,
    prompt:
      "Editorial on-model fashion photograph of a woman wearing an olive-green linen co-ord set, short top and wide-leg trousers, full body, standing in a softly lit minimal studio with a warm neutral backdrop, natural confident pose, premium fashion-brand campaign look, realistic, elegant, vertical 9:16. No text or logos.",
  },
  {
    out: "fashion/studio/flat-dress",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Flat lay product photo of an ivory satin slip dress neatly arranged on a plain neutral light background, simple clean ecommerce product shot, soft even lighting, no model, no people. No text or logos.",
  },
  {
    out: "fashion/studio/onmodel-lifestyle",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Lifestyle on-model fashion photograph of a woman wearing the same olive-green linen co-ord set, short top and wide-leg trousers, walking in soft natural daylight near a warm neutral wall, relaxed candid editorial mood, premium fashion brand aesthetic, realistic, full body, vertical. No text or logos.",
  },
  {
    out: "fashion/studio/onmodel-dress",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Editorial on-model fashion photograph of a woman wearing an ivory satin slip dress, full body, standing in a softly lit minimal studio with a warm neutral backdrop, natural elegant pose, premium fashion-brand campaign look, realistic, vertical. No text or logos.",
  },
  {
    out: "fashion/try-on/tryon-result",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "On-model image of a person wearing the same olive-green linen co-ord set, short top and wide-leg trousers, full body, neutral studio background, natural pose, realistic fit and drape, premium fashion try-on result, vertical. No text or logos.",
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
    generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: entry.aspect } },
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
  let ok = 0;
  const failed: string[] = [];
  for (const e of ENTRIES) {
    const out = path.join(PUB, `${e.out}.webp`);
    mkdirSync(path.dirname(out), { recursive: true });
    if (existsSync(out)) {
      console.log(`skip ${e.out}.webp (exists)`);
      ok++;
      continue;
    }
    try {
      console.log(`generating ${e.out}.webp...`);
      const img = await generate(e);
      await sharp(img).resize(e.w, e.h, { fit: "cover", position: "attention" }).webp({ quality: 90, effort: 5 }).toFile(out);
      console.log(`saved ${path.relative(process.cwd(), out)}`);
      ok++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`FAILED ${e.out}: ${msg}`);
      failed.push(`${e.out}: ${msg}`);
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
