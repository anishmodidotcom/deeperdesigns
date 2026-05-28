import * as React from 'react';

// Inline decorative glyphs the archetype templates compose into.
// Satori accepts JSX; each function returns a flex-rooted div.

type StrokeProps = { size: number; color: string; opacity?: number };

// Corner bracket, top-left: horizontal arm + vertical arm meeting at TL.
export function BracketTL({ size, color, opacity = 1 }: StrokeProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        top: 64,
        width: size,
        height: size,
        display: 'flex',
        opacity,
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, width: size, height: 1, background: color, display: 'flex' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1, height: size, background: color, display: 'flex' }} />
    </div>
  );
}

// Corner bracket, bottom-right.
export function BracketBR({ size, color, opacity = 1 }: StrokeProps) {
  return (
    <div
      style={{
        position: 'absolute',
        right: 64,
        bottom: 64,
        width: size,
        height: size,
        display: 'flex',
        opacity,
      }}
    >
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: size, height: 1, background: color, display: 'flex' }} />
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: 1, height: size, background: color, display: 'flex' }} />
    </div>
  );
}

// Horizontal "→" — line + chevron head. width = total size.
export function ArrowRight({ size, color, opacity = 1 }: StrokeProps) {
  const headW = Math.round(size * 0.25);
  const headH = Math.round(size * 0.32);
  const lineW = size - headW + 2;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: size,
        height: headH,
        position: 'relative',
        opacity,
      }}
    >
      <div
        style={{
          width: lineW,
          height: 2,
          background: color,
          display: 'flex',
        }}
      />
      {/* chevron — two short rotated bars forming a > */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: headW,
          height: headH,
          display: 'flex',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: headW / 2,
            top: 0,
            width: 2,
            height: headH * 0.75,
            background: color,
            transform: 'rotate(-45deg)',
            transformOrigin: 'top right',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: headW / 2,
            bottom: 0,
            width: 2,
            height: headH * 0.75,
            background: color,
            transform: 'rotate(45deg)',
            transformOrigin: 'bottom right',
            display: 'flex',
          }}
        />
      </div>
    </div>
  );
}

// Generic 1px rule. Horizontal by default; pass `vertical` for vertical.
export function Hairline({
  length,
  vertical = false,
  color,
  opacity = 1,
}: {
  length: number;
  vertical?: boolean;
  color: string;
  opacity?: number;
}) {
  return (
    <div
      style={{
        width: vertical ? 1 : length,
        height: vertical ? length : 1,
        background: color,
        opacity,
        display: 'flex',
      }}
    />
  );
}

// Filled semicircle for corner accents.
export function HalfCircle({
  radius,
  color,
  opacity = 1,
}: {
  radius: number;
  color: string;
  opacity?: number;
}) {
  return (
    <div
      style={{
        width: radius * 2,
        height: radius,
        background: color,
        opacity,
        borderRadius: `${radius}px ${radius}px 0 0`,
        display: 'flex',
      }}
    />
  );
}
