"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SOFT = [0.4, 0, 0.6, 1] as const;

// Hand-tuned altitude curve representing a 4-day Markha Valley trek
// profile: starts at 3,500m, drops to 3,400m, climbs to 4,200m, dips,
// summits at 5,200m, descends. The viewBox is 1200x300; baseline is
// the bottom (y=260 = altitude floor), peak at y=20 = 5,200m.
const PATH = "M 40 240 L 160 244 L 280 200 L 380 196 L 480 130 L 580 145 L 720 100 L 860 70 L 980 30 L 1100 60 L 1160 90";
const PATH_LENGTH = 1380;

// Approximate path-progress to altitude mapping (sampled along the curve)
const ALTITUDES = [
  3500, 3490, 3540, 3580, 3700, 3850, 3950, 4100, 4200, 4250, 4350,
  4500, 4650, 4800, 4950, 5050, 5200, 5150, 5050, 4950,
];

const DAYS = [
  { x: 60, label: "DAY 01", alt: "3,500m" },
  { x: 380, label: "DAY 02", alt: "4,200m" },
  { x: 720, label: "DAY 03", alt: "4,800m" },
  { x: 980, label: "PASS", alt: "5,200m" },
];

export default function Climb() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [altitude, setAltitude] = useState(3500);
  const [day, setDay] = useState(1);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) {
        if (pathRef.current) {
          pathRef.current.style.strokeDashoffset = "0";
        }
        setAltitude(5200);
        return;
      }

      const path = pathRef.current;
      const dot = dotRef.current;
      if (!path || !dot) return;

      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;

      const proxy = { progress: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          proxy.progress = self.progress;
          path.style.strokeDashoffset = `${len * (1 - self.progress)}`;
          const pos = path.getPointAtLength(len * self.progress);
          dot.setAttribute("cx", String(pos.x));
          dot.setAttribute("cy", String(pos.y));
          const altIndex = Math.min(
            ALTITUDES.length - 1,
            Math.floor(self.progress * ALTITUDES.length)
          );
          setAltitude(ALTITUDES[altIndex]);
          if (self.progress < 0.25) setDay(1);
          else if (self.progress < 0.55) setDay(2);
          else if (self.progress < 0.8) setDay(3);
          else setDay(4);
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--page-surface-1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "0 48px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent-deep)",
            margin: 0,
          }}
        >
          SECTION 02 · THE CLIMB · MARKHA VALLEY
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text-3)",
            margin: 0,
          }}
        >
          SCROLL · GAIN ALTITUDE
        </p>
      </div>

      <div
        ref={headlineRef}
        style={{
          position: "absolute",
          top: "16%",
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
              fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--page-text-3)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            CURRENT · DAY 0{day}
          </p>
          <h2
            style={{
              fontFamily:
                "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 84px)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "var(--page-text)",
              margin: 0,
            }}
          >
            {altitude.toLocaleString()}
            <span
              style={{
                fontSize: "0.45em",
                marginLeft: 8,
                color: "var(--page-text-3)",
              }}
            >
              m
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
              fontFamily:
                "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(20px, 2.4vw, 28px)",
              color: "var(--page-text-2)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Higher than every cloud you have ever stood under.
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: "45%",
          padding: "0 48px",
        }}
      >
        <svg
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
          aria-hidden
        >
          <defs>
            <linearGradient id="ridge-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--page-accent)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--page-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line
            x1="40"
            x2="1160"
            y1="260"
            y2="260"
            stroke="var(--page-border)"
            strokeDasharray="2 4"
            strokeWidth="1"
          />
          <line
            x1="40"
            x2="1160"
            y1="180"
            y2="180"
            stroke="var(--page-border)"
            strokeDasharray="2 4"
            strokeWidth="1"
          />
          <line
            x1="40"
            x2="1160"
            y1="100"
            y2="100"
            stroke="var(--page-border)"
            strokeDasharray="2 4"
            strokeWidth="1"
          />

          {[
            { y: 260, label: "3,500m" },
            { y: 180, label: "4,200m" },
            { y: 100, label: "4,800m" },
            { y: 30, label: "5,200m" },
          ].map((mark) => (
            <text
              key={mark.label}
              x="40"
              y={mark.y - 6}
              fill="var(--page-text-3)"
              fontFamily="var(--font-mono-tech), 'IBM Plex Mono', monospace"
              fontSize="10"
              letterSpacing="0.1em"
            >
              {mark.label}
            </text>
          ))}

          <path
            d={`${PATH} L 1160 260 L 40 260 Z`}
            fill="url(#ridge-fade)"
          />

          <path
            ref={pathRef}
            d={PATH}
            stroke="var(--page-accent-deep)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: PATH_LENGTH,
              strokeDashoffset: PATH_LENGTH,
            }}
          />

          {DAYS.map((d) => (
            <g key={d.label}>
              <line
                x1={d.x}
                x2={d.x}
                y1={260}
                y2={280}
                stroke="var(--page-text-3)"
                strokeWidth="1"
              />
              <text
                x={d.x}
                y={295}
                fill="var(--page-text-3)"
                fontFamily="var(--font-mono-tech), 'IBM Plex Mono', monospace"
                fontSize="9"
                letterSpacing="0.12em"
                textAnchor="middle"
              >
                {d.label}
              </text>
            </g>
          ))}

          <circle
            ref={dotRef}
            cx="40"
            cy="240"
            r="7"
            fill="var(--page-accent)"
            stroke="var(--page-bg)"
            strokeWidth="3"
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          position: "absolute",
          bottom: 24,
          left: 48,
          right: 48,
          fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.16em",
          color: "var(--page-text-3)",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>04 DAYS · 62 KM · MAX 5,200M</span>
        <span>LADAKH · INDIA</span>
      </motion.div>
    </section>
  );
}
