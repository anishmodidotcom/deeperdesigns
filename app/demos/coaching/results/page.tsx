import type { Metadata } from "next";

// Real full-screen demo: the Results and Parent Hub for "Pinnacle Classes",
// report-card preview + broadcast + per-student trend. Not indexed.
export const metadata: Metadata = {
  title: "Results and Parent Hub demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#F0A92B";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Admissions", "Fees", "Attendance", "Results", "Batches", "Settings"];

const SUBJECTS = [
  { name: "Physics", marks: 84, max: 100 },
  { name: "Chemistry", marks: 76, max: 100 },
  { name: "Biology", marks: 91, max: 100 },
];

const TREND = [62, 68, 65, 72, 78, 81, 84];

export default function ResultsDemo() {
  const w = 320;
  const h = 120;
  const max = 100;
  const stepX = w / (TREND.length - 1);
  const pts = TREND.map((v, i) => [i * stepX, h - (v / max) * (h - 14) - 7]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

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
          const active = i === 3;
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
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Results and Parent Hub</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>WEEKLY TEST 12 · 38 REPORT CARDS</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Report card preview */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "18px 20px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>AUTO-GENERATED REPORT CARD</p>
              <span style={{ fontSize: 11, color: GOOD, border: `1px solid ${GOOD}`, borderRadius: 999, padding: "2px 9px" }}>Ready</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(240,169,43,0.18)", color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600 }}>DS</span>
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Diya Sharma</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#8A8A8A" }}>NEET Dropper · Roll 14</p>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 24, fontWeight: 600, color: MONEY }}>251/300</p>
                <p style={{ margin: "2px 0 0", fontSize: 11.5, color: GOOD }}>Rank 4 of 38</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SUBJECTS.map((s) => {
                const pct = Math.round((s.marks / s.max) * 100);
                return (
                  <div key={s.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, color: "#D8D8D8" }}>{s.name}</span>
                      <span style={{ fontSize: 12.5, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{s.marks}/{s.max}</span>
                    </div>
                    <div style={{ height: 7, borderRadius: 999, background: "#1B1B1B", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: ACCENT }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <button style={{ marginTop: "auto", width: "100%", background: ACCENT, color: "#0A0A0A", fontSize: 14, fontWeight: 600, padding: "12px", borderRadius: 11, border: "none", cursor: "pointer", marginBlockStart: 18 }}>
              Send all 38 to parents
            </button>
          </div>

          {/* Broadcast + trend */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, minHeight: 0 }}>
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Parent broadcasts</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {[
                  ["Test 12 report cards", "Queued · 38 parents", MONEY],
                  ["Holiday notice (Eid)", "Sent · 412 parents", GOOD],
                  ["New crash-batch schedule", "Sent · 96 parents", GOOD],
                ].map(([t, s, tone]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 11, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: tone as string, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 13, color: "#D8D8D8" }}>{t}</span>
                    <span style={{ fontSize: 11.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Diya, last 7 tests</p>
                <span style={{ fontSize: 11, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>+22 pts</span>
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                  <defs>
                    <linearGradient id="rcfill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity="0.32" />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${line} L${w} ${h} L0 ${h} Z`} fill="url(#rcfill)" />
                  <path d={line} fill="none" stroke={ACCENT} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
