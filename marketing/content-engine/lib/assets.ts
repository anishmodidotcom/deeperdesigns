import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import sharp from 'sharp';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// REPO_ROOT defaults to ../.. (marketing/content-engine -> repo root).
const REPO_ROOT  = resolve(__dirname, '..', process.env.REPO_ROOT ?? '../..');

export const PATHS = {
  REPO_ROOT,
  AMBIENT_DIR:   resolve(REPO_ROOT, 'public/images/_ambient'),
  MAPLELENS_DIR: resolve(REPO_ROOT, 'public/images/maplelens'),
  // Spec said brand/v1/<file>; actual layout per brand v1 PR puts marks
  // under brand/v1/logo/. Try the spec path first, fall back to /logo/.
  MONOGRAM_SVG_CANDIDATES: [
    resolve(REPO_ROOT, 'brand/v1/monogram-primary.svg'),
    resolve(REPO_ROOT, 'brand/v1/logo/monogram-primary.svg'),
  ],
  WORDMARK_WHITE_SVG_CANDIDATES: [
    resolve(REPO_ROOT, 'brand/v1/logo-wordmark-white.svg'),
    resolve(REPO_ROOT, 'brand/v1/logo/logo-wordmark-white.svg'),
  ],
};

function pickFirstExisting(candidates: string[]): string | null {
  for (const c of candidates) if (existsSync(c)) return c;
  return null;
}

export const MONOGRAM_SVG       = pickFirstExisting(PATHS.MONOGRAM_SVG_CANDIDATES);
export const WORDMARK_WHITE_SVG = pickFirstExisting(PATHS.WORDMARK_WHITE_SVG_CANDIDATES);

export function logAssetStatus(): void {
  console.log('— Asset path check —');
  console.log('REPO_ROOT:', REPO_ROOT);

  for (const [label, p] of [
    ['AMBIENT_DIR',   PATHS.AMBIENT_DIR],
    ['MAPLELENS_DIR', PATHS.MAPLELENS_DIR],
  ] as const) {
    if (existsSync(p)) {
      const files = readdirSync(p);
      console.log(`OK    ${label.padEnd(15)} -> ${p} (${files.length} files)`);
    } else {
      console.log(`MISS  ${label.padEnd(15)} -> ${p}`);
    }
  }

  if (MONOGRAM_SVG) {
    console.log(`OK    MONOGRAM_SVG    -> ${MONOGRAM_SVG}`);
  } else {
    console.log('MISS  MONOGRAM_SVG    -> none of:');
    for (const c of PATHS.MONOGRAM_SVG_CANDIDATES) console.log('       ', c);
    const brandV1 = resolve(REPO_ROOT, 'brand/v1');
    if (existsSync(brandV1)) {
      console.log('       brand/v1 contents:', readdirSync(brandV1).join(', '));
    }
  }

  if (WORDMARK_WHITE_SVG) {
    console.log(`OK    WORDMARK_WHITE  -> ${WORDMARK_WHITE_SVG}`);
  } else {
    console.log('MISS  WORDMARK_WHITE  -> none of:');
    for (const c of PATHS.WORDMARK_WHITE_SVG_CANDIDATES) console.log('       ', c);
  }
}

