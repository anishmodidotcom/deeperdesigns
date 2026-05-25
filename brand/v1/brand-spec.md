# Deeper Designs · Brand v1

A short, opinionated spec. The system is editorial-meets-OS: type does most of the work, the monogram is the one geometric signature, and per-showcase accents stay locked to the work that owns them.

## 1. Logo

### Wordmark — "DEEPER DESIGNS"

- Geist Sans, weight 600, all caps, letter-spacing `0.16em`.
- Three locked colors: `#F5F5F5` (white), `#0A0A0A` (black), `#6366F1` (indigo).
- Clearspace: minimum `0.5x` cap height on all sides.
- Minimum render size: 88px wide (any smaller, use the monogram).
- Files: `logo/logo-wordmark-{white,black,indigo}.svg`.
- For print or environments without Geist available, convert text to outlines before export.

### Monogram — "DD"

A stencil-cut DD on a 64×32 grid. Two geometric Ds with a single horizontal cut through the midline.

- The cut is the signature. It maps the brand idea ("deeper") to a cross-section line, and reads as a UI grid moment at the same time.
- Strokes are uniform thickness; the inner counter is concentric with the outer profile.
- Works at 16px (the cut becomes a 1px slit) through to display sizes.
- Files: `logo/monogram-primary.svg`, plus pre-composed app/social variants in `assets/`.
- Scale test: `logo/monogram-scales-preview.svg` shows the mark at 16/32/64/128/256/512px on a single sheet.

The monogram uses `fill="currentColor"` in `monogram-primary.svg` so inline SVG embeds inherit the surrounding text color. Pre-composed assets (favicons, social) bake colors in.

### Brand glyph

Not shipped in v1. The stencil cut already does the signature work; a separate glyph would dilute it. Revisit in v2 if a section-break mark is genuinely needed.

## 2. Color

Anchor on near-black, surfaces in three steps, text in four. Two brand accents — indigo for primary actions and editorial moments, signal green for action confirmations and WhatsApp. Per-showcase accents are locked one-to-one to the showcase that owns them.

See `tokens.css` for the full set. Live swatch sheet at `palette/swatch-sheet.svg` (renders at `preview/swatch-sheet.png`).

| Role | Token | Hex |
|---|---|---|
| Page background | `--dd-bg` | `#0A0A0A` |
| Card / panel | `--dd-surface-1` | `#111111` |
| Nested card | `--dd-surface-2` | `#161616` |
| Text high | `--dd-text-high` | `#F5F5F5` |
| Text mid | `--dd-text-mid` | `#A8A8A8` |
| Text low | `--dd-text-low` | `#6B6B6B` |
| Primary brand | `--dd-indigo` | `#6366F1` |
| Signal / action | `--dd-signal` | `#25D366` |

All 21 showcase accents are namespaced `--dd-acc-<slug>` and locked to the slug. Do not reuse one showcase's accent on a different page.

Rules: 6-digit hex only. Use `rgba()` for transparency. No 8-digit alpha hex. No full-bleed gradient backgrounds.

## 3. Typography

Three families.

- **Geist Sans** — display, headings, body. Sets the brand voice.
- **Geist Mono** — eyebrows, captions, code, labels. Uppercase + `0.18em` tracking for eyebrows.
- **Instrument Serif italic** — editorial moments, pull quotes, the one italic phrase that sits inside a sans-serif block. Sparingly.

Type spec page: `type/type-spec.html` — open in a browser to see each role at its real size.

Roles (see `tokens.css` for tokens):

| Role | Family | Size | Weight | Letter-spacing |
|---|---|---|---|---|
| Display | Geist | 64–96 | 600 | `-0.03em` |
| Heading 1 | Geist | 40–64 | 600 | `-0.02em` |
| Heading 2 | Geist | 28–44 | 600 | `-0.02em` |
| Heading 3 | Geist | 20–28 | 500 | `-0.01em` |
| Editorial | Instrument Serif italic | 36–56 | 400 | `-0.01em` |
| Body L | Geist | 18 | 400 | 0 |
| Body M | Geist | 16 | 400 | 0 |
| Eyebrow | Geist Mono | 12 | 500 | `+0.18em`, UPPERCASE |
| Caption | Geist Mono | 11 | 400 | `+0.08em` |

