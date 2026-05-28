#!/usr/bin/env bash
# Asset store = the repo. PNGs are committed under output/ and surfaced
# via the raw.githubusercontent.com URL in each manifest.json. The Drive
# uploader is kept in the repo (scripts/sync-to-drive.ts) but is NOT in
# the critical path.

set -e
cd "$(dirname "$0")/.."

if [ ! -d node_modules ]; then
  npm install
fi

npm run setup-fonts
npm run sync-from-seed
npm run generate

echo "Done. Commit output/ to publish."
