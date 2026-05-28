import * as React from 'react';
import { TOKENS } from '../../lib/tokens.js';
import { ArrowRight } from '../../lib/glyphs.js';
import { BgNumeral, CornerLabel, MonogramMark } from '../../lib/layout.js';

// Archetype B — BIG STAT
// One primary number set in Geist 200px (or 140 if length > 8 chars).
// Optional arrow + secondary value in accent. Kicker mono label TL.
// Background numeral echoes the first digit for depth.

type Props = {
  primary: string;          // e.g. "7 days", "0 to 1", "92%"
  secondary?: string;       // optional second value rendered in accent
  kicker: string;           // mono label, e.g. "QUOTE TIME · STEEL"
  accent: string;
  monogramPng?: string;
};

export function BigStatArchetype({ primary, secondary, kicker, accent, monogramPng }: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;

  // Background glyph: first digit of the primary, else first char.
  const digitMatch = primary.match(/\d/);
  const bgChar = digitMatch ? digitMatch[0] : primary.charAt(0);

  const primaryFontSize = primary.length > 8 ? 140 : 200;

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
      <BgNumeral text={bgChar} />
      <CornerLabel text={kicker} accent={accent} pos="TL" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          maxWidth: 920,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'Geist',
            fontWeight: 600,
            fontSize: primaryFontSize,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: TOKENS.colors.textHi,
            display: 'flex',
          }}
        >
          {primary}
        </span>

        {secondary ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <ArrowRight size={64} color={accent} />
            <span
              style={{
                fontFamily: 'Geist',
                fontWeight: 600,
                fontSize: primaryFontSize,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: accent,
                display: 'flex',
              }}
            >
              {secondary}
            </span>
          </div>
        ) : null}
      </div>

      <MonogramMark monogramPng={monogramPng} />
    </div>
  );
}
