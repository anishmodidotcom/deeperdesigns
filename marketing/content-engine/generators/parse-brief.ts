// Deterministic parser for the Sheet's "Graphic Brief" column.
//
// A brief is one of:
//   - statement-card    : a single panel, the quote is the first
//                         single-quoted segment, the label is the
//                         ALL-CAPS run after stripping concept-brand
//                         tokens.
//   - carousel          : panels separated by "P1:", "P2:", ...
//
// The role classifier and field extractors are pure; no LLM, no
// invented copy.

export type PanelRole = 'card' | 'hook' | 'content' | 'stat' | 'image' | 'cta';

export type ParsedPanel = {
  role: PanelRole;
  fields: {
    quote?: string;
    label?: string;
    hook?: string;
    kicker?: string;
    title?: string;
    body?: string;
    step?: string;
    items?: { label: string; value: string }[];
    caption?: string;
    line?: string;
  };
};

export type ParseResult = {
  panels: ParsedPanel[];
  errors: string[];
};

// Concept-brand tokens to strip from labels. The site has 22 concept
// brands; here we list the names that show up in the briefs so the
// kicker stays brand-agnostic on the rendered graphic.
const CONCEPT_BRAND_TOKENS = [
  'MAPLE LENS', 'MAPLELENS',
  'VEDA GLOW', 'VEDA-GLOW',
  'BHARAT STEEL',
  'MEERA WELLNESS', 'MEERA',
  'ZAATAR REPUBLIC', 'ZAATAR',
  'STUDIO NOOR', 'NOOR',
  'SMILEFIRST', 'SMILE FIRST',
  'AUTOBAZAAR', 'AUTO BAZAAR',
  'STUMPVISION', 'STUMP VISION',
  'OUD AND EMBER', 'OUD & EMBER',
  'HIVEDESK', 'HIVE DESK',
  'MALABAR SPICE', 'MALABAR',
  'PAWSTAY', 'PAW STAY',
  'SAHAJA FARMS', 'SAHAJA',
  'KARAN LEGAL',
  'ZARA FITNESS',
  'EARTH AND FIRE', 'EARTH & FIRE',
  'KADAK CHAI',
  'NOMAD TRAILS',
  'SUGAR LANE',
  'BRIGHTPATH', 'BRIGHT PATH',
];

const GENERIC_LABEL_TOKENS = new Set([
  'DEEPER DESIGNS', 'LIVE', 'PROTOTYPE', 'CONCEPT', 'STUDY',
  'A NOTE', 'NOTE', 'LIVE PRODUCT', 'DEEPER CONTENT',
]);

function sanitize(text: string): string {
  // strip em/en dashes (replace with comma) and emojis.
  return text
    .replace(/\s+[—–]\s+/g, ', ')
    .replace(/[—–]/g, ',')
    // crude emoji strip — covers common ranges.
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractQuote(text: string): string | null {
  // First single-quoted segment.
  const single = text.match(/'([^']{4,})'/);
  if (single) return sanitize(single[1]);
  // First double-quoted segment.
  const dbl = text.match(/"([^"]{4,})"/);
  if (dbl) return sanitize(dbl[1]);
  // Smart-quoted.
  const smart = text.match(/[‘“]([^’”]{4,})[’”]/);
  if (smart) return sanitize(smart[1]);
  return null;
}

function extractLongestSentence(text: string): string {
  const sentences = sanitize(text)
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 8);
  if (!sentences.length) return sanitize(text);
  return sentences.reduce((a, b) => (a.length >= b.length ? a : b));
}

function extractAllCapsRun(text: string): string | null {
  // Pull the first run of all-caps tokens (with · and & separators) at least 4 chars.
  const m = text.match(/\b([A-Z][A-Z0-9 ·&-]{3,})\b/);
  if (!m) return null;
  return m[1].trim();
}

