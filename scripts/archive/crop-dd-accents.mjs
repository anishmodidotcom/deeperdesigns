// v24: accent + salvage crops for the DD UI bank.
// Accent crops come from already-verified-clean UI sources, so any crop is
// currency-free. Salvage crops recover automotive + hotels (whose only full
// shots carried currency) by cropping a currency-free region; these are
// re-verified in a contact sheet before they stay in the bank.
import path from "node:path";
import sharp from "sharp";

const ROOT = "/home/user/deeperdesigns";
const PUB = path.join(ROOT, "public/builds");
const UI = path.join(ROOT, "marketing/design-assets/dd/ui-screenshots");

// [srcRel, left, top, width, height, outName, note]
const CROPS = [
  // Accent crops from clean sources (any region is safe).
  ["logistics/control-room.png", 470, 470, 1700, 900, "ui_logistics_controlroom_crop.png", "live trips accent"],
  ["d2c/studio-engine.png", 780, 560, 2020, 1180, "ui_d2c_studioengine_crop.png", "generated product accent"],
  ["real-estate/listing-studio.png", 780, 560, 2020, 1180, "ui_realestate_listingstudio_crop.png", "virtual staging accent"],
  ["fashion/catalogue-studio.png", 780, 560, 2020, 1180, "ui_fashion_cataloguestudio_crop.png", "on-model catalogue accent"],
  ["coaching/results.png", 1240, 190, 1560, 520, "ui_coaching_results_crop.png", "progress trend accent"],
  ["clinics/calendar.png", 900, 130, 1900, 560, "ui_clinics_calendar_crop.png", "smart calendar accent"],
  // Salvage crops (recover industries whose full shots had currency).
  ["automotive/test-drive-desk.png", 300, 520, 900, 1180, "ui_automotive_testdrivedesk_crop.png", "leads list, currency-free region"],
  ["hotels/guest-return.png", 40, 520, 2760, 1240, "ui_hotels_guestreturn_crop.png", "past guests + reviews, currency-free region"],
];

for (const [rel, left, top, width, height, out, note] of CROPS) {
  await sharp(path.join(PUB, rel))
    .extract({ left, top, width, height })
    .png()
    .toFile(path.join(UI, out));
  console.log(`crop ${out}  (${width}x${height})  ${note}`);
}
console.log(`\n${CROPS.length} crops written`);
