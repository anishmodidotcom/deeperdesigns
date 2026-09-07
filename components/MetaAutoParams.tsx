"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// v30.2: fbevents' automatic parameter collection, scoped to the routes
// that sell something.
//
// The base stub turns autoConfig off immediately after init, so no event
// anywhere can carry ap[contents] or ap[currency] before this runs. Here
// it is turned back on for the Preflight routes and off again on the way
// out, so a client-side navigation from Preflight to any other page does
// not leave it on.
//
// Preflight's own priced events, InitiateCheckout and Purchase, fire on
// user interaction long after hydration, so they are never in a race with
// this effect.

const PRICED_PREFIXES = ["/preflight"];

export default function MetaAutoParams() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixelId || typeof window === "undefined" || !window.fbq) return;
    const priced = PRICED_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
    try {
      window.fbq("set", "autoConfig", priced, pixelId);
    } catch {
      // Never block a page on analytics configuration.
    }
  }, [pathname]);

  return null;
}
