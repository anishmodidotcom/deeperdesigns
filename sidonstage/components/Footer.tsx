import { LINKS } from "@/lib/links";

export default function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--navy-line)] bg-[color:var(--stage-black)] py-12">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10 grid md:grid-cols-3 gap-8 items-center">
        <div>
          <div className="font-display tracking-[0.32em] text-[14px] text-white">SID ON STAGE</div>
          <p className="mt-2 text-[14px] text-[color:var(--mist)]">The Voice of Your Event.</p>
        </div>
        <nav aria-label="Social" className="flex md:justify-center items-center gap-4">
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[14px] text-[color:var(--mist)] hover:text-white"
          >
            WhatsApp
          </a>
          <span aria-hidden className="text-[color:var(--mist-dim)]">.</span>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[14px] text-[color:var(--mist)] hover:text-white"
          >
            Instagram
          </a>
          <span aria-hidden className="text-[color:var(--mist-dim)]">.</span>
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[14px] text-[color:var(--mist)] hover:text-white"
          >
            YouTube
          </a>
        </nav>
        <p className="md:text-right text-[12px] text-[color:var(--mist-dim)]">
          Siddhant Pamnani. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
