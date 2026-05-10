"use client";

import { motion } from "motion/react";

type Card = { question: string; answer: string };

const CARDS: Card[] = [
  {
    question: "Is my son improving?",
    answer:
      "Yes. Here is the data. Batting average up 34% this season. Coach rated him 8/10 last month. Attendance: 92%.",
  },
  {
    question: "What did he work on today?",
    answer:
      "Net session: 45 minutes batting practice focused on back-foot play. Coach noted improved footwork.",
  },
  {
    question: "Why is he not in the A team?",
    answer:
      "Current rating: 4.2/5. A-team cutoff: 4.5. Two areas flagged for improvement: running between wickets and short-ball technique.",
  },
];

export default function Parent() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          FOR PARENTS
        </p>

        <h2
          style={{
            fontFamily:
              "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            textTransform: "uppercase",
            letterSpacing: "-0.005em",
            color: "var(--page-text)",
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 64,
          }}
        >
          What parents actually want to know.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {CARDS.map((c, i) => (
            <motion.div
              key={c.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: "var(--page-surface)",
                border: "1px solid rgba(74,222,128,0.1)",
                borderRadius: 8,
                padding: 28,
              }}
            >
              <p
                style={{
                  fontFamily:
                    "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--page-accent-2)",
                  margin: 0,
                  marginBottom: 12,
                  letterSpacing: "-0.005em",
                  lineHeight: 1.3,
                }}
              >
                {c.question}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {c.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
