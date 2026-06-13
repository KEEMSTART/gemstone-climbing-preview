# Gemstone Climbing Party Pitch Mockup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-page static pitch mockup for Gemstone Climbing Center that feels fun and eye-catching to drive birthday party bookings, while staying polished/trustworthy for the parents who book.

**Architecture:** Static, no build step. Two HTML pages (`index.html`, `parties.html`) sharing one stylesheet and one JS file. CSS custom properties hold the "gem + party" design tokens. JS adds scroll-reveal + confetti as progressive enhancement only — pages are fully functional and legible with JS off and with `prefers-reduced-motion`.

**Tech Stack:** Hand-written HTML5, vanilla CSS (custom properties, grid/flex, gradients), vanilla JS. Google Fonts for display + body type. No frameworks, no bundler.

**Verification approach:** This is a visual mockup, not logic — there are no unit tests. Each task is verified by opening the page in the browser preview and confirming the described result via screenshot/snapshot. Commit after each task.

**Project root:** `C:\Users\CLint\gemstone-climbing-redesign`

---

## File Structure

```
gemstone-climbing-redesign/
├── index.html        # homepage
├── parties.html      # dedicated birthday party page
├── styles.css        # all shared styles + design tokens
├── main.js           # scroll-reveal + confetti (enhancement only)
└── assets/
    └── (SVG gem/confetti shapes, placeholder images)
```

Single shared `styles.css` and `main.js` keep the two pages consistent (DRY). The files are small and focused; if `styles.css` grows past ~600 lines during the build, split into `tokens.css` + `styles.css`.

## Design Tokens (used by every task)

Define once in `:root` in `styles.css`:

```css
:root {
  /* jewel palette */
  --amethyst: #7b2ff7;
  --sapphire: #2563eb;
  --emerald:  #10b981;
  --magenta:  #ff2d9b;   /* CTA pop */
  --citrine:  #ffcb05;   /* highlight pop */
  --rock:     #0e0b1a;   /* deep near-black bg */
  --rock-2:   #1a1430;   /* raised surface */
  --ink:      #14111f;   /* body text on light */
  --paper:    #faf7ff;   /* light section bg */
  --muted:    #6b6480;

  --grad-gem: linear-gradient(120deg, var(--amethyst), var(--sapphire) 55%, var(--emerald));
  --grad-cta: linear-gradient(120deg, var(--magenta), var(--amethyst));

  --font-display: "Baloo 2", system-ui, sans-serif;  /* chunky rounded */
  --font-body: "Inter", system-ui, sans-serif;

  --radius: 18px;
  --shadow: 0 10px 30px rgba(20,10,40,.18);
  --container: 1120px;
}
```

---

## Task 1: Scaffold + design tokens + shared base styles

**Files:**
- Create: `index.html`
- Create: `parties.html`
- Create: `styles.css`
- Create: `main.js`
- Create: `assets/.gitkeep`

- [ ] **Step 1: Create `styles.css`** with: the `:root` token block above, a CSS reset (`*{box-sizing:border-box;margin:0}`), base body styles (`font-family:var(--font-body); color:var(--ink); background:var(--paper)`), `.container{max-width:var(--container);margin-inline:auto;padding-inline:20px}`, heading defaults using `--font-display`, a `prefers-reduced-motion` block that disables transitions/animations, and a `.reveal{opacity:0;transform:translateY(20px);transition:.6s}` + `.reveal.in{opacity:1;transform:none}` pair (used by JS later).

- [ ] **Step 2: Create `index.html`** skeleton: `<!doctype html>`, lang, viewport meta, `<title>Gemstone Climbing Center — Twin Falls</title>`, Google Fonts link for Baloo 2 (700,800) + Inter (400,600,700), `<link rel="stylesheet" href="styles.css">`, empty `<main>`, and `<script src="main.js" defer></script>`. Add a temporary `<h1>Gemstone — homepage</h1>` inside main so the page renders something.

- [ ] **Step 3: Create `parties.html`** identical skeleton with `<title>Birthday Parties — Gemstone Climbing Center</title>` and a temporary `<h1>Gemstone — parties</h1>`.

- [ ] **Step 4: Create `main.js`** with just a top comment and an empty `DOMContentLoaded` listener (filled in Task 5). Create `assets/.gitkeep`.

