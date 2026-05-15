"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.7, 0, 0.3, 1] as const;

export default function Respondent() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1100, marginInline: "auto" }}
      >
        <div className="kl-respondent-grid">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 32,
              }}
            >
              04 · THE RESPONDENT
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-spectral), 'Source Serif 4', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 5.4vw, 64px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 36,
              }}
            >
              He gets his Tuesdays back.
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                color: "var(--page-text-2)",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 540,
              }}
            >
              <p style={{ margin: 0 }}>
                Karan structures his week now. Partner-track work Monday,
                Wednesday, Friday. Deep transactional work Tuesday and
                Thursday. No calls on weekends. The qualifier handles
                anything that arrives outside the lanes he set.
              </p>
              <p style={{ margin: 0 }}>
                He raised his fees on custom work by forty percent.
                Template prices held, because the volume is self-service
                now. The clients who used to argue over a Rs. 15,000 SAFE
                read the price on screen, pay it, and get the document in
                24 hours. The clients who can afford a real partner now
                get one.
              </p>
            </div>

            <motion.figure
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              style={{
                margin: 0,
                marginTop: 56,
                paddingLeft: 32,
                borderLeft: "2px solid var(--page-oxblood)",
                maxWidth: 620,
              }}
            >
              <blockquote
                style={{
                  fontFamily:
                    "var(--font-spectral), 'Source Serif 4', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 32,
                  letterSpacing: "-0.015em",
                  color: "var(--page-oxblood)",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                The qualifier is not my receptionist. It is my partner.
              </blockquote>
              <figcaption
                style={{
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "var(--page-text-3)",
                  marginTop: 16,
                }}
              >
                K. MEHTA · WEEK ONE
              </figcaption>
            </motion.figure>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              border: "1px solid var(--page-border)",
            }}
          >
            <Image
              src="/images/karan-legal/karan-portrait.webp"
              alt="Karan, a 32-year-old startup lawyer in Mumbai, in a minimal modern office"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .kl-respondent-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .kl-respondent-grid {
            grid-template-columns: 55fr 45fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
