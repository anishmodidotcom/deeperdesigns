import * as React from 'react';
import { TOKENS } from '../lib/tokens.js';

// Used as the image-role fallback when the source ambient screenshot
// doesn't cover-crop cleanly (content concentrated in one zone).
// Renders the panel's caption as a centred mono headline with the
// accent rule below. Reads as an intentional section divider in the
// carousel, never as a half-empty image panel.

type Props = {
  caption: string;          // e.g. "ALL FEEDS · ONE VIEW"
  accent: string;
  monogramPng?: string;
};

export function CarouselDivider({ caption, accent, monogramPng }: Props) {
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
        justifyContent: 'center',
        gap: 32,
        padding: PAD,
        position: 'relative',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <span
        style={{
          fontFamily: 'Geist',
          fontWeight: 600,
          fontSize: 56,
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
          color: TOKENS.colors.textHi,
          textAlign: 'center',
          textTransform: 'uppercase',
          maxWidth: 820,
          display: 'flex',
        }}
      >
        {caption}
      </span>
      <div style={{ width: 80, height: 3, background: accent, display: 'flex' }} />

      {monogramPng ? (
        <img
          src={monogramPng}
          width={48}
          height={24}
          alt=""
          style={{
            position: 'absolute',
            right: TOKENS.pad.canvas,
            bottom: TOKENS.pad.canvas,
            opacity: 0.6,
          }}
        />
      ) : null}
    </div>
  );
}
