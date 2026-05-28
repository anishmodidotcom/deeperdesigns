// Download the six TTFs the engine needs into ../fonts/. Three families:
// Geist (regular + semibold), Geist Mono (regular + medium), Instrument
// Serif (regular + italic). All three are free, sourced from Google
// Fonts (Instrument Serif) and the upstream Vercel geist-font repo
// (Geist + Geist Mono).
//
// IMPLEMENTATION NOTE: Google Fonts' geist and geistmono packages
// distribute the variable .ttf only. Satori's bundled opentype parser
// chokes on those (parseFvarAxis throws). Vercel's upstream
// geist-font repo ships static WOFF2 instances per weight, so we pull
// those and decode to .ttf via wawoff2. Same source intent, different
// distribution.
//
// If any download or decode fails, STOP. The engine cannot run without
// all six.

import { mkdirSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import wawoff2 from 'wawoff2';
import { FONTS_DIR_PATH } from '../lib/fonts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const MIN_BYTES = 10_000;

type Job = {
  url: string;
  outFile: string;
  family: string;
  decode: 'ttf' | 'woff2';
};

const JOBS: Job[] = [
  // Geist — from Vercel's upstream repo, static WOFF2 per weight.
  {
    family:  'Geist Regular',
    outFile: 'Geist-Regular.ttf',
    url:     'https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-sans/Geist-Regular.woff2',
    decode:  'woff2',
  },
  {
    family:  'Geist SemiBold',
    outFile: 'Geist-SemiBold.ttf',
    url:     'https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-sans/Geist-SemiBold.woff2',
    decode:  'woff2',
  },
  // Geist Mono.
  {
    family:  'Geist Mono Regular',
    outFile: 'GeistMono-Regular.ttf',
    url:     'https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-mono/GeistMono-Regular.woff2',
    decode:  'woff2',
  },
  {
    family:  'Geist Mono Medium',
    outFile: 'GeistMono-Medium.ttf',
    url:     'https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-mono/GeistMono-Medium.woff2',
    decode:  'woff2',
  },
  // Instrument Serif — Google Fonts statics (works directly).
  {
    family:  'Instrument Serif Regular',
    outFile: 'InstrumentSerif-Regular.ttf',
    url:     'https://github.com/google/fonts/raw/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf',
    decode:  'ttf',
  },
  {
    family:  'Instrument Serif Italic',
    outFile: 'InstrumentSerif-Italic.ttf',
    url:     'https://github.com/google/fonts/raw/main/ofl/instrumentserif/InstrumentSerif-Italic.ttf',
    decode:  'ttf',
  },
];

async function fetchJob(job: Job, dir: string): Promise<void> {
  const out = resolve(dir, job.outFile);
  if (existsSync(out) && statSync(out).size >= MIN_BYTES) {
    console.log(`SKIP  ${job.outFile} (already present, ${statSync(out).size} bytes)`);
    return;
  }

  console.log(`GET   ${job.outFile}`);
  const res = await fetch(job.url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${job.url}`);
  }
  const raw = Buffer.from(await res.arrayBuffer());
  if (raw.byteLength < 2000) {
    throw new Error(`Downloaded too small (${raw.byteLength} bytes). URL: ${job.url}`);
  }

  let ttf: Buffer;
  if (job.decode === 'woff2') {
    const decoded = await wawoff2.decompress(raw);
    ttf = Buffer.from(decoded);
  } else {
    ttf = raw;
  }

  if (ttf.byteLength < MIN_BYTES) {
    throw new Error(`Decoded TTF too small (${ttf.byteLength} bytes) for ${job.outFile}.`);
  }
  writeFileSync(out, ttf);
  console.log(`OK    ${job.outFile} (${ttf.byteLength} bytes)`);
}

async function main() {
  const dir = FONTS_DIR_PATH;
  mkdirSync(dir, { recursive: true });

  const failures: { job: Job; err: string }[] = [];
  for (const j of JOBS) {
    try {
      await fetchJob(j, dir);
    } catch (e) {
      failures.push({ job: j, err: (e as Error).message });
      console.error(`FAIL  ${j.outFile}: ${(e as Error).message}`);
    }
  }

  if (failures.length) {
    console.error('\nSTOP: one or more fonts failed.');
    for (const f of failures) console.error(`  ${f.job.family}: ${f.err}`);
    process.exit(1);
  }

  for (const j of JOBS) {
    const p = resolve(dir, j.outFile);
    if (!existsSync(p)) { console.error(`STOP: ${j.outFile} missing`); process.exit(1); }
    const sz = statSync(p).size;
    if (sz < MIN_BYTES) { console.error(`STOP: ${j.outFile} is ${sz} bytes (< ${MIN_BYTES})`); process.exit(1); }
  }
  console.log('\nAll six fonts present and > 10KB.');
}

main().catch(e => { console.error(e); process.exit(1); });
