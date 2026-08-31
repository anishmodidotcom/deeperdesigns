"use client";

import { motion } from "motion/react";

type Location = {
  name: string;
  orders: number;
  spark: number[];
  status: "good" | "warn";
};

const LOCATIONS: Location[] = [
  {
    name: "Sharjah Main",
    orders: 245,
    spark: [4, 6, 5, 8, 7, 10, 12, 11],
    status: "good",
  },
  {
    name: "Ajman City",
    orders: 187,
    spark: [3, 5, 4, 6, 5, 7, 8, 9],
    status: "warn",
  },
  {
    name: "Sharjah Industrial",
    orders: 156,
    spark: [5, 4, 6, 5, 4, 6, 7, 6],
    status: "good",
  },
  {
    name: "Ajman Corniche",
    orders: 203,
    spark: [4, 6, 7, 6, 8, 9, 10, 11],
    status: "good",
  },
];

type Row = {
  item: string;
  sold: string;
  revenue: string;
  cost: string;
  margin: string;
  marginColor?: string;
};

const ROWS: Row[] = [
  {
    item: "Beef Shawarma",
    sold: "180",
    revenue: "2,700",
    cost: "1,350",
    margin: "50%",
    marginColor: "#22C55E",
  },
  {
    item: "Chicken Plate",
    sold: "220",
    revenue: "5,500",
    cost: "3,300",
    margin: "40%",
  },
  {
    item: "Garlic Wrap",
    sold: "340",
    revenue: "4,760",
    cost: "4,200",
    margin: "11.8%",
    marginColor: "#EF4444",
  },
  {
    item: "Falafel Box",
    sold: "90",
    revenue: "1,350",
    cost: "540",
    margin: "60%",
    marginColor: "#22C55E",
  },
];

const FORECAST: { label: string; bar: number }[] = [
  { label: "Chicken: 120kg", bar: 80 },
  { label: "Bread: 800 pcs", bar: 60 },
  { label: "Vegetables: 45kg", bar: 40 },
  { label: "Sauces: 25L", bar: 30 },
];

function Sparkline({ data }: { data: number[] }) {
  const w = 80;
  const h = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const points = data
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
      stroke="var(--page-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={points} />
    </svg>
  );
}

const monoLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--page-text-2)",
  margin: 0,
};

