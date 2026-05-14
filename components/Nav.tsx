"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "20px var(--container-px)",
          background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background 300ms, border-color 300ms, backdrop-filter 300ms",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <Link href="/" className="mono" style={{ letterSpacing: "0.16em", fontSize: "13px" }}>
            DEEPER DESIGNS
          </Link>

          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/about" style={{ fontSize: "14px", color: "var(--fg-muted)", transition: "color 200ms" }}>About</Link>
            <Link href="/services" style={{ fontSize: "14px", color: "var(--fg-muted)", transition: "color 200ms" }}>Services</Link>
            <Link href="/process" style={{ fontSize: "14px", color: "var(--fg-muted)", transition: "color 200ms" }}>Process</Link>
            <Link href="/start-your-study" className="btn-whatsapp" style={{ padding: "10px 20px", fontSize: "14px" }}>
              Talk to us
            </Link>
          </div>

          <button
            className="nav-mobile-trigger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            style={{ display: "none", width: "40px", height: "40px", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            padding: "20px var(--container-px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "60px" }}>
            <span className="mono" style={{ letterSpacing: "0.16em", fontSize: "13px" }}>DEEPER DESIGNS</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "24px", fontSize: "32px" }}>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/process" onClick={() => setOpen(false)}>Process</Link>
          </nav>
          <div style={{ marginTop: "auto", paddingBottom: "40px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href="/start-your-study" className="btn-whatsapp" onClick={() => setOpen(false)}>
              Talk to us
            </Link>
            <Link href="/#gallery" className="btn-outline" onClick={() => setOpen(false)}>
              Let&apos;s explore ideas
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-trigger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
