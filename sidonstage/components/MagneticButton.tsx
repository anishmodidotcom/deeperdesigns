"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
};

export default function MagneticButton({
  href,
  onClick,
  className,
  children,
  target,
  rel,
  ariaLabel,
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });
  const x = useTransform(sx, (v) => `${v}px`);
  const y = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set((e.clientX - cx) * strength);
    my.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <motion.span style={{ x, y, display: "inline-block" }} className={className}>
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
        <a href={href} target={target} rel={rel} aria-label={ariaLabel}>
          {inner}
        </a>
      </div>
    );
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <button type="button" onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </button>
    </div>
  );
}
