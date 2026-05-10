"use client";

import { motion } from "motion/react";

type Cap = { number: string; title: string; description: string };

const CAPS: Cap[] = [
  {
    number: "01",
    title: "Live Inventory",
    description:
      "Every product, grade, and quantity updated in real time. No more outdated Excel sheets.",
  },
  {
    number: "02",
    title: "Instant Quotes",
    description:
      "Product, quantity, destination. The dashboard calculates base price, shipping, and total in seconds.",
  },
  {
    number: "03",
    title: "WhatsApp Intake",
    description:
      "Warehouse staff send a photo of the delivery slip or a text message. AI processes it. Inventory updates.",
  },
  {
    number: "04",
    title: "Price Intelligence",
    description:
      "Market rates, competitor pricing, and margin recommendations. All factored into every quote automatically.",
  },
];

export default function Capabilities() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <div className="bs-cap-grid">
          {CAPS.map((cap, i) => (
            <motion.div
              key={cap.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                borderTop: "2px solid var(--page-accent)",
                paddingTop: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 14,
                  color: "var(--page-accent)",
                  opacity: 0.5,
                  margin: 0,
                  marginBottom: 16,
                  letterSpacing: "0.08em",
                }}
              >
                {cap.number}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "var(--page-text)",
                  margin: 0,
                  marginBottom: 12,
                  letterSpacing: "-0.01em",
                }}
              >
                {cap.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bs-cap-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 640px) {
          .bs-cap-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
        @media (min-width: 1024px) {
          .bs-cap-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
