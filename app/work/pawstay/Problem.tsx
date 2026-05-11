"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "2 hrs", label: "Daily on update messages" },
  { value: "47", label: "WhatsApp messages on a peak day" },
  { value: "0", label: "Parents who stopped worrying" },
];

export default function Problem() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div
        className="container-x"
        style={{ maxWidth: 920, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
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
          TWO HOURS A DAY ON YOUR PHONE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(32px, 4.6vw, 52px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 32,
            maxWidth: 860,
          }}
        >
          She loved the dogs. She did not love being a customer service rep.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            color: "var(--page-text-2)",
            fontSize: 17,
            lineHeight: 1.75,
            maxWidth: 720,
          }}
        >
          <p style={{ margin: 0 }}>
            Pooja runs a premium 20-dog facility in Chattarpur. Pet parents
            pay top of market for the care. They are anxious, and they should
            be: their dog is their child. Every drop-off triggered six to
            twelve WhatsApp messages over the day. &ldquo;Is she eating?
            Did she nap? Can I see her?&rdquo;
          </p>
          <p style={{ margin: 0 }}>
            Pooja sent photos. Then videos. Then she lost two hours a day to
            it. The customer service was eating the business. We did not
            change how much parents wanted to check in. We changed what they
            had to send a message to do it.
          </p>
        </motion.div>

        <div
          className="ps-problem-callouts"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            marginTop: 72,
            borderTop: "1px solid var(--page-border)",
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
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
              className="ps-problem-cell"
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(48px, 6.4vw, 76px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  color: "var(--page-accent)",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--page-text-3)",
                  marginTop: 16,
                  lineHeight: 1.5,
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .ps-problem-cell {
            border-left: none !important;
            border-top: 1px solid var(--page-border);
          }
          .ps-problem-cell:first-child {
            border-top: none;
          }
        }
      `}</style>
    </section>
  );
}
