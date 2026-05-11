"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

type Cake = {
  num: string;
  name: string;
  flavour: string;
  note: string;
  price: string;
  image: string;
  alt: string;
};

const CAKES: Cake[] = [
  {
    num: "01",
    name: "Pistachio Rose",
    flavour: "Pistachio sponge · rosewater cream",
    note: "The bestseller. Soft pink, garnished with edible rose petals.",
    price: "AED 320",
    image: "/images/sugar-lane/hero-cake.webp",
    alt: "A pistachio rose cake with soft pink frosting and rose petal garnish",
  },
  {
    num: "02",
    name: "Karak Caramel",
    flavour: "Chai sponge · salted caramel buttercream",
    note: "Inspired by Abu Dhabi&rsquo;s sweet-spiced cutting chai.",
    price: "AED 280",
    image: "/images/sugar-lane/cake-slice.webp",
    alt: "A slice of karak caramel cake on a small plate, ready to eat",
  },
  {
    num: "03",
    name: "Lemon Saffron",
    flavour: "Lemon zest sponge · saffron cream",
    note: "Made on Fridays only. Limited to four orders per week.",
    price: "AED 340",
    image: "/images/sugar-lane/piping-detail.webp",
    alt: "Detailed piping on a yellow lemon-saffron cake",
  },
  {
    num: "04",
    name: "Wedding Tier",
    flavour: "Three tiers · custom flavours",
    note: "Booked four weeks ahead. Includes a tasting at Farah&rsquo;s kitchen.",
    price: "From AED 1,200",
    image: "/images/sugar-lane/wedding-cake.webp",
    alt: "A three-tiered white wedding cake with delicate piping and fresh flowers",
  },
];

export default function Menu() {
  return (
    <section
      id="the-menu"
      style={{
        paddingBlock: 144,
        background: "var(--page-bg)",
        position: "relative",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1320, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          SECTION 03 · THE MENU
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SOFT }}
          style={{
            margin: 0,
            marginBottom: 72,
            fontFamily: "var(--font-body), 'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            maxWidth: 920,
          }}
        >
          Four signatures.{" "}
          <span
            style={{
              fontFamily:
                "var(--font-display-script), 'Yellowtail', cursive",
              fontWeight: 400,
              fontSize: "1.1em",
              color: "var(--page-accent)",
            }}
          >
            Made fresh every week.
          </span>
        </motion.h2>

        <div className="sl-menu-grid">
          {CAKES.map((cake, i) => (
            <motion.article
              key={cake.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: (i % 2) * 0.1,
                ease: SOFT,
              }}
              data-cursor="view"
              style={{
                background: "var(--page-surface-1)",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
              }}
              whileHover={{ y: -8 }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "5 / 4",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={cake.image}
                  alt={cake.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    paddingInline: 12,
                    paddingBlock: 6,
                    background: "rgba(255,248,242,0.95)",
                    borderRadius: 9999,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--page-accent-deep)",
                    fontWeight: 600,
                  }}
                >
                  {cake.num}
                </div>
              </div>

              <div
                style={{
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily:
                        "var(--font-display-script), 'Yellowtail', cursive",
                      fontWeight: 400,
                      fontSize: 40,
                      color: "var(--page-text)",
                      lineHeight: 1.05,
                    }}
                  >
                    {cake.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--page-accent)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cake.price}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--page-accent-deep)",
                  }}
                >
                  {cake.flavour}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "var(--page-text-2)",
                    lineHeight: 1.6,
                  }}
                >
                  {cake.note}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sl-menu-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .sl-menu-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
