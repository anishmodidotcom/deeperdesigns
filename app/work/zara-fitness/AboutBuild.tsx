"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.7, 0, 0.2, 1] as const;

const INFO: [string, string][] = [
  ["Client", "Zara Bakir · Zara Fitness"],
  ["Industry", "Fitness, creator economy"],
  ["Location", "Dubai, UAE"],
  ["Timeline", "24 days"],
  ["Year", "2026"],
];

const CAPABILITIES = [
  "Workout program engine",
  "Video library",
  "AI trainer chatbot",
  "E-commerce",
  "HealthKit + Watch sync",
  "Push notifications",
  "Multi-currency checkout",
];

export default function AboutBuild() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div className="container-x">
        <div className="zf-about-grid">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              border: "1px solid var(--page-border)",
            }}
          >
            <Image
              src="/images/zara-fitness/workout-strength.webp"
              alt="Zara mid-deadlift in a dark premium gym"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--page-text-2)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                margin: 0,
                marginBottom: 28,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 10,
                  height: 10,
                  background: "var(--page-accent)",
                  display: "inline-block",
                }}
              />
              ABOUT THIS BUILD
            </p>
            <h2
              style={{
                fontFamily: "var(--font-anton), Impact, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(56px, 8vw, 96px)",
                letterSpacing: "-0.01em",
                lineHeight: 0.92,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
                textTransform: "uppercase",
              }}
            >
              Built in 24 days.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--page-text-2)",
                lineHeight: 1.75,
                margin: 0,
                maxWidth: 560,
              }}
            >
              Web app with member auth, full workout program engine with
              progression logic, exercise video library with custom Zara
              content, real-time chat with Zara via an AI agent trained on
              her tone and methodology, integrated checkout for sportswear,
              push notifications, HealthKit and Apple Watch sync, Stripe
              and Tabby for payments. Built end-to-end. No outside agency.
              The 15-lakh quote we replaced.
            </p>

            <dl
              style={{
                marginTop: 40,
                display: "grid",
                gridTemplateColumns: "max-content 1fr",
                columnGap: 28,
                rowGap: 12,
                maxWidth: 560,
              }}
            >
              {INFO.map(([k, v]) => (
                <div key={k} style={{ display: "contents" }}>
                  <dt
                    style={{
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "var(--page-text-3)",
                    }}
                  >
                    {k}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                      fontSize: 13,
                      color: "var(--page-text)",
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--page-text-3)",
                margin: 0,
                marginTop: 40,
                marginBottom: 18,
              }}
            >
              CAPABILITIES
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 13,
                    color: "var(--page-text)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 8,
                      height: 8,
                      background: "var(--page-accent)",
                      flexShrink: 0,
                    }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .zf-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .zf-about-grid {
            grid-template-columns: 40fr 60fr;
            gap: 80px;
          }
        }
      `}</style>
    </section>
  );
}
