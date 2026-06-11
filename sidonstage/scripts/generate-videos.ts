/**
 * Veo 3.1 Fast image-to-video for the Sid on Stage hero loop.
 *
 * Pattern copied (not imported) from the DD showcase video generator
 * shipped at scripts/generate-videos.ts in the main repo. This file is
 * fully self contained and lives only inside /sidonstage/.
 *
 * Endpoint: POST /v1beta/models/<MODEL>:predictLongRunning
 * Polling:  GET  /v1beta/{operation_name}
 *
 * Image-to-video adds an `image` field to instances:
 *   instances: [{ prompt, image: { bytesBase64Encoded, mimeType } }]
 *
 * Reads scripts/video-manifest.json, runs one generation, downloads the
 * mp4, then extracts a poster frame. Veo plays the first frame for the
 * input image; the poster is built from that input frame (no ffmpeg
 * dependency).
 *
 * Run: bun run scripts/generate-videos.ts
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

type AspectRatio = "16:9" | "9:16";
type Duration = 4 | 6 | 8;

type ManifestEntry = {
  slug: string;
  filename: string;
  prompt: string;
  image?: string;
  aspectRatio?: AspectRatio;
  duration?: Duration;
};

type StartResponse = {
  name?: string;
  error?: { message?: string; code?: number; status?: string };
};

type PollSample = {
  video?: { uri?: string; encoding?: string } | string;
  uri?: string;
};

type PollResponse = {
  name?: string;
  done?: boolean;
  error?: { message?: string; code?: number; status?: string };
  response?: {
    generateVideoResponse?: {
      generatedSamples?: PollSample[];
      raiMediaFilteredCount?: number;
      raiMediaFilteredReasons?: string[];
    };
    generatedSamples?: PollSample[];
    videos?: Array<{ uri?: string }>;
    video?: { uri?: string };
  };
};

const API_BASE = process.env.GEMINI_API_BASE ?? "https://generativelanguage.googleapis.com";
const MODEL = process.env.VEO_MODEL ?? "veo-3.1-fast-generate-preview";
const API_KEY = process.env.GEMINI_API_KEY ?? "";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "scripts", "video-manifest.json");
const PUBLIC_VIDEOS = path.join(ROOT, "public", "videos");

const POLL_INTERVAL_MS = 12_000;
const POLL_TIMEOUT_MS = 12 * 60_000;

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

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function imageToBase64Jpeg(srcPath: string): Promise<{ b64: string; mimeType: string }> {
  const buf = await sharp(srcPath).jpeg({ quality: 92 }).toBuffer();
  return { b64: buf.toString("base64"), mimeType: "image/jpeg" };
}

async function startOperation(entry: ManifestEntry): Promise<string> {
  const url = `${API_BASE}/v1beta/models/${MODEL}:predictLongRunning`;
  const instance: Record<string, unknown> = { prompt: entry.prompt };
  if (entry.image) {
    const imgPath = path.isAbsolute(entry.image) ? entry.image : path.join(ROOT, entry.image);
    if (!existsSync(imgPath)) {
      throw new Error(`First-frame image missing: ${imgPath}`);
    }
    const { b64, mimeType } = await imageToBase64Jpeg(imgPath);
    instance.image = { bytesBase64Encoded: b64, mimeType };
  }
  const body = {
    instances: [instance],
    parameters: {
      aspectRatio: entry.aspectRatio ?? "16:9",
      durationSeconds: entry.duration ?? 8,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Start ${res.status} ${res.statusText}: ${text || "no body"}`);
  }

  const json = (await res.json()) as StartResponse;
  if (json.error) {
    throw new Error(
      `Start API error ${json.error.code ?? ""} ${json.error.status ?? ""}: ${json.error.message ?? ""}`.trim(),
    );
  }
  if (!json.name) {
    throw new Error(`No operation name returned: ${JSON.stringify(json).slice(0, 240)}`);
  }
  return json.name;
}

function extractVideoUri(json: PollResponse): string | undefined {
  const r = json.response;
  if (!r) return undefined;
  const sample = r.generateVideoResponse?.generatedSamples?.[0] ?? r.generatedSamples?.[0];
  if (sample) {
    if (typeof sample.video === "object" && sample.video?.uri) return sample.video.uri;
    if (typeof sample.video === "string") return sample.video;
    if (sample.uri) return sample.uri;
  }
  return r.videos?.[0]?.uri ?? r.video?.uri;
}

async function pollOperation(opName: string, tag: string): Promise<string> {
  const url = `${API_BASE}/v1beta/${opName}`;
  const start = Date.now();

  while (Date.now() - start < POLL_TIMEOUT_MS) {
    await sleep(POLL_INTERVAL_MS);

    let json: PollResponse;
    try {
      const res = await fetch(url, { headers: { "x-goog-api-key": API_KEY } });
      if (!res.ok) {
        const elapsed = Math.round((Date.now() - start) / 1000);
        console.log(`${tag} Poll ${res.status}, retrying (${elapsed}s)...`);
        continue;
      }
      json = (await res.json()) as PollResponse;
    } catch (e) {
      const elapsed = Math.round((Date.now() - start) / 1000);
      console.log(`${tag} Poll error (${elapsed}s): ${(e as Error).message}`);
      continue;
    }

    if (json.error) {
      throw new Error(
        `Op error ${json.error.code ?? ""} ${json.error.status ?? ""}: ${json.error.message ?? ""}`.trim(),
      );
    }

    const elapsed = Math.round((Date.now() - start) / 1000);

    if (json.done) {
      const filtered = json.response?.generateVideoResponse?.raiMediaFilteredCount ?? 0;
      const reasons = json.response?.generateVideoResponse?.raiMediaFilteredReasons ?? [];
      if (filtered > 0 && reasons.length > 0) {
        throw new Error(`Filtered: ${reasons.join("; ")}`);
      }
      const uri = extractVideoUri(json);
      if (!uri) {
        throw new Error(`Done but no URI. ${JSON.stringify(json).slice(0, 400)}`);
      }
      console.log(`${tag} Operation complete (${elapsed}s).`);
      return uri;
    }

    console.log(`${tag} Polling (${elapsed}s elapsed)...`);
  }

  throw new Error(`Timeout after ${Math.round(POLL_TIMEOUT_MS / 1000)}s`);
}

async function downloadVideo(uri: string, outPath: string) {
  const res = await fetch(uri, { headers: { "x-goog-api-key": API_KEY } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Download ${res.status} ${res.statusText}: ${text || "no body"}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outPath, buf);
}

async function makePosterFromFirstFrame(srcImagePath: string, outPath: string) {
  await sharp(srcImagePath)
    .resize(1920, 1080, { fit: "cover", position: "attention" })
    .webp({ quality: 88, effort: 5 })
    .toFile(outPath);
}

async function main() {
  if (!API_KEY) fail("GEMINI_API_KEY not set.");

  const manifest = loadManifest();
  console.log(`Manifest: ${manifest.length} entry. Model: ${MODEL}`);

  for (let i = 0; i < manifest.length; i++) {
    const entry = manifest[i];
    const tag = `[${i + 1}/${manifest.length}]`;
    const dir = path.join(PUBLIC_VIDEOS, entry.slug);
    const videoOut = path.join(dir, `${entry.filename}.mp4`);
    const posterOut = path.join(dir, `${entry.filename === "hero-loop" ? "hero-poster" : entry.filename + "-poster"}.webp`);

    if (existsSync(videoOut)) {
      console.log(`${tag} ${path.relative(ROOT, videoOut)} exists, skipping`);
      continue;
    }

    console.log(`${tag} Starting Veo gen for ${entry.slug}/${entry.filename}`);
    mkdirSync(dir, { recursive: true });
    const opName = await startOperation(entry);
    console.log(`${tag} Operation: ${opName}`);
    const uri = await pollOperation(opName, tag);
    await downloadVideo(uri, videoOut);
    console.log(`${tag} Saved ${path.relative(ROOT, videoOut)}`);

    if (entry.image && !existsSync(posterOut)) {
      try {
        const imgPath = path.isAbsolute(entry.image) ? entry.image : path.join(ROOT, entry.image);
        await makePosterFromFirstFrame(imgPath, posterOut);
        console.log(`${tag} Poster saved ${path.relative(ROOT, posterOut)}`);
      } catch (e) {
        console.warn(`${tag} Poster generation failed: ${(e as Error).message}`);
      }
    }
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
