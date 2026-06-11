import RevealOnScroll from "./RevealOnScroll";

const SERVICES = [
  "Brand and Product Launches",
  "Gala Nights and R&R",
  "ATL and BTL",
  "Family Days",
  "Annual Conferences",
  "Sports Commentary",
  "Office Engagement",
  "Interviews and Podcasts",
  "Live Show Host",
  "Product Presentations and Recordings",
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-28 md:py-36"
      style={{ background: "var(--navy-deep)" }}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <RevealOnScroll>
          <p className="font-kicker text-[12px] uppercase text-[color:var(--azure-bright)] mb-5">
            Let&apos;s Work Together
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <h2 className="font-heading text-[40px] md:text-[56px] leading-[1.05] text-white max-w-[820px] mb-12">
            One host. Every kind of stage.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll selector="[data-pill]" stagger={0.05}>
          <div className="flex flex-wrap gap-3">
            {SERVICES.map((s) => (
              <span
                key={s}
                data-pill
                className="inline-flex px-5 py-3 rounded-[var(--radius-pill)] bg-[color:var(--navy)] border border-[color:var(--navy-line)] text-white text-[14px] md:text-[15px] transition-all duration-300 hover:border-[color:var(--azure-bright)] hover:text-[color:var(--azure-bright)] hover:shadow-azure-glow"
              >
                {s}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
