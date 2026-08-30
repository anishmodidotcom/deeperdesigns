"use client";

import { motion } from "motion/react";
import type { Industry } from "@/lib/industries";
import { renderSerif } from "./text";

const EASE = [0.16, 1, 0.3, 1] as const;

// A wall of representative voices: many founders, many different problems,
// each tagged to the build that answers it.
export default function IndustryPersonas({
  headline,
  intro,
  personas,
}: {
  headline: string;
  intro: string;
  personas: NonNullable<Industry["personas"]>;
}) {
  return (
    <section
      style={{ paddingBlock: "var(--dd-section-py, 120px)" }}
      aria-label="Representative voices"
    >
      <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
        <div style={{ maxWidth: 720, marginBottom: 14 }}>
          <h2
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "var(--dd-fs-h2, clamp(28px, 3.5vw, 44px))",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--dd-text-high, #F5F5F5)",
              margin: 0,
            }}
          >
            {renderSerif(headline)}
          </h2>
          <p
            style={{
              marginTop: 18,
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--dd-text-mid, #A8A8A8)",
            }}
          >
            {intro}
          </p>
        </div>
        <p
          style={{
            margin: "0 0 36px",
            fontSize: 13,
            color: "var(--dd-text-low, #808080)",
          }}
        >
          Representative, not specific clients.
        </p>

        <div className="ind-personas">
          {personas.map((p, i) => (
            <motion.figure
              key={p.quote}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: EASE }}
              style={{
                margin: 0,
                background: "var(--dd-surface-1, #111111)",
                border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
                borderRadius: 16,
                padding: "26px 24px 22px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  flex: 1,
                  fontFamily:
                    "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(19px, 1.5vw, 22px)",
                  lineHeight: 1.32,
                  letterSpacing: "-0.01em",
                  color: "var(--dd-bone, #F5F4EF)",
                }}
              >
                {p.quote}
              </blockquote>
              <figcaption
                style={{
                  marginTop: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--dd-text-mid, #A8A8A8)" }}>
                  {p.persona}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    color: "var(--page-accent)",
                    border: "1px solid var(--page-accent)",
                    borderRadius: 999,
                    padding: "3px 10px",
                  }}
                >
                  {p.tag}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <style>{`
        .ind-personas {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 640px) {
          .ind-personas { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .ind-personas { grid-template-columns: repeat(3, 1fr); gap: 20px; }
        }
      `}</style>
    </section>
  );
}
