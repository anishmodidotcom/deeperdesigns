"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { motion, AnimatePresence } from "motion/react";
import { SHOWCASES } from "@/lib/showcases";

export default function ShowcaseNavigator() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Only render on /work/* routes.
  if (!pathname?.startsWith("/work/")) return null;

  const currentSlug = pathname.replace("/work/", "");
  const currentIndex = SHOWCASES.findIndex((s) => s.slug === currentSlug);
  const totalLabel = `${String(currentIndex + 1).padStart(2, "0")} / ${SHOWCASES.length}`;

  return (
    <>
      {/* Desktop: floating right-edge dock */}
      <div
        className="dd-nav-desktop-dock"
        style={{
          position: "fixed",
          top: "50%",
          right: 24,
          transform: "translateY(-50%)",
          zIndex: 65,
          display: "none",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.ul
              key="open"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                listStyle: "none",
                margin: 0,
                padding: "12px 6px",
                background: "rgba(8, 9, 10, 0.78)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid var(--border-2)",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxHeight: "70vh",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {SHOWCASES.map((s, i) => {
                const active = s.slug === currentSlug;
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/work/${s.slug}`}
                      data-cursor="pointer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        paddingInline: 10,
                        paddingBlock: 5,
                        color: active ? "#FFFFFF" : "var(--text-2)",
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textDecoration: "none",
                        borderRadius: 6,
                        background: active
                          ? "var(--accent)"
                          : "transparent",
                        whiteSpace: "nowrap",
                      }}
                      title={s.cardLabel}
                    >
                      <span style={{ opacity: active ? 1 : 0.7 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          letterSpacing: "-0.005em",
                          fontFamily:
                            "var(--font-geist-sans), system-ui, sans-serif",
                        }}
                      >
                        {s.industryLabel}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "rgba(8, 9, 10, 0.78)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid var(--border-2)",
                borderRadius: 9999,
                padding: "10px 12px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--text-2)",
                cursor: "pointer",
              }}
            >
              {totalLabel}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: bottom slider toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open studies navigator"
        data-cursor="pointer"
        className="dd-nav-mobile-toggle"
        style={{
          display: "none",
          position: "fixed",
          left: 12,
          bottom: 12,
          zIndex: 65,
          background: "rgba(8, 9, 10, 0.85)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid var(--border-2)",
          color: "var(--text-2)",
          borderRadius: 9999,
          padding: "8px 14px",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          cursor: "pointer",
        }}
      >
        STUDIES · {totalLabel}
      </button>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 130,
              }}
              aria-hidden
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Studies navigator"
              style={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 135,
                background: "var(--bg)",
                borderTop: "1px solid var(--border)",
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                padding: 24,
                maxHeight: "78vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-3)",
                  }}
                >
                  STUDIES NAVIGATOR
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigator"
                  data-cursor="pointer"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border-2)",
                    color: "var(--text)",
                    width: 36,
                    height: 36,
                    borderRadius: 9999,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  ×
                </button>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                {SHOWCASES.map((s, i) => {
                  const active = s.slug === currentSlug;
                  return (
                    <li
                      key={s.slug}
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <Link
                        href={`/work/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        data-cursor="pointer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          paddingBlock: 14,
                          color: active ? "var(--accent)" : "var(--text)",
                          textDecoration: "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-geist-mono), monospace",
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            color: "var(--text-3)",
                            width: 36,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: 15 }}>{s.industryLabel}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .dd-nav-desktop-dock {
            display: block !important;
          }
        }
        @media (max-width: 1023px) {
          .dd-nav-mobile-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
