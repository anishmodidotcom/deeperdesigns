"use client";

import { motion } from "motion/react";

const HEADLINE_LINES = [
  { text: "Inventory.", color: "var(--page-text)" },
  { text: "Quotes.", color: "var(--page-text)" },
  { text: "In real time.", color: "var(--page-accent)" },
];

const COLS = 6;
const ROWS = 4;
const SQUARES = COLS * ROWS;
const HIGHLIGHTED = new Set([2, 5, 9, 14, 17, 22]);

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
        paddingBlock: 96,
        overflow: "hidden",
      }}
    >
      <div
        className="container-x"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 64,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--page-accent)",
              margin: 0,
              marginBottom: 32,
            }}
          >
            BHARAT STEEL CORP
          </motion.p>

          <h1
            style={{
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(48px, 8vw, 96px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "block", color: line.color }}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 18,
              color: "var(--page-text-2)",
              maxWidth: 480,
              marginTop: 32,
              marginBottom: 0,
              lineHeight: 1.6,
            }}
          >
            A live inventory dashboard with instant quote generation. Fed by
            warehouse delivery slips sent over WhatsApp.
          </motion.p>
        </div>

        <div
          aria-hidden
          className="bs-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 12px)`,
            gridTemplateRows: `repeat(${ROWS}, 12px)`,
            gap: 8,
            flexShrink: 0,
          }}
        >
          {Array.from({ length: SQUARES }).map((_, i) => {
            const isHighlighted = HIGHLIGHTED.has(i);
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={
                  isHighlighted
                    ? { opacity: [0.4, 0.85, 0.4] }
                    : { opacity: 0.1 }
                }
                transition={
                  isHighlighted
                    ? {
                        duration: 2.2,
                        repeat: Infinity,
                        delay: (i * 0.18) % 1.6,
                        ease: "easeInOut",
                      }
                    : { duration: 0.8, delay: 1 + i * 0.01 }
                }
                style={{
                  width: 12,
                  height: 12,
                  background: "var(--page-accent)",
                }}
              />
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .bs-hero-grid {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
