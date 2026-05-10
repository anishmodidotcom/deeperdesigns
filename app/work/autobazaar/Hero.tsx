"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "motion/react";

const HEADLINE_LINES = [
  { text: "Every car priced.", color: "var(--page-text)" },
  { text: "Every day.", color: "var(--page-accent)" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const arc = arcRef.current;
      const dot = dotRef.current;
      if (!arc || !dot) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(arc, {
        strokeDasharray: 100,
        strokeDashoffset: reduced ? 30 : 100,
      });
      gsap.set(dot, { opacity: reduced ? 1 : 0 });

      if (!reduced) {
        gsap.to(arc, {
          strokeDashoffset: 30,
          duration: 1.5,
          delay: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          opacity: 1,
          duration: 0.4,
          delay: 1.7,
          ease: "power2.out",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
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
      <div
        className="container-x"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 64,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--page-accent)",
              margin: 0,
              marginBottom: 32,
            }}
          >
            AUTOBAZAAR · DEIRA, DUBAI
          </motion.p>

          <h1
            style={{
              fontFamily:
                "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(44px, 7vw, 88px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "block", color: line.color }}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:
                "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: 17,
              color: "var(--page-text-2)",
              maxWidth: 500,
              margin: 0,
              marginTop: 28,
              lineHeight: 1.6,
            }}
          >
            A dynamic pricing engine and live inventory system for a 60-car
            dealership. Cars that sit too long get cheaper. Competitors&apos;
            prices factored in. Buyers browse and book test drives online.
          </motion.p>
        </div>

        <div className="ab-gauge" aria-hidden>
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke="var(--page-accent)"
              strokeOpacity="0.15"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              ref={arcRef}
              d="M 20 100 A 80 80 0 0 1 180 100"
              pathLength="100"
              stroke="var(--page-accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              ref={dotRef}
              cx="147"
              cy="35"
              r="4"
              fill="var(--page-accent)"
            />
            {Array.from({ length: 9 }).map((_, i) => {
              const angle = Math.PI * (1 - i / 8);
              const x1 = 100 + Math.cos(angle) * 88;
              const y1 = 100 - Math.sin(angle) * 88;
              const x2 = 100 + Math.cos(angle) * 96;
              const y2 = 100 - Math.sin(angle) * 96;
              return (
                <line
                  key={i}
                  x1={x1.toFixed(1)}
                  y1={y1.toFixed(1)}
                  x2={x2.toFixed(1)}
                  y2={y2.toFixed(1)}
                  stroke="var(--page-accent)"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              );
            })}
            <text
              x="100"
              y="118"
              textAnchor="middle"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="9"
              letterSpacing="0.12em"
              fill="var(--page-text-2)"
            >
              MARKET FIT
            </text>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .ab-gauge {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
