import Image from "next/image";
import Link from "next/link";
import { SEGMENT_PACKS } from "@/lib/segment-packs";

// v31: the pack section on each /business/[slug] page.
//
// The site claimed industry packs and showed none. Every item here is a
// build that exists in this repo, with the interface capture the industry
// page itself renders, so the claim and the evidence are the same file.

export default function SegmentPack({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const items = SEGMENT_PACKS[slug];
  if (!items || items.length === 0) return null;

  return (
    <section style={{ paddingBottom: "var(--section-py)" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <p
          className="mono"
          style={{
            fontSize: "12px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: "0 0 20px",
          }}
        >
          The pack
        </p>
        <h2
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 20px",
          }}
        >
          What we have already built for {name.toLowerCase()}.
        </h2>
        <p
          style={{
            margin: "0 0 clamp(32px,4vw,48px)",
            fontSize: "17px",
            lineHeight: 1.65,
            color: "var(--fg-muted)",
            maxWidth: "68ch",
            textWrap: "pretty",
          }}
        >
          Systems from previous work that shape to your business fast. Every
          one is customised; none starts from a blank page.
        </p>

        <div className="segpack-grid">
          {items.map((item) => (
            <Link key={`${item.name}-${item.shot}`} href={item.href} className="segpack-item">
              <span className="segpack-shot">
                <Image
                  src={item.shot}
                  alt={item.alt}
                  width={1440}
                  height={900}
                  sizes="(max-width: 767px) 100vw, 420px"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </span>
              <span className="segpack-name">{item.name}</span>
              <span className="segpack-line">{item.line}</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .segpack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: 24px;
        }
        .segpack-item {
          display: block;
          color: inherit;
          text-decoration: none;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--bg-card, #161616);
          transition: border-color 200ms var(--ease-out);
        }
        .segpack-item:hover { border-color: var(--accent); }
        .segpack-shot {
          display: block;
          border-bottom: 1px solid var(--border);
          background: var(--bg-elev);
        }
        .segpack-name {
          display: block;
          padding: 16px 18px 6px;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.3;
        }
        .segpack-line {
          display: block;
          padding: 0 18px 18px;
          font-size: 15px;
          line-height: 1.55;
          color: var(--fg-muted);
          text-wrap: pretty;
        }
      `}</style>
    </section>
  );
}
