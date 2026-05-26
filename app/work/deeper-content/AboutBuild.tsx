"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const META = [
  { k: "Product", v: "Deeper Content" },
  { k: "Status", v: "Live, paid installations" },
  { k: "Setup", v: "2 to 4 weeks" },
  { k: "Live URL", v: "cge.deeperdesigns.in" },
];

const STACK = [
  "Claude",
  "Gemini",
  "Veo 3",
  "Next.js",
  "Vercel",
  "Supabase",
];

const CAPABILITIES = [
  "Brand voice training",
  "Persona depth layer",
  "Visual world calibration",
  "Custom-installed private instance",
  "Strategic content generation",
  "Multi-format outputs (static, carousel, reel)",
];

export default function AboutBuild() {
  return (
    <section style={{ paddingBlock: 144, borderTop: "1px solid var(--page-border)" }}>
      <div
        className="container-x"
        style={{ maxWidth: 1080, marginInline: "auto", paddingInline: "clamp(20px, 4vw, 48px)" }}
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
          THE BUILD
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(34px, 4.6vw, 56px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          We built it. We use it. You can install it.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 740,
          }}
        >
          Deeper Content is a Deeper Designs product. We designed it, built it, and use it for our own brand. The engine is live, running, and available to install for select brands. Every install is custom, trained on your voice, your visual world, your audience. We do the setup. You run it. Forever.
        </motion.p>

        <div className="dc-build-grid">
          <div>
            <p className="dc-build-label">META</p>
            <dl className="dc-build-meta">
              {META.map((m) => (
                <div key={m.k} className="dc-build-row">
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="dc-build-label">STACK</p>
            <ul className="dc-build-list">
              {STACK.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="dc-build-label">CAPABILITIES</p>
            <ul className="dc-build-list">
              {CAPABILITIES.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .dc-build-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .dc-build-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--page-accent-2);
          margin: 0 0 20px 0;
        }
        .dc-build-meta {
          margin: 0;
          padding: 0;
        }
        .dc-build-row {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 14px;
          padding-block: 10px;
          border-top: 1px solid var(--page-border);
        }
        .dc-build-row:last-child {
          border-bottom: 1px solid var(--page-border);
        }
        .dc-build-row dt {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--page-text-3);
          margin: 0;
        }
        .dc-build-row dd {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 14px;
          color: var(--page-text);
          margin: 0;
        }
        .dc-build-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        .dc-build-list li {
          padding-block: 10px;
          border-top: 1px solid var(--page-border);
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 14px;
          color: var(--page-text);
        }
        .dc-build-list li:last-child {
          border-bottom: 1px solid var(--page-border);
        }
        @media (min-width: 768px) {
          .dc-build-grid {
            grid-template-columns: 1.1fr 1fr 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}
