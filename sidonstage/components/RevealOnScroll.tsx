"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  selector,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  selector?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      const targets = selector ? el.querySelectorAll<HTMLElement>(selector) : [el];
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }
    const targets = selector
      ? gsap.utils.toArray<HTMLElement>(el.querySelectorAll(selector))
      : [el];
    gsap.set(targets, { opacity: 0, y });
    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay,
      stagger: targets.length > 1 ? stagger : 0,
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        once: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, delay, stagger, selector, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
