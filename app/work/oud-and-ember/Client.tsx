"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.19, 1, 0.22, 1] as const;

export default function Client() {
  return (
    <section
      id="the-house"
      style={{ paddingBlock: 144 }}
    >
      <div className="container-x">
        <div className="oe-client-grid">
          <motion.div
            initial={{ opacity: 0, scale: 1.02, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="oe-client-image"
          >
            <Image
              src="/images/oud-and-ember/oud-wood.webp"
              alt="Raw oud wood chips arranged on dark velvet, dramatic side light"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 50vw, 90vw"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                filter: "saturate(0.7) contrast(1.05)",
                transition:
                  "filter 1.6s cubic-bezier(0.19, 1, 0.22, 1)",
              }}
              className="oe-client-img"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 32,
              }}
            >
              THE HOUSE
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
                maxWidth: 520,
              }}
            >
              Built on heritage. Lost in translation online.
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                color: "var(--page-text-2)",
                fontSize: 16,
                lineHeight: 1.75,
                maxWidth: 520,
              }}
            >
              <p style={{ margin: 0 }}>
                Nadia is a third-generation perfumer. Her atelier in Al
                Quoz is where custom blends are built in person, across
                90-minute consultations. Glass droppers, chilled rose
                water, notes rebalanced until something settles.
              </p>
              <p style={{ margin: 0 }}>
                Seventy percent of her inquiries arrive online. The magic
                does not survive twenty messages on WhatsApp, so customers
                ghost. The atelier was never the bottleneck. The bridge
                to it was.
              </p>
            </div>

            <div
              style={{
                marginTop: 40,
                paddingLeft: 24,
                borderLeft: "1px solid var(--page-accent)",
              }}
            >
              <p
                style={{
                  fontFamily:
                    "var(--font-cormorant-display), Cormorant, Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 22,
                  color: "var(--page-accent)",
                  letterSpacing: "-0.015em",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                An atelier doesn&rsquo;t need a website. A digital atelier
                does.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .oe-client-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        .oe-client-image {
          overflow: hidden;
          border-radius: 4px;
        }
        @media (min-width: 1024px) {
          .oe-client-grid {
            grid-template-columns: 1fr 1fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
