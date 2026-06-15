import type { Metadata } from "next";

// Real full-screen demo: the Instant Lead Responder "Lead Desk" for the
// sample brokerage "Anand Realty". Not indexed; kept for reuse as a live
// demo / marketing asset.
export const metadata: Metadata = {
  title: "Lead Desk demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#3E7BFA";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";
const MID = "#E0B341";

const NAV = ["Leads", "Listings", "Visits", "Pipeline", "Reports", "Settings"];

type Source = "99acres" | "MagicBricks" | "Housing" | "WhatsApp";
const SRC_TONE: Record<Source, string> = {
  "99acres": "#E0662B",
  MagicBricks: "#E0B341",
  Housing: "#2FB46A",
  WhatsApp: "#25D366",
};

type Status = { label: string; tone: string };
const LEADS: {
  name: string;
  area: string;
  source: Source;
  status: Status;
  hot?: boolean;
  active?: boolean;
}[] = [
  { name: "Rohan Mehta", area: "Whitefield, 3BHK", source: "99acres", status: { label: "Called 0:48", tone: GOOD }, hot: true, active: true },
  { name: "Priya Nair", area: "HSR Layout, 2BHK", source: "WhatsApp", status: { label: "Qualified", tone: ACCENT }, hot: true },
  { name: "Imran Shaikh", area: "Sarjapur, Villa", source: "MagicBricks", status: { label: "Visit booked", tone: MONEY } },
  { name: "Anita Rao", area: "Indiranagar, 3BHK", source: "Housing", status: { label: "Called 1:12", tone: GOOD } },
  { name: "Vikram Sethi", area: "Koramangala, 2BHK", source: "99acres", status: { label: "Qualified", tone: ACCENT } },
  { name: "Deepa Iyer", area: "Hebbal, 4BHK", source: "MagicBricks", status: { label: "New", tone: "#8A8A8A" } },
  { name: "Karan Malhotra", area: "Whitefield, 3BHK", source: "WhatsApp", status: { label: "Visit booked", tone: MONEY } },
  { name: "Sneha Pillai", area: "JP Nagar, 2BHK", source: "Housing", status: { label: "New", tone: "#8A8A8A" } },
];

function SourceChip({ source }: { source: Source }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 10,
        letterSpacing: "0.04em",
        color: SRC_TONE[source],
        border: `1px solid ${SRC_TONE[source]}`,
        borderRadius: 999,
        padding: "2px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {source}
    </span>
  );
}

export default function LeadDeskDemo() {
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
          width: 218,
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
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Anand Realty
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
                background: active ? "rgba(62,123,250,0.16)" : "transparent",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: "10px 8px" }}>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
            AR
          </span>
          <div style={{ lineHeight: 1.2 }}>
            <p style={{ margin: 0, fontSize: 12.5 }}>Anand Realty</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B" }}>Broker</p>
          </div>
        </div>
      </aside>

      {/* Main: lead list + detail */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Lead list */}
        <section style={{ width: 430, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ padding: "20px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Lead Desk</h1>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> AGENT LIVE
            </span>
          </div>
          <div style={{ padding: "0 22px 12px", display: "flex", gap: 8 }}>
            {["All 24", "Hot 6", "Today 11"].map((f, i) => (
              <span key={f} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 999, color: i === 0 ? "#0A0A0A" : "#A8A8A8", background: i === 0 ? "#F5F5F5" : "transparent", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)", fontWeight: i === 0 ? 600 : 400 }}>
                {f}
              </span>
            ))}
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {LEADS.map((l) => (
              <div
                key={l.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 22px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  background: l.active ? "rgba(62,123,250,0.08)" : "transparent",
                  borderLeft: l.active ? `2px solid ${ACCENT}` : "2px solid transparent",
                }}
              >
                <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>
                  {l.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.name}</p>
                    {l.hot ? <span style={{ fontSize: 9.5, color: "#E0662B", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.06em" }}>HOT</span> : null}
                  </div>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8A8A8A" }}>{l.area}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                  <SourceChip source={l.source} />
                  <span style={{ fontSize: 11, color: l.status.tone, fontFamily: "var(--font-geist-mono), monospace" }}>{l.status.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lead detail */}
        <section style={{ flex: 1, padding: "22px 28px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(62,123,250,0.18)", color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600 }}>
              RM
            </span>
            <div>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>Rohan Mehta</h2>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8A8A8A" }}>+91 98XXX 41020 · enquired 2 min ago</p>
            </div>
            <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, border: `1px solid ${GOOD}`, borderRadius: 999, padding: "5px 12px" }}>
              Called back in 48s
            </span>
          </div>

          {/* AI call summary */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>AI CALL SUMMARY</p>
              <span style={{ fontSize: 11.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>DURATION 2:14</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 16 }}>
              {[
                ["BUDGET", "Rs 1.2 Cr"],
                ["CONFIG", "3 BHK"],
                ["POSSESSION", "Ready to move"],
                ["LOCALITY", "Whitefield"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
                  <p style={{ margin: "6px 0 0", fontSize: 15, fontWeight: 600, color: k === "BUDGET" ? MONEY : "#F5F5F5" }}>{v}</p>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#A8A8A8" }}>
              Buyer is relocating from Pune, wants a ready-to-move 3BHK in Whitefield under Rs 1.2 Cr, prefers a gated community with parking. Open to a site visit this weekend. No loan needed, self-funded.
            </p>
          </div>

          {/* Booked visit + matched listings */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flex: 1, minHeight: 0 }}>
            <div style={{ background: "#111111", border: `1px solid ${ACCENT}`, borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Site visit booked</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ textAlign: "center", background: "rgba(62,123,250,0.14)", borderRadius: 10, padding: "8px 14px" }}>
                  <p style={{ margin: 0, fontSize: 11, color: ACCENT, fontFamily: "var(--font-geist-mono), monospace" }}>SAT</p>
                  <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 600, color: "#F5F5F5", lineHeight: 1 }}>21</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>11:30 AM</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8A8A8A" }}>Prestige Lakeside, Tower 4</p>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: GOOD }}>Confirmation sent on WhatsApp, reminder set for Friday 6pm.</p>
            </div>
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Matched listings</p>
              {[
                ["Prestige Lakeside, 3BHK", "Rs 1.15 Cr", GOOD],
                ["Brigade Cosmopolis, 3BHK", "Rs 1.22 Cr", MID],
                ["Sobha Dream Acres, 3BHK", "Rs 1.08 Cr", GOOD],
              ].map(([name, price, tone]) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 13, color: "#D8D8D8" }}>{name}</span>
                  <span style={{ fontSize: 12.5, color: tone as string, fontFamily: "var(--font-geist-mono), monospace" }}>{price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
