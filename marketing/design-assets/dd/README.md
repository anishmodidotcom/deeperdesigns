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
- `site-screenshots/` - v28.2. Full-page captures of the live site, desktop
  (1920) and mobile (390), two files per page. These are verbatim page
  captures, not curated imagery, so they are governed by the site-screenshot
  scope note below rather than by the Part A to C hard rules.
- `manifest.json` - one record per asset:
  `{ filename, type (ui | generated | texture | site-screenshot), tag,
  dimensions, best_use }`.

Counts: 29 UI captures, 234 existing generated images, 11 new hero and texture
files (ten assets, with the gradient mesh exported at both 1080x1350 and
1080x1920), and 42 site screenshots across 21 pages.

## DD palette (live-site values)

Use these exact values. They are the production DD palette and correct the
marketing handoff, which listed an older indigo and amber.

- Base near-black: `#0A0A0B`
- Indigo (primary accent): `#7C6CFF`  (handoff said `#6366F1`; that hex is the
  Outpost sub-brand accent, not DD. DD uses `#7C6CFF` everywhere.)
- Amber / gold (secondary accent): `#F5B544`  (handoff said `#D4A053`; unused on
  the live site.)
- Off-white ink: `#F5F3EF`

## Site screenshots (v28.2) and how they sit against the hard rules

`site-screenshots/` is a different kind of asset from Parts A to C. Those are
curated pieces chosen for reuse in marketing. These are faithful records of
what the live site looked like at a point in time, for layout, spacing and
responsive reference. A faithful record cannot also be curated, so two of the
hard rules below do not apply to this folder, and the difference is written
down here rather than left to be discovered:

- Currency. Twelve of the 42 files show prices, because six of the captured
  pages publish prices: `/`, `/services`, `/what-software-costs`,
  `/software/crm`, `/work/outpost` and `/work/maplelens`. Removing them would
  make the screenshot a fiction. Use these files for layout reference. Do not
  crop a priced panel out of one and drop it into a social graphic, which is
  what the no-currency rule exists to prevent.
- Sub-brands. Four product pages are captured, three of which are sub-brands
  the curated bank deliberately holds back: Outpost, Oviya Studio and Deeper
  Content, plus DD's own MapleLens. They are here as page-layout reference for
  the DD site that hosts them, not as sub-brand imagery. Checked at capture
  time: no teal `#0F766E` appears in any of the four, so the teal rule still
  holds across the whole bank.

The other hard rules are unaffected. No text was baked into any capture, no
faces appear, and no filename or manifest string uses an emoji or an em dash.

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
   showcase imagery), `texture` (the new DD hero and texture backgrounds),
   `site-screenshot` (full-page captures of the live site).
3. Industry or subject: the `tag` field carries the industry (`logistics`,
   `jewellery`, `clinics`, ...), the showcase or product slug (`veda-glow`,
   `maplelens`, ...), `universal` for backgrounds that suit any context, or,
   for site screenshots, the page slug (`home`, `trust`, `software-crm`,
   `business-traders`, `work-outpost`, ...).

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
- v28.2: `/marketing/` is also listed in `.gitignore`, added in v25.5 to stop
  the tracked-binary total growing. Files already tracked when that rule landed
  stay tracked, which is why this bank still has history, but anything new here
  is invisible to a plain `git add` and has to be added with `git add -f`.
  Remember that when adding assets, or they will look committed and will not be.
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
