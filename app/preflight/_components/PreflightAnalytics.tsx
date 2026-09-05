"use client";

import { useEffect, useRef } from "react";
import { captureUtm } from "@/lib/preflight-utm";
import { trackPreflightView } from "@/lib/meta-events";

// Fires PreflightView once per mount and stashes any UTM parameters for
// the order note. Renders nothing.
export default function PreflightAnalytics() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    captureUtm();
    try {
      trackPreflightView();
    } catch {
      // Analytics never blocks the page.
    }
  }, []);
  return null;
}
