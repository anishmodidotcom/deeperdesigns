"use client";

import { motion } from "motion/react";

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "You talk, we listen",
    description:
      "Tell us what your business does, where it hurts, what you wish existed. No jargon. No forms. Just a conversation.",
  },
  {
    number: "02",
    title: "We design the solution",
    description:
      "Within a week you get a visual concept of your tool, site, or platform. Not a proposal deck. A working preview.",
  },
  {
    number: "03",
    title: "We build it carefully",
    description:
      "Your product gets built with AI-powered speed and human-grade quality. Most projects ship in two to six weeks.",
  },
  {
    number: "04",
    title: "Launch and grow",
    description:
      "Deployed, live, and working for your business. We stick around to make sure it delivers results.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-3)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          THE PROCESS
        </p>

        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 80,
            maxWidth: 800,
          }}
        >
          From idea to deployed. Weeks, not quarters.
        </h2>

        <div className="how-grid">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="how-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="how-row">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: 9999,
                    border: "1px solid var(--border-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 18,
                    color: "var(--text-2)",
                  }}
                >
                  {step.number}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="how-connector"
                    style={{
                      flex: 1,
                      height: 1,
                      background: "var(--border-2)",
                      marginInline: 16,
                    }}
                  />
                )}
              </div>

              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "var(--text)",
                  marginTop: 20,
                  marginBottom: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-2)",
                  marginTop: 8,
                  marginBottom: 0,
                  lineHeight: 1.5,
                  maxWidth: 280,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how-grid {
          display: grid;
          gap: 48px;
          grid-template-columns: 1fr;
        }
        .how-step {
          display: flex;
          flex-direction: column;
        }
        .how-row {
          display: flex;
          align-items: center;
        }
        @media (min-width: 768px) {
          .how-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
          .how-step:last-child .how-connector {
            display: none;
          }
        }
        @media (max-width: 767px) {
          .how-connector {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
