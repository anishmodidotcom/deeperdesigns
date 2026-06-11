# Sid on Stage. Asset Slot Map

Last extraction pass: 2026-06-11. Source: `reference/siddhant-profile.pdf` (3.5 MB, 37 embedded rasters, 28 kept after upscale).

## Hero
- Hero portrait: `public/assets/extracted/hero/main.webp` (from img-000-016, 2478x3538). FILLED.
- Hero video: `public/videos/hero/hero-loop.mp4` (Veo 3.1 Fast, 8s, 16:9, image-to-video on hero portrait, 2.1 MB). FILLED.
- Hero poster: `public/videos/hero/hero-poster.webp` (sharp-cropped from first-frame photo, 1920x1080). FILLED.

## About
- About portrait: `public/assets/extracted/portraits/01.webp` (from img-000-014). FILLED.

## Work galleries
- Corporate Presenter: `public/assets/extracted/corporate/*.webp` (11 files: 01-stage, 02-mic, 03-suit, 04-stage, 05-marketsphere, 06-group, 07-encora, 08-onstage, 09-titan, 10-interview, 11-preview). FILLED.
- Team Building Facilitator: `public/assets/extracted/teambuilding/*.webp`. EMPTY (PDF contained no clearly team-building shots; the page renders a styled fallback). Drop in new photos by filename to populate.
- Sports Presenter: `public/assets/extracted/sports/*.webp`. EMPTY (PDF contained no sports shots). Same fallback rule.

## Trusted by
- Brand logos: `public/assets/extracted/logos/wall-row-1.webp` and `wall-row-2.webp` (composite logo walls extracted as single rasters from the PDF; cannot be cleanly split into individual logos without per-tile cropping). FILLED with composites. For the premium look the spec describes (individual logos in marquee rows), drop SVGs or transparent PNGs into the same folder and they replace the composites automatically (the manifest scans the folder by filename).

## Testimonials
- Author avatars: `public/assets/extracted/testimonials/*.webp`. EMPTY. The testimonial cards render without avatars; drop in headshots later if desired.

## Atmospheric stills
All generated via Nano Banana (Gemini 2.5 Flash Image), 6 of 7 succeeded. Spend: $0.234.
- Spotlight cone: `public/assets/atmos/spotlight-cone.webp` (1600x1600). FILLED.
- Haze 1: `public/assets/atmos/haze-1.webp` (1920x1080). FILLED.
- Haze 2: `public/assets/atmos/haze-2.webp` (1920x1080). FILLED.
- Bokeh blue: `public/assets/atmos/bokeh-blue.webp` (1920x1080). FILLED.
- Light beams: `public/assets/atmos/light-beams.webp` (1920x1080). FILLED.
- Particles: `public/assets/atmos/particles.webp` (1920x1080). FILLED.
- Grain texture: PENDING. Gemini returned `IMAGE_RECITATION` on the seamless-noise prompt. The film grain overlay is rendered live via SVG `feTurbulence` in `components/FilmGrain.tsx`, so the WebP is decorative-only and the failure does not affect the page.

## How to swap

The page reads images via filesystem scans (`lib/galleryFiles.ts`) and known-path lookups (`lib/heroFallback.ts`). Drop a higher resolution file at the exact same path and filename, then `bun run export:public`. No code change required.

## Total spend
- Nano Banana stills: $0.234
- Veo 3.1 Fast (1 x 8s image-to-video): $1.20
- Total: $1.434
