import Link from "next/link";

// v30.2: a minimal header for every Preflight route.
//
// The Preflight pages are their own composition and carry no sitewide
// nav, which left them with no way back to the rest of the site above
// the fold. This is the smallest thing that fixes it: the monogram on
// the left and one mono link on the right, both to the home page, on the
// same hairline and the same 1184 grid as the content below it.
//
// Static rather than fixed, so no route needs to reserve space for it.

const MONO = "var(--font-geist-mono), monospace";

function Monogram() {
  // brand/v1/logo/monogram-primary.svg, inlined so it inherits colour.
  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 64 32"
      role="img"
      aria-label="Deeper Designs"
      style={{ display: "block" }}
    >
      <mask id="pf-dd-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="32">
        <rect width="64" height="32" fill="#fff" />
        <rect x="0" y="14" width="64" height="4" fill="#000" />
      </mask>
      <g fill="currentColor" fillRule="evenodd" mask="url(#pf-dd-cut)">
        <path d="M4 0 L16 0 A12 16 0 0 1 16 32 L4 32 Z M10 6 L16 6 A6 10 0 0 1 16 26 L10 26 Z" />
        <path d="M36 0 L48 0 A12 16 0 0 1 48 32 L36 32 Z M42 6 L48 6 A6 10 0 0 1 48 26 L42 26 Z" />
      </g>
    </svg>
  );
}

export default function PreflightHeader() {
  return (
    <header
      style={{
        padding: "20px clamp(20px,4vw,48px)",
        background: "#0A0A0B",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1184,
          margin: "0 auto",
          minHeight: 41,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          aria-label="Deeper Designs home"
          style={{ display: "inline-flex", color: "#F5F5F5" }}
        >
          <Monogram />
        </Link>
        <Link
          href="/"
          className="pf-link-underline"
          style={{
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: "0.14em",
            color: "#C8C8C8",
          }}
        >
          Deeper Designs →
        </Link>
      </div>
    </header>
  );
}
