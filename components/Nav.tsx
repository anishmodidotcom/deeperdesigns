"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "var(--nav-bg-scrolled, rgba(8,9,10,0.8))" : "transparent",
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
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {[
            { href: "/about", label: "About" },
            { href: "/services", label: "Services" },
            { href: "/process", label: "Process" },
          ].map((item) => (
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
            href="/start-your-study"
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
            Start Your Study
          </Link>
        </nav>
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          :global(.nav-link) {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
