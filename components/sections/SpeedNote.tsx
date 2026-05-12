"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SpeedNote() {
  return (
    <section
      style={{
        paddingBlock: 128,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="container-x"
        style={{
          maxWidth: 1080,
          marginInline: "auto",
          display: "grid",
          gap: 48,
          gridTemplateColumns: "1fr",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--accent)",
              margin: 0,
              marginBottom: 24,
            }}
          >
            Pace, not panic
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "var(--text)",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 820,
            }}
          >
            Designed carefully. Shipped efficiently.
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--text-2)",
              lineHeight: 1.65,
              margin: 0,
              marginTop: 24,
              maxWidth: 640,
            }}
          >
            We move fast because we know what we are building. The thinking is
            slow. The execution is fast. Traditional agencies promise quarters.
            We ship in weeks. The difference is the methodology, not just the
            speed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
