"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Omar() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-bg)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <div className="bp-omar-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
                marginBottom: 32,
              }}
            >
              SECTION 01 · THE TUTOR
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
                marginBottom: 40,
              }}
            >
              Eight years
              <br />
              in a classroom.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--page-accent)",
                }}
              >
                Six at a kitchen table.
              </em>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                fontFamily:
                  "var(--font-body-soft), 'Source Sans 3', system-ui, sans-serif",
                fontSize: 18,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                maxWidth: 560,
              }}
            >
              <p style={{ margin: 0 }}>
                Omar Al Mansouri taught maths and physics at an Al Ain
                international school for eight years before going
                independent. He charges three times what the school paid
                him, and he earns it one parent at a time.
              </p>
              <p style={{ margin: 0 }}>
                Parents pay for results they cannot see in real time.
                Most tutors vanish into the lesson. Omar wrote his
                lesson summaries by hand for years. We turned the habit
                into a system.
              </p>
              <p style={{ margin: 0 }}>
                The portal logs every lesson with a topic, a mood note,
                a homework check, and a score. Parents see the picture
                without ever having to ask how it is going.
              </p>
            </div>

            <figure
              style={{
                margin: 0,
                marginTop: 48,
                padding: "24px 32px",
                borderLeft: "2px solid var(--page-accent)",
                maxWidth: 560,
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily:
                    "var(--font-display-academic), 'Source Serif 4', serif",
                  fontStyle: "italic",
                  fontSize: 24,
                  color: "var(--page-text)",
                  lineHeight: 1.4,
                }}
              >
                &ldquo;I do not tutor children. I report to parents.&rdquo;
              </blockquote>
              <figcaption
                style={{
                  marginTop: 14,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--page-text-3)",
                }}
              >
                OMAR AL MANSOURI · FOUNDER
              </figcaption>
            </figure>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SOFT }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Image
              src="/images/brightpath/omar-portrait.webp"
              alt="Omar, a 38-year-old former teacher turned tutor in Al Ain, smiling at his desk with neatly stacked notes"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 24,
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(10,20,40,0.85) 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                {[
                  { v: "210h", l: "Hours / year" },
                  { v: "32", l: "Active students" },
                  { v: "100%", l: "Renewal rate" },
                ].map((stat) => (
                  <div key={stat.l}>
                    <div
                      style={{
                        fontFamily:
                          "var(--font-display-academic), 'Source Serif 4', serif",
                        fontSize: 22,
                        color: "#FFFFFF",
                        letterSpacing: "-0.01em",
                        marginBottom: 2,
                      }}
                    >
                      {stat.v}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 9,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--page-text-2)",
                      }}
                    >
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .bp-omar-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
        }
        @media (min-width: 1024px) {
          .bp-omar-grid {
            grid-template-columns: 60fr 40fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
