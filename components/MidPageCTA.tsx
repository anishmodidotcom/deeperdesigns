import Link from "next/link";

// v28 Part 8: one quiet mid-page line for pages longer than about two
// screens, so someone who is convinced halfway down does not have to scroll
// to the bottom to act.
//
// v28.1: the line is overridable. All 30 category pages closed on the same
// sentence, which showed the template when you read a few in a row; they
// now pass a prompt matched to their group. Everywhere else keeps the
// neutral default.
const DEFAULT_NOTE = "Not sure if this is your problem? Talk to us.";

export default function MidPageCTA({ note }: { note?: string }) {
  return (
    <div
      className="container"
      style={{ maxWidth: "880px", paddingBottom: "var(--section-py)" }}
    >
      <p style={{ fontSize: "17px", lineHeight: 1.6, margin: 0 }}>
        <Link href="/start-your-study" style={{ color: "var(--accent)" }}>
          {note ?? DEFAULT_NOTE}
        </Link>
      </p>
    </div>
  );
}
