// v26 Part 6: the software index. One typed array drives /software and all
// 30 /software/[slug] pages, exactly the way lib/industries.ts drives the
// 13 /for pages. Nothing here is hand-written per page.
//
// Copy note: `does`, `categoryState`, `costAnchor` and `build` are the
// approved lines and are used verbatim. `heading` is the category name with
// a serif accent on its second half.
//
// v28: the repeated pitch sentence ("You know X software like Y? We build
// your own simple version...") is gone from the template. It appeared on
// most of the 30 pages, and read three in a row it was obviously a template.
// Each entry's own `build` line is specific and does the job alone. A short
// closing line per group, in the page template, replaces it.
//
// `integrateOnly` marks the five entries that say plainly we do not rebuild
// the thing (Tally, e-invoicing, e-way bills, GST filing, enterprise ERP).
// Those get no closing line at all; their existing text stands alone.

export const SOFTWARE_GROUPS = [
  { id: "money", title: "Money and compliance" },
  { id: "operations", title: "Stock and operations" },
  { id: "selling", title: "Selling and customers" },
  { id: "people", title: "People" },
  { id: "visibility", title: "Visibility" },
  { id: "specialist", title: "Cross-border and specialist" },
] as const;

export type SoftwareGroupId = (typeof SOFTWARE_GROUPS)[number]["id"];

// v28: two distinct cases, kept apart so the template never renders a
// commentary sentence in a product-list slot. `incumbents` is a list of real
// named products. `categoryState` is for categories where no real standalone
// product exists, and renders under its own label instead.
//
// `price` carries a verified public list price. Every figure here was read
// off the vendor's own pricing page on the date recorded; nothing is
// estimated or carried over from a blog. Categories with no `price` render
// the honest no-public-pricing line instead.
export type VerifiedPrice = {
  vendor: string;
  plan: string;
  rate: string;
  source: string;
  verifiedOn: string;
};

export type SoftwareCategory = {
  slug: string;
  name: string;
  heading: string;
  group: SoftwareGroupId;
  does: string;
  incumbents?: string[];
  categoryState?: string;
  price?: VerifiedPrice;
  costAnchor: string;
  build: string;
  integrateOnly?: boolean;
  related: string[];
  segments?: string[];
  industries?: string[];
};

