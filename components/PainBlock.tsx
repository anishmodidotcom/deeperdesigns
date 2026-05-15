"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "next-view-transitions";
import { FORM_HREF, FORM_CTA, WHATSAPP_HREF } from "@/lib/contact";

type Props = {
  number: string;
  archetype: string;
  timeline: string;
  pattern?: string;
  pains?: string[];
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PainBlock({
  number,
  archetype,
  timeline,
  pattern,
  pains,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const phrases = pains && pains.length > 0 ? pains : [];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced || paused || phrases.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 2500);
    return () => window.clearInterval(id);
  }, [reduced, paused, phrases.length]);

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
        style={{ maxWidth: 1080, marginInline: "auto" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
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
            STUDY · {number}
          </p>

          {phrases.length > 0 ? (
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused((p) => !p)}
              style={{
                minHeight: "clamp(2.4em, 6vw, 2.6em)",
                marginBottom: 32,
                position: "relative",
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={`p-${index}`}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(8px)", y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{
                    fontSize: "clamp(28px, 4.4vw, 48px)",
                    lineHeight: 1.08,
                    color: "var(--page-text, var(--text))",
                    margin: 0,
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {phrases[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          ) : null}

          <p
            style={{
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.55,
              color: "var(--page-text-2, var(--text-2))",
              margin: 0,
              maxWidth: 780,
              fontWeight: 300,
              letterSpacing: "-0.005em",
            }}
          >
            We built this as a working prototype, inspired by the real
            bottleneck of{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--page-accent, var(--accent))",
              }}
            >
              {archetype}
            </em>
            . If this sounds like your business, we can build and ship your
            version in about {timeline}.
          </p>

          {pattern ? (
            <p
              style={{
                fontSize: 16,
                color: "var(--page-text-2, var(--text-2))",
                lineHeight: 1.6,
                margin: 0,
                marginTop: 20,
                maxWidth: 720,
              }}
            >
              <strong style={{ fontWeight: 500 }}>
                Sound like your business?
              </strong>{" "}
              {pattern} The pattern is the same.
            </p>
          ) : null}

          <p
            style={{
              fontSize: 15,
              color: "var(--page-text, var(--text))",
              margin: 0,
              marginTop: 16,
              maxWidth: 720,
              lineHeight: 1.6,
            }}
          >
            If this sounds like your business,{" "}
            <Link
              href={FORM_HREF}
              data-cursor="pointer"
              style={{
                color: "var(--page-accent, var(--accent))",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                textDecorationThickness: 1,
              }}
            >
              let&apos;s build yours →
            </Link>
          </p>

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
              Start a conversation
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
                color: "var(--page-text, var(--text))",
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
