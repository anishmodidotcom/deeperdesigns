// Archetype router. Given the parsed panel set for a post, decide which
// of the six archetypes (Statement / BigStat / Split / StepGrid / Product
// / IndexCard / Cta) each panel renders as, plus the explicit props.
//
// The router is pure: no I/O, no image probing. Image-source picking
// and dark-pixel reject happen in the caller (generate-post.ts), which
// uses the Product decision as a hint and falls back to Statement if
// the source asset is missing or unreadably dark.

import type { ParsedPanel } from './parse-brief.js';

export type Archetype =
  | 'Statement'
  | 'BigStat'
  | 'Split'
  | 'StepGrid'
  | 'Product'
  | 'IndexCard'
  | 'Cta';

export type RouteDecision =
  | { archetype: 'Statement';  props: StatementProps }
  | { archetype: 'BigStat';    props: BigStatProps }
  | { archetype: 'Split';      props: SplitProps }
  | { archetype: 'StepGrid';   props: StepGridProps }
  | { archetype: 'Product';    props: ProductProps }
  | { archetype: 'IndexCard';  props: IndexCardProps }
  | { archetype: 'Cta';        props: CtaProps };

export type StatementProps = { quote: string; kicker: string };
export type BigStatProps   = { primary: string; secondary?: string; kicker: string };
export type SplitProps     = { leftLabel: string; leftBody: string; rightLabel: string; rightBody: string; kicker: string };
export type StepGridProps  = { heading: string; steps: { label: string; title: string; body?: string }[]; kicker: string };
export type ProductProps   = { caption: string; kicker: string; panelIndex: number };
export type IndexCardProps = { heading: string; rows: { label: string; value: string }[]; kicker: string };
export type CtaProps       = { line: string };

// --- helpers -----------------------------------------------------------

function isNumberish(s: string): boolean {
  return /\d/.test(s) && s.length <= 12;
}

// Try to split a "30 minutes to 30 seconds" / "0 to 1" hook quote into a
// primary/secondary BigStat pair. Returns null if no clean pair found.
function quoteToStatPair(quote: string): { primary: string; secondary: string } | null {
  const cleaned = quote.replace(/[.,;]+$/g, '').trim();
  // Patterns: "X to Y", "X → Y", "X became Y"
  const m =
    cleaned.match(/^(.+?)\s+(?:to|→|became|->)\s+(.+?)\.?$/i) ??
    cleaned.match(/^([^.,]+?)\s*[.,]\s*([^.,]+?)\.?$/);
  if (!m) return null;
  const a = m[1].trim();
  const b = m[2].trim();
  if (!isNumberish(a) || !isNumberish(b)) return null;
  return { primary: a.toUpperCase(), secondary: b.toUpperCase() };
}

function looksLikeStepContent(role: ParsedPanel['role'], fields: ParsedPanel['fields']): boolean {
  if (role !== 'content') return false;
  if (fields.step) return true;
  return false;
}

function isStatNumericPair(items: { label: string; value: string }[]): boolean {
  if (items.length !== 2) return false;
  return items.every(i => isNumberish(i.value));
}

// Concept-brand tokens we never want surfaced in a kicker. The site has
// 22 concept brands; the slugs that prefix posts with brand names get
// stripped here so the kicker reads as the topic, not the brand.
const SLUG_CONCEPT_BRANDS = new Set([
  'maple', 'lens',
  'bharat', 'steel',
  'veda', 'glow',
  'meera', 'wellness',
  'zaatar', 'republic',
  'studio', 'noor',
  'smilefirst',
  'autobazaar',
  'stumpvision',
  'oud', 'ember',
  'hivedesk',
  'malabar', 'spice',
  'pawstay',
  'sahaja', 'farms',
  'karan', 'legal',
  'zara', 'fitness',
  'earth', 'fire',
  'kadak', 'chai',
  'nomad', 'trails',
  'sugar', 'lane',
  'brightpath',
]);

