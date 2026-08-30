"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { trackPageView } from "@/lib/meta-events";

// Fires Meta PageView for every page view, initial load included.
//
// v25.5: this now owns the initial PageView too. The base Pixel snippet
// used to fire it with no event_id and no CAPI mirror, which meant the
// single most valuable hit, the ad-click landing view, had no server-side
// counterpart to recover when the browser signal is degraded. The old
// comment here claimed that hit "already deduplicates server-side via
// event_id"; it did not, because nothing server-side was ever sent for it.
//
// The guard is keyed on the resolved path rather than a first-run flag.
// A first-run flag inverts under React strict mode in development (run one
// consumes the flag and returns, run two fires), which produced a phantom
// duplicate. Keying on the path is idempotent: a repeat of the same path
// never refires, a real navigation always does.

function Tracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const lastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const key = `${pathname}?${search.toString()}`;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;
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
