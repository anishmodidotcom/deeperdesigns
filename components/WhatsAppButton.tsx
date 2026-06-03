"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackLead } from "@/lib/meta-events";

const DISMISS_KEY = "dd-whatsapp-tooltip-dismissed";
const AUTO_HIDE_MS = 5000;
const INITIAL_DELAY_MS = 1200;

export default function WhatsAppButton() {
  const pathname = usePathname() ?? "";
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const [dismissedPermanent, setDismissedPermanent] = useState(false);
  const [hiddenByFooter, setHiddenByFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  const onWhatsAppClick = () => {
    try {
      trackLead(pathname);
    } catch {
      // Never block navigation.
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobile = window.matchMedia("(max-width: 639px)").matches;
    setIsMobile(mobile);

    if (localStorage.getItem(DISMISS_KEY) === "true") {
      setDismissedPermanent(true);
      return;
    }
    if (mobile) {
      // Don't auto-show the tooltip on small viewports; the FAB alone is enough.
      return;
    }

    const showTimer = window.setTimeout(() => setNudgeVisible(true), INITIAL_DELAY_MS);
    return () => window.clearTimeout(showTimer);
  }, []);

  // Auto-hide after AUTO_HIDE_MS once visible, and hide on first scroll.
  useEffect(() => {
    if (!nudgeVisible) return;
    hideTimerRef.current = window.setTimeout(() => setNudgeVisible(false), AUTO_HIDE_MS);
    const onScroll = () => setNudgeVisible(false);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [nudgeVisible]);

  // Hide the entire FAB when the footer is in view.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      (entries) => setHiddenByFooter(entries.some(e => e.isIntersecting)),
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const dismissPermanently = () => {
    setNudgeVisible(false);
    setDismissedPermanent(true);
    try { localStorage.setItem(DISMISS_KEY, "true"); } catch {}
  };

  if (hiddenByFooter) return null;

  return (
    <>
      {nudgeVisible && !dismissedPermanent && !isMobile && (
        <div style={{ position: "fixed", bottom: "96px", right: "24px", zIndex: 40, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", maxWidth: "260px", fontSize: "13px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
          <span>Just want to chat? Message us on WhatsApp.</span>
          <button aria-label="Dismiss" onClick={dismissPermanently} style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-dim)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}
      <a
        href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        onClick={onWhatsAppClick}
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 40, width: "56px", height: "56px", background: "var(--whatsapp)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(37,211,102,0.4)", transition: "transform 200ms" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A0A0A"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  );
}
