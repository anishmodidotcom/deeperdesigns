/**
 * One-off (v19.6 cleanup): generate the Real Estate Property Film before/after
 * stills with Gemini 2.5 Flash Image (same Nano Banana path as the other
 * gen-v19x-images scripts), writing optimized webp with stripped metadata to
 * public/builds/real-estate/.
 *
 *   film-before.webp  raw empty-room walkthrough snapshot (the "before")
 *   film-after.webp   cinematic furnished still, the fal clip's poster
 *
 * Run: GEMINI_API_KEY=... bun run scripts/gen-v196-images.ts
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
    out: "real-estate/film-before",
    aspect: "9:16",
    w: 720,
    h: 1280,
    prompt:
      "Amateur phone photo of a modern apartment living room but empty and unstyled, bare floor, no furniture, flat tube-light, dull, a stray cable on the floor, looks like a quick broker walkthrough snapshot, vertical 9:16. No text or logos.",
  },
  {
    out: "real-estate/film-after",
    aspect: "9:16",
    w: 720,
    h: 1280,
    prompt:
      "Cinematic interior still of a bright, beautifully furnished modern apartment living room in warm afternoon light, a low sofa and a wooden coffee table, large windows with sheer curtains and a city view beyond, soft sunlight pooling on the floor, gentle reflections, shallow depth of field, premium real-estate film aesthetic, vertical 9:16. No text or logos.",
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
