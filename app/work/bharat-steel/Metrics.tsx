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
  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
  fontWeight: 700,
  fontSize: "clamp(40px, 6vw, 72px)",
  color: "var(--page-accent)",
  letterSpacing: "-0.03em",
  lineHeight: 1,
  margin: 0,
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  color: "var(--page-text-2)",
  margin: 0,
  marginTop: 16,
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
        borderTop: "1px solid rgba(59,130,246,0.1)",
        borderBottom: "1px solid rgba(59,130,246,0.1)",
        paddingBlock: 96,
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 48,
          textAlign: "left",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: 14,
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            <span
              ref={strikeRef}
              className="bs-strike"
              style={
                {
                  position: "relative",
                  color: "var(--page-text-2)",
                  ["--strike" as string]: "0%",
                } as React.CSSProperties
              }
            >
              30 min
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
              30 sec
            </span>
          </div>
          <p style={labelStyle}>Quote response time</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={numberStyle}>Zero</p>
          <p style={labelStyle}>Manual Excel updates</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={numberStyle}>100%</p>
          <p style={labelStyle}>Inventory accuracy</p>
        </motion.div>
      </div>

      <style jsx>{`
        .bs-strike::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 55%;
          height: 2px;
          background: var(--page-text-2);
          width: var(--strike, 0%);
          transition: none;
        }
      `}</style>
    </section>
  );
}
