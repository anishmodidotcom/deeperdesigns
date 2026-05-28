import * as React from 'react';
import { TOKENS } from '../../lib/tokens.js';
import { ArrowRight, Hairline } from '../../lib/glyphs.js';
import { CornerLabel, MonogramMark } from '../../lib/layout.js';

// Archetype C — SPLIT (before / after)
// Vertical split. Left half = textMid on bg, right half = textHi on
// #111113 panel. Centred vertical hairline + arrow as divider. Mono
// micro labels on each side.

type Props = {
  leftLabel: string;
  leftBody: string;
  rightLabel: string;
  rightBody: string;
  kicker: string;
  accent: string;
  monogramPng?: string;
};

export function SplitArchetype({
  leftLabel,
  leftBody,
  rightLabel,
  rightBody,
  kicker,
  accent,
  monogramPng,
}: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;

  return (
    <div
      style={{
        width: W,
        height: H,
        background: TOKENS.colors.bg,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      {/* LEFT — BEFORE */}
      <div
        style={{
          width: W / 2,
          height: H,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 24,
          padding: TOKENS.pad.canvas,
          background: TOKENS.colors.bg,
        }}
      >
        <span
          style={{
            fontFamily: 'Geist Mono',
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.16em',
            color: TOKENS.colors.textLo,
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          {leftLabel}
        </span>
        <Hairline length={64} color={TOKENS.colors.textLo} />
        <div
          style={{
            fontFamily: 'Geist',
            fontWeight: 500,
            fontSize: 38,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: TOKENS.colors.textMid,
            maxWidth: 380,
            display: 'flex',
          }}
        >
          {leftBody}
        </div>
      </div>

      {/* DIVIDER — vertical hairline + arrow */}
      <div
        style={{
          position: 'absolute',
          left: W / 2 - 32,
          top: 0,
          width: 64,
          height: H,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <Hairline length={(H - 160) / 2} vertical color={TOKENS.colors.textLo} opacity={0.7} />
        <div style={{ display: 'flex', transform: 'rotate(90deg)' }}>
          <ArrowRight size={48} color={accent} />
        </div>
        <Hairline length={(H - 160) / 2} vertical color={TOKENS.colors.textLo} opacity={0.7} />
      </div>

      {/* RIGHT — AFTER */}
      <div
        style={{
          width: W / 2,
          height: H,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 24,
          padding: TOKENS.pad.canvas,
          background: TOKENS.colors.bgPanel,
        }}
      >
        <span
          style={{
            fontFamily: 'Geist Mono',
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.16em',
            color: accent,
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          {rightLabel}
        </span>
        <Hairline length={64} color={accent} />
        <div
          style={{
            fontFamily: 'Geist',
            fontWeight: 600,
            fontSize: 38,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: TOKENS.colors.textHi,
            maxWidth: 380,
            display: 'flex',
          }}
        >
          {rightBody}
        </div>
      </div>

      {/* KICKER (above split, top-left corner of canvas) */}
      <CornerLabel text={kicker} accent={accent} pos="TL" />

      <MonogramMark monogramPng={monogramPng} />
    </div>
  );
}
