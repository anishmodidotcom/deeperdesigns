"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const numberStyle: React.CSSProperties = {
  fontFamily:
    "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
  fontWeight: 700,
  fontSize: "clamp(32px, 5vw, 56px)",
  letterSpacing: "-0.03em",
  color: "var(--page-accent)",
  lineHeight: 1,
  margin: 0,
};

const labelStyle: React.CSSProperties = {
  fontFamily:
    "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
  fontSize: 14,
  color: "var(--page-text-2)",
  margin: 0,
  marginTop: 16,
  lineHeight: 1.5,
};

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const strikeRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const newRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const strikeEl = strikeRef.current;
      const arrowEl = arrowRef.current;
      const newEl = newRef.current;
      if (!strikeEl || !arrowEl || !newEl) return;

      if (reduced) {
        strikeEl.style.setProperty("--strike", "100%");
        arrowEl.style.opacity = "1";
        newEl.style.opacity = "1";
        newEl.style.transform = "translateX(0)";
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(strikeEl, {
        "--strike": "100%",
        duration: 0.7,
        ease: "power2.inOut",
      })
        .to(
          arrowEl,
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "+=0.05"
        )
        .to(
          newEl,
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.1"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--page-surface)",
        borderTop: "1px solid rgba(15,168,154,0.1)",
        borderBottom: "1px solid rgba(15,168,154,0.1)",
        paddingBlock: 96,
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: 12,
              fontFamily:
                "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4.4vw, 48px)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            <span
              ref={strikeRef}
              className="sf-strike"
              style={
                {
                  position: "relative",
                  color: "var(--page-text-2)",
                  ["--strike" as string]: "0%",
                } as React.CSSProperties
              }
            >
              12%
            </span>
            <span
              ref={arrowRef}
              style={{
                opacity: 0,
                transform: "translateX(-8px)",
                color: "var(--page-text-2)",
                fontSize: "0.7em",
                display: "inline-block",
              }}
            >
              →
            </span>
            <span
              ref={newRef}
              style={{
                opacity: 0,
                transform: "translateX(-8px)",
                color: "var(--page-accent)",
                display: "inline-block",
              }}
            >
              38%
            </span>
          </div>
          <p style={labelStyle}>Treatment follow-through rate</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={numberStyle}>Rs. 2.4L</p>
          <p style={labelStyle}>Monthly revenue recovered</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={numberStyle}>Zero</p>
          <p style={labelStyle}>Paper files remaining</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={numberStyle}>4.8 star</p>
          <p style={labelStyle}>
            Google rating after improved patient experience
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .sf-strike::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 55%;
          height: 2px;
          background: var(--page-text-2);
          width: var(--strike, 0%);
        }
      `}</style>
    </section>
  );
}
