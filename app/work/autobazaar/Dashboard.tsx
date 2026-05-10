"use client";

import { motion } from "motion/react";

const monoLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--page-text-2)",
  margin: 0,
};

type Stat = {
  label: string;
  value: string;
  trend: { glyph: string; color: string } | null;
};

const STATS: Stat[] = [
  {
    label: "Avg. Days on Lot",
    value: "34",
    trend: { glyph: "↓", color: "#22C55E" },
  },
  {
    label: "Avg. Margin",
    value: "18.4%",
    trend: { glyph: "↑", color: "#22C55E" },
  },
  {
    label: "Cars Over 60 Days",
    value: "4",
    trend: { glyph: "!", color: "#EAB308" },
  },
  {
    label: "Test Drives This Week",
    value: "12",
    trend: null,
  },
];

type Listing = {
  name: string;
  price: string;
  meta: string;
  hue: string;
};

const LISTINGS: Listing[] = [
  {
    name: "2021 Honda Civic",
    price: "AED 38,500",
    meta: "Low Mileage · Service History · 1 Owner",
    hue: "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(34,211,238,0.04))",
  },
  {
    name: "2020 Nissan Patrol",
    price: "AED 89,000",
    meta: "Full Option · GCC Spec",
    hue: "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.04))",
  },
];

type PriceRow = {
  car: string;
  yours: string;
  market: string;
  delta: "above" | "below" | "at";
  rec: string;
};

const PRICE_ROWS: PriceRow[] = [
  {
    car: "2018 Patrol",
    yours: "AED 75,000",
    market: "AED 70,200",
    delta: "above",
    rec: "Reduce by 5%",
  },
  {
    car: "2021 Civic",
    yours: "AED 38,500",
    market: "AED 38,800",
    delta: "at",
    rec: "Hold",
  },
  {
    car: "2017 Sentra",
    yours: "AED 24,000",
    market: "AED 27,500",
    delta: "below",
    rec: "Lift 4%",
  },
];

function deltaColor(d: PriceRow["delta"]) {
  if (d === "above") return "#EF4444";
  if (d === "below") return "#22C55E";
  return "var(--page-text-2)";
}

function deltaLabel(d: PriceRow["delta"]) {
  if (d === "above") return "Above";
  if (d === "below") return "Below";
  return "At market";
}

function PreviewCard({ listing }: { listing: Listing }) {
  return (
    <article
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(34,211,238,0.1)",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        aria-hidden
        style={{
          height: 96,
          background: listing.hue,
          borderBottom: "1px solid rgba(34,211,238,0.08)",
        }}
      />
      <div style={{ padding: 14 }}>
        <p
          style={{
            fontFamily:
              "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--page-text)",
            margin: 0,
            letterSpacing: "-0.005em",
          }}
        >
          {listing.name}
        </p>
        <p
          style={{
            fontFamily:
              "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: "var(--page-accent)",
            letterSpacing: "-0.02em",
            margin: 0,
            marginTop: 2,
            lineHeight: 1,
          }}
        >
          {listing.price}
        </p>
        <p
          style={{
            fontSize: 11,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 8,
            lineHeight: 1.4,
          }}
        >
          {listing.meta}
        </p>
        <button
          type="button"
          data-cursor="pointer"
          style={{
            marginTop: 14,
            background: "var(--page-accent)",
            color: "#08080C",
            border: "none",
            borderRadius: 6,
            paddingBlock: 8,
            paddingInline: 14,
            fontSize: 12,
            fontWeight: 600,
            fontFamily:
              "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
            letterSpacing: "0.02em",
            cursor: "pointer",
          }}
        >
          Book Test Drive
        </button>
      </div>
    </article>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(34,211,238,0.12)",
        borderRadius: 6,
        paddingInline: 12,
        paddingBlock: 8,
        fontSize: 12,
        color: "var(--page-text)",
        fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "0.04em",
      }}
    >
      {label}
      <span style={{ color: "var(--page-text-2)" }}>▾</span>
    </span>
  );
}

