"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Farah() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface-1)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <div className="sl-farah-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 12,
            }}
          >
            <Image
              src="/images/sugar-lane/farah-portrait.webp"
              alt="Farah, a 32-year-old home baker in Abu Dhabi, smiling, piping a cake at her kitchen counter"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SOFT }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              SECTION 01 · THE BAKER
            </p>

            <h2
              style={{
                margin: 0,
                marginBottom: 36,
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--page-text)",
              }}
            >
              Four a week.
              <br />
              <span
                style={{
                  fontFamily:
                    "var(--font-display-script), 'Yellowtail', cursive",
                  fontWeight: 400,
                  fontSize: "1.15em",
                  color: "var(--page-accent)",
                }}
              >
                Could be forty.
              </span>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontSize: 18,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                maxWidth: 560,
              }}
            >
              <p style={{ margin: 0 }}>
                Farah bakes celebration cakes out of her kitchen in Abu
                Dhabi. Birthdays mostly. Weddings sometimes. She is the
                bake, the buttercream, the delivery and the
                WhatsApp.
              </p>
              <p style={{ margin: 0 }}>
                Most of her time was being eaten by the order: WhatsApp
                back-and-forth on flavour, size, design, dates, dietary,
                payment. By the time she had a confirmed order she had
                done 30 minutes of admin per cake.
              </p>
              <p style={{ margin: 0 }}>
                We built her an order studio. Pick the cake. Build the
                top. Send the brief. Pay the deposit. All in one tab,
                without losing the warmth of working with her directly.
                Same Farah. Different funnel.
              </p>
            </div>

            <figure
              style={{
                margin: 0,
                marginTop: 48,
                padding: 24,
                background: "var(--page-blush)",
                borderRadius: 16,
                maxWidth: 480,
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily:
                    "var(--font-display-script), 'Yellowtail', cursive",
                  fontSize: 30,
                  color: "var(--page-accent-deep)",
                  lineHeight: 1.3,
                }}
              >
                &ldquo;Bake the cakes, not the back-and-forth.&rdquo;
              </blockquote>
              <figcaption
                style={{
                  marginTop: 12,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--page-text-3)",
                }}
              >
                FARAH · FOUNDER
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .sl-farah-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .sl-farah-grid {
            grid-template-columns: 42fr 58fr;
            gap: 96px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
