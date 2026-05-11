"use client";

import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const STATS: { value: string; label: string; note: string }[] = [
  {
    value: "4.2x",
    label: "Margin per kilo",
    note: "Direct beats wholesale by definition. Same blend, four times the take.",
  },
  {
    value: "62%",
    label: "Subscription conversion",
    note: "Quiz funnel routes first-time buyers into a recurring tin shipment.",
  },
  {
    value: "12 days",
    label: "From order to brewed",
    note: "Blends shipped in glass-lined tins. No staleness premium charged.",
  },
  {
    value: "0",
    label: "Resellers in the supply chain",
    note: "The wholesalers her family supplied for 60 years are not on the website.",
  },
];

export default function Numbers() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-bg)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          SECTION 06 · THE OUTCOMES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SOFT }}
          style={{
            fontFamily:
              "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(44px, 7vw, 84px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 80,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          The middleman is
          <br />
          <span style={{ color: "var(--page-accent)" }}>gone.</span>
        </motion.h2>

        <div className="kc-stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: SOFT }}
              style={{
                padding: 36,
                border: "1px solid var(--page-border)",
                background: "var(--page-surface-1)",
                position: "relative",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily:
                    "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
                  fontSize: "clamp(48px, 5vw, 72px)",
                  letterSpacing: "-0.03em",
                  color: "var(--page-accent)",
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                {stat.value}
              </span>
              <p
                style={{
                  fontFamily:
                    "var(--font-body), 'Crimson Pro', Georgia, serif",
                  fontWeight: 600,
                  fontSize: 19,
                  color: "var(--page-text)",
                  margin: 0,
                  marginBottom: 10,
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {stat.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .kc-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 700px) {
          .kc-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
        }
        @media (min-width: 1024px) {
          .kc-stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
