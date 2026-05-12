"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { WHATSAPP_HREF, FORM_HREF, FORM_CTA } from "@/lib/contact";

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
            START A CONVERSATION
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
            We will show you what is possible.
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
            Message us on WhatsApp for the fastest response. Or run through
            nine quick questions and we will return a plan, a timeline, and a
            number within 24 hours. If it is not a fit, we will say so.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 12,
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
                gap: 10,
                paddingInline: 28,
                paddingBlock: 16,
                background: "#25D366",
                color: "#0F2A1B",
                border: "none",
                borderRadius: 9999,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              WhatsApp +91 99687 16498
              <span aria-hidden>↗</span>
            </a>
            <Link
              href={FORM_HREF}
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                paddingInline: 28,
                paddingBlock: 16,
                background: "transparent",
                color: "var(--text)",
                border: "1px solid var(--border-2)",
                borderRadius: 9999,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              {FORM_CTA}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
