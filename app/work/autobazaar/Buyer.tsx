"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--page-accent)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SearchIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <circle cx="11" cy="11" r="6" />
    <line x1="20" y1="20" x2="15.5" y2="15.5" />
  </svg>
);

const CalendarIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
  </svg>
);

const NetworkIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0 -18" />
  </svg>
);

type Feature = { title: string; description: string; icon: ReactNode };

const FEATURES: Feature[] = [
  {
    title: "Browse Online",
    description:
      "Every car listed with specs, price, photos, and history. Filters for budget, make, year, mileage.",
    icon: SearchIcon,
  },
  {
    title: "Book a Test Drive",
    description:
      "Pick a car, pick a time. Confirmation via WhatsApp. No phone tag.",
    icon: CalendarIcon,
  },
  {
    title: "Area-Wide Listings",
    description:
      "Not just Tariq's inventory. Cars from neighboring dealers listed with a commission. Buyers get more options. Tariq earns on every sale.",
    icon: NetworkIcon,
  },
];

export default function Buyer() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          FOR THE BUYERS
        </p>

        <h2
          style={{
            fontFamily:
              "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(24px, 3.5vw, 40px)",
            letterSpacing: "-0.03em",
            color: "var(--page-text)",
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 64,
            maxWidth: 700,
          }}
        >
          Not just a yard. A digital showroom.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
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
                padding: 28,
                borderTop: "2px solid var(--page-accent)",
              }}
            >
              {f.icon}
              <h3
                style={{
                  fontFamily:
                    "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  letterSpacing: "-0.02em",
                  color: "var(--page-text)",
                  margin: 0,
                  marginTop: 18,
                  marginBottom: 8,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily:
                    "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
