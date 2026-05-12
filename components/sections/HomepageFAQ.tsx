"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type Item = { q: string; a: string };

const ITEMS: Item[] = [
  {
    q: "How much does this cost?",
    a: "Starts at ₹25,000 for a single small tool. Most projects sit between ₹1L and ₹10L. We share a number after a 20-min call.",
  },
  {
    q: "How long does it take?",
    a: "Two to six weeks for most projects. The brief is one day. The build is the rest.",
  },
  {
    q: "Do you build for non-Indian businesses?",
    a: "Yes. We work with UAE founders directly and with global SMBs paying in USD. Currency is not the constraint, fit is.",
  },
  {
    q: "What if I don't know exactly what I need?",
    a: "That is the most common starting point. The first call is to figure out what to build, not to sell you a build.",
  },
  {
    q: "Will I own the code and the brand?",
    a: "Yes. Everything we ship is yours. Code, design files, copy, brand assets. Hosted wherever you want.",
  },
  {
    q: "What if I just want to talk?",
    a: "WhatsApp us at +91 99687 16498. No form required.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HomepageFAQ() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
      }}
      id="faq"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div
        className="container-x"
        style={{ maxWidth: 1080, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          06 · QUESTIONS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 56,
            maxWidth: 760,
          }}
        >
          The questions we hear most.
        </motion.h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid var(--border)",
          }}
        >
          {ITEMS.map((item, i) => {
            const open = isDesktop ? true : openIndex === i;
            return (
              <li
                key={item.q}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <button
                  type="button"
                  onClick={() =>
                    isDesktop
                      ? undefined
                      : setOpenIndex((idx) => (idx === i ? null : i))
                  }
                  aria-expanded={open}
                  data-cursor="pointer"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    paddingBlock: 22,
                    paddingInline: 0,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 20,
                    color: "var(--text)",
                    cursor: isDesktop ? "default" : "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      color: "var(--text-3)",
                      paddingTop: 4,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: "clamp(18px, 2.2vw, 22px)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.q}
                  </span>
                  {isDesktop ? null : (
                    <span
                      aria-hidden
                      style={{
                        fontSize: 22,
                        color: "var(--text-3)",
                        transition: "transform 0.2s var(--ease-spring)",
                        transform: open ? "rotate(45deg)" : "rotate(0deg)",
                        display: "inline-block",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  )}
                </button>
                {open ? (
                  <p
                    style={{
                      margin: 0,
                      paddingLeft: 36,
                      paddingRight: 48,
                      paddingBottom: 24,
                      color: "var(--text-2)",
                      fontSize: 16,
                      lineHeight: 1.7,
                      maxWidth: 760,
                    }}
                  >
                    {item.a}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
