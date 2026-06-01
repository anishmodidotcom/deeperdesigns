export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t"
      style={{
        borderColor: "var(--border)",
        padding: "var(--section-py) 0 40px",
        marginTop: "120px",
      }}
    >
      <div className="container">
        <div className="footer-grid grid grid-cols-1 gap-12 mb-20 md:grid-cols-3">
          <div>
            <p className="mono mb-3" style={{ color: "var(--fg-dim)" }}>
              Email
            </p>
            <a
              href="mailto:anish.modi@deeperdesigns.in"
              className="text-base"
            >
              anish.modi@deeperdesigns.in
            </a>
          </div>
          <div>
            <p className="mono mb-3" style={{ color: "var(--fg-dim)" }}>
              WhatsApp
            </p>
            <a
              href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business."
              className="text-base"
            >
              +91 99687 16498
            </a>
          </div>
          <div>
            <p className="mono mb-3" style={{ color: "var(--fg-dim)" }}>
              Social
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com/deeperdesignsco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/deeperdesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div
          className="footer-bottom pt-6 border-t text-sm"
          style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
        >
          <div className="footer-bottom-row flex flex-col gap-3 items-start md:flex-row md:justify-between md:items-center md:gap-0">
            <p>© 2026 Deeper Designs</p>
            <p>Delhi · Dubai · India-first</p>
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--fg-dim)" }}>
            Built in Delhi by Anish Modi.
          </p>
        </div>
      </div>
    </footer>
  );
}
