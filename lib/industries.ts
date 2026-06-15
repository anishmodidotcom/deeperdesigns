// Single source of truth for the /for/[slug] industry pages.
// These are ad-destination pages: someone clicks an industry-specific ad
// and lands on a page that shows that industry its current day vs its day
// with our systems, with real working build demos.
//
// Mirrors the lib/showcases.ts pattern: one typed array, helper functions,
// per-page accent declared on the object and wired through the existing
// --page-accent CSS variable mechanism on the route root.

export type DayItem = {
  label: string; // short mono label, e.g. "THE RETURN"
  title: string;
  body: string;
  stat: string; // mono stat line
};

export type IndustryBuild = {
  index: string; // "01", "02" ... shown as a mono kicker number
  kicker: string; // e.g. "BEHAVIOUR RECOVERY ENGINE"
  headline: string; // may contain a {serif} span marker
  body: string;
  bullets: string[]; // 4 each, <b> markers allowed
  demo: string; // legacy key, kept for any future CSS-widget fallback
  // v19.1: real builds shown as screenshots inside a device frame.
  // v19.2: "video" added for the player frame (Real Estate Property Film).
  frame?: "browser" | "phone" | "video";
  shot?: string; // screenshot path under /public
  shotW?: number;
  shotH?: number;
  demoUrl?: string; // shown in the BrowserFrame URL bar
  // v19.2: VideoFrame fields. A poster always renders; a video src, when
  // present, plays muted-loop in view (reduced-motion shows the poster).
  poster?: string;
  video?: string;
  videoAspect?: "16:9" | "9:16";
  videoDuration?: string; // small label, e.g. "0:08"
  // v19.6: optional raw "before" still shown beside the video result, turning
  // a video build into a before/after (mirrors the Studio/Listing builds).
  before?: string;
};

export type Persona = {
  quote: string;
  persona: string; // e.g. "Founder, skincare label"
  tag: string; // the build that answers it
};

export type StatPanel = {
  label: string;
  target: number; // counts up, reduced-motion shows final
  caption: string;
  rows: { k: string; v: string }[];
};

export type Industry = {
  slug: string; // url: /for/{slug}
  name: string; // "D2C Brands"
  live: boolean; // true = fully built, false = scaffold only
  accent: string; // hex, per-vertical accent (never teal-family)
  accentSoft: string; // hex, lighter tint for text-on-dark
  money: string; // hex used for currency / positive figures

  heroEyebrow: string; // e.g. "FOR D2C BRANDS"
  heroEyebrowNote: string; // secondary line, e.g. "One of 13 industries we build for"
  heroHeadline: string; // contains {serif} marker
  heroSub: string;

  meta: { title: string; description: string };

  // ----- Full-page fields (present when live === true) -----
  statPanel?: StatPanel | null;

  nowHeadline?: string; // current-day section heading, {serif} marker allowed
  nowIntro?: string;
  nowItems?: DayItem[]; // 4

  aiHeadline?: string;
  aiIntro?: string;
  aiItems?: DayItem[]; // 4

  builds?: IndustryBuild[]; // 4-5

  payback?: {
    intro: string;
    before: { k: string; v: string }[];
    beforeTotal: { k: string; v: string };
    after: { k: string; v: string }[];
    afterTotal: { k: string; v: string };
    note: string;
  };

  voices?: {
    before: { quote: string; who: string };
    after: { quote: string; who: string };
  };

  // v19.1: a wall of representative voices, each a different persona with
  // a different problem.
  personasHeadline?: string;
  personasIntro?: string;
  personas?: Persona[];

  cta?: {
    headline: string;
    body: string;
    pillsIntro?: string;
    chips: string[];
  };

  // One Anish margin note and one editorial pull quote, so these pages
  // carry the same human-edit layer as the rest of the site.
  anishNote?: string;
  pullQuote?: { quote: string; attribution: string };
};

