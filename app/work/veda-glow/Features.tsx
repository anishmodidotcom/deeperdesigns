"use client";

import { motion } from "motion/react";

type Feature = { number: string; title: string; description: string };

const FEATURES: Feature[] = [
  {
    number: "01",
    title: "Personalized Routines",
    description:
      "Morning and evening routines built around skin type, concerns, age, and lifestyle. Every recommendation mapped to Veda Glow's actual product catalog.",
  },
  {
    number: "02",
    title: "Diet and Lifestyle Guidance",
    description:
      "Ayurvedic wisdom meets modern science. Sleep schedules, food recommendations, and seasonal adjustments included in every consultation.",
  },
  {
    number: "03",
    title: "Direct to Purchase",
    description:
      "Every recommended product links directly to the Shopify store. The consultation becomes the sales funnel. Zero friction from advice to checkout.",
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
