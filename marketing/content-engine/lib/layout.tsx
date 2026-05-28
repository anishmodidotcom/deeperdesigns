import * as React from 'react';
import { TOKENS } from './tokens.js';

// Layout helpers shared across archetype templates.
// All helpers return Satori-safe flex-rooted JSX.

// Outsized, low-opacity numeral / glyph that bleeds off the bottom-right
// corner to give STATEMENT and BIG STAT archetypes depth without ink.
// Parent must `overflow: hidden` and `position: relative`. Document
// order keeps this below subsequent siblings.
export function BgNumeral({ text }: { text: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: -60,
        bottom: -120,
        display: 'flex',
        fontFamily: 'Geist',
        fontWeight: 600,
        fontSize: 520,
        lineHeight: 1,
        color: TOKENS.colors.textHi,
        opacity: 0.06,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}
    >
      {text}
    </div>
  );
}

// Mono micro label anchored to a named corner at 96px inset.
// If `text` contains a '·', the first segment renders in `accent` and the
// remainder in textMid; otherwise the whole label uses textMid.
export type CornerPos = 'TL' | 'BL' | 'BR' | 'TR';

export function CornerLabel({
  text,
  accent,
  pos,
}: {
  text: string;
  accent: string;
  pos: CornerPos;
}) {
  const inset = TOKENS.pad.canvas;
  const anchor: React.CSSProperties =
    pos === 'TL' ? { left: inset, top: inset } :
    pos === 'TR' ? { right: inset, top: inset } :
    pos === 'BL' ? { left: inset, bottom: inset } :
                   { right: inset, bottom: inset };

  const dotIdx = text.indexOf('·');
  const head = dotIdx >= 0 ? text.slice(0, dotIdx).trim() : text;
  const tail = dotIdx >= 0 ? text.slice(dotIdx).trim() : '';

  return (
    <div
      style={{
        position: 'absolute',
        ...anchor,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'Geist Mono',
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ display: 'flex', color: accent }}>{head}</span>
      {tail ? (
        <span style={{ display: 'flex', color: TOKENS.colors.textMid }}>{tail}</span>
      ) : null}
    </div>
  );
}

// Small monogram mark, bottom-right 64px inset, 60% opacity.
export function MonogramMark({ monogramPng }: { monogramPng?: string }) {
  if (!monogramPng) return null;
  return (
    <img
      src={monogramPng}
      width={48}
      height={24}
      alt=""
      style={{
        position: 'absolute',
        right: 64,
        bottom: 64,
        opacity: 0.6,
      }}
    />
  );
}

// Wordmark for CTA / statement footers. Centered horizontally at the
// given `bottom` inset; height fixed at 28px.
export function WordmarkMark({
  wordmarkPng,
  bottom = TOKENS.pad.canvas,
}: {
  wordmarkPng?: string;
  bottom?: number;
}) {
  if (!wordmarkPng) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <img src={wordmarkPng} height={28} alt="" style={{ height: 28 }} />
    </div>
  );
}
