# CLAUDE DESIGN BRIEF: PREFLIGHT LANDING PAGE

Source 2 of the v29 build, the copy truth for `/preflight`. Where this
brief and the Claude Design HTML export differ, this brief wins.
Recorded here verbatim so the copy source lives in the repo alongside the
page it produced.

New project in the Deeper Designs design system. Single-page product site
selling a digital download. Responsive, mobile-first. Final copy is below;
do not rewrite it. Import workshop-logo-pack.zip before starting (only
claude.svg and github.svg are used here).

## WHAT THIS PAGE SELLS

Preflight, the launch audit suite for AI-built products. Five adversarial
audit protocols a builder runs themselves in a coding agent against their
own repo and live deployment, plus an operator guide, checklists, a report
template, field notes from real audits, and twelve months of protocol
refreshes. One price. Buyer enters name and email, pays through Razorpay,
receives the package by email.

## DESIGN RULES

Use the Deeper Designs design system loaded in this project. DD palette,
DD type, DD components. Do not use the Deeper Content teal. Do not borrow
from the Anish Modi system. Tone: dark, direct, technical, confident. A
product page for people who ship software, not a course page.

Layout rules, non-negotiable:

- Every heading says exactly what the section is. Benefits live in
  subheadings and points.
- Every content block is heading plus points with icons. No paragraph
  longer than two lines anywhere.
- Every section carries a graphic: icons, a UI mockup, a diagram, or a
  numbers strip. No text-only sections.
- Two UI mockups total: one desktop (the audit report) in the hero, one
  phone (the checklist) in Section 5. Both purpose-built,
  finished-looking, on DD dark surfaces. Not wireframes.
