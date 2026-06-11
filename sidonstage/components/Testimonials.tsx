"use client";

import { useEffect, useRef } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { useReducedMotion } from "@/lib/useReducedMotion";

type T = { quote: string; name: string; role?: string; emphasis?: boolean };

const TESTIMONIALS: T[] = [
  {
    quote:
      "His presence brings clarity, warmth, and effortless flow to the event, making even the most important conversations feel engaging and memorable.",
    name: "Boman Irani",
    emphasis: true,
  },
  {
    quote:
      "Siddhant brought such effortless charm and poise to the P&G anemia awareness event. A thoroughly polished host who makes every conversation feel impactful and memorable.",
    name: "Karishma Kapoor",
    emphasis: true,
  },
  {
    quote:
      "Strong presence with the ability to keep the audience engaged while maintaining professionalism throughout.",
    name: "Amit Jain",
    role: "Head HR, Encora",
  },
  {
    quote:
      "Siddhant knows how to own the room, hold attention, and move the event forward with sharp presence and natural authority.",
    name: "Manish Fadnavis",
    role: "Rocket Software, Bangalore",
  },
  {
    quote:
      "Bahut zabardast paaji. Very energetic, will definitely call you for future events.",
    name: "Mitu Singh",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    let raf = 0;
    let nx = 0,
      ny = 0;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      nx = e.clientX - r.left;
      ny = e.clientY - r.top;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          glow.style.transform = `translate3d(${nx - 380}px, ${ny - 380}px, 0)`;
          raf = 0;
        });
      }
    };
    const onEnter = () => (glow.style.opacity = "0.45");
    const onLeave = () => (glow.style.opacity = "0");
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative isolate py-28 md:py-36 overflow-hidden"
      style={{ background: "var(--stage-black)" }}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-[760px] h-[760px] rounded-full opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(94,168,255,0.22) 0%, rgba(43,130,246,0.12) 30%, rgba(43,130,246,0) 65%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1240px] px-6 lg:px-10">
        <RevealOnScroll>
          <p className="font-kicker text-[12px] uppercase text-[color:var(--azure-bright)] mb-5">
            What They Say
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <h2 className="font-heading text-[40px] md:text-[56px] leading-[1.05] text-white max-w-[820px] mb-14">
            Trusted by the people who run the room.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll selector="[data-card]" stagger={0.1}>
          <div className="grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <article
                key={t.name}
                data-card
                className={`rounded-[var(--radius-card)] border border-[color:var(--navy-line)] bg-[color:var(--navy)] p-7 md:p-9 transition-all duration-300 hover:border-[color:var(--azure-bright)] hover:shadow-card-lift hover:-translate-y-1 ${
                  t.emphasis && i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <Quote />
                <blockquote
                  className={`mt-5 text-white leading-[1.5] ${
                    t.emphasis ? "text-[20px] md:text-[24px]" : "text-[17px] md:text-[18px]"
                  }`}
                >
                  {t.quote}
                </blockquote>
                <footer className="mt-6 flex items-center gap-3">
                  <span
                    className={`font-medium text-white ${
                      t.emphasis ? "text-[18px]" : "text-[16px]"
                    }`}
                  >
                    {t.name}
                  </span>
                  {t.role && (
                    <>
                      <span
                        aria-hidden
                        className="inline-block w-[1px] h-4 bg-[color:var(--navy-line)]"
                      />
                      <span className="text-[14px] text-[color:var(--mist-dim)]">{t.role}</span>
                    </>
                  )}
                </footer>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17q-2 0-2-2v-2q0-3 1-5t4-3l1 2q-2 1-3 2t-1 3h1q1 0 1 1v2q0 2-2 2zm9 0q-2 0-2-2v-2q0-3 1-5t4-3l1 2q-2 1-3 2t-1 3h1q1 0 1 1v2q0 2-2 2z"
        fill="currentColor"
        className="text-[color:var(--azure-bright)]"
        style={{ color: "var(--azure-bright)" }}
      />
    </svg>
  );
}
