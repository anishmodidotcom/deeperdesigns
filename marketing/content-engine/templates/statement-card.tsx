import * as React from 'react';
import { TOKENS } from '../lib/tokens.js';

type Props = {
  quote: string;
  label: string;          // e.g. "DEEPER DESIGNS · A NOTE"
  accent: string;         // hex
  monogramPng?: string;   // data:image/png;base64,...
  wordmarkPng?: string;   // data:image/png;base64,...
};

export function StatementCard({ quote, label, accent, monogramPng, wordmarkPng }: Props) {
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
        justifyContent: 'space-between',
        padding: PAD,
        position: 'relative',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      {/* TOP: label */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
          {label}
        </span>
      </div>

      {/* CENTER: accent rule + quote */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          maxWidth: 880,
          alignSelf: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 80,
            height: 3,
            background: accent,
            display: 'flex',
          }}
        />
        <div
          style={{
            fontFamily: TOKENS.type.serifLarge.fontFamily,
            fontStyle: TOKENS.type.serifLarge.fontStyle,
            fontWeight: 400,
            fontSize: TOKENS.type.serifLarge.fontSize,
            lineHeight: TOKENS.type.serifLarge.lineHeight,
            color: TOKENS.colors.textHi,
            letterSpacing: '-0.01em',
            display: 'flex',
            textAlign: 'center',
          }}
        >
          {quote}
        </div>
      </div>

      {/* BOTTOM: wordmark */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {wordmarkPng ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={wordmarkPng} width={220} height={Math.round(220 * (36/480))} alt="" />
        ) : (
          <span
            style={{
              fontFamily: 'Geist',
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: '0.20em',
              color: TOKENS.colors.textHi,
              textTransform: 'uppercase',
            }}
          >
            DEEPER DESIGNS
          </span>
        )}
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
