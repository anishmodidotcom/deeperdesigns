"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "12vh 24px 8vh 24px",
        textAlign: "center",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 12,
          letterSpacing: "0.15em",
          color: "var(--page-accent)",
          margin: 0,
          marginBottom: 32,
        }}
        className="sl-hero-eyebrow"
      >
        SUGAR LANE · BESPOKE CAKES
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: EASE }}
        style={{
          fontFamily: "var(--font-display-sc), 'Playfair Display SC', Georgia, serif",
          fontWeight: 700,
          fontSize: "clamp(48px, 7vw, 96px)",
          lineHeight: 1.05,
          color: "var(--page-text)",
          margin: 0,
          marginBottom: 24,
          maxWidth: 900,
          letterSpacing: "-0.005em",
        }}
      >
        Brief the cake in three minutes.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        style={{
          fontFamily: "var(--font-body), 'DM Sans', system-ui, sans-serif",
          fontSize: "clamp(16px, 1.4vw, 20px)",
          color: "var(--page-text-3)",
          maxWidth: 640,
          marginInline: "auto",
          margin: 0,
          marginBottom: 56,
          lineHeight: 1.55,
        }}
      >
        One short form. One reference photo. A confirmed date and a deposit.
        Replaces the thirty-message WhatsApp dance.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          aspectRatio: "16 / 9",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(42, 31, 26, 0.15)",
          display: "block",
        }}
      >
        <Image
          src="/images/sugar-lane/hero-cake.webp"
          alt="A pastel-pink layered cake on a marble surface, photographed last Tuesday"
          fill
          priority
          sizes="(min-width: 1200px) 1100px, 90vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
        style={{
          fontFamily:
            "var(--font-display-script), 'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--page-text-3)",
          marginTop: 16,
          marginBottom: 0,
        }}
      >
        Pistachio rose, eight inches, photographed last Tuesday.
      </motion.p>

      <style jsx>{`
        @media (max-width: 600px) {
          :global(.sl-hero-eyebrow) {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}
