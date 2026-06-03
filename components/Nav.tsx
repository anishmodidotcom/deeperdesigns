"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { trackLead } from "@/lib/meta-events";

export default function Nav() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);

  const onTalkToUs = () => {
    try {
      trackLead(pathname);
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
          </nav>
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
      `}</style>
    </>
  );
}
