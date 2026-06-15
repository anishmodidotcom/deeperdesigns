import type { Metadata } from "next";

// Real full-screen demo: the Control Room for "Sharma Transport", live trip
// status, a route strip and an exceptions feed. Not indexed.
export const metadata: Metadata = {
  title: "Control Room demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#F59F00";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const WARN = "#E5847C";
const MOVE = "#5B8DEF";

const NAV = ["Control", "Trips", "ePOD", "Fuel", "Audit", "Settings"];

type Trip = { id: string; route: string; status: "Loading" | "In transit" | "Delayed" | "Delivered"; tone: string; pct: number };
const TRIPS: Trip[] = [
  { id: "TRP-4471", route: "Pune → Surat", status: "In transit", tone: MOVE, pct: 62 },
  { id: "TRP-4468", route: "Nagpur → Indore", status: "Delayed", tone: WARN, pct: 40 },
  { id: "TRP-4465", route: "Mumbai → Pune", status: "Delivered", tone: GOOD, pct: 100 },
  { id: "TRP-4472", route: "Surat → Ahmedabad", status: "Loading", tone: ACCENT, pct: 8 },
  { id: "TRP-4470", route: "Pune → Hyderabad", status: "In transit", tone: MOVE, pct: 78 },
  { id: "TRP-4463", route: "Indore → Bhopal", status: "Delivered", tone: GOOD, pct: 100 },
];

const EXC = [
  { trip: "TRP-4468", note: "Stopped 90 min beyond schedule near Dhule", tone: WARN },
  { trip: "TRP-4470", note: "Route deviation flagged, 12 km off corridor", tone: WARN },
];

export default function ControlRoomDemo() {
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
          const active = i === 0;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(245,159,0,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Control Room</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> 38 VEHICLES LIVE
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["IN TRANSIT", "21", MOVE],
            ["LOADING", "5", ACCENT],
            ["DELAYED", "3", WARN],
            ["DELIVERED TODAY", "47", GOOD],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Live trips</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {TRIPS.map((t) => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 78, fontSize: 12, color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace", flexShrink: 0 }}>{t.id}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: "0 0 6px", fontSize: 13, color: "#E8E8E8" }}>{t.route}</p>
                    <div style={{ height: 5, borderRadius: 999, background: "#1B1B1B", overflow: "hidden" }}>
                      <div style={{ width: `${t.pct}%`, height: "100%", borderRadius: 999, background: t.tone }} />
                    </div>
                  </div>
                  <span style={{ width: 76, textAlign: "right", fontSize: 10.5, color: t.tone, border: `1px solid ${t.tone}`, borderRadius: 999, padding: "2px 8px", whiteSpace: "nowrap", flexShrink: 0 }}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, minHeight: 0 }}>
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 13px", fontSize: 13.5, fontWeight: 600 }}>Exceptions</p>
              {EXC.map((e) => (
                <div key={e.trip} style={{ display: "flex", gap: 10, paddingBottom: 11, marginBottom: 11, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={e.tone} strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: e.tone, fontFamily: "var(--font-geist-mono), monospace" }}>{e.trip}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 12, color: "#A8A8A8", lineHeight: 1.4 }}>{e.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1 }}>
              <p style={{ margin: "0 0 13px", fontSize: 13.5, fontWeight: 600 }}>Tracking links</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Customer link · TRP-4471", "Driver link · TRP-4472"].map((l) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "#D8D8D8" }}>
                    <span style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(37,211,102,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366" aria-hidden><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Z" /></svg>
                    </span>
                    {l}
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 13, fontSize: 11.5, color: "#6B6B6B", lineHeight: 1.5 }}>Shared on WhatsApp, no app for the driver or customer to install.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
