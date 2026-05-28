"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Col = { n: string; headline: string; body: string };

const COLS: Col[] = [
  {
    n: "01",
    headline: "They don’t know your brand.",
    body: "Midjourney makes beautiful images. None of them look like you. Every post starts from zero.",
  },
  {
    n: "02",
    headline: "They don’t think strategically.",
    body: "A prompt makes a picture. It doesn’t decide whether this is an awareness post or a conversion post. You still have to think.",
  },
  {
    n: "03",
    headline: "They can’t be consistent.",
    body: "Same prompt, ten runs, ten different aesthetics. Useful for exploration. Useless for a feed.",
  },
];

export default function Gap() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "clamp(20px, 4vw, 48px)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent-2)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE GAP
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 64px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 16,
            maxWidth: 880,
          }}
        >
          Generic AI makes generic content.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 72,
            maxWidth: 680,
          }}
        >
          Three reasons even good AI tools fail at brand work.
        </motion.p>

        <div className="dc-gap-grid">
          {COLS.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              className="dc-gap-card"
            >
              <p className="dc-gap-n">COLUMN {c.n}</p>
              <h3 className="dc-gap-headline">{c.headline}</h3>
              <p className="dc-gap-body">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .dc-gap-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .dc-gap-card {
          background: var(--page-surface);
          border: 1px solid var(--page-border);
          border-radius: 16px;
          padding: 36px 32px;
        }
        .dc-gap-n {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: var(--page-accent-2);
          margin: 0 0 32px 0;
        }
        .dc-gap-headline {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: var(--page-text);
          margin: 0 0 16px 0;
        }
        .dc-gap-body {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--page-text-2);
          margin: 0;
        }
        @media (min-width: 1024px) {
          .dc-gap-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
