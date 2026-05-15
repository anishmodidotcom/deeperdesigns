"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const QUESTIONS: { q: string; options: string[]; selected: number }[] = [
  {
    q: "How do you take it?",
    options: ["Strong", "Mild", "Spiced", "Floral"],
    selected: 0,
  },
  {
    q: "Milk or no?",
    options: ["Full milk", "Splash", "No milk"],
    selected: 0,
  },
  {
    q: "When do you drink?",
    options: ["Morning", "Office break", "Evening", "Late"],
    selected: 1,
  },
];

export default function Quiz() {
  return (
    <section
      style={{
        position: "relative",
        paddingBlock: 144,
        background: "var(--page-surface-1)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
        }}
      >
        <Image
          src="/images/kadak-chai/quiz-bg.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, var(--page-surface-1) 0%, rgba(20,12,8,0.7) 100%)",
          }}
        />
      </div>

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1100,
          marginInline: "auto",
        }}
      >
        <div className="kc-quiz-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              SECTION 04 · THE QUIZ
            </p>
            <h2
              style={{
                fontFamily:
                  "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(44px, 7vw, 84px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 32,
                textTransform: "uppercase",
              }}
            >
              Three taps.
              <br />
              <span style={{ color: "var(--page-accent)" }}>Your blend.</span>
            </h2>
            <p
              style={{
                fontFamily:
                  "var(--font-body), 'Crimson Pro', Georgia, serif",
                fontSize: 19,
                color: "var(--page-text-2)",
                margin: 0,
                lineHeight: 1.7,
                maxWidth: 460,
              }}
            >
              First-time tea drinkers do not know cardamom from cinnamon.
              The quiz speaks the language of taste, not of spice
              cabinets. Three taps, a blend, an optional subscription.
              That is the funnel.
            </p>

            <div
              style={{
                marginTop: 40,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--page-text-3)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: "var(--page-accent)",
                }}
              />
              {`> 72% complete in under 40 seconds`}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, delay: 0.15, ease: SOFT }}
            style={{
              position: "relative",
              background: "var(--page-surface-2)",
              border: "1px solid var(--page-border)",
              borderRadius: 4,
              padding: 32,
              boxShadow: "0 40px 80px -40px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 4,
                marginBottom: 32,
              }}
            >
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 3,
                    background:
                      i <= 1 ? "var(--page-accent)" : "var(--page-border)",
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>

            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--page-text-3)",
                margin: 0,
                marginBottom: 12,
              }}
            >
              QUESTION 02 OF 03
            </p>
            <h3
              style={{
                fontFamily:
                  "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
                fontWeight: 400,
                fontSize: 32,
                letterSpacing: "-0.02em",
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
                textTransform: "uppercase",
              }}
            >
              {QUESTIONS[1].q}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 32,
              }}
            >
              {QUESTIONS[1].options.map((opt, i) => {
                const selected = i === QUESTIONS[1].selected;
                return (
                  <div
                    key={opt}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: 18,
                      border: selected
                        ? "1.5px solid var(--page-accent)"
                        : "1px solid var(--page-border)",
                      background: selected
                        ? "rgba(201,128,58,0.08)"
                        : "var(--page-surface-1)",
                      borderRadius: 4,
                    }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: selected
                          ? "5px solid var(--page-accent)"
                          : "1.5px solid var(--page-border)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-geist-sans), sans-serif",
                        fontSize: 15,
                        fontWeight: 500,
                        color: selected
                          ? "var(--page-accent)"
                          : "var(--page-text)",
                      }}
                    >
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                data-cursor="pointer"
                style={{
                  paddingInline: 22,
                  paddingBlock: 14,
                  background: "transparent",
                  border: "1px solid var(--page-border)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--page-text-2)",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
              <button
                type="button"
                data-cursor="pointer"
                style={{
                  paddingInline: 28,
                  paddingBlock: 14,
                  background: "var(--page-accent)",
                  border: "none",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--page-bg)",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Next question →
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .kc-quiz-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .kc-quiz-grid {
            grid-template-columns: 45fr 55fr;
            gap: 80px;
          }
        }
      `}</style>
    </section>
  );
}
