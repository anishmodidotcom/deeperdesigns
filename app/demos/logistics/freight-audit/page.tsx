import type { Metadata } from "next";

// Real full-screen demo: the Freight Audit for "Sharma Transport", invoices
// matched to trips with a disputed detention charge and recovery stat.
// Not indexed.
export const metadata: Metadata = {
  title: "Freight Audit demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#F59F00";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const WARN = "#E5847C";

const NAV = ["Control", "Trips", "ePOD", "Fuel", "Audit", "Settings"];

const INV = [
  { id: "FRT-8841", vendor: "Highway Carriers", amt: "Rs 64,000", status: "Matched", tone: GOOD },
  { id: "FRT-8838", vendor: "Sundar Logistics", amt: "Rs 41,500", status: "Flagged", tone: WARN, active: true },
  { id: "FRT-8835", vendor: "Royal Roadways", amt: "Rs 28,900", status: "Matched", tone: GOOD },
  { id: "FRT-8830", vendor: "Highway Carriers", amt: "Rs 52,200", status: "Flagged", tone: WARN },
  { id: "FRT-8829", vendor: "Metro Freight", amt: "Rs 19,400", status: "Matched", tone: GOOD },
];

export default function FreightAuditDemo() {
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
          const active = i === 4;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(245,159,0,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <section style={{ width: 440, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ padding: "20px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Freight Audit</h1>
            <span style={{ fontSize: 11, color: WARN, border: `1px solid ${WARN}`, borderRadius: 999, padding: "2px 9px" }}>2 flagged</span>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {INV.map((i) => (
              <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderTop: "1px solid rgba(255,255,255,0.06)", background: i.active ? "rgba(245,159,0,0.08)" : "transparent", borderLeft: i.active ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, fontFamily: "var(--font-geist-mono), monospace" }}>{i.id}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8A8A8A" }}>{i.vendor}</p>
                </div>
                <span style={{ fontSize: 12.5, color: "#D8D8D8", fontFamily: "var(--font-geist-mono), monospace" }}>{i.amt}</span>
                <span style={{ width: 70, textAlign: "right", fontSize: 10.5, color: i.tone, border: `1px solid ${i.tone}`, borderRadius: 999, padding: "2px 8px", whiteSpace: "nowrap", flexShrink: 0 }}>{i.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ flex: 1, padding: "22px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>FRT-8838 · Sundar Logistics</h2>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8A8A8A" }}>Trip TRP-4451 · Pune → Nagpur</p>
          </div>

          <div style={{ background: "#111111", border: `1px solid ${WARN}`, borderRadius: 13, padding: "18px 20px" }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: WARN }}>OVERBILLING FLAGGED</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {[
                ["Base freight", "Rs 34,000", "Matches trip", GOOD],
                ["Detention, 2 days", "Rs 6,000", "Trip shows 0 days idle", WARN],
                ["Loading charge", "Rs 1,500", "Matches", GOOD],
              ].map(([k, v, note, tone]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, color: "#E8E8E8" }}>{k}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: tone as string }}>{note}</p>
                  </div>
                  <span style={{ fontSize: 13, color: tone === WARN ? WARN : "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Disputed amount</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: WARN, fontFamily: "var(--font-geist-mono), monospace" }}>Rs 6,000</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flex: 1, minHeight: 0 }}>
            <div style={{ background: "#111111", border: `1px solid ${ACCENT}`, borderRadius: 13, padding: "18px 20px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: "#6B6B6B" }}>RECOVERED THIS MONTH</p>
              <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 600, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>Rs 1,18,400</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: GOOD }}>across 9 disputed invoices</p>
            </div>
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
              <span style={{ fontSize: 12.5, color: GOOD, display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> E-way bill in order</span>
              <span style={{ fontSize: 12.5, color: GOOD, display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> POD attached</span>
              <button type="button" style={{ marginTop: 6, fontSize: 12.5, color: "#0A0A0A", background: ACCENT, borderRadius: 999, padding: "9px 16px", border: "none", fontWeight: 600, cursor: "pointer" }}>Raise dispute</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
