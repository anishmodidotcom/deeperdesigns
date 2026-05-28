import * as React from 'react';
import { TOKENS } from '../lib/tokens.js';

type Props = {
  step?: string;     // e.g. "01" or "STEP 02"
  title: string;
  body: string;
  accent: string;
  monogramPng?: string;
};

export function CarouselContent({ step, title, body, accent, monogramPng }: Props) {
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
        justifyContent: 'flex-start',
        gap: 28,
        padding: PAD,
        position: 'relative',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      {step ? (
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
          {step}
        </span>
      ) : null}

      <div
        style={{
          fontFamily: TOKENS.type.sansLarge.fontFamily,
          fontWeight: TOKENS.type.sansLarge.fontWeight,
          fontSize: TOKENS.type.sansLarge.fontSize,
          lineHeight: TOKENS.type.sansLarge.lineHeight,
          letterSpacing: '-0.02em',
          color: TOKENS.colors.textHi,
          maxWidth: 880,
          display: 'flex',
        }}
      >
        {title}
      </div>

      <div style={{ width: 64, height: 3, background: accent, display: 'flex' }} />

      <div
        style={{
          fontFamily: TOKENS.type.body.fontFamily,
          fontWeight: TOKENS.type.body.fontWeight,
          fontSize: TOKENS.type.body.fontSize,
          lineHeight: TOKENS.type.body.lineHeight,
          color: TOKENS.colors.textMid,
          maxWidth: 820,
          display: 'flex',
        }}
      >
        {body}
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
