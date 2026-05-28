import 'dotenv/config';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { accentForSlug } from '../lib/tokens.js';
import {
  MONOGRAM_SVG,
  WORDMARK_WHITE_SVG,
  svgToPngBuffer,
  pngBufferToDataUri,
  pickImageAssetForPanel,
  cropToPanelBuffer,
  isCroppedTooDark,
  logAssetStatus,
} from '../lib/assets.js';
import { parseBrief } from './parse-brief.js';
import { renderToPng } from './render-png.js';
import { routePanels, type RouteDecision } from './route-archetype.js';

import { StatementArchetype } from '../templates/archetypes/statement.js';
import { BigStatArchetype }   from '../templates/archetypes/bigstat.js';
import { SplitArchetype }     from '../templates/archetypes/split.js';
import { StepGridArchetype }  from '../templates/archetypes/stepgrid.js';
import { ProductArchetype, PRODUCT_IMAGE_DIMS } from '../templates/archetypes/product.js';
import { IndexCardArchetype } from '../templates/archetypes/index-card.js';
import { CtaArchetype }       from '../templates/archetypes/cta.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

// Posts that map to a live work page on deeperdesigns.in. Keyed by
// post-number-prefixed slug. Anything not listed gets an empty string.
// Verified resolvable (HTTP 200) before being added here.
const SHOWCASE_URLS: Record<string, string> = {
  '01-maple-lens-furniture-makers': 'https://deeperdesigns.in/work/maplelens',
  '04-deeper-content-three-steps':  'https://deeperdesigns.in/work/deeper-content',
  '06-veda-glow-skin-advisor':      'https://deeperdesigns.in/work/veda-glow',
  '08-zaatar-republic-qsr-ops':     'https://deeperdesigns.in/work/zaatar-republic',
  '10-smilefirst-dental-retention': 'https://deeperdesigns.in/work/smilefirst',
  '13-stumpvision-cricket-academy': 'https://deeperdesigns.in/work/stumpvision',
  '17-pawstay-dog-boarding':        'https://deeperdesigns.in/work/pawstay',
  '20-karan-legal-lead-qualifier':  'https://deeperdesigns.in/work/karan-legal',
  // 22-earth-fire-product-builder: /work/earth-fire 404s — left empty.
  '24-kadak-chai-brand-world':      'https://deeperdesigns.in/work/kadak-chai',
  '30-meera-wellness-yoga-portal':  'https://deeperdesigns.in/work/meera-wellness',
};

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

