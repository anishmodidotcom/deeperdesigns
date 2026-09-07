"use client";

import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const STATS = [
  {
    value: "100%",
    label: "Renewal rate",
    note: "Every parent who signed up for a term has signed up for the next.",
  },
  {
    value: "+24pts",
    label: "Average grade gain",
    note: "Measured composite score from intake to final mock.",
  },
  {
    value: "0",
    label: "Status-check WhatsApps",
    note: "The portal is the answer to the question.",
  },
  {
    value: "32 / 32",
    label: "Roster at capacity",
    note: "Waitlisted parents are sent a referral to a trusted maths tutor.",
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
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          SECTION 05 · THE OUTCOMES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SOFT }}
          style={{
            fontFamily:
              "var(--font-display-academic), 'Source Serif 4', 'Times New Roman', serif",
            fontWeight: 500,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.02,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 80,
            maxWidth: 920,
          }}
        >
          A waitlist, by design.
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--page-accent)",
            }}
          >
            And held there.
          </em>
        </motion.h2>

        <div className="bp-stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: SOFT }}
              style={{
                padding: 40,
                borderTop: "1px solid var(--page-accent)",
                background: "var(--page-surface-1)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily:
                    "var(--font-display-academic), 'Source Serif 4', serif",
                  fontWeight: 500,
                  fontSize: "clamp(48px, 5vw, 72px)",
                  letterSpacing: "-0.03em",
                  color: "var(--page-text)",
                  lineHeight: 1,
                  marginBottom: 24,
                }}
              >
                {stat.value}
              </span>
              <p
                style={{
                  margin: 0,
                  marginBottom: 10,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--page-accent)",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily:
                    "var(--font-body-soft), 'Source Sans 3', sans-serif",
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  lineHeight: 1.6,
                }}
              >
                {stat.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bp-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 700px) {
          .bp-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }
        }
        @media (min-width: 1024px) {
          .bp-stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
          }
        }
      `}</style>
    </section>
  );
}
