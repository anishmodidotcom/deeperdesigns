"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const PARAGRAPHS = [
  "Deeper Designs started in 2017 as a small design agency. We made brand identities and websites for businesses we believed in. The work was good. The model was tight. The constraint was always the same: custom software stayed out of reach for the businesses that needed it most.",
  "In 2024 the cost curve broke. A tool that used to take a fifteen-person team three quarters now takes one person three weeks. We rebuilt the practice around that flip. Same care. A different kind of output.",
  "We are not a SaaS company. We do not sell a platform. We sit with one business at a time, find the operational shape it needs, and build that. Sometimes a tool. Sometimes a workflow. Sometimes a system that did not exist yet.",
  "We are selective. We pick the projects where a single system can change how the business runs. We say no to most enquiries, kindly.",
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
              01 · HOW WE GOT HERE
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
              From a design agency in 2017 to a custom-systems practice in 2024.
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