export default function Solution() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
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
          THE SOLUTION
        </p>

        <h2
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            color: "var(--page-text)",
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 64,
            maxWidth: 800,
          }}
        >
          One dashboard to run all four locations.
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "var(--page-surface)",
            border: "1px solid rgba(232,93,42,0.15)",
            borderRadius: 12,
            boxShadow: "0 0 80px rgba(232,93,42,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "16px 24px",
              borderBottom: "1px solid rgba(232,93,42,0.1)",
              flexWrap: "wrap",
              fontSize: 13,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "var(--page-text)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontWeight: 700,
                }}
              >
                Zaatar Republic HQ
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 12,
                  color: "var(--page-text-2)",
                  border: "1px solid rgba(232,93,42,0.2)",
                  borderRadius: 6,
                  paddingInline: 10,
                  paddingBlock: 4,
                }}
              >
                All Locations ▾
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "var(--page-text-2)",
                fontSize: 12,
              }}
            >
              <span>Today</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 9999,
                    background: "#22C55E",
                    boxShadow: "0 0 6px rgba(34,197,94,0.7)",
                  }}
                />
                Live
              </span>
            </div>
          </div>

          <div style={{ padding: 24 }}>
            <div className="zr-loc-grid">
              {LOCATIONS.map((l) => (
                <div
                  key={l.name}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(232,93,42,0.08)",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <p style={monoLabelStyle}>{l.name}</p>
                    <span
                      aria-hidden
                      title={l.status === "good" ? "Healthy" : "Chicken running low"}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 9999,
                        background: l.status === "good" ? "#22C55E" : "#EAB308",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 26,
                      letterSpacing: "-0.02em",
                      color: "var(--page-text)",
                      margin: 0,
                      marginTop: 4,
                    }}
                  >
                    {l.orders}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      color: "var(--page-text-2)",
                      margin: 0,
                      marginTop: 2,
                    }}
                  >
                    orders today
                  </p>
                  <div style={{ marginTop: 12 }}>
                    <Sparkline data={l.spark} />
                  </div>
                </div>
              ))}
            </div>

            <div className="zr-split-grid" style={{ marginTop: 24 }}>
              <div>
                <p
                  style={{
                    ...monoLabelStyle,
                    marginBottom: 12,
                  }}
                >
                  Unit Economics
                </p>
                <div
                  role="table"
                  style={{
                    border: "1px solid rgba(232,93,42,0.1)",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    role="row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.5fr 0.8fr 1fr 1fr 0.8fr",
                      gap: 12,
                      padding: "10px 14px",
                      background: "rgba(232,93,42,0.05)",
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--page-text-2)",
                    }}
                  >
                    <span>Item</span>
                    <span style={{ textAlign: "right" }}>Sold</span>
                    <span style={{ textAlign: "right" }}>Revenue</span>
                    <span style={{ textAlign: "right" }}>Cost</span>
                    <span style={{ textAlign: "right" }}>Margin</span>
                  </div>
                  {ROWS.map((r, i) => (
                    <div
                      key={r.item}
                      role="row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 0.8fr 1fr 1fr 0.8fr",
                        gap: 12,
                        padding: "10px 14px",
                        borderTop:
                          i === 0
                            ? "none"
                            : "1px solid rgba(232,93,42,0.08)",
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 12,
                        color: "var(--page-text)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      <span style={{ color: "var(--page-text)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
                        {r.item}
                      </span>
                      <span style={{ textAlign: "right", color: "var(--page-text-2)" }}>
                        {r.sold}
                      </span>
                      <span style={{ textAlign: "right" }}>{r.revenue}</span>
                      <span style={{ textAlign: "right", color: "var(--page-text-2)" }}>
                        {r.cost}
                      </span>
                      <span
                        style={{
                          textAlign: "right",
                          color: r.marginColor ?? "var(--page-text)",
                        }}
                      >
                        {r.margin}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p
                  style={{
                    ...monoLabelStyle,
                    marginBottom: 12,
                  }}
                >
                  Demand Forecast (Tomorrow)
                </p>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(232,93,42,0.08)",
                    borderRadius: 8,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {FORECAST.map((f) => (
                    <div key={f.label}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 13,
                          color: "var(--page-text)",
                          marginBottom: 6,
                          fontFamily:
                            "var(--font-geist-mono), monospace",
                        }}
                      >
                        <span>{f.label}</span>
                        <span style={{ color: "var(--page-text-2)" }}>
                          {f.bar}%
                        </span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: 24,
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${f.bar}%`,
                            height: "100%",
                            background:
                              "linear-gradient(90deg, var(--page-accent), var(--page-accent-2))",
                            borderRadius: 4,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--page-text-2)",
                      margin: 0,
                      marginTop: 4,
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                    }}
                  >
                    Based on same day last week + 12% Thursday uplift.
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                background: "rgba(232,93,42,0.1)",
                borderLeft: "3px solid var(--page-accent)",
                borderRadius: "0 8px 8px 0",
                padding: 16,
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 9999,
                  background: "var(--page-accent)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {/* v28: the decorative glyph is gone. Zero emojis or
                    decorative characters sitewide; the marker is now drawn,
                    using the same dot idiom as the rest of the site. */}
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "block",
                  }}
                />
              </span>
              <div>
                <p
                  style={{
                    fontFamily:
                      "var(--font-dm-sans), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--page-text)",
                    margin: 0,
                    marginBottom: 4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Smart Pricing Opportunity
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--page-text-2)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Falafel Box has 60% margin but lowest sales. Recommended:
                  Launch &ldquo;Falafel Friday&rdquo; combo at 25 AED (current
                  15 AED box + drink + fries). Projected margin: 45% on higher
                  volume.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .zr-loc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .zr-split-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 720px) {
          .zr-loc-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (min-width: 900px) {
          .zr-split-grid {
            grid-template-columns: 1.4fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
