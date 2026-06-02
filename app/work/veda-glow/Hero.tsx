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
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, opacity: 0.35 }}
      >
        <Image
          src="/images/veda-glow/ayurvedic-kitchen.webp"
          alt="Veda Glow · Ayurvedic preparation kitchen with copper pots and bottled tinctures"
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
              "radial-gradient(ellipse at 30% 50%, rgba(15,10,6,0.45) 0%, rgba(15,10,6,0.92) 70%)",
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
        <div className="vg-hero-grid">
          <div>
            <motion.p
              initial={{ opacity: 0.35, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
              VEDA GLOW · AYURVEDIC SKINCARE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0.35, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 400,
                fontSize: "clamp(48px, 8vw, 104px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                margin: 0,
              }}
            >
              <span style={{ display: "block", color: "var(--page-accent)" }}>
                Veda Glow
              </span>
              <span
                style={{
                  display: "block",
                  color: "var(--page-text)",
                  fontStyle: "italic",
                }}
              >
                Skin Advisor
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0.35, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: 1,
                width: 80,
                background: "var(--page-accent)",
                marginBlock: 32,
                transformOrigin: "left center",
              }}
            />

            <motion.p
              initial={{ opacity: 0.35, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 18,
                color: "var(--page-text-2)",
                maxWidth: 520,
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              The founder was answering forty skin questions a day by hand.
              Now a two-minute advisor does it, and every customer gets a
              routine built for them.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0.35, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="vg-hero-bottle"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 480,
              aspectRatio: "4 / 5",
              marginInline: "auto",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 50px 120px -30px rgba(212, 165, 116, 0.25)",
            }}
          >
            <Image
              src="/images/veda-glow/hero-bottle.webp"
              alt="A tall amber glass dropper bottle of Veda Glow Ayurvedic facial oil with marigold and tulsi beside it"
              fill
              sizes="(min-width: 1024px) 480px, 80vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .vg-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .vg-hero-grid {
            grid-template-columns: 55fr 45fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
