import * as React from 'react';
import { TOKENS } from '../lib/tokens.js';

type Props = {
  hook: string;
  kicker?: string;   // e.g. "DEEPER DESIGNS" or "PROTOTYPE"
  accent: string;
  monogramPng?: string;
};

export function CarouselHook({ hook, kicker, accent, monogramPng }: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;
  const PAD = TOKENS.pad.canvas;

  return (
    <div
      style={{
        width: W,
        height: H,
        background: TOKENS.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: PAD,
        position: 'relative',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <div style={{ display: 'flex' }}>
        <span
          style={{
            fontFamily: TOKENS.type.label.fontFamily,
            fontWeight: TOKENS.type.label.fontWeight,
            fontSize: TOKENS.type.label.fontSize,
            letterSpacing: TOKENS.type.label.letterSpacing,
            color: accent,
            textTransform: 'uppercase',
          }}
        >
          {kicker ?? 'DEEPER DESIGNS'}
        </span>
      </div>

      <div
        style={{
          fontFamily: TOKENS.type.serifHero.fontFamily,
          fontStyle: TOKENS.type.serifHero.fontStyle,
          fontWeight: 400,
          fontSize: TOKENS.type.serifHero.fontSize,
          lineHeight: TOKENS.type.serifHero.lineHeight,
          color: TOKENS.colors.textHi,
          letterSpacing: '-0.01em',
          maxWidth: 880,
          display: 'flex',
        }}
      >
        {hook}
      </div>

      {monogramPng ? (
        <img
          src={monogramPng}
          width={48}
          height={24}
          alt=""
          style={{
            position: 'absolute',
            right: PAD,
            bottom: PAD,
            opacity: 0.6,
          }}
        />
      ) : null}
    </div>
  );
}
