"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";

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

const SCRAMBLE_CHARS = "!@#$%&*";

function scrambleString(target: string, progress: number) {
  const len = target.length;
  const revealed = Math.floor(progress * len);
  let out = "";
  for (let i = 0; i < len; i++) {
    if (i < revealed) {
      out += target[i];
    } else if (target[i] === " ") {
      out += " ";
    } else {
      out +=
        SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
  }
  return out;
}

const SUBHEADLINE_LINES = [
  "We build tools, sites, and digital products for businesses.",
  "Deployed in days. At a fraction of what you'd expect.",
];

export default function Hero() {
  const productRef = useRef<HTMLSpanElement>(null);
  const businessRef = useRef<HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (!productRef.current || !businessRef.current) return;

    let index = 0;
    let killed = false;
    const productEl = productRef.current;
    const businessEl = businessRef.current;

    productEl.textContent = COMBINATIONS[0].product;
    businessEl.textContent = COMBINATIONS[0].business;

    if (reduced) return;

    const tweens: gsap.core.Tween[] = [];

    function animateTo(nextIndex: number) {
      const next = COMBINATIONS[nextIndex];

      const productProgress = { v: 0 };
      const businessProgress = { v: 0 };

      const t1 = gsap.to(productProgress, {
        v: 1,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (productEl) {
            productEl.textContent = scrambleString(
              next.product,
              productProgress.v
            );
          }
        },
        onComplete: () => {
          if (productEl) productEl.textContent = next.product;
        },
      });

      const t2 = gsap.to(businessProgress, {
        v: 1,
        duration: 1.5,
        delay: 0.15,
        ease: "power2.out",
        onUpdate: () => {
          if (businessEl) {
            businessEl.textContent = scrambleString(
              next.business,
              businessProgress.v
            );
          }
        },
        onComplete: () => {
          if (businessEl) businessEl.textContent = next.business;
        },
      });

      tweens.push(t1, t2);
    }

    const interval = window.setInterval(() => {
      if (killed) return;
      index = (index + 1) % COMBINATIONS.length;
      animateTo(index);
    }, 3000);

    return () => {
      killed = true;
      window.clearInterval(interval);
      tweens.forEach((t) => t.kill());
    };
  }, [reduced]);

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
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
          lineHeight: 1.05,
          margin: 0,
          maxWidth: 1100,
        }}
      >
        <span
          ref={productRef}
          style={{ display: "block" }}
          aria-live="polite"
        >
          {COMBINATIONS[0].product}
        </span>
        <span ref={businessRef} style={{ display: "block" }}>
          {COMBINATIONS[0].business}
        </span>
      </h1>

      <div
        style={{
          marginTop: 24,
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
                ease: [0.16, 1, 0.3, 1],
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