export const SOFTWARE: SoftwareCategory[] = [
  // ---------- Group A: money and compliance ----------
  {
    slug: "accounting-gst",
    name: "Accounting and GST software",
    heading: "Accounting and {serif}GST software.{/serif}",
    group: "money",
    does: "Keeps your ledgers, raises GST invoices, files returns.",
    incumbents: ["Tally", "Busy", "Marg", "Zoho Books"],
    price: {
      vendor: "Tally",
      plan: "TallyPrime Gold, lifetime licence",
      rate:
        "Rs 67,500 one time, plus 18 percent GST",
      source: "tallysolutions.com",
      verifiedOn: "2026-08-31",
    },
    costAnchor:
      "TallyPrime is a one-time licence plus an annual renewal for updates.",
    build:
      "We do not replace this. Your accountant knows Tally and Tally works. We build the tools that sit on top of it and feed it clean data.",
    integrateOnly: true,
    related: ["billing-invoicing", "gst-returns", "dashboards"],
    segments: ["traders", "importers"],
  },
  {
    slug: "billing-invoicing",
    name: "Billing and invoicing",
    heading: "Billing and {serif}invoicing.{/serif}",
    group: "money",
    does: "Fast GST invoices and e-way bills from a phone or counter.",
    incumbents: ["Vyapar", "myBillBook", "Khatabook"],
    costAnchor:
      "Annual subscriptions, low cost, priced per device or user.",
    build:
      "Billing shaped to your items, your rates and your customers, connected to whatever you already use for accounts.",
    related: ["pos", "accounting-gst", "receivables"],
    segments: ["traders", "retailers"],
  },
  {
    slug: "e-invoicing",
    name: "GST e-invoicing",
    heading: "GST {serif}e-invoicing.{/serif}",
    group: "money",
    does: "Generates IRNs for invoices above the threshold.",
    incumbents: ["ClearTax", "IRIS", "GSTHero"],
    costAnchor: "Subscription, priced by invoice volume.",
    build:
      "This runs through government-authorised providers and we do not rebuild it. We connect your systems to it so nothing is typed twice.",
    integrateOnly: true,
    related: ["e-way-bill", "gst-returns", "billing-invoicing"],
    segments: ["traders", "manufacturers"],
  },
  {
    slug: "e-way-bill",
    name: "E-way bill automation",
    heading: "E-way bill {serif}automation.{/serif}",
    group: "money",
    does: "Generates e-way bills in bulk instead of one at a time.",
    categoryState:
      "The same authorised providers handle this; it is not sold as a standalone product.",
    costAnchor: "Usually bundled with e-invoicing subscriptions.",
    build:
      "We wire your dispatch process into it so the bill is generated from the data you already entered.",
    integrateOnly: true,
    related: ["e-invoicing", "transport-fleet", "warehouse"],
    segments: ["traders", "distributors"],
  },
  {
    slug: "gst-returns",
    name: "GST return filing and reconciliation",
    heading: "GST return filing {serif}and reconciliation.{/serif}",
    group: "money",
    does: "Matches purchase records against GSTR data so input credit is not lost.",
    incumbents: ["ClearTax", "IRIS"],
    costAnchor: "Annual subscription per GSTIN.",
    build:
      "Filing stays with the authorised providers. We build the reconciliation view that shows you what is mismatched and who to chase.",
    integrateOnly: true,
    related: ["accounting-gst", "e-invoicing", "dashboards"],
    segments: ["importers"],
  },
  {
    slug: "receivables",
    name: "Receivables and udhaar collection",
    heading: "Receivables and {serif}udhaar collection.{/serif}",
    group: "money",
    does: "Tracks who owes you what, for how long, and chases them.",
    incumbents: ["Recordent", "Khatabook", "spreadsheets"],
    costAnchor: "Subscription, or free tools that stop at a ledger.",
    build:
      "Ageing by customer, automatic WhatsApp reminders, promise-to-pay tracking and a payment link in the message. This is the single most common thing we are asked to build.",
    related: ["credit-control", "billing-invoicing", "whatsapp"],
    segments: ["traders", "retailers", "exporters"],
  },
  {
    slug: "credit-control",
    name: "Credit control and limits",
    heading: "Credit control {serif}and limits.{/serif}",
    group: "money",
    does: "Sets a credit limit per customer and blocks orders that cross it.",
    categoryState:
      "Usually a module inside expensive ERP, rather than something you can buy on its own.",
    costAnchor: "Rarely sold alone, comes bundled with mid-market ERP.",
    build:
      "Limits, scoring and automatic blocks, built into your own order flow instead of living in someone's head.",
    related: ["receivables", "b2b-ordering", "mid-market-erp"],
    segments: ["traders", "distributors"],
  },

  // ---------- Group B: stock and operations ----------
  {
    slug: "inventory",
    name: "Inventory and stock management",
    heading: "Inventory and {serif}stock management.{/serif}",
    group: "operations",
    does: "Tracks stock across godowns, batches and expiry.",
    incumbents: ["Tally", "Zoho Inventory", "ERPNext"],
    costAnchor: "Subscription per user per month, or bundled in ERP.",
    build:
      "Stock the way your business actually counts it, by weight, by batch, by size, by whatever your trade uses.",
    related: ["warehouse", "barcode-qr", "pos"],
    segments: ["traders", "retailers", "importers"],
  },
  {
    slug: "barcode-qr",
    name: "Barcode and QR systems",
    heading: "Barcode and {serif}QR systems.{/serif}",
    group: "operations",
    does: "Puts scannable labels on stock so counting stops being manual.",
    incumbents: ["Vyapar barcode", "Unicommerce"],
    costAnchor: "Add-on modules or subscription tiers.",
    build:
      "Label printing and scanning wired into your own stock system, on hardware you already have.",
    related: ["inventory", "warehouse", "quality-control"],
    segments: ["retailers", "manufacturers"],
  },
  {
    slug: "warehouse",
    name: "Warehouse management",
    heading: "Warehouse {serif}management.{/serif}",
    group: "operations",
    does: "Runs putaway, picking, packing and dispatch inside a warehouse.",
    incumbents: ["Unicommerce", "ERPNext"],
    costAnchor: "Subscription, priced by order volume.",
    build:
      "Pick lists, dispatch and proof of handover, built for your warehouse layout rather than a generic one.",
    related: ["inventory", "transport-fleet", "barcode-qr"],
    segments: ["distributors", "importers"],
    industries: ["logistics"],
  },
  {
    slug: "pos",
    name: "Point of sale",
    heading: "Point {serif}of sale.{/serif}",
    group: "operations",
    does: "Fast counter billing with barcode, offline capable.",
    incumbents: ["Vyapar POS", "Marg", "GoFrugal"],
    costAnchor: "Annual licence per counter.",
    build:
      "A counter screen your staff can learn in a day, that keeps working when the internet does not.",
    related: ["billing-invoicing", "inventory", "receivables"],
    segments: ["retailers"],
    industries: ["jewellery", "restaurants"],
  },
  {
    slug: "production-planning",
    name: "Production planning",
    heading: "Production {serif}planning.{/serif}",
    group: "operations",
    does: "Schedules what gets made, on which machine, in what order.",
    categoryState:
      "Modules inside mid-market ERP, rather than something you can buy on its own.",
    costAnchor: "Comes as part of ERP implementations.",
    build:
      "Job cards, machine allocation and work-in-progress visible on one screen, instead of a whiteboard and a WhatsApp group.",
    related: ["job-work", "quality-control", "quotation-cpq"],
    segments: ["manufacturers", "packaging"],
    industries: ["manufacturing"],
  },
  {
    slug: "job-work",
    name: "Job-work and subcontracting",
    heading: "Job-work and {serif}subcontracting.{/serif}",
    group: "operations",
    does: "Tracks material sent out for processing and what comes back, with GST challans.",
    categoryState: "Badly served, mostly ERP modules or Excel.",
    costAnchor: "Rarely available standalone.",
    build:
      "Challans, material sent and returned, conversion charges and reconciliation. This is one of the most Indian problems in manufacturing and one of the worst served.",
    related: ["production-planning", "inventory", "quality-control"],
    segments: ["manufacturers", "packaging"],
    industries: ["manufacturing"],
  },
  {
    slug: "quality-control",
    name: "Quality control",
    heading: "Quality {serif}control.{/serif}",
    group: "operations",
    does: "Records incoming, in-process and final inspection, and rejections.",
    categoryState:
      "Handled as a module inside ERP, rather than something you can buy on its own.",
    costAnchor: "Bundled, not sold alone.",
    build:
      "Inspection checklists on a phone at the point of work, with rejection tracking that tells you which supplier or machine is costing you.",
    related: ["production-planning", "job-work", "dashboards"],
    segments: ["manufacturers"],
    industries: ["manufacturing"],
  },
  {
    slug: "transport-fleet",
    name: "Transport, LR and fleet",
    heading: "Transport, LR {serif}and fleet.{/serif}",
    group: "operations",
    does: "Builds LRs and bilties, tracks vehicles, captures proof of delivery.",
    incumbents: ["TruckBilty", "Fretron"],
    costAnchor: "Subscription per vehicle or per user.",
    build:
      "Trip status, digital proof of delivery from the driver's phone, and one screen that shows where everything is.",
    related: ["warehouse", "e-way-bill", "dashboards"],
    industries: ["logistics"],
  },

  // ---------- Group C: selling and customers ----------
  {
    slug: "crm",
    name: "CRM",
    heading: "{serif}CRM.{/serif}",
    group: "selling",
    does: "Keeps leads, follow-ups and pipeline in one place.",
    incumbents: ["Zoho CRM", "Salesforce", "Freshsales"],
    price: {
      vendor: "Zoho CRM",
      plan: "Professional",
      rate:
        "Rs 1,400 per user per month, billed annually",
      source: "zoho.com",
      verifiedOn: "2026-08-30",
    },
    costAnchor:
      "Priced per user per month, so the bill grows every time you hire.",
    build:
      "Your pipeline, your stages, your follow-up rules, for every person in your team at no extra cost per head. The per-seat meter is the thing we remove.",
    related: ["sales-force-automation", "quotation-cpq", "dashboards"],
    segments: ["manufacturers", "traders"],
  },
  {
    slug: "sales-force-automation",
    name: "Sales force automation",
    heading: "Sales force {serif}automation.{/serif}",
    group: "selling",
    does: "Manages field sales beats, GPS attendance and order booking.",
    incumbents: ["BeatRoute", "Bizom", "FieldAssist"],
    costAnchor:
      "Priced per user per month, which adds up quickly across a field team.",
    build:
      "Beat plans, order booking that works offline in a rural market, and one dashboard showing what the field actually did today.",
    related: ["distributor-management", "b2b-ordering", "crm"],
    segments: ["distributors"],
  },
  {
    slug: "distributor-management",
    name: "Distributor management",
    heading: "Distributor {serif}management.{/serif}",
    group: "selling",
    does: "Handles primary and secondary sales, schemes and claims across a distributor network.",
    incumbents: ["FieldAssist", "Bizom"],
    costAnchor: "Quote-based, typically lakhs a year.",
    build:
      "The secondary-sales blind spot is the reason this category exists. We build the visibility, the scheme maths and the claim reconciliation, without the annual licence.",
    related: ["sales-force-automation", "loyalty-schemes", "b2b-ordering"],
    segments: ["distributors"],
  },
  {
    slug: "b2b-ordering",
    name: "B2B ordering portals",
    heading: "B2B {serif}ordering portals.{/serif}",
    group: "selling",
    does: "Lets your retailers or dealers place their own orders instead of calling.",
    categoryState: "Mostly custom, few standard products.",
    costAnchor: "Almost always a custom build even from big vendors.",
    build:
      "Your buyers order from their phone, see their own rates and credit limit, and the order lands in your system already correct.",
    related: ["dealer-portals", "distributor-management", "credit-control"],
    segments: ["distributors", "exporters", "manufacturers"],
  },
  {
    slug: "dealer-portals",
    name: "Dealer and vendor portals",
    heading: "Dealer and {serif}vendor portals.{/serif}",
    group: "selling",
    does: "Gives partners self-service access to orders, ledgers and documents.",
    categoryState:
      "Usually bespoke.",
    costAnchor: "Quoted per project.",
    build:
      "One login where a dealer sees their ledger, their claims and their dispatches, so nobody calls your office to ask.",
    related: ["b2b-ordering", "loyalty-schemes", "receivables"],
    segments: ["distributors", "manufacturers"],
  },
  {
    slug: "quotation-cpq",
    name: "Quotation and estimation",
    heading: "Quotation and {serif}estimation.{/serif}",
    group: "selling",
    does: "Turns a specification into a priced quotation with approvals.",
    categoryState: "Thin standard options, mostly custom.",
    costAnchor: "Bundled into ERP or built bespoke.",
    build:
      "Enter the specification, get a branded quotation in seconds with your rates, terms and GST. For manufacturers this is often the highest-value single tool we build.",
    related: ["crm", "production-planning", "packaging-costing"],
    segments: ["manufacturers", "packaging"],
    industries: ["manufacturing"],
  },
  {
    slug: "loyalty-schemes",
    name: "Loyalty and scheme management",
    heading: "Loyalty and {serif}scheme management.{/serif}",
    group: "selling",
    does: "Runs channel schemes, rewards and claim reconciliation.",
    incumbents: ["LoyaltyXpert", "Easyrewardz"],
    costAnchor: "Quote-based.",
    build:
      "Scheme maths that used to be a monthly Excel argument, calculated automatically and visible to the partner.",
    related: ["distributor-management", "dealer-portals", "receivables"],
    segments: ["distributors", "traders"],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp commerce and assistants",
    heading: "WhatsApp commerce {serif}and assistants.{/serif}",
    group: "selling",
    does: "Catalogues, orders, reminders and support over WhatsApp.",
    incumbents: ["AiSensy", "Interakt", "Wati"],
    costAnchor:
      "Monthly subscription plus Meta's own per-message fees.",
    build:
      "We build on the official WhatsApp API through an authorised provider. The assistant is yours and it speaks the way your business speaks.",
    related: ["receivables", "b2b-ordering", "crm"],
    segments: ["retailers", "traders"],
    industries: ["clinics", "salons", "restaurants"],
  },

  // ---------- Group D: people ----------
  {
    slug: "hrms-payroll",
    name: "HRMS, payroll and attendance",
    heading: "HRMS, payroll {serif}and attendance.{/serif}",
    group: "people",
    does: "Attendance, leave, payroll and statutory filing.",
    incumbents: ["greytHR", "Keka", "Zoho People"],
    price: {
      vendor: "greytHR",
      plan: "Growth",
      rate:
        "Rs 4,495 per month covering the first 50 employees, then Rs 85 per employee",
      source: "greythr.com",
      verifiedOn: "2026-08-30",
    },
    costAnchor:
      "Priced per employee per month, so it scales with headcount.",
    build:
      "We build attendance, leave and approvals around how your shifts actually run, and integrate the statutory filing rather than rebuilding it.",
    related: ["dashboards", "quality-control", "production-planning"],
    segments: ["manufacturers", "retailers"],
  },

  // ---------- Group E: visibility ----------
  {
    slug: "dashboards",
    name: "MIS dashboards",
    heading: "MIS {serif}dashboards.{/serif}",
    group: "visibility",
    does: "Shows the owner the daily numbers, sales, stock, receivables and cash.",
    incumbents: ["Zoho Analytics", "Power BI"],
    price: {
      vendor: "Power BI",
      plan: "Pro",
      rate:
        "Rs 1,165 per user per month, paid yearly",
      source: "microsoft.com",
      verifiedOn: "2026-08-30",
    },
    costAnchor: "Priced per viewer, so showing more people costs more.",
    build:
      "The numbers you check every morning, on one screen, pulled from Tally and everything else you use. This is our most-requested first build.",
    related: ["accounting-gst", "receivables", "inventory"],
    segments: ["manufacturers", "traders", "exporters"],
  },

  // ---------- Group F: cross-border and specialist ----------
  {
    slug: "export-documentation",
    name: "Export documentation",
    heading: "Export {serif}documentation.{/serif}",
    group: "specialist",
    does: "Produces the document stack an export shipment needs.",
    incumbents: ["Expand smERP", "CHA software"],
    costAnchor: "Licence or per-shipment fees.",
    build:
      "The document layer, generated from data you entered once. Filing continues through your CHA and the government systems, which we do not touch.",
    related: ["landed-cost", "b2b-ordering", "receivables"],
    segments: ["exporters"],
  },
  {
    slug: "landed-cost",
    name: "Import landed cost",
    heading: "Import {serif}landed cost.{/serif}",
    group: "specialist",
    does: "Works out the true per-consignment cost after duty, freight and clearing.",
    categoryState: "Mostly free calculators, no serious SME product.",
    costAnchor: "No integrated product exists at SME prices.",
    build:
      "The full duty stack calculated per consignment, so you know your real cost before you price anything. This category is close to empty and it should not be.",
    related: ["inventory", "accounting-gst", "gst-returns"],
    segments: ["importers"],
  },
  {
    slug: "packaging-costing",
    name: "Packaging job costing",
    heading: "Packaging {serif}job costing.{/serif}",
    group: "specialist",
    does: "Costs every job by material, size, wastage and process.",
    incumbents: ["Samadhan", "Finsys"],
    costAnchor:
      "Mid-market implementations, out of reach for smaller units.",
    build:
      "Per-job estimation with your board, your GSM, your wastage and your die library, so quoting stops being a guess.",
    related: ["quotation-cpq", "production-planning", "job-work"],
    segments: ["packaging"],
  },
  {
    slug: "mid-market-erp",
    name: "Mid-market ERP",
    heading: "Mid-market {serif}ERP.{/serif}",
    group: "specialist",
    does: "Joins finance and operations in one system.",
    incumbents: ["SAP Business One", "ERPNext", "Odoo"],
    price: {
      vendor: "ERPNext",
      plan: "Frappe Cloud hosting",
      rate:
        "from Rs 410 per month for hosting; the software itself is free and open source",
      source: "frappe.io",
      verifiedOn: "2026-08-31",
    },
    costAnchor:
      "Implementation projects running into lakhs, plus annual costs.",
    build:
      "Most businesses quoted for ERP need four of its forty modules. We build those four, properly, for a fraction, and connect them to your accounts.",
    related: ["inventory", "production-planning", "dashboards"],
    segments: ["manufacturers", "distributors"],
  },
  {
    slug: "enterprise-erp",
    name: "Enterprise ERP",
    heading: "Enterprise {serif}ERP.{/serif}",
    group: "specialist",
    does: "Runs everything for a large organisation.",
    incumbents: ["SAP S/4HANA", "Oracle"],
    costAnchor:
      "Implementations from tens of lakhs upward, plus annual maintenance as a percentage of licence value.",
    build:
      "If you genuinely need this, we will tell you and we will not pitch against it. Most businesses your size do not, and are being sold it anyway.",
    integrateOnly: true,
    related: ["mid-market-erp", "dashboards", "production-planning"],
    segments: ["manufacturers", "distributors"],
  },
];

export function getSoftware(slug: string): SoftwareCategory | undefined {
  return SOFTWARE.find((s) => s.slug === slug);
}

export function softwareByGroup(group: SoftwareGroupId): SoftwareCategory[] {
  return SOFTWARE.filter((s) => s.group === group);
}
