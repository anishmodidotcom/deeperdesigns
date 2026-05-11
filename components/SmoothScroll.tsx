"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: React.ReactNode;
};

// Bridge component: lives inside <ReactLenis root> so useLenis() can read
// the context. Re-renders when the lenis instance becomes available,
// which is the only reliable way to attach the gsap ticker + ScrollTrigger
// integration. A useRef-based approach on the parent never re-runs because
// useImperativeHandle mutations do not trigger parent re-renders.
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

export default function SmoothScroll({ children }: Props) {
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
      {children}
    </ReactLenis>
  );
}
