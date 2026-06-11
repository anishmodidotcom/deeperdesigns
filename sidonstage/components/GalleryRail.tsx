"use client";

import { useEffect, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

const BASE = "/sidonstage";

/**
 * Horizontal scroll rail on desktop, two-column stack on mobile.
 *
 * Server passes an array of file paths plus an array of alt strings (one
 * per file, precomputed). Falls back to spotlight-cone tiles if no files
 * are wired yet so the section never looks broken.
 */
export default function GalleryRail({
  kicker,
  files,
  alts,
}: {
  kicker: string;
  files: string[];
  alts: string[];
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const items = files.length > 0 ? files : Array.from({ length: 4 }, () => "");
  const itemAlts = files.length > 0 ? alts : items.map((_, i) => `${kicker}, frame ${i + 1}`);

  return (
    <div className="mb-20">
      <RevealOnScroll>
        <p className="font-kicker text-[12px] uppercase text-[color:var(--azure-bright)] mb-6">
          {kicker}
        </p>
      </RevealOnScroll>

      <RevealOnScroll selector="[data-card]" stagger={0.08}>
        {isDesktop ? (
          <div className="flex gap-5 overflow-x-auto pb-3" style={{ scrollSnapType: "x mandatory" }}>
            {items.map((src, i) => (
              <Tile key={i} src={src} alt={itemAlts[i] ?? ""} desktop />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((src, i) => (
              <Tile key={i} src={src} alt={itemAlts[i] ?? ""} />
            ))}
          </div>
        )}
      </RevealOnScroll>
    </div>
  );
}

function Tile({ src, alt, desktop }: { src: string; alt: string; desktop?: boolean }) {
  return (
    <div
      data-card
      className={`relative overflow-hidden rounded-[var(--radius-card)] bg-[color:var(--navy)] border border-[color:var(--navy-line)] group transition-all duration-300 hover:border-[color:var(--azure-bright)] hover:shadow-card-lift hover:-translate-y-1 ${
        desktop ? "shrink-0 w-[320px] h-[400px]" : "aspect-[3/4]"
      }`}
      style={{ scrollSnapAlign: "start" }}
    >
      {src ? (
        <img
          src={`${BASE}${src}`}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="w-full h-full"
          style={{
            backgroundImage: `url(${BASE}/assets/atmos/spotlight-cone.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.55,
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,130,246,0) 50%, rgba(5,8,16,0.5) 100%), radial-gradient(120% 80% at 50% 100%, rgba(43,130,246,0.18), transparent 60%)",
        }}
      />
    </div>
  );
}
