"use client";

import { useEffect, useState } from "react";

/**
 * Faint floating dust particles over the page. Decorative,
 * pointer-events:none. Mounts client-side only so the static export
 * stays deterministic (no SSR position drift between server and client).
 */
const SPECKS = 24;

type Spec = { left: number; size: number; delay: number; duration: number; blue: boolean };

function rng(seed: number) {
  let x = seed | 0 || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 10000) / 10000;
  };
}

export default function ParticleField() {
  const [specs, setSpecs] = useState<Spec[] | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const r = rng(31337);
    const list: Spec[] = Array.from({ length: SPECKS }, () => ({
      left: r() * 100,
      size: 1 + r() * 2.6,
      delay: r() * -22,
      duration: 18 + r() * 14,
      blue: r() > 0.55,
    }));
    setSpecs(list);
  }, []);

  if (!specs) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[55]">
      {specs.map((s, i) => (
        <span
          key={i}
          className="absolute block rounded-full"
          style={{
            left: `${s.left}%`,
            bottom: "-5%",
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.blue ? "rgba(94,168,255,0.65)" : "rgba(255,231,176,0.55)",
            boxShadow: s.blue
              ? "0 0 6px rgba(94,168,255,0.7)"
              : "0 0 5px rgba(255,231,176,0.6)",
            animation: `particleFloat ${s.duration}s ${s.delay}s linear infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
