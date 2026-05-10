"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ICON_PROPS = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--page-accent)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const InboxIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <path d="M3 13h4l2 3h6l2 -3h4" />
    <path d="M5 13l2 -8h10l2 8" />
    <path d="M3 13v6h18v-6" />
  </svg>
);

const BrainIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <path d="M9 4a3 3 0 0 0 -3 3v0a3 3 0 0 0 -2 5a3 3 0 0 0 2 5a3 3 0 0 0 3 3v-16z" />
    <path d="M15 4a3 3 0 0 1 3 3v0a3 3 0 0 1 2 5a3 3 0 0 1 -2 5a3 3 0 0 1 -3 3v-16z" />
    <path d="M9 12h6" />
  </svg>
);

const CheckIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <polyline points="8 12 11 15 16 9" />
  </svg>
);

type Step = { title: string; description: string; icon: ReactNode };

const STEPS: Step[] = [
  {
    title: "Data In",
    description:
      "POS systems, delivery platforms, and supplier invoices feed into one place. No manual entry.",
    icon: InboxIcon,
  },
  {
    title: "AI Analyzes",
    description:
      "Demand patterns, waste trends, margin calculations, and pricing opportunities. Updated every hour.",
    icon: BrainIcon,
  },
  {
    title: "Decisions Out",
    description:
      "How much chicken to order. Which items to promote. When to run offers. Faisal decides with data, not guesses.",
    icon: CheckIcon,
  },
];

export default function HowItWorks() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: "var(--page-surface)",
                borderRadius: 8,
                padding: 32,
                borderTop: "3px solid var(--page-accent)",
              }}
            >
              {s.icon}
              <h3
                style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  color: "var(--page-text)",
                  margin: 0,
                  marginTop: 24,
                  marginBottom: 12,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--page-text-2)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
