"use client";

import { motion } from "motion/react";

type Feature = { number: string; title: string; description: string };

const FEATURES: Feature[] = [
  {
    number: "01",
    title: "Personalized Routines",
    description:
      "Morning and evening routines built around skin type, concern, age, and lifestyle. Every step mapped to a real Veda Glow product.",
  },
  {
    number: "02",
    title: "Diet and Lifestyle Guidance",
    description:
      "Sleep, food, and seasonal advice in every consultation. The Ayurvedic part Priya would always add herself.",
  },
  {
    number: "03",
    title: "Direct to Purchase",
    description:
      "Every recommended product links straight to the store. The consultation is the sales funnel.",
  },
];

export default function Features() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 48,
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 48,
                  color: "rgba(212,165,116,0.3)",
                  margin: 0,
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {f.number}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 400,
                  fontSize: 22,
                  color: "var(--page-text)",
                  margin: 0,
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
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
