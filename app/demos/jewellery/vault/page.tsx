import type { Metadata } from "next";

// Real full-screen demo: The Vault inventory dashboard for "Kalasri
// Jewellers", with dead-stock flags and a karigar job-work panel. Not
// indexed; kept for reuse.
export const metadata: Metadata = {
  title: "The Vault demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#C9A227";
const MONEY = "#C9A227";
const GOOD = "#2FB46A";
const DEAD = "#E5847C";

const NAV = ["Billing", "Vault", "Schemes", "Khata", "Karigar", "Reports"];

const KPIS = [
  { label: "TOTAL STOCK", value: "8,420 g", sub: "412 pieces" },
  { label: "STOCK VALUE", value: "Rs 6.1 Cr", sub: "at today's rate" },
  { label: "DEAD STOCK", value: "Rs 41.5 L", sub: "past a season", tone: DEAD },
  { label: "FASTEST MOVING", value: "Jhumkas", sub: "+18% this month", tone: GOOD },
];

const ROWS = [
  { piece: "Antique Lakshmi Haar", karat: "22K", wt: "32.40 g", huid: "HUID 4A8K2L", status: "Moving", tone: GOOD },
  { piece: "Jhumka Earrings (pair)", karat: "22K", wt: "12.80 g", huid: "HUID 7C2M9P", status: "Moving", tone: GOOD },
  { piece: "Polki Choker Set", karat: "18K", wt: "58.10 g", huid: "HUID 1F5R3T", status: "Dead 7 mo", tone: DEAD },
  { piece: "Temple Jewellery Set", karat: "22K", wt: "74.50 g", huid: "HUID 9H6V4W", status: "Dead 9 mo", tone: DEAD },
  { piece: "Diamond Solitaire Ring", karat: "18K", wt: "4.20 g", huid: "HUID 3J1X7Y", status: "Watch", tone: MONEY },
  { piece: "Gold Kada (pair)", karat: "22K", wt: "46.30 g", huid: "HUID 5N8B2Q", status: "Moving", tone: GOOD },
];

export default function VaultDemo() {
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
          const active = i === 1;
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>The Vault</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#A8A8A8", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "5px 13px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A8A8A8" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
            Search by HUID, karat, piece
          </span>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {KPIS.map((k) => (
            <div key={k.label} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k.label}</p>
              <p style={{ margin: "9px 0 4px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 23, fontWeight: 600, letterSpacing: "-0.02em", color: k.tone ?? MONEY }}>{k.value}</p>
              <p style={{ margin: 0, fontSize: 11.5, color: "#8A8A8A" }}>{k.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.75fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Inventory table */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Inventory</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Piece", "Karat", "Weight", "HUID", "Status"].map((th, i) => (
                    <th key={th} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.06em", color: "#6B6B6B", fontWeight: 500, padding: "0 0 9px", textAlign: i === 0 ? "left" : i === 4 ? "right" : "right" }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.piece} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ fontSize: 13, padding: "11px 0", color: "#F5F5F5" }}>{r.piece}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{r.karat}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{r.wt}</td>
                    <td style={{ fontSize: 12, textAlign: "right", color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>{r.huid}</td>
                    <td style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 11, color: r.tone, border: `1px solid ${r.tone}`, borderRadius: 999, padding: "2px 10px", whiteSpace: "nowrap" }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Karigar job-work */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Karigar job-work</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { name: "Suresh (workshop A)", issued: "240.0 g", returned: "228.5 g", pending: "11.5 g" },
                { name: "Mahesh (workshop B)", issued: "180.0 g", returned: "180.0 g", pending: "0.0 g" },
              ].map((k) => (
                <div key={k.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                  <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600 }}>{k.name}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#A8A8A8" }}>
                    <span>Issued</span>
                    <span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>{k.issued}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#A8A8A8", marginTop: 4 }}>
                    <span>Returned</span>
                    <span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>{k.returned}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                    <span style={{ color: "#A8A8A8" }}>Pending</span>
                    <span style={{ color: k.pending === "0.0 g" ? GOOD : MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{k.pending}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "auto", paddingTop: 12, fontSize: 11.5, color: "#6B6B6B", lineHeight: 1.5 }}>
              Every gram issued and returned, reconciled against finished pieces.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
