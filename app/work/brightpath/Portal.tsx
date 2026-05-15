"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const LESSONS = [
  {
    date: "MAY 06 · MON",
    topic: "Calculus · Integration by parts",
    homework: "Done",
    mood: "Strong",
    score: 91,
    delta: "+2",
  },
  {
    date: "MAY 02 · THU",
    topic: "Trigonometry · Recap before mock",
    homework: "Done",
    mood: "Focused",
    score: 89,
    delta: "+1",
  },
  {
    date: "APR 29 · MON",
    topic: "Algebra · Polynomial division",
    homework: "Partial",
    mood: "Distracted",
    score: 88,
    delta: "0",
  },
];

export default function Portal() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface-1)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
        }}
      >
        <Image
          src="/images/brightpath/dashboard-bg-edu.webp"
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
              "linear-gradient(180deg, var(--page-surface-1) 0%, rgba(20,33,61,0.85) 100%)",
          }}
        />
      </div>

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1320,
          marginInline: "auto",
        }}
      >
        <div className="bp-portal-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
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
              SECTION 04 · THE PARENT PORTAL
            </p>
            <h2
              style={{
                fontFamily:
                  "var(--font-display-academic), 'Source Serif 4', 'Times New Roman', serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 32,
              }}
            >
              The answer
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--page-accent)",
                }}
              >
                before the question.
              </em>
            </h2>
            <p
              style={{
                fontFamily:
                  "var(--font-body-soft), 'Source Sans 3', system-ui, sans-serif",
                fontSize: 18,
                color: "var(--page-text-2)",
                margin: 0,
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: 36,
              }}
            >
              Every lesson logs a topic, a mood read, a homework status,
              and a score. Parents open the portal once a week and see
              the whole picture, without sending a single polite
              WhatsApp.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {[
                "Weekly auto-summary in the parent’s preferred language",
                "Score trend chart per subject, anonymised against the cohort",
                "Lesson-by-lesson mood and homework history",
                "Quiet flags when scores stall, sent only to Omar first",
              ].map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    fontFamily:
                      "var(--font-body-soft), 'Source Sans 3', sans-serif",
                    fontSize: 16,
                    color: "var(--page-text)",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      color: "var(--page-accent)",
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 12,
                      paddingTop: 4,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, delay: 0.15, ease: SOFT }}
            style={{
              background: "var(--page-bg)",
              border: "1px solid var(--page-border)",
              borderRadius: 4,
              padding: 28,
              boxShadow: "0 50px 100px -40px rgba(10,20,40,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 28,
                paddingBottom: 20,
                borderBottom: "1px solid var(--page-border)",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "var(--page-text-3)",
                    marginBottom: 4,
                  }}
                >
                  STUDENT
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily:
                      "var(--font-display-academic), 'Source Serif 4', serif",
                    fontWeight: 500,
                    fontSize: 22,
                    color: "var(--page-text)",
                  }}
                >
                  Hamad Al Marri · Year 11
                </p>
              </div>
              <div
                style={{
                  padding: "6px 12px",
                  background: "rgba(212,168,87,0.18)",
                  borderRadius: 4,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--page-accent)",
                  fontWeight: 600,
                }}
              >
                ON TRACK
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  padding: 16,
                  background: "var(--page-surface-1)",
                  borderRadius: 4,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--page-text-3)",
                    marginBottom: 8,
                  }}
                >
                  CURRENT
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily:
                      "var(--font-display-academic), 'Source Serif 4', serif",
                    fontSize: 36,
                    color: "var(--page-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  91%
                </p>
              </div>
              <div
                style={{
                  padding: 16,
                  background: "var(--page-surface-1)",
                  borderRadius: 4,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--page-text-3)",
                    marginBottom: 8,
                  }}
                >
                  TARGET
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily:
                      "var(--font-display-academic), 'Source Serif 4', serif",
                    fontSize: 36,
                    color: "var(--page-accent)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  A*
                </p>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                marginBottom: 16,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--page-text-3)",
              }}
            >
              RECENT LESSONS · LAST 3
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {LESSONS.map((lesson) => (
                <div
                  key={lesson.date}
                  style={{
                    padding: 14,
                    background: "var(--page-surface-1)",
                    borderRadius: 4,
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        marginBottom: 4,
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        color: "var(--page-accent)",
                      }}
                    >
                      {lesson.date}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        marginBottom: 6,
                        fontFamily:
                          "var(--font-body-soft), 'Source Sans 3', sans-serif",
                        fontWeight: 500,
                        fontSize: 14,
                        color: "var(--page-text)",
                      }}
                    >
                      {lesson.topic}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--page-text-3)",
                      }}
                    >
                      <span>HW · {lesson.homework}</span>
                      <span>MOOD · {lesson.mood}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontFamily:
                          "var(--font-display-academic), 'Source Serif 4', serif",
                        fontSize: 22,
                        color: "var(--page-text)",
                      }}
                    >
                      {lesson.score}%
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        color:
                          lesson.delta === "0"
                            ? "var(--page-text-3)"
                            : "var(--page-accent)",
                        marginTop: 2,
                      }}
                    >
                      {lesson.delta === "0" ? "·" : `▲ ${lesson.delta}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .bp-portal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .bp-portal-grid {
            grid-template-columns: 45fr 55fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
