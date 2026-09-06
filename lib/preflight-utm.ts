// UTM capture for the Preflight funnel (v29).
//
// Read on page load, kept in session storage so an anchor scroll or a
// back-and-forward does not lose them, and appended to the order note as
// a single bracketed suffix. No new sheet column: the spec fixes the
// schema, so the attribution rides inside the note value.

const KEY = "dd-preflight-utm";

export type Utm = {
  source: string;
  medium: string;
  campaign: string;
};

const EMPTY: Utm = { source: "", medium: "", campaign: "" };

function sanitize(value: string | null): string {
  if (!value) return "";
  // Keep it to something safe to embed in a note and readable in a sheet.
  return value.trim().slice(0, 64).replace(/[\r\n\]]/g, "");
}

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const next: Utm = {
      source: sanitize(params.get("utm_source")),
      medium: sanitize(params.get("utm_medium")),
      campaign: sanitize(params.get("utm_campaign")),
    };
    if (!next.source && !next.medium && !next.campaign) return;
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Session storage blocked. Attribution is a nice-to-have.
  }
}

export function readUtm(): Utm {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Utm>;
    return {
      source: typeof parsed.source === "string" ? parsed.source : "",
      medium: typeof parsed.medium === "string" ? parsed.medium : "",
      campaign: typeof parsed.campaign === "string" ? parsed.campaign : "",
    };
  } catch {
    return EMPTY;
  }
}

// "[utm: source/medium/campaign]", appended to whatever the buyer typed.
// Absent parts render as "-" so the shape is stable and greppable.
export function utmSuffix(utm: Utm = readUtm()): string {
  if (!utm.source && !utm.medium && !utm.campaign) return "";
  const part = (v: string) => v || "-";
  return `[utm: ${part(utm.source)}/${part(utm.medium)}/${part(utm.campaign)}]`;
}

export function withUtm(note: string, max: number): string {
  const suffix = utmSuffix();
  if (!suffix) return note.slice(0, max);
  const joined = note ? `${note} ${suffix}` : suffix;
  if (joined.length <= max) return joined;
  // The attribution is what must survive a long note, not the tail of the
  // note, so the note is trimmed to make room.
  const room = max - suffix.length - 1;
  return room > 0 ? `${note.slice(0, room)} ${suffix}` : suffix.slice(0, max);
}
