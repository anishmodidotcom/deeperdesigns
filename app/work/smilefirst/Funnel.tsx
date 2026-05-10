"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Level = {
  pct: number;
  label: string;
  caption?: string;
  bg: string;
  border: string;
};

const LEVELS: Level[] = [
  {
    pct: 100,
    label: "100 patients visit this month",
    bg: "rgba(15,168,154,0.18)",
    border: "rgba(15,168,154,0.3)",
  },
  {
    pct: 80,
    label: "80 are told they need follow-up treatment",
    caption: "80% need more work",
    bg: "rgba(15,168,154,0.18)",
    border: "rgba(15,168,154,0.3)",
  },
  {
    pct: 32,
    label: "32 actually book the follow-up",
    caption: "60% say 'I will think about it' and disappear",
    bg: "rgba(234,179,8,0.18)",
    border: "rgba(234,179,8,0.3)",
  },
  {
    pct: 12,
    label: "12 complete the recommended treatment",
    caption: "Only 12% follow through",
    bg: "rgba(239,68,68,0.18)",
    border: "rgba(239,68,68,0.3)",
  },
];

export default function Funnel() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const target = LEVELS[i].pct;
        if (reduced) {
          gsap.set(bar, { width: `${target}%` });
          return;
        }

        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${target}%`,
            ease: "none",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ paddingBlock: 128 }}>
      <div
        className="container-x"
        style={{ textAlign: "center" }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE PROBLEM
        </p>

        <div
          style={{
            maxWidth: 560,
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            textAlign: "left",
          }}
        >
          {LEVELS.map((lvl, i) => (
            <div key={lvl.label}>
              <div
                style={{
                  position: "relative",
                  height: 56,
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  ref={(el) => {
                    barsRef.current[i] = el;
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "0%",
                    background: lvl.bg,
                    borderRight: `1px solid ${lvl.border}`,
                    borderRadius: 6,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingInline: 20,
                    fontFamily:
                      "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: "var(--page-text)",
                  }}
                >
                  {lvl.label}
                </div>
              </div>
              {lvl.caption && (
                <p
                  style={{
                    fontFamily:
                      "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: 13,
                    color: "var(--page-text-2)",
                    margin: 0,
                    marginTop: 8,
                    paddingLeft: 4,
                  }}
                >
                  {lvl.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 22,
            color: "var(--page-text)",
            maxWidth: 500,
            marginInline: "auto",
            marginTop: 64,
            margin: 0,
            marginBlockStart: 64,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          That is lakhs in lost revenue. Every single month.
        </p>
      </div>
    </section>
  );
}
