"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    n: "01",
    h: "Snap one phone photo.",
    b: "From the workshop floor. Any angle, any light.",
  },
  {
    n: "02",
    h: "Pick a scene.",
    b: "Studio white, a warm living room, a minimal terrace. New scenes every week.",
  },
  {
    n: "03",
    h: "Download the shot.",
    b: "Your piece, untouched. The room, rebuilt. Sized for your catalog and your feed.",
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
          03 · THE PRODUCT
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
          Maple Lens. One photo in, a catalog shot out, thirty seconds
          later.
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
          It keeps your piece exactly as it is and rebuilds the room around
          it. Tuned for Indian light, Indian rooms, and the sizes that
          marketplaces actually want.
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
