import type { Metadata } from "next";

// Real full-screen demo: Doc Extraction for "Mehta & Associates", a parsed
// document on one side and a GSTR-2B match panel on the other. Not indexed.
export const metadata: Metadata = {
  title: "Doc Extraction demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#6D5ACF";
const MONEY = "#5BC8A0";
const GOOD = "#5BC8A0";
const WARN = "#E5847C";

const NAV = ["Documents", "Calendar", "Clients", "Reconcile", "Billing", "Settings"];

const LINES = [
  { gstin: "27AABCS1...", inv: "INV-1042", val: "1,18,000", tax: "21,240", match: true },
  { gstin: "29AAGCN9...", inv: "INV-0876", val: "64,500", tax: "11,610", match: true },
  { gstin: "24AAECG3...", inv: "INV-2210", val: "2,40,000", tax: "43,200", match: false },
  { gstin: "27AABCS1...", inv: "INV-1043", val: "32,000", tax: "5,760", match: true },
  { gstin: "06AAFCO5...", inv: "INV-9001", val: "88,000", tax: "15,840", match: false },
];

export default function ExtractionDemo() {
  const matched = LINES.filter((l) => l.match).length;
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
          const active = i === 3;
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
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Reconcile · Sundaram Textiles</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>{matched}/{LINES.length} MATCHED · GSTR-2B</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Parsed document */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0 0 12px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>PARSED DOCUMENT</p>
            <div style={{ background: "#0E0E0E", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: "14px", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="2" aria-hidden><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                <span style={{ fontSize: 12.5, color: "#A8A8A8" }}>purchase-register-mar.pdf</span>
              </div>
              {[
                ["Vendor", "Sundaram Yarns"],
                ["GSTIN", "27AABCS1234..."],
                ["Invoice", "INV-1042"],
                ["Date", "18 Mar 2025"],
                ["Taxable", "Rs 1,18,000"],
                ["IGST 18%", "Rs 21,240"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 12, color: "#6B6B6B" }}>{k}</span>
                  <span style={{ fontSize: 12.5, color: "#E8E8E8", fontFamily: "var(--font-geist-mono), monospace" }}>{v}</span>
                </div>
              ))}
              <p style={{ margin: "12px 0 0", fontSize: 11.5, color: GOOD, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOOD }} /> Read automatically, fields extracted
              </p>
            </div>
          </div>

          {/* GSTR-2B match */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>GSTR-2B reconciliation</p>
              <span style={{ fontSize: 11, color: WARN, border: `1px solid ${WARN}`, borderRadius: 999, padding: "2px 9px" }}>2 to review</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["GSTIN", "Invoice", "Taxable", "Tax", "Match"].map((th, i) => (
                    <th key={th} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.06em", color: "#6B6B6B", fontWeight: 500, padding: "0 0 10px", textAlign: i >= 2 ? "right" : "left" }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LINES.map((l) => (
                  <tr key={l.inv} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ fontSize: 12, padding: "11px 0", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{l.gstin}</td>
                    <td style={{ fontSize: 12.5, color: "#E8E8E8", fontFamily: "var(--font-geist-mono), monospace" }}>{l.inv}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{l.val}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{l.tax}</td>
                    <td style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 10.5, color: l.match ? GOOD : WARN, border: `1px solid ${l.match ? GOOD : WARN}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{l.match ? "Matched" : "Flagged"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "auto", paddingTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11.5, color: "#6B6B6B" }}>Maker: auto-extract · Checker: pending review</span>
              <button type="button" style={{ marginLeft: "auto", fontSize: 12.5, color: "#0A0A0A", background: ACCENT, borderRadius: 999, padding: "8px 16px", border: "none", fontWeight: 600, cursor: "pointer" }}>Approve matched</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
