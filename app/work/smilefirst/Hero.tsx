"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "motion/react";

const TOOTH_PATH =
  "M 24 6 C 16 6 11 10 11 18 C 11 24 13 28 14 32 C 15 36 16 41 18 43 C 20 45 22 43 22.5 39 C 23 36 23.5 33 24 33 C 24.5 33 25 36 25.5 39 C 26 43 28 45 30 43 C 32 41 33 36 34 32 C 35 28 37 24 37 18 C 37 10 32 6 24 6 Z";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const toothRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = toothRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: reduced ? 0 : length,
      });
      if (!reduced) {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          delay: 0.1,
          ease: "power2.inOut",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingInline: 24,
        paddingBlock: 96,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 24 }}
        aria-hidden
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            ref={toothRef}
            d={TOOTH_PATH}
            stroke="var(--page-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily:
            "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "clamp(56px, 9vw, 100px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
          margin: 0,
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

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily:
            "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
          fontSize: 16,
          color: "var(--page-text-2)",
          maxWidth: 500,
          margin: 0,
          marginTop: 32,
          lineHeight: 1.7,
        }}
      >
        Patient CRM, automated recalls, appointment management, dental
        records, and intelligent follow-up. A full clinic operating system
        for a 3-chair practice.
      </motion.p>
    </section>
  );
}
