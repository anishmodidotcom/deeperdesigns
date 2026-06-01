import type { Metadata } from "next";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Not found · Deeper Designs",
  robots: { index: false, follow: false },
};

const LINKS = [
  {
    href: "/work/maplelens",
    label: "Our two live products",
  },
  {
    href: "/work/veda-glow",
    label: "The 20 we're proud of",
  },
  {
    href: "/about",
    label: "Why we exist",
  },
];

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--dd-bg, #0A0A0A)",
        color: "var(--dd-text-high, #F5F5F5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px clamp(20px, 4vw, 48px)",
      }}
    >
      <div style={{ maxWidth: 720, width: "100%" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--dd-accent-primary, #7C6CFF)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          404 · NOT FOUND
        </p>

        <h1
          style={{
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 76px)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: "var(--dd-text-high, #F5F5F5)",
            margin: 0,
            marginBottom: 24,
            maxWidth: 640,
          }}
        >
          This page is one of the things we haven&rsquo;t built yet.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: "var(--dd-text-mid, #A8A8A8)",
            margin: 0,
            marginBottom: 56,
            maxWidth: 560,
          }}
        >
          But we&rsquo;ve built 22 others. Have a look.
        </p>

        <nav
          aria-label="Suggested pages"
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
            marginBottom: 56,
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="dd-404-link"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBlock: 20,
                borderBottom: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 19,
                color: "var(--dd-text-high, #F5F5F5)",
                textDecoration: "none",
                transition: "color 150ms",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span
                  aria-hidden
                  style={{
                    color: "var(--dd-accent-primary, #7C6CFF)",
                    fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                    fontSize: 14,
                  }}
                >
                  →
                </span>
                {l.label}
              </span>
            </Link>
          ))}
        </nav>

        <a
          href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 22px",
            borderRadius: 9999,
            background: "#25D366",
            color: "#0F2A1B",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            textDecoration: "none",
          }}
        >
          Lost? Talk to us · wa.me/919968716498
        </a>
      </div>

      <style>{`
        .dd-404-link:hover {
          color: var(--dd-accent-primary, #7C6CFF) !important;
        }
      `}</style>
    </main>
  );
}
