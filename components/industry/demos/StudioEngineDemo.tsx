// Studio Engine demo.
// A two-pane before/after frame: "RAW / phone photo" vs "GENERATED /
// studio". Both panes are clean CSS-rendered placeholders for now, each
// with a reserved image slot (data-asset) so a real generated image pair
// can be dropped in later without touching the layout.

export default function StudioEngineDemo() {
  return (
    <div
      data-demo="studio-engine"
      style={{
        width: "100%",
        borderRadius: 18,
        border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        background: "var(--dd-surface-1, #111111)",
        padding: 16,
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        <Pane
          asset="studio-before"
          label="RAW"
          sub="phone photo"
          accentBorder={false}
          surface="linear-gradient(160deg, #1A1A1A 0%, #232323 100%)"
        />
        <Pane
          asset="studio-after"
          label="GENERATED"
          sub="studio"
          accentBorder
          surface="linear-gradient(160deg, color-mix(in srgb, var(--page-accent) 22%, #141414) 0%, #141414 100%)"
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginTop: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--dd-text-low, #808080)",
          }}
        >
          ONE PHONE PHOTO
        </span>
        <span aria-hidden style={{ color: "var(--page-accent)", fontSize: 14 }}>
          →
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--page-accent)",
          }}
        >
          FULL CATALOGUE
        </span>
      </div>
    </div>
  );
}

function Pane({
  asset,
  label,
  sub,
  accentBorder,
  surface,
}: {
  asset: string;
  label: string;
  sub: string;
  accentBorder: boolean;
  surface: string;
}) {
  return (
    <div
      data-asset={asset}
      style={{
        position: "relative",
        aspectRatio: "3 / 4",
        borderRadius: 12,
        overflow: "hidden",
        background: surface,
        border: accentBorder
          ? "1px solid var(--page-accent)"
          : "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 12,
      }}
    >
      {/* Reserved image slot: a real generated image pair drops in here. */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 46,
          height: 58,
          borderRadius: 6,
          border: `1px dashed ${
            accentBorder ? "var(--page-accent)" : "rgba(255,255,255,0.18)"
          }`,
        }}
      />
      <span
        style={{
          alignSelf: "flex-start",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 9.5,
          letterSpacing: "0.12em",
          color: accentBorder ? "var(--page-accent)" : "var(--dd-text-mid, #A8A8A8)",
          background: "rgba(10,10,10,0.55)",
          borderRadius: 999,
          padding: "3px 8px",
          backdropFilter: "blur(4px)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: 12,
          color: "var(--dd-text-mid, #A8A8A8)",
        }}
      >
        {sub}
      </span>
    </div>
  );
}
