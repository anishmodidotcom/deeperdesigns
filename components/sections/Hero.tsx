"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const HEADLINES = [
  "We design better ways to run a business.",
  "Custom digital tools for modern businesses.",
  "Less chaos. Better systems.",
  "Possibility, designed.",
  "Your business deserves better tools.",
];

const SUBHEADLINE_LINES = [
  "Custom digital tools, sites, and operational systems.",
  "Shipped in weeks. Considered for longer.",
];

const TAGLINE = "Operational relief, designed carefully, shipped efficiently.";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HEADLINES.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [reduced]);

  const current = HEADLINES[index];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        paddingInline: 24,
        paddingBlock: 96,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-3)",
          marginBottom: 32,
        }}
      >
        AI-POWERED BUILD STUDIO
      </motion.div>

      <h1
        style={{
          fontSize: "clamp(40px, 7vw, 96px)",
          fontWeight: 300,
          color: "var(--text)",
          letterSpacing: "-0.04em",
          lineHeight: 1.08,
          margin: 0,
          maxWidth: 1100,
          minHeight: "1.2em",
          position: "relative",
        }}
      >
        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            display: "block",
            position: "relative",
            minHeight: "1.1em",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`h-${index}`}
              initial={{ opacity: 0, scale: 1.01, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -6 }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{ display: "inline-block" }}
            >
              {current}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>

      <div
        style={{
          marginTop: 40,
          maxWidth: 640,
          textAlign: "center",
          color: "var(--text-2)",
          fontSize: "clamp(16px, 2vw, 22px)",
          lineHeight: 1.5,
        }}
      >
        {SUBHEADLINE_LINES.map((line, i) => (
          <span
            key={line}
            style={{
              display: "block",
              overflow: "hidden",
            }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.6 + i * 0.08,
                ease: EASE,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
        style={{
          marginTop: 28,
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        {TAGLINE}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "var(--text-3)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 1,
            height: 32,
            background: "var(--text-3)",
            opacity: 0.6,
          }}
        />
      </motion.div>
    </section>
  );
}
