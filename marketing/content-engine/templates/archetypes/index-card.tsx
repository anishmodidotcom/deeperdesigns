import * as React from 'react';
import { TOKENS } from '../../lib/tokens.js';
import { BracketTL, BracketBR, Hairline } from '../../lib/glyphs.js';
import { CornerLabel, MonogramMark } from '../../lib/layout.js';

// Archetype F — INDEX CARD
// Heading 48, then rows of label / value separated by hairlines.
// BracketTL + BracketBR corner accents in accent color.

type Row = { label: string; value: string };

type Props = {
  heading: string;
  rows: Row[];
  kicker: string;
  accent: string;
  monogramPng?: string;
};

export function IndexCardArchetype({ heading, rows, kicker, accent, monogramPng }: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;
  const bounded = rows.slice(0, 6);

  return (
    <div
      style={{
        width: W,
        height: H,
        background: TOKENS.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 36,
        padding: TOKENS.pad.canvas,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <BracketTL size={48} color={accent} opacity={0.8} />
      <BracketBR size={48} color={accent} opacity={0.8} />
      <CornerLabel text={kicker} accent={accent} pos="TL" />

      <div
        style={{
          marginTop: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: 'Geist',
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: TOKENS.colors.textHi,
            maxWidth: 820,
            display: 'flex',
          }}
        >
          {heading}
        </div>
        <div style={{ display: 'flex' }}>
          <Hairline length={64} color={accent} />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 16,
        }}
      >
        {bounded.map((r, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                paddingTop: 18,
                paddingBottom: 18,
                width: 880,
              }}
            >
              <span
                style={{
                  fontFamily: 'Geist Mono',
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: '0.16em',
                  color: TOKENS.colors.textMid,
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                {r.label}
              </span>
              <span
                style={{
                  fontFamily: 'Geist',
                  fontWeight: 600,
                  fontSize: 30,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: TOKENS.colors.textHi,
                  display: 'flex',
                  textAlign: 'right',
                }}
              >
                {r.value}
              </span>
            </div>
            <div style={{ display: 'flex' }}>
              <Hairline length={880} color={TOKENS.colors.textLo} opacity={0.4} />
            </div>
          </div>
        ))}
      </div>

      <MonogramMark monogramPng={monogramPng} />
    </div>
  );
}
