"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Warm follow-spot that tracks the pointer inside its parent (relative).
 * Used on Hero and Testimonials only. Disabled on touch and reduced motion.
 */
export default function CursorSpotlight({
  size = 700,
  opacity = 0.18,
}: {
  size?: number;
  opacity?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const parent = ref.current?.parentElement;
    if (!parent) return;

    let raf = 0;
    let nx = 0,
      ny = 0;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      nx = e.clientX - r.left;
      ny = e.clientY - r.top;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.transform = `translate3d(${nx - size / 2}px, ${ny - size / 2}px, 0)`;
          }
          raf = 0;
        });
      }
    };
    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, size]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-[15] transition-opacity duration-500"
      style={{
        width: size,
        height: size,
        opacity: active ? opacity : 0,
        background: `radial-gradient(circle, rgba(255,231,176,1) 0%, rgba(255,231,176,0.45) 22%, rgba(255,231,176,0) 65%)`,
        mixBlendMode: "screen",
      }}
    />
  );
}
