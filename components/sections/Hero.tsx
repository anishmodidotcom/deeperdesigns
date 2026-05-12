"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const COMBINATIONS: { product: string; business: string }[] = [
  { product: "Skin Advisor", business: "for an Ayurvedic beauty brand" },
  { product: "Inventory Dashboard", business: "for a steel trading company" },
  { product: "Client Portal", business: "for a wellness studio" },
  { product: "Operations Intelligence", business: "for a shawarma chain" },
  { product: "Project Tracker", business: "for an interior design studio" },
  { product: "Clinic Manager", business: "for a dental practice" },
  { product: "Dynamic Pricing Engine", business: "for a used car dealership" },
  { product: "Academy Platform", business: "for a cricket coaching centre" },
  { product: "Fragrance Finder", business: "for a perfume house" },
  { product: "Member Hub", business: "for a coworking space" },
  { product: "Product Showcase", business: "for a spice exporter" },
  { product: "Pet Parent Portal", business: "for a dog boarding facility" },
  { product: "Farm Dashboard", business: "for an organic farm" },
  { product: "Lead Qualifier", business: "for an independent lawyer" },
  { product: "Fitness Platform", business: "for a strength training brand" },
  { product: "Custom Product Builder", business: "for a ceramics studio" },
  { product: "Brand Experience", business: "for a craft chai company" },
  { product: "Trip Companion", business: "for an adventure travel company" },
  { product: "Order Studio", business: "for a home bakery" },
  { product: "Parent Portal", business: "for a tutoring centre" },
];

const SUBHEADLINE_LINES = [
  "We design and build custom digital tools for modern businesses.",
  "Shipped in weeks, not quarters. Considered for longer.",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % COMBINATIONS.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, [reduced]);

  const current = COMBINATIONS[index];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        paddingInline: 24,
        paddingBlock: 96,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-3)",
          marginBottom: 32,
        }}
      >
        AI-POWERED BUILD STUDIO
      </motion.div>

      <h1
        style={{
          fontSize: "clamp(40px, 7vw, 96px)",
          fontWeight: 300,
          color: "var(--text)",
          letterSpacing: "-0.04em",
          lineHeight: 1.08,
          margin: 0,
          maxWidth: 1100,
          minHeight: "2.3em",
          position: "relative",
        }}
      >
        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            display: "block",
            position: "relative",
            minHeight: "1.1em",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`p-${index}`}
              initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -8 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ display: "inline-block" }}
            >
              {current.product}
            </motion.span>
          </AnimatePresence>
        </span>
        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            display: "block",
            position: "relative",
            minHeight: "1.1em",
            color: "var(--text-2)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`b-${index}`}
              initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -8 }}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
              style={{ display: "inline-block" }}
            >
              {current.business}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>

      <div
        style={{
          marginTop: 32,
          maxWidth: 600,
          textAlign: "center",
          color: "var(--text-2)",
          fontSize: "clamp(16px, 2vw, 22px)",
          lineHeight: 1.5,
        }}
      >
        {SUBHEADLINE_LINES.map((line, i) => (
          <span
            key={line}
            style={{
              display: "block",
              overflow: "hidden",
            }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.6 + i * 0.08,
                ease: EASE,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "var(--text-3)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 1,
            height: 32,
            background: "var(--text-3)",
            opacity: 0.6,
          }}
        />
      </motion.div>
    </section>
  );
}
