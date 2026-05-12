"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [phase, setPhase] = useState<"before" | "after">("after");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setPhase((p) => (p === "after" ? "before" : "after"));
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingInline: 24,
        paddingBlock: 96,
        overflow: "hidden",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          color: "var(--page-accent)",
          margin: 0,
          marginBottom: 28,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 14px",
          border: "1px solid var(--page-border)",
          borderRadius: 9999,
          background: "rgba(212,168,87,0.05)",
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: 9999,
            background: "var(--page-accent)",
          }}
        />
        01 · LIVE PRODUCT · FURNITURE MAKERS
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: EASE }}
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(44px, 7vw, 88px)",
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
          margin: 0,
          maxWidth: 920,
        }}
      >
        Workshop photo in.{" "}
        <span style={{ color: "var(--page-accent)" }}>Studio shot out.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        style={{
          fontSize: 18,
          color: "var(--page-text-2)",
          maxWidth: 560,
          margin: 0,
          marginTop: 24,
          lineHeight: 1.65,
        }}
      >
        Catalog-ready studio and lifestyle images from a phone photo. Built
        for Indian furniture makers who do not have a studio budget.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
        style={{
          position: "relative",
          width: "min(520px, 90vw)",
          aspectRatio: "4 / 5",
          marginTop: 56,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--page-border)",
          background: "var(--page-surface)",
          boxShadow: "0 30px 80px -30px rgba(212, 168, 87, 0.25)",
        }}
      >
        <Image
          src="/images/maplelens/hero-workshop.webp"
          alt="A workshop photo of a wooden chair before Maple Lens"
          fill
          priority
          sizes="(min-width: 900px) 520px, 90vw"
          style={{
            objectFit: "cover",
            opacity: phase === "before" ? 1 : 0,
            transition: "opacity 0.9s ease-in-out",
          }}
        />
        <Image
          src="/images/maplelens/hero-catalog.webp"
          alt="The same chair after Maple Lens, a catalog-ready studio image"
          fill
          priority
          sizes="(min-width: 900px) 520px, 90vw"
          style={{
            objectFit: "cover",
            opacity: phase === "after" ? 1 : 0,
            transition: "opacity 0.9s ease-in-out",
          }}
        />

        <motion.span
          key={phase}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background:
              phase === "after" ? "var(--page-accent)" : "rgba(15,12,10,0.78)",
            color: phase === "after" ? "#1A1612" : "var(--page-text)",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            padding: "5px 9px",
            borderRadius: 4,
            fontWeight: 600,
          }}
        >
          {phase === "after" ? "AFTER" : "BEFORE"}
        </motion.span>

        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.16em",
            color: "var(--page-text-2)",
            background: "rgba(15,12,10,0.55)",
            padding: "4px 8px",
            borderRadius: 4,
          }}
        >
          MAPLE LENS
        </span>
      </motion.div>
    </section>
  );
}
