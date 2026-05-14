"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Facility() {
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
        src="/images/pawstay/daycare-interior.webp"
        alt="Premium modern dog daycare facility interior with polished concrete and earth-tone rugs"
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
            "linear-gradient(180deg, rgba(15,19,16,0.3) 0%, rgba(15,19,16,0.55) 60%, rgba(15,19,16,0.92) 100%)",
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
          transition={{ duration: 0.8, ease: EASE }}
          style={{ maxWidth: 860 }}
        >
          <p
            style={{
              fontFamily:
                "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(34px, 5vw, 56px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "var(--page-text)",
              margin: 0,
            }}
          >
            The space was already beautiful. We just made it visible.
          </p>
          <p
            style={{
              fontSize: 17,
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 28,
              maxWidth: 620,
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            Twenty dogs, one sun-drenched room, a camera in every corner.
            The portal does not replace the care. It opens the door so
            parents can see it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
