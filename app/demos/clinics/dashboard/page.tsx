import type { Metadata } from "next";

// Real full-screen demo: the Clinic Dashboard for "Sukoon Clinic", the day
// at a glance with a schedule strip and a lab-report delivery feed.
// Not indexed.
export const metadata: Metadata = {
  title: "Clinic Dashboard demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#5B8DEF";
const MONEY = "#5BC8A0";
const GOOD = "#5BC8A0";

const NAV = ["Today", "Calendar", "Recall", "Patients", "Reports", "Settings"];

const SCHEDULE = [
  { time: "5:00", patient: "Sunita Joshi", dr: "Dr Mehra", done: true },
  { time: "5:30", patient: "Arjun Das", dr: "Dr Mehra", done: true },
  { time: "6:00", patient: "Meera Pillai", dr: "Dr Rao", done: false, now: true },
  { time: "6:30", patient: "Rahul Verma", dr: "Dr Mehra", done: false },
  { time: "7:00", patient: "Karan S.", dr: "Dr Rao", done: false },
];

const REPORTS = [
  { name: "Lipid profile · S. Joshi", status: "Delivered", tone: GOOD },
  { name: "CBC · A. Das", status: "Delivered", tone: GOOD },
  { name: "Thyroid · F. Sheikh", status: "Ready, sending", tone: MONEY },
  { name: "HbA1c · N. Reddy", status: "Processing", tone: "#8A8A8A" },
];

export default function DashboardDemo() {
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
          const active = i === 0;
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
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Today at Sukoon</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>SAT 15 JUN · 2 DOCTORS ON</span>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["APPOINTMENTS", "26", "#F5F5F5"],
            ["SEEN SO FAR", "14", GOOD],
            ["REVENUE TODAY", "Rs 84,200", MONEY],
            ["REPORTS PENDING", "2", "#E0B341"],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 25, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Schedule strip */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Schedule</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SCHEDULE.map((s) => (
                <div key={s.time} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 46, fontSize: 13, color: s.now ? ACCENT : "#A8A8A8", fontFamily: "var(--font-geist-mono), monospace", fontWeight: s.now ? 600 : 400 }}>{s.time}</span>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, background: s.done ? GOOD : s.now ? ACCENT : "rgba(255,255,255,0.2)" }} />
                  <span style={{ flex: 1, fontSize: 13.5, color: "#E8E8E8" }}>{s.patient}</span>
                  <span style={{ fontSize: 12, color: "#8A8A8A" }}>{s.dr}</span>
                  {s.now ? <span style={{ fontSize: 10.5, color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 999, padding: "2px 9px" }}>In room</span> : null}
                </div>
              ))}
            </div>
          </div>

          {/* Lab reports */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Lab report delivery</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {REPORTS.map((r) => (
                <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 11, paddingBottom: 11, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: "rgba(91,200,160,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MONEY} strokeWidth="2" aria-hidden><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  </span>
                  <span style={{ flex: 1, fontSize: 12.5, color: "#D8D8D8" }}>{r.name}</span>
                  <span style={{ fontSize: 10.5, color: r.tone, border: `1px solid ${r.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{r.status}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 14, fontSize: 11.5, color: "#6B6B6B", lineHeight: 1.5 }}>
              Delivered to patients on WhatsApp, no chasing calls.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
