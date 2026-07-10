// Meta Pixel + CAPI event helpers.
//
// Every event fires twice (deduplicated on Meta's side by event_id):
//   - Browser: window.fbq('track', name, props, { eventID })
//   - Server:  POST /api/meta-capi with the same event_id, hashed
//              user_data, and custom_data.
//
// trackEvent() is the kernel. Typed wrappers below are the public API.
// Failures are swallowed — analytics must never block the UI.

type EventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "Contact"
  | "InitiateCheckout"
  | "ShowcaseScrolled75"
  | "LiveProductCTAClick"
  | "WhatsAppOpenedFromShowcase"
  | "CGEDemoRequest"
  // v19.7: /for/[slug] industry-page custom events. All custom (not in
  // STANDARD_EVENTS), so they route through fbq('trackCustom', ...).
  | "ForPageView"
  | "ForScrolled75"
  | "ForBuildCTAClick"
  | "ForLeadCTAClick"
  // v21: fired once when the lead form's first screen submits successfully
  // (confirmation code sent). The funnel step between click and Lead.
  | "LeadFormStart";

// Meta's standard event allowlist. Anything not in here is a custom
// event and must be sent via fbq('trackCustom', ...) instead of
// fbq('track', ...). Using 'track' on a custom name silently drops the
// browser beacon while server-side CAPI still fires — that's exactly
// what production saw for ShowcaseScrolled75, LiveProductCTAClick,
// WhatsAppOpenedFromShowcase, and CGEDemoRequest.
const STANDARD_EVENTS = new Set<EventName>([
  "PageView",
  "ViewContent",
  "Lead",
  "Contact",
  "InitiateCheckout",
]);

type UserData = {
  em?: string;
  ph?: string;
  external_id?: string;
};

type CustomData = Record<string, string | number | boolean | string[]>;

declare global {
  interface Window {
    fbq?: (
      action: "init" | "track" | "trackCustom",
      name: string,
      props?: CustomData,
      options?: { eventID?: string },
    ) => void;
  }
}

function uuidv4(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const DEBUG = process.env.NEXT_PUBLIC_META_PIXEL_DEBUG === "true";

function log(name: EventName, event_id: string, custom_data: CustomData) {
  if (!DEBUG) return;
  // Intentionally console.log; this is a build-time flag.
  // eslint-disable-next-line no-console
  console.log("[meta-pixel]", name, event_id, custom_data);
}

async function fireServer(
  event_name: EventName,
  event_id: string,
  user_data: UserData,
  custom_data: CustomData,
): Promise<void> {
  const body = JSON.stringify({
    event_name,
    event_id,
    user_data,
    custom_data,
  });
  // Use sendBeacon when available so the request survives same-tab
  // unloads (e.g. an internal Link nav after a Lead click). Fall back
  // to fetch+keepalive on browsers without sendBeacon or when the
  // beacon API rejects the payload.
  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    try {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/meta-capi", blob);
      if (ok) return;
    } catch {
      // fall through to fetch fallback
    }
  }
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Network-level failure, silently drop.
  }
}

// v17.2 used a per-call setTimeout retry loop with a 1 s cap. On slow
// ad-click profiles the MetaPixel afterInteractive script lands later
// than that, the retry expires, and the event is dropped. v17.3 swaps
// to a shared queue + single poller with no per-call expiry:
//   - Every browser call lands in a pending queue when fbq is missing.
//   - One module-scoped poller wakes every 100 ms checking for fbq.
//   - When fbq lands, the poller drains the entire queue, then stops.
//   - If fbq never lands (CSP block, ad-blocker), the queue sits
//     until page unload and gets garbage-collected. No leak.
// Standard vs custom routing stays: STANDARD_EVENTS gates 'track' vs
// 'trackCustom'.

type PendingEvent = {
  event_name: EventName;
  event_id: string;
  custom_data: CustomData;
};

const browserQueue: PendingEvent[] = [];
let pollerHandle: number | null = null;

function callFbq(ev: PendingEvent): void {
  if (typeof window === "undefined" || !window.fbq) return;
  const action: "track" | "trackCustom" = STANDARD_EVENTS.has(ev.event_name)
    ? "track"
    : "trackCustom";
  try {
    window.fbq(action, ev.event_name, ev.custom_data, { eventID: ev.event_id });
  } catch {
    // fbq throwing — silently drop, never block UX.
  }
}

