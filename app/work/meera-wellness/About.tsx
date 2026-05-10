"use client";

import { motion } from "motion/react";

type Pair = { label: string; value: string };

const LEFT: Pair[] = [
  { label: "CLIENT", value: "Meera Wellness" },
  { label: "INDUSTRY", value: "Yoga & Wellness (B2C)" },
  { label: "LOCATION", value: "Dubai, UAE" },
  { label: "YEAR", value: "2025" },
];

const RIGHT: Pair[] = [
  {
    label: "SERVICES",
    value:
      "Platform Development, WhatsApp AI, Client Portal, Booking System",
  },
  { label: "TIMELINE", value: "10 days from brief to deployment" },
  {
    label: "STACK",
    value:
      "Next.js, WhatsApp Business API, Claude AI, Custom Calendar Engine",
  },
];

function Row({ pair }: { pair: Pair }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--page-text-2)",
          margin: 0,
        }}
      >
        {pair.label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 400,
          fontSize: 18,
          color: "var(--page-text)",
          margin: 0,
          marginTop: 4,
          lineHeight: 1.4,
          letterSpacing: "-0.005em",
        }}
      >
        {pair.value}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 48,
          }}
        >
          <div>
            {LEFT.map((p) => (
              <Row key={p.label} pair={p} />
            ))}
          </div>
          <div>
            {RIGHT.map((p) => (
              <Row key={p.label} pair={p} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
