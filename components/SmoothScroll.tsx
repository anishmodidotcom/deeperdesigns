"use client";

import dynamic from "next/dynamic";

// v25.5: loads the smooth-scroll runtime (lenis + gsap + ScrollTrigger)
// after hydration, as its own chunk, instead of shipping it in the shared
// bundle for all 94 routes. ssr:false because it renders nothing into the
// document: it only attaches scroll behaviour, so there is no markup to
// server render and no layout shift when it arrives.
//
// next/dynamic with ssr:false cannot be called from a Server Component,
// which is why this thin client wrapper exists between the root layout and
// the runtime.
const SmoothScrollRoot = dynamic(() => import("./SmoothScrollRoot"), {
  ssr: false,
});

export default function SmoothScroll() {
  return <SmoothScrollRoot />;
}
