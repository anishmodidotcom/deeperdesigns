"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const META = [
  { k: "Status", v: "Live, paid product" },
  { k: "Built in", v: "Six weeks plus polish" },
  { k: "Serving", v: "Indian furniture makers" },
  { k: "Year", v: "2026" },
];

const STACK = [
  "Next.js",
  "Gemini · Nano Banana",
  "Supabase",
  "Stripe",
  "Vercel",
  "Sharp",
];

export default function BuildNote() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1080, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          05 · THE BUILD
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            color: "var(--page-text)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 24,
            maxWidth: 780,
          }}
        >
          Built end to end by Deeper Designs. Live, paid, and running.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            lineHeight: 1.7,
            margin: 0,
            marginBottom: 56,
            maxWidth: 680,
          }}
        >
          We designed it, built it, and shipped it. Furniture makers across
          India pay for it and use it every week. It is tuned for low-light
          workshop photos, Indian interiors, and the exact ratios a
          marketplace listing needs.
        </motion.p>

        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
            margin: 0,
            paddingBlock: 32,
            borderTop: "1px solid var(--page-border)",
            borderBottom: "1px solid var(--page-border)",
            marginBottom: 32,
          }}
          className="ml-meta"
        >
          {META.map((row) => (
            <div key={row.k}>
              <dt
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--page-text-3)",
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                {row.k}
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 17,
                  color: "var(--page-text)",
                  margin: 0,
                }}
              >
                {row.v}
              </dd>
            </div>
          ))}
        </dl>

        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-text-3)",
            margin: 0,
            marginBottom: 14,
          }}
        >
          STACK
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 18px",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            color: "var(--page-text)",
          }}
        >
          {STACK.map((t, i) => (
            <span key={t} style={{ display: "inline-flex", gap: 18 }}>
              {t}
              {i < STACK.length - 1 ? (
                <span aria-hidden style={{ color: "var(--page-text-3)" }}>
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
