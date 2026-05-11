"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.25, 1, 0.5, 1] as const;

const DETAILS = [
  "9.9312° N, 76.2673° E",
  "Port of Kochi · Customs Code IN COK1",
  "Spice export license · 1962 to present",
];

export default function Kerala() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/malabar-spice/kerala-backwaters.webp"
        alt="Kerala backwaters at golden hour with a traditional wooden cargo boat"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(14,8,5,0.55) 0%, rgba(14,8,5,0.35) 45%, rgba(14,8,5,0.85) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBlock: 96,
          paddingInline: 24,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ maxWidth: 880 }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--page-accent)",
              margin: 0,
              marginBottom: 28,
            }}
          >
            WHERE EVERYTHING BEGINS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(34px, 5.4vw, 60px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "var(--page-text)",
              margin: 0,
              fontVariationSettings: "'opsz' 144",
            }}
          >
            Kochi. The port that taught the world to season its food.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 32,
              maxWidth: 640,
              marginInline: "auto",
              lineHeight: 1.8,
            }}
          >
            Vasco da Gama landed here in 1498 looking for our pepper. We are
            still here. Still grinding. Still shipping. Still answering the
            phone when buyers call.
          </p>

          <div
            style={{
              marginTop: 56,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            {DETAILS.map((d) => (
              <p
                key={d}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--page-text-3)",
                  margin: 0,
                }}
              >
                {d}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
