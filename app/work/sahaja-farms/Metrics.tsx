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
  from: number;
  to: number;
  display: (v: number) => string;
};

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  const subBefore = useRef<HTMLSpanElement>(null);
  const subAfter = useRef<HTMLSpanElement>(null);
  const churnBefore = useRef<HTMLSpanElement>(null);
  const churnAfter = useRef<HTMLSpanElement>(null);
  const wholesale = useRef<HTMLSpanElement>(null);
  const osBefore = useRef<HTMLSpanElement>(null);
  const osAfter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const stats: Stat[] = [
        { ref: subBefore, from: 0, to: 412, display: (v) => Math.round(v).toString() },
        { ref: subAfter, from: 0, to: 487, display: (v) => Math.round(v).toString() },
        { ref: churnBefore, from: 0, to: 23, display: (v) => `${Math.round(v)}%` },
        { ref: churnAfter, from: 23, to: 8, display: (v) => `${Math.round(v)}%` },
        { ref: wholesale, from: 0, to: 34, display: (v) => `+${Math.round(v)}%` },
        { ref: osBefore, from: 0, to: 0, display: () => "0" },
        { ref: osAfter, from: 0, to: 1, display: (v) => Math.round(v).toString() },
      ];

      stats.forEach((s) => {
        const el = s.ref.current;
        if (!el) return;
        if (reduced) {
          el.textContent = s.display(s.to);
          return;
        }
        const obj = { v: s.from };
        gsap.to(obj, {
          v: s.to,
          duration: 1.2,
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

  const cardStyle: React.CSSProperties = {
    background: "var(--page-surface-1)",
    border: "1px solid rgba(212,165,55,0.2)",
    borderRadius: 12,
    padding: 28,
  };
  const valueWrap: React.CSSProperties = {
    fontFamily: "var(--font-bricolage), Georgia, serif",
    fontWeight: 600,
    fontSize: "clamp(28px, 4vw, 44px)",
    letterSpacing: "-0.04em",
    lineHeight: 1,
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap",
    fontVariationSettings: "'opsz' 96",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--page-text-3)",
    margin: 0,
    marginTop: 18,
    lineHeight: 1.5,
  };
  const arrow: React.CSSProperties = {
    color: "var(--page-text-3)",
    fontSize: "0.7em",
  };

  return (
    <section
      ref={sectionRef}
      style={{
        paddingBlock: 112,
        background: "var(--page-surface-1)",
        borderTop: "1px solid var(--page-border)",
        borderBottom: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={subBefore} style={{ color: "var(--page-text-3)" }}>
              0
            </span>
            <span style={arrow}>→</span>
            <span ref={subAfter} style={{ color: "var(--page-accent)" }}>
              0
            </span>
          </div>
          <p style={labelStyle}>Weekly subscribers</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={churnBefore} style={{ color: "var(--page-accent-3)" }}>
              0%
            </span>
            <span style={arrow}>→</span>
            <span ref={churnAfter} style={{ color: "var(--page-accent-2)" }}>
              0%
            </span>
          </div>
          <p style={labelStyle}>Monthly churn</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={wholesale} style={{ color: "var(--page-accent)" }}>
              +0%
            </span>
          </div>
          <p style={labelStyle}>Wholesale revenue</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={osBefore} style={{ color: "var(--page-text-3)" }}>
              0
            </span>
            <span style={arrow}>→</span>
            <span ref={osAfter} style={{ color: "var(--page-accent)" }}>
              0
            </span>
          </div>
          <p style={labelStyle}>Farm operating systems</p>
        </div>
      </div>
    </section>
  );
}
