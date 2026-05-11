/**
 * Veo 3.1 Fast video generator.
 *
 * Reads scripts/video-manifest.json, kicks off a long-running operation
 * per entry, polls until the operation completes, downloads the
 * generated MP4, and writes it to public/videos/<slug>/<filename>.mp4.
 *
 * Run with: bun run gen-videos
 *
 * Reference: https://ai.google.dev/gemini-api/docs/video
 *
 * Endpoint:
 *   POST /v1beta/models/veo-3.1-fast-generate-preview:predictLongRunning
 *
 * Request body:
 *   {
 *     "instances": [{ "prompt": "..." }],
 *     "parameters": {
 *       "aspectRatio": "16:9" | "9:16",
 *       "durationSeconds": 4 | 6 | 8
 *     }
 *   }
 *
 * Polling:
 *   GET /v1beta/{operation_name}
 *   with x-goog-api-key header. The operation_name is returned in
 *   the initial response as response.name and looks like
 *   "models/veo-3.1-fast-generate-preview/operations/xxxxx".
 *
 * Final video URI:
 *   response.generateVideoResponse.generatedSamples[0].video.uri
 *
 * Audio: the Gemini API does not currently honour generateAudio for
 * Veo. Clips are produced with audio. Site videos play with the muted
 * attribute on the <video> element, which silences playback. To strip
 * the audio track entirely, post-process with ffmpeg after download.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

type AspectRatio = "16:9" | "9:16";
type Duration = 4 | 6 | 8;

type ManifestEntry = {
  slug: string;
  filename: string;
  prompt: string;
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

const API_BASE =
  process.env.GEMINI_API_BASE ??
  process.env.NANO_BANANA_API_BASE ??
  "https://generativelanguage.googleapis.com";
const MODEL = process.env.VEO_MODEL ?? "veo-3.1-fast-generate-preview";
const API_KEY =
  process.env.GEMINI_API_KEY ?? process.env.NANO_BANANA_API_KEY ?? "";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "scripts", "video-manifest.json");
const PUBLIC_VIDEOS = path.join(ROOT, "public", "videos");

const POLL_INTERVAL_MS = 10_000;
const POLL_TIMEOUT_MS = 10 * 60_000;

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

async function startOperation(entry: ManifestEntry): Promise<string> {
  const url = `${API_BASE}/v1beta/models/${MODEL}:predictLongRunning`;
  const body = {
    instances: [{ prompt: entry.prompt }],
    parameters: {
      aspectRatio: entry.aspectRatio ?? "16:9",
      durationSeconds: entry.duration ?? 8,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Start ${res.status} ${res.statusText}: ${text || "no body"}`
    );
  }

  const json = (await res.json()) as StartResponse;
  if (json.error) {
    throw new Error(
      `Start API error ${json.error.code ?? ""} ${json.error.status ?? ""}: ${
        json.error.message ?? ""
      }`.trim()
    );
  }
  const opName = json.name;
  if (!opName) {
    throw new Error(
      `No operation name returned: ${JSON.stringify(json).slice(0, 240)}`
    );
  }
  return opName;
}

function extractVideoUri(json: PollResponse): string | undefined {
  const r = json.response;
  if (!r) return undefined;
  const sample =
    r.generateVideoResponse?.generatedSamples?.[0] ??
    r.generatedSamples?.[0];
  if (sample) {
    if (typeof sample.video === "object" && sample.video?.uri) {
      return sample.video.uri;
    }
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
      const res = await fetch(url, {
        headers: { "x-goog-api-key": API_KEY },
      });
      if (!res.ok) {
        const elapsed = Math.round((Date.now() - start) / 1000);
        console.log(
          `${tag} Poll returned ${res.status}, retrying (${elapsed}s elapsed)...`
        );
        continue;
      }
      json = (await res.json()) as PollResponse;
    } catch (e) {
      const elapsed = Math.round((Date.now() - start) / 1000);
      console.log(
        `${tag} Poll error, retrying (${elapsed}s elapsed): ${
          (e as Error).message
        }`
      );
      continue;
    }

    if (json.error) {
      throw new Error(
        `Operation error ${json.error.code ?? ""} ${
          json.error.status ?? ""
        }: ${json.error.message ?? ""}`.trim()
      );
    }

    const elapsed = Math.round((Date.now() - start) / 1000);

    if (json.done) {
      const filtered =
        json.response?.generateVideoResponse?.raiMediaFilteredCount ?? 0;
      const reasons =
        json.response?.generateVideoResponse?.raiMediaFilteredReasons ?? [];
      if (filtered > 0 && reasons.length > 0) {
        throw new Error(
          `Operation completed but the sample was filtered: ${reasons.join("; ")}`
        );
      }

      const uri = extractVideoUri(json);
      if (!uri) {
        throw new Error(
          `Operation done but no video URI found. Body snippet: ${JSON.stringify(
            json
          ).slice(0, 400)}`
        );
      }
      console.log(`${tag} Operation complete (${elapsed}s).`);
      return uri;
    }

    console.log(`${tag} Polling (${elapsed}s elapsed)...`);
  }

  throw new Error(
    `Operation timed out after ${Math.round(POLL_TIMEOUT_MS / 1000)}s`
  );
}

async function downloadVideo(uri: string, outPath: string) {
  // Google's generative URIs may require auth either as ?key= or as the
  // x-goog-api-key header. Send the header; if the URI already includes
  // a key=, the header is ignored.
  const res = await fetch(uri, {
    headers: { "x-goog-api-key": API_KEY },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Download ${res.status} ${res.statusText}: ${text || "no body"}`
    );
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outPath, buf);
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
      "Manifest is empty. Add entries to scripts/video-manifest.json and rerun."
    );
    return;
  }

  console.log(`Found ${total} manifest ${total === 1 ? "entry" : "entries"}.`);
  console.log(`Model: ${MODEL}`);
  console.log(
    "Audio: requested without audio is not honoured by the Gemini API today; clips include audio but the site plays muted."
  );

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

    const dir = path.join(PUBLIC_VIDEOS, entry.slug);
    const out = path.join(dir, `${entry.filename}.mp4`);

    if (existsSync(out)) {
      console.log(
        `${tag} Skipping ${entry.slug}/${entry.filename}.mp4 (already exists)`
      );
      skipped++;
      continue;
    }

    console.log(
      `${tag} Generating ${entry.slug}/${entry.filename}.mp4...`
    );
    try {
      mkdirSync(dir, { recursive: true });
      const opName = await startOperation(entry);
      console.log(`${tag} Operation: ${opName}`);
      const uri = await pollOperation(opName, tag);
      await downloadVideo(uri, out);
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
