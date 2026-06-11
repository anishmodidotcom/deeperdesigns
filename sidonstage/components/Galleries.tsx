import GalleryRail from "./GalleryRail";
import RevealOnScroll from "./RevealOnScroll";
import { listGallery } from "@/lib/galleryFiles";

function alts(prefix: string, n: number): string[] {
  return Array.from({ length: n }, (_, i) => `${prefix}, frame ${i + 1}`);
}

export default function Galleries() {
  const corporate = listGallery("corporate");
  const team = listGallery("teambuilding");
  const sports = listGallery("sports");
  return (
    <section
      id="work"
      className="relative py-28 md:py-36"
      style={{ background: "var(--stage-black)" }}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <RevealOnScroll>
          <p className="font-kicker text-[12px] uppercase text-[color:var(--azure-bright)] mb-5">
            Selected Work
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <h2 className="font-heading text-[40px] md:text-[56px] leading-[1.05] text-white max-w-[820px] mb-14">
            On every kind of stage.
          </h2>
        </RevealOnScroll>

        <GalleryRail
          kicker="Corporate Presenter"
          files={corporate}
          alts={alts("Siddhant Pamnani on a corporate stage", corporate.length)}
        />
        <GalleryRail
          kicker="Team Building Facilitator"
          files={team}
          alts={alts("Siddhant facilitating a team building session", team.length)}
        />
        <GalleryRail
          kicker="Sports Presenter"
          files={sports}
          alts={alts("Siddhant presenting at a sports event", sports.length)}
        />
      </div>
    </section>
  );
}
