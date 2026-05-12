"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const PAIRS = [
  { id: "01", caption: "Workshop chair to studio shot" },
  { id: "02", caption: "Floor lamp to lifestyle frame" },
  { id: "03", caption: "Cabinet to warm living room" },
  { id: "04", caption: "Stool to minimal terrace" },
];

export default function Showcase() {
  return (
    <section
      id="showcase"
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
        background: "var(--page-surface)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1320, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          § BEFORE / AFTER
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.03em",
            color: "var(--page-text)",
            lineHeight: 1.06,
            margin: 0,
            marginBottom: 56,
            maxWidth: 720,
          }}
        >
          Phone photo on the left. Maple Lens on the right.
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 28,
          }}
          className="ml-pairs"
        >
          {PAIRS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    background: "var(--page-surface-2)",
                  }}
                >
                  <Image
                    src={`/images/maplelens/before-${p.id}.webp`}
                    alt={`Before ${p.caption.toLowerCase()}`}
                    fill
                    sizes="(min-width: 900px) 50vw, 90vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: "rgba(15,12,10,0.78)",
                      color: "var(--page-text)",
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      paddingInline: 8,
                      paddingBlock: 4,
                      borderRadius: 4,
                    }}
                  >
                    BEFORE
                  </span>
                </div>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    background: "var(--page-surface-2)",
                  }}
                >
                  <Image
                    src={`/images/maplelens/after-${p.id}.webp`}
                    alt={`After ${p.caption.toLowerCase()}`}
                    fill
                    sizes="(min-width: 900px) 50vw, 90vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: "var(--page-accent)",
                      color: "#1A1612",
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      paddingInline: 8,
                      paddingBlock: 4,
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    AFTER
                  </span>
                </div>
              </div>
              <p
                style={{
                  marginTop: 14,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  color: "var(--page-text-3)",
                }}
              >
                {p.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          :global(.ml-pairs) {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
