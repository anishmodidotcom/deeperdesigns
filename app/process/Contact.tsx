"use client";

import { motion } from "motion/react";
import { WHATSAPP_HREF } from "@/lib/contact";
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
          READY?
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
            marginBottom: 36,
          }}
        >
          It starts with a real conversation.
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
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              paddingInline: 28,
              paddingBlock: 16,
              background: "#25D366",
              color: "#0F2A1B",
              borderRadius: 9999,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
            }}
          >
            Start a conversation ↗
          </a>
          <Link
            href="/start-your-study"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              paddingInline: 28,
              paddingBlock: 16,
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border-2)",
              borderRadius: 9999,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Let&apos;s explore possibilities →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
