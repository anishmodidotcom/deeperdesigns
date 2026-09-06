"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { WHATSAPP_HREF } from "@/lib/contact";

// v22: fixed, outcome-first headline. The rotating what-if mechanic is
// retired (mid-fade ghosting, and the audit wanted one clear promise).
// The ambient tiles, parallax, and scroll indicator stay as they were.

type AmbientItem = {
  slug: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: number;
  rotate: number;
  opacity: number;
  delay: number;
};

const AMBIENT: AmbientItem[] = [
  { slug: "hivedesk",        top: "8%",    left: "4%",   width: 320, rotate: -3, opacity: 0.18, delay: 0 },
  { slug: "zaatar-republic", top: "12%",   right: "6%",  width: 340, rotate: 4,  opacity: 0.18, delay: 1.2 },
  { slug: "smilefirst",      top: "45%",   left: "1%",   width: 280, rotate: -2, opacity: 0.18, delay: 2.6 },
  { slug: "autobazaar",      top: "50%",   right: "2%",  width: 300, rotate: 3,  opacity: 0.18, delay: 0.7 },
  { slug: "stumpvision",     bottom: "8%", left: "12%",  width: 260, rotate: -4, opacity: 0.18, delay: 3.4 },
  { slug: "pawstay",         bottom: "14%",right: "14%", width: 280, rotate: 2,  opacity: 0.18, delay: 1.8 },
  { slug: "malabar-spice",   top: "30%",   left: "38%",  width: 240, rotate: 1,  opacity: 0.10, delay: 4.0 },
  { slug: "maplelens",       bottom: "32%",right: "36%", width: 240, rotate: -1, opacity: 0.10, delay: 2.2 },
];

export default function HomeHero() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      if (!layerRef.current) return;
      layerRef.current.style.transform = `translateY(${window.scrollY * -0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  const onScrollIndicatorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById("confusion");
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="hero-section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "80px" }}>
      <div ref={layerRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {AMBIENT.map((img, i) => (
          <div
            key={i}
            className="hero-ambient-tile"
            style={{
              position: "absolute",
              top: img.top,
              bottom: img.bottom,
              left: img.left,
              right: img.right,
              width: img.width,
              opacity: img.opacity,
              transform: `rotate(${img.rotate}deg)`,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 80px 8px rgba(124, 108, 255, 0.25), 0 20px 60px rgba(0,0,0,0.6)",
              animationDelay: `${img.delay}s`,
            }}
          >
            <Image
              src={`/images/_ambient/${img.slug}.webp`}
              alt=""
              role="presentation"
              width={img.width}
              height={Math.round(img.width * 0.625)}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <h1
          style={{
            fontSize: "var(--fs-display)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
            maxWidth: "1100px",
            marginInline: "auto",
          }}
        >
          Software that quietly runs{" "}
          <span
            style={{
              fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            the boring parts of your business.
          </span>
        </h1>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "var(--fg-muted)", maxWidth: "680px", marginInline: "auto", marginBottom: "48px" }}>
          Enquiries answered at 2am. Follow-ups that never slip. Payments
          chased without you. We build it for how your business actually runs,
          and you know exactly what you get before you pay.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/start-your-study" className="btn-whatsapp">Talk to us</Link>
          <TrackedWhatsAppLink
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Or message us on WhatsApp
          </TrackedWhatsAppLink>
        </div>
        {/* v26 Part 4: the teardown offered as a secondary path beside the
            strategy call. Deliberately quieter than both existing CTAs and
            placed above the untouched guarantee and price lines. */}
        <p
          style={{
            marginTop: "20px",
            fontSize: "15px",
            lineHeight: 1.5,
          }}
        >
          <Link href="/teardown" style={{ color: "var(--accent)" }}>
            Or get a free teardown of your business
          </Link>
        </p>
        <p
          className="mono"
          style={{
            marginTop: "24px",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--fg-dim)",
          }}
        >
          Your first prototype live in as little as 30 days.
        </p>
        {/* v22.1: the starting price, same quiet treatment as the
            guarantee line above it. */}
        <p
          className="mono"
          style={{
            marginTop: "8px",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--fg-dim)",
          }}
        >
          Small tools start at ₹25,000. You get the exact number in writing before we start.
        </p>
      </div>

      {!reducedMotion && (
        <button
type="button"           aria-label="Scroll to next section"
          onClick={onScrollIndicatorClick}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            color: "var(--fg-dim)",
            padding: "8px",
            animation: "scrollIndicator 2s ease-in-out infinite",
            background: "transparent",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}

      <style>{`
        /* v28.1: the floating WhatsApp button is fixed 24px from the bottom
           and is 56px tall, so it sits over the last 80px of the viewport.
           The hero centres its content, so reserving that strip at the
           bottom lifts the guarantee and price lines clear of it. Those are
           two of the three above-fold trust signals and were partly covered
           on a 390px phone. */
        @media (max-width: 767px) {
          .hero-section { padding-bottom: 110px; }
        }

        @keyframes heroFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -8px; }
        }
        .hero-ambient-tile {
          animation: heroFloat 7s ease-in-out infinite;
        }
        @keyframes scrollIndicator {
          0%, 100% { transform: translate(-50%, 0); opacity: 0.6; }
          50% { transform: translate(-50%, 8px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-ambient-tile { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
