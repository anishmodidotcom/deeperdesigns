"use client";

import { useEffect, useRef, useState } from "react";

// v30.2: a reveal that cannot leave content invisible.
//
// The homepage product cards used motion's whileInView. Cards four and
// five stayed at opacity 0 after a programmatic scroll, an anchor jump or
// a back navigation: the observer callback that would have revealed them
// had already been spent, or never ran, and nothing else would ever set
// their opacity.
//
// Three rules here, in order of how much they are trusted:
//   1. Anything already intersecting on the first observer callback is
//      revealed immediately, with no transition, so a load that lands
//      mid-page paints visible content rather than animating it in.
//   2. Anything that scrolls into view afterwards animates in once.
//   3. Whatever has happened, everything is revealed two seconds after
//      mount. An observer that never fires costs a missed animation, not
//      a blank section.

const FALLBACK_MS = 2000;

export default function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  // Revealed without animating: already on screen when the page painted.
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const el = ref.current;
    let first = true;

    const timer = window.setTimeout(() => setShown(true), FALLBACK_MS);

    if (!el || typeof IntersectionObserver === "undefined") {
      // No element or no observer: reveal now rather than wait out the
      // fallback with the content hidden.
      setInstant(true);
      setShown(true);
      return () => window.clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            first = false;
            continue;
          }
          if (first) setInstant(true);
          setShown(true);
          io.disconnect();
        }
        first = false;
      },
      { threshold: 0.15 },
    );
    io.observe(el);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: instant
          ? "none"
          : `opacity 550ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 550ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
