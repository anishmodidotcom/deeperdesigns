"use client";

import { useRef } from "react";

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: "847", label: "Runs" },
  { value: "23", label: "Wickets" },
  { value: "14", label: "Matches" },
  { value: "42.3", label: "Avg" },
  { value: "18.4", label: "Econ" },
  { value: "3", label: "50s" },
  { value: "92", label: "Fielding" },
  { value: "A+", label: "Attendance" },
  { value: "4.5", label: "Rating" },
];

const MAX_TILT = 8;

function Star({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="var(--page-accent-2)"
        aria-hidden
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22L12 18.56L5.82 22L7 14.14l-5 -4.87l6.91 -1.01L12 2z" />
      </svg>
    );
  }
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--page-text-2)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22L12 18.56L5.82 22L7 14.14l-5 -4.87l6.91 -1.01L12 2z" />
    </svg>
  );
}

export default function Card() {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const ry = Math.max(-MAX_TILT, Math.min(MAX_TILT, x * MAX_TILT * 2));
    const rx = Math.max(-MAX_TILT, Math.min(MAX_TILT, -y * MAX_TILT * 2));
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    el.style.transition = "transform 0.1s ease";
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.transition =
      "transform 0.5s var(--ease-spring, cubic-bezier(0.16, 1, 0.3, 1))";
  };

  return (
    <section style={{ paddingBlock: 128 }}>
      <div
        className="container-x"
        style={{
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE CONCEPT
        </p>

        <h2
          style={{
            fontFamily:
              "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "var(--page-text)",
            textTransform: "uppercase",
            letterSpacing: "-0.005em",
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 64,
            maxWidth: 720,
            marginInline: "auto",
          }}
        >
          Every player gets a card. Every card tells a story.
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            perspective: "1200px",
          }}
        >
          <div
            ref={cardRef}
            data-cursor="view"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="sv-card"
            style={
              {
                width: "100%",
                maxWidth: 320,
                aspectRatio: "2 / 3",
                background:
                  "linear-gradient(160deg, #0D1A0D 0%, #142814 50%, #0D1A0D 100%)",
                border: "2px solid rgba(74,222,128,0.35)",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow:
                  "0 20px 60px rgba(74,222,128,0.18), 0 0 1px rgba(74,222,128,0.3)",
                display: "flex",
                flexDirection: "column",
                transform:
                  "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                willChange: "transform",
                ["--rx" as string]: "0deg",
                ["--ry" as string]: "0deg",
              } as React.CSSProperties
            }
          >
            <div
              style={{
                position: "relative",
                flex: "0 0 40%",
                background:
                  "radial-gradient(ellipse at 50% 110%, rgba(74,222,128,0.18), transparent 65%), linear-gradient(180deg, #0F1F0F 0%, #163216 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingInline: 16,
                paddingBlock: 12,
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  fontFamily:
                    "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 80,
                  color: "var(--page-accent)",
                  opacity: 0.18,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                07
              </span>

              <span
                style={{
                  position: "relative",
                  fontFamily:
                    "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--page-text)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Arjun Malik
              </span>
              <span
                style={{
                  position: "relative",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  color: "var(--page-text-2)",
                  marginTop: 4,
                  letterSpacing: "0.04em",
                }}
              >
                All-Rounder · Under-16
              </span>
              <span
                style={{
                  position: "relative",
                  marginTop: 10,
                  background: "rgba(74,222,128,0.18)",
                  color: "var(--page-accent)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  paddingInline: 8,
                  paddingBlock: 2,
                  borderRadius: 10,
                }}
              >
                A-Team
              </span>
            </div>

            <div
              style={{
                flex: 1,
                background: "var(--page-surface)",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  rowGap: 10,
                  columnGap: 8,
                }}
              >
                {STATS.map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily:
                          "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
                        fontWeight: 700,
                        fontSize: 22,
                        color: "var(--page-accent)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 9,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--page-text-2)",
                        marginTop: 4,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(74,222,128,0.12)",
                  paddingTop: 10,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--page-text-2)",
                  }}
                >
                  Season Rating
                </span>
                <span style={{ display: "inline-flex", gap: 2 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} filled={i < 4} />
                  ))}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  color: "var(--page-text-2)",
                  fontStyle: "italic",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Coach Notes: Strong cover drive. Needs to work on short ball.
                Leadership potential.
              </p>

              <div
                style={{
                  marginTop: "auto",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--page-text-2)",
                  opacity: 0.5,
                  textAlign: "center",
                }}
              >
                STUMPVISION · 2025 SEASON
              </div>
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: 16,
            color: "var(--page-text-2)",
            maxWidth: 480,
            marginInline: "auto",
            marginTop: 32,
            margin: 0,
            marginBlockStart: 32,
            lineHeight: 1.6,
          }}
        >
          Kids obsess over their stats. Parents share the cards. Coaches
          use them for selection. The card does the marketing.
        </p>
      </div>

      <style jsx>{`
        @keyframes sv-card-rock {
          0% {
            transform: perspective(800px) rotateX(0deg) rotateY(-3deg);
          }
          50% {
            transform: perspective(800px) rotateX(2deg) rotateY(3deg);
          }
          100% {
            transform: perspective(800px) rotateX(0deg) rotateY(-3deg);
          }
        }
        @media (hover: none) and (pointer: coarse) {
          .sv-card {
            animation: sv-card-rock 4s ease-in-out infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sv-card {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
