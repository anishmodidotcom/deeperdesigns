import type { Metadata } from "next";

// Real full-screen demo: the Admissions Desk CRM for "Pinnacle Classes",
// enquiry pipeline with follow-up history and batch fill. Not indexed.
export const metadata: Metadata = {
  title: "Admissions Desk demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#F25F4C";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Admissions", "Fees", "Attendance", "Results", "Batches", "Settings"];

type Stage = { label: string; tone: string };
const ENQ: { name: string; course: string; source: string; stage: Stage; active?: boolean }[] = [
  { name: "Aarav Gupta", course: "JEE 2-Year", source: "Walk-in", stage: { label: "Demo booked", tone: ACCENT }, active: true },
  { name: "Diya Sharma", course: "NEET Dropper", source: "Instagram", stage: { label: "Contacted", tone: MONEY } },
  { name: "Kabir Singh", course: "Foundation IX", source: "Referral", stage: { label: "Admitted", tone: GOOD } },
  { name: "Ananya Rao", course: "JEE 2-Year", source: "Website", stage: { label: "New", tone: "#8A8A8A" } },
  { name: "Vihaan Mehta", course: "NEET 1-Year", source: "Justdial", stage: { label: "Contacted", tone: MONEY } },
  { name: "Ishita Nair", course: "Foundation X", source: "Walk-in", stage: { label: "Demo booked", tone: ACCENT } },
  { name: "Reyansh Jain", course: "JEE Crash", source: "Instagram", stage: { label: "New", tone: "#8A8A8A" } },
];

const BATCHES = [
  { name: "JEE 2-Year (Morning)", filled: 42, cap: 50 },
  { name: "NEET Dropper", filled: 38, cap: 40 },
  { name: "Foundation IX", filled: 24, cap: 45 },
];

export default function AdmissionsDemo() {
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
      <aside
        style={{
          width: 214,
          flexShrink: 0,
          background: "#0E0E0E",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          padding: "22px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 22px" }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT }} />
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Pinnacle
          </span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 0;
          return (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "9px 11px",
                borderRadius: 9,
                fontSize: 14,
                color: active ? "#FFFFFF" : "#A8A8A8",
                background: active ? "rgba(242,95,76,0.16)" : "transparent",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Enquiry list */}
        <section style={{ width: 430, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ padding: "20px 22px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Admissions Desk</h1>
            <span style={{ fontSize: 12, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>104 OPEN</span>
          </div>
          <div style={{ padding: "0 22px 12px", display: "flex", gap: 8 }}>
            {["All", "New", "Demo booked", "Admitted"].map((f, i) => (
              <span key={f} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 999, color: i === 0 ? "#0A0A0A" : "#A8A8A8", background: i === 0 ? "#F5F5F5" : "transparent", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)", fontWeight: i === 0 ? 600 : 400, whiteSpace: "nowrap" }}>
                {f}
              </span>
            ))}
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {ENQ.map((e) => (
              <div
                key={e.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 22px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  background: e.active ? "rgba(242,95,76,0.08)" : "transparent",
                  borderLeft: e.active ? `2px solid ${ACCENT}` : "2px solid transparent",
                }}
              >
                <span style={{ width: 34, height: 34, flexShrink: 0, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600 }}>
                  {e.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.name}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8A8A8A" }}>{e.course} · {e.source}</p>
                </div>
                <span style={{ fontSize: 11, color: e.stage.tone, border: `1px solid ${e.stage.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{e.stage.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Detail */}
        <section style={{ flex: 1, padding: "22px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(242,95,76,0.18)", color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600 }}>AG</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>Aarav Gupta</h2>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8A8A8A" }}>JEE 2-Year · parent +91 99XX 20184</p>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 12, color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 999, padding: "5px 12px" }}>Demo: Sat 4 PM</span>
          </div>

          {/* Follow-up history */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1, minHeight: 0 }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>FOLLOW-UP HISTORY</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {[
                ["WhatsApp sent", "Auto: course details + fee structure", "Mon"],
                ["Call connected", "Counsellor Priya, 4m, interested", "Tue"],
                ["WhatsApp sent", "Auto: demo-class invite, booked", "Wed"],
                ["Reminder queued", "Demo reminder, Sat 9 AM", "Next"],
              ].map(([t, d, day], i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <span style={{ width: 8, height: 8, marginTop: 5, borderRadius: "50%", background: i === 3 ? "#8A8A8A" : GOOD, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600 }}>{t}</span>
                      <span style={{ fontSize: 11.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>{day}</span>
                    </div>
                    <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#A8A8A8" }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Batch fill */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Batch fill</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {BATCHES.map((b) => {
                const pct = Math.round((b.filled / b.cap) * 100);
                return (
                  <div key={b.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12.5, color: "#D8D8D8" }}>{b.name}</span>
                      <span style={{ fontSize: 12, color: pct >= 90 ? GOOD : MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{b.filled}/{b.cap}</span>
                    </div>
                    <div style={{ height: 7, borderRadius: 999, background: "#1B1B1B", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: pct >= 90 ? GOOD : ACCENT }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
