import 'dotenv/config';
import { google } from 'googleapis';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env var: ${name}. See .env.example.`);
    process.exit(2);
  }
  return v;
}

async function main() {
  const email     = requireEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const keyRaw    = requireEnv('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
  const sheetId   = requireEnv('VAULT_SHEET_ID');
  // Service-account keys often arrive escaped (\\n -> \n).
  const key = keyRaw.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'A:O',
  });

  const rows = res.data.values ?? [];
  if (!rows.length) {
    console.error('Sheet returned zero rows.');
    process.exit(1);
  }

  const header = rows[0].map(c => String(c));
  const records: Record<string, unknown>[] = [];
  for (const row of rows.slice(1)) {
    const obj: Record<string, unknown> = {};
    header.forEach((h, i) => { obj[h] = row[i] ?? ''; });
    if (!obj['Slug']) continue;
    records.push(obj);
  }

  const vaultDir = resolve(ROOT, 'vault');
  mkdirSync(vaultDir, { recursive: true });

  let count = 0;
  for (const r of records) {
    const n = String(r['Post #']).padStart(2, '0');
    const slug = r['Slug'];
    const filename = `${n}-${slug}.json`;
    writeFileSync(resolve(vaultDir, filename), JSON.stringify(r, null, 2));
    count++;
  }
  console.log(`Synced ${count} rows -> ${vaultDir}`);
}

main().catch(e => { console.error(e); process.exit(1); });
