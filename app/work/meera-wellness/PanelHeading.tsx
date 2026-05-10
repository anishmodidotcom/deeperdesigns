"use client";

export default function PanelHeading() {
  return (
    <div className="container-x" style={{ paddingBlock: 64 }}>
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--page-accent)",
          margin: 0,
          marginBottom: 24,
        }}
      >
        THE PLATFORM
      </p>
      <h2
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 400,
          fontSize: "clamp(28px, 4vw, 48px)",
          color: "var(--page-text)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          margin: 0,
          maxWidth: 720,
        }}
      >
        Everything Meera needs. Nothing she doesn&apos;t.
      </h2>
    </div>
  );
}
