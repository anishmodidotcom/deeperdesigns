"use client";

import { motion } from "motion/react";

const EASE = [0.7, 0, 0.3, 1] as const;

const MARGINALIA = [
  "CASE STUDY · 014",
  "FILED · MAY 2025",
  "JURISDICTION · MUMBAI, IN",
];

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        paddingBlock: 200,
      }}
    >
      <div
        className="container-x"
        style={{
          maxWidth: 1100,
          marginInline: "auto",
        }}
      >
        <div
          aria-hidden
          style={{
            width: "100%",
            height: 1,
            background: "var(--page-border)",
            marginBottom: 28,
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            flexWrap: "wrap",
            marginBottom: 80,
          }}
        >
          {MARGINALIA.map((m, i) => (
            <div
              key={m}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--page-text)",
                  paddingRight: 18,
                  paddingLeft: i === 0 ? 0 : 18,
                }}
              >
                {m}
              </span>
              {i < MARGINALIA.length - 1 && (
                <span
                  aria-hidden
                  style={{
                    width: 1,
                    height: 12,
                    background: "var(--page-border)",
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-spectral), 'Source Serif 4', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(44px, 7.4vw, 88px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            maxWidth: 1020,
          }}
        >
          We helped a lawyer do less work. On purpose.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          style={{
            fontSize: 18,
            color: "var(--page-text-2)",
            lineHeight: 1.7,
            margin: 0,
            marginTop: 36,
            maxWidth: 580,
          }}
        >
          Karan was answering every call. We built him a brief that answers
          first. The chatbot intakes every prospect before he picks up the
          phone. He sees only the clients worth his time. The rest get a
          fair, fast, machine-mediated triage.
        </motion.p>

        <motion.a
          href="#statement-of-facts"
          data-cursor="pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text)",
            margin: 0,
            marginTop: 56,
            paddingBottom: 6,
            borderBottom: "1px solid var(--page-border)",
          }}
        >
          READ THE BRIEF →
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.0, ease: EASE }}
        style={{
          position: "absolute",
          right: 32,
          bottom: 32,
        }}
      >
        <p
          style={{
            fontFamily:
              "var(--font-spectral), 'Source Serif 4', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: "-0.01em",
            color: "var(--page-oxblood)",
            margin: 0,
            lineHeight: 1,
          }}
        >
          Karan Legal
        </p>
      </motion.div>
    </section>
  );
}
