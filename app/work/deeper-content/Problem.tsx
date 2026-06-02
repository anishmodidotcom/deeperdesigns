"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const INCONSISTENT = ["INC-01", "INC-02", "INC-03", "INC-04", "INC-05", "INC-06"];

export default function Problem() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
        background: "var(--page-surface)",
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
          THE PROBLEM
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
            marginBottom: 32,
            maxWidth: 880,
          }}
        >
          Your feed looks like five different brands.
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
            marginBottom: 56,
            maxWidth: 720,
          }}
        >
          Different fonts. Different filters. Different voice. One week you&apos;re
          aspirational, next week you&apos;re discount-heavy, next week you forgot to
          post. Your brand recall becomes whatever your last post was.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="dc-incon-strip"
          aria-label="Six mismatched social posts from the same brand"
        >
          {INCONSISTENT.map((code) => (
            <div key={code} className="dc-incon-tile">
              <Image
                src={`/images/deeper-content/samples/${code}.jpg`}
                alt=""
                role="presentation"
                fill
                sizes="(min-width: 1100px) 16vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--page-text-3)",
            margin: 0,
            marginTop: 24,
            maxWidth: 640,
          }}
        >
          The average small brand posts across 4 to 7 visual registers per month.
        </motion.p>
      </div>

      <style>{`
        .dc-incon-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .dc-incon-tile {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid var(--page-border);
        }
        @media (min-width: 768px) {
          .dc-incon-strip {
            grid-template-columns: repeat(6, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
