/**
 * fal.ai video generator (Kling, with a Seedance fallback).
 *
 * The repo's existing generate-videos.ts is wired to Veo (Gemini). This is a
 * separate, fal-based path used for the v19.3 Fashion "Runway" clip. It is
 * manifest-driven like the Veo script and writes MP4s to
 * public/videos/<slug>/<filename>.mp4.
 *
 * Run: FAL_KEY=... bun run scripts/gen-fal-video.ts
 * (FAL_API_KEY is also accepted.)
 *
 * fal queue API:
 *   POST https://queue.fal.run/<model>        -> { request_id, status_url, response_url }
 *   GET  <status_url>                          -> { status: IN_QUEUE | IN_PROGRESS | COMPLETED }
 *   GET  <response_url>                        -> { video: { url } }
 *
 * Models are overridable via env:
 *   FAL_VIDEO_MODEL          (default Kling text-to-video)
 *   FAL_VIDEO_FALLBACK_MODEL (default Seedance text-to-video)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY ?? process.env.FAL_API_KEY ?? "";
const PRIMARY = process.env.FAL_VIDEO_MODEL ?? "fal-ai/kling-video/v1.6/standard/text-to-video";
const FALLBACK = process.env.FAL_VIDEO_FALLBACK_MODEL ?? "fal-ai/bytedance/seedance/v1/pro/text-to-video";
const MANIFEST = path.join(process.cwd(), "scripts", "fal-video-manifest.json");

type Entry = {
  slug: string;
  filename: string;
  prompt: string;
  aspectRatio?: string;
  duration?: number;
};

type Submit = { request_id?: string; status_url?: string; response_url?: string; detail?: unknown };
type Status = { status?: string; detail?: unknown };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function headers() {
  return { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };
}

// Pull a video URL out of fal's (slightly model-varying) result shape.
function findVideoUrl(obj: unknown): string | null {
  if (!obj || typeof obj !== "object") return null;
  const o = obj as Record<string, unknown>;
  const v = o.video;
  if (typeof v === "string") return v;
  if (v && typeof v === "object" && typeof (v as Record<string, unknown>).url === "string") {
    return (v as Record<string, unknown>).url as string;
  }
  if (Array.isArray(o.videos) && o.videos[0]) {
    const first = o.videos[0] as Record<string, unknown>;
    if (typeof first.url === "string") return first.url;
  }
  if (typeof o.url === "string") return o.url;
  return null;
}

async function runModel(model: string, entry: Entry): Promise<string> {
  const input: Record<string, unknown> = {
    prompt: entry.prompt,
    aspect_ratio: entry.aspectRatio ?? "9:16",
    duration: String(entry.duration ?? 5),
  };
  const submitRes = await fetch(`https://queue.fal.run/${model}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(input),
  });
  if (!submitRes.ok) {
    throw new Error(`submit ${submitRes.status}: ${await submitRes.text().catch(() => "")}`);
  }
  const submit = (await submitRes.json()) as Submit;
  const statusUrl = submit.status_url;
  const responseUrl = submit.response_url;
  if (!statusUrl || !responseUrl) throw new Error(`no status/response url: ${JSON.stringify(submit)}`);

  const started = Date.now();
  const timeoutMs = 8 * 60 * 1000;
  for (;;) {
    await sleep(8000);
    const st = (await (await fetch(statusUrl, { headers: headers() })).json()) as Status;
    const elapsed = Math.round((Date.now() - started) / 1000);
    console.log(`  [${model}] ${st.status ?? "?"} (${elapsed}s)`);
    if (st.status === "COMPLETED") break;
    if (st.status && !["IN_QUEUE", "IN_PROGRESS"].includes(st.status)) {
      throw new Error(`unexpected status ${st.status}: ${JSON.stringify(st)}`);
    }
    if (Date.now() - started > timeoutMs) throw new Error("polling timed out");
  }

  const result = await (await fetch(responseUrl, { headers: headers() })).json();
  const url = findVideoUrl(result);
  if (!url) throw new Error(`no video url in result: ${JSON.stringify(result).slice(0, 300)}`);
  return url;
}

async function main() {
  if (!KEY) {
    console.error("Error: FAL_KEY (or FAL_API_KEY) not set.");
    process.exit(1);
  }
  if (!existsSync(MANIFEST)) {
    console.error(`Error: manifest not found at ${MANIFEST}`);
    process.exit(1);
  }
  const entries = JSON.parse(readFileSync(MANIFEST, "utf8")) as Entry[];
  let ok = 0;
  let skipped = 0;
  const failed: string[] = [];

  for (const e of entries) {
    const outDir = path.join(process.cwd(), "public", "videos", e.slug);
    const out = path.join(outDir, `${e.filename}.mp4`);
    if (existsSync(out)) {
      console.log(`skip ${e.slug}/${e.filename}.mp4 (exists)`);
      skipped++;
      continue;
    }
    mkdirSync(outDir, { recursive: true });
    console.log(`generating ${e.slug}/${e.filename}.mp4 ...`);
    let url: string | null = null;
    try {
      url = await runModel(PRIMARY, e);
    } catch (err) {
      console.error(`  primary (${PRIMARY}) failed: ${err instanceof Error ? err.message : String(err)}`);
      try {
        console.log(`  trying fallback ${FALLBACK} ...`);
        url = await runModel(FALLBACK, e);
      } catch (err2) {
        const msg = err2 instanceof Error ? err2.message : String(err2);
        console.error(`  fallback failed: ${msg}`);
        failed.push(`${e.slug}/${e.filename}: ${msg}`);
        continue;
      }
    }
    try {
      const bytes = Buffer.from(await (await fetch(url)).arrayBuffer());
      writeFileSync(out, bytes);
      console.log(`saved ${path.relative(process.cwd(), out)} (${(bytes.length / 1e6).toFixed(2)} MB)`);
      ok++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      failed.push(`${e.slug}/${e.filename} (download): ${msg}`);
    }
  }

  console.log(`\nDone. ok=${ok} skipped=${skipped} failed=${failed.length}`);
  if (failed.length) {
    failed.forEach((f) => console.log("  " + f));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
