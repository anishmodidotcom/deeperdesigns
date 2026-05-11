"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const monoLabel: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--page-text-3)",
  margin: 0,
};

const NAV_ITEMS: { label: string; icon: ReactNode; active?: boolean }[] = [
  { label: "Dashboard", icon: <NavGrid /> },
  { label: "Members", icon: <NavUsers /> },
  { label: "Rooms", icon: <NavRooms /> },
  { label: "Billing", icon: <NavBilling /> },
  { label: "Events", icon: <NavEvents /> },
  { label: "Insights", icon: <NavInsights />, active: true },
];

type AtRisk = {
  name: string;
  score: number;
  color: string;
};

const AT_RISK: AtRisk[] = [
  { name: "Priya M.", score: 92, color: "#22C55E" },
  { name: "Karthik R.", score: 64, color: "#EAB308" },
  { name: "Anjali S.", score: 41, color: "#F59E0B" },
  { name: "Vikram T.", score: 28, color: "#EF4444" },
  { name: "Rahul N.", score: 12, color: "#EF4444" },
];

const BOOKINGS = [
  { time: "9:00", duration: "60m", room: "Phoenix", member: "Karthik R." },
  { time: "10:00", duration: "30m", room: "Atlas", member: "Priya M." },
  { time: "11:30", duration: "90m", room: "Nimbus", member: "Anjali S." },
  { time: "13:00", duration: "60m", room: "Orbit", member: "Vikram T." },
  { time: "15:00", duration: "45m", room: "Phoenix", member: "Rahul N." },
  { time: "17:00", duration: "60m", room: "Atlas", member: "Meera D." },
];

const REVENUE_MONTHS = [
  { label: "Dec", new: 38, churn: 12 },
  { label: "Jan", new: 42, churn: 16 },
  { label: "Feb", new: 36, churn: 14 },
  { label: "Mar", new: 48, churn: 11 },
  { label: "Apr", new: 52, churn: 9 },
  { label: "May", new: 58, churn: 8 },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 96;
  const h = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={pts} />
    </svg>
  );
}

function PulseDot({ color = "var(--page-accent)" }: { color?: string }) {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 6,
        height: 6,
        borderRadius: 9999,
        background: color,
        flexShrink: 0,
      }}
    />
  );
}

