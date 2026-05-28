import 'dotenv/config';
import { google } from 'googleapis';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

// Pre-existing Drive folders for the 24 graphics-producing posts.
const FOLDER_MAP: Record<string, string> = {
  '01-maple-lens-furniture-makers':   '1yU5cwDco_cpdVuueCZwoN5W4DyXU321z',
  '03-tool-before-problem-mistake':   '1cjy7N89gOS1OAQmLzOKTvo3K9OTR1rFe',
  '04-deeper-content-three-steps':    '1UX_cOCuinKe1jWadyzjzSMzrv_0OWEPs',
  '06-veda-glow-skin-advisor':        '1MPxawCj6bbw-HFhd7ohFoN4Z2GqjCiML',
  '08-zaatar-republic-qsr-ops':       '1xqMWeXp5s4PCgzbhUtvzs0UBHwedzvdj',
  '10-smilefirst-dental-retention':   '1GhvfB5cvZDpTlSy2CwNm4SXk-4biuEB2',
  '12-one-thing-well':                '1Mzi8UuClse_qaVpEazAfGlqzoW4vBliK',
  '13-stumpvision-cricket-academy':   '1CFztf83_ljuDb2CJPyzfhCErc1CXlS8K',
  '15-h&m-vs-tailored':               '1IRs_HQXKxr10Lzt7vd6h32I14x_t3c44',
  '17-pawstay-dog-boarding':          '19mvsEzH5qCd8omFiqUyaGD4vTBPifh2N',
  '18-transformation-theatre':        '1sb1PRkcgMNbPht43iWWfwawObcaf_Tdm',
  '20-karan-legal-lead-qualifier':    '1P14LbaskxPc9a86pi_4IKHl1qAu2IrQc',
  '22-earth-fire-product-builder':    '1rvQepyo-HgLxKjnLzGMoZqa3rnoc9cuF',
  '23-human-side-of-ai':              '18HM93svzXLQpqlEPpCXk3pLAQ8njsqTj',
  '24-kadak-chai-brand-world':        '1WpsD-eqQT8vuWOEiRyCCv-e6x6wZGS2H',
  '27-sugar-lane-bakery-orders':      '10bCcXFS1uib_ZwthmE2d5vsszdXpPUPK',
  '28-embarrassing-use-cases':        '1s8ytapAHE4bMC5p0W3YBhdvZN_xrYHGB',
  '30-meera-wellness-yoga-portal':    '1EeKQXmijgwgg9Sgg5bXMl9RUgEkDfQSA',
  '31-two-week-build-process':        '1Otey0WYK8C2OVl6L2Tt8PLK_2cntdhUT',
  '32-one-page-brief':                '1haWrjj3gLbtRfXGRStSn576utnpoHnbI',
  '34-done-means-adopted':            '1vjZr-50WO_p-vzO2Z8WOxSgiUsz4rH18',
  '37-thirty-second-demo-rule':       '1tIZBg5auVsqW6jRy7xrGqdtuqfMlTnrH',
  '38-our-stack':                     '1PiQi3blKo4LogiSMD4CbAYv8JD-yc2x8',
  '40-boring-tools-win':              '1PoRfT7X5UALj0nVPvbvDRLAvU9yaUEtC',
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) { console.error(`Missing env var: ${name}.`); process.exit(2); }
  return v;
}

type Drive = ReturnType<typeof google.drive>;

async function ensureFolderForSlug(drive: Drive, slug: string, rootId: string): Promise<string> {
  if (FOLDER_MAP[slug]) return FOLDER_MAP[slug];

  // Look for an existing folder with the slug name under rootId.
  const q = `'${rootId}' in parents and name='${slug.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const list = await drive.files.list({ q, fields: 'files(id, name)', pageSize: 1 });
  if (list.data.files && list.data.files.length) {
    return list.data.files[0].id!;
  }

  const created = await drive.files.create({
    requestBody: { name: slug, mimeType: 'application/vnd.google-apps.folder', parents: [rootId] },
    fields: 'id',
  });
  console.log(`CREATE folder ${slug} -> ${created.data.id}`);
  return created.data.id!;
}

async function upsertFile(drive: Drive, folderId: string, localPath: string): Promise<void> {
  const filename = localPath.split('/').pop()!;
  const list = await drive.files.list({
    q: `'${folderId}' in parents and name='${filename.replace(/'/g, "\\'")}' and trashed=false`,
    fields: 'files(id, name)',
    pageSize: 1,
  });

  const body = Readable.from(readFileSync(localPath));

  if (list.data.files && list.data.files.length) {
    const id = list.data.files[0].id!;
    await drive.files.update({
      fileId: id,
      media: { mimeType: 'image/png', body },
    });
    console.log(`UPDATE  ${filename} -> ${id}`);
  } else {
    const created = await drive.files.create({
      requestBody: { name: filename, parents: [folderId] },
      media: { mimeType: 'image/png', body },
      fields: 'id',
    });
    console.log(`CREATE  ${filename} -> ${created.data.id}`);
  }
}

async function main() {
  const email    = requireEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const keyRaw   = requireEnv('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
  const rootId   = requireEnv('DRIVE_GRAPHICS_ROOT_ID');
  const key      = keyRaw.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const drive = google.drive({ version: 'v3', auth });

  const outRoot = resolve(ROOT, 'output');
  const slugs = readdirSync(outRoot).filter(d => {
    try { return statSync(resolve(outRoot, d)).isDirectory(); }
    catch { return false; }
  });

  for (const slug of slugs) {
    const folderId = await ensureFolderForSlug(drive, slug, rootId);
    const files = readdirSync(resolve(outRoot, slug))
      .filter(f => f.endsWith('.png'))
      .sort();
    for (const f of files) {
      await upsertFile(drive, folderId, resolve(outRoot, slug, f));
    }
  }
  console.log('\nDone syncing to Drive.');
}

main().catch(e => { console.error(e); process.exit(1); });
