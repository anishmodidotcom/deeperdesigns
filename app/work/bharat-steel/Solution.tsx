"use client";

import { motion } from "motion/react";

type StockCard = {
  product: string;
  qty: string;
  status: string;
  dot: string;
  arrow: "up" | "flat" | "down";
};

const STOCKS: StockCard[] = [
  {
    product: "TMT Bars",
    qty: "142 tonnes",
    status: "In Stock",
    dot: "#22C55E",
    arrow: "up",
  },
  {
    product: "Steel Plates",
    qty: "89 tonnes",
    status: "Low Stock",
    dot: "#EAB308",
    arrow: "flat",
  },
  {
    product: "Angles & Channels",
    qty: "56 tonnes",
    status: "Reorder",
    dot: "#EF4444",
    arrow: "down",
  },
];

const ICON_PROPS = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ArrowGlyph({ dir, color }: { dir: "up" | "flat" | "down"; color: string }) {
  if (dir === "flat") {
    return (
      <svg {...ICON_PROPS} stroke={color} aria-hidden>
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    );
  }
  if (dir === "up") {
    return (
      <svg {...ICON_PROPS} stroke={color} aria-hidden>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="6 11 12 5 18 11" />
      </svg>
    );
  }
  return (
    <svg {...ICON_PROPS} stroke={color} aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="6 13 12 19 18 13" />
    </svg>
  );
}

const dashboardCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(59,130,246,0.1)",
  borderRadius: 6,
  padding: 20,
};

const productLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--page-text-2)",
  margin: 0,
};

const qtyStyle: React.CSSProperties = {
  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 28,
  color: "var(--page-text)",
  margin: 0,
  marginTop: 8,
  letterSpacing: "-0.02em",
  lineHeight: 1,
};

const monoLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--page-text-2)",
  margin: 0,
};

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginTop: 16 }}>
      <p style={monoLabelStyle}>{label}</p>
      <div
        style={{
          marginTop: 8,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 6,
          paddingInline: 14,
          paddingBlock: 12,
          fontSize: 14,
          color: "var(--page-text)",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{value}</span>
        <span style={{ color: "var(--page-text-2)", fontSize: 11 }}>▾</span>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 12,
        paddingBlock: 8,
        fontSize: 14,
        color: "var(--page-text-2)",
      }}
    >
      <span>{label}</span>
      <span style={{ color: "var(--page-text)", fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
    </div>
  );
}

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
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "var(--page-text)",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.02em",
            maxWidth: 800,
            marginBottom: 64,
          }}
        >
          One dashboard. Live stock, instant quotes.
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            background: "var(--page-surface)",
            border: "1px solid rgba(59,130,246,0.15)",
            borderRadius: 8,
            boxShadow: "0 0 80px rgba(59,130,246,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 24px",
              borderBottom: "1px solid rgba(59,130,246,0.1)",
              fontSize: 13,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                color: "var(--page-text)",
                letterSpacing: "0.06em",
              }}
            >
              Bharat Steel Corp
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--page-text-2)",
                fontSize: 12,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: "#22C55E",
                  boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                }}
              />
              Live
            </span>
          </div>

          <div style={{ padding: 24 }}>
            <div className="bs-stock-grid">
              {STOCKS.map((s) => (
                <div key={s.product} style={dashboardCardStyle}>
                  <p style={productLabelStyle}>{s.product}</p>
                  <p style={qtyStyle}>{s.qty}</p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 14,
                      fontSize: 13,
                      color: "var(--page-text-2)",
                    }}
                  >
                    <ArrowGlyph dir={s.arrow} color={s.dot} />
                    <span
                      aria-hidden
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 9999,
                        background: s.dot,
                      }}
                    />
                    <span>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bs-quote-grid">
              <div>
                <h3
                  style={{
                    fontFamily:
                      "var(--font-space-grotesk), system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--page-text)",
                    margin: 0,
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Quick Quote
                </h3>
                <MockField label="Product" value="12mm TMT Bar Fe500D" />
                <MockField label="Quantity" value="20 tonnes" />
                <MockField label="Destination" value="Rajkot, Gujarat" />
              </div>

              <div
                style={{
                  background: "rgba(59,130,246,0.04)",
                  border: "1px solid rgba(59,130,246,0.12)",
                  borderRadius: 6,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontFamily:
                      "var(--font-space-grotesk), system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--page-text)",
                    margin: 0,
                    marginBottom: 12,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Quote Summary
                </h3>
                <SummaryRow
                  label="Base Price"
                  value="Rs. 52,400/tonne"
                />
                <SummaryRow label="Quantity" value="20 tonnes" />
                <SummaryRow
                  label="Shipping (Ahmedabad to Rajkot)"
                  value="Rs. 1,200/tonne"
                />
                <div
                  aria-hidden
                  style={{
                    height: 1,
                    background: "rgba(59,130,246,0.15)",
                    marginBlock: 12,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--page-text-2)",
                    }}
                  >
                    Total Estimate
                  </span>
                  <span
                    style={{
                      fontFamily:
                        "var(--font-space-grotesk), system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 24,
                      color: "var(--page-accent)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Rs. 10,72,000
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--page-text-2)",
                    margin: 0,
                    marginTop: 12,
                  }}
                >
                  Prices updated 4 minutes ago.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 400,
            margin: "32px auto 0",
            background: "var(--page-surface)",
            borderRadius: 8,
            border: "1px solid rgba(59,130,246,0.15)",
            padding: 24,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--page-text-2)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            WAREHOUSE UPDATE
          </p>
          <div
            style={{
              background: "rgba(37,211,102,0.1)",
              borderRadius: 12,
              padding: 16,
              color: "var(--page-text)",
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            Received 28 tonnes TMT 12mm from Tata Steel. Slip attached.
          </div>
          <p
            style={{
              fontSize: 13,
              color: "var(--page-accent)",
              margin: 0,
              marginTop: 12,
            }}
          >
            AI processed. Inventory updated automatically.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .bs-stock-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        .bs-quote-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 720px) {
          .bs-stock-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .bs-quote-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
