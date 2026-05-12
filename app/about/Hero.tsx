"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
        paddingBlock: 144,
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1320, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--text-3)",
            margin: 0,
            marginBottom: 48,
          }}
        >
          ABOUT · 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 5.8vw, 76px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            color: "var(--text)",
            margin: 0,
            maxWidth: 1200,
          }}
        >
          Enterprise software costs a million dollars. We build the same
          thing for businesses that could{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent-2)" }}>
            never afford it.
          </em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          style={{
            height: 1,
            width: 80,
            background: "var(--accent)",
            marginBlock: 48,
            transformOrigin: "left center",
          }}
          aria-hidden
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          style={{
            fontSize: 19,
            color: "var(--text-2)",
            margin: 0,
            maxWidth: 720,
            lineHeight: 1.7,
          }}
        >
          Deeper Designs is a tiny AI-led build studio operating between
          Dubai and Delhi. We make custom software for small and
          mid-sized businesses, and we do it on the timeline an enterprise
          consultancy spends on a Discovery deck.
        </motion.p>
      </div>
    </section>
  );
}
