import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import type { ReactNode } from 'react';
import { loadFonts } from '../lib/fonts.js';

let FONTS_CACHE: ReturnType<typeof loadFonts> | null = null;

export async function renderToPng(
  node: ReactNode,
  outPath: string,
  w = 1080,
  h = 1080,
): Promise<void> {
  if (!FONTS_CACHE) FONTS_CACHE = loadFonts();

  const svg = await satori(node as Parameters<typeof satori>[0], {
    width: w,
    height: h,
    fonts: FONTS_CACHE,
  });

  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: w },
  }).render().asPng();

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, png);
  console.log('rendered', outPath);
}
