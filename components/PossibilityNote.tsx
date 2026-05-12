"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { FORM_HREF, FORM_CTA, WHATSAPP_HREF } from "@/lib/contact";

type Props = {
  number: string;
  archetype: string;
  timeline: string;
  pattern?: string;
};

export default function PossibilityNote({
  number,
  archetype,
  timeline,
  pattern,
}: Props) {
  return (
    <section
      style={{
        paddingBlock: 96,
        borderTop: "1px solid var(--page-border, rgba(255,255,255,0.08))",
        borderBottom: "1px solid var(--page-border, rgba(255,255,255,0.08))",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 960, marginInline: "auto" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--page-accent, var(--accent))",
              margin: 0,
              marginBottom: 20,
            }}
          >
            POSSIBILITY STUDY · {number} OF 20
          </p>
          <p
            style={{
              fontSize: "clamp(20px, 2.6vw, 28px)",
              lineHeight: 1.5,
              color: "var(--page-text, var(--text))",
              margin: 0,
              maxWidth: 780,
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            A possibility study. We built this concept end-to-end as a working
            prototype, inspired by the real operational bottleneck of{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--page-accent, var(--accent))",
              }}
            >
              {archetype}
            </em>
            . The same system can be commissioned, customized, and shipped to
            your business in {timeline}.
          </p>
          {pattern ? (
            <p
              style={{
                fontSize: 16,
                color: "var(--page-text-2, var(--text-2))",
                lineHeight: 1.6,
                margin: 0,
                marginTop: 24,
                maxWidth: 720,
              }}
            >
              <strong style={{ fontWeight: 500 }}>
                Sound like your business?
              </strong>{" "}
              {pattern} The pattern is the same.
            </p>
          ) : null}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 28,
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
                paddingInline: 22,
                paddingBlock: 12,
                background: "#25D366",
                color: "#0F2A1B",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                textDecoration: "none",
              }}
            >
              WhatsApp the studio
              <span aria-hidden>↗</span>
            </a>
            <Link
              href={FORM_HREF}
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                paddingInline: 22,
                paddingBlock: 12,
                background: "transparent",
                color:
                  "var(--page-text, var(--text))",
                border: "1px solid var(--page-border, var(--border-2))",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
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
