"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "What if your operations ran themselves?",
  "What if your team stopped chasing the same 6 problems?",
  "What if profitability had a dashboard?",
  "What if your customer remembered your brand?",
  "What if your business knew what to do next?",
  "What if you could see the bottleneck before it cost you?",
  "What if the tool just fit?",
];

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
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const cycle = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setPhraseIdx(i => (i + 1) % PHRASES.length);
        setFadeOut(false);
      }, 300);
    }, 3500);
    return () => clearInterval(cycle);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      if (!layerRef.current) return;
      layerRef.current.style.transform = `translateY(${window.scrollY * -0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  const onExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("gallery");
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  const onScrollIndicatorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById("outcomes");
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "80px" }}>
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
              boxShadow: "0 0 80px 8px rgba(99, 102, 241, 0.25), 0 20px 60px rgba(0,0,0,0.6)",
              animationDelay: `${img.delay}s`,
            }}
          >
            <Image
              src={`/images/_ambient/${img.slug}.webp`}
              alt=""
              width={img.width}
              height={Math.round(img.width * 0.625)}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <h1
          aria-live="polite"
          style={{
            fontSize: "var(--fs-display)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
            maxWidth: "1100px",
            marginInline: "auto",
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 300ms var(--ease-out)",
          }}
        >
          {PHRASES[phraseIdx]}
        </h1>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "var(--fg-muted)", maxWidth: "640px", marginInline: "auto", marginBottom: "48px" }}>
          Custom tools, built around how your business actually works.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#gallery" onClick={onExploreClick} className="btn-outline">Let&apos;s explore ideas</a>
          <a href="/start-your-study" className="btn-whatsapp">Talk to us</a>
        </div>
      </div>

      {!reducedMotion && (
        <button
          aria-label="Scroll to next section"
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