function scrubLabel(label: string | null): string {
  if (!label) return 'DEEPER DESIGNS';
  let cleaned = label.toUpperCase();
  for (const token of CONCEPT_BRAND_TOKENS) {
    cleaned = cleaned.replace(new RegExp(`\\b${token}\\b`, 'g'), '');
  }
  // Keep generic tokens; rebuild by splitting on '·' or '·'-like separators
  const parts = cleaned.split(/\s*[·\|]\s*/).map(p => p.trim()).filter(Boolean);
  const generic = parts.filter(p => {
    if (GENERIC_LABEL_TOKENS.has(p)) return true;
    // Permit short generic words like 'LIVE 2026', 'STUDY 003' etc.
    return /^[A-Z0-9 ]+$/.test(p) && p.length < 24;
  });
  const joined = generic.length ? generic.join(' · ') : 'DEEPER DESIGNS';
  return joined.replace(/\s+/g, ' ').trim();
}

function classifyRole(panelText: string, isFirst: boolean, roleHint?: string): PanelRole {
  const t = ((roleHint ?? '') + ' ' + panelText).toLowerCase();
  if (/\bcta\b|wa\.me|deeperdesigns\.in/.test(t)) return 'cta';
  if (/stat block|stacked|\bstats?\b|\|/.test(t)) return 'stat';
  if (/(photo|mockup|screenshot|\bui\b|dashboard\b|image panel|\bimage\b)/.test(t)) return 'image';
  if (/italic serif|opening|hook/.test(t) || isFirst) return 'hook';
  return 'content';
}

// Pull a quoted field by keyword. The briefs use `title 'X' body 'Y'
// step '01'` style markup. Matches single, double, or smart quotes.
function quotedField(text: string, key: string): string | null {
  const re = new RegExp(
    `\\b${key}\\s*[:.]?\\s*(?:'([^']{1,200})'|"([^"]{1,200})"|[‘“]([^’”]{1,200})[’”])`,
    'i',
  );
  const m = text.match(re);
  if (!m) return null;
  return sanitize(m[1] ?? m[2] ?? m[3] ?? '');
}

function extractTitleAndBody(text: string): {
  title: string;
  body: string;
  step?: string;
} {
  // Briefs use structured markup: "title 'X' body 'Y' step '01'".
  // Try that first.
  const t = quotedField(text, 'title');
  const b = quotedField(text, 'body');
  const s = quotedField(text, 'step');
  if (t && b) {
    return { title: t, body: b, step: s ?? undefined };
  }

  // Fallback: first short sentence is title, the rest is body.
  const cleaned = sanitize(text);
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  let title = '';
  let body = cleaned;
  if (sentences.length) {
    const first = sentences[0];
    const wc = first.split(/\s+/).length;
    if (wc <= 10) {
      title = first;
      body = sentences.slice(1).join(' ').trim() || first;
    } else {
      title = first.split(/\s+/).slice(0, 6).join(' ') + '...';
      body = first;
    }
  }
  return { title, body, step: s ?? undefined };
}

function extractStatItems(text: string): { label: string; value: string }[] {
  // Briefs format: "stat: 'A 5 | B 3 | C 5 DAYS'." Pull the quoted content
  // first if present so we don't include the "stat:" marker in chunks.
  const quoted = extractQuote(text);
  const source = quoted ?? text;

  const chunks = source.split('|').map(s => s.trim()).filter(Boolean);
  const out: { label: string; value: string }[] = [];
  for (const c of chunks) {
    const cleaned = sanitize(c)
      .replace(/^stat\s*[:.]?\s*/i, '')
      .replace(/^stats?\s+block\s*[:.]?\s*/i, '');
    if (!cleaned) continue;

    // Locate the first token that contains a digit; everything from there
    // to the end is the value. Anything before is the label.
    const tokens = cleaned.split(/\s+/);
    const valueStart = tokens.findIndex(t => /\d/.test(t));
    if (valueStart > 0) {
      const label = tokens.slice(0, valueStart).join(' ').toUpperCase();
      const value = tokens.slice(valueStart).join(' ');
      out.push({ label, value });
      continue;
    }

    // No digit — split last word as value (e.g. "STATUS LIVE").
    const m = cleaned.match(/^(.+?)\s+(\S+)$/);
    if (m) {
      out.push({ label: m[1].toUpperCase(), value: m[2] });
    } else {
      out.push({ label: 'METRIC', value: cleaned });
    }
  }
  return out;
}

