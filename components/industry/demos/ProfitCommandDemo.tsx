// Profit Command demo.
// A dashboard panel: three KPI tiles, a daily contribution-margin bar
// series with two muted "leak" days, and an RTO-by-pincode list with
// proportional bars. Money figures use --page-money.

const KPIS = [
  { label: "NET REVENUE", value: "₹18.4L", delta: "+12%", up: true },
  { label: "REAL CM2", value: "₹4.1L", delta: "22.3% margin", up: true },
  { label: "RTO LOSS", value: "₹1.6L", delta: "8.7% of orders", up: false },
];

// Daily contribution margin. Two early days are "leak" days (muted).
const BARS = [
  { h: 38, leak: true },
  { h: 30, leak: true },
  { h: 52, leak: false },
  { h: 61, leak: false },
  { h: 70, leak: false },
  { h: 82, leak: false },
  { h: 96, leak: false },
];

const PINCODES = [
  { code: "110045", rto: 31, tone: "warning" as const },
  { code: "560102", rto: 18, tone: "mid" as const },
  { code: "400703", rto: 6, tone: "positive" as const },
];

const TONE: Record<string, string> = {
  warning: "#E5484D",
  mid: "#F5B544",
  positive: "#2FB46A",
};

export default function ProfitCommandDemo() {
  return (
    <div
      data-demo="profit-command"
      style={{
        width: "100%",
        borderRadius: 18,
        border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        background: "var(--dd-surface-1, #111111)",
        padding: "20px 20px 22px",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--dd-text-mid, #A8A8A8)",
          }}
        >
          PROFIT COMMAND
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "var(--page-accent)",
          }}
        >
          LAST 7 DAYS
        </span>
      </div>

      {/* KPI tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 22,
        }}
      >
        {KPIS.map((k) => (
          <div
            key={k.label}
            style={{
              background: "var(--dd-surface-2, #161616)",
              border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
              borderRadius: 12,
              padding: "12px 12px 13px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 9.5,
                letterSpacing: "0.1em",
                color: "var(--dd-text-low, #808080)",
              }}
            >
              {k.label}
            </p>
            <p
              style={{
                margin: "8px 0 4px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--page-money)",
              }}
            >
              {k.value}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: k.up ? "#2FB46A" : "#E5484D",
              }}
            >
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Daily contribution-margin bars */}
      <p
        style={{
          margin: "0 0 10px",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          color: "var(--dd-text-low, #808080)",
        }}
      >
        DAILY CONTRIBUTION MARGIN
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          height: 96,
          marginBottom: 22,
        }}
      >
        {BARS.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${b.h}%`,
              borderRadius: "5px 5px 0 0",
              background: b.leak
                ? "var(--dd-surface-3, #1F1F1F)"
                : "var(--page-accent)",
              border: b.leak
                ? "1px solid var(--dd-border-strong, rgba(255,255,255,0.16))"
                : "none",
            }}
          />
        ))}
      </div>

      {/* RTO by pincode */}
      <p
        style={{
          margin: "0 0 12px",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          color: "var(--dd-text-low, #808080)",
        }}
      >
        RTO BY PINCODE
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {PINCODES.map((p) => (
          <div
            key={p.code}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
                color: "var(--dd-text-high, #F5F5F5)",
                width: 56,
              }}
            >
              {p.code}
            </span>
            <div
              style={{
                flex: 1,
                height: 8,
                borderRadius: 999,
                background: "var(--dd-surface-2, #161616)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${p.rto * 2.6}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: TONE[p.tone],
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                color: TONE[p.tone],
                width: 38,
                textAlign: "right",
              }}
            >
              {p.rto}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
