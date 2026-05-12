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
          src="/images/stumpvision/hero-batsman.webp"
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
              "linear-gradient(110deg, rgba(6,14,6,0.96) 0%, rgba(6,14,6,0.55) 60%, rgba(6,14,6,0.2) 100%)",
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
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 40,
          }}
        >
          STUMPVISION · CASE STUDY 008 · GURGAON
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 1.02, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-rajdhani), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(56px, 11vw, 160px)",
            letterSpacing: "-0.02em",
            lineHeight: 0.92,
            margin: 0,
            textTransform: "uppercase",
            maxWidth: 1100,
          }}
        >
          <span style={{ display: "block", color: "var(--page-text)" }}>
            Read the
          </span>
          <span style={{ display: "block", color: "var(--page-accent)" }}>
            Game.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-rajdhani), system-ui, sans-serif",
            fontSize: 18,
            color: "var(--page-text-2)",
            maxWidth: 520,
            margin: 0,
            marginTop: 40,
            lineHeight: 1.65,
          }}
        >
          A gamified academy platform built like a fantasy-cricket app.
          Trading-card player profiles, match stats, parent reports, and
          coach attendance for a 250-player academy in Gurgaon.
        </motion.p>
      </div>
    </section>
  );
}