function drainIfReady(): void {
  if (typeof window === "undefined" || !window.fbq) return;
  while (browserQueue.length > 0) {
    const ev = browserQueue.shift();
    if (ev) callFbq(ev);
  }
  if (pollerHandle !== null) {
    window.clearInterval(pollerHandle);
    pollerHandle = null;
  }
}

function ensurePoller(): void {
  if (typeof window === "undefined") return;
  if (pollerHandle !== null) return;
  pollerHandle = window.setInterval(drainIfReady, 100);
}

function fireBrowser(
  event_name: EventName,
  event_id: string,
  custom_data: CustomData,
): void {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    callFbq({ event_name, event_id, custom_data });
    return;
  }
  browserQueue.push({ event_name, event_id, custom_data });
  ensurePoller();
}

export function trackEvent(
  event_name: EventName,
  custom_data: CustomData = {},
  user_data: UserData = {},
): void {
  const event_id = uuidv4();
  log(event_name, event_id, custom_data);
  fireBrowser(event_name, event_id, custom_data);
  // Fire-and-forget the server mirror.
  void fireServer(event_name, event_id, user_data, custom_data);
}

// ---------- typed event wrappers ----------

export function trackPageView(): void {
  // Browser PageView also fires once via fbq base code, but we mirror
  // server-side here so iOS 14+ users with degraded browser signal are
  // matched. Browser dedup happens via event_id.
  trackEvent("PageView", { path: typeof window !== "undefined" ? window.location.pathname : "" });
}

export function trackViewContent(
  content_name: string,
  content_category: string,
  content_ids: string[],
): void {
  trackEvent("ViewContent", {
    content_name,
    content_category,
    content_ids,
    content_type: "product_group",
  });
}

// v21: the standard Lead event fires in exactly ONE place, the lead form's
// confirmed completion (see trackFormLead below). The old trackLead(source)
// click wrapper was removed: it fired Lead on every WhatsApp open and nav
// CTA click, producing phantom leads Meta optimised toward. Intent clicks
// are tracked by the custom events (ForLeadCTAClick, LeadFormStart, etc).

export function trackContact(source_page: string): void {
  trackEvent("Contact", { source_page });
}

export function trackInitiateCheckout(
  tier_name: string,
  tier_price_band: string,
): void {
  trackEvent("InitiateCheckout", {
    content_name: tier_name,
    content_category: "services_tier",
    value_band: tier_price_band,
  });
}

export function trackShowcaseScrolled75(
  showcase_slug: string,
  showcase_industry: string,
): void {
  trackEvent("ShowcaseScrolled75", { showcase_slug, showcase_industry });
}

export function trackLiveProductCTAClick(
  product: "maplelens" | "deeper-content",
): void {
  trackEvent("LiveProductCTAClick", { product });
}

export function trackWhatsAppOpenedFromShowcase(
  showcase_slug: string,
  showcase_industry: string,
): void {
  trackEvent("WhatsAppOpenedFromShowcase", { showcase_slug, showcase_industry });
}

// TODO(cge): fire once cge.deeperdesigns.in/request-access form exists.
export function trackCGEDemoRequest(): void {
  trackEvent("CGEDemoRequest", {});
}

// ---------- v19.7: /for/[slug] industry-page events ----------
// All custom events; `industry` is the slug so Meta audiences segment by
// vertical without URL parsing.

export function trackForPageView(industry: string): void {
  trackEvent("ForPageView", { industry });
}

export function trackForScrolled75(industry: string): void {
  trackEvent("ForScrolled75", { industry });
}

export function trackForBuildCTAClick(industry: string, build: string): void {
  trackEvent("ForBuildCTAClick", { industry, build });
}

export function trackForLeadCTAClick(
  industry: string,
  cta: "book" | "whatsapp",
): void {
  trackEvent("ForLeadCTAClick", { industry, cta });
}

// v21: fired once when the lead form's first screen submits successfully
// (the confirmation code was sent). Funnel step between the CTA click and
// the confirmed Lead; never fires Lead itself.
export function trackLeadFormStart(industry: string): void {
  trackEvent("LeadFormStart", { industry });
}

// v21: the ONLY Lead call site. Fires on confirmed completion of the lead
// form (code verified, completion email sent), attributed to the
// originating industry page (via ?from) when present, and EMQ-enriched
// with the verified email/phone.
export function trackFormLead(args: {
  industry: string;
  email?: string;
  phone?: string;
}): void {
  trackEvent(
    "Lead",
    { source_page: "/start-your-study", industry: args.industry },
    { em: args.email, ph: args.phone },
  );
}
