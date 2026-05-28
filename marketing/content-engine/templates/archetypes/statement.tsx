import * as React from 'react';
import { TOKENS } from '../../lib/tokens.js';
import { BracketTL } from '../../lib/glyphs.js';
import { BgNumeral, CornerLabel, MonogramMark } from '../../lib/layout.js';

// Archetype A — STATEMENT
// One italic serif quote, centred vertically. Background numeral '"'
// for depth, corner bracket TL, mono kicker label TL, accent hairline
// under the quote, monogram BR.

type Props = {
  quote: string;
  kicker: string;          // e.g. "HOOK · DEEPER DESIGNS"
  accent: string;
  monogramPng?: string;
};

export function StatementArchetype({ quote, kicker, accent, monogramPng }: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;

  return (
    <div
      style={{
        width: W,
        height: H,
        background: TOKENS.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: TOKENS.pad.canvas,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <BgNumeral text={'"'} />
      <BracketTL size={48} color={accent} opacity={0.7} />
      <CornerLabel text={kicker} accent={accent} pos="TL" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
          maxWidth: 880,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Instrument Serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 76,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: TOKENS.colors.textHi,
            display: 'flex',
            textAlign: 'center',
          }}
        >
          {quote}
        </div>
        <div style={{ width: 80, height: 3, background: accent, display: 'flex' }} />
      </div>

      <MonogramMark monogramPng={monogramPng} />
    </div>
  );
}
