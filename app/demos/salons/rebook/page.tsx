import type { Metadata } from "next";

// Real full-screen demo: the Rebook Engine for "Glow Studio", due-to-rebook
// list, a WhatsApp nudge preview and a membership panel. Not indexed.
export const metadata: Metadata = {
  title: "Rebook Engine demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#D6336C";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Calendar", "Clients", "Today", "Staff", "Inventory", "Settings"];

const DUE = [
  { name: "Neha Sharma", last: "Cut + colour, 6 wks ago", status: "Nudge sent", tone: ACCENT, active: true },
  { name: "Aisha Khan", last: "Root touch-up, 5 wks ago", status: "Due now", tone: MONEY },
  { name: "Divya Rao", last: "Facial, 4 wks ago", status: "Nudge sent", tone: ACCENT },
  { name: "Sameer Tha", last: "Hair spa, 7 wks ago", status: "Lapsing", tone: "#E5847C" },
  { name: "Priya Nair", last: "Mani-pedi, 3 wks ago", status: "Scheduled", tone: GOOD },
];

export default function RebookDemo() {
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
          const active = i === 1;
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
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Rebook Engine</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>48 DUE THIS WEEK</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["CLIENTS RETURNED", "Rs 1.6L", MONEY],
            ["NUDGES SENT", "186", ACCENT],
            ["REBOOK RATE", "38%", GOOD],
            ["LAPSED", "22", "#E5847C"],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Due to rebook</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {DUE.map((d) => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)", background: d.active ? "rgba(214,51,108,0.07)" : "transparent" }}>
                  <span style={{ width: 32, height: 32, flexShrink: 0, borderRadius: "50%", background: "rgba(214,51,108,0.16)", color: "#EE6F9C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
                    {d.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{d.name}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#8A8A8A" }}>{d.last}</p>
                  </div>
                  <span style={{ fontSize: 10.5, color: d.tone, border: `1px solid ${d.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, minHeight: 0 }}>
            <div style={{ background: "#111111", border: `1px solid ${ACCENT}`, borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 12px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>NUDGE PREVIEW</p>
              <div style={{ background: "#0B141A", borderRadius: 12, padding: 12 }}>
                <div style={{ background: "#005C4B", borderRadius: "8px 8px 4px 8px", padding: "10px 12px" }}>
                  <p style={{ margin: 0, color: "#E9EDEF", fontSize: 13.5, lineHeight: 1.5 }}>
                    Hi Neha, it has been six weeks since your last cut and colour with Riya. Shall we book your touch-up this weekend?
                  </p>
                  <span style={{ display: "inline-block", marginTop: 8, fontSize: 11.5, color: "#53BDEB", border: "1px solid #53BDEB", borderRadius: 999, padding: "2px 10px" }}>Book with Riya</span>
                </div>
              </div>
            </div>

            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1 }}>
              <p style={{ margin: "0 0 13px", fontSize: 13.5, fontWeight: 600 }}>Memberships</p>
              {[
                ["Gold (unlimited blow-dry)", "42 active", GOOD],
                ["Colour package, 6 sittings", "28 active", GOOD],
                ["Expiring this month", "7", MONEY],
              ].map(([k, v, tone]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 12.5, color: "#D8D8D8" }}>{k}</span>
                  <span style={{ fontSize: 12, color: tone as string, fontFamily: "var(--font-geist-mono), monospace" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
