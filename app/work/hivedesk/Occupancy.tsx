"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Counter = {
  ref: React.RefObject<HTMLSpanElement | null>;
  to: number;
  label: string;
  sub: string;
  format: (v: number) => string;
};

export default function Occupancy() {
  const sectionRef = useRef<HTMLElement>(null);
  const membersRef = useRef<HTMLSpanElement>(null);
  const roomsRef = useRef<HTMLSpanElement>(null);
  const seatsRef = useRef<HTMLSpanElement>(null);
  const revenueRef = useRef<HTMLSpanElement>(null);

  const counters: Counter[] = [
    {
      ref: membersRef,
      to: 84,
      label: "Active members",
      sub: "Of 96 seats",
      format: (v) => Math.round(v).toString(),
    },
    {
      ref: roomsRef,
      to: 12,
      label: "Rooms booked today",
      sub: "Of 18 rooms",
      format: (v) => Math.round(v).toString(),
    },
    {
      ref: seatsRef,
      to: 73,
      label: "Hot-desks taken right now",
      sub: "Of 84 hot-desks",
      format: (v) => Math.round(v).toString(),
    },
    {
      ref: revenueRef,
      to: 4.2,
      label: "Lakh MRR",
      sub: "Up from 3.1",
      format: (v) => `Rs. ${v.toFixed(1)}L`,
    },
  ];

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      counters.forEach((c) => {
        const el = c.ref.current;
        if (!el) return;
        // Paint starting value so the cell is never blank before the
        // ScrollTrigger fires on first visit.
        el.textContent = c.format(0);
        if (reduced) {
          el.textContent = c.format(c.to);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: c.to,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 50%",
            scrub: 0.6,
          },
          onUpdate: () => {
            el.textContent = c.format(obj.v);
          },
        });
      });

      // Refresh after Lenis settles so positions are accurate on first
      // visit.
      const refreshId = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
      return () => window.clearTimeout(refreshId);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        paddingBlock: 96,
        position: "relative",
        borderBlock: "1px solid var(--page-border)",
        background: "var(--page-surface-1)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 36,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--page-accent)",
              margin: 0,
            }}
          >
            LIVE · FLOOR STATUS · UPDATED EVERY MINUTE
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--page-text-3)",
              margin: 0,
            }}
          >
            08 NOV · 14:32 IST
          </p>
        </div>

        <div className="hd-occ-grid">
          {counters.map((c) => (
            <div
              key={c.label}
              style={{
                paddingBlock: 24,
                paddingInline: 0,
                borderTop: "1px solid var(--page-border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  letterSpacing: "-0.02em",
                  color: "var(--page-text)",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                <span ref={c.ref}>{c.format(0)}</span>
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  margin: 0,
                  marginTop: 12,
                }}
              >
                {c.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--page-text-3)",
                  margin: 0,
                  marginTop: 6,
                }}
              >
                {c.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hd-occ-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .hd-occ-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
