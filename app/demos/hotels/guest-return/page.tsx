import type { Metadata } from "next";

// Real full-screen demo: the Guest Return CRM for "The Banyan House", past
// guests with recall status, a return-offer preview and reviews. Not indexed.
export const metadata: Metadata = {
  title: "Guest Return demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#9B5DE5";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Bookings", "Calendar", "Concierge", "Guests", "Reviews", "Settings"];

const GUESTS = [
  { name: "The Iyer family", last: "Last stay Dec", status: "Recalled, booked", tone: GOOD, active: true },
  { name: "Rahul Verma", last: "Last stay Oct", status: "Recall sent", tone: ACCENT },
  { name: "Sara Khan", last: "Last stay Aug", status: "Recall sent", tone: ACCENT },
  { name: "Meera & Co", last: "Last stay Jun", status: "Due for recall", tone: MONEY },
  { name: "Joseph Mathew", last: "Last stay Mar", status: "Lapsed, reactivating", tone: MONEY },
];

const REVIEWS = [
  { name: "Ananya R", stars: 5, text: "The garden suite was magical. Already planning a return." },
  { name: "Vikram S", stars: 5, text: "Warmest hosts, replied to every message instantly." },
];

export default function GuestReturnDemo() {
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
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Banyan House</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 3;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(155,93,229,0.18)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Guest Return</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>1,240 PAST GUESTS</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["REPEAT STAYS, SEASON", "Rs 3.1L", MONEY],
            ["RECALLS SENT", "186", ACCENT],
            ["RETURN RATE", "23%", GOOD],
            ["AVG REVIEW", "4.8", "#F5F5F5"],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, fontWeight: 600 }}>Past guests</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {GUESTS.map((g) => (
                <div key={g.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 32, height: 32, flexShrink: 0, borderRadius: "50%", background: "rgba(155,93,229,0.16)", color: "#BC8DEF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
                    {g.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{g.name}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#8A8A8A" }}>{g.last}</p>
                  </div>
                  <span style={{ fontSize: 10.5, color: g.tone, border: `1px solid ${g.tone}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>{g.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, minHeight: 0 }}>
            <div style={{ background: "#111111", border: `1px solid ${ACCENT}`, borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 12px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>RETURN OFFER PREVIEW</p>
              <div style={{ background: "#0B141A", borderRadius: 12, padding: 12 }}>
                <div style={{ background: "#005C4B", borderRadius: "8px 8px 4px 8px", padding: "10px 12px" }}>
                  <p style={{ margin: 0, color: "#E9EDEF", fontSize: 13.5, lineHeight: 1.5 }}>
                    Dear Iyer family, the monsoon is beautiful at The Banyan House. As a returning guest, enjoy 15% off a 3-night stay this season.
                  </p>
                  <span style={{ display: "inline-block", marginTop: 8, fontSize: 11.5, color: "#53BDEB", border: "1px solid #53BDEB", borderRadius: 999, padding: "2px 10px" }}>Book your return</span>
                </div>
              </div>
            </div>

            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1 }}>
              <p style={{ margin: "0 0 13px", fontSize: 13.5, fontWeight: 600 }}>Recent reviews</p>
              {REVIEWS.map((r) => (
                <div key={r.name} style={{ paddingBottom: 11, marginBottom: 11, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600 }}>{r.name}</span>
                    <span style={{ color: MONEY, fontSize: 11, letterSpacing: "1px" }}>{"★".repeat(r.stars)}</span>
                  </div>
                  <p style={{ margin: "5px 0 0", fontSize: 12, color: "#A8A8A8", lineHeight: 1.45 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
