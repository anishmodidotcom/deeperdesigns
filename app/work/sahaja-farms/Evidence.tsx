"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as const;

type Card = {
  src: string;
  alt: string;
  caption: string;
  ratio: string;
};

const CARDS: Card[] = [
  {
    src: "/images/sahaja-farms/greenhouse-interior.webp",
    alt: "Rows of leafy greens growing on raised beds in a modern polyhouse greenhouse",
    caption:
      "Greenhouse 2 grows the lettuce, coriander, and basil for Bangalore restaurant clients.",
    ratio: "16 / 9",
  },
  {
    src: "/images/sahaja-farms/soil-hands.webp",
    alt: "Weathered hands cupping rich dark soil with a small seedling sprouting",
    caption:
      "Live soil. No synthetic inputs. The reason the produce tastes the way it does.",
    ratio: "4 / 5",
  },
  {
    src: "/images/sahaja-farms/farm-truck-loading.webp",
    alt: "Wooden crates of produce being loaded into a small white delivery truck at golden hour",
    caption:
      "Tuesday morning. 80 subscription boxes loaded for delivery to Bangalore by 11 AM.",
    ratio: "3 / 2",
  },
];

export default function Evidence() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          WHAT THE WORK LOOKS LIKE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-bricolage), Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 720,
            fontVariationSettings: "'opsz' 96",
          }}
        >
          Not a tech farm. A farm with tech.
        </motion.h2>

        <div className="sf-evidence-grid">
          {CARDS.map((c, i) => (
            <motion.figure
              key={c.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: EASE,
              }}
              style={{
                position: "relative",
                margin: 0,
                aspectRatio: c.ratio,
                overflow: "hidden",
                borderRadius: 10,
                border: "1px solid var(--page-border)",
              }}
            >
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 90vw"
                style={{ objectFit: "cover" }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(11,16,10,0.94) 100%)",
                }}
              />
              <figcaption
                style={{
                  position: "absolute",
                  left: 20,
                  right: 20,
                  bottom: 20,
                  fontFamily:
                    "var(--font-bricolage), Georgia, serif",
                  fontWeight: 500,
                  fontSize: 15,
                  letterSpacing: "-0.015em",
                  color: "#F0EBDD",
                  lineHeight: 1.4,
                }}
              >
                {c.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-bricolage), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(20px, 2.6vw, 28px)",
            letterSpacing: "-0.025em",
            color: "var(--page-text)",
            textAlign: "center",
            margin: 0,
            marginTop: 64,
            maxWidth: 720,
            marginInline: "auto",
            fontVariationSettings: "'opsz' 96",
          }}
        >
          The technology disappears. The farm gets clearer.
        </motion.p>
      </div>

      <style jsx>{`
        .sf-evidence-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 720px) {
          .sf-evidence-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
