"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const AMBIENT = [
  { src: "/images/bharat-steel/dashboard-bg-steel.webp", x: "5%", y: "12%", w: 280, r: -3 },
  { src: "/images/hivedesk/dashboard-bg-texture.webp", x: "70%", y: "8%", w: 320, r: 2 },
  { src: "/images/autobazaar/listing-mockup.webp", x: "8%", y: "65%", w: 300, r: 4 },
  { src: "/images/smilefirst/dashboard-bg-clinic.webp", x: "72%", y: "62%", w: 280, r: -2 },
  { src: "/images/karan-legal/paper-stack.webp", x: "42%", y: "82%", w: 240, r: 3 },
  { src: "/images/brightpath/dashboard-bg-edu.webp", x: "46%", y: "4%", w: 260, r: -4 },
];

export default function HomeHero() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      if (!layerRef.current) return;
      layerRef.current.style.transform = `translateY(${window.scrollY * -0.12}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "80px" }}>
      <div ref={layerRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {AMBIENT.map((img, i) => (
          <div key={i} style={{ position: "absolute", left: img.x, top: img.y, width: img.w, opacity: 0.12, transform: `rotate(${img.r}deg)`, borderRadius: "12px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
            <Image src={img.src} alt="" width={img.w} height={Math.round(img.w * 0.62)} style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        ))}
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <p className="eyebrow" style={{ marginBottom: "32px" }}>DEEPER DESIGNS</p>
        <h1 style={{ fontSize: "var(--fs-display)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "32px", maxWidth: "1100px", marginInline: "auto" }}>
          Custom tools for Indian businesses.
        </h1>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "var(--fg-muted)", maxWidth: "640px", marginInline: "auto", marginBottom: "48px" }}>
          Custom digital tools and operational systems for ambitious Indian businesses. Built faster than traditional software. Designed to fit.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business." className="btn-whatsapp">Start a conversation</a>
          <a href="/start-your-study" className="btn-outline">Let&apos;s explore possibilities</a>
        </div>
      </div>
    </section>
  );
}
