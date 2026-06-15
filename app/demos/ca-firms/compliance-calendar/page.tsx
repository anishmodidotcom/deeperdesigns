import type { Metadata } from "next";

// Real full-screen demo: the Compliance Calendar for "Mehta & Associates",
// deadlines by type with status and an at-risk strip. Not indexed.
export const metadata: Metadata = {
  title: "Compliance Calendar demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#6D5ACF";
const MONEY = "#5BC8A0";
const GOOD = "#5BC8A0";
const WARN = "#E5847C";
const WAIT = "#E0B341";

const NAV = ["Documents", "Calendar", "Clients", "Reconcile", "Billing", "Settings"];

const COLUMNS: { type: string; due: string; items: { client: string; status: string; tone: string }[] }[] = [
  {
    type: "GST",
    due: "20 Apr",
    items: [
      { client: "Sundaram Textiles", status: "In progress", tone: WAIT },
      { client: "Gokul Exports", status: "Pending", tone: WARN },
      { client: "Apex Traders", status: "Filed", tone: GOOD },
    ],
  },
  {
    type: "TDS",
    due: "30 Apr",
    items: [
      { client: "Nexus Pvt Ltd", status: "In progress", tone: WAIT },
      { client: "Orbit Enterprises", status: "Pending", tone: WARN },
    ],
  },
  {
    type: "ITR",
    due: "31 Jul",
    items: [
      { client: "Apex Traders", status: "In progress", tone: WAIT },
      { client: "M. Rao (ind)", status: "Pending", tone: WARN },
    ],
  },
  {
    type: "ROC",
    due: "30 May",
    items: [
      { client: "Orbit Enterprises", status: "In progress", tone: WAIT },
      { client: "Banyan Pvt Ltd", status: "Filed", tone: GOOD },
    ],
  },
];

export default function ComplianceCalendarDemo() {
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
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Mehta &amp; Assoc.</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 1;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(109,90,207,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Compliance Calendar</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>APRIL · 112 CLIENTS</span>
        </div>

        {/* At-risk strip */}
        <div style={{ background: "rgba(229,132,124,0.08)", border: `1px solid ${WARN}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WARN} strokeWidth="2" aria-hidden><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          <span style={{ fontSize: 13.5, color: "#F0C4C0" }}><b style={{ color: "#F5F5F5", fontWeight: 600 }}>3 filings at risk</b> within 4 days. Gokul Exports GST is missing two documents.</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flex: 1, minHeight: 0 }}>
          {COLUMNS.map((col) => (
            <div key={col.type} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 16px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.02em" }}>{col.type}</span>
                <span style={{ fontSize: 11, color: ACCENT, fontFamily: "var(--font-geist-mono), monospace" }}>due {col.due}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.items.map((it) => (
                  <div key={it.client} style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 12px" }}>
                    <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600 }}>{it.client}</p>
                    <span style={{ display: "inline-block", marginTop: 7, fontSize: 10.5, color: it.tone, border: `1px solid ${it.tone}`, borderRadius: 999, padding: "1px 8px" }}>{it.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
