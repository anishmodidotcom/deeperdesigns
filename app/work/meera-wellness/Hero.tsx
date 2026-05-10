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
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 32, opacity: 0.3 }}
        aria-hidden
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          stroke="var(--page-accent)"
          strokeWidth="1"
        >
          <circle cx="40" cy="40" r="32" />
          <circle cx="40" cy="40" r="22" />
          <circle cx="40" cy="40" r="12" />
          <line x1="40" y1="8" x2="40" y2="72" />
          <line x1="8" y1="40" x2="72" y2="40" />
          <line x1="17" y1="17" x2="63" y2="63" />
          <line x1="63" y1="17" x2="17" y2="63" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 300,
          fontSize: "clamp(64px, 10vw, 120px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.0,
          margin: 0,
        }}
      >
        <span style={{ display: "block", color: "var(--page-text)" }}>
          Meera
        </span>
        <span
          style={{
            display: "block",
            color: "var(--page-accent)",
            fontStyle: "italic",
          }}
        >
          Wellness
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 1,
          width: 60,
          background: "var(--page-accent)",
          marginBlock: 24,
        }}
        aria-hidden
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 17,
          color: "var(--page-text-2)",
          maxWidth: 440,
          margin: 0,
          lineHeight: 1.7,
        }}
      >
        A complete wellness platform. Scheduling, client management, WhatsApp
        integration, and personalized programs. All in one place.
      </motion.p>
    </section>
  );
}
