import type { Metadata } from "next";

// Real full-screen demo: the Distributor Portal for "Bharat Industries",
// accounts with credit status, orders pipeline and payment reminders.
// Not indexed.
export const metadata: Metadata = {
  title: "Distributor Portal demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#E8602C";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const WARN = "#E5847C";

const NAV = ["Leads", "Quotes", "Outreach", "Distributors", "Catalogue", "Settings"];

const ACCOUNTS = [
  { name: "Sundaram Metals", city: "Chennai", vol: "Rs 18.4L", credit: "On time", tone: GOOD },
  { name: "Gokul Traders", city: "Madurai", vol: "Rs 11.2L", credit: "Due 4d", tone: MONEY },
  { name: "Apex Build Co", city: "Coimbatore", vol: "Rs 9.6L", credit: "Overdue 12d", tone: WARN },
  { name: "Nexus Fabricators", city: "Salem", vol: "Rs 7.1L", credit: "On time", tone: GOOD },
  { name: "Orbit Supply", city: "Trichy", vol: "Rs 5.8L", credit: "Due 9d", tone: MONEY },
];

const REMINDERS = [
  { co: "Apex Build Co", amt: "Rs 2,40,000", note: "Overdue 12 days, 2nd reminder sent", tone: WARN },
  { co: "Gokul Traders", amt: "Rs 1,10,000", note: "Due in 4 days, reminder scheduled", tone: MONEY },
  { co: "Orbit Supply", amt: "Rs 86,000", note: "Due in 9 days", tone: MONEY },
];

export default function DistributorPortalDemo() {
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
      <aside style={{ width: 214, flexShrink: 0, background: "#0E0E0E", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "22px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 22px" }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT }} />
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Bharat Ind.</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 3;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(232,96,44,0.16)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Distributor Portal</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>214 ACCOUNTS · Rs 4.2 Cr OUTSTANDING</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["ACTIVE DISTRIBUTORS", "214", "#F5F5F5"],
            ["ORDERS THIS MONTH", "486", MONEY],
            ["ON-TIME PAYMENT", "78%", GOOD],
            ["OVERDUE", "Rs 38L", WARN],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Accounts</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Distributor", "City", "Volume", "Credit"].map((th, i) => (
                    <th key={th} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.06em", color: "#6B6B6B", fontWeight: 500, padding: "0 0 10px", textAlign: i >= 2 ? "right" : "left" }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACCOUNTS.map((a) => (
                  <tr key={a.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ fontSize: 13, padding: "11px 0", color: "#F5F5F5" }}>{a.name}</td>
                    <td style={{ fontSize: 12.5, color: "#8A8A8A" }}>{a.city}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{a.vol}</td>
                    <td style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 10.5, color: a.tone, border: `1px solid ${a.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{a.credit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Payment reminders</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {REMINDERS.map((r) => (
                <div key={r.co} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 11 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{r.co}</span>
                    <span style={{ fontSize: 12.5, color: r.tone, fontFamily: "var(--font-geist-mono), monospace" }}>{r.amt}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#8A8A8A", lineHeight: 1.4 }}>{r.note}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 14, fontSize: 11.5, color: "#6B6B6B", lineHeight: 1.5 }}>
              Chased automatically on WhatsApp, escalated to the rep if unpaid.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
