import * as React from 'react';
import { TOKENS } from '../lib/tokens.js';

type Item = { label: string; value: string };

type Props = {
  items: Item[];
  accent: string;
  monogramPng?: string;
};

export function CarouselStat({ items, accent, monogramPng }: Props) {
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
        gap: 56,
        padding: PAD,
        position: 'relative',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span
            style={{
              fontFamily: TOKENS.type.micro.fontFamily,
              fontWeight: TOKENS.type.micro.fontWeight,
              fontSize: TOKENS.type.micro.fontSize,
              letterSpacing: TOKENS.type.micro.letterSpacing,
              color: accent,
              textTransform: 'uppercase',
            }}
          >
            {it.label}
          </span>
          <span
            style={{
              fontFamily: TOKENS.type.sansHero.fontFamily,
              fontWeight: TOKENS.type.sansHero.fontWeight,
              fontSize: TOKENS.type.sansHero.fontSize,
              lineHeight: TOKENS.type.sansHero.lineHeight,
              letterSpacing: '-0.03em',
              color: TOKENS.colors.textHi,
            }}
          >
            {it.value}
          </span>
        </div>
      ))}

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
