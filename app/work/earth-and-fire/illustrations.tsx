// Hand-drawn Rajasthani-inspired decorative SVGs used across the Earth and
// Fire showcase. All strokes only, 1.5px, terracotta near-black tone.

import type { CSSProperties } from "react";

type Props = {
  width?: number;
  className?: string;
  style?: CSSProperties;
};

const STROKE = "currentColor";

export function LotusBorder({ width = 120, style }: Props) {
  return (
    <svg
      width={width}
      viewBox="0 0 240 30"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ overflow: "visible", ...style }}
    >
      <line x1="0" y1="15" x2="95" y2="15" />
      <line x1="145" y1="15" x2="240" y2="15" />
      <path d="M 120 5 C 112 9, 108 13, 105 17 C 109 21, 114 23, 120 23 C 126 23, 131 21, 135 17 C 132 13, 128 9, 120 5 Z" />
      <path d="M 120 8 C 116 13, 116 18, 120 21" />
      <path d="M 110 14 C 115 14, 118 14, 120 14" />
      <path d="M 130 14 C 125 14, 122 14, 120 14" />
    </svg>
  );
}

export function PaisleyOrnament({ width = 56, style }: Props) {
  return (
    <svg
      width={width}
      viewBox="0 0 56 56"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={style}
    >
      <path d="M 18 50 C 8 42, 6 30, 14 18 C 22 6, 38 4, 46 12 C 52 18, 50 28, 42 32 C 36 35, 30 32, 28 26 C 27 22, 30 18, 34 19 C 37 20, 38 23, 36 25" />
      <path d="M 22 44 C 18 36, 22 28, 30 26" />
    </svg>
  );
}

export function HennaVine({ width = 60, style }: Props) {
  return (
    <svg
      width={width}
      viewBox="0 0 60 600"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={style}
    >
      <path d="M 30 10 C 20 60, 40 110, 30 160 C 18 210, 42 260, 30 310 C 20 360, 40 410, 30 460 C 18 510, 42 560, 30 590" />
      {[60, 130, 200, 270, 340, 410, 480, 550].map((y, i) => (
        <g key={y}>
          <path
            d={`M 30 ${y} C ${i % 2 === 0 ? 18 : 42} ${y - 8}, ${i % 2 === 0 ? 12 : 48} ${y}, ${i % 2 === 0 ? 20 : 40} ${y + 10}`}
          />
          <circle cx={i % 2 === 0 ? 14 : 46} cy={y - 2} r="2" />
          <circle cx={i % 2 === 0 ? 20 : 40} cy={y + 8} r="1.5" />
        </g>
      ))}
    </svg>
  );
}

export function PeacockFeather({ width = 480, style }: Props) {
  return (
    <svg
      width={width}
      viewBox="0 0 480 600"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ overflow: "visible", ...style }}
    >
      <path d="M 240 580 C 230 480, 215 380, 220 300 C 225 240, 240 200, 260 160 C 280 120, 285 80, 270 40 C 260 20, 245 12, 240 20 C 235 28, 240 36, 250 36" />
      {[
        [240, 80, 90],
        [220, 130, 70],
        [205, 200, 55],
        [195, 260, 45],
        [200, 320, 50],
        [215, 370, 60],
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.7} />
          <ellipse cx={cx} cy={cy} rx={r * 0.6} ry={r * 0.4} />
          <circle cx={cx} cy={cy} r={r * 0.18} />
        </g>
      ))}
      <path d="M 240 580 C 280 540, 320 480, 360 420" />
      <path d="M 240 580 C 200 540, 160 480, 120 420" />
    </svg>
  );
}

export function JharokhaArch({ width = 360, style }: Props) {
  return (
    <svg
      width={width}
      viewBox="0 0 360 240"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ overflow: "visible", ...style }}
    >
      <path d="M 30 235 L 30 100 C 30 50, 60 20, 180 20 C 300 20, 330 50, 330 100 L 330 235" />
      <path d="M 50 235 L 50 110 C 50 65, 78 38, 180 38 C 282 38, 310 65, 310 110 L 310 235" />
      <path d="M 180 22 L 180 14" />
      <path d="M 174 14 C 178 8, 182 8, 186 14 C 184 18, 180 20, 180 22 C 180 20, 176 18, 174 14 Z" />
      {[
        [120, 60],
        [180, 50],
        [240, 60],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <path
            d={`M ${cx} ${cy} C ${cx - 4} ${cy - 8}, ${cx + 4} ${cy - 8}, ${cx} ${cy + 4}`}
          />
          <circle cx={cx} cy={cy + 6} r="1.5" />
        </g>
      ))}
    </svg>
  );
}

export function Mandala({ width = 720, style }: Props) {
  const rings = [320, 280, 240, 200, 160, 120, 80, 40];
  const petals = 16;
  return (
    <svg
      width={width}
      viewBox="0 0 720 720"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ overflow: "visible", ...style }}
    >
      {rings.map((r) => (
        <circle key={r} cx="360" cy="360" r={r} />
      ))}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * Math.PI * 2;
        const x1 = 360 + Math.cos(angle) * 40;
        const y1 = 360 + Math.sin(angle) * 40;
        const x2 = 360 + Math.cos(angle) * 320;
        const y2 = 360 + Math.sin(angle) * 320;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.65" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const cx = 360 + Math.cos(angle) * 240;
        const cy = 360 + Math.sin(angle) * 240;
        return <circle key={i} cx={cx} cy={cy} r="14" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const cx = 360 + Math.cos(angle) * 160;
        const cy = 360 + Math.sin(angle) * 160;
        return <circle key={i} cx={cx} cy={cy} r="10" />;
      })}
      <circle cx="360" cy="360" r="6" />
    </svg>
  );
}

export function PaisleyBullet({ width = 14, style }: Props) {
  return (
    <svg
      width={width}
      viewBox="0 0 14 14"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0, ...style }}
    >
      <path d="M 4 12 C 0 9, 0 6, 3 3 C 7 0, 11 1, 13 4 C 14 7, 12 9, 9 9 C 7 9, 6 7, 7 5" />
    </svg>
  );
}
