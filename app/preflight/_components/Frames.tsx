// Chrome for the two Preflight UI mockups (v29).
//
// components/industry/frames/{BrowserFrame,PhoneFrame} wrap a screenshot
// via next/image. Both Preflight mockups are rendered interface, not
// screenshots, so these take children instead. The bezel geometry matches
// the industry frames so the two mockups read as the same design system.

export function BrowserShell({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 50px 100px -50px rgba(0,0,0,0.65)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "11px 14px",
          background: "#161616",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.02em",
              color: "#A8A8A8",
              background: "#0A0A0B",
              borderRadius: 999,
              padding: "5px 16px",
              maxWidth: "70%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url}
          </span>
        </div>
        <div style={{ width: 49, flexShrink: 0 }} aria-hidden />
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            height: 1,
            background: "linear-gradient(90deg, transparent, #7C6CFF, transparent)",
            opacity: 0.6,
          }}
        />
      </div>
      {children}
    </div>
  );
}

export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 320,
        marginInline: "auto",
        padding: 10,
        borderRadius: 44,
        background: "#0C0C0C",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow: "0 50px 100px -45px rgba(0,0,0,0.7)",
        position: "relative",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 54,
          height: 5,
          borderRadius: 999,
          background: "rgba(255,255,255,0.14)",
          zIndex: 2,
        }}
      />
      <div style={{ borderRadius: 35, overflow: "hidden", background: "#000" }}>
        {children}
      </div>
    </div>
  );
}
