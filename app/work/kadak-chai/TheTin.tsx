"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function TheTin() {
  const sectionRef = useRef<HTMLElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<SVGSVGElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      const lid = lidRef.current;
      const inner = innerRef.current;
      const steam = steamRef.current;
      const headline = headlineRef.current;
      if (!lid || !inner || !steam || !headline) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        lid,
        { y: 0, rotate: 0, opacity: 1 },
        { y: "-65%", rotate: 6, opacity: 0.92, ease: "power1.out" },
        0
      )
        .fromTo(
          inner,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, ease: "power1.out" },
          0.1
        )
        .fromTo(
          steam,
          { opacity: 0, y: 60 },
          { opacity: 0.8, y: -40, ease: "power1.out" },
          0.2
        )
        .fromTo(
          headline,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.35
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="the-tin"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--page-bg)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 60%, rgba(201,128,58,0.18) 0%, transparent 60%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: SOFT }}
        style={{
          position: "absolute",
          top: 64,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          color: "var(--page-accent)",
          margin: 0,
          zIndex: 4,
        }}
      >
        SECTION 02 · OPEN THE TIN
      </motion.p>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "min(440px, 75vw)",
            height: "min(560px, 90vh)",
          }}
        >
          <svg
            ref={steamRef}
            aria-hidden
            width="200"
            height="220"
            viewBox="0 0 200 220"
            fill="none"
            style={{
              position: "absolute",
              left: "50%",
              top: -180,
              transform: "translateX(-50%)",
              opacity: 0,
              color: "var(--page-text-2)",
              willChange: "transform, opacity",
              zIndex: 2,
            }}
          >
            <path
              d="M 60 220 C 50 180, 80 150, 70 110 C 60 80, 90 50, 80 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M 100 220 C 90 180, 120 140, 100 100 C 90 70, 120 40, 110 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M 140 220 C 130 180, 160 140, 140 100 C 130 70, 160 40, 150 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
          </svg>

          <div
            ref={innerRef}
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 4,
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            <Image
              src="/images/kadak-chai/tin-open.webp"
              alt="The inside of the tin: loose-leaf chai with whole spices visible"
              fill
              sizes="(min-width: 1024px) 440px, 75vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div
            ref={lidRef}
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 4,
              boxShadow: "0 60px 120px -40px rgba(0,0,0,0.6)",
              willChange: "transform, opacity",
              zIndex: 3,
            }}
          >
            <Image
              src="/images/kadak-chai/hero-tin.webp"
              alt="The Kadak Chai tin, lid sealed"
              fill
              sizes="(min-width: 1024px) 440px, 75vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <h2
        ref={headlineRef}
        style={{
          position: "absolute",
          bottom: 96,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 90vw)",
          textAlign: "center",
          fontFamily:
            "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(28px, 4.5vw, 56px)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: "var(--page-text)",
          margin: 0,
          textTransform: "uppercase",
          opacity: 0,
          zIndex: 4,
          willChange: "transform, opacity",
        }}
      >
        Three generations.
        <br />
        <span style={{ color: "var(--page-accent)" }}>One blend at a time.</span>
      </h2>

      <p
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--page-text-3)",
          margin: 0,
          zIndex: 4,
        }}
      >
        SCROLL · LIFT THE LID
      </p>
    </section>
  );
}
