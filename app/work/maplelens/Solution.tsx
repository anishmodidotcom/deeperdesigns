"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    n: "01",
    h: "Snap one phone photo.",
    b: "From your workshop. Any angle. Any light.",
  },
  {
    n: "02",
    h: "Pick a scene.",
    b: "Studio white, warm modern living room, minimal terrace, neutral lifestyle. New scenes ship every week.",
  },
  {
    n: "03",
    h: "Catalog shot in thirty seconds.",
    b: "Your piece, preserved. The room, rebuilt around it. Download in catalog and social ratios.",
  },
];

export default function Solution() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
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
          § THE PRODUCT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.03em",
            color: "var(--page-text)",
            lineHeight: 1.06,
            margin: 0,
            marginBottom: 24,
            maxWidth: 820,
          }}
        >
          Maple Lens. Three steps, thirty seconds.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 18,
            color: "var(--page-text-2)",
            lineHeight: 1.65,
            margin: 0,
            marginBottom: 64,
            maxWidth: 700,
          }}
        >
          Phone photo to catalog-ready image. Preserves the design, rebuilds
          the room. Tuned for Indian aesthetics, light, and listing platforms.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="ml-steps"
        >
          {STEPS.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              style={{
                padding: "32px 28px",
                background: "var(--page-surface)",
                border: "1px solid var(--page-border)",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--page-accent)",
                }}
              >
                STEP {s.n}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  color: "var(--page-text)",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {s.h}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--page-text-2)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.b}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.ml-steps) {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
