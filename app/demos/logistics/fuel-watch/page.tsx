import type { Metadata } from "next";

// Real full-screen demo: Fuel and Route Watch for "Sharma Transport", fuel
// KPIs, an anomalies list and a cost-per-trip chart. Not indexed.
export const metadata: Metadata = {
  title: "Fuel and Route Watch demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#F59F00";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const WARN = "#E5847C";

const NAV = ["Control", "Trips", "ePOD", "Fuel", "Audit", "Settings"];

const ANOM = [
  { trip: "TRP-4468", note: "Fuel fill 38L over tank capacity", amt: "Rs 3,400", tone: WARN },
  { trip: "TRP-4455", note: "Idle running 2h 40m at halt", amt: "Rs 1,200", tone: WARN },
  { trip: "TRP-4470", note: "Route 12 km longer than corridor", amt: "Rs 900", tone: WARN },
];

const BARS = [62, 58, 71, 49, 80, 66, 55, 74];

export default function FuelWatchDemo() {
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
      <aside style={{ width: 210, flexShrink: 0, background: "#0E0E0E", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "22px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 22px" }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT }} />
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Sharma Transport</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 3;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(245,159,0,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Fuel and Route Watch</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>THIS WEEK · 38 VEHICLES</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["FUEL % OF COST", "37%", "#F5F5F5"],
            ["ANOMALIES", "6", WARN],
            ["COST / KM", "Rs 38.2", MONEY],
            ["SAVED THIS WEEK", "Rs 18,400", GOOD],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Flagged anomalies</p>
              <span style={{ fontSize: 11, color: WARN, border: `1px solid ${WARN}`, borderRadius: 999, padding: "2px 9px" }}>6 open</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {ANOM.map((a) => (
                <div key={a.trip} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: "rgba(229,132,124,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WARN} strokeWidth="2" aria-hidden><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 12, color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{a.trip}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#E8E8E8" }}>{a.note}</p>
                  </div>
                  <span style={{ fontSize: 12.5, color: WARN, fontFamily: "var(--font-geist-mono), monospace", whiteSpace: "nowrap" }}>{a.amt}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Cost per trip</p>
              <span style={{ fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>LAST 8 TRIPS</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 10 }}>
              {BARS.map((b, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: "100%", height: `${b}%`, borderRadius: "6px 6px 0 0", background: b >= 78 ? WARN : ACCENT, opacity: b >= 78 ? 1 : 0.82 }} />
                  <span style={{ fontSize: 9.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>{i + 1}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: 11.5, color: "#6B6B6B", lineHeight: 1.5 }}>Trips above the corridor cost are flagged for review the same day.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
