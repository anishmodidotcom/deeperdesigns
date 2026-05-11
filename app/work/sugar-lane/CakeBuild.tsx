"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { label: "01 · The plate", note: "We start with a marble cake stand." },
  { label: "02 · Sponge base", note: "Three layers of vanilla bean sponge." },
  { label: "03 · The cream", note: "Vanilla mascarpone, lightly sweetened." },
  { label: "04 · The middle", note: "Whatever the brief asked for: pistachio, rose, lemon, chocolate." },
  { label: "05 · The top", note: "Buttercream piped, then dusted, then garnished by hand." },
  { label: "Yours.", note: "Forty-five minutes from oven to delivery van." },
];

export default function CakeBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<SVGGElement>(null);
  const layer1Ref = useRef<SVGGElement>(null);
  const creamRef = useRef<SVGGElement>(null);
  const layer2Ref = useRef<SVGGElement>(null);
  const layer3Ref = useRef<SVGGElement>(null);
  const topRef = useRef<SVGGElement>(null);
  const cherryRef = useRef<SVGGElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const layers = [
        plateRef.current,
        layer1Ref.current,
        creamRef.current,
        layer2Ref.current,
        layer3Ref.current,
        topRef.current,
        cherryRef.current,
      ];

      if (reduced) {
        layers.forEach((l) => {
          if (l) {
            l.style.opacity = "1";
            l.style.transform = "none";
          }
        });
        stepRefs.current.forEach((s) => {
          if (s) s.style.opacity = "1";
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      layers.forEach((layer, i) => {
        if (!layer) return;
        tl.fromTo(
          layer,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
          i * 0.9
        );
      });

      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        tl.fromTo(
          step,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, ease: "power2.out", duration: 0.6 },
          i * 0.9 + 0.4
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="the-cake"
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
          SECTION 02 · THE BUILD
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
          SCROLL · BUILD THE CAKE
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          alignItems: "center",
          padding: "120px 48px 80px",
        }}
        className="sl-cake-stage"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 480,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-body), 'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(34px, 4.6vw, 56px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--page-text)",
            }}
          >
            Watch one
            <br />
            <span
              style={{
                fontFamily:
                  "var(--font-display-script), 'Yellowtail', cursive",
                fontWeight: 400,
                fontSize: "1.2em",
                color: "var(--page-accent)",
              }}
            >
              come together.
            </span>
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.label}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 14,
                  alignItems: "baseline",
                  opacity: 0,
                  willChange: "transform, opacity",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--page-accent)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "var(--page-text-2)",
                    lineHeight: 1.5,
                  }}
                >
                  {step.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <svg
            viewBox="0 0 400 520"
            style={{ width: "min(420px, 90%)", height: "auto" }}
            aria-hidden
          >
            <g ref={cherryRef} style={{ opacity: 0, willChange: "transform, opacity" }}>
              <ellipse cx="200" cy="130" rx="14" ry="13" fill="#C9405A" />
              <path
                d="M 200 117 C 198 109, 205 102, 215 100"
                stroke="#6B7A3A"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <ellipse cx="218" cy="98" rx="6" ry="3" fill="#8B9F4C" transform="rotate(35 218 98)" />
            </g>

            <g ref={topRef} style={{ opacity: 0, willChange: "transform, opacity" }}>
              <path
                d="M 130 175 Q 135 145 155 150 Q 165 130 185 140 Q 200 120 215 140 Q 235 130 245 150 Q 265 145 270 175 Z"
                fill="#F2D4C9"
              />
              {[148, 168, 188, 208, 228, 248].map((x) => (
                <path
                  key={x}
                  d={`M ${x} 175 Q ${x + 5} 160 ${x + 10} 175`}
                  fill="#FFFFFF"
                  opacity="0.6"
                />
              ))}
            </g>

            <g ref={layer3Ref} style={{ opacity: 0, willChange: "transform, opacity" }}>
              <rect x="130" y="175" width="140" height="50" rx="4" fill="#F8E0DA" />
              <rect x="130" y="175" width="140" height="6" fill="#F2C0B6" />
              <rect x="130" y="219" width="140" height="6" fill="#F2C0B6" />
              {[140, 180, 220, 260].map((x) => (
                <circle key={x} cx={x} cy="200" r="2.5" fill="#C9405A" opacity="0.6" />
              ))}
            </g>

            <g ref={layer2Ref} style={{ opacity: 0, willChange: "transform, opacity" }}>
              <rect x="120" y="225" width="160" height="14" rx="2" fill="#F4C5B8" />
              <path
                d="M 120 232 Q 140 226 160 232 Q 180 226 200 232 Q 220 226 240 232 Q 260 226 280 232"
                stroke="#E8A290"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />
            </g>

            <g ref={creamRef} style={{ opacity: 0, willChange: "transform, opacity" }}>
              <rect x="125" y="239" width="150" height="56" rx="4" fill="#FFF1DC" />
              <rect x="125" y="239" width="150" height="6" fill="#F5DEB3" />
              <rect x="125" y="289" width="150" height="6" fill="#F5DEB3" />
              {[155, 185, 215, 245].map((x) => (
                <rect key={x} x={x - 4} y="260" width="8" height="14" rx="2" fill="#D2B48C" opacity="0.6" />
              ))}
            </g>

            <g ref={layer1Ref} style={{ opacity: 0, willChange: "transform, opacity" }}>
              <rect x="115" y="295" width="170" height="20" rx="2" fill="#F4C5B8" />
            </g>

            <g ref={plateRef} style={{ opacity: 0, willChange: "transform, opacity" }}>
              <ellipse cx="200" cy="345" rx="155" ry="22" fill="#FAF3EB" />
              <ellipse cx="200" cy="338" rx="150" ry="14" fill="#F0E5D8" />
              <ellipse cx="200" cy="335" rx="140" ry="10" fill="#FAF3EB" />
              <path
                d="M 60 360 Q 200 380 340 360"
                stroke="rgba(74,46,58,0.18)"
                strokeWidth="1"
                fill="none"
              />
            </g>

            <text
              x="200"
              y="450"
              textAnchor="middle"
              fontFamily="var(--font-display-script), 'Yellowtail', cursive"
              fontSize="36"
              fill="var(--page-accent)"
              opacity="0.9"
            >
              From scratch
            </text>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.sl-cake-stage) {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto 1fr;
            padding: 100px 24px 60px !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