export const INDUSTRIES: Industry[] = [
  // =====================================================================
  // 01 · D2C BRANDS · fully built
  // =====================================================================
  {
    slug: "d2c-brands",
    name: "D2C Brands",
    live: true,
    accent: "#FF5C38",
    accentSoft: "#FF8266",
    money: "#F5B544",

    heroEyebrow: "FOR D2C BRANDS",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "Your ads work. Your margin {serif}doesn't.{/serif}",
    heroSub:
      "The leak isn't your ad spend. It's everything after the click. Returns you eat, carts that die, spend you can't trace. We build the system that closes the gap between a click and a kept rupee.",

    meta: {
      title: "For D2C Brands · Deeper Designs",
      description:
        "Your ads work, your margin doesn't. We build the system that fixes returns, dead carts, and untraceable spend for Indian D2C brands.",
    },

    statPanel: {
      label:
        "WHAT AN AVERAGE MID-SIZE D2C BRAND LOSES AFTER THE CLICK, EVERY MONTH",
      target: 550000,
      caption:
        "Returns, dead carts, and spend you can't trace. Money that already cleared your ad account.",
      rows: [
        { k: "COD returns shipped back to you", v: "10 to 15% of revenue" },
        { k: "Carts abandoned at checkout", v: "around 7 in 10" },
        { k: "Repeat buyers you never won back", v: "most of them" },
      ],
    },

    nowHeadline: "You're not losing money on the ad. {serif}You're losing it after.{/serif}",
    nowIntro:
      "Every founder has the dashboard that says the campaign worked. Few have the one that says where the money went next. Here is the day as you actually live it.",
    nowItems: [
      {
        label: "THE RETURN",
        title: "It costs you twice",
        body: "A COD order ships. The customer changes their mind at the door. You pay the courier both ways and the product comes back creased. Nobody checked the order was real.",
        stat: "₹180 to 350 lost per returned COD order",
      },
      {
        label: "THE DEAD CART",
        title: "It died quietly",
        body: "Someone added three items, reached checkout, and left. No follow-up went out. By evening they have forgotten your brand exists, and you will pay an ad to reach them again.",
        stat: "around 70% of carts abandoned",
      },
      {
        label: "THE BLIND SPEND",
        title: "You can't trace it",
        body: "Meta reports one number. Shopify another. Your accountant a third. You scale on ROAS and still can't say what a sale truly costs after returns and shipping.",
        stat: "real CM2 unknown on most orders",
      },
      {
        label: "THE LOST REGULAR",
        title: "You bought them once",
        body: "A happy customer ordered in March. No reason to return was ever sent. So you go back to Meta and pay full price to acquire someone you already had.",
        stat: "re-buying customers you already own",
      },
    ],

    aiHeadline: "Same day. Same orders. {serif}Nothing falls through.{/serif}",
    aiIntro:
      "Not another tool to log into. One connected system that watches the parts you can't, and acts before the money leaves.",
    aiItems: [
      {
        label: "CONFIRMED FIRST",
        title: "Every COD order checked",
        body: "The moment a COD order lands, an agent reaches the buyer on WhatsApp to confirm. Fakes and second thoughts get caught before the courier moves.",
        stat: "RTO cut, not absorbed",
      },
      {
        label: "BROUGHT BACK",
        title: "Dead carts revived",
        body: "The visitor who left at checkout gets a message showing the exact items they looked at, with a reason to finish. Automatically, within the hour.",
        stat: "12 to 18% of lost carts recoverable",
      },
      {
        label: "ONE HONEST NUMBER",
        title: "Real margin per order",
        body: "Spend, shipping, returns and fees folded into a true contribution margin, by product and by pincode. You scale what actually pays.",
        stat: "CM1 and CM2 on every order",
      },
      {
        label: "THEY RETURN",
        title: "Repeat without re-buying",
        body: "Past buyers get the right nudge at the right time, tied to what they bought. Repeat revenue you don't pay Meta for.",
        stat: "win-back running on its own",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "BEHAVIOUR RECOVERY ENGINE",
        demo: "BehaviourRecoveryDemo",
        frame: "phone",
        shot: "/builds/d2c/behaviour-recovery.png",
        shotW: 390,
        shotH: 844,
        headline:
          "It watches what each visitor looked at. {serif}Then it brings them back.{/serif}",
        body: "Most recovery messages say you left something behind. Yours shows them exactly what, the product they hovered on, with the photo, ready to buy in one tap.",
        bullets: [
          "Tracks <b>what each visitor browsed</b>, added, and abandoned, live",
          "Sends a <b>personalised WhatsApp</b> with the actual items they viewed",
          "Times the nudge to <b>intent</b>, not a generic 24-hour blast",
          "Hands a hot cart to a <b>human only when it is worth it</b>",
        ],
      },
      {
        index: "02",
        kicker: "PROFIT COMMAND",
        demo: "ProfitCommandDemo",
        frame: "browser",
        shot: "/builds/d2c/profit-command.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.aarka.in/profit",
        headline:
          "The one screen that tells you {serif}the truth about each order.{/serif}",
        body: "Not ROAS. Real contribution margin after returns, shipping and fees, broken down by product and by the pincodes quietly eating your profit.",
        bullets: [
          "<b>CM1 and CM2</b> on every order, live",
          "<b>RTO by pincode</b>, so you flag or pre-pay the worst zones",
          "Channel truth across <b>Meta, Shopify and marketplaces</b> in one view",
          "An alert when a <b>winning product turns unprofitable</b>",
        ],
      },
      {
        index: "03",
        kicker: "COD CONFIRM AGENT",
        demo: "CODConfirmDemo",
        frame: "browser",
        shot: "/builds/d2c/cod-confirm.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.aarka.in/orders/confirm",
        headline: "Catch the fake order {serif}before the courier moves.{/serif}",
        body: "The cheapest way to cut returns is to never ship the bad ones. An agent confirms every COD order in seconds, on the channel your buyer already lives on.",
        bullets: [
          "Auto-confirms <b>every COD order</b> on WhatsApp or a quick call",
          "Flags <b>address gaps and repeat-RTO numbers</b> automatically",
          "Offers a <b>prepaid nudge</b> with a small incentive to switch",
          "Only the <b>confirmed orders</b> reach your packing table",
        ],
      },
      {
        index: "04",
        kicker: "STUDIO ENGINE",
        demo: "StudioEngineDemo",
        frame: "browser",
        shot: "/builds/d2c/studio-engine.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.aarka.in/studio",
        headline: "Stop paying for shoots. {serif}Generate them.{/serif}",
        body: "A phone photo of the product on your packing table becomes a studio shot, a lifestyle scene, an on-model image. The whole catalogue, in an afternoon, in your brand's look.",
        bullets: [
          "Raw product photo into <b>studio, lifestyle and on-model</b> shots",
          "Consistent <b>brand look</b> across the full catalogue",
          "Feeds straight into <b>ads, listings and the recovery messages</b>",
          "A new drop shot and live the <b>same day</b>, not next month",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative figures for a brand doing roughly ₹20L a month. We size the build to your real numbers in the first call.",
      before: [
        { k: "RTO on COD orders", v: "₹1,60,000" },
        { k: "Abandoned carts, no follow-up", v: "₹2,40,000" },
        { k: "Re-acquiring past buyers via ads", v: "₹90,000" },
        { k: "Shoot and creative production", v: "₹60,000" },
      ],
      beforeTotal: { k: "Walking out the door", v: "₹5,50,000" },
      after: [
        { k: "RTO cut by confirmation", v: "₹95,000" },
        { k: "Carts recovered, around 15%", v: "₹1,55,000" },
        { k: "Repeat revenue, not re-bought", v: "₹70,000" },
        { k: "Shoot cost removed", v: "₹55,000" },
      ],
      afterTotal: { k: "Back in your pocket", v: "₹3,75,000" },
      note: "Ranges drawn from common Indian D2C benchmarks, not a single client. Your real figures decide the build.",
    },

    personasHeadline: "Different brands. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every D2C founder we meet is bleeding somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote:
          "Half my COD orders in tier-2 come back. I had started treating it as the cost of doing business.",
        persona: "Founder, home and kitchen brand",
        tag: "COD Confirm",
      },
      {
        quote:
          "People fill the cart and vanish. I never had a way to bring them back that did not feel like spam.",
        persona: "Founder, skincare label",
        tag: "Behaviour Recovery",
      },
      {
        quote:
          "Every channel told me a different number. I genuinely did not know which products made money.",
        persona: "Founder, apparel brand",
        tag: "Profit Command",
      },
      {
        quote: "I was paying Meta to win back customers who already loved us.",
        persona: "Founder, supplements brand",
        tag: "Win-Back Flows",
      },
      {
        quote:
          "Every new drop meant a shoot, a stylist, a week gone. Small brand, big bill.",
        persona: "Founder, fashion label",
        tag: "Studio Engine",
      },
      {
        quote:
          "My team spent the whole day answering where is my order on WhatsApp.",
        persona: "Founder, accessories brand",
        tag: "Order-Status Assistant",
      },
    ],

    cta: {
      headline:
        "Not sure where your money leaks? {serif}That is what the call is for.{/serif}",
      body: "Thirty minutes, no deck. Show us how your brand actually runs and we will tell you which of these fits, or whether something else does. You do not have to know what you need. That is our job.",
      pillsIntro:
        "A few of the things we have built for D2C brands. Pick what fits, or let us point you.",
      chips: [
        "Behaviour Recovery",
        "Profit Command",
        "COD Confirm",
        "Studio Engine",
        "Win-Back Flows",
        "WhatsApp Catalog and Checkout",
        "Loyalty and Referrals",
        "Returns Automation",
        "Inventory and Demand Forecast",
        "Marketplace Reconciliation",
        "Reviews and UGC Engine",
        "Order-Status Assistant",
      ],
    },

    anishNote:
      "Every founder I meet knows their ROAS to the decimal. Almost none can tell me their CM2. That gap is the whole business. We build the screen that closes it.",
    pullQuote: {
      quote:
        "The leak was never the ad. It was the ten quiet things that happen after the click, and nobody owned a single one of them.",
      attribution: "DEEPER DESIGNS · FOR D2C",
    },
  },

  // =====================================================================
  // SCAFFOLDS · routes live, hero + switcher, live: false
  // Accents deliberately clear of teal #0F766E and its family.
  // =====================================================================
  // =====================================================================
  // 02 · REAL ESTATE · fully built (v19.2)
  // =====================================================================
  {
    slug: "real-estate",
    name: "Real Estate",
    live: true,
    accent: "#3E7BFA",
    accentSoft: "#7CA4FF",
    money: "#E0B341",

    heroEyebrow: "FOR REAL ESTATE",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "Your listings look like phone photos. {serif}Because they are.{/serif}",
    heroSub:
      "Buyers scroll past amateur listings, and the lead you do get goes cold while you are on another call. We build the system that makes your inventory look like the portals and answers every buyer in sixty seconds.",

    meta: {
      title: "For Real Estate · Deeper Designs",
      description:
        "Your listings look like phone photos, and your leads go cold. We build the system that answers every buyer in sixty seconds and makes your inventory sell.",
    },

    statPanel: {
      label:
        "WHAT A BROKER LOSES TO SLOW FOLLOW-UP AND WEAK LISTINGS, EVERY MONTH",
      target: 2400000,
      caption:
        "Site visits that never got booked, leads that went cold, deals that closed with whoever called back first.",
      rows: [
        { k: "Leads that never got a second call", v: "most of them" },
        { k: "Time to first response, industry average", v: "10 to 15 minutes" },
        { k: "Listings shot on a phone", v: "nearly all of them" },
      ],
    },

    nowHeadline: "You are not short on leads. {serif}You are losing them after.{/serif}",
    nowIntro:
      "Every broker has the WhatsApp full of enquiries. Few have the system that turns them into booked visits. Here is the day as you actually live it.",
    nowItems: [
      {
        label: "THE COLD LEAD",
        title: "It went to whoever called first",
        body: "A buyer enquires on three portals at once. The broker who calls in two minutes wins the visit. You called back after lunch, and they had already seen two flats.",
        stat: "first-response advantage lost in minutes",
      },
      {
        label: "THE AMATEUR LISTING",
        title: "It looks like everyone else's",
        body: "Phone photos, bad light, empty rooms. The buyer cannot picture living there, so they scroll on to the builder who paid for a real shoot.",
        stat: "listings that look unfinished",
      },
      {
        label: "THE NO-SHOW VISIT",
        title: "It fell through quietly",
        body: "A site visit gets fixed over WhatsApp, then forgotten. No reminder, no confirmation. The slot stays empty and the day is wasted.",
        stat: "site visits lost to no follow-up",
      },
      {
        label: "THE PIPELINE IN A DIARY",
        title: "It lives in your head",
        body: "Budgets, preferences, who saw what, all in a notebook and your memory. A hot buyer slips because nobody followed up in time.",
        stat: "pipeline you cannot actually see",
      },
    ],

    aiHeadline: "Same leads. Same inventory. {serif}Nothing goes cold.{/serif}",
    aiIntro:
      "Not another portal login. One system that answers fast, makes the listing sell, and never drops a buyer.",
    aiItems: [
      {
        label: "ANSWERED FIRST",
        title: "Every lead, sixty seconds",
        body: "A voice agent calls each new enquiry back within a minute, qualifies budget, location and timeline, and books the visit while you are with another buyer.",
        stat: "first response, won not lost",
      },
      {
        label: "SHOT LIKE THE PORTALS",
        title: "Phone photo to magazine",
        body: "Raw photos become bright, staged, magazine-grade shots. Empty rooms get furnished virtually in three styles, so buyers see the life, not the emptiness.",
        stat: "inventory that sells the life",
      },
      {
        label: "WALKED THROUGH",
        title: "A film, not a gallery",
        body: "Photos become a cinematic walkthrough for ads and WhatsApp, so a buyer tours the flat before they drive over, and the visits you get are serious.",
        stat: "visits that pre-qualify themselves",
      },
      {
        label: "TRACKED",
        title: "Every buyer, every stage",
        body: "Budget, preference and history in one pipeline, calls summarised automatically, and the next follow-up never missed.",
        stat: "the diary, finally a system",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "INSTANT LEAD RESPONDER",
        demo: "RealEstateLeadDeskDemo",
        frame: "browser",
        shot: "/builds/real-estate/lead-desk.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.anandrealty.in/leads",
        headline: "Every lead called back {serif}before it goes cold.{/serif}",
        body: "A voice agent reaches each new enquiry within a minute, qualifies it, and books the visit. You see one inbox, every portal, every call logged.",
        bullets: [
          "Unified inbox across <b>99acres, MagicBricks, Housing, WhatsApp</b>",
          "A voice agent that <b>qualifies budget, BHK and timeline</b>",
          "Site visit <b>booked and confirmed</b> automatically",
          "The <b>hot leads surfaced</b> to you first",
        ],
      },
      {
        index: "02",
        kicker: "LISTING STUDIO",
        demo: "RealEstateListingStudioDemo",
        frame: "browser",
        shot: "/builds/real-estate/listing-studio.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.anandrealty.in/studio",
        headline: "Make the flat look like {serif}the life someone wants.{/serif}",
        body: "Raw photos become bright, clean and magazine-grade. Empty rooms get furnished virtually in three styles, so buyers picture themselves living there.",
        bullets: [
          "Phone photo to <b>magazine-grade</b> in minutes",
          "Empty rooms <b>virtually staged</b>, modern, classic, warm",
          "<b>Sky-swaps and relighting</b> on exteriors",
          "The whole listing ready <b>the day you get the keys</b>",
        ],
      },
      {
        index: "03",
        kicker: "PROPERTY FILM",
        demo: "RealEstatePropertyFilmDemo",
        frame: "video",
        before: "/builds/real-estate/film-before.webp",
        poster: "/builds/real-estate/film-after.webp",
        video: "/videos/real-estate/property-film.mp4",
        videoAspect: "9:16",
        videoDuration: "0:05",
        headline: "A film of the flat, {serif}before they drive over.{/serif}",
        body: "Stills become a smooth cinematic walkthrough for ads and WhatsApp. Buyers tour the home first, so the site visits you get are serious.",
        bullets: [
          "Stills to a <b>smooth walkthrough reel</b>",
          "Sized for <b>Reels, WhatsApp and portal video</b>",
          "Music and captions <b>on brand</b>",
          "A buyer who has <b>already toured</b> before they arrive",
        ],
      },
      {
        index: "04",
        kicker: "BUYER PIPELINE",
        demo: "RealEstatePipelineDemo",
        frame: "browser",
        shot: "/builds/real-estate/pipeline.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.anandrealty.in/pipeline",
        headline: "Every buyer, every stage, {serif}nothing in a diary.{/serif}",
        body: "Budget, preference and history in one pipeline. Calls get summarised and filed automatically, and the next follow-up never slips.",
        bullets: [
          "One pipeline, <b>every buyer and stage</b>",
          "Calls <b>auto-summarised</b> into the buyer's record",
          "Follow-up reminders that <b>actually fire</b>",
          "<b>Channel-partner and commission</b> tracking",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a broker doing a handful of closings a quarter. In real estate, one extra deal recovered usually covers the build several times over. We size it to your numbers in the first call.",
      before: [
        { k: "Leads lost to slow follow-up", v: "₹2,20,000" },
        { k: "Site visits lost to no-shows", v: "₹1,40,000" },
        { k: "Deals lost to weak listings", v: "₹1,60,000" },
        { k: "Shoot and video production", v: "₹80,000" },
      ],
      beforeTotal: { k: "Walking out the door", v: "₹6,00,000" },
      after: [
        { k: "Leads saved by instant response", v: "₹1,90,000" },
        { k: "Visits kept by reminders", v: "₹1,20,000" },
        { k: "Deals won on stronger listings", v: "₹1,40,000" },
        { k: "Shoot cost removed", v: "₹70,000" },
      ],
      afterTotal: { k: "Back in your pocket", v: "₹5,20,000" },
      note: "Ranges from common brokerage patterns, not a single client. One extra closing usually covers the build several times over.",
    },

    personasHeadline: "Different desks. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every broker and builder is losing it somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote:
          "By the time I call back, they have seen two other flats with someone else.",
        persona: "Independent broker",
        tag: "Instant Lead Responder",
      },
      {
        quote:
          "My listings look like everyone else's, so price is the only thing buyers compare.",
        persona: "Small developer",
        tag: "Listing Studio",
      },
      {
        quote:
          "Half my site visits just do not show up, and I find out only when I am standing there.",
        persona: "Channel partner",
        tag: "Buyer Pipeline",
      },
      {
        quote: "Buyers want to feel the home before they drive an hour to see it.",
        persona: "Luxury apartment agent",
        tag: "Property Film",
      },
      {
        quote:
          "Every buyer detail is in my head. The day I am unwell, the pipeline stops.",
        persona: "Two-person brokerage",
        tag: "Buyer Pipeline",
      },
      {
        quote:
          "My Dubai inventory needs to look world-class, not like a WhatsApp forward.",
        persona: "India and Dubai broker",
        tag: "Listing Studio",
      },
    ],

    cta: {
      headline: "Not sure which fixes your worst week? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your desk actually runs and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for brokers and developers. Pick what fits, or let us point you.",
      chips: [
        "Instant Lead Responder",
        "Listing Studio",
        "Property Film",
        "Buyer Pipeline",
        "Site-Visit Scheduler",
        "Channel-Partner Portal",
        "RERA Document Automation",
        "WhatsApp Buyer Concierge",
        "Inventory Microsite",
        "Resale Valuation",
        "Call Analysis",
        "Booking and Demand Letters",
      ],
    },

    anishNote:
      "This works just as well for Dubai and GCC inventory, where the tickets are bigger and the buyer expects world-class. Same system, multilingual, pointed at a higher-value desk.",
    pullQuote: {
      quote:
        "The deal was never lost on price. It was lost in the ten minutes before you called back, and in a listing that looked like everyone else's.",
      attribution: "DEEPER DESIGNS · FOR REAL ESTATE",
    },
  },
  // =====================================================================
  // 05 · COACHING & EDUCATION · fully built (v19.3)
  // =====================================================================
  {
    slug: "coaching",
    name: "Coaching & Education",
    live: true,
    accent: "#F0A92B",
    accentSoft: "#F7C66B",
    money: "#E0B341",

    heroEyebrow: "FOR COACHING AND EDUCATION",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "200 students you can run from your head. {serif}1,000 you can't.{/serif}",
    heroSub:
      "Admissions chased on paper, fees in a register, attendance two days stale, parents on a hundred WhatsApp threads. That is the ceiling. We build the system that never drops an enquiry, a fee, or a parent.",

    meta: {
      title: "For Coaching and Education · Deeper Designs",
      description:
        "200 students you can run from your head, 1000 you cannot. We build the system that never drops an admission enquiry, a fee, or a parent.",
    },

    statPanel: {
      label:
        "WHAT AN INSTITUTE LOSES TO DROPPED ENQUIRIES AND LATE FEES, EVERY MONTH",
      target: 450000,
      caption:
        "Admission enquiries that never got a second call, fees collected late or not at all, and parents who left because nobody kept them in the loop.",
      rows: [
        { k: "Admission enquiries that go cold", v: "nearly half" },
        { k: "Fees collected late", v: "around 40%" },
        { k: "Attendance and marks tracked on paper", v: "still" },
      ],
    },

    nowHeadline: "Your teaching is not the problem. {serif}The running of it is.{/serif}",
    nowIntro:
      "Past a few hundred students, the registers and WhatsApp groups stop holding. Here is where it cracks.",
    nowItems: [
      {
        label: "THE DROPPED ENQUIRY",
        title: "Nobody called back",
        body: "A parent enquired about the new batch. One counsellor is juggling a hundred such leads on a notebook, and half never get a second call. The seat goes to the institute that followed up.",
        stat: "admissions lost to no follow-up",
      },
      {
        label: "THE LATE FEE",
        title: "Chased one by one",
        body: "Fees come in late, by cash and screenshot, reconciled by hand against an Excel sheet. Reminders go out when someone remembers to send them.",
        stat: "around 40% of fees late",
      },
      {
        label: "THE STALE REGISTER",
        title: "Attendance nobody sees",
        body: "Attendance is marked on paper and entered days later. A parent finds out their child skipped a week only at the test.",
        stat: "attendance two days behind",
      },
      {
        label: "THE PARENT IN THE DARK",
        title: "A hundred WhatsApp threads",
        body: "Marks, schedules, notices, all forwarded one by one. Parents feel out of the loop, and the institute feels small.",
        stat: "communication that does not scale",
      },
    ],

    aiHeadline: "Same batches. Same fees. {serif}Nothing slips.{/serif}",
    aiIntro:
      "Not a generic school ERP. A system shaped to how a coaching institute actually runs.",
    aiItems: [
      {
        label: "EVERY ENQUIRY HELD",
        title: "Admissions that follow up themselves",
        body: "Each enquiry enters a pipeline with automatic WhatsApp follow-up, so no parent is forgotten and every seat gets its fair chase.",
        stat: "no enquiry left cold",
      },
      {
        label: "FEES ON TIME",
        title: "Reminders and UPI, automatic",
        body: "Fee reminders go out on WhatsApp with a UPI link and a GST receipt back instantly. Collection stops depending on memory.",
        stat: "fees collected on time",
      },
      {
        label: "ATTENDANCE LIVE",
        title: "Parents told the same day",
        body: "Attendance marked once syncs instantly, and a parent hears about a missed class the day it happens, not at the test.",
        stat: "attendance, same-day",
      },
      {
        label: "PARENTS IN THE LOOP",
        title: "Marks and notices, automatic",
        body: "Report cards generated, schedules and notices pushed to every parent at once. The institute feels organised, because it is.",
        stat: "communication that scales",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "ADMISSIONS DESK",
        demo: "CoachingAdmissionsDemo",
        frame: "browser",
        shot: "/builds/coaching/admissions.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.pinnacleclasses.in/admissions",
        headline: "Every enquiry chased, {serif}every seat filled.{/serif}",
        body: "Each admission enquiry enters a pipeline with automatic WhatsApp follow-up, so no parent is forgotten and the new batch fills on time.",
        bullets: [
          "One desk for <b>every enquiry, every source</b>",
          "Automatic <b>WhatsApp follow-up</b> sequences",
          "Counsellor notes and <b>next-action</b> on every lead",
          "Batch-wise <b>seats filled, at a glance</b>",
        ],
      },
      {
        index: "02",
        kicker: "FEE ENGINE",
        demo: "CoachingFeesDemo",
        frame: "phone",
        shot: "/builds/coaching/fees.png",
        shotW: 390,
        shotH: 844,
        headline: "Fees on time, {serif}without the chasing.{/serif}",
        body: "Reminders go out on WhatsApp with a UPI link, the receipt comes back instantly. Collection stops depending on who remembers to ask.",
        bullets: [
          "<b>WhatsApp reminders</b> with a UPI pay link",
          "<b>GST receipt</b> back the moment they pay",
          "Instalments and <b>scholarships</b> handled",
          "A clear view of <b>who has paid and who has not</b>",
        ],
      },
      {
        index: "03",
        kicker: "ATTENDANCE AND ALERTS",
        demo: "CoachingAttendanceDemo",
        frame: "browser",
        shot: "/builds/coaching/attendance.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.pinnacleclasses.in/attendance",
        headline: "Marked once, {serif}the parent knows by lunch.{/serif}",
        body: "Attendance synced the moment it is taken, with an instant alert to the parent of any child who did not show. No more test-day surprises.",
        bullets: [
          "Attendance by <b>batch and student</b>",
          "<b>Instant parent alert</b> on an absence",
          "Patterns flagged before they <b>become a problem</b>",
          "Faculty workload, <b>visible</b>",
        ],
      },
      {
        index: "04",
        kicker: "RESULTS AND PARENT HUB",
        demo: "CoachingResultsDemo",
        frame: "browser",
        shot: "/builds/coaching/results.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.pinnacleclasses.in/results",
        headline: "Report cards and notices, {serif}out the door automatically.{/serif}",
        body: "Marks become clean report cards, schedules and notices reach every parent at once. The institute runs like one ten times its size.",
        bullets: [
          "<b>Auto-generated report cards</b> from marks",
          "Schedules and notices <b>to every parent</b>",
          "Test analysis, <b>per student</b>",
          "One hub instead of <b>a hundred threads</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for an institute around 400 students. Better fee collection alone usually covers the build inside a term. We size it to your numbers in the first call.",
      before: [
        { k: "Admission enquiries dropped", v: "₹1,80,000" },
        { k: "Fees collected late or lost", v: "₹1,50,000" },
        { k: "Parents leaving over poor communication", v: "₹80,000" },
        { k: "Admin staff time on manual work", v: "₹40,000" },
      ],
      beforeTotal: { k: "Slipping every month", v: "₹4,50,000" },
      after: [
        { k: "Enquiries followed up, more admissions", v: "₹1,60,000" },
        { k: "Fees collected on time", v: "₹1,40,000" },
        { k: "Parents retained", v: "₹70,000" },
        { k: "Admin time freed", v: "₹35,000" },
      ],
      afterTotal: { k: "Back in the institute", v: "₹4,05,000" },
      note: "Ranges from common coaching-institute patterns, not a single client. Fee-collection gains alone often pay for the build.",
    },

    personasHeadline: "Different institutes. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every coaching business cracks somewhere specific past a few hundred students. Here is where, in their words.",
    personas: [
      {
        quote:
          "My counsellor cannot call back a hundred enquiries a day, so half of them just go.",
        persona: "Competitive-exam coaching",
        tag: "Admissions Desk",
      },
      {
        quote:
          "Forty percent of fees come late, and I am the one chasing them every month.",
        persona: "Tuition centre owner",
        tag: "Fee Engine",
      },
      {
        quote: "Parents find out their child skipped class only when the marks drop.",
        persona: "Science coaching institute",
        tag: "Attendance and Alerts",
      },
      {
        quote: "I forward marks and notices to parents one by one. It eats my evening.",
        persona: "Small academy",
        tag: "Results and Parent Hub",
      },
      {
        quote: "We crossed 600 students and the registers simply stopped holding.",
        persona: "Multi-batch institute",
        tag: "Admissions Desk",
      },
      {
        quote: "Parents judge us as small because our communication looks small.",
        persona: "Neighbourhood coaching class",
        tag: "Results and Parent Hub",
      },
    ],

    cta: {
      headline: "Not sure where your institute leaks? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your institute actually runs and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for institutes. Pick what fits, or let us point you.",
      chips: [
        "Admissions Desk",
        "Fee Engine",
        "Attendance and Alerts",
        "Results and Parent Hub",
        "Demo-Class Booking",
        "Doubt-Solving Assistant",
        "Batch and Timetable Planner",
        "Faculty Dashboard",
        "Enquiry Microsite",
        "Test and Analysis",
        "Alumni and Referrals",
        "WhatsApp Parent Broadcast",
      ],
    },

    anishNote:
      "Every institute owner I meet is a brilliant teacher buried under admin. The ceiling was never the teaching. It was the chasing of fees and follow-ups that no human can do at a thousand students.",
    pullQuote: {
      quote:
        "The institute that wins the admission is rarely the best teacher. It is the one that called the parent back first, and kept calling.",
      attribution: "DEEPER DESIGNS · FOR COACHING",
    },
  },
  // =====================================================================
  // 06 · CLINICS & DIAGNOSTICS · fully built (v19.3)
  // money is a mint/spring green (#5BC8A0), deliberately clear of teal.
  // =====================================================================
  {
    slug: "clinics",
    name: "Clinics & Diagnostics",
    live: true,
    accent: "#5B8DEF",
    accentSoft: "#93B5F6",
    money: "#5BC8A0",

    heroEyebrow: "FOR CLINICS AND DIAGNOSTICS",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "Every missed call {serif}booked somewhere else.{/serif}",
    heroSub:
      "The front desk cannot answer every call, no-shows leave slots empty, and the patients you treated once never come back. We build the system that answers around the clock, fills the calendar, and brings patients back.",

    meta: {
      title: "For Clinics and Diagnostics · Deeper Designs",
      description:
        "Every missed call gets booked somewhere else. We build the system that answers around the clock, fills the calendar, and brings patients back.",
    },

    statPanel: {
      label:
        "WHAT A CLINIC LOSES TO MISSED CALLS, NO-SHOWS AND PATIENTS WHO NEVER RETURN",
      target: 350000,
      caption:
        "Calls the front desk could not pick up, appointments that went empty, and patients who were never reminded to come back.",
      rows: [
        { k: "Callers who hang up on voicemail", v: "around 80%" },
        { k: "Appointment slots lost to no-shows", v: "more than you think" },
        { k: "Patients never recalled for a follow-up", v: "most" },
      ],
    },

    nowHeadline: "The medicine is sound. {serif}The front desk is drowning.{/serif}",
    nowIntro:
      "A clinic lives and dies by the front desk, and the front desk cannot be everywhere. Here is what slips.",
    nowItems: [
      {
        label: "THE MISSED CALL",
        title: "It rang while you were with a patient",
        body: "The desk is busy, the call goes unanswered, and the caller does not leave a voicemail. They simply book at the clinic that picked up.",
        stat: "most missed callers do not call back",
      },
      {
        label: "THE NO-SHOW",
        title: "An empty slot, found too late",
        body: "An appointment is booked and forgotten. No reminder went out, the patient did not come, and the slot that could have been filled sits empty.",
        stat: "slots lost to no-shows",
      },
      {
        label: "THE LOST PATIENT",
        title: "Treated once, never recalled",
        body: "A patient came in, got better, and was never reminded about the follow-up or the next check. They drift to whoever messages them first.",
        stat: "no recall, no return",
      },
      {
        label: "THE PAPER REGISTER",
        title: "The day lives in a diary",
        body: "Appointments, payments and reports in a register. The doctor cannot see the day at a glance, and reports get chased on the phone.",
        stat: "the clinic you cannot see",
      },
    ],

    aiHeadline: "Same clinic. Same hours. {serif}Nothing missed.{/serif}",
    aiIntro:
      "Not a heavy hospital system. A light layer that answers, reminds, and recalls on its own.",
    aiItems: [
      {
        label: "ALWAYS ANSWERED",
        title: "A voice that picks up, day or night",
        body: "A voice agent answers every call in Hindi, English or your local language, books the appointment, and confirms it on WhatsApp. No call lost to a busy desk.",
        stat: "every call answered",
      },
      {
        label: "NO-SHOWS DOWN",
        title: "Reminded, confirmed, refilled",
        body: "Automatic reminders confirm each appointment, and a cancelled slot gets offered to the next patient before it goes empty.",
        stat: "the calendar, kept full",
      },
      {
        label: "PATIENTS RECALLED",
        title: "Brought back at the right time",
        body: "Follow-ups and check-ups are recalled automatically, so the patient you treated once comes back instead of drifting away.",
        stat: "patients who return",
      },
      {
        label: "THE DAY AT A GLANCE",
        title: "Appointments, reports, revenue",
        body: "One screen for the day, with lab reports delivered to patients automatically. The diary becomes a system.",
        stat: "the clinic, finally visible",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "VOICE RECEPTIONIST",
        demo: "ClinicsVoiceReceptionistDemo",
        frame: "phone",
        shot: "/builds/clinics/voice-receptionist.png",
        shotW: 390,
        shotH: 844,
        headline: "A receptionist that never misses a call, {serif}day or night.{/serif}",
        body: "A voice agent answers every call in your patient's language, books the appointment, and confirms it on WhatsApp. The busy desk stops costing you patients.",
        bullets: [
          "Answers <b>24/7 in Hindi, English, regional</b>",
          "Books and <b>confirms on WhatsApp</b>",
          "Handles <b>reschedules and common questions</b>",
          "Every missed call, <b>turned into a booking</b>",
        ],
      },
      {
        index: "02",
        kicker: "SMART CALENDAR",
        demo: "ClinicsCalendarDemo",
        frame: "browser",
        shot: "/builds/clinics/calendar.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.sukoonclinic.in/calendar",
        headline: "A calendar that fills itself {serif}and stays full.{/serif}",
        body: "Reminders confirm every appointment, and a cancellation gets offered to the next patient before the slot goes empty. No-shows stop hurting.",
        bullets: [
          "<b>Reminders and confirmations</b>, automatic",
          "Cancelled slots <b>refilled from the waitlist</b>",
          "Doctor-wise <b>day and week view</b>",
          "No-show patterns <b>flagged</b>",
        ],
      },
      {
        index: "03",
        kicker: "RECALL ENGINE",
        demo: "ClinicsRecallDemo",
        frame: "browser",
        shot: "/builds/clinics/recall.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.sukoonclinic.in/recall",
        headline: "The patient you treated once, {serif}back at the right time.{/serif}",
        body: "Follow-ups, check-ups and renewals are recalled automatically on WhatsApp, so patients return instead of drifting to whoever messages them first.",
        bullets: [
          "Automatic <b>follow-up and check-up recalls</b>",
          "Personalised to the <b>treatment and timeline</b>",
          "Reactivation of <b>lapsed patients</b>",
          "Recall performance, <b>measured</b>",
        ],
      },
      {
        index: "04",
        kicker: "CLINIC DASHBOARD",
        demo: "ClinicsDashboardDemo",
        frame: "browser",
        shot: "/builds/clinics/dashboard.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.sukoonclinic.in/today",
        headline: "The whole day on one screen, {serif}reports out automatically.{/serif}",
        body: "Appointments, payments and revenue at a glance, and lab reports delivered to patients on WhatsApp without a single chasing call.",
        bullets: [
          "Appointments, payments, <b>revenue at a glance</b>",
          "Lab reports <b>delivered automatically</b>",
          "Patient history, <b>in one place</b>",
          "The diary, <b>finally a system</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a busy single-doctor clinic. Recovering missed calls and no-shows usually covers the build inside a month. We size it to your footfall in the first call.",
      before: [
        { k: "Missed calls booked elsewhere", v: "₹1,40,000" },
        { k: "Empty slots from no-shows", v: "₹1,00,000" },
        { k: "Patients never recalled", v: "₹80,000" },
        { k: "Front-desk time on the phone", v: "₹30,000" },
      ],
      beforeTotal: { k: "Walking out the door", v: "₹3,50,000" },
      after: [
        { k: "Missed calls turned into bookings", v: "₹1,20,000" },
        { k: "Slots kept full", v: "₹90,000" },
        { k: "Patients recalled and returned", v: "₹70,000" },
        { k: "Desk time freed", v: "₹25,000" },
      ],
      afterTotal: { k: "Back in the clinic", v: "₹3,05,000" },
      note: "Ranges from common clinic patterns, not a single client. This is not medical advice software; it handles the front desk and the calendar, not diagnosis.",
    },

    personasHeadline: "Different practices. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every clinic loses patients somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote:
          "When the desk is busy, the phone just rings, and that caller books elsewhere.",
        persona: "Single-doctor clinic",
        tag: "Voice Receptionist",
      },
      {
        quote:
          "Half my evening slots go empty because patients forget and nobody reminded them.",
        persona: "Dental practice",
        tag: "Smart Calendar",
      },
      {
        quote:
          "I treat a patient once and never have a way to bring them back for a check-up.",
        persona: "Physiotherapy clinic",
        tag: "Recall Engine",
      },
      {
        quote: "My front desk spends the whole day reading out lab reports on the phone.",
        persona: "Diagnostic lab",
        tag: "Clinic Dashboard",
      },
      {
        quote: "Appointments are in a register, so I never know the day until I am in it.",
        persona: "Skin and hair clinic",
        tag: "Clinic Dashboard",
      },
      {
        quote: "Patients call after hours and there is simply no one to answer.",
        persona: "Multi-specialty clinic",
        tag: "Voice Receptionist",
      },
    ],

    cta: {
      headline: "Not sure where your clinic leaks? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your clinic actually runs and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for clinics. Pick what fits, or let us point you.",
      chips: [
        "Voice Receptionist",
        "Smart Calendar",
        "Recall Engine",
        "Clinic Dashboard",
        "Patient Intake Bot",
        "Lab-Report Delivery",
        "WhatsApp Reminders",
        "Reviews and Reputation",
        "Prescription Records",
        "Package and Membership",
        "Referral Tracking",
        "Multi-Branch View",
      ],
    },

    anishNote:
      "A clinic does not lose patients on the medicine. It loses them in the ninety seconds the front desk could not pick up the phone. That gap is the whole business, and it is fixable.",
    pullQuote: {
      quote:
        "The patient who could not get through did not wait. They called the next clinic on the list, and that one answered.",
      attribution: "DEEPER DESIGNS · FOR CLINICS",
    },
  },
  // =====================================================================
  // 04 · RESTAURANTS & F&B · fully built (v19.2)
  // =====================================================================
  {
    slug: "restaurants",
    name: "Restaurants & F&B",
    live: true,
    accent: "#FF7A1A",
    accentSoft: "#FFA866",
    money: "#F5B544",

    heroEyebrow: "FOR RESTAURANTS AND F&B",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "You pay a fourth to aggregators {serif}and still reconcile by hand.{/serif}",
    heroSub:
      "Swiggy and Zomato take their cut, your food looks worse online than it tastes, and every night ends with you matching payouts on a calculator. We build the screen that checks every rupee and the channel that takes orders without the commission.",

    meta: {
      title: "For Restaurants and F&B · Deeper Designs",
      description:
        "You pay a fourth to aggregators and still reconcile by hand. We build the screen that checks every payout and the channel that takes orders without the commission.",
    },

    statPanel: {
      label:
        "WHAT A RESTAURANT LOSES TO COMMISSIONS, PAYOUT GAPS AND ORDERS THAT NEVER CAME DIRECT",
      target: 300000,
      caption:
        "The aggregator cut on every order, the settlement shortfalls you never catch, and a customer list you do not own.",
      rows: [
        { k: "Commission on every aggregator order", v: "22 to 25%" },
        { k: "Payout mismatches caught by hand", v: "every night" },
        { k: "Customers you can contact directly", v: "almost none" },
      ],
    },

    nowHeadline: "The food is yours. {serif}The customer belongs to the app.{/serif}",
    nowIntro:
      "Aggregators brought volume and took the relationship. Here is what that costs you every day.",
    nowItems: [
      {
        label: "THE COMMISSION",
        title: "A fourth of every order, gone",
        body: "Every Swiggy and Zomato order hands over 22 to 25%. And you have no direct line to the customer who just ordered your best dish.",
        stat: "a quarter of revenue, to the aggregator",
      },
      {
        label: "THE PAYOUT GAP",
        title: "The numbers never match",
        body: "Settlement is short, charges appear, refunds you did not approve. You reconcile three apps against a register every night.",
        stat: "payouts short, caught by hand",
      },
      {
        label: "THE FLAT PHOTO",
        title: "It sells worse than it tastes",
        body: "Phone photos under tube light. Your bestseller looks ordinary next to the place with a real shoot, so it does not get ordered.",
        stat: "dishes that look worse than they are",
      },
      {
        label: "THE MISSED ORDER",
        title: "The phone rang during the rush",
        body: "A direct order or a reservation call goes unanswered at 8pm because the kitchen is slammed. That table stays empty.",
        stat: "orders lost to a busy line",
      },
    ],

    aiHeadline: "Same kitchen. Same menu. {serif}The relationship, back with you.{/serif}",
    aiIntro:
      "Not another POS. A system that checks every rupee and brings the customer back to your door.",
    aiItems: [
      {
        label: "PAYOUTS CHECKED",
        title: "Every rupee, matched",
        body: "Swiggy, Zomato and direct settlements reconciled automatically. Shortfalls and wrong charges flagged before you lose them.",
        stat: "every payout, verified",
      },
      {
        label: "ORDERED DIRECT",
        title: "Off the commission",
        body: "A WhatsApp ordering and reorder channel that is yours. Regulars come back to you, not to a 25 percent middleman.",
        stat: "the customer, finally yours",
      },
      {
        label: "SHOT TO SELL",
        title: "Your dish, at its best",
        body: "Phone photos become menu-grade food photography and short dish reels, so the bestseller actually looks like one.",
        stat: "food that looks worth ordering",
      },
      {
        label: "ANSWERED",
        title: "Every call and reservation",
        body: "A voice agent takes direct orders and bookings during the rush, so a ringing phone never costs you a table.",
        stat: "no order lost to a busy line",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "PAYOUT RECONCILER",
        demo: "RestaurantsReconcilerDemo",
        frame: "browser",
        shot: "/builds/restaurants/reconciler.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.tindahouse.in/payouts",
        headline: "Check every aggregator payout {serif}before you lose it.{/serif}",
        body: "Swiggy, Zomato and direct orders reconciled in one screen. Short settlements, wrong commissions and ghost refunds flagged automatically.",
        bullets: [
          "Swiggy and Zomato payouts <b>matched to orders</b>",
          "Shortfalls and wrong charges <b>flagged</b>",
          "Direct, dine-in and aggregator revenue <b>in one view</b>",
          "The nightly reconciliation, <b>done for you</b>",
        ],
      },
      {
        index: "02",
        kicker: "DISH STUDIO",
        demo: "RestaurantsDishStudioDemo",
        frame: "browser",
        shot: "/builds/restaurants/dish-studio.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.tindahouse.in/studio",
        headline: "Make the bestseller {serif}look like one.{/serif}",
        body: "A phone photo of the plate becomes menu-grade food photography and a short dish reel, in your look, the same day.",
        bullets: [
          "Phone photo to <b>menu-grade food shot</b>",
          "Short <b>dish reels</b> for Reels and WhatsApp",
          "The whole menu shot <b>in an afternoon</b>",
          "Straight onto <b>aggregator listings and your channel</b>",
        ],
      },
      {
        index: "03",
        kicker: "DIRECT ORDER CHANNEL",
        demo: "RestaurantsDirectOrderDemo",
        frame: "phone",
        shot: "/builds/restaurants/direct-order.png",
        shotW: 390,
        shotH: 844,
        headline: "Your regulars, ordering direct, {serif}off the commission.{/serif}",
        body: "A WhatsApp ordering and reorder channel that is yours. The customer who loved the biryani comes back to you, not to a 25 percent middleman.",
        bullets: [
          "WhatsApp <b>menu, ordering and reorder</b>",
          "Loyalty and offers <b>to your own customers</b>",
          "<b>UPI payment</b>, no aggregator cut",
          "The regular, <b>contactable at last</b>",
        ],
      },
      {
        index: "04",
        kicker: "KITCHEN LINE",
        demo: "RestaurantsKitchenLineDemo",
        frame: "browser",
        shot: "/builds/restaurants/kitchen-line.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.tindahouse.in/line",
        headline: "Every call answered, {serif}even in the rush.{/serif}",
        body: "A voice agent takes direct orders and table bookings when the kitchen is slammed, so a ringing phone never costs you a table.",
        bullets: [
          "Order and reservation calls answered <b>24/7</b>",
          "In <b>Hindi, English and your local language</b>",
          "Orders dropped <b>straight to the kitchen screen</b>",
          "The <b>8pm rush, covered</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a single busy outlet. Even shifting a slice of orders to direct covers the build. We size it to your numbers in the first call.",
      before: [
        { k: "Commission on aggregator orders", v: "₹1,80,000" },
        { k: "Payout shortfalls not caught", v: "₹40,000" },
        { k: "Food shoot and creative", v: "₹50,000" },
        { k: "Orders missed during the rush", v: "₹60,000" },
      ],
      beforeTotal: { k: "Leaking every month", v: "₹3,30,000" },
      after: [
        { k: "Orders shifted direct, off commission", v: "₹1,20,000" },
        { k: "Shortfalls recovered", v: "₹35,000" },
        { k: "Shoot cost removed", v: "₹45,000" },
        { k: "Rush orders captured", v: "₹50,000" },
      ],
      afterTotal: { k: "Back in your till", v: "₹2,50,000" },
      note: "Ranges drawn from common F&B patterns, not a single client. Your real order mix decides the build.",
    },

    personasHeadline: "Different kitchens. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every restaurant is losing it somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote:
          "A quarter of every order goes to the app, and I never even meet the customer.",
        persona: "Single-outlet QSR",
        tag: "Direct Order Channel",
      },
      {
        quote:
          "Every night I sit with three apps and a calculator trying to match the payouts.",
        persona: "Cloud kitchen owner",
        tag: "Payout Reconciler",
      },
      {
        quote:
          "My food tastes better than it looks online, and online is all they see.",
        persona: "Family restaurant",
        tag: "Dish Studio",
      },
      {
        quote: "During the dinner rush the phone just rings, and that is a table gone.",
        persona: "Fine-dine restaurant",
        tag: "Kitchen Line",
      },
      {
        quote:
          "I have served the same regulars for years and I cannot even message them.",
        persona: "Neighbourhood cafe",
        tag: "Direct Order Channel",
      },
      {
        quote:
          "I run four brands from one kitchen and the payouts are a nightmare to track.",
        persona: "Multi-brand cloud kitchen",
        tag: "Payout Reconciler",
      },
    ],

    cta: {
      headline: "Not sure where your margin goes? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your outlet actually runs and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for restaurants. Pick what fits, or let us point you.",
      chips: [
        "Payout Reconciler",
        "Dish Studio",
        "Direct Order Channel",
        "Kitchen Line",
        "Wastage and Inventory",
        "Loyalty and Reorder",
        "Review Automation",
        "Menu Microsite",
        "Table Reservations",
        "Demand Forecast",
        "Feedback Collection",
        "Festive Campaigns",
      ],
    },

    anishNote:
      "The aggregator did not just take a commission, it took the customer. The whole game now is owning the second order, the one that should never have to go through an app at all.",
    pullQuote: {
      quote:
        "You can be fully booked on the apps and still bleed, because the relationship you paid to win belongs to someone else. The fix is owning the next order.",
      attribution: "DEEPER DESIGNS · FOR RESTAURANTS",
    },
  },
  // =====================================================================
  // 03 · JEWELLERY RETAIL · fully built (v19.2)
  // =====================================================================
  {
    slug: "jewellery",
    name: "Jewellery Retail",
    live: true,
    accent: "#C9A227",
    accentSoft: "#E3C766",
    money: "#C9A227",

    heroEyebrow: "FOR JEWELLERY RETAIL",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline:
      "Your billing changes with the gold rate every morning. {serif}Your software doesn't.{/serif}",
    heroSub:
      "Rates move, making-charges differ per piece, old-gold comes in, and half of it lives in a register. We build the counter that bills right to the paisa, tracks every gram, and lets a buyer try the piece on from their phone.",

    meta: {
      title: "For Jewellery Retail · Deeper Designs",
      description:
        "Your billing changes with the gold rate but your software does not. We build the counter that bills right, tracks every gram, and lets buyers try the piece on from home.",
    },

    statPanel: {
      label:
        "WHAT A JEWELLER LOSES TO MANUAL BILLING, DEAD STOCK AND BUYERS WHO NEVER WALK IN",
      target: 800000,
      caption:
        "Margin shaved off by hand-calculated bills, capital locked in stock that does not move, and online buyers who never came to see it.",
      rows: [
        { k: "Buyers who wanted to see it on first", v: "most of them" },
        { k: "Stock sitting unsold past a season", v: "more than you think" },
        { k: "Billing done on a calculator", v: "every single day" },
      ],
    },

    nowHeadline: "The gold moves every morning. {serif}Your register does not keep up.{/serif}",
    nowIntro:
      "A jewellery counter runs on trust, rate and memory. Here is where the memory part quietly costs you.",
    nowItems: [
      {
        label: "THE MORNING RATE",
        title: "Recalculated by hand",
        body: "Gold moves, and every bill, making-charge and old-gold exchange gets worked out on a calculator. One slip and the margin on that piece is gone.",
        stat: "margin lost to manual billing",
      },
      {
        label: "THE BUYER WHO WON'T COME",
        title: "They want to see it on first",
        body: "A customer likes a necklace online but will not drive in to just see it. Without trying it on, they hesitate, and the sale cools.",
        stat: "sales lost to come-and-see friction",
      },
      {
        label: "THE STOCK YOU CANNOT FIND",
        title: "A gram and a guess",
        body: "Karat, purity, HUID, weight, all in a register. You cannot say in a minute what is in the vault, or what has not moved in a year.",
        stat: "inventory you cannot search",
      },
      {
        label: "THE KHATA",
        title: "It lives in a diary",
        body: "Udhaar, savings schemes, karigar job-work, all on paper. Payments slip, reminders never go out, karigar accounts blur together.",
        stat: "money owed, tracked by memory",
      },
    ],

    aiHeadline: "Same counter. Same trust. {serif}Nothing left to memory.{/serif}",
    aiIntro:
      "Not a generic billing app. A system built for how a jewellery counter actually runs.",
    aiItems: [
      {
        label: "BILLED RIGHT",
        title: "Live rate, to the paisa",
        body: "Today's rate flows into every bill, making-charge and old-gold exchange automatically. No calculator, no slip, the margin holds.",
        stat: "no more calculator billing",
      },
      {
        label: "TRIED ON FROM HOME",
        title: "The piece, on their phone",
        body: "A buyer uploads a photo and sees the necklace or earrings on themselves before they visit. The hesitation goes, the visit gets booked.",
        stat: "the store, on their screen",
      },
      {
        label: "EVERY GRAM TRACKED",
        title: "Karat, HUID, searchable",
        body: "Inventory by purity and HUID. What is in the vault, what is moving, what is dead, in one screen instead of a register.",
        stat: "the vault, finally legible",
      },
      {
        label: "THE KHATA, AUTOMATED",
        title: "Reminders that go out",
        body: "Udhaar and scheme reminders on WhatsApp, karigar job-work tracked, payments chased without you lifting the phone.",
        stat: "money owed, now collected",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "TRY-ON STUDIO",
        demo: "JewelleryTryOnDemo",
        frame: "phone",
        shot: "/builds/jewellery/try-on.png",
        shotW: 390,
        shotH: 844,
        headline: "Let them see it on, {serif}before they come in.{/serif}",
        body: "A buyer uploads a photo and sees the piece on themselves, a necklace at the neck, earrings, a ring on the hand. The I-will-just-come-and-see-it excuse disappears.",
        bullets: [
          "Try-on from a phone, <b>necklace, earrings, ring</b>",
          "Share the result <b>straight to WhatsApp</b>",
          "Works on <b>your catalogue, your pieces</b>",
          "A hesitant buyer turned into a <b>booked visit</b>",
        ],
      },
      {
        index: "02",
        kicker: "LIVE-RATE BILLING",
        demo: "JewelleryBillingDemo",
        frame: "browser",
        shot: "/builds/jewellery/billing.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.vaibhavjewellers.in/billing",
        headline: "Today's rate, in every bill, {serif}to the paisa.{/serif}",
        body: "The morning rate flows into making-charges, old-gold exchange and the final bill automatically. No calculator, no slip, no lost margin.",
        bullets: [
          "Live gold and silver rate, <b>rate-card built in</b>",
          "Making-charges <b>per piece, per karat</b>",
          "<b>Old-gold exchange</b> valued cleanly",
          "<b>GST bill and HUID</b> on every sale",
        ],
      },
      {
        index: "03",
        kicker: "THE VAULT",
        demo: "JewelleryVaultDemo",
        frame: "browser",
        shot: "/builds/jewellery/vault.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.vaibhavjewellers.in/vault",
        headline: "Every gram, by karat and HUID, {serif}finally searchable.{/serif}",
        body: "What is in the vault, what is moving, what has sat a season. By purity, by HUID, in one screen instead of a register.",
        bullets: [
          "Inventory by <b>karat, purity and HUID</b>",
          "What is moving and <b>what is dead stock</b>",
          "<b>Karigar job-work</b>, gold issued and returned",
          "A real count, <b>not a register guess</b>",
        ],
      },
      {
        index: "04",
        kicker: "KHATA AND SCHEMES",
        demo: "JewelleryKhataDemo",
        frame: "phone",
        shot: "/builds/jewellery/khata.png",
        shotW: 390,
        shotH: 844,
        headline: "Udhaar and schemes, {serif}chased without you.{/serif}",
        body: "Payment and scheme reminders go out on WhatsApp, karigar accounts stay clean, and the money owed actually comes back.",
        bullets: [
          "Udhaar and khata, with <b>WhatsApp reminders</b>",
          "<b>Gold-savings scheme</b> tracking and nudges",
          "Occasion marketing, <b>anniversaries and wedding season</b>",
          "Karigar job-work accounts, <b>clean</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a single-store jeweller. The tickets are large, so one or two extra conversions a month covers the build. We size it to your counter in the first call.",
      before: [
        { k: "Margin shaved by hand-billing errors", v: "₹90,000" },
        { k: "Capital locked in dead stock", v: "₹3,50,000" },
        { k: "Online buyers who never walked in", v: "₹2,40,000" },
        { k: "Udhaar and dues slipping", v: "₹1,20,000" },
      ],
      beforeTotal: { k: "Tied up or walking out", v: "₹8,00,000" },
      after: [
        { k: "Margin protected by clean billing", v: "₹80,000" },
        { k: "Dead stock cleared and surfaced", v: "₹2,60,000" },
        { k: "Try-on buyers converted to visits", v: "₹2,10,000" },
        { k: "Udhaar and schemes collected", v: "₹95,000" },
      ],
      afterTotal: { k: "Back in your counter", v: "₹6,45,000" },
      note: "Ranges drawn from common jewellery-retail patterns, not a single client. High tickets mean the build usually pays back in a sale or two.",
    },

    personasHeadline: "Different counters. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every jeweller is losing it somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote:
          "Buyers love a piece on Instagram but will not come in just to try it on.",
        persona: "Online jewellery seller",
        tag: "Try-On Studio",
      },
      {
        quote:
          "One wrong making-charge calculation and the whole piece sells at a loss.",
        persona: "Independent jeweller",
        tag: "Live-Rate Billing",
      },
      {
        quote:
          "I genuinely cannot tell you what has been sitting in the vault since last Diwali.",
        persona: "Family showroom",
        tag: "The Vault",
      },
      {
        quote:
          "My udhaar book is the only record, and half the reminders never go out.",
        persona: "Neighbourhood store with khata",
        tag: "Khata and Schemes",
      },
      {
        quote: "My karigar accounts and the gold I issued are all on loose paper.",
        persona: "Workshop-heavy jeweller",
        tag: "The Vault",
      },
      {
        quote: "During wedding season I cannot keep up with who wanted what.",
        persona: "Bridal jewellery showroom",
        tag: "Try-On Studio",
      },
    ],

    cta: {
      headline: "Not sure where your counter leaks? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your store actually runs and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for jewellers. Pick what fits, or let us point you.",
      chips: [
        "Try-On Studio",
        "Live-Rate Billing",
        "The Vault",
        "Khata and Schemes",
        "Custom-Design Preview",
        "Wedding-Season Concierge",
        "Catalogue Microsite",
        "Old-Gold Calculator",
        "Karigar Tracker",
        "HUID and Certificate Manager",
        "Gold-Savings Plans",
        "WhatsApp Catalogue",
      ],
    },

    anishNote:
      "A jewellery sale is built on trust, and trust is built on getting the small numbers right every time. The making-charge that is off by a hundred rupees is the one the customer remembers.",
    pullQuote: {
      quote:
        "The gold rate is the one thing every jeweller watches and the one thing their software ignores. Everything downstream of that gap is margin quietly leaving the counter.",
      attribution: "DEEPER DESIGNS · FOR JEWELLERY",
    },
  },
  // =====================================================================
  // 08 · MSME MANUFACTURING & DISTRIBUTION · fully built (v19.4)
  // =====================================================================
  {
    slug: "manufacturing",
    name: "MSME Manufacturing",
    live: true,
    accent: "#C2410C",
    accentSoft: "#E27A4D",
    money: "#E0B341",

    heroEyebrow: "FOR MANUFACTURERS AND DISTRIBUTORS",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "IndiaMART sends 50 leads. {serif}45 are junk.{/serif}",
    heroSub:
      "You chase all fifty, quote on WhatsApp, lose the file, and the real buyer goes cold while you sort the noise. We build the system that finds the five, quotes in seconds, and follows up on its own.",

    meta: {
      title: "For Manufacturers and Distributors · Deeper Designs",
      description:
        "IndiaMART sends fifty leads and forty-five are junk. We build the system that finds the five, quotes in seconds, and follows up on its own.",
    },

    statPanel: {
      label:
        "WHAT A MANUFACTURER LOSES TO JUNK LEADS AND SLOW QUOTES, EVERY MONTH",
      target: 700000,
      caption:
        "Time burned on dead enquiries, real buyers lost to a slow quote, and orders that slipped because nobody followed up.",
      rows: [
        { k: "Portal leads that are junk", v: "most of them" },
        { k: "Time to send a quotation", v: "a day or more" },
        { k: "Distributor orders tracked on Excel", v: "still" },
      ],
    },

    nowHeadline: "You make a real product. {serif}The selling runs on Excel.{/serif}",
    nowIntro:
      "B2B manufacturing still runs on portals, phone calls and spreadsheets. Here is where the orders quietly leak.",
    nowItems: [
      {
        label: "THE JUNK LEAD",
        title: "Fifty enquiries, five are real",
        body: "IndiaMART and JustDial dump fifty leads on you. Most are price-checkers, students, competitors. You burn the day calling all of them and the real buyer waits.",
        stat: "most portal leads are junk",
      },
      {
        label: "THE SLOW QUOTE",
        title: "The file took a day",
        body: "A serious buyer wants a quotation. It takes a day to work out specs, rates and terms by hand, and by then they have a quote from someone faster.",
        stat: "real buyers lost to slow quotes",
      },
      {
        label: "THE EXCEL DISTRIBUTOR",
        title: "Two hundred relationships in a sheet",
        body: "Orders, credit, dispatch, all in one Excel that one person guards. A reorder gets missed, a payment slips, and nobody sees it until month end.",
        stat: "distributor orders, untracked",
      },
      {
        label: "THE COLD FOLLOW-UP",
        title: "The quote sent, then silence",
        body: "Quotes go out and nobody follows up. The order goes to the supplier who called back twice. Yours is sitting unanswered in an inbox.",
        stat: "orders lost to no follow-up",
      },
    ],

    aiHeadline: "Same product. Same buyers. {serif}The noise filtered out.{/serif}",
    aiIntro:
      "Not a generic CRM. A system shaped to how a manufacturer and distributor actually sells.",
    aiItems: [
      {
        label: "THE FIVE, FOUND",
        title: "Junk filtered at the door",
        body: "Every enquiry is verified and scored, OTP and intent checked, so the real buyers are pinged to your rep in seconds and the junk never wastes a call.",
        stat: "the five real leads, surfaced",
      },
      {
        label: "QUOTED IN SECONDS",
        title: "Specs in, branded quote out",
        body: "Enter the specs and a clean branded quotation generates in seconds, with rates, terms and GST, ready to send before the buyer cools.",
        stat: "quotes out in seconds",
      },
      {
        label: "OUTREACH THAT RUNS ITSELF",
        title: "Buyers found and worked for you",
        body: "An agent scrapes and enriches buyer and distributor lists, then runs personalised email and WhatsApp outreach with follow-up, covering a week of business development in an hour.",
        stat: "a week of BD in an hour",
      },
      {
        label: "EVERY ORDER VISIBLE",
        title: "Distributors, off the spreadsheet",
        body: "Orders, credit and dispatch in one portal, reorders and payments chased automatically. The Excel that one person guarded becomes a system everyone can see.",
        stat: "the sales floor, finally visible",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "LEAD FILTER",
        demo: "ManufacturingLeadFilterDemo",
        frame: "browser",
        shot: "/builds/manufacturing/lead-filter.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.bharatindustries.in/leads",
        headline: "Find the five real buyers, {serif}ignore the forty-five.{/serif}",
        body: "Every enquiry from every portal is verified and scored, so your rep is pinged about the serious buyers in seconds and never burns a day on junk.",
        bullets: [
          "Leads from <b>IndiaMART, JustDial, TradeIndia, WhatsApp</b>, unified",
          "<b>OTP and intent verified</b>, junk killed at the door",
          "Hot buyers <b>pinged to the rep in seconds</b>",
          "Source and quality, <b>measured</b>",
        ],
      },
      {
        index: "02",
        kicker: "QUOTE ENGINE",
        demo: "ManufacturingQuoteEngineDemo",
        frame: "browser",
        shot: "/builds/manufacturing/quote-engine.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.bharatindustries.in/quotes",
        headline: "Specs in, {serif}branded quote out in seconds.{/serif}",
        body: "Enter the requirement and a clean, branded quotation generates instantly, rates, terms, GST, ready to send before the buyer talks to anyone else.",
        bullets: [
          "<b>Spec to quotation</b> in seconds",
          "Your <b>rates, terms and GST</b> built in",
          "Branded <b>PDF, sent on WhatsApp or email</b>",
          "Quote-to-order, <b>tracked</b>",
        ],
      },
      {
        index: "03",
        kicker: "OUTREACH AGENT",
        demo: "ManufacturingOutreachDemo",
        frame: "browser",
        shot: "/builds/manufacturing/outreach.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.bharatindustries.in/outreach",
        headline: "A week of business development, {serif}done in an hour.{/serif}",
        body: "An agent finds buyers and distributors, enriches the list, and runs personalised outreach with follow-up. You wake up to replies, not a blank pipeline.",
        bullets: [
          "Scrapes and <b>enriches buyer and distributor lists</b>",
          "Personalised <b>email and WhatsApp</b> outreach",
          "<b>Automatic follow-up</b> until they reply",
          "Replies dropped <b>into your pipeline</b>",
        ],
      },
      {
        index: "04",
        kicker: "DISTRIBUTOR PORTAL",
        demo: "ManufacturingDistributorPortalDemo",
        frame: "browser",
        shot: "/builds/manufacturing/distributor-portal.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.bharatindustries.in/distributors",
        headline: "Two hundred distributors, {serif}off the spreadsheet.{/serif}",
        body: "Orders, credit and dispatch in one portal, reorders and payments chased on their own. The sheet one person guarded becomes a system the whole floor can see.",
        bullets: [
          "Distributor <b>ordering and reorder portal</b>",
          "<b>Credit and payment</b> tracking with reminders",
          "<b>Dispatch and field-sales</b> updates, live",
          "One view of <b>every order and every account</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a mid-size manufacturer running portal leads and a distributor network. Filtering junk and quoting faster usually covers the build in a quarter. We size it to your pipeline in the first call.",
      before: [
        { k: "Rep time burned on junk leads", v: "₹1,80,000" },
        { k: "Orders lost to slow quotes", v: "₹2,40,000" },
        { k: "Reorders and payments slipping", v: "₹1,60,000" },
        { k: "Manual lead and order processing", v: "₹80,000" },
      ],
      beforeTotal: { k: "Leaking every month", v: "₹6,60,000" },
      after: [
        { k: "Reps focused on real buyers", v: "₹1,60,000" },
        { k: "Faster quotes winning orders", v: "₹2,10,000" },
        { k: "Reorders and payments captured", v: "₹1,40,000" },
        { k: "Processing time freed", v: "₹70,000" },
      ],
      afterTotal: { k: "Back in the business", v: "₹5,80,000" },
      note: "Ranges from common MSME B2B patterns, not a single client. Faster quoting and junk filtering usually pay for the build inside a quarter.",
    },

    personasHeadline: "Different floors. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every manufacturer and distributor leaks somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote:
          "IndiaMART sends me fifty enquiries and forty-five are time-wasters. I chase them anyway.",
        persona: "Industrial components maker",
        tag: "Lead Filter",
      },
      {
        quote: "By the time I work out a quote by hand, the buyer has gone with someone faster.",
        persona: "Packaging manufacturer",
        tag: "Quote Engine",
      },
      {
        quote:
          "My whole distributor network lives in one Excel sheet that only my manager understands.",
        persona: "FMCG distributor",
        tag: "Distributor Portal",
      },
      {
        quote: "I have no way to find new buyers except cold calls and trade fairs.",
        persona: "Auto-parts manufacturer",
        tag: "Outreach Agent",
      },
      {
        quote: "Quotes go out and then nothing. Nobody follows up and the order goes elsewhere.",
        persona: "Textile mill",
        tag: "Outreach Agent",
      },
      {
        quote: "Reorders get missed because it all depends on one person remembering.",
        persona: "Chemicals distributor",
        tag: "Distributor Portal",
      },
    ],

    cta: {
      headline: "Not sure where your orders leak? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your sales floor actually runs and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for manufacturers and distributors. Pick what fits, or let us point you.",
      chips: [
        "Lead Filter",
        "Quote Engine",
        "Outreach Agent",
        "Distributor Portal",
        "Catalogue and Spec Sheets",
        "WhatsApp Product Assistant",
        "RFQ to Order Pipeline",
        "Field-Sales Dashboard",
        "Credit and Payment Tracking",
        "Export Document Automation",
        "Inventory and Dispatch",
        "GST Invoicing",
      ],
    },

    anishNote:
      "The factory floor got lean decades ago. The sales floor never did. It still runs on a portal full of junk and a spreadsheet one person guards. That is where the next margin is hiding.",
    pullQuote: {
      quote:
        "The order never went to the best product. It went to the supplier who answered first and quoted before the buyer cooled.",
      attribution: "DEEPER DESIGNS · FOR MANUFACTURING",
    },
  },
  // =====================================================================
  // 07 · FASHION & APPAREL · fully built (v19.3)
  // =====================================================================
  {
    slug: "fashion",
    name: "Fashion & Apparel",
    live: true,
    accent: "#E84393",
    accentSoft: "#F576B5",
    money: "#E0B341",

    heroEyebrow: "FOR FASHION AND APPAREL",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "Stop paying for model shoots. {serif}Generate them.{/serif}",
    heroSub:
      "A new drop means a shoot, a stylist, a model, a week gone, a big bill. And shoppers still hesitate because they cannot tell how it will look on them. We build the engine that shoots your catalogue and lets buyers see the fit before they order.",

    meta: {
      title: "For Fashion and Apparel · Deeper Designs",
      description:
        "Stop paying for model shoots, generate them. We build the engine that shoots your catalogue and lets buyers see the fit before they order.",
    },

    statPanel: {
      label:
        "WHAT A FASHION BRAND LOSES TO SHOOT COSTS AND FIT-DOUBT RETURNS, EVERY DROP",
      target: 500000,
      caption:
        "Money spent on shoots for every drop, plus the returns and dropped carts from shoppers who could not picture the fit.",
      rows: [
        { k: "Cost and time per model shoot", v: "a week, a big bill" },
        { k: "Returns driven by fit and look doubt", v: "high in fashion" },
        { k: "Shoppers who leave unsure of the fit", v: "most" },
      ],
    },

    nowHeadline: "The clothes are good. {serif}Showing them costs a fortune.{/serif}",
    nowIntro:
      "A small fashion brand competes on visuals with brands that outspend it ten to one. Here is where that hurts.",
    nowItems: [
      {
        label: "THE SHOOT BILL",
        title: "A week and a fortune per drop",
        body: "Every drop needs a model, a stylist, a location, a photographer. For a small brand that is a week gone and a bill that eats the margin on the collection.",
        stat: "a shoot per drop, a big bill",
      },
      {
        label: "THE FIT DOUBT",
        title: "They cannot picture it on them",
        body: "A flat-lay or a ghost-mannequin shot does not tell a shopper how it falls on a real body. So they hesitate, and the cart cools.",
        stat: "sales lost to fit doubt",
      },
      {
        label: "THE RETURN",
        title: "It did not look like that on me",
        body: "The garment arrives, the fit surprises them, it comes back. Returns in fashion are brutal, and each one eats the shoot, the shipping and the margin.",
        stat: "fit-driven returns, brutal",
      },
      {
        label: "THE SLOW DROP",
        title: "Shot next month, not today",
        body: "The collection is ready but the shoot is booked for next week, so the drop waits. Momentum and the trend window pass.",
        stat: "drops that miss the moment",
      },
    ],

    aiHeadline: "Same collection. {serif}Shot, modelled and live today.{/serif}",
    aiIntro:
      "Not stock imagery. Your actual product, shot and modelled by an engine, in your brand's look.",
    aiItems: [
      {
        label: "SHOT IN AN AFTERNOON",
        title: "On-model, any look, no shoot",
        body: "A flat product photo becomes a full on-model shoot, any body type, any setting, in your brand's aesthetic. No studio, no week, no bill.",
        stat: "the shoot, replaced",
      },
      {
        label: "SEEN ON THEM",
        title: "Try it on from the phone",
        body: "A shopper uploads a photo and sees the outfit on themselves, as an image and a short motion clip, before they buy. The fit doubt goes.",
        stat: "the fitting room, on their screen",
      },
      {
        label: "RETURNS DOWN",
        title: "Sure before they order",
        body: "When a shopper has seen the fit on a real body and on themselves, they order with confidence and send back far less.",
        stat: "fewer fit-driven returns",
      },
      {
        label: "DROP THE SAME DAY",
        title: "Ready becomes live",
        body: "The collection is shot, modelled and live the day it is ready, so you catch the trend instead of chasing it.",
        stat: "drops that catch the moment",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "RUNWAY",
        demo: "FashionRunwayDemo",
        frame: "video",
        poster: "/builds/fashion/runway-poster.webp",
        // v19.3: fal (Kling) runway clip, generated via scripts/gen-fal-video.ts.
        video: "/videos/fashion/runway.mp4",
        videoAspect: "9:16",
        videoDuration: "0:05",
        headline: "Your product, on a model, {serif}moving, today.{/serif}",
        body: "A flat garment photo becomes a full on-model shot and a short runway-style motion clip, in your brand's look. No studio, no model, no week-long wait.",
        bullets: [
          "Flat product to <b>full on-model shoot</b>",
          "<b>Any body type</b>, any setting, your aesthetic",
          "A short <b>runway motion clip</b> for Reels and ads",
          "A new drop <b>shot and live the same day</b>",
        ],
      },
      {
        index: "02",
        kicker: "TRY-ON",
        demo: "FashionTryOnDemo",
        frame: "phone",
        shot: "/builds/fashion/try-on.png",
        shotW: 390,
        shotH: 844,
        headline: "Let them see the fit, {serif}before it ships.{/serif}",
        body: "A shopper uploads a photo and sees the outfit on themselves, as an image and a short clip, before they order. The fit doubt that kills the cart disappears.",
        bullets: [
          "Try-on from a <b>phone photo</b>",
          "Image <b>and a short motion clip</b>",
          "Works across <b>your full catalogue</b>",
          "A hesitant shopper turned into a <b>confident order</b>",
        ],
      },
      {
        index: "03",
        kicker: "CATALOGUE STUDIO",
        demo: "FashionCatalogueStudioDemo",
        frame: "browser",
        shot: "/builds/fashion/catalogue-studio.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.indiethread.in/studio",
        headline: "The whole catalogue, {serif}shot in an afternoon.{/serif}",
        body: "Every SKU becomes a clean on-model and lifestyle set in one consistent brand look, ready for the site, the listings and the ads.",
        bullets: [
          "Every SKU, <b>on-model and lifestyle</b>",
          "<b>One consistent brand look</b> across the catalogue",
          "Straight to <b>site, marketplace and ads</b>",
          "A full collection, <b>live the same day</b>",
        ],
      },
      {
        index: "04",
        kicker: "DROP ENGINE",
        demo: "FashionDropEngineDemo",
        frame: "browser",
        shot: "/builds/fashion/drop-engine.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.indiethread.in/drops",
        headline: "From ready to live, {serif}the same day.{/serif}",
        body: "Shot, captioned, listed and pushed across your site, WhatsApp and social the day the collection is ready. Catch the trend instead of chasing it.",
        bullets: [
          "Listings and captions <b>generated per SKU</b>",
          "Pushed to <b>site, WhatsApp and social</b>",
          "Drop teasers and <b>launch sequences</b>",
          "Sell-through, <b>tracked per drop</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a small fashion brand doing regular drops. Replacing one shoot covers the build. We size it to your drop cadence in the first call.",
      before: [
        { k: "Model shoots, per drop", v: "₹2,00,000" },
        { k: "Returns driven by fit doubt", v: "₹1,60,000" },
        { k: "Carts lost to fit uncertainty", v: "₹1,00,000" },
        { k: "Drops delayed waiting on shoots", v: "₹40,000" },
      ],
      beforeTotal: { k: "Lost every drop cycle", v: "₹5,00,000" },
      after: [
        { k: "Shoots replaced by the engine", v: "₹1,80,000" },
        { k: "Fit-driven returns reduced", v: "₹1,30,000" },
        { k: "Carts saved by try-on", v: "₹85,000" },
        { k: "Drops live on time", v: "₹35,000" },
      ],
      afterTotal: { k: "Back in the brand", v: "₹4,30,000" },
      note: "Ranges from common fashion-D2C patterns, not a single client. Replacing a single shoot per drop usually pays for the build.",
    },

    personasHeadline: "Different labels. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every fashion brand bleeds somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote:
          "Every drop is a shoot, a model and a week gone before I can even list it.",
        persona: "Independent clothing label",
        tag: "Runway",
      },
      {
        quote:
          "People love the photos but cannot tell how it will sit on their body, so they wait.",
        persona: "Womenswear brand",
        tag: "Try-On",
      },
      {
        quote: "My returns are mostly it did not look like that on me, and each one hurts.",
        persona: "Occasion-wear brand",
        tag: "Try-On",
      },
      {
        quote: "I shoot one SKU at a time on my phone and the catalogue looks inconsistent.",
        persona: "Small streetwear brand",
        tag: "Catalogue Studio",
      },
      {
        quote: "By the time the shoot is done, the trend I was chasing has moved on.",
        persona: "Fast-fashion reseller",
        tag: "Drop Engine",
      },
      {
        quote: "I cannot afford a model for every collection, so my brand looks smaller than it is.",
        persona: "Home-grown apparel brand",
        tag: "Runway",
      },
    ],

    cta: {
      headline: "Not sure where to start? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us your collection and how you sell it, and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for fashion brands. Pick what fits, or let us point you.",
      chips: [
        "Runway",
        "Try-On",
        "Catalogue Studio",
        "Drop Engine",
        "Size and Fit Recommender",
        "On-Model Generation",
        "Lookbook Builder",
        "Abandoned-Cart Recovery",
        "WhatsApp Catalogue",
        "Influencer-Asset Generator",
        "Returns Automation",
        "Loyalty and Restock Alerts",
      ],
    },

    anishNote:
      "A small label and a giant now compete in the same feed, on the same phone screen. Generated on-model and try-on are the great leveller: your collection can look every bit as considered as theirs, the day it is ready.",
    pullQuote: {
      quote:
        "The shopper never doubted the clothes. They doubted how the clothes would sit on them, and no flat-lay ever answered that question.",
      attribution: "DEEPER DESIGNS · FOR FASHION",
    },
  },
  // =====================================================================
  // 11 · CA & PROFESSIONAL SERVICES · fully built (v19.5)
  // money is a mint/spring green (#5BC8A0), deliberately clear of teal.
  // =====================================================================
  {
    slug: "ca-firms",
    name: "CA & Professional Services",
    live: true,
    accent: "#6D5ACF",
    accentSoft: "#9C8DE6",
    money: "#5BC8A0",

    heroEyebrow: "FOR CA AND PROFESSIONAL SERVICES",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "You don't have a work problem. {serif}You have a chasing-clients problem.{/serif}",
    heroSub:
      "Documents arrive late and in the wrong format, deadlines live in your head, and client conversations are scattered across a hundred WhatsApp chats. We build the system that collects the documents, tracks every filing, and ends the chaos.",

    meta: {
      title: "For CA and Professional Services · Deeper Designs",
      description:
        "You do not have a work problem, you have a chasing-clients problem. We build the system that collects documents, tracks every filing, and ends the WhatsApp chaos.",
    },

    statPanel: {
      label:
        "WHAT A FIRM LOSES TO DOCUMENT CHASING AND DEADLINE CHAOS, EVERY MONTH",
      target: 300000,
      caption:
        "Hours burned chasing clients for documents, penalties risked on missed deadlines, and the work that piles up because nothing is in one place.",
      rows: [
        { k: "Time spent chasing client documents", v: "hours every week" },
        { k: "Client conversations scattered on WhatsApp", v: "all of them" },
        { k: "Deadlines tracked in someone's head", v: "too many" },
      ],
    },

    nowHeadline: "The work is fine. {serif}Getting to it is the problem.{/serif}",
    nowIntro:
      "A practice does not drown in filings. It drowns in chasing the inputs for them. Here is where the week goes.",
    nowItems: [
      {
        label: "THE MISSING DOCUMENT",
        title: "Chased for the tenth time",
        body: "A client owes you a bank statement, sends a blurry photo of the wrong page, then goes quiet. You chase, you remind, you chase again. The filing waits on it.",
        stat: "hours a week, just chasing",
      },
      {
        label: "THE DEADLINE IN YOUR HEAD",
        title: "GST, ITR, TDS, ROC",
        body: "A dozen deadlines a month across a hundred clients, tracked in your memory and a spreadsheet. One slip is a penalty and an awkward call.",
        stat: "deadlines that depend on memory",
      },
      {
        label: "THE WHATSAPP CHAOS",
        title: "A hundred chats, no record",
        body: "Every client conversation lives in a separate WhatsApp thread on your personal number. When an article clerk leaves, the context leaves with them.",
        stat: "client comms with no system",
      },
      {
        label: "THE MANUAL ENTRY",
        title: "Typed in by hand",
        body: "Invoices and statements keyed in line by line, reconciled against GSTR-2B by eye. Slow, and a mistake waiting to happen.",
        stat: "data entry that should be automatic",
      },
    ],

    aiHeadline: "Same filings. Same clients. {serif}Nothing chased twice.{/serif}",
    aiIntro:
      "Not generic practice software. A system shaped to how an Indian CA firm actually runs its month.",
    aiItems: [
      {
        label: "DOCUMENTS, COLLECTED",
        title: "The client portal does the chasing",
        body: "Each client gets a simple request list and automatic reminders until the right document, in the right format, is in. You stop being the follow-up service.",
        stat: "documents in, without the chasing",
      },
      {
        label: "DEADLINES, TRACKED",
        title: "Nothing slips, nothing penalised",
        body: "Every GST, ITR, TDS and ROC deadline across every client on one board, with alerts well before the date. The penalties stop.",
        stat: "every filing, on time",
      },
      {
        label: "COMMS, IN ONE PLACE",
        title: "Off your personal number",
        body: "Client conversations move into one hub tied to the client record, so context stays with the firm even when staff change.",
        stat: "the chaos, replaced by a record",
      },
      {
        label: "DATA, EXTRACTED",
        title: "Statements read automatically",
        body: "Invoices and statements read and entered automatically, reconciled against GSTR-2B, so the clerk checks instead of types.",
        stat: "entry that does itself",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "CLIENT DOCUMENT PORTAL",
        demo: "CaFirmsDocumentPortalDemo",
        frame: "browser",
        shot: "/builds/ca-firms/document-portal.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.mehtaassociates.in/documents",
        headline: "The portal chases the documents, {serif}so you don't.{/serif}",
        body: "Each client gets a clear request list and automatic reminders until the right document, in the right format, is in. You stop being the unpaid follow-up service.",
        bullets: [
          "A <b>request list per client</b>, by filing",
          "<b>Automatic reminders</b> until it is in",
          "Wrong format <b>flagged on upload</b>",
          "You see <b>what is pending, at a glance</b>",
        ],
      },
      {
        index: "02",
        kicker: "COMPLIANCE CALENDAR",
        demo: "CaFirmsComplianceCalendarDemo",
        frame: "browser",
        shot: "/builds/ca-firms/compliance-calendar.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.mehtaassociates.in/calendar",
        headline: "Every deadline, every client, {serif}on one board.{/serif}",
        body: "GST, ITR, TDS and ROC across your whole client base on a single board, with alerts well before each date. The missed-deadline penalty becomes a thing of the past.",
        bullets: [
          "<b>GST, ITR, TDS, ROC</b> across every client",
          "Alerts <b>well before the date</b>",
          "Status per filing: <b>pending, in progress, filed</b>",
          "Workload <b>balanced across the team</b>",
        ],
      },
      {
        index: "03",
        kicker: "CLIENT HUB",
        demo: "CaFirmsClientHubDemo",
        frame: "phone",
        shot: "/builds/ca-firms/client-hub.png",
        shotW: 390,
        shotH: 844,
        headline: "Client conversations, {serif}off your personal number.{/serif}",
        body: "Every client conversation moves into one hub tied to the client record, so context stays with the firm even when an article clerk moves on.",
        bullets: [
          "Client comms <b>in one place, per client</b>",
          "Document requests and reminders <b>from the hub</b>",
          "History <b>stays with the firm</b>, not the staff",
          "Off your <b>personal WhatsApp</b>",
        ],
      },
      {
        index: "04",
        kicker: "DOC EXTRACTION",
        demo: "CaFirmsExtractionDemo",
        frame: "browser",
        shot: "/builds/ca-firms/extraction.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.mehtaassociates.in/reconcile",
        headline: "Statements read and entered, {serif}you just check.{/serif}",
        body: "Invoices and statements read and entered automatically, reconciled against GSTR-2B, so your clerk reviews instead of keying in line by line.",
        bullets: [
          "Invoices and statements <b>read automatically</b>",
          "Reconciled against <b>GSTR-2B</b>",
          "Mismatches <b>flagged for review</b>",
          "A maker-checker <b>audit trail</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a small firm with a hundred-odd clients. Freeing the hours lost to chasing and entry usually covers the build well inside a season. We size it to your client base in the first call.",
      before: [
        { k: "Hours chasing documents", v: "₹1,20,000" },
        { k: "Penalty and rework risk on deadlines", v: "₹80,000" },
        { k: "Manual data entry and reconciliation", v: "₹70,000" },
        { k: "Context lost when staff leave", v: "₹30,000" },
      ],
      beforeTotal: { k: "Lost every month", v: "₹3,00,000" },
      after: [
        { k: "Documents collected automatically", v: "₹1,10,000" },
        { k: "Deadlines tracked, penalties avoided", v: "₹75,000" },
        { k: "Entry and reconciliation automated", v: "₹60,000" },
        { k: "Context retained in the firm", v: "₹25,000" },
      ],
      afterTotal: { k: "Back in the practice", v: "₹2,70,000" },
      note: "Ranges from common small-firm patterns, not a single client. This handles the workflow around filings, not the professional judgment in them.",
    },

    personasHeadline: "Different practices. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every firm loses the week somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote: "I spend more time chasing clients for documents than actually doing the work.",
        persona: "Solo chartered accountant",
        tag: "Client Document Portal",
      },
      {
        quote: "A dozen deadlines a month live in my head. One slip is a penalty and an apology.",
        persona: "Two-partner CA firm",
        tag: "Compliance Calendar",
      },
      {
        quote: "Every client is a separate WhatsApp chat on my personal phone. It is chaos.",
        persona: "Tax consultant",
        tag: "Client Hub",
      },
      {
        quote: "When an article clerk leaves, all the client context walks out with them.",
        persona: "Mid-size practice",
        tag: "Client Hub",
      },
      {
        quote: "My team keys in invoices line by line and reconciles against 2B by eye.",
        persona: "GST practitioner",
        tag: "Doc Extraction",
      },
      {
        quote: "I run a company-secretary practice and ROC dates are scattered everywhere.",
        persona: "Company-secretary firm",
        tag: "Compliance Calendar",
      },
    ],

    cta: {
      headline: "Not sure where your week goes? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your practice actually runs a month and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for professional-services firms. Pick what fits, or let us point you.",
      chips: [
        "Client Document Portal",
        "Compliance Calendar",
        "Client Hub",
        "Doc Extraction",
        "Engagement and Billing",
        "Task and Workflow Board",
        "Client Onboarding",
        "E-sign and Approvals",
        "Notice and Query Tracker",
        "Knowledge Base Assistant",
        "Practice Dashboard",
        "WhatsApp Client Updates",
      ],
    },

    anishNote:
      "Every CA I meet is brilliant at the work and buried under the chasing of it. The judgment was never the bottleneck. The bank statement that arrives a week late, in the wrong format, was.",
    pullQuote: {
      quote:
        "The practice was never short on expertise. It was short on the bank statement that never came, chased across a hundred WhatsApp chats nobody owned.",
      attribution: "DEEPER DESIGNS · FOR CA FIRMS",
    },
  },
  // =====================================================================
  // 12 · SALONS, SPAS & WELLNESS · fully built (v19.5)
  // =====================================================================
  {
    slug: "salons",
    name: "Salons & Wellness",
    live: true,
    accent: "#B5179E",
    accentSoft: "#D65BBE",
    money: "#E0B341",

    heroEyebrow: "FOR SALONS, SPAS AND WELLNESS",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "An empty chair at 4pm {serif}is money you never get back.{/serif}",
    heroSub:
      "No-shows leave gaps, bookings come from five places at once, and the client who loved their cut is never reminded to return. We build the calendar that fills itself, rebooks every client, and lets them see the look before they sit down.",

    meta: {
      title: "For Salons and Wellness · Deeper Designs",
      description:
        "An empty chair at 4pm is money you never get back. We build the calendar that fills itself, rebooks every client, and stops the no-shows.",
    },

    statPanel: {
      label:
        "WHAT A SALON LOSES TO NO-SHOWS AND CLIENTS WHO DON'T REBOOK, EVERY MONTH",
      target: 250000,
      caption:
        "Chairs left empty by no-shows, missed calls during a service, and regulars who simply were never reminded to come back.",
      rows: [
        { k: "Appointments lost to no-shows", v: "more than you think" },
        { k: "Calls missed during a service", v: "every busy day" },
        { k: "Clients never reminded to rebook", v: "most" },
      ],
    },

    nowHeadline: "The work is great. {serif}The chair sits empty anyway.{/serif}",
    nowIntro:
      "A salon lives on a full chair and a returning client. Here is where both quietly slip.",
    nowItems: [
      {
        label: "THE NO-SHOW",
        title: "A gap you find out about at 4pm",
        body: "A booking is made, then forgotten. No reminder went out, the client did not come, and a prime slot sits empty with no time to fill it.",
        stat: "prime slots lost to no-shows",
      },
      {
        label: "THE MISSED CALL",
        title: "Both hands were busy",
        body: "The phone rings mid-service. Nobody can answer, the caller wanted to book, and they call the salon down the road instead.",
        stat: "bookings lost to a busy chair",
      },
      {
        label: "THE CLIENT WHO DRIFTED",
        title: "Loved the cut, never came back",
        body: "A happy client left six weeks ago. No reminder, no nudge, and they are now overdue and drifting to whoever is nearest. The relationship just fades.",
        stat: "regulars never rebooked",
      },
      {
        label: "THE BOOKING CHAOS",
        title: "Five places at once",
        body: "Walk-ins, calls, Instagram DMs, a paper diary. Double-bookings happen, staff schedules clash, and nobody has the real picture of the day.",
        stat: "bookings scattered everywhere",
      },
    ],

    aiHeadline: "Same chairs. Same hands. {serif}Nothing sits empty.{/serif}",
    aiIntro:
      "Not a clunky booking app. A system shaped to how a salon's day actually runs.",
    aiItems: [
      {
        label: "FILLED AND CONFIRMED",
        title: "Reminders that stop no-shows",
        body: "Every booking is confirmed and reminded, with a deposit option for prime slots, and a cancellation gets offered to the waitlist before the chair goes cold.",
        stat: "the chair, kept full",
      },
      {
        label: "ALWAYS ANSWERED",
        title: "A receptionist for the missed call",
        body: "An assistant answers the call you cannot, books the slot, and confirms on WhatsApp, so a busy chair never costs you a booking.",
        stat: "every booking caught",
      },
      {
        label: "REBOOKED ON TIME",
        title: "The regular brought back",
        body: "Clients get a warm reminder when they are due, tied to what they had last time, so the regular returns instead of drifting away.",
        stat: "regulars who come back",
      },
      {
        label: "ONE CALENDAR",
        title: "Every booking, every chair",
        body: "Walk-ins, calls and DMs land in one calendar with staff schedules and no double-bookings. You finally see the whole day.",
        stat: "the day, finally clear",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "SMART CALENDAR",
        demo: "SalonsCalendarDemo",
        frame: "browser",
        shot: "/builds/salons/calendar.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.glowstudio.in/calendar",
        headline: "A calendar that fills itself {serif}and stays full.{/serif}",
        body: "Bookings from every source in one place, confirmations and reminders that stop no-shows, and cancellations refilled from the waitlist before the chair goes cold.",
        bullets: [
          "Walk-ins, calls and DMs <b>in one calendar</b>",
          "Confirmations and reminders, <b>deposits on prime slots</b>",
          "Cancellations <b>refilled from the waitlist</b>",
          "Staff schedules, <b>no double-bookings</b>",
        ],
      },
      {
        index: "02",
        kicker: "BOOKING ASSISTANT",
        demo: "SalonsBookingAssistantDemo",
        frame: "phone",
        shot: "/builds/salons/booking-assistant.png",
        shotW: 390,
        shotH: 844,
        headline: "The booking you'd have missed, {serif}caught anyway.{/serif}",
        body: "An assistant answers the call and the DM you cannot reach mid-service, books the slot, and confirms on WhatsApp, so the busy chair never costs you a client.",
        bullets: [
          "Answers <b>calls and Instagram DMs</b>",
          "Books and <b>confirms on WhatsApp</b>",
          "Knows your <b>services, prices and slots</b>",
          "Never lets a <b>busy chair lose a booking</b>",
        ],
      },
      {
        index: "03",
        kicker: "REBOOK ENGINE",
        demo: "SalonsRebookDemo",
        frame: "browser",
        shot: "/builds/salons/rebook.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.glowstudio.in/clients",
        headline: "The regular who drifted, {serif}back in the chair.{/serif}",
        body: "Clients get a warm, well-timed nudge when they are due, tied to what they had last time, so they return instead of drifting to whoever is nearest.",
        bullets: [
          "Rebooking nudges <b>timed to the service</b>",
          "Personalised to <b>their last visit</b>",
          "Win-back for <b>lapsed clients</b>",
          "Memberships and packages, <b>tracked</b>",
        ],
      },
      {
        index: "04",
        kicker: "STUDIO DESK",
        demo: "SalonsStudioDeskDemo",
        frame: "browser",
        shot: "/builds/salons/studio-desk.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.glowstudio.in/today",
        headline: "The chair, the staff, the day, {serif}on one screen.{/serif}",
        body: "Revenue, staff commissions, inventory and the day's chairs in one view, so the salon runs like a business instead of a busy room.",
        bullets: [
          "Revenue and <b>chair utilisation</b>, live",
          "<b>Staff commission</b> worked out automatically",
          "<b>Product inventory</b> deducted as used",
          "The day's <b>load at a glance</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a busy multi-chair salon. Cutting no-shows and rebooking lapsed clients usually covers the build inside a month. We size it to your chairs in the first call.",
      before: [
        { k: "Prime slots lost to no-shows", v: "₹90,000" },
        { k: "Bookings missed on busy days", v: "₹60,000" },
        { k: "Regulars who never rebooked", v: "₹80,000" },
        { k: "Owner and front-desk admin time", v: "₹20,000" },
      ],
      beforeTotal: { k: "Walking out the door", v: "₹2,50,000" },
      after: [
        { k: "No-shows cut by reminders and deposits", v: "₹80,000" },
        { k: "Missed bookings captured", v: "₹55,000" },
        { k: "Regulars rebooked", v: "₹70,000" },
        { k: "Admin time freed", v: "₹18,000" },
      ],
      afterTotal: { k: "Back in the chair", v: "₹2,23,000" },
      note: "Ranges from common salon and wellness patterns, not a single client. No-show reduction alone often pays for the build.",
    },

    personasHeadline: "Different chairs. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every salon and studio loses it somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote: "A no-show at 4pm is a prime slot I can never sell again that day.",
        persona: "Hair salon owner",
        tag: "Smart Calendar",
      },
      {
        quote: "The phone rings while my hands are in someone's hair, and that booking is gone.",
        persona: "Unisex salon",
        tag: "Booking Assistant",
      },
      {
        quote: "Clients love the work but I have no way to remind them it is time to come back.",
        persona: "Spa owner",
        tag: "Rebook Engine",
      },
      {
        quote: "Walk-ins, calls and Instagram DMs, and somehow I still get double-booked.",
        persona: "Beauty studio",
        tag: "Smart Calendar",
      },
      {
        quote: "Working out staff commissions every month is its own part-time job.",
        persona: "Multi-chair salon",
        tag: "Studio Desk",
      },
      {
        quote: "My regulars drift to whoever is nearest because nobody nudged them.",
        persona: "Wellness and grooming studio",
        tag: "Rebook Engine",
      },
    ],

    cta: {
      headline: "Not sure where your chairs sit empty? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your salon actually runs a day and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for salons and studios. Pick what fits, or let us point you.",
      chips: [
        "Smart Calendar",
        "Booking Assistant",
        "Rebook Engine",
        "Studio Desk",
        "Membership and Packages",
        "Look Preview",
        "Reviews and Reputation",
        "Staff Commission",
        "Inventory Tracking",
        "Loyalty Program",
        "WhatsApp Reminders",
        "Walk-in Capture",
      ],
    },

    anishNote:
      "A salon's best asset is the regular who loves their stylist, and it is the one asset nobody is protecting. A single warm nudge at the right week is the difference between a regular and a stranger.",
    pullQuote: {
      quote:
        "The empty chair at four was never a marketing problem. It was a reminder that never went out and a regular nobody asked back.",
      attribution: "DEEPER DESIGNS · FOR SALONS",
    },
  },
  // =====================================================================
  // 13 · LOGISTICS & FLEET · fully built (v19.5)
  // =====================================================================
  {
    slug: "logistics",
    name: "Logistics & Fleet",
    live: true,
    accent: "#F59F00",
    accentSoft: "#FFC04D",
    money: "#E0B341",

    heroEyebrow: "FOR LOGISTICS AND FLEET",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline:
      "Your fleet runs on WhatsApp groups and registers. {serif}That is where the money leaks.{/serif}",
    heroSub:
      "Drivers chased for updates all day, proof of delivery on paper, fuel and freight bills nobody can verify. We build the control room that sees every trip and flags every leak.",

    meta: {
      title: "For Logistics and Fleet · Deeper Designs",
      description:
        "Your fleet runs on WhatsApp groups and registers, and that is where the money leaks. We build the control room that sees every trip and flags every leak.",
    },

    statPanel: {
      label:
        "WHAT A FLEET LOSES TO BLIND TRIPS AND UNCHECKED BILLS, EVERY MONTH",
      target: 600000,
      caption:
        "Coordination calls that eat the day, fuel and freight no one can verify, and disputes lost for want of proof.",
      rows: [
        { k: "Daily calls chasing driver updates", v: "dozens" },
        { k: "Fuel as a share of operating cost", v: "35 to 40%" },
        { k: "Proof of delivery on paper", v: "still" },
      ],
    },

    nowHeadline: "The trucks move. {serif}The visibility does not.{/serif}",
    nowIntro:
      "A transport business runs on trips, proof and bills, and right now all three live on paper and phone calls. Here is where it leaks.",
    nowItems: [
      {
        label: "THE BLIND TRIP",
        title: "Chasing drivers all day",
        body: "Where is the truck, has it loaded, did it deliver. You find out by calling the driver, again and again. Dozens of calls a day just to know what is happening.",
        stat: "the day lost to coordination calls",
      },
      {
        label: "THE PAPER POD",
        title: "Proof you cannot find",
        body: "Delivery is confirmed on a paper slip that arrives days later, if at all. A payment dispute comes up and the proof is in a folder in another city.",
        stat: "disputes lost for want of proof",
      },
      {
        label: "THE FUEL LEAK",
        title: "A third of cost, unchecked",
        body: "Fuel is the biggest line and the least watched. Skimming, wrong routes and idle running quietly eat the margin, and the numbers only show up at month end.",
        stat: "fuel leaks, caught too late",
      },
      {
        label: "THE FREIGHT BILL",
        title: "Overcharged and unverified",
        body: "Freight invoices and detention charges come in and get paid because checking each one by hand is impossible. Overbilling slips straight through.",
        stat: "bills paid without a check",
      },
    ],

    aiHeadline: "Same trucks. Same routes. {serif}Nothing unaccounted for.{/serif}",
    aiIntro:
      "Not a heavy enterprise TMS. A control layer that makes every trip and every rupee visible.",
    aiItems: [
      {
        label: "EVERY TRIP VISIBLE",
        title: "A control room, not a phone",
        body: "Live status on every trip in one screen, with WhatsApp tracking links for drivers and customers, so you stop calling to ask where the truck is.",
        stat: "the fleet, finally visible",
      },
      {
        label: "PROOF, INSTANT",
        title: "Delivery confirmed on the spot",
        body: "Drivers capture proof of delivery from the phone the moment it lands, with exceptions flagged, so a dispute is settled with a tap, not a folder.",
        stat: "proof, the instant it happens",
      },
      {
        label: "FUEL, WATCHED",
        title: "Leaks flagged as they happen",
        body: "Fuel, route and idle anomalies surfaced as they occur, not at month end, so the biggest cost line finally gets watched.",
        stat: "the fuel leak, caught early",
      },
      {
        label: "BILLS, CHECKED",
        title: "Overbilling caught automatically",
        body: "Freight invoices and detention charges checked against the trip automatically, so overbilling is flagged before you pay it.",
        stat: "every bill, verified",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "CONTROL ROOM",
        demo: "LogisticsControlRoomDemo",
        frame: "browser",
        shot: "/builds/logistics/control-room.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.sharmatransport.in/control",
        headline: "Every trip on one screen, {serif}no more chasing.{/serif}",
        body: "Live status on every trip in one dashboard, with WhatsApp tracking links for drivers and customers, so you stop spending the day on the phone asking where the truck is.",
        bullets: [
          "Live status on <b>every trip and vehicle</b>",
          "<b>WhatsApp tracking links</b>, no app to install",
          "Dispatch and <b>allocation in one place</b>",
          "Delays and exceptions <b>flagged</b>",
        ],
      },
      {
        index: "02",
        kicker: "EPOD",
        demo: "LogisticsEpodDemo",
        frame: "phone",
        shot: "/builds/logistics/epod.png",
        shotW: 390,
        shotH: 844,
        headline: "Proof of delivery, {serif}the moment it lands.{/serif}",
        body: "Drivers capture proof from the phone the instant a delivery happens, with exceptions flagged, so a payment dispute is settled with a tap instead of a hunt through folders.",
        bullets: [
          "Proof captured <b>from the driver's phone</b>",
          "<b>Photo, signature and time-stamp</b>",
          "Exceptions and <b>short-deliveries flagged</b>",
          "A dispute settled <b>with a tap</b>",
        ],
      },
      {
        index: "03",
        kicker: "FUEL AND ROUTE WATCH",
        demo: "LogisticsFuelWatchDemo",
        frame: "browser",
        shot: "/builds/logistics/fuel-watch.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.sharmatransport.in/fuel",
        headline: "The biggest cost line, {serif}finally watched.{/serif}",
        body: "Fuel, route and idle anomalies surfaced as they happen, not at month end, so skimming and wasteful running get caught while you can still act.",
        bullets: [
          "<b>Fuel anomalies</b> flagged as they occur",
          "<b>Route deviation and idle</b> running surfaced",
          "Cost per <b>trip and per kilometre</b>",
          "Savings, <b>measured not guessed</b>",
        ],
      },
      {
        index: "04",
        kicker: "FREIGHT AUDIT",
        demo: "LogisticsFreightAuditDemo",
        frame: "browser",
        shot: "/builds/logistics/freight-audit.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.sharmatransport.in/audit",
        headline: "Every invoice checked, {serif}before you pay it.{/serif}",
        body: "Freight invoices, detention and other charges checked against the actual trip automatically, so overbilling is flagged before it leaves your account.",
        bullets: [
          "Invoices matched to the <b>actual trip</b>",
          "<b>Detention and extra charges</b> verified",
          "<b>Overbilling flagged</b> for review",
          "E-way bill and <b>compliance</b>, in order",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a mid-size transporter running a few dozen vehicles. Catching fuel and freight leaks usually covers the build inside a quarter. We size it to your fleet in the first call.",
      before: [
        { k: "Time lost to coordination calls", v: "₹1,20,000" },
        { k: "Fuel skimming and idle running", v: "₹2,40,000" },
        { k: "Overbilling paid unchecked", v: "₹1,60,000" },
        { k: "Disputes lost for want of proof", v: "₹80,000" },
      ],
      beforeTotal: { k: "Leaking every month", v: "₹6,00,000" },
      after: [
        { k: "Coordination time freed", v: "₹1,10,000" },
        { k: "Fuel leaks caught early", v: "₹2,10,000" },
        { k: "Overbilling flagged before payment", v: "₹1,40,000" },
        { k: "Disputes won with instant proof", v: "₹70,000" },
      ],
      afterTotal: { k: "Back in the business", v: "₹5,30,000" },
      note: "Ranges from common road-transport patterns, not a single client. Fuel and freight-audit gains alone usually pay for the build inside a quarter.",
    },

    personasHeadline: "Different fleets. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every transporter leaks somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote: "I spend my whole day calling drivers just to know where the trucks are.",
        persona: "Mid-size transporter",
        tag: "Control Room",
      },
      {
        quote: "A payment dispute comes up and the proof of delivery is a paper slip in another city.",
        persona: "Fleet owner",
        tag: "ePOD",
      },
      {
        quote: "Fuel is forty percent of my cost and I only see the leak at month end.",
        persona: "Long-haul operator",
        tag: "Fuel and Route Watch",
      },
      {
        quote: "Freight and detention bills come in and I pay them because I cannot check each one.",
        persona: "Logistics contractor",
        tag: "Freight Audit",
      },
      {
        quote: "Everything runs on WhatsApp groups and a register, and nothing is really tracked.",
        persona: "Small fleet owner",
        tag: "Control Room",
      },
      {
        quote: "Customers keep calling to ask where their shipment is, and I have no quick answer.",
        persona: "Last-mile distributor",
        tag: "Control Room",
      },
    ],

    cta: {
      headline: "Not sure where your fleet leaks? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your fleet actually runs a day and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for transporters and fleets. Pick what fits, or let us point you.",
      chips: [
        "Control Room",
        "ePOD",
        "Fuel and Route Watch",
        "Freight Audit",
        "Dispatch and Allocation",
        "Customer Tracking Links",
        "Driver App",
        "E-way Bill Compliance",
        "Maintenance Scheduler",
        "Trip Profitability",
        "Detention Tracking",
        "WhatsApp Status Updates",
      ],
    },

    anishNote:
      "Fuel is forty percent of the cost and the least watched number in the business. Every transporter knows it leaks. Almost none can see where, until the month is already gone.",
    pullQuote: {
      quote:
        "The fleet was never short on trucks. It was short on knowing where they were, what they burned, and whether the freight bill was even honest.",
      attribution: "DEEPER DESIGNS · FOR LOGISTICS",
    },
  },
  // =====================================================================
  // 09 · AUTOMOTIVE (DEALERS & SERVICE) · fully built (v19.4)
  // =====================================================================
  {
    slug: "automotive",
    name: "Automotive",
    live: true,
    accent: "#C92A2A",
    accentSoft: "#E36464",
    money: "#E0B341",

    heroEyebrow: "FOR AUTO DEALERS AND SERVICE",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "You sell a 15 lakh car {serif}with photos shot in a dusty lot.{/serif}",
    heroSub:
      "Buyers scroll past dull listings, test-drive enquiries go cold, and the service bay forgets to call them back. We build the showroom-grade shots, the bookings that get answered, and the service desk that runs on WhatsApp.",

    meta: {
      title: "For Automotive Dealers and Service · Deeper Designs",
      description:
        "You sell a fifteen lakh car with photos shot in a dusty lot. We build the showroom-grade shots, the bookings that get answered, and the service desk that runs on WhatsApp.",
    },

    statPanel: {
      label:
        "WHAT A DEALER LOSES TO WEAK LISTINGS AND MISSED FOLLOW-UPS, EVERY MONTH",
      target: 1800000,
      caption:
        "Test-drive enquiries that went cold, service customers never reminded, and listings that looked like everyone else's.",
      rows: [
        { k: "Enquiries that never got a callback", v: "too many" },
        { k: "Service customers never reminded", v: "most" },
        { k: "Cars shot on a phone in the lot", v: "nearly all" },
      ],
    },

    nowHeadline: "The car is worth lakhs. {serif}The listing looks like a classified.{/serif}",
    nowIntro:
      "A dealership runs on showroom footfall, test drives and service returns. Here is where each one slips.",
    nowItems: [
      {
        label: "THE DULL LISTING",
        title: "Shot in a dusty lot",
        body: "Phone photos against a wall, bad light, a number plate showing. A fifteen lakh car looks like a roadside classified, and the buyer scrolls to the dealer with real photos.",
        stat: "listings that look cheap",
      },
      {
        label: "THE COLD TEST DRIVE",
        title: "Nobody called back",
        body: "A buyer asks for a test drive online. The enquiry sits in someone's WhatsApp, the callback never happens, and they book one with the dealer down the road.",
        stat: "test-drive enquiries gone cold",
      },
      {
        label: "THE FORGOTTEN SERVICE",
        title: "The bay never called",
        body: "A customer is due for a service or insurance renewal. No reminder goes out, they go to a local garage, and you lose the recurring revenue the showroom was built on.",
        stat: "service customers drifting away",
      },
      {
        label: "THE BUSY SERVICE DESK",
        title: "The phone, the queue, the chaos",
        body: "Service status updates, pickup times and approvals all happen by phone tag. Customers call to ask if the car is ready, and the desk drowns.",
        stat: "service run on phone tag",
      },
    ],

    aiHeadline: "Same cars. Same bay. {serif}Nothing left on the lot.{/serif}",
    aiIntro:
      "Not a heavy DMS. A layer that makes the inventory sell and the service desk run itself.",
    aiItems: [
      {
        label: "SHOT TO SELL",
        title: "Showroom-grade in minutes",
        body: "Lot photos become clean showroom-grade shots, backgrounds replaced, plates blurred, plus a smooth walkaround video for every car. Your listings finally look like the price.",
        stat: "inventory that looks the part",
      },
      {
        label: "ANSWERED FAST",
        title: "Every test drive booked",
        body: "A test-drive enquiry gets an instant response and a booked slot, confirmed on WhatsApp, so the lead never cools waiting for a callback.",
        stat: "test drives, booked not lost",
      },
      {
        label: "SERVICE THAT RETURNS",
        title: "Reminded at the right time",
        body: "Service, insurance and warranty reminders go out automatically, so the customer comes back to you instead of the local garage.",
        stat: "recurring revenue, kept",
      },
      {
        label: "THE DESK, AUTOMATED",
        title: "Status and bookings on WhatsApp",
        body: "A service advisor on WhatsApp handles status, approvals and pickup, so customers stop calling to ask and the desk stops drowning.",
        stat: "the service bay, calm",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "WALKAROUND",
        demo: "AutomotiveWalkaroundDemo",
        frame: "video",
        poster: "/builds/automotive/walkaround-poster.webp",
        video: "/videos/automotive/walkaround.mp4",
        videoAspect: "9:16",
        videoDuration: "0:05",
        headline: "Your car, showroom-grade, {serif}turning in the light.{/serif}",
        body: "Lot photos become clean showroom shots and a smooth walkaround video for every car. The fifteen lakh machine finally looks like fifteen lakh.",
        bullets: [
          "Lot photo to <b>showroom-grade shot</b>",
          "<b>Backgrounds replaced, plates blurred</b>",
          "A smooth <b>360 walkaround video</b> per car",
          "Listing-ready <b>the day it arrives on the lot</b>",
        ],
      },
      {
        index: "02",
        kicker: "TEST-DRIVE DESK",
        demo: "AutomotiveTestDriveDeskDemo",
        frame: "browser",
        shot: "/builds/automotive/test-drive-desk.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.highwaymotors.in/sales",
        headline: "Every enquiry answered, {serif}every test drive booked.{/serif}",
        body: "A test-drive or buying enquiry gets an instant response and a confirmed slot on WhatsApp, so the lead never cools waiting on a callback.",
        bullets: [
          "Enquiries from <b>portals, site and WhatsApp</b>, unified",
          "Instant response and a <b>booked test-drive slot</b>",
          "<b>Confirmed and reminded</b> on WhatsApp",
          "Hot buyers <b>surfaced to the sales team</b>",
        ],
      },
      {
        index: "03",
        kicker: "SERVICE RECALL",
        demo: "AutomotiveServiceRecallDemo",
        frame: "phone",
        shot: "/builds/automotive/service-recall.png",
        shotW: 390,
        shotH: 844,
        headline: "They come back to you, {serif}not the local garage.{/serif}",
        body: "Service, insurance and warranty reminders go out on WhatsApp at the right time, so the recurring revenue the showroom was built on actually returns.",
        bullets: [
          "<b>Service and insurance reminders</b>, automatic",
          "Timed to the <b>car and the kilometres</b>",
          "<b>Book the slot</b> from the message",
          "Lapsed customers <b>brought back</b>",
        ],
      },
      {
        index: "04",
        kicker: "SERVICE DESK",
        demo: "AutomotiveServiceDeskDemo",
        frame: "browser",
        shot: "/builds/automotive/service-desk.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.highwaymotors.in/service",
        headline: "Status, approvals and pickup, {serif}off the phone.{/serif}",
        body: "A service advisor on WhatsApp handles status updates, repair approvals and pickup times, so customers stop calling to ask and the desk stops drowning.",
        bullets: [
          "<b>Live service status</b> to the customer",
          "<b>Repair approvals</b> on WhatsApp",
          "Pickup and delivery <b>scheduled</b>",
          "The whole bay <b>on one screen</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a single dealership with a service bay. Given the ticket sizes, one extra car sold or a season of retained service covers the build. We size it to your numbers in the first call.",
      before: [
        { k: "Test-drive enquiries gone cold", v: "₹8,00,000 pipeline" },
        { k: "Service customers lost to local garages", v: "₹5,00,000" },
        { k: "Listings underperforming", v: "₹4,00,000 pipeline" },
        { k: "Shoot and video production", v: "₹1,00,000" },
      ],
      beforeTotal: { k: "Slipping away", v: "₹18,00,000" },
      after: [
        { k: "Faster response, more test drives", v: "₹7,00,000" },
        { k: "Service customers retained", v: "₹4,50,000" },
        { k: "Listings that pull enquiry", v: "₹3,60,000" },
        { k: "Shoot cost removed", v: "₹90,000" },
      ],
      afterTotal: { k: "Back in the dealership", v: "₹16,00,000" },
      note: "Mix of pipeline and recurring service revenue, not booked sales. One extra car or a retained service season usually covers the build.",
    },

    personasHeadline: "Different dealers. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every dealership and service centre leaks somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote: "My listings look like roadside classifieds next to the big dealer's photos.",
        persona: "Used-car dealer",
        tag: "Walkaround",
      },
      {
        quote: "Test-drive enquiries sit in WhatsApp and half never get a callback.",
        persona: "New-car dealership",
        tag: "Test-Drive Desk",
      },
      {
        quote: "Customers come once for service and then drift to the cheap local garage.",
        persona: "Multi-brand service centre",
        tag: "Service Recall",
      },
      {
        quote: "My service desk spends all day telling people whether their car is ready.",
        persona: "Authorised service centre",
        tag: "Service Desk",
      },
      {
        quote: "I cannot shoot every car properly, so the good ones look ordinary online.",
        persona: "Pre-owned luxury dealer",
        tag: "Walkaround",
      },
      {
        quote: "Insurance and warranty renewals lapse because nobody reminds the customer.",
        persona: "Two-wheeler dealership",
        tag: "Service Recall",
      },
    ],

    cta: {
      headline: "Not sure where your dealership leaks? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your showroom and service bay actually run and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for dealers and service centres. Pick what fits, or let us point you.",
      chips: [
        "Walkaround",
        "Test-Drive Desk",
        "Service Recall",
        "Service Desk",
        "Inventory Microsite",
        "Finance and EMI Calculator",
        "Exchange Valuation",
        "Parts Inventory",
        "WhatsApp Sales Assistant",
        "Insurance Renewal Engine",
        "Reviews and Reputation",
        "Walk-in Capture",
      ],
    },

    anishNote:
      "A dealership makes its real money on the second visit, the service, the renewal, the next car. Yet almost no dealer has a way to bring that customer back. The whole business is built on a relationship nobody is keeping.",
    pullQuote: {
      quote:
        "The buyer judged a fifteen lakh car by a photo shot against a dusty wall, and quietly scrolled to the dealer who made it look like the price.",
      attribution: "DEEPER DESIGNS · FOR AUTOMOTIVE",
    },
  },
  // =====================================================================
  // 10 · HOTELS & HOSPITALITY · fully built (v19.4)
  // =====================================================================
  {
    slug: "hotels",
    name: "Hotels & Hospitality",
    live: true,
    accent: "#9B5DE5",
    accentSoft: "#BC8DEF",
    money: "#E0B341",

    heroEyebrow: "FOR HOTELS AND HOSPITALITY",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "OTAs take a fifth of every booking {serif}and own your guest.{/serif}",
    heroSub:
      "Booking.com and the rest take their cut, your photos do not do the property justice, and the guest who loved their stay belongs to the platform, not to you. We build the direct-booking engine and the concierge that brings them back.",

    meta: {
      title: "For Hotels and Hospitality · Deeper Designs",
      description:
        "OTAs take a fifth of every booking and own your guest. We build the direct-booking engine and the concierge that brings them back.",
    },

    statPanel: {
      label:
        "WHAT A PROPERTY LOSES TO OTA COMMISSIONS AND LOST GUESTS, EVERY MONTH",
      target: 400000,
      caption:
        "The commission on every OTA booking, the direct bookings you never captured, and the guests you cannot contact again.",
      rows: [
        { k: "Commission on every OTA booking", v: "15 to 25%" },
        { k: "Guests you can rebook directly", v: "almost none" },
        { k: "Enquiries answered after they booked elsewhere", v: "many" },
      ],
    },

    nowHeadline: "The stay is lovely. {serif}The platform keeps the guest.{/serif}",
    nowIntro:
      "A property runs on bookings, reviews and repeat guests. Here is where the platforms quietly take the relationship.",
    nowItems: [
      {
        label: "THE OTA CUT",
        title: "A fifth of every booking, gone",
        body: "Every booking through an OTA hands over 15 to 25 percent, and the guest details belong to the platform, not to you. You cannot even thank them directly.",
        stat: "a fifth of revenue, to the platform",
      },
      {
        label: "THE FLAT PHOTOS",
        title: "They do not do it justice",
        body: "Phone photos of the rooms under bad light. The property looks ordinary next to the one with a real shoot, and the booking goes there.",
        stat: "listings that undersell the stay",
      },
      {
        label: "THE SLOW ENQUIRY",
        title: "Answered after they booked",
        body: "A guest messages with a question at night. By the time someone replies in the morning, they have already booked elsewhere.",
        stat: "enquiries answered too late",
      },
      {
        label: "THE LOST GUEST",
        title: "Loved it, never came back",
        body: "A guest had a wonderful stay. No way to reach them, no reason to return sent. Next time they book through the platform again, and you pay the cut again.",
        stat: "repeat guests, never recalled",
      },
    ],

    aiHeadline: "Same property. Same warmth. {serif}The guest, back with you.{/serif}",
    aiIntro:
      "Not a heavy PMS. A layer that captures the direct booking and keeps the guest yours.",
    aiItems: [
      {
        label: "BOOKED DIRECT",
        title: "Off the commission",
        body: "A direct-booking engine on your own site and WhatsApp, with payment, so guests book with you instead of handing a fifth to the platform.",
        stat: "the booking, finally yours",
      },
      {
        label: "SHOT TO SELL",
        title: "The property at its best",
        body: "Phone photos become magazine-grade room and property shots, plus a short cinematic reel, so the stay looks as good online as it feels in person.",
        stat: "a property that sells itself",
      },
      {
        label: "ANSWERED INSTANTLY",
        title: "A concierge that never sleeps",
        body: "An AI concierge answers enquiries day and night, quotes availability, and closes the booking before the guest looks elsewhere.",
        stat: "enquiries closed, not lost",
      },
      {
        label: "GUESTS WHO RETURN",
        title: "Brought back directly",
        body: "Past guests get a warm, well-timed reason to return, straight from you. Repeat stays you do not pay a platform for.",
        stat: "the guest, back direct",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "DIRECT BOOKING ENGINE",
        demo: "HotelsDirectBookingDemo",
        frame: "browser",
        shot: "/builds/hotels/direct-booking.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.banyanhouse.in/bookings",
        headline: "Your rooms, booked direct, {serif}off the commission.{/serif}",
        body: "A booking engine on your own site and WhatsApp, with live availability and payment, so guests book with you and the platform stops taking its fifth.",
        bullets: [
          "<b>Direct booking</b> on your site and WhatsApp",
          "Live <b>availability and rates</b>",
          "<b>Payment and confirmation</b> built in",
          "The guest's details, <b>finally yours</b>",
        ],
      },
      {
        index: "02",
        kicker: "PROPERTY FILM",
        demo: "HotelsPropertyFilmDemo",
        frame: "video",
        poster: "/builds/hotels/property-poster.webp",
        video: "/videos/hotels/property-film.mp4",
        videoAspect: "16:9",
        videoDuration: "0:05",
        headline: "The property at its best, {serif}before they book.{/serif}",
        body: "Phone photos become magazine-grade room and property shots and a short cinematic reel, so the stay looks as good online as it feels in person.",
        bullets: [
          "Phone photo to <b>magazine-grade room shots</b>",
          "A short <b>cinematic property reel</b>",
          "For your site, <b>OTAs and social</b>",
          "The property <b>shown at its best</b>",
        ],
      },
      {
        index: "03",
        kicker: "AI CONCIERGE",
        demo: "HotelsConciergeDemo",
        frame: "phone",
        shot: "/builds/hotels/concierge.png",
        shotW: 390,
        shotH: 844,
        headline: "A concierge that answers {serif}at two in the morning.{/serif}",
        body: "An AI concierge replies to enquiries day and night, quotes availability, and closes the booking before the guest goes back to the platform.",
        bullets: [
          "Answers <b>enquiries 24/7</b> on WhatsApp",
          "Quotes <b>availability and rates</b>",
          "<b>Closes the booking</b> in the chat",
          "Handles <b>questions through the stay</b>",
        ],
      },
      {
        index: "04",
        kicker: "GUEST RETURN",
        demo: "HotelsGuestReturnDemo",
        frame: "browser",
        shot: "/builds/hotels/guest-return.png",
        shotW: 1440,
        shotH: 900,
        demoUrl: "app.banyanhouse.in/guests",
        headline: "The guest who loved it, {serif}back without the platform.{/serif}",
        body: "Past guests get a warm, well-timed reason to return, straight from you. Repeat stays and referrals you do not pay a commission on.",
        bullets: [
          "Past guests <b>recalled at the right time</b>",
          "<b>Personalised offers</b> and seasonal nudges",
          "<b>Reviews</b> captured and answered",
          "Repeat and referral stays, <b>direct</b>",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative for a boutique property with a couple of dozen rooms. Shifting a slice of bookings to direct covers the build. We size it to your channel mix in the first call.",
      before: [
        { k: "OTA commission on bookings", v: "₹2,20,000" },
        { k: "Direct bookings never captured", v: "₹90,000" },
        { k: "Enquiries lost to slow replies", v: "₹60,000" },
        { k: "Photo and reel production", v: "₹50,000" },
      ],
      beforeTotal: { k: "Leaking every month", v: "₹4,20,000" },
      after: [
        { k: "Bookings shifted direct, off commission", v: "₹1,80,000" },
        { k: "Direct bookings captured", v: "₹80,000" },
        { k: "Enquiries closed by the concierge", v: "₹50,000" },
        { k: "Shoot cost removed", v: "₹45,000" },
      ],
      afterTotal: { k: "Back in the property", v: "₹3,55,000" },
      note: "Ranges from common hospitality patterns, not a single client. Shifting even a slice of OTA bookings to direct usually pays for the build.",
    },

    personasHeadline: "Different properties. {serif}Different leaks.{/serif}",
    personasIntro:
      "Every property loses to the platforms somewhere specific. Here is where, in their words.",
    personas: [
      {
        quote:
          "A fifth of every booking goes to the OTA, and I never even get the guest's number.",
        persona: "Boutique hotel owner",
        tag: "Direct Booking Engine",
      },
      {
        quote: "My rooms look ordinary online because I shoot them on my phone.",
        persona: "Homestay host",
        tag: "Property Film",
      },
      {
        quote: "Guests message at night and by morning they have booked somewhere else.",
        persona: "Guesthouse manager",
        tag: "AI Concierge",
      },
      {
        quote: "Guests have a wonderful stay and I have no way to ever reach them again.",
        persona: "Resort owner",
        tag: "Guest Return",
      },
      {
        quote: "The platform owns my best guests, so I pay the commission again and again.",
        persona: "Serviced-apartment operator",
        tag: "Direct Booking Engine",
      },
      {
        quote: "My property is gorgeous in person and flat in the listing photos.",
        persona: "Heritage villa host",
        tag: "Property Film",
      },
    ],

    cta: {
      headline: "Not sure where your bookings leak? {serif}That is the call.{/serif}",
      body: "Thirty minutes, no deck. Show us how your property actually runs and we will tell you which of these fits, or whether something else does. You do not have to know what you need.",
      pillsIntro:
        "A few of the things we have built for properties. Pick what fits, or let us point you.",
      chips: [
        "Direct Booking Engine",
        "Property Film",
        "AI Concierge",
        "Guest Return",
        "Channel Manager Sync",
        "Dynamic Pricing",
        "Review Management",
        "Upsell and Add-ons",
        "WhatsApp Check-in",
        "Housekeeping Dashboard",
        "Referral Program",
        "Seasonal Campaigns",
      ],
    },

    anishNote:
      "The OTA did not just take a commission, it took the guest. You served them tea, remembered their anniversary, and still cannot send them a single message. Owning that relationship back is the whole game.",
    pullQuote: {
      quote:
        "You can be fully booked through the platforms and still not own a single guest. The warmth was yours, the relationship was theirs.",
      attribution: "DEEPER DESIGNS · FOR HOTELS",
    },
  },
];

// Lookup by slug.
export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

// The other industries, for the footer-level switcher strip.
export function otherIndustries(slug: string): Industry[] {
  return INDUSTRIES.filter((i) => i.slug !== slug);
}
