# scripts/archive

One-shot scripts from shipped releases. Each produced a specific set of
assets that are already committed under `public/`, and none is part of any
build, deploy or routine workflow. They are kept so an exact asset pass can
be re-run and so the prompts and crops that produced a given image are not
lost. Nothing here is referenced by `package.json`.

The release column is the version each script's own header names.

| Script | Release | What it produced |
| --- | --- | --- |
| `crop-dd-accents.mjs` | v24 | v24: accent + salvage crops for the DD UI bank |
| `gen-dd-heroes.mjs` | v24 | v24 Part C: generate 10 new DD hero/texture assets via the locked Gemini |
| `gen-studio-images.ts` | - | One-off: generate the four Studio Engine product images for the D2C |
| `gen-v192-images.ts` | v25.5 | One-off: generate the v19.2 industry-page images (Real Estate Listing |
| `gen-v193-images.ts` | v25.5 | One-off: generate the v19.3 Fashion images (Runway flat + on-model poster, |
| `gen-v194-images.ts` | v25.5 | One-off: generate the v19.4 Gemini posters for the two video builds |
| `gen-v196-images.ts` | v25.5 | One-off (v19.6 cleanup): generate the Real Estate Property Film before/after |
| `shoot-d2c-demos.mjs` | v25.5 | One-off: screenshot the four real D2C demo routes at 2x and save to |
| `shoot-for-page.mjs` | v25.5 | One-off: fresh screenshots of the finished /for/d2c-brands page (full) |
| `shoot-industry-demos.mjs` | v25.5 | One-off: screenshot the four D2C build demos and the full pages from the |
| `shoot-v192-demos.mjs` | v25.5 | One-off: screenshot the eleven real v19.2 demo routes (Real Estate, |
| `shoot-v192-pages.mjs` | v25.5 | One-off: fresh full-page screenshots of the three finished v19.2 /for |
| `shoot-v193-demos.mjs` | v25.5 | One-off: screenshot the eleven real v19.3 demo routes (Coaching, Clinics, |
| `shoot-v193-pages.mjs` | v25.5 | One-off: fresh full-page screenshots of the three finished v19.3 /for pages |
| `shoot-v194-demos.mjs` | v25.5 | One-off: screenshot the ten real v19.4 demo routes (Manufacturing, |
| `shoot-v194-pages.mjs` | v25.5 | One-off: fresh full-page screenshots of the three finished v19.4 /for pages |
| `shoot-v195-demos.mjs` | v25.5 | One-off: screenshot the twelve real v19.5 demo routes (CA Firms, Salons, |
| `shoot-v195-pages.mjs` | v25.5 | One-off: fresh full-page screenshots of the three finished v19.5 /for pages |
| `shoot-v196.mjs` | v25.5 | One-off (v19.6 cleanup): re-screenshot the demos whose accent changed |
| `shoot-v22-2-live-heroes.mjs` | v25.5 | v22.2 hotfix: re-shoot the live product hero screenshots that were |
| `v6-capture/capture.mjs` | v6 | Run after `bunx next dev -p 3399` is up: node scripts/v6-capture/capture.mjs |
