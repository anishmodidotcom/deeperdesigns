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

  const updBefore = useRef<HTMLSpanElement>(null);
  const updAfter = useRef<HTMLSpanElement>(null);
  const msgBefore = useRef<HTMLSpanElement>(null);
  const msgAfter = useRef<HTMLSpanElement>(null);
  const booking = useRef<HTMLSpanElement>(null);
  const review = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const stats: Stat[] = [
        { ref: updBefore, from: 0, to: 2, display: (v) => `${Math.round(v)} hrs` },
        { ref: updAfter, from: 2, to: 0, display: (v) => `${Math.round(v)} hrs` },
        { ref: msgBefore, from: 0, to: 47, display: (v) => `${Math.round(v)}` },
        { ref: msgAfter, from: 47, to: 3, display: (v) => `${Math.round(v)}` },
        { ref: booking, from: 0, to: 62, display: (v) => `+${Math.round(v)}%` },
        { ref: review, from: 0, to: 5.0, display: (v) => v.toFixed(1) },
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
    border: "1px solid rgba(232,165,87,0.18)",
    borderRadius: 12,
    padding: 28,
  };
  const valueWrap: React.CSSProperties = {
    fontFamily:
      "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(28px, 4vw, 44px)",
    letterSpacing: "-0.035em",
    lineHeight: 1,
    display: "flex",
    alignItems: "baseline",
    gap: 10,
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
            <span ref={updBefore} style={{ color: "var(--page-text-3)" }}>
              0 hrs
            </span>
            <span style={arrow}>→</span>
            <span ref={updAfter} style={{ color: "var(--page-accent)" }}>
              2 hrs
            </span>
          </div>
          <p style={labelStyle}>Daily update time</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={msgBefore} style={{ color: "var(--page-text-3)" }}>
              0
            </span>
            <span style={arrow}>→</span>
            <span ref={msgAfter} style={{ color: "var(--page-accent)" }}>
              47
            </span>
          </div>
          <p style={labelStyle}>Peak day WhatsApp messages</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={booking} style={{ color: "var(--page-accent)" }}>
              +0%
            </span>
          </div>
          <p style={labelStyle}>Booking capacity utilization</p>
        </div>

        <div style={cardStyle}>
          <div style={valueWrap}>
            <span ref={review} style={{ color: "var(--page-accent)" }}>
              0.0
            </span>
          </div>
          <p style={labelStyle}>Average Google review</p>
        </div>
      </div>
    </section>
  );
}
