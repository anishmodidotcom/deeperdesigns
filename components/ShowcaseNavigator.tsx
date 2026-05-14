"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { motion, AnimatePresence } from "motion/react";
import { SHOWCASES } from "@/lib/showcases";

export default function ShowcaseNavigator() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!pathname?.startsWith("/work/")) return null;

  const currentSlug = pathname.replace("/work/", "");
  const currentIndex = SHOWCASES.findIndex((s) => s.slug === currentSlug);
  if (currentIndex === -1) return null;

  const totalLabel = `${String(currentIndex + 1).padStart(2, "0")} / ${String(SHOWCASES.length).padStart(2, "0")}`;

  return (
    <>
      {/* Desktop: floating right-edge dock */}
      <div
        className="dd-nav-desktop-dock"
        style={{
          position: "fixed",
          top: "50%",
          right: 20,
          transform: "translateY(-50%)",
          zIndex: 45,
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
                padding: "10px 6px",
                background: "rgba(17, 17, 17, 0.82)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxHeight: "72vh",
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        paddingInline: 10,
                        paddingBlock: 6,
                        color: active ? "#FFFFFF" : "var(--fg-muted)",
                        fontSize: 12,
                        textDecoration: "none",
                        borderRadius: 7,
                        background: active ? "var(--accent)" : "transparent",
                        whiteSpace: "nowrap",
                        transition: "background 160ms, color 160ms",
                      }}
                      title={s.cardLabel}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          opacity: active ? 1 : 0.6,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ letterSpacing: "-0.005em" }}>
                        {s.cardLabel}
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
                background: "rgba(17, 17, 17, 0.82)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid var(--border)",
                borderRadius: 9999,
                padding: "10px 13px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--fg-muted)",
                cursor: "pointer",
              }}
            >
              {totalLabel}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: bottom-left toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open studies navigator"
        className="dd-nav-mobile-toggle"
        style={{
          display: "none",
          position: "fixed",
          left: 12,
          bottom: 12,
          zIndex: 45,
          background: "rgba(17, 17, 17, 0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid var(--border)",
          color: "var(--fg-muted)",
          borderRadius: 9999,
          padding: "9px 15px",
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
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--fg-dim)",
                  }}
                >
                  STUDIES NAVIGATOR
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigator"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--fg)",
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
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          paddingBlock: 14,
                          color: active ? "var(--accent)" : "var(--fg)",
                          textDecoration: "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-geist-mono), monospace",
                            fontSize: 11,
                            letterSpacing: "0.16em",
                            color: "var(--fg-dim)",
                            width: 32,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: 15 }}>{s.cardLabel}</span>
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
