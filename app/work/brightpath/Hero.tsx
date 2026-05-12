"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;
const STRONG = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Image
          src="/images/brightpath/hero-classroom.webp"
          alt="A serious one-on-one tutoring scene: a tutor explaining a maths problem to a student at a desk, evening light"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,20,40,0.55) 0%, rgba(10,20,40,0.4) 40%, rgba(10,20,40,0.94) 100%)",
          }}
        />
      </div>

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1440,
          marginInline: "auto",
          width: "100%",
          paddingBlock: 80,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 32,
              height: 1,
              background: "var(--page-accent)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              color: "var(--page-accent)",
            }}
          >
            AL AIN · POSSIBILITY STUDY · 020 OF 20 · TUTORING
          </span>
        </motion.div>

        <h1
          style={{
            fontFamily:
              "var(--font-display-academic), 'Source Serif 4', 'Times New Roman', serif",
            fontWeight: 500,
            fontSize: "clamp(56px, 9vw, 132px)",
            letterSpacing: "-0.02em",
            lineHeight: 0.98,
            color: "#FFFFFF",
            margin: 0,
            maxWidth: 1100,
          }}
        >
          <Reveal text="A tutor who shows" delay={0.1} />
          <span style={{ display: "block" }}>
            <Reveal text="his working." delay={0.25} />
          </span>
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 48,
            marginTop: 56,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: SOFT }}
            style={{
              fontFamily: "var(--font-body-soft), 'Source Sans 3', system-ui, sans-serif",
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--page-text-2)",
              margin: 0,
              maxWidth: 460,
            }}
          >
            BrightPath is Omar&rsquo;s one-man IGCSE and SAT tutoring
            practice in Al Ain. We built him a parent portal that
            answers the question parents are too polite to ask:
            <em
              style={{
                fontStyle: "italic",
                color: "var(--page-text)",
              }}
            >
              {" "}
              is this working?
            </em>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: SOFT }}
            style={{
              display: "flex",
              gap: 40,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--page-text-2)",
            }}
          >
            <div>
              <div style={{ color: "var(--page-text-3)", marginBottom: 6 }}>
                EST.
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display-academic), 'Source Serif 4', serif",
                  fontSize: 22,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  textTransform: "none",
                }}
              >
                2018
              </div>
            </div>
            <div>
              <div style={{ color: "var(--page-text-3)", marginBottom: 6 }}>
                STUDENTS
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display-academic), 'Source Serif 4', serif",
                  fontSize: 22,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  textTransform: "none",
                }}
              >
                32 / 32
              </div>
            </div>
            <div>
              <div style={{ color: "var(--page-text-3)", marginBottom: 6 }}>
                CITY
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display-academic), 'Source Serif 4', serif",
                  fontSize: 22,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  textTransform: "none",
                }}
              >
                AL AIN
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Reveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.0, delay, ease: STRONG }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </span>
  );
}
