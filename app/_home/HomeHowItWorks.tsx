"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

// v22 A4 (amended): how it works, three plain steps. Step 3 carries the
// 30-day guarantee sentence per the v22 amendment. Copy is final.
const STEPS = [
  {
    n: "01",
    title: "Show us how you run.",
    body: "A free thirty-minute call. You talk about your business, we listen. No deck, no jargon.",
  },
  {
    n: "02",
    title: "We hand you the plan.",
    body: "The two or three things worth building first, what each costs, and what each saves. In writing. You keep it whether you hire us or not.",
  },
  {
    n: "03",
    title: "We build. It goes live.",
    // v29: the thirty-day not-paying guarantee is gone sitewide. The hero
    // line and the FAQ answer changed with it; this step carried the same
    // promise in different words, so it moves to the same wording rather
    // than contradicting them one section apart.
    body: "A fixed price agreed before we start. A working tool your team actually uses, not a report. You own everything we build. Your first prototype is live in as little as 30 days.",
  },
];

export default function HomeHowItWorks() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        <h2
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 48px",
            maxWidth: "680px",
          }}
        >
          How it works.{" "}
          <span
            style={{
              fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Three steps, no mystery.
          </span>
        </h2>

        <div className="hhiw-grid">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "24px",
              }}
            >
              <p className="mono" style={{ color: "var(--fg-dim)", margin: "0 0 14px" }}>{s.n}</p>
              <h3 style={{ fontSize: "21px", fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 12px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)", margin: 0 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .hhiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        @media (max-width: 767px) {
          .hhiw-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </section>
  );
}
