"use client";

import { motion } from "motion/react";

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: "3 hrs/day", label: "Saved on scheduling and admin" },
  { value: "Zero", label: "Double bookings since launch" },
  { value: "40%", label: "Increase in client retention" },
];

export default function Impact() {
  return (
    <section
      style={{
        background: "var(--page-surface)",
        paddingBlock: 96,
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
          textAlign: "center",
        }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(36px, 5vw, 60px)",
                color: "var(--page-accent)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                margin: 0,
              }}
            >
              {s.value}
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--page-text-2)",
                margin: 0,
                marginTop: 16,
              }}
            >
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