// Brand-agnostic kicker per slug. Strips concept-brand tokens and joins
// the remaining 1-3 topic words uppercased. Falls back to DEEPER DESIGNS.
function defaultKicker(slug: string): string {
  const words = slug.replace(/^\d+-/, '').split('-').filter(Boolean);
  const topic = words.filter(w => !SLUG_CONCEPT_BRANDS.has(w.toLowerCase()));
  const used = (topic.length ? topic : words).slice(0, 3);
  const joined = used.join(' ').toUpperCase().trim();
  return joined.length ? joined : 'DEEPER DESIGNS';
}

// --- slug overrides ----------------------------------------------------

// Per-post overrides. Each function gets the parsed panel set and returns
// a list of RouteDecisions OR null to fall through to the default routing.
// Returning fewer decisions than panels is allowed (used by Split to
// consume an adjacent pair).
type SlugOverride = (
  panels: ParsedPanel[],
  slug: string,
) => RouteDecision[] | null;

const SLUG_OVERRIDES: Record<string, SlugOverride> = {
  // 02 — single-card text post. Force BigStat with the explicit number pair.
  '02-bharat-steel-quote-time': (panels) => {
    const card = panels[0];
    if (!card || card.role !== 'card') return null;
    return [{
      archetype: 'BigStat',
      props: {
        primary:   '30 MIN',
        secondary: '30 SEC',
        kicker:    'QUOTE TIME · STEEL',
      },
    }];
  },

  // 07 — single-card text post. The brief reads "AI changed the cost of
  // building. Most businesses have not updated the math." That's a
  // statement, not a stat — but per spec we want it as BigStat with a
  // headline word pair.
  '07-custom-vs-saas-math': (panels) => {
    const card = panels[0];
    if (!card || card.role !== 'card') return null;
    return [{
      archetype: 'BigStat',
      props: {
        primary:   'NEW MATH',
        secondary: 'NEW BUILD',
        kicker:    'CUSTOM VS SAAS',
      },
    }];
  },

  // 31 — every content panel renders as StepGrid. The brief's 4 step
  // panels already each contain step / title / body, so we collapse all
  // content panels into a single StepGrid carousel panel — and emit the
  // hook + cta as bookends.
  '31-two-week-build-process': (panels) => {
    const out: RouteDecision[] = [];
    const contentPanels = panels.filter(p => p.role === 'content');
    for (let i = 0; i < panels.length; i++) {
      const p = panels[i];
      if (p.role === 'hook') {
        out.push({
          archetype: 'Statement',
          props: {
            quote:  p.fields.hook ?? '',
            kicker: p.fields.kicker ?? 'BUILD PROCESS',
          },
        });
      } else if (p.role === 'cta') {
        out.push({ archetype: 'Cta', props: { line: p.fields.line ?? '' } });
      } else if (p.role === 'content' && p === contentPanels[0]) {
        // Emit one StepGrid that holds every step.
        out.push({
          archetype: 'StepGrid',
          props: {
            heading: 'How we ship in two weeks.',
            steps: contentPanels.map(c => ({
              label: c.fields.step ?? '',
              title: c.fields.title ?? '',
              body:  c.fields.body ?? undefined,
            })).slice(0, 4),
            kicker: 'BUILD PROCESS',
          },
        });
      }
      // remaining content panels are absorbed into the first StepGrid; skip.
    }
    return out;
  },

  // 38 — stat panel → IndexCard (more than two metrics).
  '38-our-stack': (panels) => {
    return panels.map((p): RouteDecision => {
      if (p.role === 'hook') {
        return {
          archetype: 'Statement',
          props: { quote: p.fields.hook ?? '', kicker: p.fields.kicker ?? 'OUR STACK' },
        };
      }
      if (p.role === 'stat') {
        return {
          archetype: 'IndexCard',
          props: {
            heading: 'Boring stack. On purpose.',
            rows: (p.fields.items ?? []).map(it => ({ label: it.label, value: it.value })),
            kicker:  'OUR STACK',
          },
        };
      }
      if (p.role === 'content') {
        return {
          archetype: 'StepGrid',
          props: {
            heading: p.fields.title ?? '',
            steps: [{ label: '', title: p.fields.title ?? '', body: p.fields.body }],
            kicker: 'OUR STACK',
          },
        };
      }
      if (p.role === 'cta') {
        return { archetype: 'Cta', props: { line: p.fields.line ?? '' } };
      }
      return {
        archetype: 'Statement',
        props: { quote: '', kicker: 'OUR STACK' },
      };
    });
  },

  // 10 — pair the leak / fix content panels into a Split.
  '10-smilefirst-dental-retention': (panels) => {
    const out: RouteDecision[] = [];
    let i = 0;
    let panelIdx = 1;
    while (i < panels.length) {
      const p = panels[i];
      const next = panels[i + 1];
      if (
        p.role === 'content' &&
        next?.role === 'content' &&
        p.fields.title && next.fields.title
      ) {
        out.push({
          archetype: 'Split',
          props: {
            leftLabel:  p.fields.title.toUpperCase(),
            leftBody:   p.fields.body ?? '',
            rightLabel: next.fields.title.toUpperCase(),
            rightBody:  next.fields.body ?? '',
            kicker:     'PATIENT FLOW',
          },
        });
        i += 2;
        panelIdx += 1;
        continue;
      }
      out.push(defaultDecisionForPanel(p, panelIdx, 'PATIENT FLOW'));
      i += 1;
      panelIdx += 1;
    }
    return out;
  },
};

