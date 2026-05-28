import * as React from 'react';
import { TOKENS } from '../lib/tokens.js';

type Props = {
  imgPng: string;       // data:image/png;base64,...
  caption: string;      // brand-agnostic, e.g. "THE KIND OF DASHBOARD WE BUILD"
  accent: string;
  monogramPng?: string;
};

export function CarouselImage({ imgPng, caption, accent, monogramPng }: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;
  const PAD = 64;

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
          flex: 1,
          display: 'flex',
          border: `1px solid ${accent}4D`, // ~30% alpha
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={imgPng}
          width={W - PAD * 2}
          height={H - PAD * 2 - 80}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'flex',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
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
