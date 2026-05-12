"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
        background: "var(--surface-1)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 960, marginInline: "auto", textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          NOT SURE WHICH ONE?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(32px, 5vw, 60px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.12,
            color: "var(--text)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          Tell us the problem.
          <br />
          We will name the shape.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/#contact"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              paddingInline: 28,
              paddingBlock: 16,
              background: "var(--accent)",
              color: "#FFFFFF",
              borderRadius: 9999,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Send us a brief
          </Link>
          <Link
            href="/process"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              paddingInline: 28,
              paddingBlock: 16,
              border: "1px solid var(--border-2)",
              color: "var(--text)",
              borderRadius: 9999,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            See the process
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
