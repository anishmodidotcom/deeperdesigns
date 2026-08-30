import type { Metadata } from "next";

// Real full-screen demo: the Live-Rate Billing POS for "Kalasri Jewellers".
// Today's gold rate flows into making-charges, old-gold exchange and the
// final GST bill. Not indexed; kept for reuse.
export const metadata: Metadata = {
  title: "Live-Rate Billing demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#C9A227";
const MONEY = "#C9A227";
const GOOD = "#2FB46A";

const NAV = ["Billing", "Vault", "Schemes", "Khata", "Karigar", "Reports"];

const ITEMS = [
  { name: "Antique Lakshmi Haar", karat: "22K", gross: "32.40 g", net: "31.10 g", mc: "14%", amount: "Rs 2,48,150" },
  { name: "Jhumka Earrings", karat: "22K", gross: "12.80 g", net: "12.40 g", mc: "16%", amount: "Rs 1,01,420" },
];

export default function BillingDemo() {
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
          width: 210,
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
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Kalasri
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
                background: active ? "rgba(201,162,39,0.16)" : "transparent",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Top: title + live rate ticker */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>New Bill</h1>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              ["GOLD 22K", "Rs 7,184 / g"],
              ["GOLD 24K", "Rs 7,838 / g"],
              ["SILVER", "Rs 94.6 / g"],
            ].map(([k, v], i) => (
              <div key={k} style={{ background: "#111111", border: "1px solid rgba(201,162,39,0.25)", borderRadius: 11, padding: "8px 14px" }}>
                <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
                <p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 600, color: i === 2 ? "#F5F5F5" : MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{v}</p>
              </div>
            ))}
            <span style={{ alignSelf: "center", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> LIVE 9:42 AM
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Item table */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Items</p>
              <span style={{ fontSize: 12, color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 999, padding: "3px 11px" }}>+ Add piece</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Piece", "Karat", "Gross", "Net", "MC", "Amount"].map((th, i) => (
                    <th key={th} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.06em", color: "#6B6B6B", fontWeight: 500, padding: "0 0 9px", textAlign: i === 0 ? "left" : "right" }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ITEMS.map((it) => (
                  <tr key={it.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ fontSize: 13, padding: "11px 0", color: "#F5F5F5" }}>{it.name}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{it.karat}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{it.gross}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{it.net}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{it.mc}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{it.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ margin: "0 0 10px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: "#6B6B6B" }}>OLD-GOLD EXCHANGE</p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#A8A8A8" }}>Old 22K returned · 18.20 g net</span>
                <span style={{ color: "#E5847C", fontFamily: "var(--font-geist-mono), monospace" }}>- Rs 1,30,750</span>
              </div>
            </div>
          </div>

          {/* Bill summary */}
          <div style={{ background: "#111111", border: `1px solid ${ACCENT}`, borderRadius: 13, padding: "18px 20px", display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0 0 16px", fontSize: 13.5, fontWeight: 600 }}>Bill summary</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
              {[
                ["Metal value", "Rs 3,06,420"],
                ["Making charges", "Rs 43,150"],
                ["Old-gold exchange", "- Rs 1,30,750"],
                ["GST (3%)", "Rs 6,565"],
                ["HUID logged", "4 pieces"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, color: "#A8A8A8" }}>{k}</span>
                  <span style={{ fontSize: 13, color: k === "HUID logged" ? GOOD : "#E8E8E8", fontFamily: "var(--font-geist-mono), monospace" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Net payable</span>
                <span style={{ fontSize: 24, fontWeight: 600, color: MONEY, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "-0.01em" }}>Rs 2,25,385</span>
              </div>
            </div>
            <button type="button" style={{ marginTop: 16, width: "100%", background: ACCENT, color: "#0A0A0A", fontSize: 14.5, fontWeight: 600, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer" }}>
              Generate GST bill
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
