"use client";

import Image from "next/image";
import { motion } from "motion/react";

const HEADLINE_LINES = [
  { text: "Inventory.", color: "var(--page-text)" },
  { text: "Quotes.", color: "var(--page-text)" },
  { text: "In real time.", color: "var(--page-accent)" },
];

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
        paddingBlock: 96,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
        }}
      >
        <Image
          src="/images/bharat-steel/warehouse-wide.webp"
          alt=""
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
              "linear-gradient(110deg, rgba(10,13,18,0.95) 0%, rgba(10,13,18,0.45) 70%, rgba(10,13,18,0.85) 100%)",
          }}
        />
      </div>

      <div
        className="container-x bs-hero-grid"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 64,
          width: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              // F2: inline eyebrow now opts into the per-page --page-eyebrow token.
              color: "var(--page-eyebrow, var(--page-accent))",
              margin: 0,
              marginBottom: 32,
            }}
          >
            BHARAT STEEL CORP · AHMEDABAD
          </motion.p>

          <h1
            style={{
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(48px, 9vw, 120px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.96,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "block", color: line.color }}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 18,
              color: "var(--page-text-2)",
              maxWidth: 520,
              marginTop: 36,
              marginBottom: 0,
              lineHeight: 1.6,
            }}
          >
            A father-son steel business ran the yard on paper for thirty
            years. Now stock is live and a quote takes thirty seconds, fed
            by delivery slips sent over WhatsApp.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bs-hero-coil"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 520,
            aspectRatio: "4 / 5",
            marginInline: "auto",
            overflow: "hidden",
            borderRadius: 4,
            boxShadow: "0 50px 120px -30px rgba(59, 130, 246, 0.2)",
          }}
        >
          <Image
            src="/images/bharat-steel/hero-coil.webp"
            alt="A tightly wound steel coil viewed close-up at an angle"
            fill
            sizes="(min-width: 1024px) 520px, 80vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .bs-hero-grid {
            grid-template-columns: 60fr 40fr !important;
          }
        }
      `}</style>
    </section>
  );
}
