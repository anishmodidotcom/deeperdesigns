import Image from "next/image";

// Reusable macOS-style browser chrome wrapping a real screenshot of a
// deployed build. No D2C hardcoding: the accent hairline reads from
// --page-accent so every vertical reuses this frame. Quiet and premium.
export default function BrowserFrame({
  src,
  alt,
  url,
  width = 1440,
  height = 900,
}: {
  src: string;
  alt: string;
  url: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
        background: "var(--dd-surface-1, #111111)",
        border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        boxShadow: "0 50px 100px -50px rgba(0,0,0,0.65)",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "11px 14px",
          background: "var(--dd-surface-2, #161616)",
          borderBottom: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.02em",
              color: "var(--dd-text-mid, #A8A8A8)",
              background: "var(--dd-bg, #0A0A0A)",
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
        {/* Spacer to balance the traffic lights so the URL stays centered. */}
        <div style={{ width: 49, flexShrink: 0 }} aria-hidden />
        {/* Active hairline, accent from CSS var. */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--page-accent), transparent)",
            opacity: 0.6,
          }}
        />
      </div>

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        sizes="(min-width: 1024px) 50vw, 100vw"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}
