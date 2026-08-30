import type { Metadata } from "next";

// Real full-screen demo: the Quote Engine for "Bharat Industries", a spec form
// on the left and a live branded quotation preview on the right. Not indexed.
export const metadata: Metadata = {
  title: "Quote Engine demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#C2410C";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Leads", "Quotes", "Outreach", "Distributors", "Catalogue", "Settings"];

const LINES = [
  { item: "MS Pipe 2in, B-class", qty: "8,000 m", rate: "82.00", amount: "6,56,000" },
  { item: "MS Pipe 3in, B-class", qty: "3,200 m", rate: "138.00", amount: "4,41,600" },
  { item: "Galvanising surcharge", qty: "11,200 m", rate: "9.50", amount: "1,06,400" },
];

export default function QuoteEngineDemo() {
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
          const active = i === 1;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(194,65,12,0.16)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "340px 1fr", minHeight: 0 }}>
        {/* Spec form */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>New quotation</h1>
          <p style={{ margin: "-6px 0 0", fontSize: 12.5, color: "#8A8A8A" }}>Sundaram Metals · IndiaMART</p>
          {[
            ["BUYER", "Sundaram Metals Pvt Ltd"],
            ["PRODUCT", "MS Pipes, B-class"],
            ["QUANTITY", "11,200 m total"],
            ["DELIVERY", "Ex-works, 2 weeks"],
            ["PAYMENT TERMS", "30% advance, 70% on dispatch"],
          ].map(([k, v]) => (
            <div key={k}>
              <p style={{ margin: "0 0 6px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "10px 12px", fontSize: 13, color: "#E8E8E8" }}>{v}</div>
            </div>
          ))}
          <button type="button" style={{ marginTop: "auto", width: "100%", background: ACCENT, color: "#0A0A0A", fontSize: 14, fontWeight: 600, padding: "12px", borderRadius: 11, border: "none", cursor: "pointer" }}>
            Generate quote
          </button>
        </div>

        {/* Live preview */}
        <div style={{ padding: "20px 28px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>LIVE QUOTE PREVIEW</p>
            <span style={{ fontSize: 11.5, color: GOOD, fontFamily: "var(--font-geist-mono), monospace", display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> READY IN 4s</span>
          </div>
          <div style={{ flex: 1, background: "#F7F4EF", borderRadius: 12, padding: "24px 26px", color: "#1A1A1A", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #1A1A1A", paddingBottom: 14 }}>
              <div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>BHARAT INDUSTRIES</p>
                <p style={{ margin: "3px 0 0", fontSize: 11, color: "#5A5A5A" }}>GSTIN 27AABCB1234C1ZV · Pune</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>QUOTATION</p>
                <p style={{ margin: "3px 0 0", fontSize: 11, color: "#5A5A5A", fontFamily: "var(--font-geist-mono), monospace" }}>BI/Q/2291</p>
              </div>
            </div>
            <p style={{ margin: "12px 0 4px", fontSize: 11, color: "#5A5A5A" }}>To</p>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Sundaram Metals Pvt Ltd</p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #C9C2B5" }}>
                  {["Item", "Qty", "Rate", "Amount (Rs)"].map((th, i) => (
                    <th key={th} style={{ fontSize: 10.5, color: "#5A5A5A", fontWeight: 600, padding: "0 0 8px", textAlign: i === 0 ? "left" : "right" }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LINES.map((l) => (
                  <tr key={l.item} style={{ borderBottom: "1px solid #E4DECF" }}>
                    <td style={{ fontSize: 12.5, padding: "9px 0" }}>{l.item}</td>
                    <td style={{ fontSize: 12, textAlign: "right", color: "#3A3A3A", fontFamily: "var(--font-geist-mono), monospace" }}>{l.qty}</td>
                    <td style={{ fontSize: 12, textAlign: "right", color: "#3A3A3A", fontFamily: "var(--font-geist-mono), monospace" }}>{l.rate}</td>
                    <td style={{ fontSize: 12.5, textAlign: "right", fontFamily: "var(--font-geist-mono), monospace" }}>{l.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: 240 }}>
                {[
                  ["Subtotal", "12,04,000"],
                  ["GST 18%", "2,16,720"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "3px 0", color: "#3A3A3A" }}>
                    <span>{k}</span><span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #1A1A1A", marginTop: 6, paddingTop: 8, fontSize: 15, fontWeight: 700 }}>
                  <span>Total</span><span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>Rs 14,20,720</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <span style={{ fontSize: 12.5, color: "#0A0A0A", background: ACCENT, borderRadius: 999, padding: "8px 16px", fontWeight: 600 }}>Send on WhatsApp</span>
            <span style={{ fontSize: 12.5, color: "#A8A8A8", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, padding: "8px 16px" }}>Email PDF</span>
            <span style={{ fontSize: 12.5, color: "#A8A8A8", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, padding: "8px 16px" }}>Download</span>
          </div>
        </div>
      </div>
    </main>
  );
}
