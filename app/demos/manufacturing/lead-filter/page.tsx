import type { Metadata } from "next";

// Real full-screen demo: the Lead Filter for "Bharat Industries", scoring and
// verifying portal enquiries so reps only see real buyers. Not indexed.
export const metadata: Metadata = {
  title: "Lead Filter demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#E8602C";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const JUNK = "#6B6B6B";

const NAV = ["Leads", "Quotes", "Outreach", "Distributors", "Catalogue", "Settings"];

type Lead = {
  name: string;
  need: string;
  source: string;
  score: number;
  status: "Pinged to rep" | "Verified" | "Junk" | "Checking";
  active?: boolean;
};
const LEADS: Lead[] = [
  { name: "Sundaram Metals", need: "MS pipes, 12 ton", source: "IndiaMART", score: 92, status: "Pinged to rep", active: true },
  { name: "Apex Build Co", need: "TMT bars, bulk", source: "TradeIndia", score: 88, status: "Verified" },
  { name: "(unverified)", need: "price only", source: "JustDial", score: 14, status: "Junk" },
  { name: "Reliance Infra (?)", need: "catalogue req", source: "IndiaMART", score: 71, status: "Checking" },
  { name: "(student project)", need: "sample rates", source: "JustDial", score: 9, status: "Junk" },
  { name: "Gokul Traders", need: "GI sheets, monthly", source: "WhatsApp", score: 84, status: "Verified" },
  { name: "(competitor)", need: "full price list", source: "IndiaMART", score: 6, status: "Junk" },
  { name: "Nexus Fabricators", need: "angles + channels", source: "TradeIndia", score: 79, status: "Verified" },
];

function scoreTone(s: number) {
  return s >= 80 ? GOOD : s >= 50 ? MONEY : JUNK;
}

export default function LeadFilterDemo() {
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
          const active = i === 0;
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
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Lead Filter</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>52 IN · 5 REAL · 47 FILTERED</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["ENQUIRIES TODAY", "52", "#F5F5F5"],
            ["VERIFIED REAL", "5", GOOD],
            ["JUNK FILTERED", "47", JUNK],
            ["AVG RESPONSE", "38s", MONEY],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Incoming enquiries</p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Buyer", "Requirement", "Source", "Score", "Status"].map((th, i) => (
                  <th key={th} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.06em", color: "#6B6B6B", fontWeight: 500, padding: "0 0 10px", textAlign: i >= 3 ? "right" : "left" }}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEADS.map((l) => {
                const junk = l.status === "Junk";
                return (
                  <tr key={l.name + l.need} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", opacity: junk ? 0.5 : 1, background: l.active ? "rgba(232,96,44,0.07)" : "transparent" }}>
                    <td style={{ fontSize: 13, padding: "11px 0", color: junk ? "#8A8A8A" : "#F5F5F5" }}>{l.name}</td>
                    <td style={{ fontSize: 12.5, color: "#A8A8A8" }}>{l.need}</td>
                    <td style={{ fontSize: 12, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>{l.source}</td>
                    <td style={{ fontSize: 13, textAlign: "right", color: scoreTone(l.score), fontFamily: "var(--font-geist-mono), monospace" }}>{l.score}</td>
                    <td style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 10.5, color: junk ? JUNK : l.status === "Pinged to rep" ? ACCENT : l.status === "Checking" ? MONEY : GOOD, border: `1px solid ${junk ? JUNK : l.status === "Pinged to rep" ? ACCENT : l.status === "Checking" ? MONEY : GOOD}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{l.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
