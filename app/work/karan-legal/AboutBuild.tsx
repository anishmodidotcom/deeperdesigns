"use client";

import { motion } from "motion/react";

const EASE = [0.7, 0, 0.3, 1] as const;

const INFO: [string, string][] = [
  ["Client", "Karan Mehta · Karan Legal"],
  ["Industry", "Boutique legal, startup focus"],
  ["Location", "Mumbai, IN"],
  ["Timeline", "9 days"],
  ["Year", "2025"],
];

export default function AboutBuild() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 760, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          §06 · BRIEF SUMMARY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-spectral), 'Source Serif 4', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(32px, 4.8vw, 48px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 36,
          }}
        >
          About this build.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            lineHeight: 1.8,
            margin: 0,
            maxWidth: 660,
          }}
        >
          Built in 9 days. Custom GPT-4 qualifier trained on Karan&rsquo;s
          intake notes, Calendly integration for partner-track calls,
          Razorpay payment links for template work, automated PDF
          generation for templated documents. The smallest build we have
          shipped. Also the most efficient ROI. Some practices need an
          army. Karan needed a doorman.
        </motion.p>

        <dl
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            columnGap: 28,
            rowGap: 14,
          }}
        >
          {INFO.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--page-text-3)",
                }}
              >
                {k}
              </dt>
              <dd
                style={{
                  margin: 0,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 13,
                  color: "var(--page-text)",
                  letterSpacing: "0.02em",
                }}
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>

        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontStyle: "italic",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "var(--page-text-3)",
            margin: 0,
            marginTop: 56,
          }}
        >
          Note: This build is offered selectively. We do not work with all
          law firms.
        </p>
      </div>
    </section>
  );
}
