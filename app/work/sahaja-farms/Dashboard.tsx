"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.4, 0, 0.2, 1] as const;

const NAV: { label: string; active?: boolean }[] = [
  { label: "Overview", active: true },
  { label: "Crops" },
  { label: "Subscribers" },
  { label: "Wholesale" },
  { label: "Restaurant" },
  { label: "Forecasts" },
];

type CropStatus = {
  name: string;
  note: string;
  color: string;
};

const CROPS: CropStatus[] = [
  { name: "Tomato Plot A", note: "Harvest in 4 days", color: "#6BA572" },
  { name: "Spinach Plot C", note: "Replant overdue", color: "#B85530" },
  { name: "Bottle Gourd", note: "Healthy", color: "#6BA572" },
  { name: "Beetroot Plot B", note: "Disease risk", color: "#E0A33A" },
  { name: "Lettuce Greenhouse 2", note: "Ready", color: "#6BA572" },
  { name: "Carrot Plot D", note: "Plant tomorrow", color: "#D4A537" },
];

type PlantRow = { name: string; weight: string; where: string };
const PLANT: PlantRow[] = [
  { name: "Tomatoes", weight: "220 kg", where: "Plot A row 4-6" },
  { name: "Spinach", weight: "80 kg", where: "Greenhouse 1" },
  { name: "Bottle gourd", weight: "110 kg", where: "Plot C row 2" },
  { name: "Coriander", weight: "30 kg", where: "Greenhouse 2 row 1" },
  { name: "Lettuce", weight: "45 kg", where: "Greenhouse 2 row 3" },
];

const INVENTORY: { name: string; qty: string; low?: boolean }[] = [
  { name: "Tomatoes", qty: "14 kg" },
  { name: "Onions", qty: "3 kg", low: true },
  { name: "Spinach", qty: "8 kg" },
  { name: "Paneer", qty: "2 kg", low: true },
  { name: "Brinjal", qty: "22 kg" },
];

const monoLabel: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--page-text-3)",
  margin: 0,
};

