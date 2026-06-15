import type { Metadata } from "next";

// Real full-screen demo: the Test-Drive Desk for "Highway Motors", enquiries
// by model with booked slots and AI conversation summary. Not indexed.
export const metadata: Metadata = {
  title: "Test-Drive Desk demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#C92A2A";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Sales", "Inventory", "Service", "Insurance", "Reports", "Settings"];

type Enq = { name: string; model: string; source: string; status: string; tone: string; active?: boolean };
const ENQ: Enq[] = [
  { name: "Rohit Kale", model: "Creta SX", source: "CarWale", status: "TD booked", tone: GOOD, active: true },
  { name: "Sana Khan", model: "Seltos HTX", source: "Website", status: "Responded", tone: MONEY },
  { name: "Joseph M", model: "Nexon EV", source: "WhatsApp", status: "TD booked", tone: GOOD },
  { name: "Pooja Shah", model: "Creta SX", source: "CarDekho", status: "Reminded", tone: ACCENT },
  { name: "Aakash R", model: "Scorpio N", source: "Walk-in", status: "Responded", tone: MONEY },
  { name: "Farah A", model: "Seltos HTX", source: "WhatsApp", status: "TD booked", tone: GOOD },
];

export default function TestDriveDeskDemo() {
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
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Highway Motors</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 0;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(201,42,42,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <section style={{ width: 420, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ padding: "20px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Test-Drive Desk</h1>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> LIVE</span>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {ENQ.map((e) => (
              <div key={e.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderTop: "1px solid rgba(255,255,255,0.06)", background: e.active ? "rgba(201,42,42,0.08)" : "transparent", borderLeft: e.active ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
                <span style={{ width: 34, height: 34, flexShrink: 0, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600 }}>
                  {e.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{e.name}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8A8A8A" }}>{e.model} · {e.source}</p>
                </div>
                <span style={{ fontSize: 10.5, color: e.tone, border: `1px solid ${e.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{e.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ flex: 1, padding: "22px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(201,42,42,0.18)", color: "#E36464", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600 }}>RK</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>Rohit Kale</h2>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8A8A8A" }}>Hyundai Creta SX · +91 99XX 71042</p>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 12, color: GOOD, border: `1px solid ${GOOD}`, borderRadius: 999, padding: "5px 12px" }}>Responded in 41s</span>
          </div>

          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "18px 20px" }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>AI CONVERSATION SUMMARY</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>
              {[["MODEL", "Creta SX (O)"], ["BUDGET", "Rs 18 L, finance"], ["EXCHANGE", "i20, 2019"]].map(([k, v]) => (
                <div key={k}>
                  <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
                  <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 600 }}>{v}</p>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#A8A8A8" }}>
              Wants a weekend test drive, comparing Creta and Seltos. Needs finance and an exchange quote for a 2019 i20. Prefers Saturday morning.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flex: 1, minHeight: 0 }}>
            <div style={{ background: "#111111", border: `1px solid ${ACCENT}`, borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Test drive booked</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ textAlign: "center", background: "rgba(201,42,42,0.16)", borderRadius: 10, padding: "8px 14px" }}>
                  <p style={{ margin: 0, fontSize: 11, color: "#E36464", fontFamily: "var(--font-geist-mono), monospace" }}>SAT</p>
                  <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 600, lineHeight: 1 }}>21</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>10:30 AM</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8A8A8A" }}>Creta SX, white</p>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: GOOD }}>Confirmed on WhatsApp, reminder set Friday 6pm.</p>
            </div>
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>This week</p>
              {[["Test drives booked", "14"], ["Exchange quotes", "9"], ["Finance pre-checks", "6"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 13, color: "#A8A8A8" }}>{k}</span>
                  <span style={{ fontSize: 13, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
