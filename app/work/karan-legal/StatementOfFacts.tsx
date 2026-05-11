"use client";

import { motion } from "motion/react";

const EASE = [0.7, 0, 0.3, 1] as const;

const ITEMS: { id: string; body: string }[] = [
  {
    id: "1.0",
    body: "The respondent (Karan) operates a solo startup law practice in Mumbai.",
  },
  {
    id: "1.1",
    body: "Sixty percent of his billable hours were spent on standard-template documents priced at the low end of his range.",
  },
  {
    id: "1.2",
    body: "Every prospect call (qualified or not) consumed approximately 45 minutes of partner time.",
  },
  {
    id: "1.3",
    body: "His revenue ceiling was, mathematically, his calendar.",
  },
];

export default function StatementOfFacts() {
  return (
    <section
      id="statement-of-facts"
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1100, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 56,
          }}
        >
          §01 · STATEMENT OF FACTS
        </motion.p>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 36,
            maxWidth: 860,
          }}
        >
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: EASE,
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "min-content 1fr",
                gap: 32,
                alignItems: "baseline",
                paddingBottom: 28,
                borderBottom: "1px solid var(--page-border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 14,
                  color: "var(--page-text)",
                  letterSpacing: "0.04em",
                  minWidth: "3ch",
                }}
              >
                {item.id}
              </span>
              <p
                style={{
                  fontFamily:
                    "var(--font-spectral), 'Source Serif 4', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 2.4vw, 28px)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                  color: "var(--page-text)",
                  margin: 0,
                }}
              >
                {item.body}
              </p>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--page-oxblood)",
            margin: 0,
            marginTop: 56,
            lineHeight: 1.7,
          }}
        >
          FOOTNOTE · Mathematically: 45 min × 8 calls/day × 5 days/week = an
          unrentable Karan.
        </motion.p>
      </div>
    </section>
  );
}
