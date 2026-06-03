"use client";

import { useEffect } from "react";
import {
  trackViewContent,
  trackShowcaseScrolled75,
} from "@/lib/meta-events";

type Props = {
  slug: string;
  name: string;
  industry: string;
};

// Mounted once per showcase page. Fires ViewContent on mount and a
// one-shot ShowcaseScrolled75 when the user has scrolled past 75% of
// the document height. Tracking the scroll event ONCE per page-view
// (state in a useRef) avoids the dozens of duplicates a naive scroll
// handler would produce.

export default function ShowcaseAnalytics({ slug, name, industry }: Props) {
  useEffect(() => {
    trackViewContent(name, "showcase", [slug]);
  }, [slug, name]);

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
        trackShowcaseScrolled75(slug, industry);
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Also check on mount in case the page is short and 75% is already
    // visible without any scrolling.
    check();

    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, industry]);

  return null;
}
