"use client";

import { motion } from "motion/react";
import type { Industry } from "@/lib/industries";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function IndustryVoices({
  voices,
}: {
  voices: NonNullable<Industry["voices"]>;
}) {
  return (
    <section style={{ paddingBlock: "var(--dd-section-py, 120px)" }} aria-label="Representative voices">
      <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
        <div className="ind-voices">
          <Card
            tag="BEFORE"
            quote={voices.before.quote}
            who={voices.before.who}
            accent={false}
          />
          <Card
            tag="AFTER"
            quote={voices.after.quote}
            who={voices.after.who}
            accent
          />
        </div>
      </div>
      <style>{`
        .ind-voices {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .ind-voices { grid-template-columns: 1fr 1fr; gap: 24px; }
        }
      `}</style>
    </section>
  );
}

function Card({
  tag,
  quote,
  who,
  accent,
}: {
  tag: string;
  quote: string;
  who: string;
  accent: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{
        margin: 0,
        background: "var(--dd-surface-1, #111111)",
        border: accent
          ? "1px solid var(--page-accent)"
          : "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        borderRadius: 16,
        padding: "30px 30px 26px",
      }}
    >
      <figcaption
        className="mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.16em",
          color: accent ? "var(--page-accent)" : "var(--dd-text-low, #6B6B6B)",
          margin: "0 0 22px",
        }}
      >
        {tag}
      </figcaption>
      <blockquote
        style={{
          margin: 0,
          fontFamily:
            "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(22px, 2.6vw, 30px)",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: "var(--dd-bone, #F5F4EF)",
        }}
      >
        {quote}
      </blockquote>
      <p
        style={{
          marginTop: 22,
          fontSize: 13,
          lineHeight: 1.5,
          color: "var(--dd-text-low, #6B6B6B)",
        }}
      >
        {who}
      </p>
    </motion.figure>
  );
}
