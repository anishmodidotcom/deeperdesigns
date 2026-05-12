"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
        paddingTop: 200,
        paddingBottom: 96,
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
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
            marginBottom: 32,
          }}
        >
          PROCESS · 14 TO 28 DAYS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 5.8vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            color: "var(--text)",
            margin: 0,
            maxWidth: 1100,
          }}
        >
          Four steps. One person on the line.{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent-2)" }}>
            No deck phase.
          </em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            margin: 0,
            marginTop: 36,
            maxWidth: 640,
            lineHeight: 1.7,
          }}
        >
          Below is the exact shape of a Deeper Designs build, from the
          first call to the day the tool is live. Each step is bounded
          in days, not weeks, because AI does the heavy lifting in the
          middle.
        </motion.p>
      </div>
    </section>
  );
}
