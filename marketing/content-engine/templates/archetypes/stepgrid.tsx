import * as React from 'react';
import { TOKENS } from '../../lib/tokens.js';
import { Hairline } from '../../lib/glyphs.js';
import { CornerLabel, MonogramMark } from '../../lib/layout.js';

// Archetype D — STEP GRID
// Heading at top, then stacked steps: mono label (accent), 38px title,
// 24px body, hairline. Max 4 steps. Anything beyond is truncated.

type Step = {
  label: string;   // "01" / "STEP 01" / "WEEK 01"
  title: string;
  body?: string;
};

type Props = {
  heading: string;
  steps: Step[];
  kicker: string;
  accent: string;
  monogramPng?: string;
};

export function StepGridArchetype({ heading, steps, kicker, accent, monogramPng }: Props) {
  const W = TOKENS.size.sq;
  const H = TOKENS.size.sq;
  const bounded = steps.slice(0, 4);
  // Single-step panels get larger type so they don't read as thin.
  const single = bounded.length === 1;
  const titleSize = single ? 72 : 38;
  const bodySize  = single ? 30 : 24;

  return (
    <div
      style={{
        width: W,
        height: H,
        background: TOKENS.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 36,
        padding: TOKENS.pad.canvas,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Geist',
        color: TOKENS.colors.textHi,
      }}
    >
      <CornerLabel text={kicker} accent={accent} pos="TL" />

      {heading ? (
        <div
          style={{
            marginTop: 56,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              fontFamily: 'Geist',
              fontWeight: 600,
              fontSize: 52,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: TOKENS.colors.textHi,
              maxWidth: 820,
              display: 'flex',
            }}
          >
            {heading}
          </div>
          <div style={{ display: 'flex', marginTop: 6 }}>
            <Hairline length={64} color={accent} />
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 56, display: 'flex' }} />
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          marginTop: 8,
        }}
      >
        {bounded.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'Geist Mono',
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '0.16em',
                color: accent,
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              {s.label}
            </span>
            <div
              style={{
                fontFamily: 'Geist',
                fontWeight: 600,
                fontSize: titleSize,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: TOKENS.colors.textHi,
                maxWidth: 880,
                display: 'flex',
              }}
            >
              {s.title}
            </div>
            {s.body ? (
              <div
                style={{
                  fontFamily: 'Geist',
                  fontWeight: 400,
                  fontSize: bodySize,
                  lineHeight: 1.4,
                  color: TOKENS.colors.textMid,
                  maxWidth: 820,
                  display: 'flex',
                }}
              >
                {s.body}
              </div>
            ) : null}
            <div style={{ display: 'flex', marginTop: 12 }}>
              <Hairline length={880} color={TOKENS.colors.textLo} opacity={0.4} />
            </div>
          </div>
        ))}
      </div>

      <MonogramMark monogramPng={monogramPng} />
    </div>
  );
}
