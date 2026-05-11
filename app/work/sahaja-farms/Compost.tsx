"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Compost() {
  return (
    <section
      style={{
        position: "relative",
        height: "70vh",
        minHeight: 460,
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/sahaja-farms/compost-detail.webp"
        alt="Rich dark compost with visible organic matter and an earthworm"
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
            "linear-gradient(180deg, rgba(11,16,10,0.35) 0%, rgba(184,85,48,0.15) 50%, rgba(11,16,10,0.86) 100%)",
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
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-bricolage), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(28px, 4.4vw, 48px)",
            letterSpacing: "-0.035em",
            color: "var(--page-text)",
            margin: 0,
            maxWidth: 720,
            lineHeight: 1.2,
            fontVariationSettings: "'opsz' 96",
          }}
        >
          The soil knows what it needs. We just write it down.
        </motion.p>
      </div>
    </section>
  );
}
