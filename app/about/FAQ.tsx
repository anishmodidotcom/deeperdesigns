"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Item = {
  q: string;
  a: string;
};

const ITEMS: Item[] = [
  {
    q: "What is Deeper Designs?",
    a: "Deeper Designs builds custom systems for modern businesses. Websites, dashboards, portals, quizzes, and operational tools, designed carefully and shipped in weeks. We are based between Delhi and Dubai, founded in 2017 as a design agency and rebuilt around AI in 2024.",
  },
  {
    q: "Who is Anish Modi?",
    a: "Anish is the founder of Deeper Designs and a business strategist. Ten years across marketing, brand, ops, and financial design. He runs Newfold Ventures LLC out of Dubai and lives between Dubai and Delhi. He leads strategy and the build call on every studio project. Read more at anishmodi.com.",
  },
  {
    q: "How is this different from a regular agency?",
    a: "A traditional agency promises and pitches. We prototype and show. The site you are reading is a gallery of Possibility Studies, each a working concept inspired by a real operational bottleneck. We use AI to compress the build cycle so we can give you something working in weeks, not quarters.",
  },
  {
    q: "What does it cost?",
    a: "Single small tools start at ₹25,000 (around $300). Custom tools land between ₹1L and ₹3L ($1,200 to $3,500). Multi-tool systems run ₹3L to ₹10L ($3,500 to $12,000). Full operational redesigns are ₹10L and up. Most projects ship in two to six weeks. Pricing depends on scope, integrations, and timeline.",
  },
  {
    q: "How long does a project take?",
    a: "Two to six weeks for most projects. A single quiz or lead form can ship in days. A multi-system operational redesign takes six weeks plus a polish window. We can scope this on the first call.",
  },
  {
    q: "What is a Possibility Study?",
    a: "A working prototype we built end to end, inspired by the real operational bottleneck of a real business archetype. Twenty studies on the site, one per archetype. Each can be commissioned, customized, and shipped to your business.",
  },
  {
    q: "Who is the studio for?",
    a: "Indian SMBs, UAE founders, and global small businesses willing to pay in USD. Founders running operations on WhatsApp. Practices losing leads to slow follow-up. Brands whose website does not match the work. Currency is not the constraint. Fit is.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FAQ() {
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
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="container-x" style={{ maxWidth: 880, marginInline: "auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          FAQ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 5vw, 60px)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.06,
            margin: 0,
            marginBottom: 56,
          }}
        >
          Common questions.
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
          {ITEMS.map((item, i) => (
            <Row key={item.q} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Row({ item, index }: { item: Item; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <li
      style={{
        borderBottom: "1px solid var(--border)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor="pointer"
        aria-expanded={open}
        style={{
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          paddingBlock: 24,
          paddingInline: 0,
          display: "flex",
          alignItems: "baseline",
          gap: 24,
          color: "var(--text)",
          cursor: "pointer",
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
          {String(index + 1).padStart(2, "0")}
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
      </button>
      {open ? (
        <p
          style={{
            marginInline: 0,
            marginTop: -4,
            marginBottom: 24,
            paddingLeft: 36,
            paddingRight: 48,
            color: "var(--text-2)",
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 720,
          }}
        >
          {item.a}
        </p>
      ) : null}
    </li>
  );
}
