import RevealOnScroll from "./RevealOnScroll";

const BASE = "/sidonstage";

export default function About({ portrait }: { portrait: string | null }) {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36"
      style={{ background: "var(--navy-deep)" }}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10 grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <RevealOnScroll>
            <p className="font-kicker text-[12px] uppercase text-[color:var(--azure-bright)] mb-5">
              About Siddhant
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <h2 className="font-heading text-[40px] md:text-[56px] leading-[1.05] text-white">
              He owns the room the moment he picks up the mic.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="mt-8 text-[20px] md:text-[22px] leading-[1.45] text-white max-w-[640px]">
              Siddhant Pamnani is a dynamic emcee known for his ability to command the stage with
              confidence, clarity, and charisma.
            </p>
          </RevealOnScroll>

          <RevealOnScroll selector="p" stagger={0.12} delay={0.1}>
            <div className="mt-8 space-y-5 max-w-[640px] text-[17px] leading-[1.6] text-[color:var(--mist)]">
              <p>He lives for live performance, bringing energy, dynamism, and charisma to every occasion.</p>
              <p>
                Siddhant has interviewed leaders, sportspersons, and celebrities, honing his skill at
                connecting with every kind of personality.
              </p>
              <p>
                His dedication and expertise make him the perfect host to elevate your event into
                something people remember.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div className="relative mx-auto w-full max-w-[420px] aspect-[3/4] rounded-[28px] overflow-hidden azure-ring">
            {portrait ? (
              <img
                src={`${BASE}${portrait}`}
                alt="Portrait of Siddhant Pamnani"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                aria-hidden
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${BASE}/assets/atmos/spotlight-cone.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, transparent 50%, rgba(5,8,16,0.7) 100%)",
              }}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
