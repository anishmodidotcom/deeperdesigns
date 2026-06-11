"use client";

import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";
import CursorSpotlight from "./CursorSpotlight";
import { LINKS } from "@/lib/links";
import { useReducedMotion } from "@/lib/useReducedMotion";

const BASE = "/sidonstage";

export default function Hero({
  portrait,
  hasVideo,
  hasPoster,
}: {
  portrait: string | null;
  hasVideo: boolean;
  hasPoster: boolean;
}) {
  const [isDesktop, setIsDesktop] = useState(true);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.setProperty("--hero-parallax", `${Math.min(y * 0.18, 120)}px`);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const showVideo = hasVideo && isDesktop && !reduced;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate overflow-hidden min-h-[100svh] flex items-center"
      style={{ background: "var(--stage-black)" }}
    >
      <div className="absolute inset-0 z-[1]">
        {showVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hasPoster ? `${BASE}/videos/hero/hero-poster.webp` : undefined}
            className="w-full h-full object-cover"
          >
            <source src={`${BASE}/videos/hero/hero-loop.mp4`} type="video/mp4" />
          </video>
        ) : portrait ? (
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${BASE}${portrait})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translate3d(0, var(--hero-parallax, 0), 0)`,
              animation: reduced ? "none" : "kenburns 22s ease-in-out infinite alternate",
            }}
          />
        ) : hasPoster ? (
          <img
            src={`${BASE}/videos/hero/hero-poster.webp`}
            alt="Siddhant Pamnani on stage"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${BASE}/assets/atmos/spotlight-cone.webp), url(${BASE}/assets/atmos/light-beams.webp)`,
              backgroundSize: "cover, cover",
              backgroundPosition: "center, center",
              backgroundBlendMode: "screen",
            }}
          />
        )}
      </div>

      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `url(${BASE}/assets/atmos/haze-1.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
          opacity: 0.55,
          animation: reduced ? "none" : "drift 22s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          backgroundImage: `url(${BASE}/assets/atmos/light-beams.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
          opacity: 0.4,
          animation: reduced ? "none" : "drift 30s ease-in-out infinite reverse",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[4] h-[55%] pointer-events-none gradient-fade-bottom"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[4] h-[25%] pointer-events-none gradient-fade-top"
      />

      <CursorSpotlight size={760} opacity={0.18} />

      <div className="relative z-[20] mx-auto max-w-[1240px] w-full px-6 lg:px-10 py-24 md:py-0">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div>
            <p className="font-kicker text-[12px] uppercase text-[color:var(--azure-bright)] mb-6">
              Emcee Extraordinaire
            </p>
            <h1 className="font-display text-[14vw] sm:text-[12vw] md:text-[8vw] lg:text-[100px] leading-[0.92] uppercase">
              <span className="text-shimmer block">The Voice</span>
              <span className="text-shimmer block">of Your Event</span>
            </h1>
            <p className="mt-7 max-w-[560px] text-[17px] leading-[1.55] text-[color:var(--mist)]">
              Creating powerful stage experiences for India&apos;s leading corporate events,
              leadership summits, product launches, and high impact business gatherings.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="#contact"
                className="inline-block px-7 py-3.5 rounded-[var(--radius-pill)] bg-[color:var(--azure)] text-white font-medium shadow-azure-glow hover:bg-[color:var(--azure-bright)] transition-colors"
                ariaLabel="Book Siddhant"
              >
                <span className="inline-flex items-center gap-2">
                  Book Siddhant
                  <Arrow />
                </span>
              </MagneticButton>
              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-pill)] border border-[color:var(--navy-line)] text-white hover:border-[color:var(--azure-bright)] hover:text-[color:var(--azure-bright)] transition-colors"
              >
                <PlayDot />
                Watch the Reel
              </a>
            </div>
          </div>

          <div className="hidden md:block relative">
            {portrait && !showVideo && (
              <div className="relative aspect-[3/4] w-full max-w-[440px] ml-auto rounded-[28px] overflow-hidden azure-ring">
                <img
                  src={`${BASE}${portrait}`}
                  alt="Siddhant Pamnani on stage holding a microphone"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(5,8,16,0.65) 100%)",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <a
          href="#about"
          aria-label="Scroll to About"
          className="absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 text-[color:var(--mist)] hover:text-white"
        >
          <span
            className="block w-6 h-10 rounded-full border border-[color:var(--navy-line)] relative"
            style={{ animation: reduced ? "none" : "bob 2.4s ease-in-out infinite" }}
          >
            <span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-2 w-[2px] h-2 rounded-full bg-[color:var(--azure-bright)]"
            />
          </span>
        </a>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayDot() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[color:var(--azure)]"
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path d="M2 1.5l5 3-5 3z" fill="white" />
      </svg>
    </span>
  );
}