- [ ] **Step 5: Verify** — start the browser preview server on the project root, open `index.html`. Expected: fonts load, "Gemstone — homepage" renders in the rounded display font on the light background, no console errors. Open `parties.html`, confirm it renders too.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "scaffold: two pages, shared styles + design tokens"
```

---

## Task 2: Shared sticky nav + footer

Both pages share the same nav and footer markup. Build once, paste into both pages, style in `styles.css`.

**Files:**
- Modify: `index.html` (add nav + footer)
- Modify: `parties.html` (add same nav + footer)
- Modify: `styles.css`

- [ ] **Step 1: Add the nav markup** at the top of `<body>` on BOTH pages (repeat the markup; do not abstract):

```html
<header class="nav">
  <div class="container nav__inner">
    <a class="nav__logo" href="index.html">💎 Gemstone</a>
    <nav class="nav__links">
      <a href="index.html#offer">Climbing</a>
      <a href="index.html#offer">Classes</a>
      <a href="parties.html">Parties</a>
      <a href="index.html#why">Rates</a>
      <a href="index.html#footer">Hours &amp; Contact</a>
    </nav>
    <a class="btn btn--cta nav__book" href="parties.html">Book a Party</a>
  </div>
</header>
```

- [ ] **Step 2: Add the footer markup** before `</body>` on BOTH pages:

```html
<footer class="footer" id="footer">
  <div class="container footer__grid">
    <div>
      <h3>Gemstone Climbing Center</h3>
      <p>Twin Falls, Idaho — Southern Idaho's only indoor climbing gym. Fully ADA accessible.</p>
    </div>
    <div>
      <h4>Hours</h4>
      <p>Mon–Fri 3pm–9pm<br>Sat–Sun 10am–8pm</p>
    </div>
    <div>
      <h4>Contact</h4>
      <p>(208) 329-7257<br>kim@gemstoneclimbing.rocks<br>patty@gemstoneclimbing.rocks</p>
      <p class="footer__social">Facebook · Instagram · YouTube · X</p>
      <p><a href="#">Sign the waiver →</a></p>
    </div>
  </div>
  <p class="footer__note">Mockup for redesign pitch. Hours/placeholder details to be confirmed.</p>
