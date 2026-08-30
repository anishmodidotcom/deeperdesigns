// ARCHIVAL (v25.5): one-shot script from a shipped release. Kept for
// reference and for re-running that exact asset pass; not part of any
// build, deploy, or routine workflow. Safe to ignore during development.
/**
 * One-off: generate the v19.2 industry-page images (Real Estate Listing
 * Studio + Property Film poster, Jewellery Try-On, Restaurants Dish Studio)
 * using Gemini 2.5 Flash Image (the same Nano Banana path as
 * scripts/gen-studio-images.ts), writing optimized webp with stripped
 * metadata to public/builds/<slug>/...
 *
 * Run: GEMINI_API_KEY=... bun run scripts/gen-v192-images.ts
 *
 * Each scene is kept consistent within its build (same empty room across the
 * staged variants, same biryani across the dish shots, same neckline across
 * the try-on pair).
 */
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const API_BASE =
  process.env.GEMINI_API_BASE ?? "https://generativelanguage.googleapis.com";
const MODEL = process.env.NANO_BANANA_MODEL ?? "gemini-2.5-flash-image";
const API_KEY = process.env.GEMINI_API_KEY ?? process.env.NANO_BANANA_API_KEY ?? "";

const PUB = path.join(process.cwd(), "public", "builds");

type Entry = {
  out: string; // relative to public/builds, no extension
  aspect: string;
  w: number;
  h: number;
  prompt: string;
};

const ENTRIES: Entry[] = [
  // ----- REAL ESTATE · Listing Studio (same empty living room throughout) -----
  {
    out: "real-estate/studio/raw-room",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Amateur phone photo of an empty unfurnished apartment living room in India, bare walls, tube-light lighting, slightly crooked angle, dull, a stray cable on the floor, looks like a quick broker snapshot. No text or logos.",
  },
  {
    out: "real-estate/studio/staged-modern",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "The same empty apartment living room, now virtually furnished in a clean modern style, a low grey sofa, a wooden coffee table, warm directional daylight from the window, magazine-grade interior real estate photography, bright and inviting. Same room proportions, walls and window position. No text or logos.",
  },
  {
    out: "real-estate/studio/staged-classic",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "The same apartment living room virtually furnished in a warm classic Indian style, a teakwood sofa set, a patterned rug, soft lamps, elegant and lived-in, magazine-grade real estate photography. Same room proportions, walls and window position. No text or logos.",
  },
  {
    out: "real-estate/studio/staged-warm",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "The same apartment living room virtually furnished in a cosy warm minimal style, a beige fabric couch, indoor plants, soft evening light, inviting premium real estate photography. Same room proportions, walls and window position. No text or logos.",
  },
  // ----- REAL ESTATE · Property Film poster (vertical) -----
  {
    out: "real-estate/film-poster",
    aspect: "9:16",
    w: 720,
    h: 1280,
    prompt:
      "A cinematic interior frame of a bright, beautifully furnished modern apartment living room, warm daylight, shallow depth of field, premium real estate film still, vertical 9:16. No text or logos.",
  },
  // ----- JEWELLERY · Try-On (same neckline before and after) -----
  {
    out: "jewellery/tryon/tryon-before",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "A simple phone selfie of a woman's neckline and collarbone against a plain background, no jewellery, natural light, only neck and shoulders in frame, no face needed. No text or logos.",
  },
  {
    out: "jewellery/tryon/tryon-after",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "The same neckline and collarbone now wearing an elegant Indian gold necklace, intricate traditional design, warm gold tone, realistic placement, premium jewellery try-on result, only neck and shoulders in frame, no face needed. No text or logos.",
  },
  // ----- RESTAURANTS · Dish Studio (same chicken biryani throughout) -----
  {
    out: "restaurants/studio/dish-raw",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Amateur phone photo of a plate of chicken biryani on a plain restaurant table under flat tube-light, slightly greasy, dull colours, uneven framing, looks like a quick photo taken in a busy kitchen. No text or logos.",
  },
  {
    out: "restaurants/studio/dish-hero",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Menu-grade food photograph of the same chicken biryani in a copper handi, steam rising, garnished with fried onions and mint, warm directional light, rich appetising colours, shallow depth of field, premium restaurant menu photography. No text or logos.",
  },
  {
    out: "restaurants/studio/dish-topdown",
    aspect: "3:4",
    w: 900,
    h: 1200,
    prompt:
      "Top-down menu-grade photograph of the same chicken biryani in a copper handi with small side bowls of raita and salan, on a dark textured surface, styled, appetising, premium food photography. No text or logos.",
  },
  {
    out: "restaurants/studio/dish-reel",
    aspect: "9:16",
    w: 720,
    h: 1280,
    prompt:
      "A vertical close-up food-reel frame of the same chicken biryani, a spoon lifting a portion with steam, warm cinematic light, appetising, 9:16. No text or logos.",
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
      // Re-encode strips all source metadata; sharp does not copy EXIF unless
      // withMetadata() is called, so the webp ships clean.
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
