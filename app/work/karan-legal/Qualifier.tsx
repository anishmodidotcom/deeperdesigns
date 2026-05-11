"use client";

import { motion } from "motion/react";

const EASE = [0.7, 0, 0.3, 1] as const;

const BUCKETS = [
  {
    number: "01",
    title: "TEMPLATE-READY",
    subtext: "Standard work. Fixed price. Booked automatically.",
    pct: "47% OF INQUIRIES",
  },
  {
    number: "02",
    title: "PARTNER-REVIEW",
    subtext: "Custom matters. Calendar opened to a 15-min consult.",
    pct: "23% OF INQUIRIES",
  },
  {
    number: "03",
    title: "DECLINE",
    subtext: "Out of scope. Polite redirect to referral network.",
    pct: "30% OF INQUIRIES",
  },
];

export default function Qualifier() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1100, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          §03 · THE TOOL
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-spectral), 'Source Serif 4', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(36px, 5vw, 56px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          Three states. One outcome.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 16,
            color: "var(--page-text-2)",
            lineHeight: 1.7,
            margin: 0,
            marginBottom: 64,
            maxWidth: 560,
          }}
        >
          Every conversation routes to exactly one of three buckets. No
          human triage required.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 0,
            border: "1px solid var(--page-border)",
            background: "var(--page-surface-1)",
          }}
          className="kl-qualifier-grid"
        >
          {BUCKETS.map((b, i) => (
            <motion.div
              key={b.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: EASE,
              }}
              style={{
                position: "relative",
                padding: 32,
                borderLeft:
                  i === 0 ? "none" : "1px solid var(--page-border)",
              }}
              className="kl-qualifier-cell"
            >
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--page-text-3)",
                }}
              >
                {b.number}
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  color: "var(--page-text)",
                  margin: 0,
                  marginBottom: 18,
                  marginTop: 16,
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  fontFamily:
                    "var(--font-spectral), 'Source Serif 4', Georgia, serif",
                  fontWeight: 500,
                  fontSize: 20,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.45,
                  color: "var(--page-text)",
                  margin: 0,
                  marginBottom: 28,
                }}
              >
                {b.subtext}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--page-text-2)",
                  margin: 0,
                  paddingTop: 20,
                  borderTop: "1px solid var(--page-border)",
                }}
              >
                {b.pct}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 720px) {
          .kl-qualifier-cell {
            border-left: none !important;
            border-top: 1px solid var(--page-border);
          }
          .kl-qualifier-cell:first-child {
            border-top: none;
          }
        }
      `}</style>
    </section>
  );
}
