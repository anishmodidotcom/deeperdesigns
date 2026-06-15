import type { Metadata } from "next";

// Real full-screen demo: the Smart Calendar for "Sukoon Clinic", day view by
// doctor with confirmations, waitlist refill and no-show stats. Not indexed.
export const metadata: Metadata = {
  title: "Smart Calendar demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#5B8DEF";
const MONEY = "#5BC8A0";
const GOOD = "#5BC8A0";
const WAIT = "#E0B341";

const NAV = ["Today", "Calendar", "Recall", "Patients", "Reports", "Settings"];

type Slot = { time: string; patient: string; status: "Confirmed" | "Reminded" | "Refilled" | "Open"; tone: string };
const DR_MEHRA: Slot[] = [
  { time: "5:00", patient: "Sunita Joshi", status: "Confirmed", tone: GOOD },
  { time: "5:30", patient: "Arjun Das", status: "Reminded", tone: WAIT },
  { time: "6:00", patient: "Refilled from waitlist", status: "Refilled", tone: ACCENT },
  { time: "6:30", patient: "Rahul Verma", status: "Confirmed", tone: GOOD },
  { time: "7:00", patient: "Open", status: "Open", tone: "#5A5A5A" },
];
const DR_RAO: Slot[] = [
  { time: "5:00", patient: "Meera Pillai", status: "Confirmed", tone: GOOD },
  { time: "5:30", patient: "Imran Q.", status: "Reminded", tone: WAIT },
  { time: "6:00", patient: "Lata Bhat", status: "Confirmed", tone: GOOD },
  { time: "6:30", patient: "Open", status: "Open", tone: "#5A5A5A" },
  { time: "7:00", patient: "Karan S.", status: "Confirmed", tone: GOOD },
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
      {/* Sidebar */}
      <aside style={{ width: 210, flexShrink: 0, background: "#0E0E0E", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "22px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 22px" }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT }} />
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Sukoon</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 1;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(91,141,239,0.16)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Smart Calendar · Today</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> 1 SLOT AUTO-REFILLED TODAY
          </span>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["BOOKED TODAY", "26", "#F5F5F5"],
            ["CONFIRMED", "23", GOOD],
            ["WAITLIST", "5", WAIT],
            ["NO-SHOW RATE", "4%", MONEY],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        {/* Two doctors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {[
            { dr: "Dr Mehra", spec: "General Physician", slots: DR_MEHRA },
            { dr: "Dr Rao", spec: "Dermatology", slots: DR_RAO },
          ].map((col) => (
            <div key={col.dr} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{col.dr}</p>
                <span style={{ fontSize: 11.5, color: "#8A8A8A" }}>{col.spec}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {col.slots.map((s) => (
                  <div key={s.time} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: s.status === "Open" ? "transparent" : "#161616", border: s.status === "Open" ? "1px dashed rgba(255,255,255,0.14)" : s.status === "Refilled" ? `1px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ width: 44, fontSize: 13, color: "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace" }}>{s.time}</span>
                    <span style={{ flex: 1, fontSize: 13, color: s.status === "Open" ? "#6B6B6B" : "#E8E8E8" }}>{s.patient}</span>
                    <span style={{ fontSize: 10.5, color: s.tone, border: `1px solid ${s.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{s.status}</span>
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
