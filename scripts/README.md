# scripts

Automation scripts for the Deeper Designs site.

## Image generation pipeline

Generates site imagery with the Nano Banana API and writes WebP files into
`public/images/<slug>/<filename>.webp`.

### One-time setup

1. Open `.env.local` at the repo root and paste your Nano Banana API key:

   ```
   NANO_BANANA_API_KEY=your_key_here
   ```

   `.env*` is already gitignored, so the key is never committed. Bun loads
   `.env.local` automatically when running `bun run`.

2. (Optional) Override the API endpoint if the wrapper changes. Defaults to
   `https://api.nanobananaapi.ai`. See the commented variables in
   `.env.local`.

### Run the generator

```
bun run gen-images
```

The script is idempotent. It only generates images whose target file does not
already exist, so you can rerun it safely after adding new manifest entries
or after deleting a single output to regenerate it.

Progress is logged per entry, e.g.:

```
[3/40] Generating veda-glow/hero.webp...
[3/40] Saved public/images/veda-glow/hero.webp
```

A final summary reports how many images were generated, skipped, and failed,
and lists each failure with its error.

### Manifest format

`scripts/image-manifest.json` is a JSON array of entries:

```json
[
  {
    "slug": "veda-glow",
    "filename": "hero",
    "prompt": "Warm Ayurvedic skincare hero, dark amber lit studio, copper bottle, soft incense smoke, editorial",
    "aspectRatio": "16:9",
    "width": 1920,
    "height": 1080
  }
]
```

Field reference:

- `slug` (required): subfolder under `public/images/`. Usually matches the
  case study route slug (`veda-glow`, `bharat-steel`, `meera-wellness`,
  etc.).
- `filename` (required): filename without extension. Final path is always
  `public/images/<slug>/<filename>.webp`.
- `prompt` (required): the text-to-image prompt sent to Nano Banana.
- `aspectRatio` (optional): one of `1:1`, `4:3`, `3:4`, `16:9`, `9:16`.
  If omitted, the script infers an aspect ratio from `width` and `height`,
  falling back to `1:1`.
- `width`, `height` (optional): if provided, the downloaded image is resized
  with `cover` fit and re-encoded to WebP at those exact pixel dimensions.

### Adding new images

1. Append a new object to `scripts/image-manifest.json`.
2. Run `bun run gen-images`. Existing files are skipped, so only the new
   entry runs.
3. Commit the generated `.webp` files in `public/images/<slug>/` (the
   `.gitkeep` lives next to them and is harmless).

### Regenerating a single image

Delete the output file, then rerun `bun run gen-images`:

```
rm public/images/veda-glow/hero.webp
bun run gen-images
```

### Implementation notes

- The script targets the public `nanobananaapi.ai` wrapper. It posts to
  `/api/v1/nanobanana/generate` to create a task, then polls
  `/api/v1/nanobanana/record-info?taskId=...` every 3 seconds with a
  5-minute timeout. Both paths can be overridden via env vars
  (`NANO_BANANA_GENERATE_PATH`, `NANO_BANANA_STATUS_PATH`,
  `NANO_BANANA_API_BASE`).
- Generated URLs are downloaded, optionally resized with `sharp`, and
  re-encoded as WebP at quality 88.
- The script exits with code 1 if any entry fails so CI or a watch loop
  can detect partial runs. Successful and skipped entries still leave
  files on disk.
