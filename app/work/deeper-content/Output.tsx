"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

// 21-image cross-brand gallery, ordered to break adjacency between brands
// so the eye reads the set as one engine's range, not three monoblocks.
const GALLERY = [
  "FR-01", "BA-02", "SS-01", "AH-02", "KS-02", "CB-02", "OA-01",
  "FR-02", "BA-04", "SS-02", "AM-03", "KA-01", "PR-02", "VL-01",
  "FR-04", "BA-01", "SS-04", "AH-04", "TT-02", "LC-02", "VW-01",
];

export default function Output() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "clamp(20px, 4vw, 48px)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent-2)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE OUTPUT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 64px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          The kind of content you can make in a few clicks.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 24,
            maxWidth: 680,
          }}
        >
          Each post is the output of one CGE session. Different brands,
          different briefs. Same level of finish.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-text-3)",
            margin: 0,
            marginBottom: 56,
          }}
        >
          ALL BRANDS · 60 POSTS
        </motion.p>

        <div className="dc-out-grid">
          {GALLERY.map((code, i) => (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.5, delay: (i % 7) * 0.04, ease: EASE }}
              className="dc-out-tile"
            >
              <Image
                src={`/images/deeper-content/samples/${code}.jpg`}
                alt=""
                role="presentation"
                fill
                sizes="(min-width: 1100px) 16vw, (min-width: 700px) 25vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .dc-out-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .dc-out-tile {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid var(--page-border);
        }
        @media (min-width: 700px) {
          .dc-out-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }
        }
        @media (min-width: 1100px) {
          .dc-out-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
}
