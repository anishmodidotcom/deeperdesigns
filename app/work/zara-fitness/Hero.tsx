"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.7, 0, 0.2, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
      }}
      className="zf-hero"
    >
      <div className="zf-hero-image">
        <Image
          src="/images/zara-fitness/hero-zara.webp"
          alt="Zara, fitness trainer, magazine cover portrait in matte black studio lighting"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div className="zf-hero-cover">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--page-text-2)",
            }}
          >
            ISSUE 015
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            style={{
              background: "var(--page-accent)",
              color: "#0E0E0E",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              paddingInline: 10,
              paddingBlock: 5,
              fontWeight: 700,
            }}
          >
            DD x ZARA
          </motion.span>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 48,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <MaskReveal delay={0.2}>
            <h1
              style={{
                fontFamily: "var(--font-anton), Impact, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(120px, 22vw, 240px)",
                letterSpacing: "-0.01em",
                lineHeight: 0.86,
                color: "var(--page-text)",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              ZARA
            </h1>
          </MaskReveal>
          <MaskReveal delay={0.4}>
            <p
              style={{
                fontFamily: "var(--font-anton), Impact, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 5.4vw, 56px)",
                letterSpacing: "0",
                lineHeight: 1.0,
                color: "var(--page-text)",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              From followers to members
            </p>
          </MaskReveal>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 36,
            maxWidth: 360,
            lineHeight: 1.6,
            letterSpacing: "0.02em",
          }}
        >
          280,000 watched her workouts. Then they got their own. The
          platform that turned an audience into a community.
        </motion.p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginTop: 48,
            flexWrap: "wrap",
          }}
        >
          {["TRAINER", "FOUNDER", "DUBAI"].map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.8 + i * 0.08,
                  ease: EASE,
                }}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--page-text)",
                  paddingRight: 16,
                  paddingLeft: i === 0 ? 0 : 16,
                }}
              >
                {t}
              </motion.span>
              {i < 2 && (
                <span
                  aria-hidden
                  style={{
                    width: 24,
                    height: 1,
                    background: "var(--page-accent)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2, ease: EASE }}
          style={{
            position: "absolute",
            right: 24,
            bottom: 18,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--page-accent)",
            margin: 0,
          }}
        >
          TURN PAGE →
        </motion.p>
      </div>

      <style jsx>{`
        .zf-hero {
          grid-template-columns: 1fr;
          grid-template-rows: 60vh auto;
        }
        .zf-hero-image {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .zf-hero-cover {
          position: relative;
          padding: 32px 32px 80px 32px;
          display: flex;
          flex-direction: column;
          min-height: 60vh;
        }
        @media (min-width: 1024px) {
          .zf-hero {
            grid-template-columns: 60fr 40fr;
            grid-template-rows: 1fr;
            min-height: 100vh;
          }
          .zf-hero-cover {
            padding: 48px 48px 60px 48px;
            min-height: 100vh;
          }
        }
      `}</style>
    </section>
  );
}

function MaskReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span
      style={{
        display: "block",
        overflow: "hidden",
        verticalAlign: "top",
      }}
    >
      <motion.span
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 0.5,
          delay,
          ease: EASE,
        }}
        style={{ display: "block" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
