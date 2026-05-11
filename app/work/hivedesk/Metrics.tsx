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

  const occBefore = useRef<HTMLSpanElement>(null);
  const occAfter = useRef<HTMLSpanElement>(null);
  const stayBefore = useRef<HTMLSpanElement>(null);
  const stayAfter = useRef<HTMLSpanElement>(null);
  const mrr = useRef<HTMLSpanElement>(null);
  const dashBefore = useRef<HTMLSpanElement>(null);
  const dashAfter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const stats: Stat[] = [
        {
          ref: occBefore,
          from: 0,
          to: 70,
          display: (v) => `${Math.round(v)}%`,
        },
        {
          ref: occAfter,
          from: 0,
          to: 91,
          display: (v) => `${Math.round(v)}%`,
        },
        {
          ref: stayBefore,
          from: 0,
          to: 4,
          display: (v) => `${Math.round(v)}mo`,
        },
        {
          ref: stayAfter,
          from: 0,
          to: 11,
          display: (v) => `${Math.round(v)}mo`,
        },
        {
          ref: mrr,
          from: 0,
          to: 38,
          display: (v) => `+${Math.round(v)}%`,
        },
        {
          ref: dashBefore,
          from: 0,
          to: 0,
          display: () => "0",
        },
        {
          ref: dashAfter,
          from: 0,
          to: 1,
          display: (v) => `${Math.round(v)}`,
        },
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
          duration: 0.8,
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
    border: "1px solid var(--page-border)",
    borderRadius: 12,
    padding: 28,
  };

  const valueWrap: React.CSSProperties = {
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    fontWeight: 600,
    fontSize: "clamp(28px, 4vw, 44px)",
    letterSpacing: "-0.04em",
    lineHeight: 1,
    color: "var(--page-text)",
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--page-text-3)",
    margin: 0,
    marginTop: 18,
  };

  const arrowStyle: React.CSSProperties = {
    color: "var(--page-text-3)",
    fontSize: "0.7em",
  };

  return (
    <section
      ref={sectionRef}
      style={{
        paddingBlock: 112,
        borderTop: "1px solid var(--page-border)",
        borderBottom: "1px solid var(--page-border)",
        background: "var(--page-surface-1)",
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
            <span ref={occBefore} style={{ color: "var(--page-text-3)" }}>
              0%
            </span>
            <span style={arrowStyle}>→</span>
            <span ref={occAfter} style={{ color: "var(--page-accent)" }}>
              0%
            </span>
          </div>
          <p style={labelStyle}>Occupancy</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={stayBefore} style={{ color: "var(--page-text-3)" }}>
              0mo
            </span>
            <span style={arrowStyle}>→</span>
            <span ref={stayAfter} style={{ color: "var(--page-accent)" }}>
              0mo
            </span>
          </div>
          <p style={labelStyle}>Avg member stay</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={mrr} style={{ color: "var(--page-accent)" }}>
              +0%
            </span>
          </div>
          <p style={labelStyle}>MRR in 90 days</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={dashBefore} style={{ color: "var(--page-text-3)" }}>
              0
            </span>
            <span style={arrowStyle}>→</span>
            <span ref={dashAfter} style={{ color: "var(--page-accent)" }}>
              0
            </span>
          </div>
          <p style={labelStyle}>Dashboards</p>
        </div>
      </div>
    </section>
  );
}
