"use client";

import Image from "next/image";
import { motion } from "motion/react";

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
      <div aria-hidden style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/studio-noor/hero-room.webp"
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
              "linear-gradient(110deg, rgba(14,12,16,0.92) 0%, rgba(14,12,16,0.4) 70%, rgba(14,12,16,0.7) 100%)",
          }}
        />
      </div>

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1320,
          marginInline: "auto",
          width: "100%",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-eyebrow, var(--page-accent))",
            margin: 0,
            marginBottom: 40,
          }}
        >
          STUDIO NOOR · BANGALORE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-instrument), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(56px, 10vw, 136px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            margin: 0,
            maxWidth: 1100,
          }}
        >
          <span style={{ display: "block", color: "var(--page-text)" }}>
            Studio Noor
          </span>
          <span
            style={{
              display: "block",
              color: "var(--page-accent)",
              fontStyle: "italic",
            }}
          >
            Client Portal
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            width: 80,
            background: "var(--page-accent)",
            opacity: 0.5,
            marginBlock: 32,
            transformOrigin: "left center",
          }}
          aria-hidden
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            maxWidth: 520,
            margin: 0,
            lineHeight: 1.75,
          }}
        >
          Six homes in progress, each one a six-month build and one
          anxious homeowner. Now every client watches their project move
          in a single portal, updated daily, and nobody chases the
          designer for status.
        </motion.p>
      </div>
    </section>
  );
}
