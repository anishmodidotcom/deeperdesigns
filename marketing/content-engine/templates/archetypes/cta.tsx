import * as React from 'react';
import { TOKENS } from '../../lib/tokens.js';
import { Hairline } from '../../lib/glyphs.js';

// Restyled CTA — wordmark on top, italic serif line, accent hairline,
// then handle row. Same role as the legacy carousel-cta but composed
// from the archetype primitives so the deck reads as one system.

type Props = {
  line: string;
  accent: string;
  whatsapp?: string;
  site?: string;
  wordmarkPng?: string;
};

export function CtaArchetype({
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
        overflow: 'hidden',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {wordmarkPng ? (
          <img src={wordmarkPng} height={36} alt="" style={{ height: 36 }} />
        ) : (
          <span
            style={{
              fontFamily: 'Geist',
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: '0.20em',
              color: TOKENS.colors.textHi,
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
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
            fontFamily: 'Instrument Serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 60,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: TOKENS.colors.textHi,
            display: 'flex',
            textAlign: 'center',
          }}
        >
          {line}
        </div>
        <Hairline length={80} color={accent} />
      </div>

      <span
        style={{
          fontFamily: 'Geist Mono',
          fontWeight: 500,
          fontSize: 17,
          letterSpacing: '0.18em',
          color: TOKENS.colors.textMid,
          textTransform: 'uppercase',
          display: 'flex',
        }}
      >
        {whatsapp} · {site}
      </span>
    </div>
  );
}