- Icons: one custom line set, uniform stroke, every icon distinct.
- Logos: claude.svg (coral #D97757, unmodified) once, in the Section 6
  tool row. Other tools in that row are mono text labels. github.svg may
  appear mono beside step 01.
- No stock photography. No illustrations of people.
- Nothing that reads as a funnel: no countdown, no struck-through price,
  no fake scarcity, no value attached to any item, no popups, no exit
  intent.
- Minimum body 18px desktop, 16px mobile. Headlines large.

Copy rules, non-negotiable:

- Zero em dashes anywhere.
- Banned words: leverage, seamless, unlock, supercharge, transformative,
  streamline, empower, effortless, elevate, revolutionize, done-for-you.
- Do not add any number, statistic, or claim not present in this brief.
  Every figure here is real and counted.
- Do not change the copy. Set it.

## SECTION 1: HERO

Eyebrow: PREFLIGHT · LAUNCH AUDIT SUITE FOR AI-BUILT PRODUCTS

H1: Audit your AI-built product before your users do.

Subheading: Five adversarial audit protocols you run yourself. Paste one
into your coding agent, point it at your live product, get a scored
verdict and a gap list.

Primary button: Get Preflight (anchors to Section 10)
Secondary link: See what's inside (anchors to Section 4)

Numbers strip, four items, large numerals, small labels:
5 protocols · 29 layers · 592 checks · 12 months of refreshes

Hero visual, right on desktop, below on mobile: a DESKTOP UI MOCKUP of an
audit report. Dark card. Top line VERDICT: NOT CERTIFIED · GRADE 1 · 2
BLOCKERS OPEN in a muted state, and beside or beneath it VERDICT:
CERTIFIED · GRADE 7 · 0 BLOCKERS OPEN in an active accent state, implying
before and after remediation. Below, a layer scorecard of nine horizontal
bars labelled Identity, API, Database, Dependencies, AI, Payments,
Secrets, Infrastructure, Privacy with scores 8, 8, 9, 8, 8, N/A, 7, 7, 7.
Below that, a three-row launch-blocker table with Pass states. All values
are illustrative interface content; never caption them as results.

## SECTION 2: WHY THIS EXISTS

Heading: AI builds fast. Preflight makes sure it ships safe.

Four points with icons:

- Roughly 45% of AI-generated code carries an OWASP Top 10 vulnerability.
  (Veracode, 2025)
- 170 apps built on one AI builder leaked user data through a security
  policy that existed but did not restrict anything. (CVE-2025-48757)
- The controls that fail most often look correctly configured. Reading the
  code passes them. Probing the live product does not.
- Preflight probes your live product with the wrong credentials, the wrong
  role, and the wrong network, then reports what actually happens.

Graphic: two panels. Left, code review with a green tick. Right, live
probe showing the same control failing.

## SECTION 3: PROOF

Heading: Tested on our own products first.

Subheading: Before launch, we ran every protocol on three live products we
built. This is what it found.

Three cards, each an icon, bold title, three short lines:

A cross-tenant data leak
/ Any free signup could read another customer's full asset library by
  changing one HTTP header.
/ Proven live: 94 rows returned from another tenant.
/ Fixed before a single external customer was onboarded.

A live credit-minting exploit
/ An anonymous caller could grant themselves 100,000 credits and delete
  other users' accounts.
/ The revoke in the code looked correct and did nothing.
/ Fixed and confirmed dead by live probe.

No recovery path
/ A production database with no backups, no point-in-time recovery, and
  hard deletes on every row.
/ Escalated to a launch blocker.
/ Fixed before launch.

Closing line: Every finding above was made by the protocols in this
package, on products we built.

## SECTION 4: WHAT'S INSIDE

Heading: Five protocols. 592 checks. Every layer scored.

Subheading: Each protocol is a complete audit prompt. Paste it, give it
inputs, let it run.

Five cards in a row (stack on mobile). Each: name, mono stat line, three
coverage lines.

SECURITY HARDENING / 9 layers · 159 checks · 6 launch blockers / Tenant
isolation, secrets in the client, authorization at the data layer, payment
webhooks, supply chain, AI endpoints and agents, infrastructure, privacy.
/ Weakest-link scored: the grade is the lowest layer, never the average.

RESILIENCE AND OPERATIONS / 6 layers · 105 checks · 5 launch blockers /
Load and capacity, backups and disaster recovery, spend caps and
denial-of-wallet, observability and incident response, data lifecycle and
migration safety, content safety.

JOURNEY / 4 layers plus sub-domains · 113 checks · 5 hard gates / Core Web
Vitals, WCAG 2.2, onboarding, conversion path, discoverability, trust
surfaces. / Mobile-first, scored on throttled 4G and a mid-tier phone.

SIGNATURE / 5 layers · 115 checks / Robustness under stress, motion,
typography, states and edge cases, interface copy. / The craft signal AI
generation leaves out, with a dated fingerprint module.

HALLMARK / 5 layers · 100 checks / Brand distinctiveness and coherence
across every surface. / Measured against evidence, not feeling.

## SECTION 5: THE OPERATOR KIT

Heading: Plus everything you need to run them.

Five points with icons, left:

- Operator guide. The access you need, the run order, how to read a
  verdict.
- Four checklists, 61 items. Pre-run inputs, the master launch-blocker
  list, silent-failure controls, re-cert triggers, and a fifteen-minute
  monthly check.
- Report template. Fill it as you go, so evidence never gets lost to a
  summary.
- Field notes. 16 findings from real audits, including the four-layer
  SECURITY DEFINER fix, the shared-tenant question, and the
  uncapped-provider check.
- 12 months of refreshes as CVEs, standards, and framework versions move.

Right: a PHONE UI MOCKUP of the launch-blocker checklist. Items with tick
states, section label MASTER LAUNCH-BLOCKER CHECKLIST, a progress
indicator. Finished interface, DD dark surface.

## SECTION 6: HOW IT WORKS

Heading: How it works

Three numbered steps with icons:

01 Open your coding agent with your repo. / Claude Code, Cowork, Cursor
agent, Codex, or any agent that can read your repo and reach your live
URL.

02 Paste one protocol as the first message. / Give it the inputs it asks
for: your live URL, two test accounts, database access.

03 Read the verdict. / It probes your live product and hands you a scored
verdict, a launch-blocker table, and a gap list with fixes and effort.

Tool row beneath: Works with: [claude.svg mono] Claude Code · Cowork ·
Cursor · Codex

## SECTION 7: WHO IT'S FOR

Heading: Built for people shipping AI-built products.

A GOOD FIT

- You built, or are building, a product with AI coding tools.
- You can run a coding agent against your own repo.
- You have access to your database and hosting consoles.
- You would rather find it yourself than read about it later.

NOT A FIT

- You only have a chat window and no repo access. The protocols need to
  run probes.
- You want someone to run the audit for you. That is a service, and we
  offer it separately.

## SECTION 8: WHAT A PASS MEANS

Heading: What a passing grade means, and what it does not.

Four points on a lifted panel:

- Passing is an evidenced floor, not a guarantee.
- The protocols prove the controls that exist and the results of the
  probes they ran.
- They cannot prove the absence of a vulnerability.
- They do not replace penetration testing, threat modeling, or legal
  counsel. They make those cheaper and shorter.

## SECTION 9: BUILT BY DEEPER DESIGNS

Heading: Built by Deeper Designs.

The brief left this section as a placeholder for DD Brain. The v29 build
spec supplied the final copy, which is what the page now carries:

- icon: building · Deeper Designs is a build studio working from Delhi and
  Dubai. We build custom software and AI systems for Indian businesses,
  shaped to how each one already works.
- icon: layers · We run four live products of our own: Outpost, Oviya
  Studio, Deeper Content and Maple Lens. Preflight was run against our own
  products before it was sold to anyone.
- icon: shield · Preflight exists because we needed it. It found a
  cross-tenant leak and a credit-minting exploit in our own products
  before launch. Now it is the protocol we ship with.
- icon: key · Everything we build is owned by the client. One price,
  agreed in writing before we start. No per-seat licence.

Link: deeperdesigns.in with the external arrow.

## SECTION 10: GET PREFLIGHT

Heading: One price. Everything included.

Price, large: ₹10,000
Below the price, one small mono line: International cards accepted.

Included list with ticks, two columns: Five audit protocols · Operator
guide · Four checklists, 61 items · Report template · Field notes, 16
findings · 12 months of refreshes

Form: Name / Email / What are you building? (optional)
Button: Pay with Razorpay
Line under button: Delivered to your inbox within 24 hours. Questions or
delays, WhatsApp us.

No struck-through price. No timer. No bonus valuations.

## SECTION 11: FAQ

Heading: Questions

Six accordion items:

What do I need to run Preflight? / A coding agent that can read your repo
and reach your live deployment, two test accounts at the same privilege
level, and access to your database and hosting consoles.

Can I run it in a plain chat window? / No. The protocols run live probes
against your product. A chat window with no repo or network access cannot
do that.

Does a passing grade mean my product is secure? / No. It means the
documented failure modes were tested and did not reproduce on audit day.
It is an evidenced floor, not a guarantee.

How often should I re-run it? / Each protocol lists its cadence and
triggers. At minimum: continuous automated scanning, a quarterly pass, a
full re-audit yearly or on any listed trigger such as a new framework
version or a new AI feature.

What are refreshes? / The protocols name specific CVEs, standards, and
framework versions. When those move, the protocols are updated. You
receive updated files for twelve months.

What is the refund policy? / There is no refund. Preflight is a digital
download and you receive the full package once payment is confirmed. Read
what is inside and who it is for before you buy.

The v29 build spec appends a seventh item to the six above:

Can I get a refund? / No. Preflight is a digital download, delivered in
full on payment, so there are no refunds.

## FOOTER

One line: Preflight is provided as-is for use against your own systems. It
does not guarantee security or any outcome. Deeper Designs accepts no
liability for results.

The v29 build spec appends: Digital download, delivered in full on
payment. No refunds.

Contact email. Link to deeperdesigns.in. Terms and privacy links.

## FINAL CHECK

- [ ] Every heading is direct. Benefits are in subheadings and points.
- [ ] No paragraph longer than two lines.
- [ ] Two UI mockups only: desktop report in hero, phone checklist in
      Section 5.
- [ ] claude.svg used once, unmodified, coral.
- [ ] Zero em dashes. Zero banned words. Zero numbers not in this brief.
- [ ] No countdown, struck price, scarcity, popup, or bonus valuation.
- [ ] Mobile verified at 390px.
