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

2. (Optional) Override the API endpoint or model if needed. Defaults to
   Google's Generative Language API at
   `https://generativelanguage.googleapis.com` and the
   `gemini-2.5-flash-image` model. See the commented variables in
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

- The script targets Google's Generative Language API (the official
  Gemini 2.5 Flash Image endpoint, also known as Nano Banana). Each
  request is a single synchronous `POST` to
  `/v1beta/models/gemini-2.5-flash-image:generateContent` with the API
  key sent as the `x-goog-api-key` header.
- Aspect ratio is sent through `generationConfig.imageConfig.aspectRatio`.
  If the API rejects that field on a particular variant, the script
  retries the same prompt with a basic `responseModalities` config and
  lets `sharp` enforce the final dimensions.
- Inline base64 image bytes are decoded, optionally resized with sharp
  (`fit: cover`, attention crop) to the requested width and height, and
  re-encoded as WebP at quality 88.
- The script exits with code 1 if any entry fails so CI or a watch loop
  can detect partial runs. Successful and skipped entries still leave
  files on disk.
- Override the endpoint or model with `NANO_BANANA_API_BASE` and
  `NANO_BANANA_MODEL` if you point the key at a different deployment.
