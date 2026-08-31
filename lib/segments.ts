// v26 Part 7: the B2B segments layer. One typed array drives all seven
// /business/[slug] pages. Lighter than the /for industry pages: no coded
// demos, just the pains, the builds, and links into the software index.
//
// All copy here is the approved wording and is used verbatim.

export type Segment = {
  slug: string;
  name: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  pains: string[];
  builds: string[];
  related: string[];
};

export const SEGMENTS: Segment[] = [
  {
    slug: "manufacturers",
    name: "Manufacturers",
    heading:
      "For manufacturers who run the floor {serif}on paper and memory.{/serif}",
    metaTitle: "Software for Manufacturers · Deeper Designs",
    metaDescription:
      "Quotation engines, job-work tracking, production visibility and quality checks, built around how your floor actually runs. Custom software you own.",
    pains: [
      "Enquiries turn into quotations slowly, and the buyer goes cold.",
      "Job-work material goes out on a challan and comes back on trust.",
      "Production lives on a whiteboard, not in any system.",
      "Multiple GSTINs make every report a manual join.",
    ],
    builds: [
      "Quotation engine that prices a specification in seconds.",
      "Job-work tracking with challans and reconciliation.",
      "Production and work-in-progress on one screen.",
      "Quality checks recorded at the point of work.",
    ],
    related: [
      "quotation-cpq",
      "job-work",
      "production-planning",
      "quality-control",
    ],
  },
  {
    slug: "traders",
    name: "Traders and wholesalers",
    heading:
      "For traders whose cash is stuck {serif}in other people's ledgers.{/serif}",
    metaTitle: "Software for Traders and Wholesalers · Deeper Designs",
    metaDescription:
      "Receivables tracking, per-customer rate lists, credit limits and scheme maths, built for how trading actually works. Custom software you own.",
    pains: [
      "Udhaar cycles decide your cash flow, not your sales.",
      "Every customer has a different rate and it lives in your head.",
      "Scheme calculations are argued about at month end.",
      "You find out about a bad payer far too late.",
    ],
    builds: [
      "Receivables tracking with automatic reminders and payment links.",
      "Rate lists per customer, applied automatically.",
      "Credit limits that block orders before they become losses.",
      "Scheme maths calculated, not negotiated.",
    ],
    related: [
      "receivables",
      "credit-control",
      "loyalty-schemes",
      "billing-invoicing",
    ],
  },
  {
    slug: "distributors",
    name: "Distributors",
    heading:
      "For distributors who cannot see {serif}past the first sale.{/serif}",
    metaTitle: "Software for Distributors · Deeper Designs",
    metaDescription:
      "Secondary sales visibility, retailer ordering portals, claim reconciliation and beat plans, without the annual licence. Custom software you own.",
    pains: [
      "You know your primary sales. Secondary is a black box.",
      "Orders arrive as WhatsApp messages and voice notes.",
      "Scheme claims with your principal take weeks to reconcile.",
      "Rural beats go offline and the data arrives days later.",
    ],
    builds: [
      "Secondary sales visibility from the field, offline capable.",
      "A retailer ordering portal that replaces the WhatsApp pile.",
      "Claim reconciliation that matches the principal's numbers.",
      "Beat plans and field activity on one dashboard.",
    ],
    related: [
      "distributor-management",
      "sales-force-automation",
      "b2b-ordering",
      "loyalty-schemes",
    ],
  },
  {
    slug: "retailers",
    name: "Retailers and kirana",
    heading:
      "For shops running on a paper ledger {serif}and a good memory.{/serif}",
    metaTitle: "Software for Retailers and Kirana Stores · Deeper Designs",
    metaDescription:
      "A fast offline counter screen, customer ledgers with WhatsApp reminders, and reorder alerts based on what actually sells. Custom software you own.",
    pains: [
      "Udhaar is written in a notebook and chased by memory.",
      "Fast movers go out of stock while dead stock sits.",
      "Billing slows down exactly when the shop is busiest.",
      "Most software assumes English and a good connection.",
    ],
    builds: [
      "A counter screen that is fast, offline capable and simple.",
      "Customer ledgers with WhatsApp reminders.",
      "Reorder alerts based on what actually sells.",
      "Built to work in the language your staff use.",
    ],
    related: ["pos", "receivables", "inventory", "whatsapp"],
  },
  {
    slug: "importers",
    name: "Importers",
    heading:
      "For importers who only learn their real cost {serif}after the money is gone.{/serif}",
    metaTitle: "Software for Importers · Deeper Designs",
    metaDescription:
      "Landed cost per consignment, a document trail per shipment, and stock valued at true cost rather than invoice cost. Custom software you own.",
    pains: [
      "Landed cost is a spreadsheet nobody fully trusts.",
      "Duty, freight and clearing land at different times.",
      "Input credit reconciliation is done long after pricing.",
      "Documents live across email, the CHA and a folder.",
    ],
    builds: [
      "Landed cost per consignment, calculated as costs arrive.",
      "A document trail per shipment, in one place.",
      "Credit reconciliation you can see before you price.",
      "Stock valued at true cost, not invoice cost.",
    ],
    related: ["landed-cost", "inventory", "accounting-gst", "gst-returns"],
  },
  {
    slug: "exporters",
    name: "Exporters",
    heading: "For exporters buried in {serif}the document stack.{/serif}",
    metaTitle: "Software for Exporters · Deeper Designs",
    metaDescription:
      "Document sets generated from data entered once, obligation tracking that warns you early, and realisation tracked with receivables. Custom software you own.",
    pains: [
      "Every shipment means the same documents typed again.",
      "Scheme obligations are tracked in someone's diary.",
      "Buyer communication and paperwork live in separate worlds.",
      "Realisation is chased manually across months.",
    ],
    builds: [
      "Document sets generated from data entered once.",
      "Obligation tracking with dates that warn you early.",
      "Shipment status your buyer can see without emailing.",
      "Realisation and receivables tracked together.",
    ],
    related: [
      "export-documentation",
      "receivables",
      "dashboards",
      "b2b-ordering",
    ],
  },
  {
    slug: "packaging",
    name: "Packaging and printing",
    heading:
      "For packaging units where every job {serif}is priced from scratch.{/serif}",
    metaTitle: "Software for Packaging and Printing Units · Deeper Designs",
    metaDescription:
      "Per-job costing with your materials and wastage, a searchable die and artwork library, and quotations generated from the costing. Custom software you own.",
    pains: [
      "Estimation depends on one experienced person.",
      "Wastage and trim loss are guessed, not measured.",
      "Dies and artwork are hunted for on a shared drive.",
      "Scheduling across processes is a daily argument.",
    ],
    builds: [
      "Per-job costing with your materials, sizes and wastage.",
      "A die and artwork library that is actually searchable.",
      "Process scheduling on one screen.",
      "Quotations generated from the costing, not retyped.",
    ],
    related: [
      "packaging-costing",
      "quotation-cpq",
      "production-planning",
      "job-work",
    ],
  },
];

export function getSegment(slug: string): Segment | undefined {
  return SEGMENTS.find((s) => s.slug === slug);
}
