"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.25, 1, 0.5, 1] as const;

export default function Hands() {
  return (
    <section
      style={{
        position: "relative",
        height: "80vh",
        minHeight: 520,
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/malabar-spice/hands-pepper.webp"
        alt="Weathered brown South Indian hands cupping a handful of black peppercorns"
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
            "linear-gradient(180deg, rgba(14,8,5,0.4) 0%, rgba(14,8,5,0.55) 50%, rgba(14,8,5,0.92) 100%)",
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
          transition={{ duration: 1.2, ease: EASE }}
          style={{ maxWidth: 880 }}
        >
          <p
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(34px, 5vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              color: "var(--page-text)",
              margin: 0,
              fontVariationSettings: "'opsz' 144",
            }}
          >
            Our hands have done this for sixty-three years.
          </p>
          <p
            style={{
              fontSize: 17,
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 28,
              maxWidth: 580,
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            The website never replaces the warehouse. It only opens its
            doors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
