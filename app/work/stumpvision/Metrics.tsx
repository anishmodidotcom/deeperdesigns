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
  fixed?: string;
  label: string;
  color?: string;
};

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const playersRef = useRef<HTMLSpanElement>(null);
  const satRef = useRef<HTMLSpanElement>(null);
  const tournamentsRef = useRef<HTMLSpanElement>(null);

  const stats: Stat[] = [
    {
      ref: playersRef,
      target: 250,
      display: (v) => Math.round(v).toString(),
      label: "Players tracked and profiled",
    },
    {
      ref: satRef,
      target: 92,
      display: (v) => `${Math.round(v)}%`,
      label: "Parent satisfaction score",
    },
    {
      ref: tournamentsRef,
      target: 3,
      display: (v) => `${v.toFixed(0)}x`,
      label: "Tournament registrations vs manual process",
    },
  ];

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      stats.forEach((s) => {
        const el = s.ref.current;
        if (!el) return;
        if (reduced) {
          el.textContent = s.display(s.target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.target,
          duration: 1.6,
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
      "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(36px, 6vw, 64px)",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    margin: 0,
    color: "var(--page-accent)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    color: "var(--page-text-2)",
    margin: 0,
    marginTop: 16,
    lineHeight: 1.5,
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--page-surface)",
        borderTop: "1px solid rgba(74,222,128,0.1)",
        borderBottom: "1px solid rgba(74,222,128,0.1)",
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
          <p style={numberStyle}>
            <span ref={playersRef}>0</span>
          </p>
          <p style={labelStyle}>Players tracked and profiled</p>
        </div>
        <div>
          <p style={numberStyle}>
            <span ref={satRef}>0%</span>
          </p>
          <p style={labelStyle}>Parent satisfaction score</p>
        </div>
        <div>
          <p style={numberStyle}>
            <span ref={tournamentsRef}>0x</span>
          </p>
          <p style={labelStyle}>Tournament registrations vs manual process</p>
        </div>
        <div>
          <p style={{ ...numberStyle, color: "var(--page-accent-2)" }}>Zero</p>
          <p style={labelStyle}>
            Arguments about team selection (data settles it)
          </p>
        </div>
      </div>
    </section>
  );
}
