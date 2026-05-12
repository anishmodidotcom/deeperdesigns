"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactCTA() {
  return (
    <section className="section" id="contact">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border-2)",
            borderRadius: 16,
            padding: "clamp(40px, 8vw, 96px)",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            alignItems: "flex-start",
            maxWidth: 1080,
            marginInline: "auto",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--accent)",
              margin: 0,
            }}
          >
            COMMISSION YOUR STUDY
          </p>

          <h2
            style={{
              fontSize: "clamp(32px, 5.4vw, 64px)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "var(--text)",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 820,
            }}
          >
            Tell us what is slowing you down.
            <br />
            We will design your possibility study.
          </h2>

          <p
            style={{
              fontSize: 17,
              color: "var(--text-2)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 640,
            }}
          >
            Nine quick questions. A verified phone number. Then a study plan,
            a timeline, and a number, back within 24 hours. If it is not a
            fit, we will say so.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginTop: 12,
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
                border: "none",
                borderRadius: 9999,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              Start Your Possibility Study
              <span aria-hidden>→</span>
            </Link>
            <a
              href="https://wa.me/919968716498?text=Hey%2C%20I%27m%20interested%20in%20working%20with%20Deeper%20Designs"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                paddingInline: 24,
                paddingBlock: 14,
                background: "transparent",
                color: "var(--text-2)",
                border: "1px solid var(--border-2)",
                borderRadius: 9999,
                fontSize: 14,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                textDecoration: "none",
              }}
            >
              Prefer WhatsApp? +91 99687 16498
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
