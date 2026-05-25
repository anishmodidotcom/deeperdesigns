# Deeper Designs · Brand v1 · Colors

Canonical hex reference. Derived from `app/globals.css` (the live site) and `brand/v1/tokens.css` (the brand system). Where the two diverged, `tokens.css` was made source-of-truth and supersedes the legacy names in `app/globals.css`.

## Core palette

Used across every marketing page (`/`, `/about`, `/services`, `/process`, `/start-your-study`), the global nav and footer, and as the default for any page that doesn't override.

| Name | CSS variable | Hex | Usage |
|---|---|---|---|
| Background | `--dd-bg` (legacy `--bg`) | `#0A0A0A` | Page background on dark pages. Default for marketing surfaces. |
| Surface 1 | `--dd-surface-1` (legacy `--bg-elev`) | `#111111` | Cards, panels, navigation chrome. First step up from bg. |
| Surface 2 | `--dd-surface-2` (legacy `--bg-card`) | `#161616` | Nested cards, dashboard cells, wells inside a Surface 1. |
| Surface 3 | `--dd-surface-3` | `#1F1F1F` | Hover lift, focus-ring backing. New in brand v1; not yet in `globals.css`. |
| Text high | `--dd-text-high` (legacy `--fg`) | `#F5F5F5` | Primary text on dark. |
| Text mid | `--dd-text-mid` (legacy `--fg-muted`) | `#A8A8A8` | Secondary text, body paragraphs. |
| Text low | `--dd-text-low` (legacy `--fg-dim`) | `#6B6B6B` | Captions, eyebrows on dark, deemphasised UI. |
| Text faint | `--dd-text-faint` | `#3A3A3A` | Disabled text, dimmed labels. |
| Bg light | `--dd-bg-light` | `#FAFAF7` | Light-mode background for showcase pages designed on light. |
| Text on light | `--dd-text-on-light` | `#0A0A0A` | Body text on light surfaces. |
| Bone | `--dd-bone` | `#F5F4EF` | Warm off-white for editorial moments and quote blocks. |
| Graphite | `--dd-graphite` | `#2A2A2A` | Dark accent for inverted blocks and rules. |

### Brand accents

| Name | CSS variable | Hex | Usage |
|---|---|---|---|
| DD Indigo | `--dd-indigo` (legacy `--accent`) | `#6366F1` | Primary brand color. Eyebrows, links, italic accent text, monogram tint on marketing assets. |
| DD Indigo Deep | `--dd-indigo-deep` (legacy `--accent-dim`) | `#4F46E5` | Hover and pressed states for indigo elements. |
| DD Indigo Soft | `--dd-indigo-soft` | `#818CF8` | Subtle lift / glow against dark surfaces. |
| DD Signal | `--dd-signal` (legacy `--whatsapp`) | `#25D366` | Secondary action color. WhatsApp "Talk to us" CTA, success states. |
| DD Signal Deep | `--dd-signal-deep` (legacy `--whatsapp-hover`) | `#1FB855` | Hover state for signal-colored CTAs. |

### Borders

| Name | CSS variable | Value | Usage |
|---|---|---|---|
| Border | `--dd-border` | `rgba(255,255,255,0.08)` | Default hairline divider on dark. |
| Border strong | `--dd-border-strong` | `rgba(255,255,255,0.16)` | Stronger divider, outline buttons. |

Borders use `rgba()` functional syntax intentionally. No 8-digit alpha hexes in the system.

## Per-showcase signature colors

