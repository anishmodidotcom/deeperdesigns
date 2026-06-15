import type { Metadata } from "next";

// Real full-screen demo: the Client Document Portal for "Mehta & Associates",
// per-client checklists with reminders and a wrong-format flag. Not indexed.
export const metadata: Metadata = {
  title: "Client Document Portal demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#5A6ACF";
const MONEY = "#5BC8A0";
const GOOD = "#5BC8A0";
const WARN = "#E5847C";
const WAIT = "#E0B341";

const NAV = ["Documents", "Calendar", "Clients", "Reconcile", "Billing", "Settings"];

const CLIENTS = [
  { name: "Sundaram Textiles", filing: "GSTR-3B Mar", done: 5, total: 6, active: true },
  { name: "Apex Traders", filing: "ITR FY24", done: 8, total: 8 },
  { name: "Gokul Exports", filing: "GSTR-1 Mar", done: 3, total: 7 },
  { name: "Nexus Pvt Ltd", filing: "TDS Q4", done: 2, total: 5 },
  { name: "Orbit Enterprises", filing: "ROC annual", done: 6, total: 9 },
];

const CHECKLIST = [
  { item: "Sales register (March)", status: "Received", tone: GOOD },
  { item: "Purchase invoices", status: "Received", tone: GOOD },
  { item: "Bank statement (March)", status: "Wrong format", tone: WARN },
  { item: "Expense bills", status: "Received", tone: GOOD },
  { item: "Credit notes", status: "Received", tone: GOOD },
  { item: "E-way bill summary", status: "Reminder sent", tone: WAIT },
];

export default function DocumentPortalDemo() {
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
          const active = i === 0;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(90,106,207,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <section style={{ width: 410, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ padding: "20px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Documents</h1>
            <span style={{ fontSize: 12, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>112 CLIENTS</span>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {CLIENTS.map((c) => {
              const pct = Math.round((c.done / c.total) * 100);
              return (
                <div key={c.name} style={{ padding: "13px 22px", borderTop: "1px solid rgba(255,255,255,0.06)", background: c.active ? "rgba(90,106,207,0.08)" : "transparent", borderLeft: c.active ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</span>
                    <span style={{ fontSize: 11.5, color: pct === 100 ? GOOD : WAIT, fontFamily: "var(--font-geist-mono), monospace" }}>{c.done}/{c.total}</span>
                  </div>
                  <p style={{ margin: "3px 0 7px", fontSize: 12, color: "#8A8A8A" }}>{c.filing}</p>
                  <div style={{ height: 6, borderRadius: 999, background: "#1B1B1B", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: pct === 100 ? GOOD : ACCENT }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ flex: 1, padding: "22px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>Sundaram Textiles</h2>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8A8A8A" }}>GSTR-3B March · due in 4 days</p>
          </div>

          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1 }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>REQUEST CHECKLIST</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {CHECKLIST.map((c) => (
                <div key={c.item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: c.tone === GOOD ? "rgba(91,200,160,0.18)" : "transparent", border: c.tone === GOOD ? "none" : `1px solid ${c.tone}` }}>
                    {c.tone === GOOD ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOOD} strokeWidth="3" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                    ) : c.tone === WARN ? (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={WARN} strokeWidth="3" aria-hidden><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    ) : null}
                  </span>
                  <span style={{ flex: 1, fontSize: 13.5, color: "#E8E8E8" }}>{c.item}</span>
                  <span style={{ fontSize: 11, color: c.tone, border: `1px solid ${c.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(37,211,102,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366" aria-hidden><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Z" /></svg>
            </span>
            <p style={{ margin: 0, fontSize: 12.5, color: "#A8A8A8" }}>Reminder for bank statement and e-way bill summary sent on WhatsApp, 2nd nudge scheduled tomorrow.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