export default function Dashboard() {
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
          THE PLATFORM
        </p>

        <h2
          style={{
            fontFamily:
              "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.04em",
            color: "var(--page-text)",
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 64,
            maxWidth: 700,
          }}
        >
          One screen. Every car. Every price.
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            background: "var(--page-surface)",
            border: "1px solid rgba(34,211,238,0.12)",
            borderRadius: 8,
            boxShadow: "0 0 80px rgba(34,211,238,0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              padding: "16px 24px",
              borderBottom: "1px solid rgba(34,211,238,0.1)",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              color: "var(--page-text-2)",
              letterSpacing: "0.06em",
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: "var(--page-text)" }}>
              AutoBazaar Inventory Manager
            </span>
            <span>60 Cars · AED 3.2M Total Value</span>
          </div>

          <div style={{ padding: 24 }}>
            <div className="ab-stats">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(34,211,238,0.08)",
                    borderRadius: 6,
                    padding: 16,
                  }}
                >
                  <p style={monoLabelStyle}>{s.label}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                        fontWeight: 800,
                        fontSize: 24,
                        color: "var(--page-text)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </span>
                    {s.trend && (
                      <span
                        style={{
                          color: s.trend.color,
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily:
                            "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                        }}
                      >
                        {s.trend.glyph}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 24,
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(34,211,238,0.08)",
                borderRadius: 8,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                <p style={monoLabelStyle}>Buyer Landing Page</p>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--page-text-2)",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  autobazaar.ae
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                <FilterPill label="Make" />
                <FilterPill label="Budget" />
                <FilterPill label="Year" />
                <FilterPill label="Mileage" />
              </div>

              <div className="ab-listings">
                {LISTINGS.map((l) => (
                  <PreviewCard key={l.name} listing={l} />
                ))}
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <p style={monoLabelStyle}>Price Intelligence</p>
              <div
                style={{
                  marginTop: 12,
                  border: "1px solid rgba(34,211,238,0.1)",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <div
                  role="row"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1.4fr 1fr 1fr 0.9fr 1.1fr",
                    gap: 12,
                    padding: "10px 14px",
                    background: "rgba(34,211,238,0.05)",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--page-text-2)",
                  }}
                >
                  <span>Car</span>
                  <span style={{ textAlign: "right" }}>Your Price</span>
                  <span style={{ textAlign: "right" }}>Market Avg</span>
                  <span style={{ textAlign: "right" }}>Delta</span>
                  <span style={{ textAlign: "right" }}>Recommendation</span>
                </div>
                {PRICE_ROWS.map((r, i) => (
                  <div
                    key={r.car}
                    role="row"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1.4fr 1fr 1fr 0.9fr 1.1fr",
                      gap: 12,
                      padding: "10px 14px",
                      borderTop:
                        i === 0
                          ? "none"
                          : "1px solid rgba(34,211,238,0.08)",
                      fontSize: 12,
                      color: "var(--page-text)",
                      fontVariantNumeric: "tabular-nums",
                      fontFamily:
                        "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                    }}
                  >
                    <span>{r.car}</span>
                    <span style={{ textAlign: "right" }}>{r.yours}</span>
                    <span
                      style={{
                        textAlign: "right",
                        color: "var(--page-text-2)",
                      }}
                    >
                      {r.market}
                    </span>
                    <span
                      style={{
                        textAlign: "right",
                        color: deltaColor(r.delta),
                        fontWeight: 600,
                      }}
                    >
                      {deltaLabel(r.delta)}
                    </span>
                    <span
                      style={{
                        textAlign: "right",
                        color: "var(--page-accent)",
                      }}
                    >
                      {r.rec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .ab-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .ab-listings {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 720px) {
          .ab-stats {
            grid-template-columns: repeat(4, 1fr);
          }
          .ab-listings {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
