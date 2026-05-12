"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const MATERIALS = [
  { name: "Carrara marble", src: "/images/studio-noor/materials-swatches.webp" },
  { name: "Oak veneer", src: "/images/studio-noor/blueprint-floorplan.webp" },
  { name: "Cream linen", src: "/images/studio-noor/mood-board.webp" },
  { name: "Brass detailing", src: "/images/studio-noor/finished-living.webp" },
];

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
        <div className="sn-founder-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Image
              src="/images/studio-noor/ananya-portrait.webp"
              alt="Ananya, the founder of Studio Noor, in her Bangalore studio holding a fabric swatch book"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
              THE PRACTICE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.08,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              A two-person studio.
              <br />
              <em style={{ color: "var(--page-accent)" }}>
                Six clients at a time.
              </em>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                maxWidth: 520,
                marginBottom: 40,
              }}
            >
              <p style={{ margin: 0 }}>
                Ananya runs Studio Noor with one project manager and a
                rotating bench of trusted contractors. Six homes in
                progress at any time. Each one a six-month build with
                forty material decisions, three vendor cycles, and one
                anxious homeowner.
              </p>
              <p style={{ margin: 0 }}>
                The portal turns that anxiety into a quiet feed. Every
                morning the site supervisor posts a photo, a status, and
                what is next. The client opens the app instead of
                texting Ananya.
              </p>
            </div>

            <div className="sn-material-grid">
              {MATERIALS.map((m) => (
                <div key={m.name}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      borderRadius: 2,
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      src={m.src}
                      alt={m.name}
                      fill
                      sizes="(min-width: 700px) 140px, 40vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--page-text-2)",
                      margin: 0,
                    }}
                  >
                    {m.name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .sn-founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        .sn-material-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (min-width: 1024px) {
          .sn-founder-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: center;
          }
          .sn-material-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
