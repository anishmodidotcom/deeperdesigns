"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Composite IGCSE Maths score over 8 months. Realistic curve: starts at
// 52%, dips at month 2 (test shock), climbs steadily, settles at 91%.
const POINTS: { x: number; y: number; month: string; score: number; note: string }[] = [
  { x: 80, y: 280, month: "OCT", score: 52, note: "Diagnostic test" },
  { x: 220, y: 295, month: "NOV", score: 48, note: "First mock paper" },
  { x: 360, y: 250, month: "DEC", score: 61, note: "Algebra topic clear" },
  { x: 500, y: 200, month: "JAN", score: 72, note: "Trigonometry clear" },
  { x: 640, y: 180, month: "FEB", score: 76, note: "First A grade mock" },
  { x: 780, y: 130, month: "MAR", score: 84, note: "Calculus introduction" },
  { x: 920, y: 105, month: "APR", score: 88, note: "Mock 8 of 8" },
  { x: 1060, y: 80, month: "MAY", score: 91, note: "IGCSE final" },
];

function buildPath() {
  let d = `M ${POINTS[0].x} ${POINTS[0].y}`;
  for (let i = 1; i < POINTS.length; i++) {
    const prev = POINTS[i - 1];
    const curr = POINTS[i];
    const cpX1 = prev.x + (curr.x - prev.x) * 0.5;
    const cpX2 = prev.x + (curr.x - prev.x) * 0.5;
    d += ` C ${cpX1} ${prev.y}, ${cpX2} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function Progress() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const markersRef = useRef<(SVGGElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const path = pathRef.current;
      const fill = fillRef.current;
      const dot = dotRef.current;
      if (!path || !fill || !dot) return;

      if (reduced) {
        path.style.strokeDashoffset = "0";
        markersRef.current.forEach((m) => {
          if (m) m.style.opacity = "1";
        });
        setActiveIndex(POINTS.length - 1);
        return;
      }

      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      fill.style.opacity = "0";

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=240%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          path.style.strokeDashoffset = `${len * (1 - self.progress)}`;
          fill.style.opacity = String(self.progress * 0.55);
          const pos = path.getPointAtLength(len * self.progress);
          dot.setAttribute("transform", `translate(${pos.x} ${pos.y})`);
          const targetIdx = Math.min(
            POINTS.length - 1,
            Math.floor(self.progress * POINTS.length)
          );
          markersRef.current.forEach((m, i) => {
            if (m) m.style.opacity = i <= targetIdx ? "1" : "0.18";
          });
          setActiveIndex(targetIdx);
        },
      });
    },
    { scope: sectionRef }
  );

  const active = POINTS[activeIndex];

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
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          padding: "0 48px",
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
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
          SECTION 02 · ONE STUDENT · 8 MONTHS
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text-3)",
            margin: 0,
          }}
        >
          SCROLL · WATCH THE LINE
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          top: "14%",
          left: 0,
          right: 0,
          padding: "0 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--page-text-3)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            CURRENT · {active.month}
          </p>
          <h2
            style={{
              fontFamily:
                "var(--font-display-academic), 'Source Serif 4', 'Times New Roman', serif",
              fontWeight: 500,
              fontSize: "clamp(56px, 9vw, 132px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: "var(--page-text)",
              margin: 0,
              minWidth: "5ch",
            }}
          >
            {active.score}
            <span
              style={{
                fontSize: "0.45em",
                marginLeft: 6,
                color: "var(--page-text-3)",
              }}
            >
              %
            </span>
          </h2>
        </div>
        <div
          style={{
            maxWidth: 460,
            textAlign: "right",
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
              marginBottom: 12,
            }}
          >
            LESSON NOTE
          </p>
          <p
            style={{
              fontFamily:
                "var(--font-display-academic), 'Source Serif 4', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.6vw, 30px)",
              color: "var(--page-text)",
              margin: 0,
              lineHeight: 1.35,
            }}
          >
            {active.note}.
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: "48%",
          padding: "0 48px 96px",
        }}
      >
        <svg
          viewBox="0 0 1140 360"
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
          aria-hidden
        >
          <defs>
            <linearGradient id="grade-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--page-accent)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--page-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[40, 110, 180, 250, 320].map((y, i) => (
            <g key={y}>
              <line
                x1="60"
                x2="1100"
                y1={y}
                y2={y}
                stroke="var(--page-border)"
                strokeDasharray="2 6"
                strokeWidth="1"
              />
              <text
                x="40"
                y={y + 4}
                fill="var(--page-text-3)"
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="10"
                textAnchor="end"
              >
                {[100, 80, 60, 40, 20][i]}%
              </text>
            </g>
          ))}

          <path
            ref={fillRef}
            d={`${buildPath()} L 1060 320 L 80 320 Z`}
            fill="url(#grade-gradient)"
            style={{ opacity: 0 }}
          />

          <path
            ref={pathRef}
            d={buildPath()}
            stroke="var(--page-accent)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {POINTS.map((p, i) => (
            <g
              key={i}
              ref={(el) => {
                markersRef.current[i] = el;
              }}
              style={{ opacity: 0.18 }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="var(--page-bg)"
                stroke="var(--page-accent)"
                strokeWidth="2"
              />
              <line
                x1={p.x}
                x2={p.x}
                y1={320}
                y2={335}
                stroke="var(--page-text-3)"
                strokeWidth="1"
              />
              <text
                x={p.x}
                y={350}
                fill="var(--page-text-2)"
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="10"
                letterSpacing="0.14em"
                textAnchor="middle"
              >
                {p.month}
              </text>
            </g>
          ))}

          <g ref={dotRef} transform={`translate(${POINTS[0].x} ${POINTS[0].y})`}>
            <circle r="14" fill="var(--page-accent)" opacity="0.2" />
            <circle r="8" fill="var(--page-accent)" stroke="var(--page-bg)" strokeWidth="3" />
          </g>
        </svg>
      </div>

      <p
        style={{
          position: "absolute",
          bottom: 24,
          left: 48,
          right: 48,
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--page-text-3)",
          margin: 0,
          textAlign: "center",
        }}
      >
        DATA · IGCSE COMPOSITE MATHS · ONE STUDENT · ANONYMISED
      </p>
    </section>
  );
}
