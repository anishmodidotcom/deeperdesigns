"use client";

import { useEffect } from "react";
import { trackForPageView, trackForScrolled75 } from "@/lib/meta-events";
import { rememberIndustry } from "@/lib/attribution";

type Props = { slug: string };

// v25.5: ForScrolled75 is meant to mean "read most of the page". It used to
// fire from the mount-time check on any page short enough that 75% was
// already on screen, with no scrolling and no time spent, which inflated
// the engaged-reader signal. It now requires either real scroll distance or
// genuine dwell time before it counts.
const MIN_SCROLL_PX = 600;
const MIN_DWELL_MS = 8000;

// Mounted once per live /for/[slug] page. Fires ForPageView on mount and a
// one-shot ForScrolled75 when the visitor has actually engaged with 75% of
// the page.
export default function ForAnalytics({ slug }: Props) {
  useEffect(() => {
    trackForPageView(slug);
    // v25.5: remember the industry for this tab so a lead that reaches the
    // form without ?from (via the nav, for example) is still attributed.
    rememberIndustry(slug);
  }, [slug]);

  useEffect(() => {
    let fired = false;
    let ticking = false;
    const startedAt = Date.now();

    const check = () => {
      ticking = false;
      if (fired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= 0) return;
      if (scrolled / total < 0.75) return;
      // Depth alone is not engagement on a short page: require that the
      // visitor either scrolled a real distance or stayed a real while.
      const engaged =
        window.scrollY >= MIN_SCROLL_PX ||
        Date.now() - startedAt >= MIN_DWELL_MS;
      if (!engaged) return;
      fired = true;
      trackForScrolled75(slug);
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Re-check once the dwell threshold passes, for a short page the
    // visitor stayed on without scrolling.
    const dwellTimer = window.setTimeout(check, MIN_DWELL_MS + 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(dwellTimer);
    };
  }, [slug]);

  return null;
}
