"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Selectivity() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 980, marginInline: "auto", textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          §04 · THE MANIFESTO
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(36px, 5.6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          We say no to projects that need a{" "}
          <span style={{ color: "var(--accent-2)" }}>team</span>, not a{" "}
          <span style={{ color: "var(--accent-2)" }}>tool</span>.
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{
            fontSize: 17,
            color: "var(--text-2)",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 680,
            marginInline: "auto",
          }}
        >
          A tool is something a small business owner can put in front of
          a customer or an employee on day one. A team is what you need
          when the problem is a whole department. We are not the right
          shop for the second one. The portfolio is twenty businesses
          where the right move was a single, considered tool.
        </motion.p>
      </div>
    </section>
  );
}
