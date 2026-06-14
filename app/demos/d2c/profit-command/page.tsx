import type { Metadata } from "next";

// Real full-screen demo: the Profit Command analytics dashboard for the
// sample brand "Aarka Skincare". Not indexed; kept for reuse as a live
// demo / marketing asset.
export const metadata: Metadata = {
  title: "Profit Command demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#FF5C38";
const MONEY = "#F5B544";
const GOOD = "#2FB46A";
const BAD = "#E5484D";
const MID = "#F5B544";

const NAV = ["Overview", "Orders", "Products", "Pincodes", "Channels", "Settings"];

const KPIS = [
  { label: "NET REVENUE", value: "Rs 18.4L", delta: "+12% mom", up: true },
  { label: "REAL CM2", value: "Rs 4.1L", delta: "22.3% margin", up: true },
  { label: "RTO LOSS", value: "Rs 1.6L", delta: "8.7% of orders", up: false },
  { label: "AOV", value: "Rs 1,840", delta: "+4%", up: true },
];

// 30 daily contribution-margin points, with a stockout dip and a sale peak.
const SERIES = [
  52, 55, 58, 54, 60, 63, 61, 64, 40, 30, 34, 48, 57, 62, 66, 64, 68, 70, 72,
  69, 74, 78, 82, 96, 92, 80, 77, 81, 85, 88,
];

const PINCODES = [
  { code: "110045", city: "Delhi", rto: 31, tone: BAD },
  { code: "226010", city: "Lucknow", rto: 27, tone: BAD },
  { code: "700091", city: "Kolkata", rto: 19, tone: MID },
  { code: "560102", city: "Bengaluru", rto: 14, tone: MID },
  { code: "411038", city: "Pune", rto: 9, tone: GOOD },
  { code: "400703", city: "Navi Mumbai", rto: 6, tone: GOOD },
];

const PRODUCTS = [
  { name: "Midnight Repair Serum 30ml", units: 412, rev: "Rs 9.8L", cm2: "28%", status: "Healthy", tone: GOOD },
  { name: "Vitamin C Day Drops 30ml", units: 298, rev: "Rs 5.2L", cm2: "24%", status: "Healthy", tone: GOOD },
  { name: "Gentle Foaming Cleanser", units: 511, rev: "Rs 3.6L", cm2: "19%", status: "Watch", tone: MID },
  { name: "Hydra Recovery Cream 50g", units: 187, rev: "Rs 2.9L", cm2: "-4%", status: "Unprofitable", tone: BAD },
  { name: "Barrier Repair Set", units: 96, rev: "Rs 2.1L", cm2: "26%", status: "Healthy", tone: GOOD },
];

function areaPaths() {
  const w = 560;
  const h = 190;
  const max = 100;
  const stepX = w / (SERIES.length - 1);
  const pts = SERIES.map((v, i) => [i * stepX, h - (v / max) * (h - 16) - 8]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return { line, area, pts, w, h };
}

export default function ProfitCommandDemo() {
  const { line, area, pts, w, h } = areaPaths();
  const dip = pts[9]; // stockout
  const peak = pts[23]; // sale

  return (
    <main
      data-demo-screen
      style={
        {
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          overflow: "hidden",
          display: "flex",
          background: "#0A0A0A",
          color: "#F5F5F5",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          "--page-accent": ACCENT,
          "--page-money": MONEY,
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: "#0E0E0E",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          padding: "22px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 22px" }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT }} />
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Profit
          </span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 0;
          return (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "9px 11px",
                borderRadius: 9,
                fontSize: 14,
                color: active ? "#FFFFFF" : "#A8A8A8",
                background: active ? "rgba(255,92,56,0.14)" : "transparent",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: "10px 8px" }}>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
            AS
          </span>
          <div style={{ lineHeight: 1.2 }}>
            <p style={{ margin: 0, fontSize: 12.5 }}>Aarka Skincare</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B" }}>Owner</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Profit Command</h1>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#A8A8A8", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "4px 11px" }}>
              Aarka Skincare
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#A8A8A8" strokeWidth="2.4" aria-hidden><polyline points="6 9 12 15 18 9" /></svg>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", background: "#161616", borderRadius: 9, padding: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
              {["7D", "30D", "Quarter"].map((d) => (
                <span key={d} style={{ fontSize: 12.5, padding: "5px 12px", borderRadius: 7, color: d === "30D" ? "#0A0A0A" : "#A8A8A8", background: d === "30D" ? "#F5F5F5" : "transparent", fontWeight: d === "30D" ? 600 : 400 }}>
                  {d}
                </span>
              ))}
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> LIVE
            </span>
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {KPIS.map((k) => (
            <div key={k.label} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "15px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "#6B6B6B" }}>{k.label}</p>
              <p style={{ margin: "10px 0 5px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 27, fontWeight: 600, letterSpacing: "-0.02em", color: MONEY }}>{k.value}</p>
              <p style={{ margin: 0, fontSize: 12, color: k.up ? GOOD : BAD }}>{k.delta}</p>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Chart */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Contribution margin</p>
              <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>LAST 30 DAYS</p>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                <defs>
                  <linearGradient id="cmfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ACCENT} stopOpacity="0.34" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={area} fill="url(#cmfill)" />
                <path d={line} fill="none" stroke={ACCENT} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <circle cx={dip[0]} cy={dip[1]} r="3.4" fill="#0A0A0A" stroke={BAD} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <circle cx={peak[0]} cy={peak[1]} r="3.4" fill="#0A0A0A" stroke={GOOD} strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
              <span style={{ position: "absolute", left: `${(dip[0] / w) * 100}%`, top: `${(dip[1] / h) * 100}%`, transform: "translate(-50%, -150%)", fontSize: 10, color: BAD, fontFamily: "var(--font-geist-mono), monospace", whiteSpace: "nowrap" }}>stockout</span>
              <span style={{ position: "absolute", left: `${(peak[0] / w) * 100}%`, top: `${(peak[1] / h) * 100}%`, transform: "translate(-50%, -150%)", fontSize: 10, color: GOOD, fontFamily: "var(--font-geist-mono), monospace", whiteSpace: "nowrap" }}>sale</span>
            </div>
          </div>

          {/* RTO by pincode */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>RTO by pincode</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {PINCODES.map((p) => (
                <div key={p.code} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 96, flexShrink: 0 }}>
                    <p style={{ margin: 0, fontSize: 12.5, fontFamily: "var(--font-geist-mono), monospace" }}>{p.code}</p>
                    <p style={{ margin: 0, fontSize: 10.5, color: "#6B6B6B" }}>{p.city}</p>
                  </div>
                  <div style={{ flex: 1, height: 7, borderRadius: 999, background: "#161616", overflow: "hidden" }}>
                    <div style={{ width: `${p.rto * 2.8}%`, height: "100%", borderRadius: 999, background: p.tone }} />
                  </div>
                  <span style={{ width: 34, textAlign: "right", fontSize: 12.5, color: p.tone, fontFamily: "var(--font-geist-mono), monospace" }}>{p.rto}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product table */}
        <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 18px" }}>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, fontWeight: 600 }}>Product profitability</p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                {["Product", "Units", "Revenue", "CM2", "Status"].map((th, i) => (
                  <th key={th} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: "#6B6B6B", fontWeight: 500, padding: "0 0 9px", textAlign: i > 0 && i < 4 ? "right" : "left" }}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ fontSize: 13, padding: "9px 0", color: "#F5F5F5" }}>{p.name}</td>
                  <td style={{ fontSize: 13, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{p.units}</td>
                  <td style={{ fontSize: 13, textAlign: "right", color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{p.rev}</td>
                  <td style={{ fontSize: 13, textAlign: "right", color: p.tone, fontFamily: "var(--font-geist-mono), monospace" }}>{p.cm2}</td>
                  <td style={{ textAlign: "left", paddingLeft: 24 }}>
                    <span style={{ fontSize: 11, color: p.tone, border: `1px solid ${p.tone}`, borderRadius: 999, padding: "2px 10px" }}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