export function parseBrief(format: string, briefText: string): ParseResult {
  const errors: string[] = [];
  const text = (briefText || '').trim();

  if (!text) {
    return { panels: [], errors: ['empty brief'] };
  }

  // statement-card or text: single card
  if (format === 'statement-card' || format === 'text') {
    const quote = extractQuote(text) ?? extractLongestSentence(text);
    const label = scrubLabel(extractAllCapsRun(text));
    if (!quote) errors.push('could not extract a quote');
    return {
      panels: [{ role: 'card', fields: { quote: quote ?? '', label } }],
      errors,
    };
  }

  // carousel — match the bare panel marker "P<n>". The briefs use any of:
  //   "P1:"        "P5 hook:"        "P3 (hook):"
  //   "P5 CTA."    "P7 stat block:"  "P4 content: title 'X'..."
  // We split on the bare number marker, keep everything between markers as
  // the panel body, and let classifyRole find the role keyword inside.
  const PANEL_MARKER = /\bP(\d+)\b[:.\s)(-]*/g;
  const panelMatches = [...text.matchAll(PANEL_MARKER)];
  if (!panelMatches.length) {
    errors.push('carousel format but no P-markers found; falling back to statement-card');
    return parseBrief('statement-card', text);
  }

  const panels: ParsedPanel[] = [];
  for (let i = 0; i < panelMatches.length; i++) {
    const start = panelMatches[i].index! + panelMatches[i][0].length;
    const end   = i + 1 < panelMatches.length ? panelMatches[i + 1].index : text.length;
    const panelText = text.slice(start, end).trim();
    const role = classifyRole(panelText, i === 0);
    const fields: ParsedPanel['fields'] = {};

    switch (role) {
      case 'hook': {
        const q = extractQuote(panelText) ?? extractLongestSentence(panelText);
        fields.hook   = q;
        fields.kicker = scrubLabel(extractAllCapsRun(panelText));
        if (!q) errors.push(`P${i + 1}: empty hook`);
        break;
      }
      case 'content': {
        const { title, body, step } = extractTitleAndBody(panelText);
        // Prefer the brief's explicit step ("step '01'", "step 'DAY 1-3'");
        // fall back to a generic step indexed by panel position only if the
        // brief asked for one (we detect that by the presence of any "step"
        // keyword in the panel text).
        fields.step  = step
          ?? (panelText.toLowerCase().includes('step') ? `STEP ${String(i + 1).padStart(2, '0')}` : undefined);
        fields.title = title;
        fields.body  = body;
        if (!body) errors.push(`P${i + 1}: empty body`);
        break;
      }
      case 'stat': {
        fields.items = extractStatItems(panelText);
        if (!fields.items.length) errors.push(`P${i + 1}: no stat items parsed`);
        break;
      }
      case 'image': {
        fields.caption = scrubLabel(extractAllCapsRun(panelText)) || 'THE KIND OF TOOL WE BUILD';
        // body is what would back-fall if image asset missing
        const { body } = extractTitleAndBody(panelText);
        fields.body = body;
        break;
      }
      case 'cta': {
        // Many briefs end with terse "P5 CTA. <Accent> accent." with no
        // quoted line. When the extracted line is empty or is a color
        // directive (e.g. "Indigo accent"), fall back to the documented
        // brand CTA line "We will build yours." (appears verbatim in
        // posts 06 and 01 in the seed).
        const quoted = extractQuote(panelText);
        const longest = extractLongestSentence(panelText);
        const isColorOnly =
          longest && /^(indigo|amber|jade|teal|sage|blue|green)\s+accent[.\s]*$/i
            .test(longest.trim());
        const line = quoted ?? (isColorOnly || !longest ? 'We will build yours.' : longest);
        fields.line = line;
        break;
      }
      case 'card': // not used in carousel context
        break;
    }
    panels.push({ role, fields });
  }

  return { panels, errors };
}
