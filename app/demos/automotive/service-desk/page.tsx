import type { Metadata } from "next";

// Real full-screen demo: the Service Desk for "Highway Motors", jobs in
// progress with status, approvals feed and pickup schedule. Not indexed.
export const metadata: Metadata = {
  title: "Service Desk demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#C92A2A";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const WAIT = "#E0B341";

const NAV = ["Sales", "Inventory", "Service", "Insurance", "Reports", "Settings"];

type Job = { car: string; cust: string; stage: "Inspection" | "Approval pending" | "In service" | "Ready"; tone: string };
const JOBS: Job[] = [
  { car: "Creta · KA01 4412", cust: "S. Nair", stage: "In service", tone: ACCENT },
  { car: "Seltos · KA05 8830", cust: "P. Shah", stage: "Approval pending", tone: WAIT },
  { car: "Nexon · KA03 1199", cust: "J. Mathew", stage: "Ready", tone: GOOD },
  { car: "i20 · KA01 7765", cust: "R. Kale", stage: "Inspection", tone: "#8A8A8A" },
  { car: "Scorpio · KA09 2201", cust: "A. Reddy", stage: "In service", tone: ACCENT },
  { car: "Venue · KA02 5540", cust: "F. Ansari", stage: "Ready", tone: GOOD },
];

const APPROVALS = [
  { car: "Seltos · KA05 8830", item: "Front brake pads + rotor", amt: "Rs 9,400", status: "Sent, awaiting" },
  { car: "Creta · KA01 4412", item: "AC compressor belt", amt: "Rs 2,100", status: "Approved" },
];

const PICKUPS = [
  { time: "2:00 PM", car: "Nexon · KA03 1199", who: "Drop to customer" },
  { time: "3:30 PM", car: "Venue · KA02 5540", who: "Drop to customer" },
  { time: "4:15 PM", car: "Creta · KA08 9911", who: "Pickup for service" },
];

export default function ServiceDeskDemo() {
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
          const active = i === 2;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(201,42,42,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Service Desk</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>18 IN BAY · 6 READY · 1 AWAITING APPROVAL</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Jobs in progress</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {JOBS.map((j) => (
                <div key={j.car} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: "rgba(201,42,42,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E36464" strokeWidth="2" aria-hidden><path d="M5 17h14M5 17a2 2 0 0 1-2-2v-3l2-5h12l2 5v3a2 2 0 0 1-2 2M7 17v2M17 17v2" /></svg>
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{j.car}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#8A8A8A" }}>{j.cust}</p>
                  </div>
                  <span style={{ fontSize: 10.5, color: j.tone, border: `1px solid ${j.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{j.stage}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, minHeight: 0 }}>
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 13px", fontSize: 13.5, fontWeight: 600 }}>Approvals on WhatsApp</p>
              {APPROVALS.map((a) => (
                <div key={a.car} style={{ paddingBottom: 11, marginBottom: 11, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600 }}>{a.car}</span>
                    <span style={{ fontSize: 12, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{a.amt}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#A8A8A8" }}>{a.item}</p>
                  <span style={{ display: "inline-block", marginTop: 6, fontSize: 10.5, color: a.status === "Approved" ? GOOD : WAIT, border: `1px solid ${a.status === "Approved" ? GOOD : WAIT}`, borderRadius: 999, padding: "1px 8px" }}>{a.status}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1 }}>
              <p style={{ margin: "0 0 13px", fontSize: 13.5, fontWeight: 600 }}>Pickup &amp; delivery</p>
              {PICKUPS.map((p) => (
                <div key={p.time} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 60, fontSize: 12.5, color: ACCENT, fontFamily: "var(--font-geist-mono), monospace" }}>{p.time}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 12.5, color: "#D8D8D8" }}>{p.car}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#8A8A8A" }}>{p.who}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
