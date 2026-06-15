import type { Metadata } from "next";

// Real full-screen demo: the Attendance and Alerts dashboard for "Pinnacle
// Classes", batch grid + parent-alert feed. Not indexed.
export const metadata: Metadata = {
  title: "Attendance and Alerts demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#F0A92B";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const ABSENT = "#E5847C";

const NAV = ["Admissions", "Fees", "Attendance", "Results", "Batches", "Settings"];

// 8 x 5 attendance grid; false = absent.
const STUDENTS = [
  "Aarav G", "Diya S", "Kabir S", "Ananya R", "Vihaan M", "Ishita N", "Reyansh J", "Sara K",
];
const GRID: boolean[][] = [
  [true, true, true, true, true],
  [true, false, true, true, true],
  [true, true, true, true, true],
  [true, true, false, true, false],
  [true, true, true, true, true],
  [false, true, true, true, true],
  [true, true, true, false, true],
  [true, true, true, true, true],
];

const ALERTS = [
  { name: "Diya Sharma", note: "Absent today, parent alerted on WhatsApp", time: "10:14" },
  { name: "Ananya Rao", note: "2nd absence this week, alert + flag raised", time: "10:14" },
  { name: "Reyansh Jain", note: "Absent today, parent alerted on WhatsApp", time: "10:15" },
];

export default function AttendanceDemo() {
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
      <aside style={{ width: 214, flexShrink: 0, background: "#0E0E0E", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "22px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 22px" }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT }} />
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Pinnacle</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 2;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(240,169,43,0.16)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Attendance · NEET Dropper</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> SYNCED · ALERTS SENT
          </span>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["PRESENT TODAY", "35 / 38", GOOD],
            ["ABSENT", "3", ABSENT],
            ["PARENT ALERTS SENT", "3", MONEY],
            ["WEEK AVG", "94%", "#F5F5F5"],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Attendance grid */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>This week</p>
              <div style={{ display: "flex", gap: 14 }}>
                <span style={{ fontSize: 11, color: GOOD, display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: GOOD }} /> Present</span>
                <span style={{ fontSize: 11, color: ABSENT, display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: "rgba(229,132,124,0.25)", border: `1px solid ${ABSENT}` }} /> Absent</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "120px repeat(5, 1fr)", gap: 8, alignItems: "center" }}>
              <span />
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                <span key={d} style={{ fontSize: 10.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace", textAlign: "center" }}>{d}</span>
              ))}
              {STUDENTS.map((s, r) => (
                <RowFrag key={s} name={s} marks={GRID[r]} good={GOOD} absent={ABSENT} />
              ))}
            </div>
          </div>

          {/* Alerts feed */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Parent alerts</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {ALERTS.map((a) => (
                <div key={a.name} style={{ display: "flex", gap: 11, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: "rgba(37,211,102,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366" aria-hidden><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Z" /></svg>
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{a.name}</span>
                      <span style={{ fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>{a.time}</span>
                    </div>
                    <p style={{ margin: "3px 0 0", fontSize: 12, color: "#A8A8A8", lineHeight: 1.4 }}>{a.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 14, fontSize: 11.5, color: "#6B6B6B", lineHeight: 1.5 }}>
              Sent the moment attendance was marked, not at the next test.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function RowFrag({ name, marks, good, absent }: { name: string; marks: boolean[]; good: string; absent: string }) {
  return (
    <>
      <span style={{ fontSize: 12.5, color: "#D8D8D8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>
      {marks.map((m, i) => (
        <span
          key={i}
          style={{
            height: 26,
            borderRadius: 6,
            background: m ? good : "rgba(229,132,124,0.18)",
            border: m ? "none" : `1px solid ${absent}`,
          }}
        />
      ))}
    </>
  );
}
