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
          src="/images/meera-wellness/hero-pose.webp"
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
              "linear-gradient(110deg, rgba(248,246,242,0.92) 0%, rgba(248,246,242,0.55) 55%, rgba(248,246,242,0.1) 100%)",
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
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
          MEERA WELLNESS · POSSIBILITY STUDY · 003 · DUBAI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(64px, 11vw, 156px)",
            letterSpacing: "-0.02em",
            lineHeight: 0.98,
            margin: 0,
            maxWidth: 1100,
          }}
        >
          <span style={{ display: "block", color: "var(--page-text)" }}>
            Meera
          </span>
          <span
            style={{
              display: "block",
              color: "var(--page-accent)",
              fontStyle: "italic",
            }}
          >
            Wellness
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            width: 80,
            background: "var(--page-accent)",
            marginBlock: 32,
            transformOrigin: "left center",
          }}
          aria-hidden
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 18,
            color: "var(--page-text-2)",
            maxWidth: 520,
            margin: 0,
            lineHeight: 1.75,
          }}
        >
          A complete wellness platform built for a Dubai yoga instructor.
          Scheduling, client portal, WhatsApp integration, and
          personalized programs. All in one place.
        </motion.p>
      </div>
    </section>
  );
}
