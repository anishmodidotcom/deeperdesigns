"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Walk() {
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
        src="/images/sahaja-farms/crop-rows.webp"
        alt="Aerial view of organic vegetable crop rows on a Karnataka farm with long afternoon shadows"
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
            "linear-gradient(180deg, rgba(11,16,10,0.35) 0%, rgba(11,16,10,0.55) 55%, rgba(11,16,10,0.92) 100%)",
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
          transition={{ duration: 1, ease: EASE }}
          style={{ maxWidth: 880 }}
        >
          <p
            style={{
              fontFamily: "var(--font-bricolage), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.2,
              color: "var(--page-text)",
              margin: 0,
              fontVariationSettings: "'opsz' 96",
            }}
          >
            Every row has a job. Every job has a date. Every date is on her
            phone.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 28,
              maxWidth: 580,
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            The dashboard was built from her notebook. Then it learned.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
