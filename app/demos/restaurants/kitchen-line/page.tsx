import type { Metadata } from "next";

// Real full-screen demo: the Kitchen Line calls-and-reservations dashboard
// for "Tinda House", a voice agent taking orders and bookings during the
// rush. Not indexed; kept for reuse.
export const metadata: Metadata = {
  title: "Kitchen Line demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#FF7A1A";
const MONEY = "#F5B544";
const GOOD = "#2FB46A";
const TABLE = "#5B8DEF";

const NAV = ["Payouts", "Orders", "Menu", "Direct", "Line", "Reports"];

type Call = {
  caller: string;
  intent: "Order" | "Table";
  detail: string;
  status: string;
  tone: string;
  live?: boolean;
};
const CALLS: Call[] = [
  { caller: "+91 90XX 11240", intent: "Order", detail: "Chicken Biryani x3, Raita x2", status: "On call 1:08", tone: GOOD, live: true },
  { caller: "+91 98XX 55102", intent: "Table", detail: "Party of 4, 8:30 PM", status: "Booked", tone: TABLE },
  { caller: "+91 73XX 90418", intent: "Order", detail: "Haleem x2, Naan x4", status: "Sent to kitchen", tone: MONEY },
  { caller: "+91 96XX 23871", intent: "Table", detail: "Party of 2, 9:00 PM", status: "Booked", tone: TABLE },
  { caller: "+91 88XX 67340", intent: "Order", detail: "Mutton Biryani x2", status: "Sent to kitchen", tone: MONEY },
  { caller: "+91 70XX 14409", intent: "Table", detail: "Party of 6, 8:45 PM", status: "Confirmed", tone: TABLE },
];

const RESERVATIONS = [
  { time: "8:30 PM", name: "Walk-in via call", size: "4 guests" },
  { time: "8:45 PM", name: "Walk-in via call", size: "6 guests" },
  { time: "9:00 PM", name: "Walk-in via call", size: "2 guests" },
  { time: "9:30 PM", name: "Walk-in via call", size: "3 guests" },
];

export default function KitchenLineDemo() {
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
          width: 210,
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
            Tinda House
          </span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 4;
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
                background: active ? "rgba(255,122,26,0.16)" : "transparent",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Kitchen Line</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> VOICE AGENT LIVE · 1 CALL NOW
          </span>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["CALLS TONIGHT", "38", "#F5F5F5"],
            ["ORDERS CAPTURED", "21", MONEY],
            ["TABLES BOOKED", "9", TABLE],
            ["MISSED CALLS", "0", GOOD],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 27, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Call log */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Live call log</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {CALLS.map((c) => (
                <div
                  key={c.caller}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 0",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: c.intent === "Order" ? "rgba(245,181,68,0.16)" : "rgba(91,141,239,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {c.intent === "Order" ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MONEY} strokeWidth="2" aria-hidden><path d="M3 2l1 4h16l1-4" /><path d="M5 6l1.5 12.5A2 2 0 0 0 8.5 20h7a2 2 0 0 0 2-1.5L19 6" /></svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={TABLE} strokeWidth="2" aria-hidden><rect x="3" y="4" width="18" height="14" rx="2" /><line x1="8" y1="20" x2="8" y2="18" /><line x1="16" y1="20" x2="16" y2="18" /></svg>
                    )}
                  </span>
                  <div style={{ width: 130, flexShrink: 0 }}>
                    <p style={{ margin: 0, fontSize: 12.5, color: "#D8D8D8", fontFamily: "var(--font-geist-mono), monospace" }}>{c.caller}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 10.5, color: c.intent === "Order" ? MONEY : TABLE, letterSpacing: "0.04em", fontFamily: "var(--font-geist-mono), monospace" }}>{c.intent.toUpperCase()}</p>
                  </div>
                  <p style={{ flex: 1, margin: 0, fontSize: 13, color: "#A8A8A8" }}>{c.detail}</p>
                  <span style={{ fontSize: 11.5, color: c.tone, fontFamily: "var(--font-geist-mono), monospace", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                    {c.live ? <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOOD }} /> : null}
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reservations */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Tonight&apos;s reservations</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {RESERVATIONS.map((r) => (
                <div key={r.time} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 13, color: TABLE, fontFamily: "var(--font-geist-mono), monospace", width: 64, flexShrink: 0 }}>{r.time}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, color: "#D8D8D8" }}>{r.name}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#8A8A8A" }}>{r.size}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 16, fontSize: 11.5, color: "#6B6B6B", lineHeight: 1.5 }}>
              Every booking taken by the agent while the kitchen kept cooking.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
