"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.19, 1, 0.22, 1] as const;

const CALLOUTS = [
  { value: "8", label: "Questions" },
  { value: "47", label: "Note combinations" },
  { value: "1", label: "Fragrance, named for you" },
];

export default function Output() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="oe-output-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              THE RESULT
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-cormorant-display), Cormorant, Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(34px, 5vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
                maxWidth: 540,
              }}
            >
              She doesn&rsquo;t pick a perfume. The perfume picks her.
            </h2>

            <p
              style={{
                fontSize: 16,
                color: "var(--page-text-2)",
                lineHeight: 1.75,
                margin: 0,
                maxWidth: 540,
              }}
            >
              After the quiz, the customer sees a fully visualized bottle
              with her name on the label, a poetic name for the scent
              auto-generated from her answers, and the full note pyramid.
              She can order it directly. The bottle is rendered with her
              name before she has even smelled it. Conversion happens in
              the imagination.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 24,
                marginTop: 48,
                maxWidth: 540,
              }}
            >
              {CALLOUTS.map((c) => (
                <div key={c.label}>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-cormorant-display), Cormorant, Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: 36,
                      color: "var(--page-accent)",
                      letterSpacing: "-0.02em",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {c.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--page-text-2)",
                      margin: 0,
                      marginTop: 10,
                      lineHeight: 1.5,
                    }}
                  >
                    {c.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
            className="oe-output-image"
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-10% -8%",
                background:
                  "radial-gradient(closest-side, rgba(201,168,76,0.32), rgba(201,168,76,0.06) 55%, transparent 75%)",
                pointerEvents: "none",
                filter: "blur(14px)",
                zIndex: 0,
              }}
            />
            <Image
              src="/images/oud-and-ember/personalized-bottle.webp"
              alt="Arabian perfume bottle with NADIA engraved on the gold label"
              width={1024}
              height={1280}
              sizes="(min-width: 1024px) 45vw, 90vw"
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 4,
                zIndex: 1,
              }}
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .oe-output-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        .oe-output-image {
          position: relative;
          max-width: 520px;
          margin-inline: auto;
          width: 100%;
        }
        @media (min-width: 1024px) {
          .oe-output-grid {
            grid-template-columns: 1fr 1fr;
            gap: 96px;
          }
          .oe-output-image {
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
