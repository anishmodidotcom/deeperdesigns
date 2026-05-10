"use client";

import { motion } from "motion/react";

const GRID_LINES = [12, 36, 64, 88];

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
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {GRID_LINES.map((pct, i) => (
          <motion.span
            key={pct}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ duration: 2, delay: 0.3 + i * 0.15 }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${pct}%`,
              width: 1,
              background: "var(--page-accent)",
            }}
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          fontFamily: "var(--font-instrument), Georgia, serif",
          fontWeight: 400,
          fontSize: "clamp(56px, 9vw, 110px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.0,
          margin: 0,
        }}
      >
        <span style={{ display: "block", color: "var(--page-text)" }}>
          Studio Noor
        </span>
        <span
          style={{
            display: "block",
            color: "var(--page-accent)",
            fontStyle: "italic",
          }}
        >
          Client Portal
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          height: 1,
          width: 60,
          background: "var(--page-accent)",
          opacity: 0.4,
          marginBlock: 32,
          transformOrigin: "center",
        }}
        aria-hidden
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          fontSize: 16,
          color: "var(--page-text-2)",
          maxWidth: 460,
          margin: 0,
          lineHeight: 1.7,
        }}
      >
        A living workspace where clients track every detail of their home
        transformation. Updated daily. No more chasing updates over WhatsApp.
      </motion.p>
    </section>
  );
}
