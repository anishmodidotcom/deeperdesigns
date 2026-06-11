/**
 * Extract every embedded raster image from siddhant-profile.pdf and
 * upscale ~2x via sharp, then save WebP under public/assets/extracted/.
 *
 * Pipeline:
 *   1. Use `pdfimages` (poppler-utils) to dump every embedded image.
 *      Fallback: Python + PyMuPDF if pdfimages is unavailable.
 *   2. Inventory all raw PPM/JPG/PNG files, sort by area (descending).
 *   3. Upscale 2x with lanczos3 + light sharpen, save as WebP q88.
 *   4. By default everything lands in /tmp-extracted/. A human pass
 *      (or follow-up script) moves files into the category folders:
 *      hero/, portraits/, corporate/, teambuilding/, sports/, logos/,
 *      testimonials/. The page components read from those folders.
 *
 * Idempotent: skips images whose output WebP already exists.
 *
 * Run: bun run scripts/extract-pdf-assets.ts
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PDF_PATH = path.join(ROOT, "reference", "siddhant-profile.pdf");
const RAW_DIR = path.join(ROOT, "raw-extracted");
const STAGING_DIR = path.join(ROOT, "public", "assets", "extracted", "_staging");

function fail(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function which(bin: string): string | null {
  try {
    return execSync(`command -v ${bin}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || null;
  } catch {
    return null;
  }
}

function runPdfImages(): void {
  if (existsSync(RAW_DIR)) rmSync(RAW_DIR, { recursive: true, force: true });
  mkdirSync(RAW_DIR, { recursive: true });
  console.log("[pdfimages] dumping all embedded raster images...");
  execSync(`pdfimages -all "${PDF_PATH}" "${path.join(RAW_DIR, "img")}"`, { stdio: "inherit" });
}

function runPyMuPDF(): void {
  if (existsSync(RAW_DIR)) rmSync(RAW_DIR, { recursive: true, force: true });
  mkdirSync(RAW_DIR, { recursive: true });
  const py = `
import fitz, os, sys
src = sys.argv[1]; out = sys.argv[2]
doc = fitz.open(src)
n = 0
for pi, page in enumerate(doc):
    for xi, info in enumerate(page.get_images(full=True)):
        xref = info[0]
        try:
            pix = fitz.Pixmap(doc, xref)
            if pix.n - pix.alpha >= 4:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            ext = "png"
            pix.save(os.path.join(out, f"img-{pi:03d}-{xi:03d}.{ext}"))
            n += 1
        except Exception as e:
            print(f"skip {pi}/{xi}: {e}")
print(f"wrote {n} images")
`;
  execSync(`python3 -c '${py.replace(/'/g, "'\\''")}' "${PDF_PATH}" "${RAW_DIR}"`, {
    stdio: "inherit",
  });
}

async function upscaleAll(): Promise<{ ok: number; skipped: number; failed: number }> {
  mkdirSync(STAGING_DIR, { recursive: true });
  const files = readdirSync(RAW_DIR)
    .filter((f) => /\.(png|jpe?g|ppm|pbm|tif|tiff|webp)$/i.test(f))
    .sort();

  console.log(`[upscale] ${files.length} candidate files`);
  let ok = 0,
    skipped = 0,
    failed = 0;

  for (const f of files) {
    const inPath = path.join(RAW_DIR, f);
    const stem = f.replace(/\.[^.]+$/, "");
    const outPath = path.join(STAGING_DIR, `${stem}.webp`);
    if (existsSync(outPath)) {
      skipped++;
      continue;
    }
    try {
      const meta = await sharp(inPath).metadata();
      if (!meta.width || !meta.height) {
        failed++;
        continue;
      }
      if (meta.width < 80 || meta.height < 80) {
        skipped++;
        continue;
      }
      await sharp(inPath)
        .resize(meta.width * 2, meta.height * 2, { kernel: "lanczos3" })
        .sharpen({ sigma: 0.6 })
        .webp({ quality: 88, effort: 5 })
        .toFile(outPath);
      ok++;
    } catch (e) {
      console.error(`  fail ${f}: ${(e as Error).message}`);
      failed++;
    }
  }

  return { ok, skipped, failed };
}

function inventory() {
  const files = readdirSync(STAGING_DIR).filter((f) => f.endsWith(".webp"));
  const rows: Array<{ file: string; size_kb: number }> = [];
  for (const f of files) {
    const s = statSync(path.join(STAGING_DIR, f));
    rows.push({ file: f, size_kb: Math.round(s.size / 1024) });
  }
  rows.sort((a, b) => b.size_kb - a.size_kb);
  console.log("\n[inventory] top staged files by size:");
  for (const r of rows.slice(0, 50)) {
    console.log(`  ${r.size_kb.toString().padStart(6)} KB  ${r.file}`);
  }
  console.log(`\nTotal staged: ${rows.length} files`);
  console.log(
    `\nNext step: visually sort files from ${path.relative(ROOT, STAGING_DIR)}/ into:`,
  );
  for (const c of ["hero", "portraits", "corporate", "teambuilding", "sports", "logos", "testimonials"]) {
    console.log(`  public/assets/extracted/${c}/`);
  }
  console.log("Then update ASSETS.md with the slot map.");
}

async function main() {
  if (!existsSync(PDF_PATH)) fail(`PDF not found at ${PDF_PATH}. Drop siddhant-profile.pdf into sidonstage/reference/.`);

  if (which("pdfimages")) {
    runPdfImages();
  } else if (which("python3")) {
    console.log("[fallback] pdfimages not found, using PyMuPDF via python3");
    runPyMuPDF();
  } else {
    fail("Neither pdfimages nor python3 available. Install poppler-utils or python3+PyMuPDF.");
  }

  const counts = await upscaleAll();
  console.log(`\n[upscale] ok=${counts.ok} skipped=${counts.skipped} failed=${counts.failed}`);
  inventory();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
