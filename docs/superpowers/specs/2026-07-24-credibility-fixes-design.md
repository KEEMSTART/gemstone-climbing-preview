# Gemstone Redesign — Sub-project A: Credibility Fixes

**Date:** 2026-07-24
**Type:** Enhancement to the existing static pitch mockup
**Goal:** Make the mockup *believable* to Kim & Patty (and to the parents it targets) — real contact paths, real directions, honest placeholders, and a clear ask for the photos only they can provide.

---

## Background

The two-page mockup (`index.html`, `parties.html`) is built and looks good, but several elements are invented or non-functional in ways that undercut a pitch:

- The phone number is plain text (not tappable on mobile)
- There is no address block, map, or directions anywhere except a footer line
- Hours are guesses presented as fact
- Testimonials are invented
- **No party-room, cake, or birthday-group photos exist** anywhere on gemstoneclimbing.rocks

That last point was verified by scraping their site: the accessible photo library (~115 images on `/photos`, of which 20 were sampled before the site began returning 404s) is entirely climbing walls, gear, adult climbers, and the fitness area. Parents booking a birthday want to see *where the cake happens* — and that photo does not exist. It must come from the owners.

## Decomposition Context

This is the first of three sub-projects agreed with the user:

- **A. Credibility fixes** ← this spec
- **B. More pages** (Rates, Hours, First-Timers, Events)
- **C. Invitation generator** (the standalone showpiece)

Build order: A → B → C. A makes the pitch believable; B fills the site out with real data already gathered; C is the differentiator, best landed once the rest feels solid.

---

## 1. Photo Placeholder System

A reusable `.photo-slot` component: a soft dashed frame in the jewel palette with a camera icon and a short label. It must read as **intentional design**, not a broken image — the owners should see it and immediately understand "that's where my photo goes."

Placement:
- **One large slot** on `parties.html` — the party room itself
- **Three smaller slots** — cake/table moment, group of kids on the wall, birthday kid topping out

Each slot carries a short caption naming the shot wanted.

**Deliverable:** `PHOTO-SHOT-LIST.md` at the project root — a plain-English one-pager for Kim & Patty covering:
- The 6–8 specific photos needed, each with a one-line description. This covers the 4 on-page slots above, plus 2–4 extras to refresh the existing climbing gallery with party-flavored shots.
- Framing guidance: shoot horizontal, lights on, faces visible, avoid backlit windows
- A note to get photo permission from parents before using images of children
- A reminder that phone photos are fine — recent and real beats professional and stale

## 2. Contact & Directions

- Every phone number becomes a `tel:+12083297257` link; every email a `mailto:` link. Applies to both pages, footer and body.
- A **"Visit us"** block containing:
  - Real address: 135 5th Avenue South, Twin Falls, ID 83301
  - An embedded Google Map (iframe, no API key)
  - A **"Get Directions"** button opening Google Maps
- Placement: in the footer on both pages, and in the closing CTA band on `parties.html` (where a decided parent is looking for logistics).
- A short parking/arrival line, explicitly marked as unconfirmed.

**Constraint:** the map iframe requires internet to render. Everything else works fully offline. The block must degrade gracefully — address and directions button remain useful with no map.

## 3. Hours — Honest Handling

Current hours (Mon–Fri 3–9, Sat–Sun 10–8) are invented. They will be visibly marked as unconfirmed in the mockup (a small "hours to confirm" tag) rather than presented as fact, and listed on the shot list as information needed from the owners.

## 4. Reviews — The Honesty Rule

Attempt to source **genuinely real** public reviews with attribution (Google, Facebook, or listing sites — a 4.5★ rating is publicly reported).

**Rule:** if a review cannot be verified as real, it stays clearly labeled as a representative placeholder. Invented quotes must never be styled to read as real customer reviews. A pitch deck that shows the owners fake reviews of their own business is a credibility disaster, not a feature.

If real reviews are found: display with source attribution and the real star rating.
If not: keep the existing quotes with their current visible "representative placeholder" note.

## 5. Hero Swap

Replace the homepage hero background (currently a portrait shot, center-cropped) with the landscape wide-gym photo — big windows, blue floor, a parent and child in frame. Better composition for a wide hero, and the family presence quietly reinforces the birthday-party angle.

Source file already downloaded: `assets/source/photos/p06_Dec-2017-032.jpg` (4608×3072). Resize to ≤1600px and add as `assets/photos/home-hero.jpg`, replacing the current one.

---

## Files Affected

- `index.html` — hero (via CSS), tel/mailto links, Visit-us footer block, hours tag
- `parties.html` — photo slots, tel/mailto links, Visit-us block in CTA band, hours tag
- `styles.css` — `.photo-slot`, `.visit`, `.hours-tag` styles; hero image swap
- `assets/photos/home-hero.jpg` — replaced with landscape shot
- `PHOTO-SHOT-LIST.md` — new, project root

No JavaScript changes. No new dependencies.

## Out of Scope (YAGNI)

- A working booking form (user deliberately deferred this)
- Availability calendar
- New pages (that is sub-project B)
- The invitation generator (sub-project C)
- Sourcing or staging actual party photos — that is the owners' action item

## Verification

- Both pages render at 375 / 768 / 1280px with no horizontal overflow
- `tel:` and `mailto:` links present and correctly formatted
- Photo slots read as intentional design (visual check via screenshot)
- Map block still shows address + directions button with the iframe blocked
- Zero console errors
