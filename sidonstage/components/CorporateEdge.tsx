import RevealOnScroll from "./RevealOnScroll";

const CARDS = [
  {
    icon: <IconLaunch />,
    label: "Brand and Product Launches",
    line: "Set the energy for the moment a brand goes live.",
  },
  {
    icon: <IconPodium />,
    label: "Leadership Summits and Conferences",
    line: "Keep large rooms sharp, on time, and engaged.",
  },
  {
    icon: <IconStar />,
    label: "Gala Nights, R&R and Award Shows",
    line: "Carry the glamour and the pace of a big night.",
  },
  {
    icon: <IconPlay />,
    label: "Sports and Live Commentary",
    line: "Real time energy that rides the action.",
  },
  {
    icon: <IconWave />,
    label: "High Voltage Audience Connect",
    line: "Reads the room and lifts it, every single time.",
  },
];

export default function CorporateEdge() {
  return (
    <section
      id="edge"
      className="relative py-28 md:py-36"
      style={{ background: "var(--navy-deep)" }}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <RevealOnScroll>
          <p className="font-kicker text-[12px] uppercase text-[color:var(--azure-bright)] mb-5">
            The Corporate Edge
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <h2 className="font-heading text-[40px] md:text-[56px] leading-[1.05] text-white max-w-[820px]">
            Built for rooms where the stakes are high.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="mt-6 max-w-[760px] text-[17px] leading-[1.6] text-[color:var(--mist)]">
            What sets Siddhant apart is his ability to transform corporate events into engaging
            experiences. From leadership summits to large scale conferences, he brings a structured,
            polished, and impactful hosting style that aligns with the tone of corporate audiences.
          </p>
        </RevealOnScroll>

        <RevealOnScroll selector="[data-card]" stagger={0.1}>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CARDS.map((c) => (
              <div
                key={c.label}
                data-card
                className="group rounded-[var(--radius-card)] bg-[color:var(--navy)] border border-[color:var(--navy-line)] p-7 transition-all duration-300 hover:border-[color:var(--azure-bright)] hover:shadow-card-lift hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-full bg-[color:var(--stage-black)] border border-[color:var(--navy-line)] flex items-center justify-center text-[color:var(--azure-bright)] group-hover:border-[color:var(--azure-bright)] transition-colors">
                  {c.icon}
                </div>
                <div className="mt-5 font-heading text-[20px] text-white leading-tight">
                  {c.label}
                </div>
                <p className="mt-2 text-[15px] text-[color:var(--mist)] leading-[1.5]">{c.line}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function IconLaunch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19c1-4 4-7 8-8l6-6-1 6-6 6c-1 4-4 7-8 8l1-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 10l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconPodium() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="13" width="6" height="8" stroke="currentColor" strokeWidth="1.6" />
      <rect x="9" y="9" width="6" height="12" stroke="currentColor" strokeWidth="1.6" />
      <rect x="15" y="15" width="6" height="6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.5l-5.5 2.8 1.1-6.3L3 9.6l6.3-.9L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8l6 4-6 4z" fill="currentColor" />
    </svg>
  );
}
function IconWave() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
