"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";

const EASE = [0.22, 1, 0.36, 1] as const;

const NUMBERS = [
  { v: "14-28", l: "Days from kickoff to live tool" },
  { v: "1", l: "Single point of contact (Anish)" },
  { v: "≤ 3", l: "Active builds at any time" },
  { v: "0", l: "Subscription tiers" },
];

export default function HowWeWork() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          §02 · HOW WE WORK
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 5vw, 60px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            margin: 0,
            marginBottom: 40,
            maxWidth: 1000,
          }}
        >
          Two to four weeks.{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent-2)" }}>
            AI-led, taste-finished.
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            lineHeight: 1.7,
            margin: 0,
            marginBottom: 56,
            maxWidth: 720,
          }}
        >
          We use AI for the boring middle of the build (boilerplate, copy
          drafts, image generation, mockups) and reserve human judgement
          for the parts that matter (the brief, the system architecture,
          the taste, the final ship). Every project ships with one of us
          on the line until it is live.
        </motion.p>

        <div className="abt-numbers-grid">
          {NUMBERS.map((n, i) => (
            <motion.div
              key={n.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              style={{
                paddingBlock: 28,
                borderTop: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  letterSpacing: "-0.02em",
                  color: "var(--accent-2)",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {n.v}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-2)",
                  margin: 0,
                  marginTop: 14,
                  maxWidth: 220,
                }}
              >
                {n.l}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{ marginTop: 48 }}
        >
          <Link
            href="/process"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              paddingBottom: 4,
              borderBottom: "1px solid var(--accent)",
              fontWeight: 600,
            }}
          >
            See the four-step process →
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .abt-numbers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (min-width: 900px) {
          .abt-numbers-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
