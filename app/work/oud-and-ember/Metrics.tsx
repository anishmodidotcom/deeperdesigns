"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stat = {
  ref: React.RefObject<HTMLSpanElement | null>;
  target: number;
  display: (v: number) => string;
  label: string;
  prefix?: string;
};

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const beforeRef = useRef<HTMLSpanElement>(null);
  const afterRef = useRef<HTMLSpanElement>(null);
  const consultsRef = useRef<HTMLSpanElement>(null);
  const minutesRef = useRef<HTMLSpanElement>(null);
  const conversionRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const stats: Stat[] = [
        {
          ref: beforeRef,
          target: 20,
          display: (v) => Math.round(v).toString(),
          label: "before",
        },
        {
          ref: afterRef,
          target: 0,
          display: (v) => Math.round(v).toString(),
          label: "after",
        },
        {
          ref: consultsRef,
          target: 340,
          display: (v) => `+${Math.round(v)}%`,
          label: "consults",
        },
        {
          ref: minutesRef,
          target: 11,
          display: (v) => `${Math.round(v)} min`,
          label: "minutes",
        },
        {
          ref: conversionRef,
          target: 62,
          display: (v) => `${Math.round(v)}%`,
          label: "conversion",
        },
      ];

      stats.forEach((s) => {
        const el = s.ref.current;
        if (!el) return;
        if (reduced) {
          el.textContent = s.display(s.target);
          return;
        }
        const obj = { v: s.target === 0 ? 20 : 0 };
        gsap.to(obj, {
          v: s.target,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = s.display(obj.v);
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const numberStyle: React.CSSProperties = {
    fontFamily:
      "var(--font-cormorant-display), Cormorant, Georgia, serif",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(40px, 6vw, 72px)",
    letterSpacing: "-0.02em",
    color: "var(--page-accent)",
    lineHeight: 1,
    margin: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--page-text-2)",
    margin: 0,
    marginTop: 18,
    lineHeight: 1.6,
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--page-surface)",
        borderTop: "1px solid var(--page-border)",
        borderBottom: "1px solid var(--page-border)",
        paddingBlock: 112,
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 56,
        }}
      >
        <div>
          <p style={numberStyle}>
            <span ref={beforeRef}>0</span>
            <span style={{ color: "var(--page-text-2)", marginInline: 12 }}>
              →
            </span>
            <span ref={afterRef}>20</span>
          </p>
          <p style={labelStyle}>
            Messages per inquiry before purchase intent
          </p>
        </div>

        <div>
          <p style={numberStyle}>
            <span ref={consultsRef}>+0%</span>
          </p>
          <p style={labelStyle}>Qualified atelier consultations</p>
        </div>

        <div>
          <p style={numberStyle}>
            <span ref={minutesRef}>0 min</span>
          </p>
          <p style={labelStyle}>Average quiz completion time</p>
        </div>

        <div>
          <p style={numberStyle}>
            <span ref={conversionRef}>0%</span>
          </p>
          <p style={labelStyle}>Quiz to purchase conversion</p>
        </div>
      </div>
    </section>
  );
}
