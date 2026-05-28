import 'dotenv/config';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generatePost, type Post } from './generate-post.js';
import { logAssetStatus } from '../lib/assets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

async function main() {
  logAssetStatus();

  const vaultDir = resolve(ROOT, 'vault');
  if (!existsSync(vaultDir)) {
    console.error(`Vault dir missing: ${vaultDir}. Run \`npm run sync-from-sheet\` first.`);
    process.exit(2);
  }

  const files = readdirSync(vaultDir)
    .filter(f => f.endsWith('.json'))
    .sort();

  const rows: { slug: string; format: string; panels: number; errors: number }[] = [];
  let anyError = false;

  for (const f of files) {
    const post = JSON.parse(readFileSync(resolve(vaultDir, f), 'utf8')) as Post;
    try {
      const r = await generatePost(post);
      rows.push({
        slug: r.slug,
        format: String(post['Format']),
        panels: r.panels.length,
        errors: r.errors.length,
      });
      if (r.errors.length) anyError = true;
    } catch (e) {
      rows.push({
        slug: f.replace(/\.json$/, ''),
        format: String(post['Format']),
        panels: 0,
        errors: 1,
      });
      anyError = true;
    }
  }

  console.log('\n— Summary —');
  console.log('slug'.padEnd(40), 'format'.padEnd(18), 'panels', 'errors');
  for (const r of rows) {
    console.log(
      r.slug.padEnd(40),
      r.format.padEnd(18),
      String(r.panels).padEnd(6),
      r.errors,
    );
  }

  if (anyError) process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
