import * as React from 'react';
import { TOKENS } from '../lib/tokens.js';

type Props = {
  line: string;
  accent: string;
  whatsapp?: string;  // default "wa.me/919968716498"
  site?: string;      // default "deeperdesigns.in"
  wordmarkPng?: string;
};

export function CarouselCta({
  line,
  accent,
  whatsapp = 'wa.me/919968716498',
  site = 'deeperdesigns.in',
  wordmarkPng,
}: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;
  const PAD = TOKENS.pad.loose;

  return (
    <div
      style={{
        width: W,
        height: H,
        background: TOKENS.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: PAD,
        position: 'relative',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        {wordmarkPng ? (
          <img src={wordmarkPng} width={220} height={Math.round(220 * (36/480))} alt="" />
        ) : (
          <span style={{
            fontFamily: 'Geist', fontWeight: 600, fontSize: 18,
            letterSpacing: '0.20em', color: TOKENS.colors.textHi, textTransform: 'uppercase',
          }}>
            DEEPER DESIGNS
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
          maxWidth: 820,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: TOKENS.type.serifLarge.fontFamily,
            fontStyle: TOKENS.type.serifLarge.fontStyle,
            fontWeight: 400,
            fontSize: TOKENS.type.serifLarge.fontSize,
            lineHeight: TOKENS.type.serifLarge.lineHeight,
            letterSpacing: '-0.01em',
            color: TOKENS.colors.textHi,
            display: 'flex',
            textAlign: 'center',
          }}
        >
          {line}
        </div>
        <div style={{ width: 80, height: 3, background: accent, display: 'flex' }} />
      </div>

      <span
        style={{
          fontFamily: TOKENS.type.label.fontFamily,
          fontWeight: TOKENS.type.label.fontWeight,
          fontSize: TOKENS.type.label.fontSize,
          letterSpacing: TOKENS.type.label.letterSpacing,
          color: TOKENS.colors.textMid,
          textTransform: 'uppercase',
        }}
      >
        {whatsapp} · {site}
      </span>
    </div>
  );
}
