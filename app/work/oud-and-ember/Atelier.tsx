"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.19, 1, 0.22, 1] as const;

export default function Atelier() {
  return (
    <section
      style={{
        position: "relative",
        height: "70vh",
        minHeight: 480,
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/oud-and-ember/atelier.webp"
        alt="Atmospheric perfumer's atelier shelves of amber bottles in warm light"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(7,6,10,0.55) 0%, rgba(7,6,10,0.4) 50%, rgba(7,6,10,0.95) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingInline: 24,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE }}
          style={{ maxWidth: 760 }}
        >
          <p
            style={{
              fontFamily:
                "var(--font-cormorant-display), Cormorant, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(30px, 4.6vw, 52px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--page-text)",
              margin: 0,
            }}
          >
            Some things were always meant to be touched, smelled, breathed.
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--page-accent)",
              margin: 0,
              marginTop: 28,
            }}
          >
            We didn&rsquo;t replace the atelier. We built its threshold.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
