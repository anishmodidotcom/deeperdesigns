"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  trackLiveProductCTAClick,
  trackWhatsAppOpenedFromShowcase,
} from "@/lib/meta-events";
import { useShowcaseContext } from "@/components/ShowcaseContext";
import { INDUSTRIES } from "@/lib/industries";

export default function Nav() {
  const pathname = usePathname() ?? "";
  const ctx = useShowcaseContext();
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);
  // "Browse by industry" dropdown (desktop) + mobile section toggle.
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);
  const currentIndustry = pathname.startsWith("/for/")
    ? pathname.replace("/for/", "")
    : null;

  const onTalkToUs = () => {
    // v21: Lead no longer fires on CTA clicks. Lead is reserved for the
    // lead form's confirmed completion; clicks are intent signals only.
    try {
      // v17.3: when Nav is rendered on a showcase page, stack the
      // showcase-context events the same way TrackedWhatsAppLink does.
      if (ctx?.slug) {
        trackWhatsAppOpenedFromShowcase(ctx.slug, ctx.industry);
      }
      if (
        ctx?.isLiveProduct &&
        (ctx.slug === "maplelens" || ctx.slug === "deeper-content")
      ) {
        trackLiveProductCTAClick(ctx.slug);
      }
    } catch {
      // Never block navigation.
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the industries dropdown on route change.
  useEffect(() => {
    setIndustriesOpen(false);
  }, [pathname]);

  // Close the industries dropdown on Escape or a click outside it.
  useEffect(() => {
    if (!industriesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndustriesOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (
        industriesRef.current &&
        !industriesRef.current.contains(e.target as Node)
      ) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [industriesOpen]);

  // F1 (v16): light-theme showcases (karan-legal, meera-wellness,
  // earth-and-fire, sugar-lane, nomad-trails) set `data-theme="light"`
  // on the page wrapper. When the wrapper overlaps the top viewport
  // area where the sticky nav sits, switch the nav's colors so the
  // wordmark + links stay readable.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-theme="light"]');
    if (targets.length === 0) {
      setOnLight(false);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // The element is "behind" the nav when any part of it sits in
        // the top 120px of the viewport.
        const anyOverlaps = entries.some((e) => e.isIntersecting);
        setOnLight(anyOverlaps);
      },
      { rootMargin: "0px 0px -100% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Light state colour values are inline since they're a function of
  // two booleans (scrolled, onLight) interacting; a Tailwind class
  // matrix would be noisier than the inline ternary.
  const navBg = scrolled
    ? onLight
      ? "rgba(244,242,238,0.88)"
      : "rgba(10,10,10,0.85)"
    : "transparent";
  const navBorder = scrolled
    ? onLight
      ? "1px solid rgba(26,26,26,0.12)"
      : "1px solid var(--border)"
    : "1px solid transparent";
  const wordmarkColor = onLight ? "#0A0A0A" : undefined;
  const linkColor = onLight ? "#2A2A2A" : "var(--fg-muted)";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        data-on-light={onLight ? "true" : "false"}
        style={{
          padding: "20px var(--container-px)",
          background: navBg,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: navBorder,
          transition:
            "background 300ms, border-color 300ms, backdrop-filter 300ms, color 300ms",
        }}
      >
        <div
          className="flex items-center justify-between mx-auto"
          style={{ maxWidth: "var(--container-max)" }}
        >
          <Link
            href="/"
            className="mono"
            style={{
              letterSpacing: "0.16em",
              fontSize: "13px",
              color: wordmarkColor,
              transition: "color 300ms",
            }}
          >
            DEEPER DESIGNS
          </Link>

          <div className="nav-desktop flex items-center gap-8">
            <Link
              href="/about"
              className="text-sm transition-colors duration-200"
              style={{ color: linkColor, transition: "color 300ms" }}
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm transition-colors duration-200"
              style={{ color: linkColor, transition: "color 300ms" }}
            >
              Services
            </Link>
            <Link
              href="/process"
              className="text-sm transition-colors duration-200"
              style={{ color: linkColor, transition: "color 300ms" }}
            >
              Process
            </Link>

            {/* Browse by industry: opens a panel listing all verticals. */}
            <div ref={industriesRef} style={{ position: "relative" }}>
              <button
                type="button"
                className="text-sm"
                aria-haspopup="true"
                aria-expanded={industriesOpen}
                onClick={() => setIndustriesOpen((v) => !v)}
                style={{
                  color: linkColor,
                  transition: "color 300ms",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                Browse by industry
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                  style={{
                    transform: industriesOpen ? "rotate(180deg)" : "none",
                    transition: "transform 200ms",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {industriesOpen && (
                <div
                  role="menu"
                  aria-label="Industries"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 16px)",
                    right: 0,
                    width: 540,
                    maxWidth: "calc(100vw - 48px)",
                    background: "rgba(17,17,17,0.96)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: 14,
                    boxShadow: "0 40px 80px -40px rgba(0,0,0,0.7)",
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      color: "var(--fg-dim)",
                      margin: "4px 8px 12px",
                    }}
                  >
                    {String(INDUSTRIES.length).padStart(2, "0")} INDUSTRIES WE BUILD FOR
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    {INDUSTRIES.map((ind) => {
                      const active = ind.slug === currentIndustry;
                      return (
                        <Link
                          key={ind.slug}
                          href={`/for/${ind.slug}`}
                          role="menuitem"
                          aria-current={active ? "page" : undefined}
                          onClick={() => setIndustriesOpen(false)}
                          className="nav-industry-item"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 10,
                            padding: "10px 12px",
                            borderRadius: 9,
                            fontSize: 14,
                            color: active ? "#FFFFFF" : "var(--fg-muted)",
                            background: active
                              ? "rgba(255,255,255,0.08)"
                              : "transparent",
                            textDecoration: "none",
                          }}
                        >
                          <span>{ind.name}</span>
                          {!ind.live && (
                            <span
                              className="mono"
                              style={{
                                fontSize: 9,
                                letterSpacing: "0.1em",
                                color: "var(--fg-dim)",
                              }}
                            >
                              SOON
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/start-your-study"
              className="btn-whatsapp text-sm"
              onClick={onTalkToUs}
              style={{ padding: "10px 20px" }}
            >
              Talk to us
            </Link>
          </div>

          <button
            className="nav-mobile-trigger w-10 h-10 items-center justify-center"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            style={{ display: "none", color: wordmarkColor }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(20px)",
            padding: "20px var(--container-px)",
          }}
        >
          <div className="flex justify-between items-center mb-[60px]">
            <span
              className="mono"
              style={{ letterSpacing: "0.16em", fontSize: "13px" }}
            >
              DEEPER DESIGNS
            </span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-[32px]">
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link href="/process" onClick={() => setOpen(false)}>
              Process
            </Link>
            <button
              type="button"
              aria-expanded={industriesOpen}
              onClick={() => setIndustriesOpen((v) => !v)}
              className="text-[32px]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
              }}
            >
              Industries
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden
                style={{
                  transform: industriesOpen ? "rotate(180deg)" : "none",
                  transition: "transform 200ms",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </nav>

          {industriesOpen && (
            <div
              style={{
                marginTop: 20,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                overflowY: "auto",
              }}
            >
              {INDUSTRIES.map((ind) => {
                const active = ind.slug === currentIndustry;
                return (
                  <Link
                    key={ind.slug}
                    href={`/for/${ind.slug}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => {
                      setIndustriesOpen(false);
                      setOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      padding: "10px 0",
                      fontSize: 15,
                      color: active ? "#FFFFFF" : "var(--fg-muted)",
                    }}
                  >
                    <span>{ind.name}</span>
                    {!ind.live && (
                      <span
                        className="mono"
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.1em",
                          color: "var(--fg-dim)",
                        }}
                      >
                        SOON
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
          <div className="mt-auto pb-10 flex flex-col gap-3">
            <Link
              href="/start-your-study"
              className="btn-whatsapp"
              onClick={() => { onTalkToUs(); setOpen(false); }}
            >
              Talk to us
            </Link>
            <Link
              href="/#gallery"
              className="btn-outline"
              onClick={() => setOpen(false)}
            >
              Let&apos;s explore ideas
            </Link>
          </div>
        </div>
      )}

      {/* Mobile media-query toggle stays as a plain <style> block (v12
          pattern: never re-introduce styled-jsx). */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-trigger { display: flex !important; }
        }
        .nav-industry-item:hover {
          background: rgba(255,255,255,0.06) !important;
          color: #FFFFFF !important;
        }
        .nav-industry-item:active { transform: translateY(1px); }
      `}</style>
    </>
  );
}