// --- default per-panel decision ---------------------------------------

function defaultDecisionForPanel(
  panel: ParsedPanel,
  panelIndex: number,
  kicker: string,
): RouteDecision {
  const { role, fields } = panel;
  switch (role) {
    case 'hook':
      return {
        archetype: 'Statement',
        props: {
          quote:  fields.hook ?? '',
          kicker: fields.kicker ?? kicker,
        },
      };
    case 'content':
      return {
        archetype: 'StepGrid',
        props: {
          // Single-step content panel: drop the heading (the step's own
          // title is enough — repeating it as a heading reads as a bug).
          heading: '',
          steps: [{
            label: fields.step ?? '',
            title: fields.title ?? '',
            body:  fields.body ?? undefined,
          }],
          kicker,
        },
      };
    case 'stat': {
      const items = fields.items ?? [];
      if (isStatNumericPair(items)) {
        return {
          archetype: 'BigStat',
          props: {
            primary:   `${items[0].value}`,
            secondary: `${items[1].value}`,
            kicker:    `${items[0].label} · ${items[1].label}`,
          },
        };
      }
      return {
        archetype: 'IndexCard',
        props: {
          heading: 'By the numbers',
          rows: items,
          kicker,
        },
      };
    }
    case 'image':
      return {
        archetype: 'Product',
        props: {
          caption: fields.caption ?? 'THE KIND OF TOOL WE BUILD',
          kicker,
          panelIndex,
        },
      };
    case 'cta':
      return { archetype: 'Cta', props: { line: fields.line ?? '' } };
    case 'card': {
      // Statement-card / text default. Try BigStat pair extraction first.
      const quote = fields.quote ?? '';
      const pair = quoteToStatPair(quote);
      if (pair) {
        return {
          archetype: 'BigStat',
          props: {
            primary:   pair.primary,
            secondary: pair.secondary,
            kicker:    fields.label ?? kicker,
          },
        };
      }
      return {
        archetype: 'Statement',
        props: { quote, kicker: fields.label ?? kicker },
      };
    }
  }
}

// --- public entry ------------------------------------------------------

export function routePanels(
  panels: ParsedPanel[],
  slug: string,
): RouteDecision[] {
  const override = SLUG_OVERRIDES[slug];
  const overridden = override?.(panels, slug);
  if (overridden) return overridden;

  const kicker = defaultKicker(slug);
  return panels.map((p, i) => defaultDecisionForPanel(p, i + 1, kicker));
}
