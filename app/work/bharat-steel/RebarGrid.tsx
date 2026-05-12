"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DIAMETERS = [
  { mm: 6, kg: 0.222, count: 1240 },
  { mm: 8, kg: 0.395, count: 980 },
  { mm: 10, kg: 0.617, count: 1860 },
  { mm: 12, kg: 0.888, count: 2310 },
  { mm: 16, kg: 1.578, count: 1640 },
  { mm: 20, kg: 2.466, count: 720 },
  { mm: 25, kg: 3.854, count: 410 },
  { mm: 32, kg: 6.313, count: 180 },
];

export default function RebarGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) {
        setActiveIdx(DIAMETERS.length - 1);
        return;
      }
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          setActiveIdx(
            Math.min(
              DIAMETERS.length - 1,
              Math.floor(self.progress * DIAMETERS.length)
            )
          );
        },
      });
    },
    { scope: sectionRef }
  );

  const active = DIAMETERS[activeIdx];
  const totalCount = DIAMETERS.slice(0, activeIdx + 1).reduce(
    (sum, d) => sum + d.count,
    0
  );

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
        aria-hidden
        style={{ position: "absolute", inset: 0, opacity: 0.25 }}
      >
        <Image
          src="/images/bharat-steel/rebar-stack.webp"
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
              "radial-gradient(ellipse at center, rgba(10,13,18,0.55) 0%, rgba(10,13,18,0.95) 75%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 48px",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent)",
            margin: 0,
          }}
        >
          INVENTORY GRID · 8 DIAMETERS · TMT FE500D
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
          SCROLL · BUILD THE GRID
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "100px 48px 80px",
          gap: 48,
        }}
        className="bs-grid-stage"
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--page-text-2)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            CURRENT DIAMETER
          </p>
          <h2
            style={{
              fontFamily:
                "var(--font-space-grotesk), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(56px, 10vw, 144px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "var(--page-text)",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {active.mm}
            <span
              style={{
                fontSize: "0.4em",
                color: "var(--page-text-2)",
                marginLeft: 8,
              }}
            >
              MM
            </span>
          </h2>
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid rgba(122,138,158,0.18)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--page-text-2)",
                  margin: 0,
                  marginBottom: 6,
                }}
              >
                WEIGHT / METER
              </p>
              <p
                style={{
                  fontFamily:
                    "var(--font-space-grotesk), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 26,
                  color: "var(--page-text)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {active.kg.toFixed(3)} kg
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--page-text-2)",
                  margin: 0,
                  marginBottom: 6,
                }}
              >
                BARS IN YARD
              </p>
              <p
                style={{
                  fontFamily:
                    "var(--font-space-grotesk), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 26,
                  color: "var(--page-accent)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {active.count.toLocaleString()}
              </p>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--page-text-2)",
                margin: 0,
                marginBottom: 6,
              }}
            >
              TOTAL UNITS PRICED IN GRID
            </p>
            <p
              style={{
                fontFamily:
                  "var(--font-space-grotesk), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 36,
                color: "var(--page-text)",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {totalCount.toLocaleString()} bars
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
            alignSelf: "stretch",
            alignContent: "center",
          }}
        >
          {DIAMETERS.map((d, i) => {
            const active = i <= activeIdx;
            const ratio = (d.mm - 4) / 30;
            return (
              <div
                key={d.mm}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  background: active
                    ? "var(--page-surface)"
                    : "rgba(17,24,32,0.4)",
                  border: active
                    ? "1px solid rgba(96, 165, 250, 0.5)"
                    : "1px solid rgba(122,138,158,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  opacity: active ? 1 : 0.35,
                  transition: "opacity 0.4s ease, border 0.4s ease, background 0.4s ease",
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    width: `${Math.max(8, ratio * 70)}%`,
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    background: active
                      ? "var(--page-accent)"
                      : "rgba(122,138,158,0.3)",
                    boxShadow: active ? "0 0 24px rgba(59,130,246,0.4)" : "none",
                    transition: "background 0.4s ease, box-shadow 0.4s ease",
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    bottom: 6,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: active ? "var(--page-text)" : "var(--page-text-2)",
                    margin: 0,
                  }}
                >
                  {d.mm}mm
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.bs-grid-stage) {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
            gap: 24px !important;
            padding: 88px 24px 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
