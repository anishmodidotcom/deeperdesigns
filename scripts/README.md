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
- Override the endpoint or model with `GEMINI_API_BASE` and
  `NANO_BANANA_MODEL` if you point the key at a different deployment.
- The API key is read from `GEMINI_API_KEY` (preferred name) or
  `NANO_BANANA_API_KEY` (legacy alias). Either works in `.env.local`.

## Video generation pipeline

Generates short looping site videos with Veo 3.1 Fast and writes MP4
files into `public/videos/<slug>/<filename>.mp4`.

### One-time setup

The video generator reuses the same `GEMINI_API_KEY` as the image
generator. If `.env.local` already has a working key for `gen-images`,
no extra setup is needed.

### Run the generator

```
bun run gen-videos
```

The script is idempotent. It only generates videos whose target file
does not already exist. Each entry takes 60 to 180 seconds end to end
(generation runs server-side and the script polls), so plan for a
multi-minute run when adding several clips at once.

Progress is logged at each step, e.g.:

```
[1/3] Generating malabar-spice/hero-loop.mp4...
[1/3] Operation: models/veo-3.1-fast-generate-preview/operations/abc123
[1/3] Polling (10s elapsed)...
[1/3] Polling (20s elapsed)...
[1/3] Operation complete (78s).
[1/3] Saved public/videos/malabar-spice/hero-loop.mp4
```

A final summary reports generated, skipped, and failed counts and exits
1 if any entry failed.

### Manifest format

`scripts/video-manifest.json` is a JSON array of entries:

```json
[
  {
    "slug": "malabar-spice",
    "filename": "hero-loop",
    "prompt": "Slow cinematic loop of black peppercorns falling onto aged dark wood, warm chiaroscuro lighting, photoreal, shot on Phase One, 8 second loop",
    "aspectRatio": "16:9",
    "duration": 8
  }
]
```

Field reference:

- `slug` (required): subfolder under `public/videos/`.
- `filename` (required): final path is
  `public/videos/<slug>/<filename>.mp4`.
- `prompt` (required): text prompt sent to Veo. Up to 1024 tokens.
- `aspectRatio` (optional): `16:9` or `9:16`. Defaults to `16:9`. Veo
  3.1 Fast only supports these two ratios today.
- `duration` (optional): `4`, `6`, or `8`. Defaults to `8`. Mostly for
  documentation since the typical site loop is the 8-second variant.

### Using videos on the site

Reference the generated file from a Next.js component with a standard
HTML `<video>` element. The site uses these attributes by convention:

```tsx
<video
  src="/videos/malabar-spice/hero-loop.mp4"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
/>
```

`muted` is required for autoplay on every modern browser.

### Cost note

Veo 3.1 Fast bills roughly **0.15 USD per second of generated video**.
An 8-second clip costs about **1.20 USD per attempt**. The script is
idempotent (skips existing files), but re-running for a regeneration
incurs the full cost again. Audit failed runs before retrying.

### Audio handling

The Gemini API does not currently honour the `generateAudio: false`
parameter for Veo. Clips are produced with audio. The site mutes
playback at the `<video>` element. To strip the audio track entirely,
post-process with ffmpeg:

```
ffmpeg -i public/videos/<slug>/<file>.mp4 -an -c:v copy out.mp4
mv out.mp4 public/videos/<slug>/<file>.mp4
```

### Implementation notes

- The script targets Google's Generative Language API at
  `POST /v1beta/models/veo-3.1-fast-generate-preview:predictLongRunning`
  per https://ai.google.dev/gemini-api/docs/video. The key is sent in
  the `x-goog-api-key` header.
- The endpoint returns an operation name like
  `models/veo-3.1-fast-generate-preview/operations/<id>`. The script
  then polls `GET /v1beta/<operation_name>` every 10 seconds with the
  same auth header, up to a 10-minute timeout per video. Transient
  poll failures are swallowed and retried until the timeout.
- When the operation reports `done: true`, the script extracts the
  video URI from `response.generateVideoResponse.generatedSamples[0].video.uri`
  (with defensive fallbacks for older response shapes) and downloads
  the MP4 bytes. Files are written as raw MP4; no re-encoding is
  performed.
- The script exits with code 1 if any entry fails so CI or a watch
  loop can detect partial runs.
- Override the endpoint or model with `GEMINI_API_BASE` and
  `VEO_MODEL`.
