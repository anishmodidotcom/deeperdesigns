"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { trackPageView } from "@/lib/meta-events";

// Fires Meta PageView on every client-side route change.
//
// The base Pixel code in MetaPixel.tsx fires one PageView on initial
// load. After hydration, Next's App Router does soft navigations that
// never re-execute the base script — so we manually mirror those.
//
// We skip the initial mount to avoid a duplicate of the base-code
// PageView (which already deduplicates server-side via event_id, but
// avoiding a no-op round-trip is cheaper).

function Tracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    trackPageView();
  }, [pathname, search]);

  return null;
}

export default function MetaPageViewOnRouteChange() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
