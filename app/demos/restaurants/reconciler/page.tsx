import type { Metadata } from "next";

// Real full-screen demo: the Payout Reconciler for "Tinda House", matching
// aggregator payouts to orders and flagging shortfalls. Not indexed.
export const metadata: Metadata = {
  title: "Payout Reconciler demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#FF7A1A";
const MONEY = "#F5B544";
const GOOD = "#2FB46A";
const BAD = "#E5847C";

const NAV = ["Payouts", "Orders", "Menu", "Direct", "Line", "Reports"];

const CHANNELS = [
  { name: "Swiggy", expected: "Rs 1,84,200", received: "Rs 1,71,640", delta: "- Rs 12,560", tone: BAD },
  { name: "Zomato", expected: "Rs 1,62,800", received: "Rs 1,58,900", delta: "- Rs 3,900", tone: BAD },
  { name: "Direct", expected: "Rs 64,500", received: "Rs 64,500", delta: "Matched", tone: GOOD },
  { name: "Dine-in", expected: "Rs 2,10,300", received: "Rs 2,10,300", delta: "Matched", tone: GOOD },
];

const DISPUTES = [
  { order: "#SW-48213", issue: "Commission charged 25% vs 22% agreed", amount: "Rs 1,840", tone: BAD },
  { order: "#SW-48119", issue: "Refund deducted, not approved by outlet", amount: "Rs 2,310", tone: BAD },
  { order: "#ZO-77204", issue: "Order delivered, payout missing", amount: "Rs 690", tone: BAD },
  { order: "#SW-48022", issue: "Ad fee double-charged", amount: "Rs 1,250", tone: BAD },
];

export default function ReconcilerDemo() {
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
            Tinda House
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
                background: active ? "rgba(255,122,26,0.16)" : "transparent",
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
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Payout Reconciler</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>WEEK OF 9 JUN · AUTO-MATCHED</span>
        </div>

        {/* Channel tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {CHANNELS.map((c) => (
            <div key={c.name} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>{c.name}</p>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.tone }} />
              </div>
              <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B" }}>Expected</p>
              <p style={{ margin: "2px 0 8px", fontSize: 14, color: "#D8D8D8", fontFamily: "var(--font-geist-mono), monospace" }}>{c.expected}</p>
              <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B" }}>Received</p>
              <p style={{ margin: "2px 0 8px", fontSize: 14, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{c.received}</p>
              <p style={{ margin: 0, fontSize: 12.5, color: c.tone, fontFamily: "var(--font-geist-mono), monospace" }}>{c.delta}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Disputes table */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Flagged for dispute</p>
              <span style={{ fontSize: 11, color: BAD, border: `1px solid ${BAD}`, borderRadius: 999, padding: "2px 10px" }}>4 open</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Order", "Issue", "Amount"].map((th, i) => (
                    <th key={th} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.06em", color: "#6B6B6B", fontWeight: 500, padding: "0 0 9px", textAlign: i === 2 ? "right" : "left" }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DISPUTES.map((d) => (
                  <tr key={d.order} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ fontSize: 12.5, padding: "11px 0", color: "#D8D8D8", fontFamily: "var(--font-geist-mono), monospace", whiteSpace: "nowrap", paddingRight: 14 }}>{d.order}</td>
                    <td style={{ fontSize: 12.5, color: "#A8A8A8", paddingRight: 14, lineHeight: 1.4 }}>{d.issue}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: d.tone, fontFamily: "var(--font-geist-mono), monospace", whiteSpace: "nowrap" }}>{d.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recovery summary */}
          <div style={{ background: "#111111", border: `1px solid ${ACCENT}`, borderRadius: 13, padding: "18px 20px", display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0 0 16px", fontSize: 13.5, fontWeight: 600 }}>This week</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.06em" }}>SHORTFALL CAUGHT</p>
                <p style={{ margin: "6px 0 0", fontSize: 26, fontWeight: 600, color: BAD, fontFamily: "var(--font-geist-mono), monospace" }}>Rs 16,460</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.06em" }}>RECOVERED TO DATE</p>
                <p style={{ margin: "6px 0 0", fontSize: 26, fontWeight: 600, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>Rs 11,840</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.06em" }}>COMMISSION PAID</p>
                <p style={{ margin: "6px 0 0", fontSize: 26, fontWeight: 600, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>Rs 79,300</p>
              </div>
            </div>
            <button style={{ marginTop: 16, width: "100%", background: ACCENT, color: "#0A0A0A", fontSize: 14.5, fontWeight: 600, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer" }}>
              File all disputes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
