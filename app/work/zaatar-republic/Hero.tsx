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
      <div aria-hidden style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/zaatar-republic/hero-wrap.webp"
          alt=""
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
              "linear-gradient(110deg, rgba(13,8,6,0.96) 0%, rgba(13,8,6,0.55) 55%, rgba(13,8,6,0.2) 100%)",
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
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 40,
          }}
        >
          ZAATAR REPUBLIC · SHARJAH
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(56px, 11vw, 156px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            margin: 0,
            textTransform: "uppercase",
            maxWidth: 1100,
          }}
        >
          <span style={{ display: "block", color: "var(--page-accent)" }}>
            Zaatar
          </span>
          <span style={{ display: "block", color: "var(--page-text)" }}>
            Republic
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 540,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--page-accent-2)",
              margin: 0,
            }}
          >
            OPERATIONS INTELLIGENCE
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: 19,
              color: "var(--page-text-2)",
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            Four locations, a thousand orders a day, every inventory call
            made by gut. Now one dashboard runs all four on data, and the
            owner can see which dish actually earns.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
