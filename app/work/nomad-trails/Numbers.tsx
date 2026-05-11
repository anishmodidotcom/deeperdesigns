"use client";

import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const STATS = [
  {
    value: "8",
    label: "Max group size",
    note: "Brochure competitors run 20.",
  },
  {
    value: "62%",
    label: "Direct bookings",
    note: "Up from 18% pre-rebuild. Travel-agent commissions returned to the trip price.",
  },
  {
    value: "3x",
    label: "Average trip rate",
    note: "Repositioned out of the budget bracket.",
  },
  {
    value: "210+",
    label: "Trips guided",
    note: "Across Ladakh, Sikkim, Spiti and Uttarakhand since 2019.",
  },
];

export default function Numbers() {
  return (
    <section
      style={{
        paddingBlock: 144,
        background: "var(--page-bg)",
        position: "relative",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent-deep)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          SECTION 06 · THE OUTCOMES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SOFT }}
          style={{
            fontFamily:
              "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
            fontWeight: 500,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 80,
            maxWidth: 920,
          }}
        >
          Smaller groups.
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--page-accent-deep)",
            }}
          >
            Bigger margins.
          </em>
        </motion.h2>

        <div className="nt-stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: SOFT }}
              style={{
                paddingBlock: 36,
                paddingInline: 0,
                borderTop: "1px solid var(--page-border)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily:
                    "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
                  fontWeight: 500,
                  fontSize: "clamp(56px, 7vw, 96px)",
                  letterSpacing: "-0.03em",
                  color: "var(--page-text)",
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                {stat.value}
              </span>
              <p
                style={{
                  fontFamily:
                    "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--page-accent-deep)",
                  margin: 0,
                  marginBottom: 12,
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontFamily:
                    "var(--font-body-clean), 'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  margin: 0,
                  lineHeight: 1.6,
                  maxWidth: 280,
                }}
              >
                {stat.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .nt-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 700px) {
          .nt-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0 32px;
          }
        }
        @media (min-width: 1024px) {
          .nt-stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
