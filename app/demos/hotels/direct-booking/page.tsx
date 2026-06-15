import type { Metadata } from "next";

// Real full-screen demo: the Direct Booking engine for "The Banyan House",
// availability calendar + recent direct bookings + commission saved.
// Not indexed.
export const metadata: Metadata = {
  title: "Direct Booking demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#9B5DE5";
const MONEY = "#E0B341";
const GOOD = "#2FB46A";

const NAV = ["Bookings", "Calendar", "Concierge", "Guests", "Reviews", "Settings"];

const ROOMS = ["Garden Suite", "Banyan Room", "Courtyard", "Terrace Suite"];
// availability per room across 7 nights: 0 open, 1 direct, 2 OTA
const AVAIL: number[][] = [
  [1, 1, 0, 1, 2, 1, 0],
  [0, 1, 1, 1, 1, 0, 0],
  [2, 0, 1, 0, 1, 1, 2],
  [1, 1, 1, 0, 0, 1, 1],
];
const DAYS = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

const RECENT = [
  { guest: "Ananya & family", nights: "3 nights, Garden Suite", channel: "Direct", amt: "Rs 24,600", tone: GOOD },
  { guest: "Rahul Verma", nights: "2 nights, Banyan Room", channel: "WhatsApp", amt: "Rs 11,800", tone: ACCENT },
  { guest: "The Iyers", nights: "4 nights, Terrace Suite", channel: "Direct", amt: "Rs 38,400", tone: GOOD },
  { guest: "Sara Khan", nights: "1 night, Courtyard", channel: "WhatsApp", amt: "Rs 4,900", tone: ACCENT },
];

function cellColor(v: number) {
  if (v === 1) return ACCENT; // direct
  if (v === 2) return "rgba(255,255,255,0.18)"; // OTA
  return "transparent"; // open
}

export default function DirectBookingDemo() {
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
          const active = i === 0;
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
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Direct Bookings</h1>
          <span style={{ fontSize: 12.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>THIS WEEK · 24 ROOMS</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            ["DIRECT SHARE", "61%", ACCENT],
            ["OCCUPANCY", "82%", "#F5F5F5"],
            ["COMMISSION SAVED", "Rs 1.4L", MONEY],
            ["DIRECT THIS WEEK", "17", GOOD],
          ].map(([k, v, tone]) => (
            <div key={k} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "14px 16px" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>{k}</p>
              <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 25, fontWeight: 600, letterSpacing: "-0.02em", color: tone as string }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
          {/* Availability calendar */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Availability</p>
              <div style={{ display: "flex", gap: 14 }}>
                <span style={{ fontSize: 10.5, color: ACCENT, display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: ACCENT }} /> Direct</span>
                <span style={{ fontSize: 10.5, color: "#8A8A8A", display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: "rgba(255,255,255,0.18)" }} /> OTA</span>
                <span style={{ fontSize: 10.5, color: "#6B6B6B", display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 3, border: "1px solid rgba(255,255,255,0.2)" }} /> Open</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "110px repeat(7, 1fr)", gap: 7, alignItems: "center" }}>
              <span />
              {DAYS.map((d) => <span key={d} style={{ fontSize: 10.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace", textAlign: "center" }}>{d}</span>)}
              {ROOMS.map((room, r) => (
                <RoomRow key={room} room={room} marks={AVAIL[r]} />
              ))}
            </div>
          </div>

          {/* Recent direct bookings */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, fontWeight: 600 }}>Recent direct bookings</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {RECENT.map((b) => (
                <div key={b.guest} style={{ display: "flex", alignItems: "center", gap: 11, paddingBottom: 11, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{b.guest}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#8A8A8A" }}>{b.nights}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: 12.5, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>{b.amt}</p>
                    <span style={{ fontSize: 10, color: b.tone, fontFamily: "var(--font-geist-mono), monospace" }}>{b.channel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  function RoomRow({ room, marks }: { room: string; marks: number[] }) {
    return (
      <>
        <span style={{ fontSize: 12, color: "#D8D8D8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{room}</span>
        {marks.map((m, i) => (
          <span key={i} style={{ height: 28, borderRadius: 6, background: cellColor(m), border: m === 0 ? "1px solid rgba(255,255,255,0.12)" : "none" }} />
        ))}
      </>
    );
  }
}