## 4. Motion

Three signature behaviours; no others. Implementations live in the site code.

**A. Thinking reveal.** Block text reveals one line at a time on scroll. Each line: opacity 0 → 1, y `+6px` → `0`, duration `600ms`, ease `cubic-bezier(0.16, 1, 0.3, 1)`. When the line includes an italic editorial fragment, the italic also fades in on the same beat; no underline draw.
- Code: `motion/react` declarative reveals in section components; see `app/work/*/Hero.tsx` MaskReveal / WordReveal patterns.

**B. System hover.** Interactive elements feel like a UI component, not a marketing animation. Duration `150ms`, ease `var(--dd-ease-out)`. Allowed transitions: `color`, `border-color`, `background`, `opacity`. Disallowed: `transform: scale`, bounce easings, hover sweeps.
- Code: `transition: <prop> 150ms var(--dd-ease-out)` inline on the element.

**C. OS transition.** Section enter on scroll feels software-like. Subtle parallax, never more than `20px` of movement. No long fade-ins, no zoom. Sections use `whileInView` with `amount: 0.2..0.4`, `y: 16 → 0`, duration `700–900ms`, ease `cubic-bezier(0.7, 0, 0.2, 1)`.
- Code: `motion.div` + `whileInView` per section. ScrollTrigger only when scrubbing a real value (e.g. counter), never for decoration.

Reduced motion: all three behaviours collapse to instant on `prefers-reduced-motion: reduce`. Already wired in `app/globals.css`.

## 5. Asset inventory

Everything in this folder. Source SVGs are canonical; PNGs are pre-rendered for upload.

```
brand/v1/
├── brand-spec.md                      this file
├── tokens.css                         canonical CSS tokens
├── rasterize.mjs                      Sharp script to regenerate PNGs
├── logo/
│   ├── logo-wordmark-white.svg
│   ├── logo-wordmark-black.svg
│   ├── logo-wordmark-indigo.svg
│   ├── monogram-primary.svg
│   └── monogram-scales-preview.svg
├── palette/
│   └── swatch-sheet.svg
├── type/
│   └── type-spec.html
├── assets/
│   ├── favicon-16.svg / .png
│   ├── favicon-32.svg / .png
│   ├── favicon.ico                    (= favicon-32.png; modern browsers also accept PNG)
│   ├── apple-touch-180.svg / .png
│   ├── instagram-avatar-indigo.svg / .png
│   ├── instagram-avatar-dark.svg / .png
│   ├── whatsapp-profile.svg / .png
│   ├── linkedin-banner.svg / .png
│   ├── twitter-header.svg / .png
│   ├── og-image-template.svg / .png
│   ├── notion-header.svg / .png
│   ├── video-signoff-frame.svg / .png
│   └── email-signature.html
└── preview/
    ├── monogram-primary.png
    ├── monogram-scales-preview.png
    ├── logo-wordmark-{white,black,indigo}.png
    └── swatch-sheet.png
```

To regenerate PNGs after editing an SVG: `node brand/v1/rasterize.mjs`.

## 6. File naming

- Lowercase, kebab-case, no spaces.
- SVG is the source. PNG is the export.
- Per-showcase assets, when made: `<asset>-<slug>.<ext>` (e.g. `og-malabar-spice.png`).
- Versioned: future revisions go under `brand/v2/`, never overwriting v1.

## 7. Do's and don'ts

Do:
- Pair Geist + Instrument Serif italic for editorial moments.
- Keep the monogram and wordmark separate. Never lock them up into a single composite unless the layout demands it (banners only).
- Let one showcase accent dominate its page; never combine two.

Don't:
- Add a "Studio" badge or any agency-style sub-mark.
- Use the per-showcase accent on a page that doesn't own it.
- Apply gradients to the monogram. The monogram is a single flat fill.
- Drop the stencil cut on small sizes; it stays even at 16px.
- Ship 8-digit alpha hexes in tokens.

## 8. Next

This is v1, locked. Edits land via PRs that increment to `brand/v2/`. The first changes likely to land:
- Outlined wordmark SVGs (text-to-path) for print-grade portability.
- A true multi-size `favicon.ico` once a non-Sharp encoder is wired into the build.
- An "Anish portrait" treatment paired with the monogram for personal-account use.
