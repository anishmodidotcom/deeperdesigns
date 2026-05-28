# DD Content Engine

A small headless pipeline that turns brief rows into brand-tight LinkedIn graphics.

**The repo is the asset store.** Generated PNGs are committed under `output/{NN-slug}/` and surfaced to downstream tasks via the `raw_base_url` in each post's `manifest.json` (a `raw.githubusercontent.com` URL on this branch). The Google Drive uploader is preserved (`scripts/sync-to-drive.ts`) but is not in the critical path.

```
vault-seed.json ──sync-from-seed──> vault/{NN-slug}.json
                                          │
                                          ▼
                                   parse-brief ──> templates (satori) ──> PNG
                                          │
                                          ▼
                              output/{NN-slug}/card.png   or   panel-NN.png
                              output/{NN-slug}/manifest.json
                                          │
                                          ▼
                                   git commit + push
                                          │
                                          ▼
                            raw.githubusercontent.com URLs
                            (cited from manifest.json)
```

## Brand standard (all graphics conform)

- Background `#0A0A0A`. Text in Geist (sans) and Instrument Serif italic. Mono labels in Geist Mono.
- Per-topic accent picked deterministically by slug; see `lib/tokens.ts` (`ACCENT_BY_SLUG` + `accentForSlug`).
- DD monogram bottom-right on every content/hook/stat/image panel; wordmark on statement cards and CTAs.
- No em dashes, no emojis, no concept-brand names. The parser strips all three.
- 1080×1080 canvas (LinkedIn square).

## Setup (one-off per machine)

1. `npm install` from this directory.
2. `npm run setup-fonts` — downloads six TTFs (Geist Regular + SemiBold, Geist Mono Regular + Medium, Instrument Serif Regular + Italic) into `fonts/`. The directory is git-ignored. The render pipeline cannot run without these.
3. Paste the 40 post rows as a JSON array into `vault-seed.json` (alongside `package.json`).

`.env` is only needed for the Google paths (`sync-from-sheet`, `sync-to-drive`). Neither is in the critical path now.

## Commands

| Command | What it does |
|---|---|
| `npm run setup-fonts` | Download brand fonts. Idempotent — skips files already present and ≥ 10KB. |
| `npm run sync-from-seed` | Read `vault-seed.json` → write one `vault/{NN-slug}.json` per row. **The current path.** |
| `npm run sync-from-sheet` | (Optional, Sheets API alternative.) Pull rows from the brief Sheet via service account. Requires `.env`. |
| `npm run generate-one -- --slug=03-tool-before-problem-mistake` | Render one post only. Use this for review. |
| `npm run generate` | Render every vault entry. Writes `output/{slug}/*.png` + `manifest.json`. Exits non-zero if any post wrote an `ERROR.txt`. |
| `npm run sync-to-drive` | (Optional.) Upload `output/**/*.png` to Drive. Not in the critical path. |
| `npm run all` | install (if needed) → fonts → sync seed → generate. |

## `output/{NN-slug}/manifest.json` shape

```json
{
  "post_number": 3,
  "slug": "tool-before-problem-mistake",
  "format": "statement-card",
  "files": ["card.png"],
  "panel_count": 1,
  "raw_base_url": "https://raw.githubusercontent.com/anishmodidotcom/deeperdesigns/feat/content-engine/marketing/content-engine/output/03-tool-before-problem-mistake",
  "accent": "#6366F1",
  "errors": []
}
```

Downstream tasks fetch each file as `{raw_base_url}/{filename}`.

## Adding / updating a post

1. Edit `vault-seed.json`.
2. `npm run sync-from-seed && npm run generate`.
3. Commit `output/{NN-slug}/`. Push.

## Retuning the brand

Edit `lib/tokens.ts` (colors, type scale, accent map). Re-run `npm run generate` to regenerate every post and commit the new PNGs.

## Font sourcing note

Geist + Geist Mono are pulled from the upstream Vercel `geist-font` repo as static WOFF2 instances and decoded to TTF via `wawoff2`. (Google Fonts only ships these as variable `.ttf`, and Satori's bundled opentype parser throws on their fvar tables.) Instrument Serif is fetched as a true static TTF from `google/fonts`. Same source intent, different distribution; the end-state TTFs satisfy Satori.

## Guardrails (built in)

- The font loader throws a clear error if any of the six TTFs is missing.
- The asset loader logs missing paths and degrades to a text-only panel if an image asset isn't available — never ships a broken image.
- The parser flags unclassifiable panels in `output/{slug}/ERROR.txt` but still renders every panel it can.
- The seed sync skips rows with empty Slug; warns on duplicate filenames.
- Concept-brand tokens (Hivedesk, Zaatar Republic, etc.) are stripped from labels so renders stay brand-agnostic.

## Phase 2 (not in this build)

For posts that need a live product mockup as a panel, a later iteration will run Playwright against the deployed site, navigate to the named signature component (e.g. `app/work/hivedesk/Dashboard.tsx`), and screenshot the element. Phase 1 uses only directly importable assets — `public/images/_ambient/*.webp`, `public/images/maplelens/*.webp`, and the brand marks in `brand/v1/logo/`.
