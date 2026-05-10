export default function Footer() {
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-3)",
    marginBottom: 12,
  };

  const linkStyle: React.CSSProperties = {
    color: "var(--text)",
    fontSize: 16,
    transition: "color var(--t-base) var(--ease-spring)",
    display: "inline-block",
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        paddingBlockStart: 128,
        paddingBlockEnd: 48,
      }}
    >
      <div className="container-x">
        <h2
          style={{
            fontSize: "clamp(48px, 8vw, 80px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            fontWeight: 500,
            margin: 0,
            marginBottom: 80,
          }}
        >
          Let&apos;s build something
          <br />
          that matters.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 32,
            marginBottom: 96,
          }}
        >
          <div>
            <div style={labelStyle}>Email</div>
            <a
              href="mailto:modianish11@gmail.com"
              data-cursor="pointer"
              style={linkStyle}
            >
              modianish11@gmail.com
            </a>
          </div>

          <div>
            <div style={labelStyle}>WhatsApp</div>
            <a
              href="https://wa.me/919968716498"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={linkStyle}
            >
              +91 9968716498
            </a>
          </div>

          <div>
            <div style={labelStyle}>Social</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <a
                href="https://instagram.com/deeperdesignsco"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                style={linkStyle}
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/deeperdesigns"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                style={linkStyle}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            color: "var(--text-3)",
            fontSize: 13,
          }}
        >
          <span>© 2026 Deeper Designs</span>
          <span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
            Delhi · Dubai
          </span>
        </div>
      </div>
    </footer>
  );
}
