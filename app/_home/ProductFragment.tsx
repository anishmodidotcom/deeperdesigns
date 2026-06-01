"use client";

type FragmentProps = { slug: string };

export default function ProductFragment({ slug }: FragmentProps) {
  switch (slug) {
    case "maplelens":
      return (
        <div style={fragWrap}>
          <div style={{ position: "relative", width: "100%", height: "60px", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #2a2a2a 0%, #2a2a2a 50%, transparent 50%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, transparent 50%, #f5f5f5 50%, #f5f5f5 100%)", opacity: 0.92 }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(135deg)", width: "1px", height: "100%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
            <span style={{ position: "absolute", top: "4px", left: "6px", fontSize: "8px", color: "#999", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>BEFORE</span>
            <span style={{ position: "absolute", bottom: "4px", right: "6px", fontSize: "8px", color: "#111", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>AFTER</span>
          </div>
        </div>
      );

    case "zaatar-republic":
      return (
        <div style={fragWrap}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--whatsapp)", boxShadow: "0 0 6px var(--whatsapp)", display: "inline-block" }} />
              <span style={{ fontSize: "11px", color: "var(--fg-dim)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>LIVE</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 500, lineHeight: 1, color: "var(--fg)" }}>47</div>
            <div style={{ fontSize: "9px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>ORDERS · ₹38.4K</div>
            <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "16px", marginTop: "2px" }}>
              {[8, 12, 6, 14, 9, 11, 16].map((h, i) => (
                <div key={i} style={{ width: "5px", height: `${h}px`, background: "var(--accent)", opacity: i === 6 ? 1 : 0.5, borderRadius: "1px" }} />
              ))}
            </div>
          </div>
        </div>
      );

    case "veda-glow":
      return (
        <div style={fragWrap}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><circle cx="12" cy="8" r="3"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/></svg>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {["VATA", "PITTA", "KAPHA"].map((d, i) => (
                <span key={d} style={{ fontSize: "7px", padding: "2px 5px", borderRadius: "8px", border: "1px solid", borderColor: i === 0 ? "var(--accent)" : "var(--border)", color: i === 0 ? "var(--accent)" : "var(--fg-dim)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.06em", background: i === 0 ? "rgba(124,108,255,0.1)" : "transparent" }}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      );

    case "bharat-steel":
      return (
        <div style={fragWrap}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "44px", justifyContent: "center" }}>
              {[28, 36, 20, 12, 40, 32].map((h, i) => (
                <div key={i} style={{ width: "10px", height: `${h}px`, background: i === 3 ? "#EF4444" : "var(--fg-muted)", borderRadius: "1px", boxShadow: i === 3 ? "0 0 6px #EF4444" : "none" }} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#EF4444", boxShadow: "0 0 4px #EF4444" }} />
              <span style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>1 SKU LOW</span>
            </div>
          </div>
        </div>
      );

    case "hivedesk":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex" }}>
              {["A", "M", "K", "R"].map((l, i) => (
                <div key={i} style={{ width: "26px", height: "26px", borderRadius: "50%", background: `hsl(${i * 70}, 50%, 50%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 600, color: "#fff", marginLeft: i === 0 ? 0 : "-8px", border: i === 2 ? "2px solid #EF4444" : "2px solid var(--bg-card)", boxShadow: i === 2 ? "0 0 8px #EF4444" : "none" }}>{l}</div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#EF4444" }} />
              <span style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>CHURN RISK</span>
            </div>
          </div>
        </div>
      );

    case "smilefirst":
      return (
        <div style={fragWrap}>
          <div style={{ width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "2px", marginBottom: "6px" }}>
              {Array.from({ length: 15 }).map((_, i) => {
                const filled = [2, 6, 9, 12].includes(i);
                return <div key={i} style={{ aspectRatio: "1", borderRadius: "2px", background: filled ? "var(--accent)" : "rgba(255,255,255,0.06)", boxShadow: filled ? "0 0 4px var(--accent)" : "none" }} />;
              })}
            </div>
            <div style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em", textAlign: "center" }}>4 BOOKED TODAY</div>
          </div>
        </div>
      );

    case "autobazaar":
      return (
        <div style={fragWrap}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontSize: "9px", color: "var(--fg-dim)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>SWIFT VDI · 2021</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "22px", fontWeight: 500, color: "var(--fg)" }}>₹4.20L</span>
              <span style={{ fontSize: "10px", color: "#10B981", display: "flex", alignItems: "center", gap: "2px" }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#10B981"><path d="M12 3l8 12H4z"/></svg>
                +12K
              </span>
            </div>
            <div style={{ height: "2px", background: "rgba(255,255,255,0.08)", borderRadius: "1px", overflow: "hidden", marginTop: "4px" }}>
              <div style={{ width: "62%", height: "100%", background: "var(--accent)", boxShadow: "0 0 4px var(--accent)" }} />
            </div>
          </div>
        </div>
      );

    case "stumpvision":
      return (
        <div style={fragWrap}>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 600, color: "#fff", boxShadow: "0 0 12px rgba(124,108,255,0.4)" }}>R</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ fontSize: "10px", color: "var(--fg)", fontWeight: 500 }}>RAHUL S.</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <div><div style={{ fontSize: "10px", color: "var(--accent)", fontWeight: 600 }}>342</div><div style={{ fontSize: "7px", color: "var(--fg-dim)" }}>RUNS</div></div>
                <div><div style={{ fontSize: "10px", color: "var(--accent)", fontWeight: 600 }}>24</div><div style={{ fontSize: "7px", color: "var(--fg-dim)" }}>WKTS</div></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "pawstay":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{ position: "relative", width: "40px", height: "30px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.8">
                <circle cx="7" cy="9" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="9" r="2"/><circle cx="9" cy="15" r="2"/><circle cx="15" cy="15" r="2"/><ellipse cx="12" cy="18" rx="4" ry="3"/>
              </svg>
              <div style={{ position: "absolute", top: "3px", right: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "#EF4444", boxShadow: "0 0 4px #EF4444" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#EF4444" }} />
              <span style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>LIVE CAM</span>
            </div>
          </div>
        </div>
      );

    case "malabar-spice":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}>
            {[
              { h: 36, c: "#C97B3F" },
              { h: 44, c: "#A8482B" },
              { h: 32, c: "#D9A86C" }
            ].map((t, i) => (
              <div key={i} style={{ width: "14px", height: `${t.h}px`, background: t.c, borderRadius: "2px 2px 0 0", boxShadow: `0 0 8px ${t.c}40` }} />
            ))}
          </div>
        </div>
      );

    case "studio-noor":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
            {[
              { label: "DESIGN", c: "var(--whatsapp)", pct: 100 },
              { label: "BUILD", c: "var(--accent)", pct: 65 },
              { label: "DONE", c: "var(--fg-dim)", pct: 0 }
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "8px", color: s.c, fontFamily: "var(--font-geist-mono)", letterSpacing: "0.06em", width: "36px" }}>{s.label}</span>
                <div style={{ flex: 1, height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: s.c, boxShadow: s.pct > 0 ? `0 0 4px ${s.c}` : "none" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "meera-wellness":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="5" r="2"/><path d="M12 7v6"/><path d="M8 11l4 2 4-2"/><path d="M12 13v4"/><path d="M8 21l4-4 4 4"/>
            </svg>
            <div style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>7AM · BOOKED</div>
          </div>
        </div>
      );

    case "oud-and-ember":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <svg width="22" height="36" viewBox="0 0 24 40" fill="none">
              <path d="M9 4h6v6h2v4h-1v22a2 2 0 01-2 2H10a2 2 0 01-2-2V14H7v-4h2V4z" stroke="var(--accent)" strokeWidth="1" fill="rgba(124,108,255,0.08)"/>
              <line x1="11" y1="20" x2="13" y2="20" stroke="var(--accent)" strokeWidth="1"/>
            </svg>
            <div style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>YOUR BLEND</div>
          </div>
        </div>
      );

    case "sahaja-farms":
      return (
        <div style={fragWrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "2px", width: "100%" }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const ripe = [1, 5, 6, 7, 8, 10].includes(i);
              return <div key={i} style={{ aspectRatio: "1", borderRadius: "2px", background: ripe ? "var(--whatsapp)" : "rgba(255,255,255,0.06)", boxShadow: ripe ? "0 0 3px var(--whatsapp)" : "none" }} />;
            })}
          </div>
        </div>
      );

    case "karan-legal":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", width: "100%" }}>
            {[
              { w: "100%", label: "200" },
              { w: "70%", label: "120" },
              { w: "40%", label: "48" },
              { w: "20%", label: "12" }
            ].map((s, i) => (
              <div key={i} style={{ width: s.w, height: "7px", background: i === 3 ? "var(--accent)" : "rgba(124,108,255,0.3)", borderRadius: "1px", boxShadow: i === 3 ? "0 0 4px var(--accent)" : "none", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "4px" }}>
                <span style={{ fontSize: "6px", color: i === 3 ? "#fff" : "var(--fg-dim)", fontFamily: "var(--font-geist-mono)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "zara-fitness":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
            <div style={{ fontSize: "28px", fontWeight: 500, color: "var(--accent)", lineHeight: 1, textShadow: "0 0 16px rgba(124,108,255,0.5)" }}>1,200</div>
            <div style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em" }}>MEMBERS</div>
          </div>
        </div>
      );

    case "earth-and-fire":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <svg width="28" height="36" viewBox="0 0 30 36" fill="none">
              <path d="M8 6 Q15 4 22 6 L22 16 Q22 32 15 32 Q8 32 8 16 Z" stroke="var(--accent)" strokeWidth="1" fill="rgba(124,108,255,0.06)"/>
            </svg>
            <div style={{ display: "flex", gap: "4px" }}>
              {["#8B4513", "#D4A373", "#3D5A4C"].map((c, i) => (
                <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, border: i === 1 ? "1px solid var(--accent)" : "1px solid transparent", boxShadow: i === 1 ? "0 0 6px var(--accent)" : "none" }} />
              ))}
            </div>
          </div>
        </div>
      );

    case "kadak-chai":
      return (
        <div style={fragWrap}>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ marginBottom: "-2px" }}>
              <path d="M4 12 Q3 8 5 6 Q4 4 6 2" stroke="var(--fg-dim)" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
              <path d="M10 12 Q9 8 11 6 Q10 4 12 2" stroke="var(--fg-dim)" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
              <path d="M16 12 Q15 8 17 6 Q16 4 18 2" stroke="var(--fg-dim)" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
            </svg>
            <div style={{ width: "30px", height: "34px", background: "linear-gradient(180deg, #A8482B 0%, #6B2818 100%)", borderRadius: "3px", border: "1px solid #8B3823", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 12px rgba(168,72,43,0.4)" }}>
              <div style={{ fontSize: "9px", fontWeight: 600, color: "#F5D9B5", letterSpacing: "0.06em" }}>KADAK</div>
            </div>
          </div>
        </div>
      );

    case "nomad-trails":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
              <path d="M0 22 L8 8 L14 14 L22 2 L32 12 L40 6 L48 22 Z" fill="var(--accent)" opacity="0.4"/>
              <path d="M0 22 L8 8 L14 14 L22 2 L32 12 L40 6 L48 22" stroke="var(--accent)" strokeWidth="1"/>
              <circle cx="22" cy="2" r="2" fill="var(--accent)" style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}/>
            </svg>
            <div style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>4 / 12 SPOTS</div>
          </div>
        </div>
      );

    case "sugar-lane":
      return (
        <div style={fragWrap}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
              <rect x="6" y="14" width="20" height="10" rx="1" fill="rgba(124,108,255,0.15)" stroke="var(--accent)" strokeWidth="1"/>
              <rect x="9" y="9" width="14" height="6" rx="1" fill="rgba(124,108,255,0.25)" stroke="var(--accent)" strokeWidth="1"/>
              <circle cx="12" cy="6" r="1" fill="var(--accent)"/>
              <circle cx="16" cy="6" r="1" fill="var(--accent)"/>
              <circle cx="20" cy="6" r="1" fill="var(--accent)"/>
              <path d="M12 8 V6 M16 8 V6 M20 8 V6" stroke="var(--accent)" strokeWidth="0.5"/>
            </svg>
            <div style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>3 IN QUEUE</div>
          </div>
        </div>
      );

    case "brightpath":
      return (
        <div style={fragWrap}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "9px", color: "var(--fg)", fontWeight: 500 }}>ARYA · GRADE 8</span>
              <span style={{ fontSize: "9px", color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}>74%</span>
            </div>
            <div style={{ height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ width: "74%", height: "100%", background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-dim) 100%)", boxShadow: "0 0 6px var(--accent)" }} />
            </div>
            <div style={{ fontSize: "8px", color: "var(--fg-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em", marginTop: "2px" }}>WEEKLY UPDATE SENT</div>
          </div>
        </div>
      );

    case "deeper-content":
      return (
        <div style={fragWrap}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>
            {/* Three inputs at top */}
            <div style={{ display: "flex", gap: "5px" }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 4px var(--accent)",
                    opacity: 0.8 - i * 0.12,
                  }}
                />
              ))}
            </div>
            {/* Engine: monoline diamond */}
            <div
              style={{
                width: "16px",
                height: "16px",
                border: "1px solid var(--accent)",
                transform: "rotate(45deg)",
                boxShadow: "0 0 6px rgba(124,108,255,0.4)",
                marginBlock: "2px",
              }}
            />
            {/* Output grid (3x2) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2px",
                width: "44px",
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  style={{
                    aspectRatio: "1 / 1",
                    background: i % 2 === 0 ? "rgba(124,108,255,0.7)" : "rgba(124,108,255,0.3)",
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontSize: "7px",
                color: "var(--fg-muted)",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.10em",
                marginTop: "2px",
              }}
            >
              ENGINE · LIVE
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div style={fragWrap}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px dashed var(--fg-dim)" }} />
        </div>
      );
  }
}

const fragWrap: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
  position: "relative",
  overflow: "hidden",
};
