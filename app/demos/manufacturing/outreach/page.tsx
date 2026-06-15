import type { Metadata } from "next";

// Real full-screen demo: the Outreach Agent for "Bharat Industries", prospect
// list + multi-touch sequence + replies inbox. Not indexed.
export const metadata: Metadata = {
  title: "Outreach Agent demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#C2410C";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Leads", "Quotes", "Outreach", "Distributors", "Catalogue", "Settings"];

const PROSPECTS = [
  { co: "Meridian Build", city: "Nagpur", touch: 3, replied: true },
  { co: "Sterling Infra", city: "Surat", touch: 2, replied: false },
  { co: "Orbit Fabricators", city: "Indore", touch: 3, replied: true },
  { co: "Vajra Steel", city: "Raipur", touch: 1, replied: false },
  { co: "Concord Projects", city: "Pune", touch: 2, replied: false },
];

const REPLIES = [
  { co: "Meridian Build", msg: "Send rates for 6in pipe, 20 ton.", hot: true },
  { co: "Orbit Fabricators", msg: "Interested. Can you do credit terms?", hot: true },
  { co: "Helix Traders", msg: "Remove me from this list.", hot: false },
];

export default function OutreachDemo() {
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
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Bharat Ind.</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 2;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(194,65,12,0.16)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Outreach Agent</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> RUNNING · MS PIPE BUYERS
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["PROSPECTS BUILT", "240", "#F5F5F5"],
            ["TOUCHES SENT", "612", MONEY],
            ["REPLIES", "34", GOOD],
            ["HOT", "11", ACCENT],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Prospect sequence */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Prospects in sequence</p>
              <span style={{ fontSize: 10.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>EMAIL → WHATSAPP → FOLLOW-UP</span>
            </div>
            {PROSPECTS.map((p) => (
              <div key={p.co} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{p.co}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#8A8A8A" }}>{p.city}</p>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {[1, 2, 3].map((t) => (
                    <span key={t} style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", color: t <= p.touch ? "#0A0A0A" : "#6B6B6B", background: t <= p.touch ? ACCENT : "transparent", border: t <= p.touch ? "none" : "1px solid rgba(255,255,255,0.14)" }}>{t}</span>
                  ))}
                </div>
                <span style={{ width: 64, textAlign: "right", fontSize: 11, color: p.replied ? GOOD : "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>{p.replied ? "replied" : "in seq"}</span>
              </div>
            ))}
          </div>

          {/* Replies inbox */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Replies</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {REPLIES.map((r) => (
                <div key={r.co} style={{ background: r.hot ? "rgba(194,65,12,0.08)" : "transparent", border: r.hot ? `1px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.08)", borderRadius: 11, padding: "11px 13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{r.co}</span>
                    {r.hot ? <span style={{ fontSize: 9.5, color: ACCENT, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.06em" }}>HOT</span> : null}
                  </div>
                  <p style={{ margin: "5px 0 0", fontSize: 12.5, color: "#B8B8B8", lineHeight: 1.4 }}>{r.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
