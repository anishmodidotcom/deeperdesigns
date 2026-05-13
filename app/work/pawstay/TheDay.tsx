"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Activity = {
  time: string;
  label: string;
  note: string;
  dot?: "sage" | "amber" | "live";
  thumb?: string;
  thumbAlt?: string;
};

const ACTIVITY: Activity[] = [
  {
    time: "this morning",
    label: "DROP-OFF",
    note: "Bruno settled within four minutes",
    dot: "sage",
  },
  {
    time: "2 hours ago",
    label: "MORNING WALK",
    note: "Park loop, thirty minutes",
    thumb: "/images/pawstay/walk-outdoor.webp",
    thumbAlt: "Dogs walking through a leafy park at golden hour",
  },
  {
    time: "45 min ago",
    label: "LUNCH",
    note: "Half portion, normal appetite",
    dot: "amber",
  },
  {
    time: "12 min ago",
    label: "PLAY",
    note: "Twenty minutes with Max, the golden lab",
    thumb: "/images/pawstay/happy-dog-1.webp",
    thumbAlt: "Indie dog resting on a beige cushion",
  },
  {
    time: "Just now",
    label: "NAP",
    note: "Currently resting on the green cushion",
    dot: "live",
  },
];

function Dot({ kind }: { kind: "sage" | "amber" | "live" }) {
  if (kind === "live") {
    return (
      <motion.span
        aria-hidden
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 10,
          height: 10,
          borderRadius: 9999,
          background: "var(--page-accent)",
          boxShadow: "0 0 0 4px rgba(232,165,87,0.18)",
        }}
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{
        width: 10,
        height: 10,
        borderRadius: 9999,
        background: kind === "sage" ? "var(--page-accent-2)" : "var(--page-accent)",
      }}
    />
  );
}

export default function TheDay() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div
        className="container-x"
        style={{ textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE DAILY THREAD
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.6vw, 52px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 760,
            marginInline: "auto",
          }}
        >
          Everything she did today. As she does it.
        </motion.h2>

        <div className="ps-day-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="ps-phone-wrap"
          >
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                margin: "0 auto",
                background: "#0A0E0B",
                borderRadius: 48,
                border: "1px solid var(--page-border-2)",
                padding: 12,
                boxShadow:
                  "0 50px 100px -50px rgba(232,165,87,0.18), 0 0 0 1px rgba(255,255,255,0.02) inset",
              }}
            >
              <div
                style={{
                  background: "var(--page-surface-1)",
                  borderRadius: 38,
                  overflow: "hidden",
                  border: "1px solid var(--page-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingInline: 24,
                    paddingTop: 14,
                    paddingBottom: 8,
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 13,
                    color: "var(--page-text)",
                  }}
                >
                  <span>14:32</span>
                  <span aria-hidden style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ width: 16, height: 8, borderRadius: 2, border: "1px solid var(--page-text-2)" }} />
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    paddingInline: 20,
                    paddingBlock: 16,
                    borderBottom: "1px solid var(--page-border)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 44,
                      height: 44,
                      borderRadius: 9999,
                      overflow: "hidden",
                      border: "1px solid var(--page-accent)",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src="/images/pawstay/happy-dog-1.webp"
                      alt="Biscuit"
                      fill
                      sizes="44px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p
                      style={{
                        fontFamily:
                          "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "var(--page-text)",
                        margin: 0,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Today · Biscuit
                    </p>
                    <p
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 11,
                        color: "var(--page-text-3)",
                        margin: 0,
                        marginTop: 2,
                        letterSpacing: "0.08em",
                      }}
                    >
                      WEDNESDAY · 7 EVENTS
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    paddingInline: 20,
                    paddingBlock: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    textAlign: "left",
                  }}
                >
                  {ACTIVITY.map((a, i) => (
                    <motion.div
                      key={`${a.time}-${a.label}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.12,
                        ease: EASE,
                      }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          paddingTop: 6,
                          flexShrink: 0,
                        }}
                      >
                        {a.dot ? <Dot kind={a.dot} /> : (
                          <span
                            aria-hidden
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 9999,
                              background: "var(--page-border-2)",
                            }}
                          />
                        )}
                        {i < ACTIVITY.length - 1 && (
                          <span
                            aria-hidden
                            style={{
                              width: 1,
                              flex: 1,
                              background: "var(--page-border)",
                              minHeight: 26,
                              marginTop: 6,
                            }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 8,
                            fontFamily:
                              "var(--font-geist-mono), monospace",
                            fontSize: 11,
                            color: "var(--page-text-3)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          <span style={{ color: "var(--page-text-2)" }}>
                            {a.time}
                          </span>
                          <span aria-hidden>·</span>
                          <span style={{ color: "var(--page-accent)" }}>
                            {a.label}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--page-text)",
                            margin: 0,
                            marginTop: 4,
                            lineHeight: 1.4,
                          }}
                        >
                          {a.note}
                        </p>
                        {a.thumb && a.thumbAlt && (
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              aspectRatio: "16 / 10",
                              borderRadius: 8,
                              overflow: "hidden",
                              marginTop: 10,
                              border: "1px solid var(--page-border)",
                            }}
                          >
                            <Image
                              src={a.thumb}
                              alt={a.thumbAlt}
                              fill
                              sizes="280px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div
                  style={{
                    margin: 14,
                    background:
                      "linear-gradient(135deg, rgba(232,165,87,0.18), rgba(232,165,87,0.06))",
                    border: "1px solid rgba(232,165,87,0.3)",
                    borderRadius: 14,
                    paddingBlock: 14,
                    paddingInline: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "var(--page-accent)",
                    fontFamily:
                      "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  <span>View live camera</span>
                  <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="ps-day-caption"
          >
            She used to ask. Now she just opens the app.
          </motion.p>
        </div>
      </div>

      <style jsx>{`
        .ps-day-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        .ps-day-caption {
          display: none;
        }
        @media (min-width: 1024px) {
          .ps-day-grid {
            grid-template-columns: 1fr 1fr;
            gap: 96px;
            align-items: center;
          }
          .ps-day-caption {
            display: block;
            font-family: var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif;
            font-style: italic;
            font-weight: 500;
            font-size: clamp(22px, 2.6vw, 32px);
            color: var(--page-text);
            letter-spacing: -0.02em;
            line-height: 1.3;
            text-align: left;
            max-width: 360px;
            margin: 0;
          }
        }
      `}</style>
    </section>
  );
}
