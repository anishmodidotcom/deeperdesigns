"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;

type Tile = {
  src: string;
  alt: string;
  label: string;
};

const TILES: Tile[] = [
  {
    src: "/images/oud-and-ember/ingredients-grid-1.webp",
    alt: "Saffron threads scattered on black marble",
    label: "Saffron",
  },
  {
    src: "/images/oud-and-ember/ingredients-grid-2.webp",
    alt: "Single rose petal with morning dew on dark velvet",
    label: "Rose Taif",
  },
  {
    src: "/images/oud-and-ember/ingredients-grid-3.webp",
    alt: "Glowing translucent amber resin chunks",
    label: "Amber",
  },
  {
    src: "/images/oud-and-ember/ingredients-grid-4.webp",
    alt: "Cardamom pods and vanilla beans on dark stone",
    label: "Cardamom",
  },
];

export default function Library() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: EASE }}
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
          THE LIBRARY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
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
            marginBottom: 64,
            maxWidth: 720,
          }}
        >
          Fifteen scents. Forty-seven notes. Infinite combinations.
        </motion.h2>

        <div className="oe-library-grid">
          {TILES.map((t, i) => {
            const hovered = hoverIndex === i;
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 1.02, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.15,
                  ease: EASE,
                }}
                data-cursor="view"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: 4,
                  border: hovered
                    ? "1px solid var(--page-accent)"
                    : "1px solid transparent",
                  transition:
                    "border-color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  style={{
                    objectFit: "cover",
                    transform: hovered ? "scale(1.05)" : "scale(1)",
                    transition:
                      "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(7,6,10,0.72) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: 16,
                    bottom: 14,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: hovered
                      ? "var(--page-accent)"
                      : "var(--page-text)",
                    transition:
                      "color 0.6s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                >
                  {t.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--page-border)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "var(--page-text-2)",
              maxWidth: 640,
              textAlign: "center",
              lineHeight: 1.7,
              margin: 0,
              fontStyle: "italic",
              fontFamily:
                "var(--font-cormorant-display), Cormorant, Georgia, serif",
            }}
          >
            And ten more, each sourced from its origin: Cambodian oud,
            Bulgarian rose, Omani frankincense, Mysore sandalwood…
          </p>
        </div>
      </div>

      <style jsx>{`
        .oe-library-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (min-width: 720px) {
          .oe-library-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
