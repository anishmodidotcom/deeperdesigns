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
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 400,
          fontSize: "clamp(56px, 10vw, 120px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
        }}
      >
        <span style={{ display: "block", color: "var(--page-accent)" }}>
          Veda Glow
        </span>
        <span
          style={{
            display: "block",
            color: "var(--page-text)",
            fontStyle: "italic",
          }}
        >
          Skin Advisor
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 1,
          width: 80,
          background: "var(--page-accent)",
          margin: "32px auto",
          transformOrigin: "center",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 18,
          color: "var(--page-text-2)",
          maxWidth: 520,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        AI-powered Ayurvedic skin consultation that replaces a 45-minute DM
        conversation with a personalized skincare routine in 2 minutes.
      </motion.p>

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 160,
          background:
            "linear-gradient(to bottom, rgba(15,10,6,0) 0%, var(--page-bg) 100%)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
