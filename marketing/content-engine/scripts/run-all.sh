#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

if [ ! -d node_modules ]; then
  npm install
fi

npm run setup-fonts
npm run sync-from-sheet
npm run generate
npm run sync-to-drive

echo "Done."
