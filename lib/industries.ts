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
        poster: "/builds/real-estate/film-poster.webp",
        video: "/videos/real-estate/property-film.mp4",
        videoAspect: "9:16",
        videoDuration: "0:08",
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
        "Illustrative for a broker doing a handful of closings a quarter. In real estate, one extra deal pays for the whole system. We size it to your pipeline in the first call.",
      before: [
        { k: "Leads gone cold, no second call", v: "₹6,00,000 pipeline" },
        { k: "Site visits lost to no follow-up", v: "₹4,00,000 pipeline" },
        { k: "Listings underperforming, low enquiry", v: "₹3,00,000 pipeline" },
        { k: "Shoot and video production", v: "₹80,000" },
      ],
      beforeTotal: { k: "Pipeline slipping away", v: "₹13,80,000" },
      after: [
        { k: "Faster response, more visits booked", v: "₹5,50,000" },
        { k: "Listings that pull serious enquiry", v: "₹3,20,000" },
        { k: "One more closing a quarter", v: "₹4,00,000" },
        { k: "Shoot cost removed", v: "₹70,000" },
      ],
      afterTotal: { k: "Back in your pipeline", v: "₹13,40,000" },
      note: "Pipeline ranges, not booked revenue. One extra closing usually covers the build several times over.",
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
    accent: "#F25F4C",
    accentSoft: "#FF8E7E",
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
  {
    slug: "manufacturing",
    name: "MSME Manufacturing",
    live: false,
    accent: "#E8602C",
    accentSoft: "#FF9263",
    money: "#F5B544",
    heroEyebrow: "FOR MSME MANUFACTURING",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "IndiaMART sends 50 leads. {serif}45 are junk.{/serif}",
    heroSub:
      "We build the system that finds the 5, quotes in seconds, and follows up on its own.",
    meta: {
      title: "For MSME Manufacturing · Deeper Designs",
      description:
        "IndiaMART sends 50 leads and 45 are junk. We build the system that finds the 5, quotes in seconds, and follows up on its own.",
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
        // v19.3: fal (Kling) clip is added via scripts/gen-fal-video.ts once
        // a FAL key is supplied; until then VideoFrame renders the poster.
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
  {
    slug: "ca-firms",
    name: "CA & Professional Services",
    live: false,
    accent: "#5A6ACF",
    accentSoft: "#8C97E0",
    money: "#F5B544",
    heroEyebrow: "FOR CA & PROFESSIONAL SERVICES",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "You don't have a work problem. {serif}You have a chasing-clients problem.{/serif}",
    heroSub:
      "We build the system that collects documents, tracks every filing, and ends the WhatsApp chaos.",
    meta: {
      title: "For CA & Professional Services · Deeper Designs",
      description:
        "You don't have a work problem, you have a chasing-clients problem. We build the system that collects documents, tracks every filing, and ends the WhatsApp chaos.",
    },
  },
  {
    slug: "salons",
    name: "Salons & Wellness",
    live: false,
    accent: "#D6336C",
    accentSoft: "#EE6F9C",
    money: "#F5B544",
    heroEyebrow: "FOR SALONS & WELLNESS",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "An empty chair at 4pm {serif}is money you never get back.{/serif}",
    heroSub:
      "We build the calendar that fills itself, rebooks every client, and lets them see the look before they sit down.",
    meta: {
      title: "For Salons & Wellness · Deeper Designs",
      description:
        "An empty chair at 4pm is money you never get back. We build the calendar that fills itself, rebooks every client, and lets them see the look before they sit down.",
    },
  },
  {
    slug: "logistics",
    name: "Logistics & Fleet",
    live: false,
    accent: "#F59F00",
    accentSoft: "#FFC04D",
    money: "#F5B544",
    heroEyebrow: "FOR LOGISTICS & FLEET",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline:
      "Your fleet runs on WhatsApp groups and registers. {serif}That is where the money leaks.{/serif}",
    heroSub:
      "We build the control room that sees every trip and flags every leak.",
    meta: {
      title: "For Logistics & Fleet · Deeper Designs",
      description:
        "Your fleet runs on WhatsApp groups and registers, and that is where the money leaks. We build the control room that sees every trip and flags every leak.",
    },
  },
  {
    slug: "automotive",
    name: "Automotive",
    live: false,
    accent: "#C92A2A",
    accentSoft: "#E36464",
    money: "#F5B544",
    heroEyebrow: "FOR AUTOMOTIVE",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "You sell a ₹15L car {serif}with photos shot in a dusty lot.{/serif}",
    heroSub:
      "We build the showroom-grade shots, the test-drive bookings, and the service desk that runs on WhatsApp.",
    meta: {
      title: "For Automotive · Deeper Designs",
      description:
        "You sell a ₹15L car with photos shot in a dusty lot. We build the showroom-grade shots, the test-drive bookings, and the service desk that runs on WhatsApp.",
    },
  },
  {
    slug: "hotels",
    name: "Hotels & Hospitality",
    live: false,
    accent: "#9B5DE5",
    accentSoft: "#BC8DEF",
    money: "#F5B544",
    heroEyebrow: "FOR HOTELS & HOSPITALITY",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "OTAs take a fifth of every booking {serif}and own your guest.{/serif}",
    heroSub:
      "We build the direct-booking engine and the concierge that takes them back.",
    meta: {
      title: "For Hotels & Hospitality · Deeper Designs",
      description:
        "OTAs take a fifth of every booking and own your guest. We build the direct-booking engine and the concierge that takes them back.",
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
