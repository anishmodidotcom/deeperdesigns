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
  to: number;
  display: (v: number) => string;
  label: string;
};

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const membersRef = useRef<HTMLSpanElement>(null);
  const stuckRef = useRef<HTMLSpanElement>(null);
  const agencyRef = useRef<HTMLSpanElement>(null);
  const revenueRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const stats: Stat[] = [
        {
          ref: membersRef,
          to: 12400,
          display: (v) => Math.round(v).toLocaleString("en-IN"),
          label: "members",
        },
        {
          ref: stuckRef,
          to: 94,
          display: (v) => `${Math.round(v)}%`,
          label: "stuck",
        },
        {
          ref: agencyRef,
          to: 0,
          display: () => "Rs. 0",
          label: "agency",
        },
        {
          ref: revenueRef,
          to: 5,
          display: (v) => `+${Math.round(v)}X`,
          label: "revenue",
        },
      ];

      stats.forEach((s) => {
        const el = s.ref.current;
        if (!el) return;
        if (reduced) {
          el.textContent = s.display(s.to);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.to,
          duration: 1.0,
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

  const rows: { ref: React.RefObject<HTMLSpanElement | null>; init: string; label: string }[] = [
    { ref: membersRef, init: "0", label: "Members in first 90 days" },
    { ref: stuckRef, init: "0%", label: "Stuck past week three (vs PDF 11%)" },
    {
      ref: agencyRef,
      init: "Rs. 0",
      label: "Paid to a dev agency. Built end-to-end by DD.",
    },
    { ref: revenueRef, init: "+0X", label: "Revenue vs the PDF era" },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text-2)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            margin: 0,
            marginBottom: 56,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 10,
              height: 10,
              background: "var(--page-accent)",
              display: "inline-block",
            }}
          />
          THE NUMBERS
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {rows.map((r, i) => (
            <li
              key={r.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 12,
                alignItems: "baseline",
                paddingBlock: 36,
                borderBottom:
                  i < rows.length - 1
                    ? "1px solid var(--page-border)"
                    : "none",
              }}
              className="zf-num-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-anton), Impact, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(72px, 12vw, 180px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.92,
                  color: "var(--page-accent)",
                  textTransform: "uppercase",
                }}
              >
                <span ref={r.ref}>{r.init}</span>
              </span>
              <span
                style={{
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 14,
                  letterSpacing: "0.04em",
                  color: "var(--page-text-2)",
                  alignSelf: "end",
                }}
              >
                {r.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          .zf-num-row {
            grid-template-columns: 1.4fr 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}
