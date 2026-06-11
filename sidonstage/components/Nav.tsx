"use client";

import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "The Edge", href: "#edge" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Services", href: "#services" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(5,8,16,0.65)] backdrop-blur-md border-b border-[color:var(--navy-line)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <a
            href="#top"
            className="font-display text-[16px] tracking-[0.32em] text-white"
            aria-label="Sid on Stage, back to top"
          >
            SID ON STAGE
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-kicker text-[11px] uppercase text-[color:var(--mist)] hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton
              href="#contact"
              className="px-5 py-2 rounded-[var(--radius-pill)] bg-[color:var(--azure)] text-white text-sm font-medium shadow-azure-glow hover:bg-[color:var(--azure-bright)] transition-colors"
            >
              Book Siddhant
            </MagneticButton>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[color:var(--navy-line)] text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-4 h-[2px] bg-white relative">
              <span
                aria-hidden
                className="absolute left-0 right-0 h-[2px] bg-white transition-transform"
                style={{ top: open ? 0 : -6, transform: open ? "rotate(45deg)" : "none" }}
              />
              <span
                aria-hidden
                className="absolute left-0 right-0 h-[2px] bg-white transition-transform"
                style={{ top: open ? 0 : 6, transform: open ? "rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[68] bg-[color:var(--stage-black)] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="px-6 pt-24 pb-12 flex flex-col gap-6">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-heading text-3xl text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-block px-6 py-3 rounded-[var(--radius-pill)] bg-[color:var(--azure)] text-white text-base font-medium text-center shadow-azure-glow"
            >
              Book Siddhant
            </a>
          </div>
        </div>
      )}
    </>
  );
}
