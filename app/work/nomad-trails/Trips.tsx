"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

type Trip = {
  num: string;
  name: string;
  region: string;
  days: string;
  altitude: string;
  difficulty: string;
  image: string;
  alt: string;
};

const TRIPS: Trip[] = [
  {
    num: "01",
    name: "Markha Valley",
    region: "Ladakh · India",
    days: "08 days",
    altitude: "Max 5,200m",
    difficulty: "Moderate",
    image: "/images/nomad-trails/valley-wide.webp",
    alt: "A wide green valley in Ladakh with a winding river and stone houses",
  },
  {
    num: "02",
    name: "Goecha La",
    region: "Sikkim · India",
    days: "10 days",
    altitude: "Max 4,940m",
    difficulty: "Hard",
    image: "/images/nomad-trails/prayer-flags.webp",
    alt: "Buddhist prayer flags strung between two stones on a high mountain pass",
  },
  {
    num: "03",
    name: "Stok Kangri Base",
    region: "Ladakh · India",
    days: "12 days",
    altitude: "Max 5,800m",
    difficulty: "Hard",
    image: "/images/nomad-trails/summit-view.webp",
    alt: "A glaciated summit ridge at sunrise, golden light on snow",
  },
];

export default function Trips() {
  return (
    <section
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 72,
          }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: SOFT }}
              style={{
                fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent-deep)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              SECTION 03 · THE TRIPS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: SOFT }}
              style={{
                fontFamily:
                  "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "var(--page-text)",
                margin: 0,
              }}
            >
              Three trips.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--page-accent-deep)",
                }}
              >
                On the calendar.
              </em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: SOFT }}
            style={{
              fontFamily:
                "var(--font-body-clean), 'Inter', system-ui, sans-serif",
              fontSize: 16,
              color: "var(--page-text-2)",
              maxWidth: 360,
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            We do three trips a year. Spring shoulder, late summer,
            autumn. Quiet seasons. You will not be sharing the pass.
          </motion.p>
        </div>

        <div className="nt-trips-grid">
          {TRIPS.map((trip, i) => (
            <motion.article
              key={trip.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.9,
                delay: (i % 3) * 0.1,
                ease: SOFT,
              }}
              data-cursor="view"
              style={{ cursor: "pointer" }}
              whileHover={{ y: -8 }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  borderRadius: 4,
                  marginBottom: 24,
                }}
              >
                <Image
                  src={trip.image}
                  alt={trip.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    paddingInline: 10,
                    paddingBlock: 6,
                    background: "rgba(250,248,244,0.94)",
                    fontFamily:
                      "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--page-text)",
                  }}
                >
                  {trip.num} · {trip.difficulty}
                </div>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--page-text-3)",
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                {trip.region}
              </p>
              <h3
                style={{
                  fontFamily:
                    "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
                  fontWeight: 500,
                  fontSize: 32,
                  letterSpacing: "-0.02em",
                  color: "var(--page-text)",
                  margin: 0,
                  marginBottom: 16,
                }}
              >
                {trip.name}
              </h3>
              <dl
                style={{
                  display: "flex",
                  gap: 24,
                  margin: 0,
                  fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--page-text-2)",
                }}
              >
                <div>
                  <dt style={{ color: "var(--page-text-3)", marginBottom: 4 }}>
                    Length
                  </dt>
                  <dd style={{ margin: 0, fontWeight: 500 }}>{trip.days}</dd>
                </div>
                <div>
                  <dt style={{ color: "var(--page-text-3)", marginBottom: 4 }}>
                    Top
                  </dt>
                  <dd style={{ margin: 0, fontWeight: 500 }}>
                    {trip.altitude}
                  </dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .nt-trips-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 700px) {
          .nt-trips-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        @media (min-width: 1024px) {
          .nt-trips-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
}
