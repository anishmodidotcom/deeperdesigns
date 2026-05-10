"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const minRef = useRef<HTMLSpanElement>(null);
  const skuRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const minEl = minRef.current;
      const skuEl = skuRef.current;
      if (!minEl || !skuEl) return;

      if (reduced) {
        minEl.textContent = "2";
        skuEl.textContent = "40";
        return;
      }

      const minObj = { v: 0 };
      const skuObj = { v: 0 };

      gsap.to(minObj, {
        v: 2,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        onUpdate: () => {
          minEl.textContent = Math.round(minObj.v).toString();
        },
      });

      gsap.to(skuObj, {
        v: 40,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        onUpdate: () => {
          skuEl.textContent = Math.round(skuObj.v).toString();
        },
      });
    },
    { scope: sectionRef }
  );

  const numberStyle: React.CSSProperties = {
    fontFamily: "var(--font-playfair), serif",
    fontWeight: 400,
    fontSize: "clamp(40px, 6vw, 72px)",
    color: "var(--page-accent)",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    margin: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    color: "var(--page-text-2)",
    marginTop: 16,
    margin: 0,
    lineHeight: 1.5,
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--page-surface)",
        borderTop: "1px solid rgba(212,165,116,0.1)",
        borderBottom: "1px solid rgba(212,165,116,0.1)",
        paddingBlock: 96,
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
          textAlign: "center",
        }}
      >
        <div>
          <p style={numberStyle}>
            <span ref={minRef}>0</span> min
          </p>
          <p style={labelStyle}>Average consultation time</p>
        </div>

        <div>
          <p style={numberStyle}>
            <span ref={skuRef}>0</span>+
          </p>
          <p style={labelStyle}>SKUs intelligently matched</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={numberStyle}>24/7</p>
          <p style={labelStyle}>Always available. No more missed DMs.</p>
        </motion.div>
      </div>
    </section>
  );
}
