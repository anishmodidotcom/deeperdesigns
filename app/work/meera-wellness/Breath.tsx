"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASES: { label: string; count: string; note: string }[] = [
  { label: "INHALE", count: "Four", note: "Filling the belly first, then the chest." },
  { label: "HOLD", count: "Four", note: "Soft jaw, soft shoulders, eyes resting." },
  { label: "EXHALE", count: "Six", note: "Out through the nose, lower than you think." },
  { label: "REST", count: "Two", note: "Notice the pause before the next breath." },
];

export default function Breath() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const circle = circleRef.current;
      if (!circle) return;
      if (reduced) {
        circle.setAttribute("r", "120");
        return;
      }
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const local = (self.progress * 2) % 1;
          const eased = 0.5 - 0.5 * Math.cos(local * Math.PI * 2);
          const radius = 50 + eased * 110;
          circle.setAttribute("r", String(radius));
          const idx = Math.min(
            PHASES.length - 1,
            Math.floor(self.progress * PHASES.length)
          );
          setPhase(idx);
        },
      });
    },
    { scope: sectionRef }
  );

  const active = PHASES[phase];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--page-bg)",
      }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
        <Image
          src="/images/meera-wellness/savasana.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(248,246,242,0.7) 0%, rgba(248,246,242,0.92) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          padding: "0 48px",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
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
          THE PRACTICE · BOX BREATH · 4-4-6-2
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text-2)",
            margin: 0,
          }}
        >
          SCROLL · TWO FULL BREATHS
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 56,
          paddingBlock: 80,
        }}
      >
        <svg
          width="360"
          height="360"
          viewBox="-180 -180 360 360"
          aria-hidden
          style={{ overflow: "visible" }}
        >
          <circle
            cx="0"
            cy="0"
            r="160"
            fill="none"
            stroke="rgba(91,127,110,0.16)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <circle
            ref={circleRef}
            cx="0"
            cy="0"
            r="50"
            fill="rgba(91,127,110,0.18)"
            stroke="var(--page-accent)"
            strokeWidth="1.5"
            style={{ transition: "r 0.15s linear" }}
          />
          <circle
            cx="0"
            cy="0"
            r="4"
            fill="var(--page-accent)"
          />
        </svg>

        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "var(--page-accent)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            {active.label}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(40px, 5vw, 56px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: "var(--page-text)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            {active.count}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 19,
              color: "var(--page-text-2)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {active.note}
          </p>
        </div>
      </div>
    </section>
  );
}
