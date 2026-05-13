export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "var(--section-py) 0 40px", marginTop: "120px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "48px", marginBottom: "80px" }} className="footer-grid">
          <div>
            <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "12px" }}>Email</p>
            <a href="mailto:anish.modi@deeperdesigns.in" style={{ fontSize: "16px" }}>anish.modi@deeperdesigns.in</a>
          </div>
          <div>
            <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "12px" }}>WhatsApp</p>
            <a href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business." style={{ fontSize: "16px" }}>+91 99687 16498</a>
          </div>
          <div>
            <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "12px" }}>Social</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="https://instagram.com/deeperdesignsco" target="_blank" rel="noopener noreferrer" style={{ fontSize: "16px" }}>Instagram</a>
              <a href="https://linkedin.com/company/deeperdesigns" target="_blank" rel="noopener noreferrer" style={{ fontSize: "16px" }}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: "1px solid var(--border)", fontSize: "13px", color: "var(--fg-dim)" }} className="footer-bottom">
          <p>© 2026 Deeper Designs</p>
          <p>Delhi · Dubai · India-first</p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .footer-bottom { flex-direction: column; gap: 12px; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
