import Marquee from "react-fast-marquee";
import RevealOnScroll from "./RevealOnScroll";
import { listLogos, logoNameFor } from "@/lib/galleryFiles";

const BASE = "/sidonstage";

export default function TrustedBy() {
  const logos = listLogos();
  const half = Math.ceil(logos.length / 2);
  const rowA = logos.slice(0, half);
  const rowB = logos.slice(half);
  const empty = logos.length === 0;

  return (
    <section
      className="relative py-24 md:py-32"
      style={{ background: "var(--navy-deep)" }}
      aria-label="Trusted by top brands"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <RevealOnScroll>
          <p className="font-kicker text-[12px] uppercase text-[color:var(--azure-bright)] mb-4 text-center">
            Trusted by Top Brands
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <h2 className="font-heading text-[28px] md:text-[36px] text-white text-center max-w-[680px] mx-auto leading-[1.15] mb-12">
            The companies, summits, and award shows that hand him the mic.
          </h2>
        </RevealOnScroll>
      </div>

      {empty ? (
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="rounded-[var(--radius-card)] border border-[color:var(--navy-line)] bg-[color:var(--navy)] p-10 text-center">
            <p className="text-[color:var(--mist)]">Logo wall populates once brand assets are extracted from the profile PDF.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <LogoRow files={rowA} direction="left" />
          {rowB.length > 0 && <LogoRow files={rowB} direction="right" />}
        </div>
      )}
    </section>
  );
}

function LogoRow({ files, direction }: { files: string[]; direction: "left" | "right" }) {
  return (
    <Marquee speed={28} gradient gradientColor="#0A1226" gradientWidth={120} direction={direction} pauseOnHover>
      {files.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="mx-4 inline-flex items-center justify-center w-[150px] h-[80px] rounded-2xl bg-[color:var(--navy)] border border-[color:var(--navy-line)] grayscale opacity-55 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          title={logoNameFor(src)}
        >
          <img
            src={`${BASE}${src}`}
            alt={`${logoNameFor(src)} logo`}
            className="max-h-[44px] max-w-[110px] object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </Marquee>
  );
}
