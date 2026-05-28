# DD Content Engine

A small headless pipeline that produces brand-tight LinkedIn graphics from a Google Sheet of post briefs and uploads them to Google Drive. Lives outside the Next.js app — never imported by `/app`, never deployed by Vercel.

```
Sheet ──sync-from-sheet──> vault/*.json
                              │
                              ▼
                       parse-brief ──> templates (satori) ──> PNG
                              │
                              ▼
                  output/{NN-slug}/*.png
                              │
                              ▼
                       Drive folder per slug
```

## Brand standard (all graphics conform)

- Background `#0A0A0A`. Text in Geist (sans) and Instrument Serif italic. Mono labels in Geist Mono.
- Per-topic accent picked deterministically by slug; see `lib/tokens.ts` (`ACCENT_BY_SLUG` + `accentForSlug`).
- DD monogram bottom-right on every panel; wordmark on statement cards and CTAs.
- No em dashes, no emojis, no concept-brand names. The parser strips both.
- 1080×1080 canvas (LinkedIn square).

## Setup (one-off per machine)

1. `npm install` from this directory.
2. Copy `.env.example` to `.env` and populate:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — service account address.
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` — full PEM. Escaped `\n` is fine; the script de-escapes.
   - `VAULT_SHEET_ID` — already pre-filled in `.env.example`, kept for clarity.
   - `DRIVE_GRAPHICS_ROOT_ID` — same.
3. In Drive UI: share the brief Sheet (`VAULT_SHEET_ID`) and the graphics root folder (`DRIVE_GRAPHICS_ROOT_ID`) with the service-account email as **Editor**.
4. `npm run setup-fonts` — downloads six TTFs (Geist Regular + SemiBold, Geist Mono Regular + Medium, Instrument Serif Regular + Italic) into `fonts/`. The directory is git-ignored. The render pipeline cannot run without these.

## Commands

| Command | What it does |
|---|---|
| `npm run setup-fonts` | Download brand fonts. Idempotent — skips files already present and ≥ 10KB. |
| `npm run sync-from-sheet` | Pull all rows from the brief sheet into `vault/*.json` (one file per post). |
| `npm run generate-one -- --slug=03-tool-before-problem-mistake` | Render one post only. Use this for review. |
| `npm run generate` | Render every vault entry. Writes `output/{slug}/*.png` + `manifest.json`. Exits non-zero if any post wrote an `ERROR.txt`. |
| `npm run sync-to-drive` | Upload `output/**/*.png` to Drive. Uses the pre-mapped folder ids when known; creates a subfolder under the graphics root for text-format posts otherwise. Updates existing files in place. |
| `npm run all` | Convenience: install (if needed) → fonts → sync sheet → generate → upload. |

## Adding a post

1. Add a row to the brief Sheet.
2. `npm run all`.

## Retuning the brand

Edit `lib/tokens.ts` (colors, type scale, accent map). Re-run `npm run generate` to regenerate every post.

## Font sourcing note

Geist, Geist Mono, and Instrument Serif are all on Google Fonts (free). The site loads them via `next/font/google` at request time. This engine renders outside Next.js, so it downloads its own copies from `github.com/google/fonts` raw URLs at setup. If the download script fails, the engine refuses to render — silent fallback to a system font would produce subtly off-brand graphics.

## Phase 2 (not in this build)

For posts that need a live product mockup as a panel, the next iteration will run Playwright against the deployed site, navigate to the named signature component (e.g. `app/work/hivedesk/Dashboard.tsx`), and screenshot the element. Phase 1 uses only directly importable image assets — `public/images/_ambient/*.webp`, `public/images/maplelens/*.webp`, and the brand marks in `brand/v1/`.

## Guardrails (built in)

- The font loader throws a clear error if any of the six TTFs is missing.
- The asset loader logs missing paths and degrades to a text-only panel if an image asset isn't available — never ships a broken image.
- The parser flags unclassifiable panels in `output/{slug}/ERROR.txt` but still renders every panel it can.
- The Sheet sync skips rows with empty Slug.
- The Drive sync updates existing files in place rather than creating duplicates.
