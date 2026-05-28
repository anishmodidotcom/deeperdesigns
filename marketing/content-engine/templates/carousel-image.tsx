import * as React from 'react';
import { TOKENS } from '../lib/tokens.js';

type Props = {
  imgPng: string;       // data:image/png;base64,... already cover-cropped to IMG_W x IMG_H
  caption: string;
  accent: string;
  monogramPng?: string;
};

// Panel canvas math (1080 square):
//   padding 64 each side
//   caption row at the bottom takes 80
// -> inner image area is 1080-128 = 952 wide
//                        1080-128-80 = 872 tall
//
// Both the container and the <img> are sized in pixels. Satori applies
// `object-fit: cover` reliably only when the parent has fixed width and
// height (not flex-grow), AND the source buffer is pre-cropped to the
// exact target dimensions. lib/assets.ts cropToPanelBuffer handles the
// crop; this template just embeds the buffer at its native size.
const PAD = 64;
const IMG_W = 952;
const IMG_H = 872;

export function CarouselImage({ imgPng, caption, accent, monogramPng }: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;

  return (
    <div
      style={{
        width: W,
        height: H,
        background: TOKENS.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        padding: PAD,
        position: 'relative',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <div
        style={{
          width: IMG_W,
          height: IMG_H,
          display: 'flex',
          border: `1px solid ${accent}4D`,
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={imgPng}
          width={IMG_W}
          height={IMG_H}
          alt=""
          style={{
            width: IMG_W,
            height: IMG_H,
            display: 'flex',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 24,
          width: IMG_W,
        }}
      >
        <span
          style={{
            fontFamily: TOKENS.type.micro.fontFamily,
            fontWeight: TOKENS.type.micro.fontWeight,
            fontSize: TOKENS.type.micro.fontSize,
            letterSpacing: TOKENS.type.micro.letterSpacing,
            color: TOKENS.colors.textMid,
            textTransform: 'uppercase',
          }}
        >
          {caption}
        </span>

        {monogramPng ? (
          <img src={monogramPng} width={48} height={24} alt="" style={{ opacity: 0.6 }} />
        ) : null}
      </div>
    </div>
  );
}

// Re-exported so generate-post.ts can pre-crop the source to the same
// dimensions the template expects.
export const PANEL_IMAGE_DIMS = { width: IMG_W, height: IMG_H } as const;
