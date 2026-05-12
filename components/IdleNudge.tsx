"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "next-view-transitions";

const IDLE_MS = 14000;

export default function IdleNudge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let timeout: ReturnType<typeof setTimeout>;

    const reset = () => {
      clearTimeout(timeout);
      setVisible(false);
      timeout = setTimeout(() => setVisible(true), IDLE_MS);
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "scroll",
      "keydown",
      "touchstart",
      "wheel",
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      clearTimeout(timeout);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 60,
            background: "var(--surface-1)",
            border: "1px solid var(--border-2)",
            borderRadius: 12,
            paddingInline: 14,
            paddingBlock: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
            maxWidth: 360,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            color: "var(--text-2)",
            letterSpacing: "0.04em",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.4)",
          }}
          role="status"
          className="dd-idle-nudge"
        >
          <span>still here? want to talk?</span>
          <Link
            href="/start-your-study"
            data-cursor="pointer"
            style={{
              color: "var(--text)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationColor: "var(--accent)",
            }}
          >
            yes
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            data-cursor="pointer"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-3)",
              cursor: "pointer",
              padding: 4,
              marginLeft: 4,
              fontFamily: "inherit",
              fontSize: 14,
            }}
          >
            ×
          </button>
        </motion.div>
      ) : null}
      <style jsx>{`
        @media (max-width: 600px) {
          :global(.dd-idle-nudge) {
            display: none !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
