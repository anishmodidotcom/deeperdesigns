"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PeacockFeather } from "./illustrations";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Workshop() {
  return (
    <section
      style={{
        position: "relative",
        height: "min(820px, 92vh)",
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/earth-and-fire/workshop-shelves.webp"
        alt="The pottery workshop in Jaipur, with wooden shelves of unglazed pieces and afternoon light spilling through arched windows"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(110deg, rgba(43,28,14,0.55) 0%, rgba(43,28,14,0.15) 45%, rgba(43,28,14,0.05) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
        whileInView={{ opacity: 0.4, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: SOFT }}
        aria-hidden
        style={{
          position: "absolute",
          top: -40,
          right: -80,
          color: "var(--page-accent-2)",
          pointerEvents: "none",
          transformOrigin: "top right",
        }}
      >
        <PeacockFeather width={520} />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          className="container-x"
          style={{
            maxWidth: 1280,
            marginInline: "auto",
            width: "100%",
            paddingBlock: 80,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: SOFT }}
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 500,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#F5EFE3",
              margin: 0,
              marginBottom: 28,
            }}
          >
            THE WORKSHOP
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: SOFT }}
            style={{
              fontFamily:
                "var(--font-display-script), 'DM Serif Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 6vw, 76px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.04,
              color: "#F5EFE3",
              margin: 0,
              maxWidth: 820,
            }}
          >
            A second-floor courtyard. Afternoon light. One pair of hands.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
