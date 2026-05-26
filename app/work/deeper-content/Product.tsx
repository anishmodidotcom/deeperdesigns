"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Installed.",
    body: "We build and install Deeper Content for your brand. Once. A private instance, set up around your operation, ready to use.",
  },
  {
    n: "02",
    title: "Trained.",
    body: "Trained on your voice, your products, your audience, your visual world. Not a template. Built for you, end to end.",
  },
  {
    n: "03",
    title: "Running.",
    body: "Generates strategic content in your voice, on demand. Forever. No briefs, no rounds of edits, no waiting for the agency.",
  },
];

export default function Product() {
  return (
    <section style={{ paddingBlock: 144, borderTop: "1px solid var(--page-border)" }}>
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto", paddingInline: "clamp(20px, 4vw, 48px)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent-2)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE PRODUCT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(40px, 5.6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 16,
          }}
        >
          Installed. Trained. Running.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 80,
            maxWidth: 680,
          }}
        >
          Three steps. Then it works for your brand, every day, forever.
        </motion.p>

        <div className="dc-product-grid">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="dc-product-card"
            >
              <p className="dc-product-n">{s.n}</p>
              <h3 className="dc-product-title">{s.title}</h3>
              <p className="dc-product-body">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .dc-product-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .dc-product-card {
          background: var(--page-surface);
          border: 1px solid var(--page-border);
          border-radius: 16px;
          padding: 40px 32px;
          position: relative;
        }
        .dc-product-n {
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          letter-spacing: 0.20em;
          color: var(--page-accent-2);
          margin: 0 0 32px 0;
        }
        .dc-product-title {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-weight: 600;
          font-size: 32px;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--page-text);
          margin: 0 0 16px 0;
        }
        .dc-product-body {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--page-text-2);
          margin: 0;
          max-width: 360px;
        }
        @media (min-width: 1024px) {
          .dc-product-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .dc-product-card {
            padding: 48px 36px 56px 36px;
          }
          .dc-product-title {
            font-size: 36px;
          }
        }
      `}</style>
    </section>
  );
}
