"use client";

import { motion } from "motion/react";

type Card = { quote: string; description: string };

const CARDS: Card[] = [
  {
    quote: "Which product is right for my skin type?",
    description:
      "This question lands in her inbox every single day. One person answers by hand. They cannot keep up.",
  },
  {
    quote: "I have dry skin and acne. What should I use?",
    description:
      "Every customer needs a different mix from forty SKUs. The PDF guide did not work. Nobody read it.",
  },
  {
    quote: "I messaged 2 days ago...",
    description:
      "A slow reply is a lost sale. By the time she answers, the customer has already bought somewhere else.",
  },
];

export default function Problem() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <div className="vg-problem-grid">
          <div className="vg-problem-sticky">
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              THE PROBLEM
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "var(--page-text)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              40 DMs a day. All asking the same thing.
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {CARDS.map((card, i) => (
              <motion.div
                key={card.quote}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  background: "var(--page-surface)",
                  border: "1px solid rgba(212,165,116,0.15)",
                  borderRadius: 8,
                  padding: 32,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontStyle: "italic",
                    fontSize: 20,
                    color: "var(--page-text)",
                    margin: 0,
                    marginBottom: 16,
                    lineHeight: 1.4,
                  }}
                >
                  &ldquo;{card.quote}&rdquo;
                </p>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--page-text-2)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .vg-problem-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        .vg-problem-sticky {
          position: relative;
        }
        @media (min-width: 900px) {
          .vg-problem-grid {
            grid-template-columns: 1fr 1fr;
            gap: 96px;
            align-items: start;
          }
          .vg-problem-sticky {
            position: sticky;
            top: 20vh;
          }
        }
      `}</style>
    </section>
  );
}
