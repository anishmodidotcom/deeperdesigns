import type { Metadata } from "next";

// Real full-screen demo: the Recall Engine for "Sukoon Clinic", due recalls
// with reason + a WhatsApp recall preview + patients-returned metric.
// Not indexed.
export const metadata: Metadata = {
  title: "Recall Engine demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#5B8DEF";
const MONEY = "#5BC8A0";
const GOOD = "#5BC8A0";

const NAV = ["Today", "Calendar", "Recall", "Patients", "Reports", "Settings"];

const DUE = [
  { name: "Sunita Joshi", reason: "6-month dental check", last: "12 Dec", active: true },
  { name: "Pradeep Kumar", reason: "BP follow-up", last: "18 May" },
  { name: "Fatima Sheikh", reason: "Physio review", last: "02 Apr" },
  { name: "Naveen Reddy", reason: "Diabetes check-up", last: "21 Mar" },
  { name: "Anjali Menon", reason: "Skin treatment follow-up", last: "09 May" },
  { name: "Harish Patel", reason: "Annual health check", last: "last year" },
];

export default function RecallDemo() {
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
          const active = i === 2;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(91,141,239,0.16)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Due recalls */}
        <section style={{ width: 470, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ padding: "20px 22px 14px" }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Recall Engine</h1>
            <p style={{ margin: "6px 0 0", fontSize: 12.5, color: "#8A8A8A" }}>42 patients due this week, auto-recalled on WhatsApp</p>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {DUE.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderTop: "1px solid rgba(255,255,255,0.06)", background: d.active ? "rgba(91,141,239,0.08)" : "transparent", borderLeft: d.active ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
                <span style={{ width: 34, height: 34, flexShrink: 0, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600 }}>
                  {d.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{d.name}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8A8A8A" }}>{d.reason}</p>
                </div>
                <span style={{ fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace", whiteSpace: "nowrap" }}>last {d.last}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Detail: WhatsApp preview + metric */}
        <section style={{ flex: 1, padding: "22px 26px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "18px 20px" }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>RECALL MESSAGE PREVIEW</p>
            <div style={{ background: "#0B141A", borderRadius: 12, padding: "14px" }}>
              <div style={{ background: "#005C4B", borderRadius: "8px 8px 4px 8px", padding: "10px 12px", maxWidth: "92%" }}>
                <p style={{ margin: 0, color: "#E9EDEF", fontSize: 14, lineHeight: 1.5 }}>
                  Hello Sunita, it has been six months since your last dental check at Sukoon Clinic. Dr Mehra recommends a review. Tap to book a slot this week.
                </p>
                <span style={{ display: "inline-block", marginTop: 9, fontSize: 11.5, color: "#53BDEB", border: "1px solid #53BDEB", borderRadius: 999, padding: "2px 10px" }}>Book my check-up</span>
                <span style={{ display: "block", textAlign: "right", color: "#A7C4BC", fontSize: 11, marginTop: 6 }}>now</span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#111111", border: `1px solid ${ACCENT}`, borderRadius: 13, padding: "18px 20px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: "#6B6B6B" }}>PATIENTS RETURNED</p>
              <p style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 600, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>128</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: GOOD }}>this quarter, from recalls</p>
            </div>
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "18px 20px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: "#6B6B6B" }}>RECALL RESPONSE RATE</p>
              <p style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 600, color: "#F5F5F5", fontFamily: "var(--font-geist-mono), monospace" }}>41%</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8A8A8A" }}>booked within 7 days</p>
            </div>
          </div>

          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1 }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Recall types running</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Follow-up reviews", "live"],
                ["Annual check-ups", "live"],
                ["Lapsed patient reactivation", "live"],
                ["Package renewals", "live"],
              ].map(([t, s]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#D8D8D8" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} />
                  {t}
                  <span style={{ marginLeft: "auto", fontSize: 11, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
