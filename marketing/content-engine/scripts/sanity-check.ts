// One-off typography sanity check. Renders a StatementCard using the
// real DD positioning line from app/about/page.tsx (the h1) so Anish
// can verify brand fidelity — font, accent rule, layout, monogram —
// before populating .env creds and running the real post 03.
//
// Output: output/_sanity-check/card.png.
// NOT a production post. Lives under _sanity-check to make that clear.

import 'dotenv/config';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TOKENS } from '../lib/tokens.js';
import {
  MONOGRAM_SVG,
  WORDMARK_WHITE_SVG,
  svgToPngBuffer,
  pngBufferToDataUri,
  logAssetStatus,
} from '../lib/assets.js';
import { renderToPng } from '../generators/render-png.js';
import { StatementCard } from '../templates/statement-card.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

async function main() {
  logAssetStatus();

  if (!MONOGRAM_SVG || !WORDMARK_WHITE_SVG) {
    console.error('Brand marks missing; cannot render sanity check.');
    process.exit(2);
  }

  const monogramPng = pngBufferToDataUri(await svgToPngBuffer(MONOGRAM_SVG, 192));
  const wordmarkPng = pngBufferToDataUri(await svgToPngBuffer(WORDMARK_WHITE_SVG, 880));

  const outDir = resolve(ROOT, 'output', '_sanity-check');
  const outFile = resolve(outDir, 'card.png');

  // Real DD positioning line from app/about/page.tsx h1. NOT invented.
  const quote = 'We build the small tools that quietly make a business better.';
  const label = 'DEEPER DESIGNS · A NOTE';

  await renderToPng(
    StatementCard({
      quote,
      label,
      accent: TOKENS.colors.indigo,
      monogramPng,
      wordmarkPng,
    }),
    outFile,
  );

  console.log('\nSanity check rendered at:', outFile);
}

main().catch(e => { console.error(e); process.exit(1); });
