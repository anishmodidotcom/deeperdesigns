"use client";

import { motion } from "motion/react";

const EASE = [0.7, 0, 0.2, 1] as const;

const EXERCISES: { name: string; sets: string; checked: boolean }[] = [
  { name: "BARBELL BENCH PRESS", sets: "4 × 8", checked: true },
  { name: "INCLINE DUMBBELL PRESS", sets: "3 × 10", checked: true },
  { name: "CABLE FLY", sets: "3 × 12", checked: false },
  { name: "LATERAL RAISE", sets: "4 × 12", checked: false },
  { name: "TRICEP PUSHDOWN", sets: "3 × 15", checked: false },
  { name: "OVERHEAD EXTENSION", sets: "3 × 12", checked: false },
];

type Anno = {
  label: string;
  top: string;
  side: "left" | "right";
  hidden?: boolean;
};

const ANNOTATIONS: Anno[] = [
  { label: "AUTO-PROGRESSION", top: "26%", side: "right" },
  { label: "CHAT WITH ZARA", top: "8%", side: "left" },
  { label: "VIDEO DEMO ON TAP", top: "46%", side: "left" },
  { label: "AUTO-LOG TO HEALTHKIT", top: "86%", side: "right" },
];

export default function Platform() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text-2)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            margin: 0,
            marginBottom: 28,
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
          THE PLATFORM
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-anton), Impact, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(48px, 9vw, 120px)",
            letterSpacing: "-0.01em",
            lineHeight: 0.92,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 96,
            textTransform: "uppercase",
            maxWidth: 1100,
          }}
        >
          Every workout. On her phone. Every day.
        </motion.h2>

        <div
          className="zf-platform-wrap"
          style={{
            position: "relative",
            maxWidth: 1080,
            marginInline: "auto",
            paddingBlock: 64,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 320,
              margin: "0 auto",
              aspectRatio: "9 / 19.5",
              background: "#070707",
              border: "1px solid var(--page-accent)",
              borderRadius: 38,
              padding: 10,
              boxShadow:
                "0 60px 120px -60px rgba(215,255,92,0.25), 0 0 0 1px rgba(255,255,255,0.04) inset",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: "var(--page-surface-1)",
                borderRadius: 32,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingInline: 22,
                  paddingTop: 14,
                  paddingBottom: 6,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 13,
                  color: "var(--page-text)",
                }}
              >
                <span>06:42</span>
                <span aria-hidden style={{ display: "flex", gap: 4 }}>
                  <span
                    style={{
                      width: 16,
                      height: 8,
                      borderRadius: 2,
                      border: "1px solid var(--page-text-2)",
                    }}
                  />
                </span>
              </div>

              <div
                style={{
                  paddingInline: 22,
                  paddingTop: 14,
                  paddingBottom: 18,
                  borderBottom: "1px solid var(--page-border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    color: "var(--page-text-3)",
                    margin: 0,
                    letterSpacing: "0.14em",
                  }}
                >
                  TODAY
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-anton), Impact, sans-serif",
                    fontWeight: 400,
                    fontSize: 38,
                    lineHeight: 1,
                    color: "var(--page-accent)",
                    margin: 0,
                    marginTop: 6,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                  }}
                >
                  UPPER BODY
                </p>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {EXERCISES.map((e, i) => (
                  <li
                    key={e.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      paddingInline: 22,
                      paddingBlock: 12,
                      borderBottom:
                        i < EXERCISES.length - 1
                          ? "1px solid var(--page-border)"
                          : "none",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily:
                            "var(--font-geist-sans), system-ui, sans-serif",
                          fontWeight: 600,
                          fontSize: 11,
                          letterSpacing: "0.05em",
                          color: "var(--page-text)",
                          margin: 0,
                          textTransform: "uppercase",
                        }}
                      >
                        {e.name}
                      </p>
                      <p
                        style={{
                          fontFamily:
                            "var(--font-geist-mono), monospace",
                          fontSize: 11,
                          color: "var(--page-text-3)",
                          margin: 0,
                          marginTop: 2,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {e.sets}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      style={{
                        width: 18,
                        height: 18,
                        border: "1px solid var(--page-border)",
                        background: e.checked
                          ? "var(--page-accent)"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0E0E0E",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {e.checked ? "●" : ""}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  padding: 16,
                  borderTop: "1px solid var(--page-border)",
                }}
              >
                <button
                  type="button"
                  data-cursor="pointer"
                  style={{
                    width: "100%",
                    paddingBlock: 14,
                    background: "var(--page-accent)",
                    color: "#0E0E0E",
                    border: "none",
                    borderRadius: 999,
                    fontFamily:
                      "var(--font-anton), Impact, sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  START WORKOUT
                </button>
              </div>
            </div>
          </motion.div>

          {ANNOTATIONS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, x: a.side === "left" ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.12,
                ease: EASE,
              }}
              className={`zf-anno zf-anno-${a.side}`}
              style={{
                top: a.top,
              }}
            >
              {a.side === "left" && (
                <span aria-hidden className="zf-anno-arm" />
              )}
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  color: "var(--page-accent)",
                  whiteSpace: "nowrap",
                }}
              >
                {a.label}
              </span>
              {a.side === "right" && (
                <span aria-hidden className="zf-anno-arm" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .zf-anno {
          display: none;
        }
        @media (min-width: 1024px) {
          .zf-anno {
            position: absolute;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .zf-anno-left {
            right: calc(50% + 200px);
          }
          .zf-anno-right {
            left: calc(50% + 200px);
          }
          .zf-anno-arm {
            width: 60px;
            height: 1px;
            background: var(--page-accent);
          }
        }
      `}</style>
    </section>
  );
}