</footer>
```

- [ ] **Step 3: Style nav** in `styles.css`: `.nav{position:sticky;top:0;z-index:50;background:rgba(14,11,26,.85);backdrop-filter:blur(8px)}`, flex `.nav__inner` (space-between, align center, gap, padding-block 12px), white logo in display font, `.nav__links` flex gap with light-on-dark links + hover to `--citrine`, hide `.nav__links` under 760px via media query. Style `.btn` base (inline-block, padding, radius, font-display, no underline) and `.btn--cta{background:var(--grad-cta);color:#fff;box-shadow:var(--shadow)}` with a hover scale (`transform:scale(1.04)`).

- [ ] **Step 4: Style footer**: `.footer{background:var(--rock);color:#cfc8e6;padding:48px 0 24px}`, `.footer__grid{display:grid;grid-template-columns:2fr 1fr 1.4fr;gap:32px}` collapsing to 1 column under 760px, headings in display font/white, links in `--citrine`, `.footer__note` centered/muted/small.

- [ ] **Step 5: Verify** — reload `index.html`: sticky dark nav with glowing gradient "Book a Party" button, footer with three columns. Resize to mobile width (375px): nav links hide, footer stacks to one column, CTA button still visible. Confirm same on `parties.html`. Screenshot both.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: shared sticky nav + footer on both pages"
```

---

## Task 3: Homepage sections

**Files:**
- Modify: `index.html` (replace temp `<h1>` with all sections)
- Modify: `styles.css`

- [ ] **Step 1: Hero section** — replace the temp `<h1>` with:

```html
<section class="hero">
  <div class="container hero__inner">
    <p class="eyebrow">Twin Falls · All ages · All abilities</p>
    <h1 class="hero__title">Climb higher.<br>Celebrate louder.</h1>
    <p class="hero__sub">Southern Idaho's only indoor climbing gym — and the most fun birthday in town.</p>
    <div class="hero__cta">
      <a class="btn btn--cta" href="parties.html">Plan a Birthday Party</a>
      <a class="btn btn--ghost" href="#offer">Plan Your First Visit</a>
    </div>
  </div>
</section>
```

Style: `.hero{background:var(--grad-gem);color:#fff;padding:96px 0;text-align:center;position:relative;overflow:hidden}`, `.hero__title{font-size:clamp(2.4rem,6vw,4.2rem);line-height:1.02}`, `.eyebrow{letter-spacing:.12em;text-transform:uppercase;font-size:.8rem;opacity:.9}`, `.hero__sub{font-size:1.2rem;max-width:620px;margin:16px auto 28px;opacity:.95}`, `.hero__cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}`, `.btn--ghost{border:2px solid rgba(255,255,255,.7);color:#fff}`.

- [ ] **Step 2: Party teaser band** (homepage conversion magnet):

```html
<section class="teaser reveal">
  <div class="container teaser__inner">
    <h2>The most fun birthday in Twin Falls 🎉</h2>
    <ul class="teaser__points">
      <li>🧗 A staff host runs the whole party</li>
      <li>🎈 Private party room included</li>
      <li>👧 Up to 30 guests</li>
    </ul>
    <a class="btn btn--cta" href="parties.html">See Party Packages</a>
  </div>
</section>
```

Style `.teaser{background:var(--rock-2);color:#fff;padding:64px 0;text-align:center}`, `.teaser__points{list-style:none;display:flex;gap:28px;justify-content:center;flex-wrap:wrap;margin:24px 0 28px;font-size:1.05rem}`.

- [ ] **Step 3: "What we offer" cards** — `<section id="offer" class="section">` with a `.container`, an `<h2>` "Everything to climb on", and a `.cards` grid of 6 `.card` items (icon emoji + h3 + one-line p): Bouldering (V0–V10, 4,000+ sq ft), 10 Auto-Belays (climb solo, no partner), Top Rope (5.5–5.11d), Lead Climbing (overhang), Yoga & Fitness, Youth & Adult Instruction, Adaptive Climbing. Write out all card markup explicitly.

Style: `.section{padding:72px 0}`, `.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}` → 2 cols under 900px → 1 col under 600px, `.card{background:#fff;border:1px solid #eee;border-radius:var(--radius);padding:26px;box-shadow:var(--shadow)}` with a `.card__icon{font-size:2rem}` and a top gradient accent bar (`border-top:4px solid transparent;border-image:var(--grad-gem) 1`).

- [ ] **Step 4: "Why Gemstone" trust band** — `<section id="why" class="why reveal">` with 4 stat/trust items in a row: "Only indoor gym in S. Idaho", "Fully ADA accessible", "Trained, friendly staff", "All ages & abilities welcome". Style as a `--grad-gem` or `--rock` band with 4-up grid collapsing to 2-up then 1-up.

- [ ] **Step 5: Testimonials** — `<section class="section">` h2 "Climbers love us", `.cards` grid of 3 `.quote` cards with realistic placeholder text + a name ("— Sarah M., Twin Falls"). Mark them clearly as representative. Add `reveal` class.

- [ ] **Step 6: Verify** — reload `index.html`. Confirm top-to-bottom: gem-gradient hero with two CTAs, dark teaser band, 6/7 offer cards in a responsive grid, trust band, testimonials. Resize to 375px and confirm cards stack to one column and nothing overflows. Screenshot full page.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: homepage sections (hero, teaser, offer, why, testimonials)"
```

---

## Task 4: Party page sections

**Files:**
- Modify: `parties.html` (replace temp `<h1>` with all sections)
- Modify: `styles.css`

- [ ] **Step 1: Party hero** — replace temp `<h1>`:

```html
<section class="hero hero--party" id="party-hero">
  <div class="container hero__inner">
    <p class="eyebrow">Birthday parties &amp; group events</p>
    <h1 class="hero__title">Birthdays that rock. 🎉</h1>
    <p class="hero__sub">You bring the cake — we bring the staff host, the party room, and 30 feet of pure fun. Parents relax, kids climb.</p>
    <a class="btn btn--cta" href="#request">Request Your Party Date</a>
  </div>
</section>
```

(`.hero--party` can swap the gradient direction or add the confetti canvas target — handled in Task 5.)

- [ ] **Step 2: Package cards** — `<section class="section"><div class="container">` h2 "Pick your adventure", `.cards.cards--pkg` with 3 `.pkg` cards. Write full markup for each:
  - **Base Camp** — `$PLACEHOLDER` (e.g. "$199") — 1.5 hrs · up to 10 climbers · party room · staff host · climbing shoes included.
  - **Summit** — add class `pkg--popular` and a "Most popular" ribbon — "$299" — 2 hrs · up to 20 climbers · party room · staff host · shoes · printable invites · a free return pass for the birthday kid.
  - **Adventure** — "$399" — 2.5 hrs · up to 30 climbers · extended room time · staff host · shoes · invites · dedicated photo spot.
  Each card: name, price, `<ul>` checklist (✓ items), and a `<a class="btn btn--cta" href="#request">Choose</a>`.

Style: `.cards--pkg{grid-template-columns:repeat(3,1fr)}` → 1 col under 820px, `.pkg{background:#fff;border-radius:var(--radius);padding:30px;box-shadow:var(--shadow);position:relative}`, `.pkg--popular{outline:3px solid var(--magenta);transform:scale(1.03)}`, `.pkg__price{font-family:var(--font-display);font-size:2.2rem;color:var(--amethyst)}`, ribbon `.pkg__ribbon{position:absolute;top:14px;right:-6px;background:var(--grad-cta);color:#fff;padding:4px 14px;border-radius:6px;font-size:.8rem}`. Add a small `<p class="note">Placeholder pricing — final packages set by Gemstone.</p>`.

- [ ] **Step 3: "How it works"** — `<section class="how reveal">` with 4 numbered steps in a row: 1) Pick a package, 2) Request a date, 3) We confirm + take a deposit, 4) Show up & climb! Style `.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}` → 2-up → 1-up, each `.step` with a big gradient-circle number.

