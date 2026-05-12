"use client";

import { motion } from "motion/react";

type Props = {
  number: string;
  archetype: string;
  timeline: string;
};

export default function PossibilityNote({ number, archetype, timeline }: Props) {
  return (
    <section
      style={{
        paddingBlock: 80,
        borderTop: "1px solid var(--page-border, rgba(255,255,255,0.08))",
        borderBottom: "1px solid var(--page-border, rgba(255,255,255,0.08))",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 960, marginInline: "auto" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--page-accent, var(--accent))",
              margin: 0,
              marginBottom: 20,
            }}
          >
            POSSIBILITY STUDY · {number} OF 20
          </p>
          <p
            style={{
              fontSize: "clamp(20px, 2.6vw, 28px)",
              lineHeight: 1.5,
              color: "var(--page-text, var(--text))",
              margin: 0,
              maxWidth: 760,
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            A possibility study. We built this concept end-to-end as a working
            prototype, inspired by the real operational bottleneck of{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--page-accent, var(--accent))",
              }}
            >
              {archetype}
            </em>
            . The same system can be commissioned, customized, and shipped to
            your business in {timeline}.
          </p>
          <p
            style={{
              fontSize: 14,
              color: "var(--page-text-3, var(--text-3))",
              margin: 0,
              marginTop: 18,
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.04em",
            }}
          >
            A traditional agency promises and pitches. We prototype and show.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
