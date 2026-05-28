import 'dotenv/config';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TOKENS, accentForSlug } from '../lib/tokens.js';
import {
  MONOGRAM_SVG,
  WORDMARK_WHITE_SVG,
  svgToPngBuffer,
  pngBufferToDataUri,
  pickImageAssetForPanel,
  cropToPanelBuffer,
  logAssetStatus,
} from '../lib/assets.js';
import { parseBrief, type ParsedPanel } from './parse-brief.js';
import { renderToPng } from './render-png.js';

import { StatementCard }   from '../templates/statement-card.js';
import { CarouselHook }    from '../templates/carousel-hook.js';
import { CarouselContent } from '../templates/carousel-content.js';
import { CarouselStat }    from '../templates/carousel-stat.js';
import { CarouselImage, PANEL_IMAGE_DIMS } from '../templates/carousel-image.js';
import { CarouselDivider } from '../templates/carousel-divider.js';
import { CarouselCta }     from '../templates/carousel-cta.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

export type Post = {
  'Post #': string | number;
  'Slug': string;
  'Format': 'statement-card' | 'carousel' | 'text';
  'Graphic Brief'?: string;
  'Caption'?: string;
  [k: string]: unknown;
};

function postSlug(post: Post): string {
  const num = String(post['Post #']).padStart(2, '0');
  return `${num}-${post['Slug']}`;
}