- [ ] **Step 4: Parent FAQ** — `<section class="section"><div class="container">` h2 "Parent questions, answered", and a `.faq` list of `<details>` elements (native accordion, works without JS) covering: minimum age, are shoes provided/rental, what to bring, can we bring food & cake, can adults climb too, how do you keep kids safe (staff supervision + auto-belays), deposit & cancellation policy. Write out all Q&A text with realistic placeholder answers. Style `details{background:var(--paper);border:1px solid #eee;border-radius:12px;padding:14px 18px;margin-bottom:10px}` and `summary{font-family:var(--font-display);cursor:pointer}`.

- [ ] **Step 5: Closing CTA + request form mockup** — `<section class="cta-band" id="request">` on a `--grad-gem` background: h2 "Ready to book the best birthday ever?", phone "(208) 329-7257", and a **visual-only** form (not wired): fields for Parent name, Email/phone, Preferred date (`type=date`), Number of guests, child's age, plus a `<button type="button" class="btn btn--cta">Send Request</button>`. Add `onsubmit="return false"` / `type="button"` so nothing actually submits. Style the form as a white card centered on the band.

- [ ] **Step 6: Verify** — reload `parties.html`. Confirm: party hero, 3 package cards with Summit highlighted + ribbon, 4-step how-it-works, FAQ accordions that open/close on click (test one with JS, and confirm they still toggle — they're native `<details>`), closing gradient band with the form card. Resize to 375px: packages and steps stack, form stays usable. Screenshot full page.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: party page (hero, packages, how-it-works, FAQ, request CTA)"
```

---

## Task 5: JS enhancements — scroll-reveal + confetti

Progressive enhancement only. Pages already work fully without this.

**Files:**
- Modify: `main.js`

- [ ] **Step 1: Reduced-motion guard** — in `main.js`, inside `DOMContentLoaded`, read `const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;`. All animation below is skipped when `reduce` is true (but reveal elements must still be made visible — see Step 2).

- [ ] **Step 2: Scroll-reveal** — select `.reveal` elements. If `reduce` or no `IntersectionObserver`, add class `in` to all of them immediately (so content is never hidden). Otherwise create an `IntersectionObserver` that adds `in` when each enters viewport (threshold 0.15) and unobserves.

```js
const reveals = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  reveals.forEach(el => io.observe(el));
}
```

- [ ] **Step 3: Confetti** — write a small self-contained `burstConfetti(durationMs)` using a full-window fixed `<canvas>` (pointer-events:none, z-index high) that spawns ~120 gravity-driven rectangles in the palette colors (`--magenta,--citrine,--emerald,--sapphire,--amethyst`), animates via `requestAnimationFrame`, and removes the canvas when done. Guard the whole function so it returns immediately if `reduce` is true.

- [ ] **Step 4: Wire confetti triggers** — on the party page only (feature-detect `document.getElementById('party-hero')`), call `burstConfetti(1500)` once on load. Also attach a `mouseenter` listener to every `.btn--cta` (throttled so it only fires if not already running) calling `burstConfetti(900)`.

- [ ] **Step 5: Verify** — reload `index.html`: sections fade/slide up as you scroll; CTA hover triggers a confetti burst. Reload `parties.html`: confetti fires on load. Then emulate `prefers-reduced-motion: reduce` (preview_resize/eval or DevTools) and reload: NO confetti, NO fade — all content is immediately visible (nothing stuck at opacity 0). Confirm no console errors. Screenshot the party hero mid-confetti.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scroll-reveal + confetti enhancements (reduced-motion safe)"
```

