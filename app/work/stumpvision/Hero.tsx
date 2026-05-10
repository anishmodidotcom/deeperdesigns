"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingInline: 24,
        paddingBlock: 96,
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <svg
          width="120"
          height="320"
          viewBox="0 0 120 320"
          fill="none"
          stroke="var(--page-accent)"
          strokeWidth="1"
          strokeLinecap="round"
        >
          <rect x="40" y="20" width="40" height="280" />
          <line x1="20" y1="40" x2="100" y2="40" />
          <line x1="20" y1="60" x2="100" y2="60" />
          <line x1="40" y1="40" x2="40" y2="60" />
          <line x1="80" y1="40" x2="80" y2="60" />
          <line x1="20" y1="280" x2="100" y2="280" />
          <line x1="20" y1="260" x2="100" y2="260" />
          <line x1="40" y1="260" x2="40" y2="280" />
          <line x1="80" y1="260" x2="80" y2="280" />
          <line x1="60" y1="20" x2="60" y2="300" strokeOpacity="0.4" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 1.03, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          fontFamily:
            "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "clamp(52px, 9vw, 100px)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          lineHeight: 1.0,
          margin: 0,
        }}
      >
        <span
          style={{
            display: "block",
            fontWeight: 700,
            color: "var(--page-text)",
          }}
        >
          StumpVision
        </span>
        <span
          style={{
            display: "block",
            fontWeight: 400,
            color: "var(--page-accent)",
          }}
        >
          Academy Platform
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          height: 1,
          width: 60,
          background: "var(--page-accent)",
          marginBlock: 24,
          transformOrigin: "center",
        }}
        aria-hidden
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          fontSize: 16,
          color: "var(--page-text-2)",
          maxWidth: 480,
          margin: 0,
          lineHeight: 1.7,
        }}
      >
        Gamified player profiles. Trading card stats. Match records. Coach
        reports. A platform that makes 250 kids obsess over their own
        improvement.
      </motion.p>
    </section>
  );
}
