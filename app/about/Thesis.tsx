"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const PARAGRAPHS = [
  "Custom software used to belong to companies with seven-figure budgets and an in-house engineering team. Everyone else got Shopify and a Calendly link. That asymmetry shaped the last twenty years of business. The big got bigger. The small got templates.",
  "AI changed the cost curve. A tool that took a fifteen-person team three quarters to build now takes one person three weeks. That economics flip is the entire reason Deeper Designs exists.",
  "We are not a SaaS company. We do not sell a platform. We build one thing, for one business, the right way, and we move on. The work is bespoke. The cost is not. A custom tool from us is somewhere between a website and a small SaaS subscription. That is the bet.",
  "We are very selective about the projects we take. We pick the ones where a single tool can change the shape of the business. We say no to most enquiries.",
];

export default function Thesis() {
  return (
    <section
      style={{
        position: "relative",
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
        background: "var(--surface-1)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <div className="abt-thesis-grid">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              §01 · THE THESIS
            </p>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                color: "var(--text)",
                margin: 0,
                maxWidth: 460,
              }}
            >
              What we believe about AI, software, and small business.
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                style={{
                  fontSize: 17,
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .abt-thesis-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 900px) {
          .abt-thesis-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
