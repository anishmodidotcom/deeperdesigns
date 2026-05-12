"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

// A loose, dimmed collage of screenshots pulled from the showcase
// gallery. Sits behind the hero at low opacity, parallax-shifted on
// scroll. Six tiles fixed to viewport corners, never blocking content.

const TILES: { src: string; alt: string; top: string; left?: string; right?: string; rotate: number; w: number }[] = [
  { src: "/images/bharat-steel/dashboard-bg-steel.webp", alt: "", top: "8%", left: "4%", rotate: -3, w: 240 },
  { src: "/images/hivedesk/dashboard-bg-texture.webp", alt: "", top: "16%", right: "3%", rotate: 4, w: 260 },
  { src: "/images/autobazaar/listing-mockup.webp", alt: "", top: "62%", left: "4%", rotate: 2, w: 220 },
  { src: "/images/smilefirst/dashboard-bg-clinic.webp", alt: "", top: "50%", right: "5%", rotate: -2, w: 220 },
  { src: "/images/karan-legal/paper-stack.webp", alt: "", top: "33%", left: "28%", rotate: -1, w: 180 },
  { src: "/images/brightpath/dashboard-bg-edu.webp", alt: "", top: "70%", right: "30%", rotate: 3, w: 200 },
];

export default function AmbientCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      className="dd-ambient-canvas"
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: reduced ? undefined : yA,
          opacity: reduced ? 0.18 : opacity,
        }}
      >
        {TILES.slice(0, 3).map((t, i) => (
          <Tile key={i} {...t} delay={i * 0.2} />
        ))}
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: reduced ? undefined : yB,
          opacity: reduced ? 0.18 : opacity,
        }}
      >
        {TILES.slice(3).map((t, i) => (
          <Tile key={i + 3} {...t} delay={0.4 + i * 0.2} />
        ))}
      </motion.div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(8,9,10,0.4) 55%, rgba(8,9,10,0.95) 95%)",
        }}
      />
    </div>
  );
}

function Tile({
  src,
  alt,
  top,
  left,
  right,
  rotate,
  w,
  delay,
}: {
  src: string;
  alt: string;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  w: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.22 }}
      transition={{ duration: 2.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        top,
        left,
        right,
        width: w,
        height: w * 0.65,
        transform: `rotate(${rotate}deg)`,
        borderRadius: 8,
        overflow: "hidden",
        filter: "blur(0.5px) saturate(0.85)",
        boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6)",
        display: "none",
      }}
      className="dd-ambient-tile"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${w}px`}
        style={{ objectFit: "cover" }}
      />
      <style jsx>{`
        @media (min-width: 1024px) {
          :global(.dd-ambient-tile) {
            display: block !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