Each of the 21 showcases owns one signature accent. The accent is set on the page wrapper via `--page-accent` in `app/work/{slug}/page.tsx` and consumed through `var(--page-accent)` in every section component of that showcase. The brand token `--dd-acc-{slug}` codifies the same hex so the color can also be referenced from outside the showcase (e.g., a gallery card preview that needs the showcase's color).

| Showcase | Accent name | Hex | Token | Set in | Consumed in |
|---|---|---|---|---|---|
| maplelens | Sand brown | `#C8956D` | `--dd-acc-maplelens` | `app/work/maplelens/page.tsx` | 8 components (Hero, IdeaInPlay, FactGrid, MaplelensFooter, NextProject, Pricing, RemediedThree, ScrollTour) |
| veda-glow | Amber gold | `#D4A574` | `--dd-acc-veda-glow` | `app/work/veda-glow/page.tsx` | 7 components (Hero, Routine, IngredientShelf, Footer, AboutBuild, NextProject, Numbers) |
| bharat-steel | Industrial blue | `#3B82F6` | `--dd-acc-bharat-steel` | `app/work/bharat-steel/page.tsx` | 9 components (Hero, Dispatch, Inventory, Quote, AboutBuild, Numbers, NextProject, etc.) |
| meera-wellness | Sage green | `#5B7F6E` | `--dd-acc-meera-wellness` | `app/work/meera-wellness/page.tsx` | 11 components (Hero, Programs, Stories, Pricing, etc.) |
| zaatar-republic | Harissa orange | `#E85D2A` | `--dd-acc-zaatar-republic` | `app/work/zaatar-republic/page.tsx` | 7 components (Hero, Menu, Kitchen, Numbers, NextProject, etc.) |
| studio-noor | Lilac dusk | `#9B7EC8` | `--dd-acc-studio-noor` | `app/work/studio-noor/page.tsx` | 7 components (Hero, Walkthrough, Process, etc.) |
| smilefirst | Clinical jade | `#0FA89A` | `--dd-acc-smilefirst` | `app/work/smilefirst/page.tsx` | 7 components (Hero, Booking, Treatments, etc.) |
| autobazaar | Showroom cyan | `#22D3EE` | `--dd-acc-autobazaar` | `app/work/autobazaar/page.tsx` | 8 components (Hero, Inventory, Finance, etc.) |
| stumpvision | Turf green | `#4ADE80` | `--dd-acc-stumpvision` | `app/work/stumpvision/page.tsx` | 7 components (Hero, Academy, MatchAnalysis, etc.) |
| oud-and-ember | Burnished brass | `#C9A84C` | `--dd-acc-oud-and-ember` | `app/work/oud-and-ember/page.tsx` | 10 components (Hero, Metrics, ProductGrid, etc.) |
| hivedesk | Desk violet | `#8B5CF6` | `--dd-acc-hivedesk` | `app/work/hivedesk/page.tsx` | 11 components (Hero, Dashboard, Occupancy, Members, etc.) |
| malabar-spice | Turmeric | `#E89B2D` | `--dd-acc-malabar-spice` | `app/work/malabar-spice/page.tsx` | 9 components (Hero, Archive, Heritage, NextProject, etc.) |
| pawstay | Paw amber | `#E8A557` | `--dd-acc-pawstay` | `app/work/pawstay/page.tsx` | 11 components (Hero, Booking, Care, Staff, etc.) |
| sahaja-farms | Harvest gold | `#D4A537` | `--dd-acc-sahaja-farms` | `app/work/sahaja-farms/page.tsx` | 10 components (Hero, Dashboard, Stories, etc.) |
| karan-legal | Counsel black | `#1A1A1A` | `--dd-acc-karan-legal` | `app/work/karan-legal/page.tsx` | 1 component (page wrapper; karan-legal also uses `--page-oxblood: #8B0000` as a secondary accent) |
| zara-fitness | Acid lime | `#D7FF5C` | `--dd-acc-zara-fitness` | `app/work/zara-fitness/page.tsx` | 10 components (Hero, Programs, ProductLine, etc.) |
| earth-and-fire | Kiln rust | `#B85530` | `--dd-acc-earth-and-fire` | `app/work/earth-and-fire/page.tsx` | 11 components (Hero, Kiln, Pieces, etc.) |
| kadak-chai | Boiled chai | `#C9803A` | `--dd-acc-kadak-chai` | `app/work/kadak-chai/page.tsx` | 10 components (Hero, Counter, Map, etc.) |
| nomad-trails | Dust red | `#C44536` | `--dd-acc-nomad-trails` | `app/work/nomad-trails/page.tsx` | 7 components (Hero, Routes, Stories, etc.) |
| sugar-lane | Berry plum | `#A14A5C` | `--dd-acc-sugar-lane` | `app/work/sugar-lane/page.tsx` | 8 components (Hero, Cake, Order, etc.) |
| brightpath | Mentor gold | `#D4A857` | `--dd-acc-brightpath` | `app/work/brightpath/page.tsx` | 9 components (Hero, Mentors, Path, etc.) |

In addition to `--page-accent`, each showcase wrapper also sets:
- `--page-bg` — showcase-tinted dark or light background (varies; see each slug's `page.tsx`)
- `--page-text`, `--page-text-2`, `--page-text-3` — local text steps
- `--page-border` — local hairline
- Some showcases additionally define `--page-accent-deep`, `--page-surface-{1..3}`, or one-off named colors for that showcase's world (`--page-oxblood` on karan-legal, `--page-bone` on several, etc.)

These showcase-internal tokens are not part of the brand palette. They are the world-build of that particular project. The brand palette only governs `--dd-acc-{slug}` and the Core palette above.

## Usage rules

**Pair these.**
- DD Indigo with DD Bone or Text high — for editorial moments where italic indigo (Instrument Serif) sits inside a sans-serif paragraph.
- DD Signal with near-black text (#0F2A1B works well as the foreground inside a signal pill) — for high-contrast CTAs.
- Any showcase accent with its own local bg, text, and border tokens — never reach across.

**Don't.**
- Don't reuse one showcase's accent on another showcase. The accents are locked one-to-one; bharat-steel blue belongs to bharat-steel.
- Don't apply DD Indigo to dashboard or product mockup interiors. Indigo is brand chrome (eyebrows, links, accents), not product UI.
- Don't gradient between brand colors. The brand uses one flat color at a time. (Per-showcase pages may use gradients inside their world; the brand chrome does not.)
- Don't add new colors to the Core palette without a v2 review. Per-showcase accents come from the showcase, not the brand.

**Accents are reserved.**
- DD Indigo: brand primary. Use only on brand chrome (nav, marketing pages, gallery, monogram tints, OG/social).
- DD Signal: action confirmations, WhatsApp CTAs, success states.
- All `--dd-acc-{slug}` tokens: only render on a page that is about that slug (the slug's own work page, the gallery card linking to it, an OG image for that slug, or an internal asset referencing it).

## tokens.css vs live site

Audit performed during this doc. No conflicts found.

- All 21 per-showcase accents in `tokens.css` match the `"--page-accent"` values rendered from `app/work/{slug}/page.tsx`. Verified by direct grep against the source.
- All Core palette colors in `tokens.css` are either exact matches to `app/globals.css` (under their legacy names) or new tokens that extend the system (Surface 3, Text faint, Indigo Soft, Bone, Graphite, Bg light, Text on light). No contradictions.

Going forward: when a discrepancy arises, `tokens.css` is the source-of-truth. Update `app/globals.css` to match.
