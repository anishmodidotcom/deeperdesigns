import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const FONTS_DIR  = resolve(__dirname, '..', 'fonts');

type SatoriFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 600;
  style: 'normal' | 'italic';
};

const FONT_FILES: { file: string; name: string; weight: 400|500|600; style: 'normal'|'italic' }[] = [
  { file: 'Geist-Regular.ttf',          name: 'Geist',            weight: 400, style: 'normal' },
  { file: 'Geist-SemiBold.ttf',         name: 'Geist',            weight: 600, style: 'normal' },
  { file: 'GeistMono-Regular.ttf',      name: 'Geist Mono',       weight: 400, style: 'normal' },
  { file: 'GeistMono-Medium.ttf',       name: 'Geist Mono',       weight: 500, style: 'normal' },
  { file: 'InstrumentSerif-Regular.ttf',name: 'Instrument Serif', weight: 400, style: 'normal' },
  { file: 'InstrumentSerif-Italic.ttf', name: 'Instrument Serif', weight: 400, style: 'italic' },
];

export function loadFonts(): SatoriFont[] {
  const fonts: SatoriFont[] = [];
  for (const f of FONT_FILES) {
    const fullPath = resolve(FONTS_DIR, f.file);
    if (!existsSync(fullPath)) {
      throw new Error(
        `Missing font file: ${fullPath}\n` +
        `Run \`npm run setup-fonts\` first. If that fails, check the URLs in scripts/setup-fonts.ts.`
      );
    }
    fonts.push({
      name: f.name,
      data: readFileSync(fullPath),
      weight: f.weight,
      style: f.style,
    });
  }
  return fonts;
}

export const FONTS_DIR_PATH = FONTS_DIR;