export async function generatePost(post: Post): Promise<{
  slug: string;
  panels: string[];
  archetypes: string[];
  errors: string[];
}> {
  const slug   = postSlug(post);
  const accent = accentForSlug(slug);
  const outDir = resolve(ROOT, 'output', slug);
  mkdirSync(outDir, { recursive: true });

  const monogramPng = MONOGRAM_SVG
    ? pngBufferToDataUri(await svgToPngBuffer(MONOGRAM_SVG, 192))
    : undefined;
  const wordmarkPng = WORDMARK_WHITE_SVG
    ? pngBufferToDataUri(await svgToPngBuffer(WORDMARK_WHITE_SVG, 880))
    : undefined;

  const errors: string[] = [];
  const produced: string[] = [];
  const archetypes: string[] = [];

  const format = post['Format'];
  const brief  = (post['Graphic Brief'] ?? post['Caption'] ?? '') as string;

  // Parse into role-tagged panels (existing parser, unchanged).
  const parsed = parseBrief(format, brief);
  errors.push(...parsed.errors);

  // Route to archetype decisions.
  const decisions = routePanels(parsed.panels, slug);

  const isCarousel = format === 'carousel';
  const filenameAt = (i: number): string =>
    isCarousel ? `panel-${String(i + 1).padStart(2, '0')}.png` : 'card.png';

  for (let i = 0; i < decisions.length; i++) {
    const filename = filenameAt(i);
    const file = resolve(outDir, filename);
    try {
      const arch = await renderDecision(
        decisions[i],
        file,
        accent,
        monogramPng,
        wordmarkPng,
        slug,
      );
      produced.push(filename);
      archetypes.push(arch);
    } catch (e) {
      const msg = (e as Error).message;
      errors.push(`panel ${i + 1}: ${msg}`);
    }
  }

  const repoBaseUrl =
    'https://raw.githubusercontent.com/anishmodidotcom/deeperdesigns/main/marketing/content-engine/output';
  const manifest = {
    post_number:  Number(post['Post #']),
    slug:         post['Slug'],
    format,
    files:        produced,
    panel_count:  produced.length,
    archetypes,
    raw_base_url: `${repoBaseUrl}/${slug}`,
    showcase_url: SHOWCASE_URLS[slug] ?? '',
    accent,
    errors,
  };
  writeFileSync(
    resolve(outDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  );

  if (errors.length) {
    writeFileSync(resolve(outDir, 'ERROR.txt'), errors.join('\n'));
  } else if (existsSync(resolve(outDir, 'ERROR.txt'))) {
    // Clear stale error file from a previous run.
    writeFileSync(resolve(outDir, 'ERROR.txt'), '');
  }

  return { slug, panels: produced, archetypes, errors };
}

async function renderDecision(
  decision: RouteDecision,
  file: string,
  accent: string,
  monogramPng: string | undefined,
  wordmarkPng: string | undefined,
  slug: string,
): Promise<string> {
  switch (decision.archetype) {
    case 'Statement':
      await renderToPng(
        StatementArchetype({
          quote:  decision.props.quote,
          kicker: decision.props.kicker,
          accent,
          monogramPng,
        }),
        file,
      );
      return 'Statement';

    case 'BigStat':
      await renderToPng(
        BigStatArchetype({
          primary:   decision.props.primary,
          secondary: decision.props.secondary,
          kicker:    decision.props.kicker,
          accent,
          monogramPng,
        }),
        file,
      );
      return 'BigStat';

    case 'Split':
      await renderToPng(
        SplitArchetype({
          leftLabel:  decision.props.leftLabel,
          leftBody:   decision.props.leftBody,
          rightLabel: decision.props.rightLabel,
          rightBody:  decision.props.rightBody,
          kicker:     decision.props.kicker,
          accent,
          monogramPng,
        }),
        file,
      );
      return 'Split';

    case 'StepGrid':
      await renderToPng(
        StepGridArchetype({
          heading: decision.props.heading,
          steps:   decision.props.steps,
          kicker:  decision.props.kicker,
          accent,
          monogramPng,
        }),
        file,
      );
      return 'StepGrid';

    case 'IndexCard':
      await renderToPng(
        IndexCardArchetype({
          heading: decision.props.heading,
          rows:    decision.props.rows,
          kicker:  decision.props.kicker,
          accent,
          monogramPng,
        }),
        file,
      );
      return 'IndexCard';

    case 'Product': {
      // Look up the image source. If missing or too dark, degrade to a
      // Statement using the caption-as-quote.
      const src = pickImageAssetForPanel(slug, decision.props.panelIndex);
      const tooDark = src
        ? await isCroppedTooDark(src, PRODUCT_IMAGE_DIMS.width, PRODUCT_IMAGE_DIMS.height)
        : true;
      if (!src || tooDark) {
        await renderToPng(
          StatementArchetype({
            quote:  decision.props.caption,
            kicker: decision.props.kicker,
            accent,
            monogramPng,
          }),
          file,
        );
        return 'Statement';
      }
      const imgBuf = await cropToPanelBuffer(
        src,
        PRODUCT_IMAGE_DIMS.width,
        PRODUCT_IMAGE_DIMS.height,
      );
      await renderToPng(
        ProductArchetype({
          imgPng:  pngBufferToDataUri(imgBuf),
          caption: decision.props.caption,
          kicker:  decision.props.kicker,
          accent,
          monogramPng,
        }),
        file,
      );
      return 'Product';
    }

    case 'Cta':
      await renderToPng(
        CtaArchetype({
          line: decision.props.line,
          accent,
          wordmarkPng,
        }),
        file,
      );
      return 'Cta';
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
