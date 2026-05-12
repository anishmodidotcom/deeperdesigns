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
              src="/images/about/anish-real.webp"
              alt="Anish Modi, founder of Deeper Designs"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
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
              Built and led by Anish Modi.{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent-2)" }}>
                Business strategist.
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
                Deeper Designs is built and led by Anish Modi. Ten years
                across marketing, brand, ops, and financial design. Based
                between Dubai and Delhi.{" "}
                <a
                  href="https://anishmodi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  style={{
                    color: "var(--text)",
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                    textDecorationColor: "var(--accent)",
                    textDecorationThickness: 1,
                  }}
                >
                  Read more about Anish at anishmodi.com.
                </a>
              </p>
              <p
                style={{
                  margin: 0,
                  fontStyle: "italic",
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: 20,
                  color: "var(--text)",
                  paddingLeft: 20,
                  borderLeft: "2px solid var(--accent)",
                  lineHeight: 1.5,
                }}
              >
                I am not interested in building the next Salesforce. I am
                interested in building the next thing the chai vendor at the
                corner wishes existed.
              </p>
              <p style={{ margin: 0 }}>
                Every project has Anish on the line. The studio runs with a
                small bench of trusted specialists for heavier engineering,
                brand systems, and motion when a build needs it. The
                strategy, the call, the relationship: those stay with him.
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
                { k: "Founder", v: "Anish Modi" },
                { k: "Based", v: "Dubai · Delhi" },
                { k: "Founded", v: "2017" },
                { k: "More", v: "anishmodi.com" },
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