// SVG -> PNG buffer (satori embeds via <img src="data:...">).
export async function svgToPngBuffer(svgPath: string, width: number): Promise<Buffer> {
  if (!existsSync(svgPath)) throw new Error(`SVG not found: ${svgPath}`);
  const svg = readFileSync(svgPath);
  // monogram-primary.svg uses fill="currentColor"; bake to white before rasterising
  // so the engine doesn't depend on browser inheritance.
  const baked = svg.toString('utf8').replace(/currentColor/g, '#FAFAFA');
  return sharp(Buffer.from(baked), { density: 384 })
    .resize({ width })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

export function pngBufferToDataUri(buf: Buffer): string {
  return `data:image/png;base64,${buf.toString('base64')}`;
}

// Topic -> ambient filename match. Brand-agnostic: never caption with the
// concept-brand name; the image is shown as "the kind of thing we build".
export function pickAmbientForSlug(slug: string): string | null {
  if (!existsSync(PATHS.AMBIENT_DIR)) return null;
  const files = readdirSync(PATHS.AMBIENT_DIR).filter(f => f.endsWith('.webp'));
  const slugLower = slug.toLowerCase();

  // Direct slug-substring match: 24-kadak-chai-* -> kadak-chai.webp etc.
  for (const f of files) {
    const base = basename(f, '.webp');
    if (slugLower.includes(base)) return resolve(PATHS.AMBIENT_DIR, f);
  }

  // Topic-keyword fallback.
  const topicMap: { match: RegExp; preferFile: string }[] = [
    { match: /(steel|industrial|trade|warehouse)/, preferFile: 'hivedesk.webp' },
    { match: /(clinic|dental|retention)/,           preferFile: 'smilefirst.webp' },
    { match: /(coworking|workspace|members)/,       preferFile: 'hivedesk.webp' },
    { match: /(restaurant|food|qsr|kitchen)/,       preferFile: 'zaatar-republic.webp' },
    { match: /(spice|heritage|kerala|exporter)/,    preferFile: 'malabar-spice.webp' },
    { match: /(furniture|catalog|studio shot)/,     preferFile: 'maplelens.webp' },
    { match: /(dog|pet|boarding|kennel)/,           preferFile: 'pawstay.webp' },
    { match: /(cricket|academy|sport)/,             preferFile: 'stumpvision.webp' },
    { match: /(auto|car|dealership|showroom)/,      preferFile: 'autobazaar.webp' },
  ];
  for (const rule of topicMap) {
    if (rule.match.test(slugLower)) {
      const f = files.find(x => x === rule.preferFile);
      if (f) return resolve(PATHS.AMBIENT_DIR, f);
    }
  }
  return null;
}

export async function loadAmbientPngBuffer(absPath: string, width = 1024): Promise<Buffer> {
  if (!existsSync(absPath)) throw new Error(`Ambient asset not found: ${absPath}`);
  return sharp(absPath).resize({ width }).png({ compressionLevel: 9 }).toBuffer();
}

// Cover-crop a source asset to exact panel dimensions, centred. Satori's
// `object-fit: cover` does not apply reliably when the parent is sized
// by flex-grow, so we pre-crop with sharp and embed the already-correct
// buffer instead.
export async function cropToPanelBuffer(
  absPath: string,
  width: number,
  height: number,
): Promise<Buffer> {
  if (!existsSync(absPath)) throw new Error(`Image asset not found: ${absPath}`);
  return sharp(absPath)
    .resize({ width, height, fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Per-post override of which source(s) to use for each image panel.
// `panelIndex` is 1-based. Returns:
//   - an absolute path to a file in /public/images/...  (preferred when
//     real product photography exists for that slug)
//   - null  (no good image; caller should fall back to a text/content
//     panel rather than ship a half-empty crop)
//
// Reasoning per slug:
//   01-maple-lens-furniture-makers
//     Real 1024x1024 product photography lives in /public/images/maplelens/.
//     Three image panels carry the workshop -> studio narrative:
//       P2 "WORKSHOP FLOOR · PHONE · ANY ANGLE"  -> hero-workshop
//       P4 "PHONE TO SHOT"                       -> hero-catalog
//       P5 "PICK THE SCENE · NEW ONES WEEKLY"    -> after-02 (alt scene)
//
//   10-smilefirst-dental-retention, 13-stumpvision-cricket-academy
//     Only the _ambient/ tile exists. Cover-cropped centre reads as an
//     intentional designed UI grid (smilefirst 2x2 panels) / a row of
//     player cards (stumpvision). Keep the ambient.
//
//   08-zaatar-republic-qsr-ops, 17-pawstay-dog-boarding
//     Source content is concentrated in one zone (zaatar dashboard at
//     top, pawstay phone at left). Centre-cropping leaves half the
//     frame empty. Return null -> caller falls back to a text panel.
export function pickImageAssetForPanel(
  slug: string,
  panelIndex: number,
): string | null {
  const repoImages = (p: string) => resolve(REPO_ROOT, 'public/images', p);

  if (slug === '01-maple-lens-furniture-makers') {
    if (panelIndex === 2) return repoImages('maplelens/hero-workshop.webp');
    if (panelIndex === 4) return repoImages('maplelens/hero-catalog.webp');
    if (panelIndex === 5) return repoImages('maplelens/after-02.webp');
  }
  if (slug === '10-smilefirst-dental-retention') {
    return repoImages('_ambient/smilefirst.webp');
  }
  if (slug === '13-stumpvision-cricket-academy') {
    return repoImages('_ambient/stumpvision.webp');
  }
  if (slug === '08-zaatar-republic-qsr-ops')  return null;
  if (slug === '17-pawstay-dog-boarding')     return null;

  // Fallback: anything else still in this batch -> try the ambient match.
  return pickAmbientForSlug(slug);
}
