# Gemstone Climbing Center — Redesign Pitch Mockup

**Date:** 2026-06-12
**Type:** Static pitch mockup (concept to show the gym owners)
**Goal:** Make the site fun and eye-catching to drive **birthday party bookings**, while staying trustworthy enough for the **parents who actually book**.

---

## Audience & Positioning

- **Primary booker:** parents. They need clarity, trust, easy booking, safety/staff reassurance.
- **End user / draw:** kids. The look must signal "this is a fun, exciting birthday."
- **Design tension to resolve:** *playful but grown-up.* Fun is the spark (color, confetti moments, friendly copy); trust is the foundation (clean layout, real info, polished typography). Avoid chaotic kids'-pizza-place energy.

## Real Business Facts (confirmed)

- **Gemstone Climbing Center**, Twin Falls, ID — only indoor climbing gym in Southern Idaho; fully ADA accessible.
- **Contacts:** Kim & Patty — **(208) 329-7257**, kim@gemstoneclimbing.rocks, patty@gemstoneclimbing.rocks
- **Features:** 4,000+ sq ft bouldering (V0–V10), top rope (5.5–5.11d), 10 auto-belays, lead climbing w/ overhang, yoga & fitness classes, youth & adult instruction, adaptive climbing.
- **Parties:** dedicated party room (~30 people), staff hosts, space for food/cake.
- **Socials:** Facebook, Instagram, YouTube, X.
- **Pricing/packages:** not published online → use clearly realistic **placeholders**, easy to swap real numbers later.

---

## Tech & Structure

Self-contained static site, no build step. Opens in any browser; trivial to host or email to owners.

- `index.html` — redesigned homepage
- `parties.html` — dedicated birthday party page (homepage hero + teaser band link here)
- `styles.css` — shared styles
- `main.js` — vanilla JS for scroll-reveal animations and confetti (enhancement only)
- `assets/` — placeholder images / SVG gem + confetti shapes

Matches the user's single-file-HTML workflow. No frameworks.

## Visual Style — "Gem + Party Blend"

- **Palette:** jewel-tone gradients as the backbone — amethyst purple, sapphire blue, emerald — with a hot-magenta / citrine pop reserved for CTAs. Deep near-black "rock" background sections make the gem tones glow.
- **Accents:** subtle faceted-crystal shapes and sparkle glints; confetti burst on party-hero load and on "Book a Party" hover. Used as *moments*, not constant motion.
- **Typography:** chunky rounded display font for headlines (friendly, fun); clean sans for body. Big, confident headings. Generous whitespace for a polished, trustworthy feel.
- **Motion:** gentle fade/slide-up on scroll, light floating gem shapes, bouncy primary CTA. Restrained so it reads "polished," not "hyperactive."

## Homepage (`index.html`)

1. **Sticky nav** — logo; links (Climbing, Classes, Parties, Rates, Hours/Contact); persistent **"Book a Party"** button.
2. **Hero** — friendly headline over climbing-action background; dual CTAs: "Plan a Birthday Party" (primary), "Plan Your First Visit."
3. **Party teaser band** — bright jewel-gradient strip: "The most fun birthday in Twin Falls" + 3 quick selling points (staff host, party room, up to 30 guests) → button to `parties.html`. Homepage conversion magnet.
4. **What we offer** — friendly icon cards: bouldering, auto-belays, top rope, yoga/fitness, youth programs, adaptive climbing.
5. **Why Gemstone** — trust band: only gym in S. Idaho, ADA accessible, trained staff, all ages & abilities.
6. **Social proof** — a few realistic placeholder testimonial cards.
7. **Footer** — hours, address, phone, email, socials, waiver link.

## Party Page (`parties.html`)

1. **Party hero** — confetti burst on load; headline e.g. *"Birthdays that rock."*; parent-reassuring subhead (we host, you relax); CTA **"Request Your Party Date."**
2. **3 package cards** (placeholder tiers):
   - **Base Camp** — 1.5 hrs, up to 10 climbers, party room, staff host.
   - **Summit** *(most popular, highlighted)* — 2 hrs, up to 20 climbers, room, host, invites + a perk.
   - **Adventure** — 2.5 hrs, up to 30 climbers, extended room time, host, extras.
   - Each: placeholder price + "what's included" checklist.
3. **How it works** — steps: Pick a package → Request a date → We confirm + deposit → Show up & climb.
4. **Parent FAQ** — ages, shoe rental, what to bring, food/cake, can adults climb, safety/staff supervision, deposit/cancellation.
5. **Closing CTA band** — phone + simple "request a date" form mockup (name / date / guests — visual only, not wired up); repeat CTA.
6. Shared footer.

## Robustness

- **Responsive, mobile-first** (parents browse on phones).
- **Works with JavaScript disabled** — animations are enhancement-only.
- Honors **`prefers-reduced-motion`**.
- Legible contrast / accessible (fitting for an ADA-proud gym).

## Out of Scope (YAGNI)

- Real booking/payment integration, backend, or CMS.
- Real pricing (placeholders until owners provide).
- Replacing the live site / hosting setup.
- Multi-page buildout beyond the two pages above (Rates, Hours, etc. are nav links only).
