// Read marketing/content-engine/vault-seed.json (array of post rows in
// the same shape sync-from-sheet.ts emits) and write one
// vault/{NN}-{slug}.json file per entry. Use when you have the briefs
// locally instead of via the Sheets API.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

type Row = Record<string, unknown> & {
  'Post #'?: string | number;
  'Slug'?: string;
};

function main() {
  const seedPath = resolve(ROOT, 'vault-seed.json');
  if (!existsSync(seedPath)) {
    console.error(`Missing seed file: ${seedPath}`);
    console.error('Paste the 40 rows as a JSON array there, then re-run.');
    process.exit(2);
  }

  let rows: Row[];
  try {
    const raw = JSON.parse(readFileSync(seedPath, 'utf8'));
    rows = Array.isArray(raw) ? raw : (raw.rows ?? []);
  } catch (e) {
    console.error('Could not parse vault-seed.json:', (e as Error).message);
    process.exit(1);
  }

  if (!rows.length) {
    console.error('Seed file is empty.');
    process.exit(1);
  }

  const vaultDir = resolve(ROOT, 'vault');
  mkdirSync(vaultDir, { recursive: true });

  let count = 0;
  const seenSlugs = new Set<string>();
  for (const r of rows) {
    const slug = r['Slug'];
    if (!slug || typeof slug !== 'string') continue;
    const n = String(r['Post #'] ?? '').padStart(2, '0');
    const filename = `${n}-${slug}.json`;
    if (seenSlugs.has(filename)) {
      console.warn(`WARN duplicate ${filename}; second instance overwrites first`);
    }
    seenSlugs.add(filename);
    writeFileSync(resolve(vaultDir, filename), JSON.stringify(r, null, 2));
    count++;
  }
  console.log(`Synced ${count} rows from vault-seed.json -> ${vaultDir}`);
}

main();
