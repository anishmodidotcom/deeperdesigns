"use client";

import { motion } from "motion/react";

const EASE = [0.7, 0, 0.2, 1] as const;

const MARQUEE_BLOCKS = [
  { text: "BIG FOLLOWING.", color: "var(--page-accent)" },
  { text: "NO PRODUCT.", color: "var(--page-text)" },
  { text: "UNTIL NOW.", color: "var(--page-accent)" },
];

export default function Problem() {
  return (
    <section
      style={{
        background: "var(--page-bg)",
        paddingBlock: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          paddingBlock: 64,
          borderTop: "1px solid var(--page-border)",
          borderBottom: "1px solid var(--page-border)",
          overflow: "hidden",
        }}
      >
        <div className="zf-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="zf-marquee-track">
              {MARQUEE_BLOCKS.map((b, i) => (
                <span key={`${dup}-${i}`} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-anton), Impact, sans-serif",
                      fontSize: "clamp(64px, 12vw, 160px)",
                      lineHeight: 1,
                      color: b.color,
                      textTransform: "uppercase",
                      letterSpacing: "-0.005em",
                      paddingInline: 28,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.text}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 24,
                      color: "var(--page-accent)",
                      paddingInline: 8,
                    }}
                  >
                    *
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className="container-x"
        style={{ paddingBlock: 96, textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontSize: 19,
            color: "var(--page-text)",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 720,
            marginInline: "auto",
          }}
        >
          280K followers, a PDF workout guide, and a three-week dropoff
          cliff. The influencer model was failing her. The trainer in her
          needed a real product.
        </motion.p>
      </div>

      <style jsx>{`
        .zf-marquee {
          display: flex;
          width: max-content;
          animation: zf-scroll 30s linear infinite;
        }
        .zf-marquee-track {
          display: flex;
          flex-shrink: 0;
        }
        @keyframes zf-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .zf-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