---

## Task 6: Responsive + accessibility + final polish pass

**Files:**
- Modify: `styles.css` (and small HTML tweaks as needed)

- [ ] **Step 1: Mobile nav** — under 760px the text links are hidden (Task 2). Add a simple mobile affordance: keep the "Book a Party" CTA always visible (already), and ensure the logo + CTA fit on one row at 320px without overflow. Adjust padding/font-size as needed. (No hamburger menu required for a pitch — links are reachable by scrolling; keep it simple per YAGNI.)

- [ ] **Step 2: Contrast & focus** — verify all text meets ~4.5:1 contrast (white on `--amethyst`/`--magenta` is fine; check muted text on light). Add a visible focus style: `a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid var(--citrine);outline-offset:2px}`. Ensure the confetti canvas has `aria-hidden="true"` and `pointer-events:none`.

- [ ] **Step 3: JS-off check** — in the browser preview, disable JavaScript (or eval to confirm) and reload both pages. Expected: everything visible and readable, FAQ `<details>` still toggle, no broken layout. Re-enable JS.

- [ ] **Step 4: Cross-page link check** — click through: nav "Book a Party" → parties.html; hero "Plan a Birthday Party" → parties.html; teaser "See Party Packages" → parties.html; package "Choose" + closing CTA → `#request` anchor scrolls correctly; footer links present. Logo → index.html. Confirm each.

- [ ] **Step 5: Final responsive sweep** — screenshot both pages at 375px, 768px, and 1280px. Confirm no horizontal scroll, no overlapping text, package/offer grids reflow cleanly, hero text scales.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "polish: responsive, focus styles, JS-off + link verification"
```

---

## Self-Review (completed by plan author)

**Spec coverage check:**
- Tech & structure (2 pages, no build, shared css/js) → Task 1 ✓
- "Gem + party blend" style, jewel palette, confetti moments, chunky display font → Tokens + Tasks 3/4/5 ✓
- Playful-but-grown-up / parent-trust → restrained motion (Task 5 reduced-motion), trust band (T3), how-it-works + FAQ (T4) ✓
- Homepage 7 sections (nav, hero, teaser, offer, why, testimonials, footer) → Tasks 2–3 ✓
- Party page (hero, 3 packages w/ Summit highlighted, how-it-works, FAQ, closing form CTA, footer) → Tasks 2,4 ✓
- Real facts (phone, contacts, ADA, features, ~30 guests) → embedded in T2/T3/T4 markup ✓
- Robustness (responsive, JS-off, reduced-motion, contrast) → Tasks 5–6 ✓
- Placeholder pricing clearly marked → T4 notes ✓

**Placeholder scan:** Prices are intentional, labeled placeholders (spec requirement) — not plan gaps. No "TBD"/"add error handling"/unspecified-code steps remain.

**Consistency:** `burstConfetti(ms)`, `.reveal`/`.in`, `.btn--cta`, `.cards`, `.pkg--popular`, `#request`, `#party-hero` names are used consistently across tasks.
