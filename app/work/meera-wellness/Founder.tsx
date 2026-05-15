"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Founder() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1280, marginInline: "auto" }}>
        <div className="mw-founder-grid">
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
                marginBottom: 24,
              }}
            >
              THE INSTRUCTOR
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              Meera teaches.
              <br />
              <em style={{ color: "var(--page-accent)" }}>
                The platform handles the rest.
              </em>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 19,
                lineHeight: 1.7,
                color: "var(--page-text-2)",
                maxWidth: 520,
              }}
            >
              <p style={{ margin: 0 }}>
                Meera left a corporate consulting job to teach hatha yoga
                full time in Dubai. Twenty-four active clients across
                ashtanga, prenatal, and breathwork. Each one needs
                scheduling, programme briefs, lesson notes, and the
                occasional gentle nudge.
              </p>
              <p style={{ margin: 0 }}>
                The old setup was three Google calendars, a notes app,
                and a WhatsApp Business she answered between sessions.
                The platform replaces all of it.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
              src="/images/meera-wellness/meera-portrait.webp"
              alt="Meera, the founder of Meera Wellness, sitting cross-legged on a natural-fiber yoga mat in her Dubai studio"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .mw-founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .mw-founder-grid {
            grid-template-columns: 60fr 40fr;
            gap: 96px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
