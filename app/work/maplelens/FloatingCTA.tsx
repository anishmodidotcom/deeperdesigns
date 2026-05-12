"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href="https://maplelens.vercel.app/app"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            right: 24,
            bottom: 96,
            zIndex: 70,
            background: "var(--page-accent)",
            color: "#1A1612",
            borderRadius: 9999,
            paddingInline: 22,
            paddingBlock: 14,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.02em",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            boxShadow: "0 18px 40px -10px rgba(212, 168, 87, 0.45)",
          }}
          className="ml-floating-cta"
          aria-label="Try Maple Lens, opens in a new tab"
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#1A1612",
              animation:
                "ml-pulse 2.6s ease-in-out infinite",
            }}
          />
          Try Maple Lens
          <span aria-hidden>↗</span>
          <style jsx>{`
            @keyframes ml-pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.6); opacity: 0.5; }
            }
            @media (prefers-reduced-motion: reduce) {
              span[aria-hidden] {
                animation: none !important;
              }
            }
            @media (max-width: 600px) {
              :global(.ml-floating-cta) {
                left: 12px !important;
                right: 12px !important;
                bottom: 12px !important;
                justify-content: center;
              }
            }
          `}</style>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
