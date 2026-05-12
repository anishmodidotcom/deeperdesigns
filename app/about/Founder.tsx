"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Founder() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <div className="abt-founder-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--surface-1)",
            }}
          >
            <Image
              src="/images/about/anish-portrait.webp"
              alt="Anish Modi, founder of Deeper Designs"
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
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
              03 · THE FOUNDER
            </p>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(32px, 5vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: "var(--text)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              Anish Modi{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent-2, var(--accent))",
                }}
              >
                · Business Strategist.
              </em>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontSize: 17,
                color: "var(--text-2)",
                lineHeight: 1.75,
                maxWidth: 560,
                marginBottom: 32,
              }}
            >
              <p style={{ margin: 0 }}>
                Ten years across marketing, brand, ops, and financial design.
                Founder of Newfold Ventures LLC, registered in Dubai. Based
                between Dubai and Delhi.
              </p>
              <p style={{ margin: 0 }}>
                Anish leads strategy and the build call on every Deeper
                Designs project. The thinking, the scoping, the relationship,
                those stay with him. The studio runs with a small bench of
                trusted specialists for heavier engineering, brand systems,
                and motion when a build needs it.
              </p>
            </div>
            <a
              href="https://anishmodi.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                paddingInline: 22,
                paddingBlock: 12,
                background: "transparent",
                color: "var(--text)",
                border: "1px solid var(--border-2)",
                borderRadius: 9999,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Read more at anishmodi.com ↗
            </a>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        .abt-founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .abt-founder-grid {
            grid-template-columns: 42fr 58fr;
            gap: 96px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
