"use client";

import { motion } from "motion/react";

type Pair = { label: string; value: string };

const LEFT: Pair[] = [
  { label: "CLIENT", value: "StumpVision Cricket Academy" },
  { label: "INDUSTRY", value: "Sports Education" },
  { label: "LOCATION", value: "Gurgaon, India" },
  { label: "YEAR", value: "2025" },
];

const RIGHT: Pair[] = [
  {
    label: "SERVICES",
    value:
      "Gamified Platform, Player Analytics, Coach Reporting System, Tournament Management",
  },
  { label: "TIMELINE", value: "10 days from brief to deployment" },
  {
    label: "STACK",
    value:
      "Next.js, Real-time Database, WhatsApp Integration, Custom Analytics Engine",
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
          fontFamily:
            "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
          fontSize: 17,
          fontWeight: 500,
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
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
