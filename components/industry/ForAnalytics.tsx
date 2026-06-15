"use client";

import { useEffect } from "react";
import { trackForPageView, trackForScrolled75 } from "@/lib/meta-events";

type Props = { slug: string };

// Mounted once per live /for/[slug] page. Fires ForPageView on mount and a
// one-shot ForScrolled75 when the visitor passes 75% of the document height.
// Mirrors ShowcaseAnalytics exactly (fire-once ref guard, rAF-throttled
// scroll, mount check for short pages).
export default function ForAnalytics({ slug }: Props) {
  useEffect(() => {
    trackForPageView(slug);
  }, [slug]);

  useEffect(() => {
    let fired = false;
    let ticking = false;

    const check = () => {
      ticking = false;
      if (fired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= 0) return;
      if (scrolled / total >= 0.75) {
        fired = true;
        trackForScrolled75(slug);
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    check();

    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
