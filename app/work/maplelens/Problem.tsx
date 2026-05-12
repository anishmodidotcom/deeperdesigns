"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const PAIN = [
  {
    h: "A studio shoot costs ₹40,000 to ₹80,000 per collection.",
    b: "For a maker shipping ten to twenty pieces a month, that math does not work. The photo budget is the first thing cut.",
  },
  {
    h: "Listings underperform because the images are workshop photos.",
    b: "A buyer on Instagram or a marketplace cannot see past sawdust and warehouse light. The piece looks worse than the work.",
  },
  {
    h: "Studio time means a long round trip and a held inventory.",
    b: "Booking a studio, driving the piece across town, waiting on edits, doing it again. Days per collection. Inventory sits idle.",
  },
];

export default function Problem() {
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
        style={{ maxWidth: 1080, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          § THE BOTTLENECK
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 60px)",
            letterSpacing: "-0.03em",
            color: "var(--page-text)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 56,
            maxWidth: 820,
          }}
        >
          Indian furniture makers cannot afford studio photography. Their
          listings underperform. Their products look worse than their craft.
        </motion.h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {PAIN.map((p, i) => (
            <motion.li
              key={p.h}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              style={{
                paddingBottom: 28,
                borderBottom: "1px solid var(--page-border)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2.6vw, 28px)",
                  letterSpacing: "-0.02em",
                  color: "var(--page-text)",
                  margin: 0,
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}
              >
                {p.h}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--page-text-2)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 720,
                }}
              >
                {p.b}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
