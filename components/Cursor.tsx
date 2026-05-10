"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

type CursorVariant = "default" | "pointer" | "text" | "view";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.6 };
  const ringSpringX = useSpring(ringX, springConfig);
  const ringSpringY = useSpring(ringY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (target) {
        const value = target.getAttribute("data-cursor") as CursorVariant;
        if (
          value === "pointer" ||
          value === "text" ||
          value === "view"
        ) {
          setVariant(value);
          return;
        }
      }
      const interactive = (e.target as HTMLElement | null)?.closest?.(
        "a, button, [role='button'], input, textarea, select, label"
      );
      if (interactive) {
        setVariant("pointer");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, visible, dotX, dotY, ringX, ringY]);

  if (!enabled) return null;

  const ringSize =
    variant === "view" ? 80 : variant === "pointer" ? 64 : variant === "text" ? 4 : 40;
  const ringHeight = variant === "text" ? 28 : ringSize;
  const ringRadius = variant === "text" ? 2 : 9999;

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          x: dotX,
          y: dotY,
          opacity: visible && variant !== "text" ? 1 : 0,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: "var(--text)",
            borderRadius: 9999,
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{
          x: ringSpringX,
          y: ringSpringY,
          opacity: visible ? 1 : 0,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringHeight,
            borderRadius: ringRadius,
            borderColor:
              variant === "pointer" || variant === "view"
                ? "var(--accent)"
                : "rgba(149, 162, 179, 0.5)",
            backgroundColor:
              variant === "view" ? "rgba(94, 106, 210, 0.15)" : "transparent",
          }}
          transition={{
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mixBlendMode: "difference",
          }}
        >
          <AnimatePresence>
            {variant === "view" && (
              <motion.span
                key="view-label"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text)",
                }}
              >
                View
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
