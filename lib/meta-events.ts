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
  | "CGEDemoRequest";

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
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event_name, event_id, user_data, custom_data }),
      keepalive: true,
    });
  } catch {
    // Network-level failure — silently drop, don't block UX.
  }
}

function fireBrowser(
  event_name: EventName,
  event_id: string,
  custom_data: CustomData,
): void {
  if (typeof window === "undefined" || !window.fbq) return;
  try {
    window.fbq("track", event_name, custom_data, { eventID: event_id });
  } catch {
    // fbq missing or throwing — silently drop.
  }
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

export function trackLead(source_page: string): void {
  trackEvent("Lead", { source_page });
}

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
