# Deeper Designs asset bank

A tagged bank of Deeper Designs (DD) brand assets for Claude Design to ingest.
DD brand only: dark, premium, operator. This bank covers three things: clean
captures of the UI that DD builds, the generated imagery already used across
DD work, and ten new DD hero and texture assets.

## What is here

- `ui-screenshots/` - Part A. Clean UI reference captures (dashboards, WhatsApp
  flows, before and after tools), full shots plus tight accent crops. No browser
  chrome, no currency figures.
- `generated-images/` - Parts B and C. Existing generated imagery (studio
  shoots, try-ons, food, staged rooms, on-model fashion, car and property
  stills, ambient backgrounds) plus the ten new DD hero and texture assets.
- `manifest.json` - one record per asset:
  `{ filename, type (ui | generated | texture), tag, dimensions, best_use }`.

Counts: 29 UI captures, 234 existing generated images, 11 new hero and texture
files (ten assets, with the gradient mesh exported at both 1080x1350 and
1080x1920).

## DD palette (live-site values)

Use these exact values. They are the production DD palette and correct the
marketing handoff, which listed an older indigo and amber.

- Base near-black: `#0A0A0B`
- Indigo (primary accent): `#7C6CFF`  (handoff said `#6366F1`; that hex is the
  Outpost sub-brand accent, not DD. DD uses `#7C6CFF` everywhere.)
- Amber / gold (secondary accent): `#F5B544`  (handoff said `#D4A053`; unused on
  the live site.)
- Off-white ink: `#F5F3EF`

## Hard rules for DD assets

- DD brand only. This is not CGE / Deeper Content, Outpost, or Oviya Studio.
  Those sub-brands get their own dedicated banks later.
- No teal `#0F766E` or its family. Teal is CGE-only, a separate sub-brand.
- No currency figures visible in any UI screenshot.
- No text baked into generated images. No faces in generated images.
- No emojis. No em dashes in filenames or manifest strings.

## Native patterns to build in-design, not here (Part D)

The DD design-system package should include a set of native background
treatments, built in-design in the DD palette, not generated as image files:
flat and radial gradients, dot grids, fine line fields, gradient meshes,
organic blobs, and geometric tessellations. Those are cheaper, sharper, and
fully controllable as code or vectors, so this bank does not ship raster
versions of them. The generated `gen_gradient_mesh` here is a reference mood,
not a substitute for the native treatment.

## How to organize on ingest

Organize by brand, then type, then industry:

1. Brand: everything here is DD. Keep it separate from future sub-brand banks.
2. Type: `ui` (portfolio interface reference), `generated` (photographic and
   showcase imagery), `texture` (the new DD hero and texture backgrounds).
3. Industry or subject: the `tag` field carries the industry (`logistics`,
   `jewellery`, `clinics`, ...), the showcase or product slug (`veda-glow`,
   `maplelens`, ...), or `universal` for backgrounds that suit any context.

The `best_use` field on each record is a one-line hint for where the asset fits.

## Access

The bank is committed to the repo, so every asset is reachable at a raw URL:

```
https://raw.githubusercontent.com/anishmodidotcom/deeperdesigns/v24/marketing/design-assets/dd/<path-from-manifest>
```

## Scope notes and decisions

- This bank deliberately writes under `marketing/`, which is normally excluded
  from the site build (`tsconfig.json` and `.vercelignore` both exclude
  `marketing/`). Nothing else under `marketing/` was touched, and the exclusion
  still holds, so none of this enters the Next.js site build.
- Currency: DD's industry UI demos show `Rs` figures in many transactional
  screens. Per the no-currency rule, 18 currency-bearing UI screenshots were
  held out of the bank. Automotive and hotels, whose only full shots carried
  currency, are represented by currency-free accent crops instead, so all
  thirteen industries still appear.
- Sub-brands: per the DD-only scope, the Outpost, Oviya Studio, and Deeper
  Content product-page heroes and imagery were excluded (separate banks later).
  MapleLens, DD's own product, is included. Part A of the brief listed the four
  product pages; they were held back here to honor the DD-only hard rule.
- Existing generated images were deduplicated by exact content hash; the
  highest-resolution copy of each was kept.
- The ten new assets were generated with the locked Gemini pipeline in the
  corrected DD palette, with no teal, no text, and no faces. The generation key
  was passed only through the environment and is not stored in this bank, the
  scripts, or any commit.
