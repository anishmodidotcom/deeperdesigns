import type { Metadata } from "next";

// Real full-screen demo: the Drop Engine for "Indie Thread", per-SKU status
// from shot to live, a launch sequence and a sell-through chart. Not indexed.
export const metadata: Metadata = {
  title: "Drop Engine demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#E84393";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Studio", "Catalogue", "Drops", "Orders", "Customers", "Settings"];

type Step = "Shot" | "Captioned" | "Listed" | "Live";
const STEPS: Step[] = ["Shot", "Captioned", "Listed", "Live"];
const SKUS: { name: string; reached: number }[] = [
  { name: "Olive Linen Co-ord", reached: 4 },
  { name: "Ivory Slip Dress", reached: 4 },
  { name: "Rust Wrap Top", reached: 3 },
  { name: "Sand Wide Trousers", reached: 3 },
  { name: "Black Linen Shirt", reached: 2 },
  { name: "Terracotta Kaftan", reached: 1 },
];

const SELL = [12, 20, 34, 48, 61, 70, 82];

export default function DropEngineDemo() {
  const w = 300;
  const h = 110;
  const max = 100;
  const stepX = w / (SELL.length - 1);
  const pts = SELL.map((v, i) => [i * stepX, h - (v / max) * (h - 12) - 6]);
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
      <aside style={{ width: 210, flexShrink: 0, background: "#0E0E0E", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "22px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 22px" }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT }} />
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Indie Thread</span>
        </div>
        {NAV.map((n, i) => {
          const active = i === 2;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9, fontSize: 14, color: active ? "#FFFFFF" : "#A8A8A8", background: active ? "rgba(232,67,147,0.16)" : "transparent" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: active ? ACCENT : "rgba(255,255,255,0.22)" }} />
              {n}
            </div>
          );
        })}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Summer Linen Drop</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> 2 OF 6 SKUS LIVE
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* SKU pipeline */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 10.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>SKU</span>
              {STEPS.map((s) => (
                <span key={s} style={{ fontSize: 10, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace", textAlign: "center" }}>{s.toUpperCase()}</span>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SKUS.map((sku) => (
                <div key={sku.name} style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 8, alignItems: "center", padding: "11px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 13, color: "#E8E8E8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sku.name}</span>
                  {STEPS.map((s, i) => {
                    const done = i < sku.reached;
                    const current = i === sku.reached - 1;
                    const isLive = s === "Live" && done;
                    return (
                      <span key={s} style={{ display: "flex", justifyContent: "center" }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: isLive ? GOOD : done ? "rgba(232,67,147,0.2)" : "transparent", border: done ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                          {done ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isLive ? "#0A0A0A" : ACCENT} strokeWidth="3" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                          ) : current ? (
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                          ) : null}
                        </span>
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Launch sequence + sell-through */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, minHeight: 0 }}>
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 13px", fontSize: 13.5, fontWeight: 600 }}>Launch sequence</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {[
                  ["Teaser to WhatsApp list", "Sent", GOOD],
                  ["Instagram drop post", "Sent", GOOD],
                  ["Site + catalogue live", "Live", GOOD],
                  ["Restock alert (waitlist)", "Scheduled", MONEY],
                ].map(([t, s, tone]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: tone as string, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 13, color: "#D8D8D8" }}>{t}</span>
                    <span style={{ fontSize: 11.5, color: tone as string, fontFamily: "var(--font-geist-mono), monospace" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Sell-through</p>
                <span style={{ fontSize: 12, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>82% live SKUs</span>
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                  <defs>
                    <linearGradient id="defill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity="0.32" />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${line} L${w} ${h} L0 ${h} Z`} fill="url(#defill)" />
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
