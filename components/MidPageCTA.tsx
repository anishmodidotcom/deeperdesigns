import Link from "next/link";

// v28 Part 8: one quiet mid-page line for pages longer than about two
// screens, so someone who is convinced halfway down does not have to scroll
// to the bottom to act.
export default function MidPageCTA() {
  return (
    <div
      className="container"
      style={{ maxWidth: "880px", paddingBottom: "var(--section-py)" }}
    >
      <p style={{ fontSize: "17px", lineHeight: 1.6, margin: 0 }}>
        <Link href="/start-your-study" style={{ color: "var(--accent)" }}>
          Not sure if this is your problem? Talk to us.
        </Link>
      </p>
    </div>
  );
}
