import type { Metadata } from "next";

// Real full-screen demo: the Smart Calendar for "Glow Studio", a day view by
// stylist with booking statuses and a refilled slot. Not indexed.
export const metadata: Metadata = {
  title: "Smart Calendar demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#D6336C";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const WAIT = "#E0B341";

const NAV = ["Calendar", "Clients", "Today", "Staff", "Inventory", "Settings"];

type Slot = { time: string; client: string; svc: string; status: "Confirmed" | "Reminded" | "Refilled" | "Open"; tone: string };
const COLS: { stylist: string; slots: Slot[] }[] = [
  {
    stylist: "Riya",
    slots: [
      { time: "3:00", client: "Neha S", svc: "Cut + blow-dry", status: "Confirmed", tone: GOOD },
      { time: "4:00", client: "Refilled from waitlist", svc: "Global colour", status: "Refilled", tone: ACCENT },
      { time: "5:30", client: "Aisha K", svc: "Root touch-up", status: "Reminded", tone: WAIT },
    ],
  },
  {
    stylist: "Karan",
    slots: [
      { time: "3:00", client: "Rohan M", svc: "Beard + cut", status: "Confirmed", tone: GOOD },
      { time: "4:30", client: "Open", svc: "", status: "Open", tone: "#5A5A5A" },
      { time: "5:30", client: "Sameer T", svc: "Hair spa", status: "Confirmed", tone: GOOD },
    ],
  },
  {
    stylist: "Fatima",
    slots: [
      { time: "3:30", client: "Priya N", svc: "Manicure", status: "Reminded", tone: WAIT },
      { time: "4:30", client: "Divya R", svc: "Facial", status: "Confirmed", tone: GOOD },
      { time: "6:00", client: "Open", svc: "", status: "Open", tone: "#5A5A5A" },
    ],
  },
];

export default function CalendarDemo() {
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
          const active = i === 0;
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
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Today · Saturday</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> 1 SLOT AUTO-REFILLED
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["BOOKED TODAY", "31", "#F5F5F5"],
            ["CONFIRMED", "27", GOOD],
            ["WAITLIST", "6", WAIT],
            ["NO-SHOW RATE", "5%", MONEY],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, flex: 1, minHeight: 0 }}>
          {COLS.map((col) => (
            <div key={col.stylist} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(214,51,108,0.18)", color: "#EE6F9C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{col.stylist[0]}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{col.stylist}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {col.slots.map((s) => (
                  <div key={s.time} style={{ display: "flex", gap: 11, padding: "10px 12px", borderRadius: 10, background: s.status === "Open" ? "transparent" : "#161616", border: s.status === "Open" ? "1px dashed rgba(255,255,255,0.14)" : s.status === "Refilled" ? `1px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ width: 36, fontSize: 12, color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace", flexShrink: 0 }}>{s.time}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 12.5, color: s.status === "Open" ? "#6B6B6B" : "#E8E8E8", fontWeight: s.status === "Open" ? 400 : 600 }}>{s.client}</p>
                      {s.svc ? <p style={{ margin: "2px 0 0", fontSize: 11, color: "#8A8A8A" }}>{s.svc}</p> : null}
                      {s.status !== "Open" ? <span style={{ display: "inline-block", marginTop: 5, fontSize: 9.5, color: s.tone, border: `1px solid ${s.tone}`, borderRadius: 999, padding: "1px 7px" }}>{s.status}</span> : null}
                    </div>
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