export async function generatePost(post: Post): Promise<{ slug: string; panels: string[]; errors: string[] }> {
  const slug   = postSlug(post);
  const accent = accentForSlug(slug);
  const outDir = resolve(ROOT, 'output', slug);
  mkdirSync(outDir, { recursive: true });

  // Brand marks once per post.
  const monogramPng = MONOGRAM_SVG
    ? pngBufferToDataUri(await svgToPngBuffer(MONOGRAM_SVG, 192))
    : undefined;
  const wordmarkPng = WORDMARK_WHITE_SVG
    ? pngBufferToDataUri(await svgToPngBuffer(WORDMARK_WHITE_SVG, 880))
    : undefined;

  const errors: string[] = [];
  const produced: string[] = [];

  const format = post['Format'];
  const brief  = (post['Graphic Brief'] ?? post['Caption'] ?? '') as string;

  if (format === 'statement-card' || format === 'text') {
    const parsed = parseBrief(format, brief);
    errors.push(...parsed.errors);
    const card = parsed.panels[0];
    if (!card || !card.fields.quote) {
      errors.push('no parseable quote');
    } else {
      const file = resolve(outDir, 'card.png');
      await renderToPng(
        StatementCard({
          quote:    card.fields.quote!,
          label:    card.fields.label ?? 'DEEPER DESIGNS',
          accent,
          monogramPng,
          wordmarkPng,
        }),
        file,
      );
      produced.push('card.png');
    }
  } else if (format === 'carousel') {
    const parsed = parseBrief(format, brief);
    errors.push(...parsed.errors);

    let i = 1;
    for (const panel of parsed.panels) {
      const filename = `panel-${String(i).padStart(2, '0')}.png`;
      const file = resolve(outDir, filename);
      try {
        await renderPanel(panel, i, file, accent, monogramPng, wordmarkPng, slug);
        produced.push(filename);
      } catch (e) {
        const msg = (e as Error).message;
        errors.push(`panel ${i}: ${msg}`);
      }
      i++;
    }
  } else {
    errors.push(`unknown format: ${format}`);
  }

  // Write manifest (spec'd shape — every post gets one).
  const repoBaseUrl =
    'https://raw.githubusercontent.com/anishmodidotcom/deeperdesigns/feat/content-engine/marketing/content-engine/output';
  const manifest = {
    post_number:  Number(post['Post #']),
    slug:         post['Slug'],
    format:       format,
    files:        produced,
    panel_count:  produced.length,
    raw_base_url: `${repoBaseUrl}/${slug}`,
    accent,
    errors,
  };
  writeFileSync(
    resolve(outDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  );

  if (errors.length) {
    writeFileSync(resolve(outDir, 'ERROR.txt'), errors.join('\n'));
  }

  return { slug, panels: produced, errors };
}

async function renderPanel(
  panel: ParsedPanel,
  panelIndex: number,
  file: string,
  accent: string,
  monogramPng: string | undefined,
  wordmarkPng: string | undefined,
  slug: string,
) {
  switch (panel.role) {
    case 'hook':
      await renderToPng(
        CarouselHook({
          hook:   panel.fields.hook ?? '',
          kicker: panel.fields.kicker,
          accent,
          monogramPng,
        }),
        file,
      );
      return;
    case 'content':
      await renderToPng(
        CarouselContent({
          step:  panel.fields.step,
          title: panel.fields.title ?? '',
          body:  panel.fields.body  ?? '',
          accent,
          monogramPng,
        }),
        file,
      );
      return;
    case 'stat':
      await renderToPng(
        CarouselStat({
          items: panel.fields.items ?? [],
          accent,
          monogramPng,
        }),
        file,
      );
      return;
    case 'image': {
      // Per-post / per-panel picker decides which real asset to embed,
      // or returns null when no source looks intentional cover-cropped
      // (08 zaatar, 17 pawstay). Null -> fall back to a clean content
      // panel rather than ship a half-empty image.
      const src = pickImageAssetForPanel(slug, panelIndex);
      if (!src) {
        // Image asset unsuitable for cover-crop (content concentrated in
        // one zone of the source). Degrade to CarouselDivider — the
        // caption centred as a Geist 600 headline above the accent
        // rule. Reads as a section break, not a half-empty image.
        await renderToPng(
          CarouselDivider({
            caption: panel.fields.caption ?? 'THE KIND OF TOOL WE BUILD',
            accent,
            monogramPng,
          }),
          file,
        );
        return;
      }
      // Sharp-crop to the exact panel dimensions so Satori embeds an
      // already-correct buffer (satori does not apply object-fit: cover
      // when the parent is flex-grow sized).
      const imgBuf = await cropToPanelBuffer(
        src,
        PANEL_IMAGE_DIMS.width,
        PANEL_IMAGE_DIMS.height,
      );
      await renderToPng(
        CarouselImage({
          imgPng:  pngBufferToDataUri(imgBuf),
          caption: panel.fields.caption ?? 'THE KIND OF TOOL WE BUILD',
          accent,
          monogramPng,
        }),
        file,
      );
      return;
    }
    case 'cta':
      await renderToPng(
        CarouselCta({
          line: panel.fields.line ?? '',
          accent,
          wordmarkPng,
        }),
        file,
      );
      return;
    case 'card':
      throw new Error('card role not valid in carousel');
  }
}

// CLI entrypoint: `npm run generate-one -- --slug=03-tool-before-problem-mistake`
async function main() {
  const slugArg = process.argv.find(a => a.startsWith('--slug='))?.slice('--slug='.length);
  if (!slugArg) {
    console.error('Usage: npm run generate-one -- --slug=NN-slug-name');
    process.exit(2);
  }

  logAssetStatus();

  const vaultDir = resolve(ROOT, 'vault');
  if (!existsSync(vaultDir)) {
    console.error(`Vault dir missing: ${vaultDir}. Run \`npm run sync-from-sheet\` first.`);
    process.exit(2);
  }
  const file = resolve(vaultDir, `${slugArg}.json`);
  if (!existsSync(file)) {
    console.error(`Vault entry missing: ${file}.`);
    console.error('Available:', readdirSync(vaultDir).filter(f => f.endsWith('.json')).join(', '));
    process.exit(2);
  }
  const post = JSON.parse(readFileSync(file, 'utf8')) as Post;
  const r = await generatePost(post);
  console.log('\nResult:');
  console.log(JSON.stringify(r, null, 2));
  if (r.errors.length) process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(e => { console.error(e); process.exit(1); });
}
