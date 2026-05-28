import * as React from 'react';
import { TOKENS } from '../../lib/tokens.js';
import { CornerLabel, MonogramMark } from '../../lib/layout.js';

// Archetype E — PRODUCT
// 920x760 image at 80px top padding, 40%-opacity accent border.
// Caption row below in mono micro, monogram BR. Caller pre-crops the
// source buffer to PRODUCT_IMAGE_DIMS.

const IMG_W = 920;
const IMG_H = 760;

type Props = {
  imgPng: string;         // data:image/png;base64,... pre-cropped to IMG_W x IMG_H
  caption: string;
  kicker: string;
  accent: string;
  monogramPng?: string;
};

export function ProductArchetype({ imgPng, caption, kicker, accent, monogramPng }: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;

  // accent at 0.4 opacity, baked into a hex8 (alpha = 0x66).
  const accentBorder = `${accent}66`;

  return (
    <div
      style={{
        width: W,
        height: H,
        background: TOKENS.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 24,
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
        paddingLeft: TOKENS.pad.canvas,
        paddingRight: TOKENS.pad.canvas,
        paddingBottom: TOKENS.pad.canvas,
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <CornerLabel text={kicker} accent={accent} pos="TL" />

      <div
        style={{
          width: IMG_W,
          height: IMG_H,
          display: 'flex',
          border: `1px solid ${accentBorder}`,
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
          marginTop: 40,
        }}
      >
        <img
          src={imgPng}
          width={IMG_W}
          height={IMG_H}
          alt=""
          style={{ width: IMG_W, height: IMG_H, display: 'flex' }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: IMG_W,
          marginTop: 8,
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
          {caption}
        </span>
      </div>

      <MonogramMark monogramPng={monogramPng} />
    </div>
  );
}

export const PRODUCT_IMAGE_DIMS = { width: IMG_W, height: IMG_H } as const;