function Widget({
  children,
  span,
  style,
}: {
  children: ReactNode;
  span?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "var(--page-surface-1)",
        border: "1px solid var(--page-border)",
        borderRadius: 10,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        gridColumn: span ? `span ${span}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  return (
    <section
      id="the-operating-system"
      style={{ paddingBlock: 144 }}
    >
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.25, ease: EASE }}
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
          THE OPERATING SYSTEM
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 820,
          }}
        >
          One dashboard. The whole floor. In real time.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.99, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            background: "var(--page-surface-2)",
            border: "1px solid var(--page-border)",
            borderRadius: 14,
            overflow: "hidden",
            position: "relative",
            boxShadow:
              "0 60px 140px -60px rgba(139,92,246,0.25), 0 0 0 1px rgba(139,92,246,0.04) inset",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.65,
              pointerEvents: "none",
            }}
          >
            <Image
              src="/images/hivedesk/dashboard-bg-texture.webp"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                paddingInline: 18,
                paddingBlock: 12,
                borderBottom: "1px solid var(--page-border)",
                background: "rgba(17,17,19,0.6)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "var(--page-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  hivedesk
                </span>
                <span
                  aria-hidden
                  style={{
                    width: 1,
                    height: 14,
                    background: "var(--page-border-2)",
                  }}
                />
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    color: "var(--page-text-2)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--page-border-2)",
                    paddingInline: 10,
                    paddingBlock: 4,
                    borderRadius: 6,
                  }}
                >
                  Indiranagar HQ
                  <span style={{ color: "var(--page-text-3)" }}>▾</span>
                </span>
              </div>

              <span
                aria-hidden
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 9999,
                  background:
                    "linear-gradient(135deg, rgba(167,139,250,0.6), rgba(139,92,246,0.4))",
                  border: "1px solid var(--page-border-2)",
                }}
              />
            </div>

            <div className="hd-dash-grid">
              <aside
                className="hd-dash-sidebar"
                style={{
                  paddingBlock: 18,
                  paddingInline: 12,
                  borderRight: "1px solid var(--page-border)",
                  background: "rgba(17,17,19,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {NAV_ITEMS.map((n) => (
                  <div
                    key={n.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      paddingInline: 10,
                      paddingBlock: 8,
                      borderRadius: 6,
                      background: n.active
                        ? "rgba(139,92,246,0.1)"
                        : "transparent",
                      color: n.active
                        ? "var(--page-text)"
                        : "var(--page-text-2)",
                      fontFamily:
                        "var(--font-inter), system-ui, sans-serif",
                      fontSize: 13,
                      fontWeight: n.active ? 500 : 400,
                    }}
                  >
                    {n.icon}
                    <span>{n.label}</span>
                  </div>
                ))}
              </aside>

              <div
                className="hd-dash-main"
                style={{
                  padding: 20,
                  display: "grid",
                  gap: 16,
                }}
              >
                <Widget>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <p style={monoLabel}>Live occupancy</p>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        color: "var(--page-text-2)",
                      }}
                    >
                      <PulseDot />
                      LIVE
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-inter), system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: 36,
                        letterSpacing: "-0.04em",
                        color: "var(--page-text)",
                        lineHeight: 1,
                      }}
                    >
                      84
                    </span>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-inter), system-ui, sans-serif",
                        fontSize: 16,
                        color: "var(--page-text-3)",
                      }}
                    >
                      / 120
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 9999,
                      background: "rgba(255,255,255,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "70%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, var(--page-accent), var(--page-accent-2))",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 10,
                      marginTop: 4,
                    }}
                  >
                    {[
                      {
                        label: "Today",
                        data: [40, 52, 48, 60, 72, 68, 84],
                      },
                      {
                        label: "Week",
                        data: [62, 70, 68, 74, 80, 78, 84],
                      },
                      {
                        label: "Month",
                        data: [54, 60, 66, 70, 72, 80, 84],
                      },
                    ].map((s) => (
                      <div key={s.label}>
                        <p style={{ ...monoLabel, marginBottom: 4 }}>
                          {s.label}
                        </p>
                        <Sparkline
                          data={s.data}
                          color="var(--page-accent)"
                        />
                      </div>
                    ))}
                  </div>
                </Widget>

                <Widget>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <p style={monoLabel}>
                      At-risk members · 4 need attention
                    </p>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        color: "var(--page-text-3)",
                      }}
                    >
                      Score &lt; 70
                    </span>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {AT_RISK.map((m) => (
                      <li
                        key={m.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontFamily:
                            "var(--font-inter), system-ui, sans-serif",
                          fontSize: 13,
                          color: "var(--page-text)",
                          paddingBlock: 4,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 9999,
                            background: m.color,
                          }}
                        />
                        <span style={{ flex: 1 }}>{m.name}</span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-geist-mono), monospace",
                            fontSize: 12,
                            color: "var(--page-text-2)",
                          }}
                        >
                          Score {m.score}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Widget>

                <Widget>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <p style={monoLabel}>Revenue waterfall · 6 months</p>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        color: "var(--page-text-3)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 2,
                            background: "var(--page-accent)",
                          }}
                        />
                        New
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 2,
                            background: "#EF4444",
                          }}
                        />
                        Churn
                      </span>
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${REVENUE_MONTHS.length}, 1fr)`,
                      gap: 10,
                      alignItems: "end",
                      height: 130,
                    }}
                  >
                    {REVENUE_MONTHS.map((m) => {
                      const total = m.new + m.churn;
                      const max = 70;
                      const newH = (m.new / max) * 100;
                      const churnH = (m.churn / max) * 100;
                      return (
                        <div
                          key={m.label}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 6,
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              width: "100%",
                              display: "flex",
                              flexDirection: "column-reverse",
                              gap: 2,
                              alignItems: "stretch",
                            }}
                            title={`${m.label}: +${m.new}, -${m.churn} (net ${
                              m.new - m.churn
                            })`}
                          >
                            <div
                              style={{
                                height: `${newH}%`,
                                background: "var(--page-accent)",
                                borderRadius: "3px 3px 1px 1px",
                              }}
                            />
                            <div
                              style={{
                                height: `${churnH}%`,
                                background: "rgba(239,68,68,0.65)",
                                borderRadius: "1px 1px 1px 1px",
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontFamily:
                                "var(--font-geist-mono), monospace",
                              fontSize: 10,
                              color: "var(--page-text-3)",
                            }}
                          >
                            {m.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Widget>

                <Widget>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <p style={monoLabel}>Today&rsquo;s bookings</p>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        color: "var(--page-text-3)",
                      }}
                    >
                      6 of 24 slots
                    </span>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {BOOKINGS.map((b) => (
                      <li
                        key={`${b.time}-${b.room}`}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto 1fr auto",
                          gap: 10,
                          alignItems: "center",
                          fontFamily:
                            "var(--font-geist-mono), monospace",
                          fontSize: 11,
                          color: "var(--page-text-2)",
                          paddingBlock: 4,
                          borderBottom:
                            "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <span style={{ color: "var(--page-text)" }}>
                          {b.time}
                        </span>
                        <span style={{ color: "var(--page-accent-2)" }}>
                          {b.duration}
                        </span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-inter), system-ui, sans-serif",
                            color: "var(--page-text)",
                          }}
                        >
                          {b.room}
                          <span
                            style={{
                              color: "var(--page-text-3)",
                              marginLeft: 8,
                            }}
                          >
                            {b.member}
                          </span>
                        </span>
                        <span
                          style={{
                            color: "var(--page-text-3)",
                            fontSize: 10,
                          }}
                        >
                          ●
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    data-cursor="pointer"
                    style={{
                      marginTop: 4,
                      background: "transparent",
                      color: "var(--page-accent-2)",
                      border: "1px dashed var(--page-border-2)",
                      borderRadius: 6,
                      paddingBlock: 8,
                      paddingInline: 12,
                      fontFamily:
                        "var(--font-inter), system-ui, sans-serif",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    + Book a room
                  </button>
                </Widget>
              </div>
            </div>
          </div>
        </motion.div>

        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-text-3)",
            textAlign: "center",
            margin: 0,
            marginTop: 24,
          }}
        >
          Indiranagar HQ · Monday, May 11 · Live snapshot
        </p>
      </div>

      <style jsx>{`
        .hd-dash-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr;
        }
        .hd-dash-sidebar {
          display: none;
        }
        .hd-dash-main {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .hd-dash-grid {
            grid-template-columns: 200px 1fr;
            grid-template-rows: 1fr;
          }
          .hd-dash-sidebar {
            display: flex;
          }
          .hd-dash-main {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function NavGrid() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}
function NavUsers() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="6" r="2.5" />
      <path d="M3 14a5 5 0 0 1 10 0" />
    </svg>
  );
}
function NavRooms() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="12" height="10" rx="1" />
      <line x1="2" y1="7" x2="14" y2="7" />
      <line x1="6" y1="3" x2="6" y2="13" />
    </svg>
  );
}
function NavBilling() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="12" height="8" rx="1" />
      <line x1="2" y1="7" x2="14" y2="7" />
    </svg>
  );
}
function NavEvents() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="12" height="11" rx="1" />
      <line x1="2" y1="6" x2="14" y2="6" />
      <line x1="6" y1="1.5" x2="6" y2="4.5" />
      <line x1="10" y1="1.5" x2="10" y2="4.5" />
    </svg>
  );
}
function NavInsights() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="2 12 6 8 9 11 14 4" />
    </svg>
  );
}
