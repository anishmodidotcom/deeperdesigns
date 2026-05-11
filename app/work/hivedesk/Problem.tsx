"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const CALLOUTS = [
  { value: "0", label: "Analytics dashboards" },
  { value: "0", label: "Automated followups" },
  { value: "0", label: "Churn predictors" },
];

export default function Problem() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div
        className="container-x"
        style={{ maxWidth: 920, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE NUMBERS DIDN&rsquo;T LIE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 32,
            maxWidth: 880,
          }}
        >
          70% occupancy. 4-month average stay. A whiteboard for room bookings.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            color: "var(--page-text-2)",
            fontSize: 17,
            lineHeight: 1.65,
            maxWidth: 720,
          }}
        >
          <p style={{ margin: 0 }}>
            Amit&rsquo;s 120-seat floor in Indiranagar lives in the middle of
            Bangalore&rsquo;s tech churn. Members are WeWork-trained. They
            expect a slack channel, a working calendar, an espresso machine
            that does not run out at 4pm. The supply side of the business is
            being judged by SaaS standards.
          </p>
          <p style={{ margin: 0 }}>
            The operator was running on Excel and goodwill. Renewals were
            chased on WhatsApp the day they lapsed. He did not have a member
            problem. He had an instrumentation problem. You cannot fix what
            you cannot see.
          </p>
        </motion.div>

        <div
          className="hd-problem-callouts"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 0,
            marginTop: 64,
            borderTop: "1px solid var(--page-border)",
          }}
        >
          {CALLOUTS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.35,
                delay: i * 0.08,
                ease: EASE,
              }}
              style={{
                paddingBlock: 40,
                paddingInline: 24,
                borderLeft:
                  i === 0
                    ? "none"
                    : "1px solid var(--page-border)",
                textAlign: "left",
              }}
              className="hd-problem-cell"
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(56px, 8vw, 96px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: "var(--page-accent)",
                }}
              >
                {c.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--page-text-3)",
                  marginTop: 16,
                }}
              >
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .hd-problem-cell {
            border-left: none !important;
            border-top: 1px solid var(--page-border);
          }
          .hd-problem-cell:first-child {
            border-top: none;
          }
        }
      `}</style>
    </section>
  );
}
