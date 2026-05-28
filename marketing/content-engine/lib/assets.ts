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
