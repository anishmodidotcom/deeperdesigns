"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const v = max > 0 ? h.scrollTop / max : 0;
      setP(Math.max(0, Math.min(1, v)));
      raf = 0;
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[80] h-[2px] bg-transparent"
    >
      <div
        className="h-full origin-left"
        style={{
          width: `${p * 100}%`,
          background: "linear-gradient(90deg, var(--azure) 0%, var(--azure-bright) 60%, var(--cyan-glow) 100%)",
          boxShadow: "0 0 10px rgba(94,168,255,0.7)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
