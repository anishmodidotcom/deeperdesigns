"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const INGREDIENTS = [
  {
    name: "Turmeric",
    note: "Anti-inflammatory · brightening",
    src: "/images/veda-glow/ingredient-turmeric.webp",
    alt: "Macro photograph of fresh turmeric roots",
  },
  {
    name: "Sandalwood",
    note: "Calming · scent grounding",
    src: "/images/veda-glow/ingredient-sandalwood.webp",
    alt: "Macro photograph of sandalwood shavings",
  },
  {
    name: "Damask Rose",
    note: "Hydrating · skin softening",
    src: "/images/veda-glow/ingredient-rose.webp",
    alt: "Macro photograph of fresh damask rose petals",
  },
  {
    name: "Neem",
    note: "Antibacterial · clarifying",
    src: "/images/veda-glow/ingredient-neem.webp",
    alt: "Macro photograph of fresh neem leaves",
  },
];

export default function Founder() {
  return (
    <section style={{ paddingBlock: 144, position: "relative" }}>
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <div className="vg-founder-grid">
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
              src="/images/veda-glow/priya-portrait.webp"
              alt="Priya, the founder of Veda Glow, in her Jaipur studio holding a dropper bottle"
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
                marginBottom: 28,
              }}
            >
              THE FOUNDER
            </p>

            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 400,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.08,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              Priya is a vaidya.
              <br />
              <em style={{ color: "var(--page-accent)" }}>Not a brand manager.</em>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                maxWidth: 540,
                marginBottom: 48,
              }}
            >
              <p style={{ margin: 0 }}>
                Priya trained six years at an Ayurvedic college in Hardwar
                before opening her studio in Jaipur. She blends every
                product herself. Forty SKUs across face, body, and hair,
                each one for a different doshic balance.
              </p>
              <p style={{ margin: 0 }}>
                The product was never the problem. The consultation was.
                Every customer needed a personal answer, and answering
                them by hand ate her week.
              </p>
            </div>

            <div className="vg-ingredient-grid">
              {INGREDIENTS.map((ing) => (
                <div
                  key={ing.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      borderRadius: 4,
                    }}
                  >
                    <Image
                      src={ing.src}
                      alt={ing.alt}
                      fill
                      sizes="(min-width: 700px) 140px, 40vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontStyle: "italic",
                        fontSize: 17,
                        color: "var(--page-text)",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {ing.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--page-text-2)",
                        margin: 0,
                        marginTop: 4,
                      }}
                    >
                      {ing.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .vg-founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        .vg-ingredient-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (min-width: 1024px) {
          .vg-founder-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: center;
          }
          .vg-ingredient-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
