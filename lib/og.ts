// Per-slug signature accents for OG card backgrounds. Mirrors
// brand/v1/tokens.css --dd-acc-* and app/globals.css --page-accent-*.
// Sub-products on the DD parent tenant (deeper-content) use DD Indigo
// (decision A, ratified v15).
export const SLUG_ACCENTS: Record<string, string> = {
  "maplelens":        "#C8956D",
  "deeper-content":   "#7C6CFF",
  "outpost":          "#6366F1",
  "oviya-studio":     "#C4485C",
  "veda-glow":        "#D4A574",
  "bharat-steel":     "#3B82F6",
  "meera-wellness":   "#5B7F6E",
  "zaatar-republic":  "#E85D2A",
  "studio-noor":      "#9B7EC8",
  "smilefirst":       "#0FA89A",
  "autobazaar":       "#22D3EE",
  "stumpvision":      "#4ADE80",
  "oud-and-ember":    "#C9A84C",
  "hivedesk":         "#8B5CF6",
  "malabar-spice":    "#E89B2D",
  "pawstay":          "#E8A557",
  "sahaja-farms":     "#D4A537",
  "karan-legal":      "#1A1A1A",
  "zara-fitness":     "#D7FF5C",
  "earth-and-fire":   "#B85530",
  "kadak-chai":       "#C9803A",
  "nomad-trails":     "#C44536",
  "sugar-lane":       "#A14A5C",
  "brightpath":       "#D4A857",
};

// Translucent overlay derived from the accent. Used as the 8%
// background wash behind the deep near-black canvas.
export function accentWash(hex: string, alpha = 0.08): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
