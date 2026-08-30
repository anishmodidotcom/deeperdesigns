"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// v25.5: the smooth-scroll runtime, split out so gsap, ScrollTrigger and
// lenis load as their own lazy chunk instead of sitting in the shared
// bundle that every one of the 94 routes downloads. Together they were
// about 58 kB gzip on pages like /privacy that animate nothing.
//
// This no longer wraps the page. ReactLenis in `root` mode drives
// document scrolling regardless of where it sits in the tree, and nothing
// in the app consumes the Lenis context (useLenis is used only by the
// bridge below), so wrapping bought nothing and forced the whole subtree
// to wait on this component.

function LenisGsapBridge() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tickerCb);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [lenis, pathname]);

  return null;
}

export default function SmoothScrollRoot() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        smoothWheel: !reducedMotion,
        lerp: reducedMotion ? 1 : 0.1,
        duration: reducedMotion ? 0 : 1.2,
      }}
    >
      <LenisGsapBridge />
    </ReactLenis>
  );
}
