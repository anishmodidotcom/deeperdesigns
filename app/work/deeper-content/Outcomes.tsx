"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Card = { eyebrow: string; headline: string; body: string };

const CARDS: Card[] = [
  {
    eyebrow: "CONSISTENCY",
    headline: "Every post sounds like you.",
    body: "Your voice, your visual world, your tone of address. Locked in once, applied to every generation.",
  },
  {
    eyebrow: "SPEED",
    headline: "From idea to finished post in minutes.",
    body: "Three inputs. Six ideas. The one you pick, shipped. No briefs to write, no edits to chase.",
  },
  {
    eyebrow: "OWNERSHIP",
    headline: "You own everything it makes.",
    body: "Every generation belongs to your brand. We don't reuse it, train on it, or expose it to anyone else.",
  },
  {
    eyebrow: "STRATEGIC",
    headline: "It thinks before it writes.",
    body: "Trained on your category, your audience, and your funnel. Every output is brand-aware, not just brand-styled.",
  },
];

export default function Outcomes() {
  return (
    <section style={{ paddingBlock: 144, borderTop: "1px solid var(--page-border)", background: "var(--page-surface)" }}>
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto", paddingInline: "clamp(20px, 4vw, 48px)" }}
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
          WHAT YOU GET
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
            marginBottom: 64,
            maxWidth: 880,
          }}
        >
          Strategic content. Your brand voice. On demand.
        </motion.h2>

        <div className="dc-outcomes-grid">
          {CARDS.map((c, i) => (
            <motion.article
              key={c.eyebrow}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
              className="dc-outcome-card"
            >
              <p className="dc-outcome-eyebrow">{c.eyebrow}</p>
              <h3 className="dc-outcome-headline">{c.headline}</h3>
              <p className="dc-outcome-body">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .dc-outcomes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .dc-outcome-card {
          background: var(--page-bg);
          border: 1px solid var(--page-border);
          border-radius: 14px;
          padding: 32px;
        }
        .dc-outcome-eyebrow {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--page-accent-2);
          margin: 0 0 20px 0;
        }
        .dc-outcome-headline {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-weight: 600;
          font-size: 24px;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: var(--page-text);
          margin: 0 0 14px 0;
        }
        .dc-outcome-body {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--page-text-2);
          margin: 0;
        }
        @media (min-width: 768px) {
          .dc-outcomes-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1100px) {
          .dc-outcomes-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          .dc-outcome-card {
            padding: 32px 28px;
          }
        }
      `}</style>
    </section>
  );
}
