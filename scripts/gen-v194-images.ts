/**
 * One-off: generate the v19.4 Gemini posters for the two video builds
 * (Automotive Walkaround, Hotels Property Film) using Gemini 2.5 Flash Image
 * (the same Nano Banana path as scripts/gen-v192-images.ts), writing optimized
 * webp with stripped metadata to public/builds/<slug>/...
 *
 * Run: GEMINI_API_KEY=... bun run scripts/gen-v194-images.ts
 *
 * Manufacturing is dashboards-only and needs no generated images. The video
 * builds use VideoFrame (poster + fal clip), so only the poster frames are
 * generated here, consistent with the Real Estate Property Film in v19.2.
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
    out: "automotive/walkaround-poster",
    aspect: "9:16",
    w: 720,
    h: 1280,
    prompt:
      "Premium showroom photograph of a clean white compact SUV in a clean studio-lit space, glossy reflective floor, soft gradient backdrop, dramatic automotive lighting catching the body lines, no number plate, premium car-dealer hero shot, vertical 9:16. No text or logos.",
  },
  {
    out: "hotels/property-poster",
    aspect: "16:9",
    w: 1280,
    h: 720,
    prompt:
      "Cinematic interior photograph of a warm, beautifully styled boutique hotel room, soft golden morning light through sheer curtains, a made bed with linen textures, a plant and warm wood, inviting premium hospitality aesthetic, 16:9. No text or logos.",
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
