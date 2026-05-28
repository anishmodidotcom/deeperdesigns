// Brand tokens for the content engine. Hex values, type scale, and the
// deterministic slug->accent map. All copy/visual decisions reference
// this file — never invent a color elsewhere.

export const TOKENS = {
  colors: {
    bg:        '#0A0A0A',
    bgPanel:   '#111113',
    textHi:    '#FAFAFA',
    textMid:   '#A1A1AA',
    textLo:    '#52525B',
    indigo:    '#6366F1',
    green:     '#10B981',
    teal:      '#0F766E',   // Deeper Content
    jade:      '#4A6741',   // wellness/skincare topics
    amber:     '#D4A053',   // F&B / chai topics
    sage:      '#7A8C7A',   // yoga / wellness topics
    blue:      '#4A6FA5',   // trade / industrial topics
  },
  pad: { canvas: 96, tight: 80, loose: 120 },
  size: { sq: 1080 },
  type: {
    serifHero:  { fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 80, lineHeight: 1.06 },
    serifLarge: { fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 60, lineHeight: 1.1 },
    sansHero:   { fontFamily: 'Geist', fontWeight: 600, fontSize: 88, lineHeight: 1.02 },
    sansLarge:  { fontFamily: 'Geist', fontWeight: 600, fontSize: 52, lineHeight: 1.1 },
    body:       { fontFamily: 'Geist', fontWeight: 400, fontSize: 30, lineHeight: 1.45 },
    label:      { fontFamily: 'Geist Mono', fontWeight: 500, fontSize: 17, letterSpacing: '0.18em' },
    micro:      { fontFamily: 'Geist Mono', fontWeight: 500, fontSize: 14, letterSpacing: '0.16em' },
  },
} as const;

export type AccentName = keyof typeof TOKENS.colors;

// Deterministic accent map by slug. Matched on slug-prefix.
// Default = indigo. Anish-approved registry — never invent new mappings
// here without an explicit go-ahead.
const ACCENT_RULES: { match: RegExp; accent: AccentName }[] = [
  // Brand product
  { match: /^04-deeper-content-/,      accent: 'teal'  },
  // Trade / industrial
  { match: /^02-bharat-steel-/,        accent: 'blue'  },
  // F&B / chai / heritage food brands
  { match: /^08-zaatar-republic-/,     accent: 'amber' },
  { match: /^16-malabar-spice-/,       accent: 'amber' },
  { match: /^24-kadak-chai-/,          accent: 'amber' },
  // Skincare / wellness / yoga / sage-coded calm
  { match: /^06-veda-glow-/,           accent: 'jade'  },
  { match: /^19-sahaja-farms-/,        accent: 'jade'  },
  { match: /^26-nomad-trails-/,        accent: 'sage' },
  { match: /^30-meera-wellness-/,      accent: 'sage' },
];

export function accentForSlug(slug: string): string {
  for (const rule of ACCENT_RULES) {
    if (rule.match.test(slug)) return TOKENS.colors[rule.accent];
  }
  return TOKENS.colors.indigo;
}

// Same map but exposed by exact slug for direct lookup.
export const ACCENT_BY_SLUG: Record<string, string> = {
  '02-bharat-steel-quote-time':    TOKENS.colors.blue,
  '04-deeper-content-three-steps': TOKENS.colors.teal,
  '06-veda-glow-skin-advisor':     TOKENS.colors.jade,
  '08-zaatar-republic-qsr-ops':    TOKENS.colors.amber,
  '16-malabar-spice-heritage':     TOKENS.colors.amber,
  '19-sahaja-farms-csa':           TOKENS.colors.jade,
  '24-kadak-chai-brand-world':     TOKENS.colors.amber,
  '26-nomad-trails-trek-editorial': TOKENS.colors.sage,
  '30-meera-wellness-yoga-portal': TOKENS.colors.sage,
};
