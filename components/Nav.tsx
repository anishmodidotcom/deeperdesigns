"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { AnimatePresence, motion } from "motion/react";
import { WHATSAPP_HREF, FORM_HREF, FORM_CTA } from "@/lib/contact";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open.
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? "var(--nav-bg-scrolled, rgba(8,9,10,0.8))"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition:
          "background var(--t-base) var(--ease-spring), backdrop-filter var(--t-base) var(--ease-spring)",
      }}
    >
      <div
        className="container-x"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBlock: 16,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-2)",
            transition: "color var(--t-base) var(--ease-spring)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-2)";
          }}
        >
          DEEPER DESIGNS
        </Link>

        <nav
          className="dd-nav-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="pointer"
              className="nav-link"
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 13,
                color: "var(--text-2)",
                transition: "color var(--t-base) var(--ease-spring)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-2)";
              }}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={FORM_HREF}
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              paddingInline: 16,
              paddingBlock: 8,
              borderRadius: 9999,
              border: "1px solid var(--border-2)",
              color: "var(--text-2)",
              fontSize: 13,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              transition:
                "background var(--t-base) var(--ease-spring), color var(--t-base) var(--ease-spring), border-color var(--t-base) var(--ease-spring)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-2)";
              e.currentTarget.style.borderColor = "var(--border-2)";
            }}
          >
            {FORM_CTA}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="dd-mobile-menu"
          className="dd-nav-burger"
          data-cursor="pointer"
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid var(--border-2)",
            color: "var(--text)",
            width: 40,
            height: 40,
            borderRadius: 9999,
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden
          >
            <line x1="1" y1="2" x2="17" y2="2" />
            <line x1="1" y1="7" x2="17" y2="7" />
            <line x1="1" y1="12" x2="17" y2="12" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <MobileDrawer onClose={() => setMenuOpen(false)} />
        ) : null}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.dd-nav-desktop) {
            display: none !important;
          }
          :global(.dd-nav-burger) {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 110,
        }}
        aria-hidden
      />
      <motion.div
        id="dd-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(360px, 86vw)",
          background: "var(--bg)",
          borderLeft: "1px solid var(--border)",
          zIndex: 120,
          display: "flex",
          flexDirection: "column",
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 48,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-3)",
            }}
          >
            MENU
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            data-cursor="pointer"
            style={{
              background: "transparent",
              border: "1px solid var(--border-2)",
              color: "var(--text)",
              width: 40,
              height: 40,
              borderRadius: 9999,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              data-cursor="pointer"
              style={{
                fontSize: 28,
                fontWeight: 400,
                color: "var(--text)",
                letterSpacing: "-0.02em",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <Link
            href={FORM_HREF}
            onClick={onClose}
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingInline: 22,
              paddingBlock: 14,
              background: "var(--accent)",
              color: "#FFFFFF",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            {FORM_CTA}
            <span aria-hidden>→</span>
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingInline: 22,
              paddingBlock: 14,
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border-2)",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            WhatsApp ↗
          </a>
        </div>
      </motion.div>
    </>
  );
}
