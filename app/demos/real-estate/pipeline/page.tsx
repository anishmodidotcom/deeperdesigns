import type { Metadata } from "next";

// Real full-screen demo: the Buyer Pipeline kanban for "Anand Realty", one
// card open with auto-filled call notes. Not indexed; kept for reuse.
export const metadata: Metadata = {
  title: "Buyer Pipeline demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#3E7BFA";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Leads", "Listings", "Visits", "Pipeline", "Reports", "Settings"];

type Card = { name: string; cfg: string; value: string; tag?: string; open?: boolean };
const COLUMNS: { title: string; count: number; cards: Card[] }[] = [
  {
    title: "New",
    count: 7,
    cards: [
      { name: "Deepa Iyer", cfg: "Hebbal · 4BHK", value: "Rs 2.1 Cr" },
      { name: "Sneha Pillai", cfg: "JP Nagar · 2BHK", value: "Rs 78 L" },
    ],
  },
  {
    title: "Qualified",
    count: 5,
    cards: [
      { name: "Priya Nair", cfg: "HSR · 2BHK", value: "Rs 92 L" },
      { name: "Vikram Sethi", cfg: "Koramangala · 2BHK", value: "Rs 1.0 Cr" },
    ],
  },
  {
    title: "Visit",
    count: 4,
    cards: [
      { name: "Rohan Mehta", cfg: "Whitefield · 3BHK", value: "Rs 1.2 Cr", tag: "Sat 11:30", open: true },
    ],
  },
  {
    title: "Negotiation",
    count: 2,
    cards: [{ name: "Imran Shaikh", cfg: "Sarjapur · Villa", value: "Rs 3.4 Cr", tag: "Offer in" }],
  },
  {
    title: "Closed",
    count: 3,
    cards: [{ name: "Karan Malhotra", cfg: "Whitefield · 3BHK", value: "Rs 1.15 Cr", tag: "Booked" }],
  },
];

export default function PipelineDemo() {
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
          const active = i === 3;
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
      </aside>

      {/* Board */}
      <div style={{ flex: 1, padding: "22px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Buyer Pipeline</h1>
          <span style={{ fontSize: 13, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>21 ACTIVE BUYERS · Rs 14.2 Cr IN PLAY</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, flex: 1, minHeight: 0 }}>
          {COLUMNS.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#D8D8D8" }}>{col.title}</span>
                <span style={{ fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>{col.count}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.cards.map((c) => (
                  <div
                    key={c.name}
                    style={{
                      background: c.open ? "#13182A" : "#111111",
                      border: c.open ? `1px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 11,
                      padding: c.open ? "14px 14px 16px" : "12px 13px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>{c.name}</p>
                    <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#8A8A8A" }}>{c.cfg}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 9 }}>
                      <span style={{ fontSize: 12, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{c.value}</span>
                      {c.tag ? (
                        <span style={{ fontSize: 10, color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 999, padding: "1px 7px" }}>{c.tag}</span>
                      ) : null}
                    </div>

                    {c.open ? (
                      <div style={{ marginTop: 13, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <p style={{ margin: "0 0 8px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: ACCENT }}>AUTO-FILLED CALL NOTES</p>
                        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: "#B8B8B8" }}>
                          Ready-to-move, self-funded, prefers gated. Wants weekend visit. Liked Prestige Lakeside.
                        </p>
                        <div style={{ marginTop: 11, display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOOD }} />
                          <span style={{ fontSize: 11, color: GOOD }}>Next: confirm visit Fri 6pm</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
