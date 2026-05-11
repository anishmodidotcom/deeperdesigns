"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Devika() {
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
        <div className="kc-devika-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              SECTION 01 · THE FOUNDER
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(48px, 8vw, 96px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.92,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 40,
                textTransform: "uppercase",
              }}
            >
              The sample room.
              <br />
              <span style={{ color: "var(--page-accent)" }}>The leap.</span>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                fontFamily:
                  "var(--font-body), 'Crimson Pro', Georgia, serif",
                fontSize: 19,
                color: "var(--page-text-2)",
                lineHeight: 1.75,
                maxWidth: 580,
              }}
            >
              <p style={{ margin: 0 }}>
                Devika is the third generation in a tea family that has
                supplied wholesalers in Mumbai since 1958. The blends are
                the family&rsquo;s. The palate is hers. The tin is new.
              </p>
              <p style={{ margin: 0 }}>
                For sixty years the business sold loose-leaf chai by the
                kilo to other tea shops, who put their own names on the
                packaging and marked it up four times over. Devika watched
                this happen through her teens and decided to flip it.
              </p>
              <p style={{ margin: 0 }}>
                We built her a direct brand. Tins. A range. A site that
                reads like a strong cup. Same blends. Twice the margin.
                The middleman is gone.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SOFT }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Image
              src="/images/kadak-chai/devika-portrait.webp"
              alt="Devika, a 30-year-old Mumbai tea entrepreneur, holding a kulhad of chai"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                padding: 16,
                background: "rgba(17,9,6,0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--page-border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--page-accent)",
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                DEVIKA RAO · FOUNDER
              </p>
              <p
                style={{
                  fontFamily:
                    "var(--font-body), 'Crimson Pro', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "var(--page-text)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                &ldquo;I grew up tasting blends. I should be the one
                naming them.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .kc-devika-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .kc-devika-grid {
            grid-template-columns: 60fr 40fr;
            gap: 96px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
