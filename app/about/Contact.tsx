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
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          §06 · GET IN TOUCH
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
            fontSize: "clamp(36px, 5.6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          The brief is fifteen minutes.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 17,
            color: "var(--text-2)",
            margin: 0,
            marginBottom: 40,
            lineHeight: 1.7,
            maxWidth: 600,
            marginInline: "auto",
          }}
        >
          Tell us what you are trying to build and we will send back a
          shape, a timeline, and a number within 24 hours. If it is not
          a fit, we will say so.
        </motion.p>
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
            href="/start-your-study"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
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
            href="/services"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
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
            See what we build
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
