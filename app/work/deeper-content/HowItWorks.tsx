"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Mirrors the FORREST ROASTERY brand layer used on the cge landing page.
const BRAND_LAYER = [
  { k: "VOICE", v: "Direct, technical, no hype" },
  { k: "PALETTE", v: "Forest, kraft, cream, espresso" },
  { k: "REGISTER", v: "Modern craftsman, editorial" },
  { k: "AUDIENCE", v: "Home brewers, age 25 to 45" },
  { k: "AVOID", v: "Latte art, hand-typography, glow filters" },
];

const FUNNEL_STAGES = ["AWARENESS", "CONSIDERATION", "CONVERSION"] as const;
const IDEA_MODES = ["PRODUCT-FORWARD", "LIFE-MOMENT", "USEFUL", "UNEXPECTED"] as const;

// A representative brief: Saffron Supper Club for a richer category mix
// than Forrest. Same logic, different brand.
const BRIEF = {
  brand: "Saffron Supper Club",
  stage: "Awareness · Mode UNEXPECTED",
  idea: "Long-table hosting moment, candle-side angle, warm golden hour, steam rising.",
};

export default function HowItWorks() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
        background: "var(--page-surface)",
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
          HOW IT WORKS
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
            maxWidth: 900,
          }}
        >
          CGE doesn’t just generate. It reasons first.
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
          Three layers run before any image is made.
        </motion.p>

        {/* STAGE 01 ·Brand Layer card */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="dc-hw-stage"
        >
          <div className="dc-hw-stage-head">
            <p className="dc-hw-n">STAGE 01</p>
            <h3 className="dc-hw-h">Your Brand Layer</h3>
            <p className="dc-hw-sub">
              Built once. Locked. Every output respects it. Voice, palette,
              register, audience, and an explicit list of what to avoid.
            </p>
          </div>

          <div className="dc-hw-card" aria-label="Forrest Roastery brand layer">
            <p className="dc-hw-card-label">BRAND LAYER · FORREST ROASTERY</p>
            <dl className="dc-hw-meta">
              {BRAND_LAYER.map((row) => (
                <div key={row.k} className="dc-hw-row">
                  <dt>{row.k}</dt>
                  <dd>{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.article>

        {/* STAGE 02 ·The Engine Reasons */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="dc-hw-stage"
        >
          <div className="dc-hw-stage-head">
            <p className="dc-hw-n">STAGE 02</p>
            <h3 className="dc-hw-h">The Engine Reasons</h3>
            <p className="dc-hw-sub">
              Funnel stage. Audience pull. Idea mode. Constraint. The engine
              writes a brief before it makes anything.
            </p>
          </div>

          <div className="dc-hw-card">
            <div className="dc-hw-section">
              <p className="dc-hw-card-label">FUNNEL STAGE</p>
              <div className="dc-hw-chips">
                {FUNNEL_STAGES.map((s) => (
                  <span
                    key={s}
                    className={`dc-hw-chip ${s === "AWARENESS" ? "dc-hw-chip--on" : ""}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="dc-hw-section">
              <p className="dc-hw-card-label">IDEA MODE</p>
              <div className="dc-hw-chips">
                {IDEA_MODES.map((m) => (
                  <span
                    key={m}
                    className={`dc-hw-chip ${m === "UNEXPECTED" ? "dc-hw-chip--on" : ""}`}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="dc-hw-section dc-hw-brief">
              <p className="dc-hw-card-label">GENERATED BRIEF</p>
              <p className="dc-hw-brief-meta">
                Brand: {BRIEF.brand} <span className="dc-hw-dot">·</span>{" "}
                Stage: {BRIEF.stage}
              </p>
              <p className="dc-hw-brief-idea">{BRIEF.idea}</p>
            </div>
          </div>
        </motion.article>

        {/* STAGE 03 ·The Output */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          className="dc-hw-stage"
        >
          <div className="dc-hw-stage-head">
            <p className="dc-hw-n">STAGE 03</p>
            <h3 className="dc-hw-h">The Output</h3>
            <p className="dc-hw-sub">
              Your brand, on the brief. Not a prompt-in, prompt-out tool. A
              reasoning system.
            </p>
          </div>
        </motion.article>
      </div>

      <style>{`
        .dc-hw-stage {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          padding-block: 40px;
          border-top: 1px solid var(--page-border);
        }
        .dc-hw-stage:last-child {
          border-bottom: 1px solid var(--page-border);
        }
        .dc-hw-stage-head {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dc-hw-n {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: var(--page-accent-2);
          margin: 0;
        }
        .dc-hw-h {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-weight: 600;
          font-size: 28px;
          letter-spacing: -0.01em;
          line-height: 1.15;
          color: var(--page-text);
          margin: 0;
        }
        .dc-hw-sub {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--page-text-2);
          margin: 0;
          max-width: 420px;
        }
        .dc-hw-card {
          background: var(--page-bg);
          border: 1px solid var(--page-border);
          border-radius: 14px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .dc-hw-card-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          color: var(--page-accent-2);
          margin: 0 0 14px 0;
        }
        .dc-hw-meta {
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .dc-hw-row {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 18px;
          padding-block: 12px;
          border-top: 1px solid var(--page-border);
        }
        .dc-hw-row:first-of-type {
          border-top: none;
        }
        .dc-hw-row dt {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: var(--page-text-3);
          margin: 0;
        }
        .dc-hw-row dd {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 14px;
          color: var(--page-text);
          margin: 0;
          line-height: 1.45;
        }
        .dc-hw-section {
          display: block;
        }
        .dc-hw-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .dc-hw-chip {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          padding: 7px 12px;
          border-radius: 9999px;
          border: 1px solid var(--page-border);
          color: var(--page-text-3);
          background: transparent;
        }
        .dc-hw-chip--on {
          color: var(--page-accent-2);
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.08);
        }
        .dc-hw-brief {
          padding-top: 22px;
          border-top: 1px solid var(--page-border);
        }
        .dc-hw-brief-meta {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--page-text-3);
          margin: 0 0 10px 0;
        }
        .dc-hw-brief-idea {
          font-family: var(--font-instrument-serif), 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 21px;
          line-height: 1.4;
          color: var(--page-text);
          margin: 0;
        }
        .dc-hw-dot {
          color: var(--page-accent-2);
        }
        @media (min-width: 900px) {
          .dc-hw-stage {
            grid-template-columns: 0.85fr 1fr;
            gap: 48px;
            padding-block: 56px;
            align-items: start;
          }
          .dc-hw-h {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
}
