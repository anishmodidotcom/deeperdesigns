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
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(232,93,42,0.18) 0%, rgba(232,93,42,0.05) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(56px, 10vw, 110px)",
          letterSpacing: "-0.04em",
          lineHeight: 1.0,
          margin: 0,
        }}
      >
        <span style={{ display: "block", color: "var(--page-accent)" }}>
          Zaatar
        </span>
        <span style={{ display: "block", color: "var(--page-text)" }}>
          Republic
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 14,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--page-text-2)",
          margin: 0,
          marginTop: 16,
        }}
      >
        Operations Intelligence
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: 18,
          color: "var(--page-text-2)",
          maxWidth: 500,
          margin: 0,
          marginTop: 32,
          lineHeight: 1.6,
        }}
      >
        4 locations. 1,000 orders a day. Now running on data instead of gut
        feel.
      </motion.p>
    </section>
  );
}
