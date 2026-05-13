import { Link } from "next-view-transitions";
import {
  WHATSAPP_HREF,
  STUDIO_EMAIL,
  STUDIO_EMAIL_HREF,
  FORM_HREF,
  FORM_CTA,
} from "@/lib/contact";

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
      id="site-footer"
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
            marginBottom: 32,
          }}
        >
          Tell us what&apos;s slowing
          <br />
          your business down.
        </h2>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 80,
          }}
        >
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingInline: 24,
              paddingBlock: 14,
              background: "#25D366",
              color: "#0F2A1B",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            Start a conversation
            <span aria-hidden>↗</span>
          </a>
          <Link
            href={FORM_HREF}
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingInline: 24,
              paddingBlock: 14,
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border-2)",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            {FORM_CTA}
            <span aria-hidden>→</span>
          </Link>
        </div>

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
              href={STUDIO_EMAIL_HREF}
              data-cursor="pointer"
              style={linkStyle}
            >
              {STUDIO_EMAIL}
            </a>
          </div>

          <div>
            <div style={labelStyle}>WhatsApp</div>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={linkStyle}
            >
              +91 99687 16498
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
            Delhi · Dubai · India-first
          </span>
        </div>
      </div>
    </footer>
  );
}
