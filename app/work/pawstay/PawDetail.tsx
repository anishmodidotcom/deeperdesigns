"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PawDetail() {
  return (
    <section
      style={{
        position: "relative",
        maxHeight: "80vh",
        height: "80vh",
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/pawstay/paw-detail.webp"
        alt="A single dog's paw resting on a sage-green cushion in warm side light"
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
            "linear-gradient(180deg, rgba(15,19,16,0.35) 0%, rgba(232,165,87,0.18) 50%, rgba(15,19,16,0.78) 100%)",
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(32px, 4.5vw, 48px)",
            letterSpacing: "-0.025em",
            color: "var(--page-text)",
            margin: 0,
            maxWidth: 760,
            lineHeight: 1.2,
          }}
        >
          Every detail. Every dog. Every day.
        </motion.p>
      </div>
    </section>
  );
}
