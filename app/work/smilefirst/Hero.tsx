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
          src="/images/smilefirst/hero-clinic.webp"
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
              "linear-gradient(110deg, rgba(7,15,18,0.96) 0%, rgba(7,15,18,0.55) 65%, rgba(7,15,18,0.15) 100%)",
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
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 40,
          }}
        >
          SMILEFIRST · CASE STUDY 006 · NOIDA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "clamp(56px, 10vw, 132px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            margin: 0,
            maxWidth: 1100,
          }}
        >
          <span
            style={{
              display: "block",
              fontWeight: 700,
              color: "var(--page-text)",
            }}
          >
            SmileFirst
          </span>
          <span
            style={{
              display: "block",
              fontWeight: 300,
              color: "var(--page-accent)",
            }}
          >
            Clinic Manager
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 17,
            color: "var(--page-text-2)",
            maxWidth: 540,
            margin: 0,
            lineHeight: 1.75,
          }}
        >
          Patient CRM, automated recalls, appointment management, dental
          records, and intelligent follow-up. A full clinic operating
          system for a three-chair practice seeing 40-50 patients a day.
        </motion.p>
      </div>
    </section>
  );
}