function Widget({ children }: { children: ReactNode }) {
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
      }}
    >
      {children}
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 220;
  const h = 56;
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
      width="100%"
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <polyline
        points={pts}
        stroke="var(--page-accent-2)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Dashboard() {
  return (
    <section id="dashboard" style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE COMMAND CENTER
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-bricolage), Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.8vw, 60px)",
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 880,
            fontVariationSettings: "'opsz' 96",
          }}
        >
          Every acre. Every crop. Every Sunday lunch in Bangalore.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.99, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            background: "var(--page-surface-2)",
            border: "1px solid var(--page-border)",
            borderRadius: 14,
            overflow: "hidden",
            position: "relative",
            boxShadow:
              "0 60px 130px -60px rgba(212,165,55,0.22), 0 0 0 1px rgba(212,165,55,0.04) inset",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.5,
              pointerEvents: "none",
            }}
          >
            <Image
              src="/images/sahaja-farms/dashboard-bg-organic.webp"
              alt=""
              role="presentation"
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
                gap: 14,
                paddingInline: 18,
                paddingBlock: 12,
                borderBottom: "1px solid var(--page-border)",
                background: "rgba(19,25,20,0.7)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-bricolage), Georgia, serif",
                    fontWeight: 500,
                    fontSize: 15,
                    color: "var(--page-text)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  sahaja
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
                  Mysore Farm · Plot 1
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
                    "linear-gradient(135deg, rgba(212,165,55,0.6), rgba(107,165,114,0.5))",
                  border: "1px solid var(--page-border-2)",
                }}
              />
            </div>

            <div className="sf-dash-grid">
              <aside
                className="sf-dash-sidebar"
                style={{
                  paddingBlock: 18,
                  paddingInline: 12,
                  borderRight: "1px solid var(--page-border)",
                  background: "rgba(19,25,20,0.45)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {NAV.map((n) => (
                  <div
                    key={n.label}
                    style={{
                      paddingInline: 10,
                      paddingBlock: 8,
                      borderRadius: 6,
                      background: n.active
                        ? "rgba(212,165,55,0.12)"
                        : "transparent",
                      color: n.active
                        ? "var(--page-text)"
                        : "var(--page-text-2)",
                      fontFamily:
                        "var(--font-bricolage), Georgia, serif",
                      fontSize: 13,
                      fontWeight: n.active ? 500 : 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {n.label}
                  </div>
                ))}
              </aside>

              <div
                className="sf-dash-main"
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
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p style={monoLabel}>Crop status</p>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        color: "var(--page-text-3)",
                      }}
                    >
                      6 of 14 plots
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
                    {CROPS.map((c) => (
                      <li
                        key={c.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontFamily:
                            "var(--font-bricolage), Georgia, serif",
                          fontSize: 13,
                          color: "var(--page-text)",
                          paddingBlock: 4,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 9999,
                            background: c.color,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1 }}>{c.name}</span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-geist-mono), monospace",
                            fontSize: 11,
                            color: "var(--page-text-2)",
                          }}
                        >
                          {c.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Widget>

                <Widget>
                  <p style={monoLabel}>Subscriber forecast · 12 weeks</p>
                  <Sparkline
                    data={[268, 290, 312, 330, 348, 360, 374, 386, 392, 401, 408, 412]}
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 12,
                    }}
                  >
                    {[
                      { label: "Active", value: "412", color: "var(--page-text)" },
                      { label: "At-risk", value: "23 (-)", color: "var(--page-accent-3)" },
                      { label: "Projected", value: "437 (+)", color: "var(--page-accent-2)" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p style={monoLabel}>{s.label}</p>
                        <p
                          style={{
                            fontFamily:
                              "var(--font-bricolage), Georgia, serif",
                            fontWeight: 600,
                            fontSize: 20,
                            letterSpacing: "-0.025em",
                            color: s.color,
                            margin: 0,
                            marginTop: 4,
                          }}
                        >
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Widget>

                <Widget>
                  <p style={monoLabel}>What to plant this week</p>
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
                    {PLANT.map((p) => (
                      <li
                        key={p.name}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1.1fr 0.7fr 1.4fr",
                          gap: 10,
                          fontFamily:
                            "var(--font-geist-mono), monospace",
                          fontSize: 11,
                          color: "var(--page-text-2)",
                          paddingBlock: 4,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--page-text)",
                            fontFamily:
                              "var(--font-bricolage), Georgia, serif",
                            fontSize: 13,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {p.name}
                        </span>
                        <span style={{ color: "var(--page-accent)" }}>
                          {p.weight}
                        </span>
                        <span>{p.where}</span>
                      </li>
                    ))}
                  </ul>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      color: "var(--page-text-3)",
                      margin: 0,
                      marginTop: 4,
                    }}
                  >
                    Last updated 06:14 from subscription orders
                  </p>
                </Widget>

                <Widget>
                  <p style={monoLabel}>Restaurant inventory</p>
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
                    {INVENTORY.map((i) => (
                      <li
                        key={i.name}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 10,
                          fontFamily:
                            "var(--font-bricolage), Georgia, serif",
                          fontSize: 13,
                          letterSpacing: "-0.01em",
                          color: i.low
                            ? "var(--page-accent-3)"
                            : "var(--page-text)",
                          paddingBlock: 4,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            aria-hidden
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: 9999,
                              background: i.low
                                ? "var(--page-accent-3)"
                                : "var(--page-accent-2)",
                            }}
                          />
                          {i.name}
                        </span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-geist-mono), monospace",
                            fontSize: 11,
                          }}
                        >
                          {i.qty}
                        </span>
                      </li>
                    ))}
                  </ul>
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
          Sahaja HQ · Live snapshot
        </p>
      </div>

      <style jsx>{`
        .sf-dash-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        .sf-dash-sidebar {
          display: none;
        }
        .sf-dash-main {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .sf-dash-grid {
            grid-template-columns: 200px 1fr;
          }
          .sf-dash-sidebar {
            display: flex;
          }
          .sf-dash-main {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
