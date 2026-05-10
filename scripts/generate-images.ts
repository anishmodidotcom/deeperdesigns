/**
 * Nano Banana image generator.
 *
 * Reads scripts/image-manifest.json, generates any image whose output
 * file does not already exist, and writes results to public/images/<slug>/<filename>.webp.
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

type CreateTaskResponse = {
  code?: number;
  msg?: string;
  data?: {
    taskId?: string;
  };
};

type PollResponse = {
  code?: number;
  msg?: string;
  data?: {
    state?: string;
    failMsg?: string;
    response?: {
      resultUrls?: string[];
    };
    successFlag?: number;
  };
};

const API_BASE =
  process.env.NANO_BANANA_API_BASE ?? "https://api.nanobananaapi.ai";
const GENERATE_PATH =
  process.env.NANO_BANANA_GENERATE_PATH ?? "/api/v1/nanobanana/generate";
const STATUS_PATH =
  process.env.NANO_BANANA_STATUS_PATH ??
  "/api/v1/nanobanana/record-info";
const API_KEY = process.env.NANO_BANANA_API_KEY ?? "";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "scripts", "image-manifest.json");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

const POLL_INTERVAL_MS = 3_000;
const POLL_TIMEOUT_MS = 5 * 60_000;

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

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function authHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function createTask(entry: ManifestEntry): Promise<string> {
  const url = `${API_BASE}${GENERATE_PATH}`;
  const body = {
    prompt: entry.prompt,
    type: "textToImage",
    aspectRatio: entry.aspectRatio ?? aspectFromSize(entry.width, entry.height),
  };
  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Create task ${res.status}: ${text || res.statusText}`);
  }
  const json = (await res.json()) as CreateTaskResponse;
  const taskId = json.data?.taskId;
  if (!taskId) {
    throw new Error(
      `No taskId in response: ${JSON.stringify(json).slice(0, 240)}`
    );
  }
  return taskId;
}

async function pollTask(taskId: string): Promise<string> {
  const url = `${API_BASE}${STATUS_PATH}?taskId=${encodeURIComponent(taskId)}`;
  const deadline = Date.now() + POLL_TIMEOUT_MS;

  while (Date.now() < deadline) {
    await sleep(POLL_INTERVAL_MS);

    let json: PollResponse;
    try {
      const res = await fetch(url, { headers: authHeaders() });
      if (!res.ok) continue;
      json = (await res.json()) as PollResponse;
    } catch {
      continue;
    }

    const state = (json.data?.state ?? "").toLowerCase();
    if (state === "success" || json.data?.successFlag === 1) {
      const first = json.data?.response?.resultUrls?.[0];
      if (!first) {
        throw new Error(
          `Task ${taskId} reported success but no resultUrls returned.`
        );
      }
      return first;
    }
    if (state === "fail" || state === "failed" || state === "error") {
      throw new Error(
        `Task ${taskId} failed: ${json.data?.failMsg ?? json.msg ?? "unknown"}`
      );
    }
  }

  throw new Error(`Task ${taskId} timed out after ${POLL_TIMEOUT_MS / 1000}s`);
}

async function downloadAndConvert(
  imageUrl: string,
  outPath: string,
  entry: ManifestEntry
) {
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`Download ${res.status} for ${imageUrl}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());

  let pipeline = sharp(buf);
  if (entry.width || entry.height) {
    pipeline = pipeline.resize(entry.width, entry.height, {
      fit: "cover",
      withoutEnlargement: false,
    });
  }
  await pipeline.webp({ quality: 88, effort: 5 }).toFile(outPath);
}

function aspectFromSize(w?: number, h?: number): string {
  if (!w || !h) return "1:1";
  const ratio = w / h;
  if (ratio > 1.7) return "16:9";
  if (ratio > 1.25) return "4:3";
  if (ratio > 0.9) return "1:1";
  if (ratio > 0.7) return "3:4";
  return "9:16";
}

async function main() {
  if (!API_KEY) {
    fail(
      "NANO_BANANA_API_KEY is not set. Add it to .env.local before running."
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

  let generated = 0;
  let skipped = 0;
  const failed: { entry: ManifestEntry; error: string }[] = [];

  for (let i = 0; i < total; i++) {
    const entry = manifest[i];
    const tag = `[${i + 1}/${total}]`;
    const dir = path.join(PUBLIC_IMAGES, entry.slug);
    const out = path.join(dir, `${entry.filename}.webp`);

    if (!entry.slug || !entry.filename || !entry.prompt) {
      const msg = "Entry missing required field (slug, filename, or prompt)";
      console.error(`${tag} Skipping invalid entry: ${msg}`);
      failed.push({ entry, error: msg });
      continue;
    }

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
      const taskId = await createTask(entry);
      const imageUrl = await pollTask(taskId);
      await downloadAndConvert(imageUrl, out, entry);
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
