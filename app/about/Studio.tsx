"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Studio() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
        background: "var(--surface-1)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <div className="abt-studio-grid">
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
              borderRadius: 4,
            }}
          >
            <Image
              src="/images/about/anish-portrait.webp"
              alt="Anish Modi, founder of Deeper Designs"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
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
              §03 · THE STUDIO
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
                marginBottom: 28,
              }}
            >
              Anish Modi runs it.{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent-2)" }}>
                On purpose, alone.
              </em>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                fontSize: 17,
                color: "var(--text-2)",
                lineHeight: 1.75,
                maxWidth: 540,
                marginBottom: 48,
              }}
            >
              <p style={{ margin: 0 }}>
                Anish is a business strategist with a decade in marketing
                and strategy, most recently leading growth for venture-
                backed brands across India and the GCC. He started
                Deeper Designs in 2024 after realising the AI build cost
                curve made bespoke software finally accessible for the
                kind of clients he had been advising.
              </p>
              <p style={{ margin: 0 }}>
                The studio is currently a single-founder operation
                supported by a small bench of trusted specialists for
                heavier engineering, brand systems, and motion. Every
                project has Anish as the single point of contact. Every
                project ships with him on the line.
              </p>
            </div>

            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
                margin: 0,
                paddingTop: 32,
                borderTop: "1px solid var(--border)",
              }}
            >
              {[
                { k: "Entity", v: "Newfold Ventures LLC" },
                { k: "Based", v: "Dubai · Delhi" },
                { k: "Founded", v: "2024" },
                { k: "Founder", v: "Anish Modi" },
              ].map((row) => (
                <div key={row.k}>
                  <dt
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-3)",
                      margin: 0,
                      marginBottom: 8,
                    }}
                  >
                    {row.k}
                  </dt>
                  <dd
                    style={{
                      fontFamily:
                        "var(--font-fraunces), Georgia, serif",
                      fontWeight: 500,
                      fontSize: 17,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .abt-studio-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 900px) {
          .abt-studio-grid {
            grid-template-columns: 38fr 62fr;
            gap: 96px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
