"use client";

import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const STATS = [
  {
    value: "+260%",
    label: "Cakes per week",
    note: "Four cakes to fourteen, without expanding the kitchen.",
  },
  {
    value: "3 min",
    label: "Average order time",
    note: "Down from thirty minutes of WhatsApp back-and-forth.",
  },
  {
    value: "92%",
    label: "Deposit conversion",
    note: "Order Studio routes to a paid hold inside one session.",
  },
  {
    value: "Sundays",
    label: "Off, finally",
    note: "Farah&rsquo;s longest delivery day became her family day.",
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
            marginBottom: 24,
          }}
        >
          SECTION 05 · THE OUTCOMES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SOFT }}
          style={{
            margin: 0,
            marginBottom: 72,
            fontFamily: "var(--font-body), 'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            maxWidth: 920,
          }}
        >
          More cakes.{" "}
          <span
            style={{
              fontFamily:
                "var(--font-display-script), 'Yellowtail', cursive",
              fontWeight: 400,
              fontSize: "1.1em",
              color: "var(--page-accent)",
            }}
          >
            Less back-and-forth.
          </span>
        </motion.h2>

        <div className="sl-stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: SOFT }}
              style={{
                padding: 36,
                background: "var(--page-surface-1)",
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-display-script), 'Yellowtail', cursive",
                  fontWeight: 400,
                  fontSize: "clamp(56px, 6vw, 80px)",
                  color: "var(--page-accent)",
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                {stat.value}
              </div>
              <p
                style={{
                  margin: 0,
                  marginBottom: 10,
                  fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "var(--page-text)",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "var(--page-text-2)",
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
        .sl-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 700px) {
          .sl-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
        }
        @media (min-width: 1024px) {
          .sl-stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
