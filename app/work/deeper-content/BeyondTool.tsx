"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const SUBDOMAINS = [
  { brand: "FORREST ROASTERY", host: "forrest.cge.deeperdesigns.in" },
  { brand: "BOMBAY ATELIER",   host: "bombayatelier.cge.deeperdesigns.in" },
  { brand: "SAFFRON SUPPER CLUB", host: "saffron.cge.deeperdesigns.in" },
];

export default function BeyondTool() {
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
          maxWidth: 1080,
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
          BEYOND THE TOOL
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
            marginBottom: 32,
            maxWidth: 880,
          }}
        >
          Or we build a CGE for your brand.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 19,
            lineHeight: 1.65,
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 56,
            maxWidth: 760,
          }}
        >
          The Deeper Content tool gets you most of the way. For brands that want
          the full engine, with your brand DNA locked in, your team’s UI, your
          content categories, your voice rules, we build a custom CGE that’s
          yours alone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="dc-bt-list"
          aria-label="Examples of per-brand subdomains"
        >
          {SUBDOMAINS.map((s) => (
            <div key={s.brand} className="dc-bt-row">
              <span className="dc-bt-label">FOR {s.brand}</span>
              <span className="dc-bt-host">{s.host}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2.4vw, 30px)",
            lineHeight: 1.35,
            color: "var(--page-text)",
            margin: 0,
            marginTop: 56,
          }}
        >
          Same engine. Your everything.
        </motion.p>
      </div>

      <style>{`
        .dc-bt-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--page-border);
        }
        .dc-bt-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6px;
          padding-block: 20px;
          border-bottom: 1px solid var(--page-border);
        }
        .dc-bt-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.20em;
          color: var(--page-text-3);
        }
        .dc-bt-host {
          font-family: var(--font-geist-mono), monospace;
          font-size: 17px;
          letter-spacing: 0.02em;
          color: var(--page-accent-2);
        }
        @media (min-width: 768px) {
          .dc-bt-row {
            grid-template-columns: 280px 1fr;
            gap: 24px;
            align-items: baseline;
            padding-block: 22px;
          }
          .dc-bt-host {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
