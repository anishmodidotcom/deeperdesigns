import type { Metadata } from "next";

// Real full-screen demo: the Studio Desk for "Glow Studio", revenue + chair
// utilisation, staff commission and low inventory. Not indexed.
export const metadata: Metadata = {
  title: "Studio Desk demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#D6336C";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const WARN = "#E5847C";

const NAV = ["Calendar", "Clients", "Today", "Staff", "Inventory", "Settings"];

const STAFF = [
  { name: "Riya", services: 9, revenue: "Rs 18,400", commission: "Rs 5,520" },
  { name: "Karan", services: 7, revenue: "Rs 12,100", commission: "Rs 3,630" },
  { name: "Fatima", services: 8, revenue: "Rs 9,800", commission: "Rs 2,940" },
];

const STOCK = [
  { item: "Developer 20 vol", level: "Low", tone: WARN },
  { item: "Keratin serum", level: "Low", tone: WARN },
  { item: "Foils", level: "OK", tone: GOOD },
];

export default function StudioDeskDemo() {
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
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Glow Studio</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 2;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(214,51,108,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Today at Glow</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>SAT · 3 STYLISTS ON</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["REVENUE TODAY", "Rs 40,300", MONEY],
            ["CHAIR UTILISATION", "84%", GOOD],
            ["SERVICES DONE", "24", "#F5F5F5"],
            ["PRODUCTS LOW", "2", WARN],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 23, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Staff commission, today</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Stylist", "Services", "Revenue", "Commission"].map((th, i) => (
                    <th key={th} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.06em", color: "#6B6B6B", fontWeight: 500, padding: "0 0 10px", textAlign: i === 0 ? "left" : "right" }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STAFF.map((s) => (
                  <tr key={s.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ fontSize: 13, padding: "12px 0", color: "#F5F5F5" }}>{s.name}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{s.services}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#D8D8D8", fontFamily: "var(--font-geist-mono), monospace" }}>{s.revenue}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{s.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: 14, fontSize: 11.5, color: "#6B6B6B" }}>Commission worked out automatically from each completed service.</p>
          </div>

          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 13px", fontSize: 13.5, fontWeight: 600 }}>Inventory</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {STOCK.map((s) => (
                <div key={s.item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 13, color: "#D8D8D8" }}>{s.item}</span>
                  <span style={{ fontSize: 10.5, color: s.tone, border: `1px solid ${s.tone}`, borderRadius: 999, padding: "2px 9px" }}>{s.level}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 14, fontSize: 11.5, color: "#6B6B6B", lineHeight: 1.5 }}>
              Product deducted as it is used on each service, low stock flagged to reorder.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
