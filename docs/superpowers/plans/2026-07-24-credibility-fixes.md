# Credibility Fixes Implementation Plan (Sub-project A)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Gemstone pitch mockup believable — tappable contact paths, real address/map/directions, an intentional photo-placeholder system with an owner shot list, and honest handling of unverified hours and reviews.

**Architecture:** Pure additive edits to the existing static two-page mockup. No JS changes, no dependencies. New CSS components (`.photo-slot`, `.visit`, `.hours-tag`, `.rating`) appended to `styles.css`; markup edits in both HTML files; one new markdown deliverable at project root.

**Tech Stack:** Hand-written HTML5, vanilla CSS. Google Maps embed via keyless iframe. PowerShell + System.Drawing for the one image resize.

**Verification:** Visual mockup — no unit tests. Each task is verified in the browser preview (screenshot / eval) and committed.

**Project root:** `C:\Users\CLint\gemstone-climbing-redesign`
**Preview:** launch config `gemstone-static` serves the project on port 8743.

---

## File Structure

```
gemstone-climbing-redesign/
├── index.html            # + tel/mailto, Visit-us block, hours tag, rating
├── parties.html          # + tel/mailto, Visit-us block, photo slots, hours tag
├── styles.css            # + .photo-slot, .visit, .hours-tag, .rating; hero image swap
├── assets/photos/
│   └── home-hero.jpg     # REPLACED with landscape wide-gym shot
└── PHOTO-SHOT-LIST.md    # NEW — owner-facing deliverable
```

---

## Task 1: Swap the hero to the landscape gym shot

The current `home-hero.jpg` is a portrait shot center-cropped into a wide hero. `assets/source/photos/p06_Dec-2017-032.jpg` (4608×3072, landscape) is better composed and has a parent and child in frame.

**Files:**
- Replace: `assets/photos/home-hero.jpg`

- [ ] **Step 1: Resize the landscape source into place**

Run in PowerShell from the project root:

```powershell
Add-Type -AssemblyName System.Drawing
$src='assets\source\photos\p06_Dec-2017-032.jpg'
$dst='assets\photos\home-hero.jpg'
$enc=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$qp=New-Object System.Drawing.Imaging.EncoderParameters(1)
$qp.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]82)
$img=[System.Drawing.Image]::FromFile((Resolve-Path $src))
$nw=1600; $nh=[int]([math]::Round($img.Height*($nw/$img.Width)))
$bmp=New-Object System.Drawing.Bitmap($nw,$nh)
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img,0,0,$nw,$nh); $img.Dispose()
$bmp.Save((Join-Path (Get-Location) $dst),$enc,$qp); $bmp.Dispose(); $g.Dispose()
"{0:N0} KB" -f ((Get-Item $dst).Length/1KB)
```

Expected: prints a size around 300–600 KB.

- [ ] **Step 2: Retune the hero crop for a landscape source**

In `styles.css`, the `.hero` rule currently ends its background with `url('assets/photos/home-hero.jpg') center 38%/cover no-repeat;`. Change `center 38%` to `center 55%` (the landscape frame's interest sits lower):

```css
    url('assets/photos/home-hero.jpg') center 55%/cover no-repeat;
```

- [ ] **Step 3: Verify**

Load `http://localhost:8743/index.html` in the preview. Expected: the hero shows a wide view of the gym — tall windows, blue floor, colorful walls — behind the gem gradient, with the headline still clearly readable. Screenshot it.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: swap hero to landscape gym photo"
```

---

## Task 2: Tappable phone and email links

Phone and email are currently plain text. On mobile a tappable number is the single highest-leverage fix on the site.

**Files:**
- Modify: `index.html`, `parties.html`

- [ ] **Step 1: Add link styling for footer contact links**

Append to `styles.css`:

```css
/* Contact links keep the footer's citrine treatment but stay tappable */
.footer a.contact-link{color:var(--citrine);text-decoration:none}
.footer a.contact-link:hover{text-decoration:underline}
.cta-band__phone a{color:#fff;text-decoration:none}
.cta-band__phone a:hover{text-decoration:underline}
```

- [ ] **Step 2: Replace the footer contact block on BOTH `index.html` and `parties.html`**

Find this block (identical in both files):

```html
        <p>(208) 329-7257<br>kim@gemstoneclimbing.rocks<br>patty@gemstoneclimbing.rocks</p>
```

Replace with:

```html
        <p>
          <a class="contact-link" href="tel:+12083297257">(208) 329-7257</a><br>
          <a class="contact-link" href="mailto:kim@gemstoneclimbing.rocks">kim@gemstoneclimbing.rocks</a><br>
          <a class="contact-link" href="mailto:patty@gemstoneclimbing.rocks">patty@gemstoneclimbing.rocks</a>
        </p>
```

- [ ] **Step 3: Make the party-page CTA phone tappable**

In `parties.html`, find:

```html
        <p class="cta-band__phone">(208) 329-7257</p>
```

Replace with:

```html
        <p class="cta-band__phone"><a href="tel:+12083297257">📞 (208) 329-7257</a></p>
```

- [ ] **Step 4: Verify**

In the preview, run this in `preview_eval` on each page and confirm the counts:

```js
({tel: document.querySelectorAll('a[href^="tel:"]').length, mailto: document.querySelectorAll('a[href^="mailto:"]').length})
```

Expected: `index.html` → `{tel:1, mailto:2}`; `parties.html` → `{tel:2, mailto:2}`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: tappable tel/mailto contact links"
```

---

## Task 3: "Visit us" block — address, map, directions

**Files:**
- Modify: `styles.css`, `index.html`, `parties.html`

- [ ] **Step 1: Add the styles**

Append to `styles.css`:

```css
/* ── Visit us (address + map + directions) ── */
.visit{display:grid;grid-template-columns:1fr 1.1fr;gap:24px;align-items:center;
  background:#fff;color:var(--ink);border-radius:var(--radius);padding:24px;
  box-shadow:var(--shadow);max-width:900px;margin:0 auto;text-align:left}
@media (max-width:720px){.visit{grid-template-columns:1fr}}
.visit h3{font-size:1.3rem;margin-bottom:6px}
.visit address{font-style:normal;color:var(--muted);margin-bottom:14px;line-height:1.5}
.visit__map{width:100%;height:220px;border:0;border-radius:12px;display:block;background:#eee}
.visit__note{color:var(--muted);font-size:.85rem;margin-top:10px}
```

- [ ] **Step 2: Build the reusable block markup**

This exact markup is used in two places (paste it in both — do not abstract):

```html
<div class="visit">
  <div>
    <h3>Visit us</h3>
    <address>
      135 5th Avenue South<br>
      Twin Falls, ID 83301
    </address>
    <a class="btn btn--cta" target="_blank" rel="noopener"
       href="https://www.google.com/maps/dir/?api=1&destination=135+5th+Avenue+South,+Twin+Falls,+ID+83301">
      Get Directions
    </a>
    <p class="visit__note">Free parking on site. <em>(To confirm with Gemstone.)</em></p>
  </div>
  <iframe class="visit__map" loading="lazy" title="Map to Gemstone Climbing Center"
    src="https://www.google.com/maps?q=135+5th+Avenue+South,+Twin+Falls,+ID+83301&output=embed"></iframe>
</div>
```

- [ ] **Step 3: Add it to `parties.html`**

In the closing CTA band (`<section class="cta-band" id="request">`), insert the block from Step 2 immediately **after** the closing `</div>` of `.request-form` and before the section's closing `</div>`. Add a wrapping spacer div so it doesn't crowd the form:

```html
          <div style="margin-top:36px"></div>
```

immediately before the pasted `.visit` block.

- [ ] **Step 4: Add it to `index.html`**

Insert a new section immediately **before** the `<footer class="footer" id="footer">` element:

```html
    <section class="section" style="padding-top:0">
      <div class="container">
        <!-- paste the .visit block from Step 2 here -->
      </div>
    </section>
```

Paste the Step 2 markup where the comment indicates (replace the comment with the real markup).

- [ ] **Step 5: Verify graceful degradation**

Load both pages. Expected: a white card with the address, a "Get Directions" button, and a live map on the right (stacked on mobile). Then simulate the map being blocked:

```js
document.querySelectorAll('.visit__map').forEach(f=>f.remove());
```

Expected: address and Get Directions button remain fully usable and the card layout does not collapse. Reload to restore. Screenshot at 1280px and 375px.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: visit-us block with address, map, directions"
```

---

## Task 4: Photo placeholder system

The gym has no party-room, cake, or birthday-group photos. These slots show the owners exactly what to supply, and must look **designed**, not broken.

**Files:**
- Modify: `styles.css`, `parties.html`

- [ ] **Step 1: Add the styles**

Append to `styles.css`:

```css
/* ── Photo slots (awaiting owner-supplied images) ── */
.photo-slot{
  border:2px dashed rgba(123,47,247,.45);
  background:linear-gradient(135deg, rgba(123,47,247,.06), rgba(255,45,155,.06));
  border-radius:var(--radius);
  display:grid;place-items:center;text-align:center;
  padding:24px;color:var(--amethyst);min-height:200px;
}
.photo-slot__icon{font-size:2rem;display:block;margin-bottom:8px}
.photo-slot strong{display:block;font-family:var(--font-display);font-size:1.05rem}
.photo-slot span.photo-slot__hint{display:block;color:var(--muted);font-size:.85rem;margin-top:4px}
.photo-slot--lg{min-height:320px}
.photo-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}
@media (max-width:760px){.photo-slots{grid-template-columns:1fr}}
```

- [ ] **Step 2: Add the slots section to `parties.html`**

Insert immediately **before** the `<!-- ── Section 4: Parent FAQ ── -->` comment:

```html
    <!-- ── Section 3c: Party photo slots (awaiting owner photos) ── -->
    <section class="section reveal">
      <div class="container">
        <h2>See where the party happens</h2>
        <p class="section__sub">Our private party room — where the cake, presents, and birthday chaos live.</p>

        <div class="photo-slot photo-slot--lg">
          <div>
            <span class="photo-slot__icon">📸</span>
            <strong>Photo of the party room goes here</strong>
            <span class="photo-slot__hint">Wide shot, lights on, table set up for a party</span>
          </div>
        </div>

        <div class="photo-slots">
          <div class="photo-slot">
            <div>
              <span class="photo-slot__icon">🎂</span>
              <strong>Cake &amp; table moment</strong>
              <span class="photo-slot__hint">Kids around the table mid-celebration</span>
            </div>
          </div>
          <div class="photo-slot">
            <div>
              <span class="photo-slot__icon">🧗</span>
              <strong>Group of kids on the wall</strong>
              <span class="photo-slot__hint">Several climbing at once, staff host visible</span>
            </div>
          </div>
          <div class="photo-slot">
            <div>
              <span class="photo-slot__icon">🏅</span>
              <strong>Birthday kid topping out</strong>
              <span class="photo-slot__hint">Arms up at the top, friends cheering below</span>
            </div>
          </div>
        </div>

        <p class="note">Placeholders — see <code>PHOTO-SHOT-LIST.md</code> for the shots we need from Gemstone.</p>
      </div>
    </section>
```

- [ ] **Step 3: Verify**

Load `parties.html`, scroll to "See where the party happens". Expected: one large dashed jewel-toned frame above a row of three smaller ones; they read as intentional design, not broken images. At 375px the three stack to one column. Screenshot both widths.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: party photo placeholder slots"
```

---

## Task 5: Honest hours + verifiable rating

Hours are invented; reviews are invented. Both get marked honestly. The one publicly verifiable social proof is the 4.5★ aggregate rating.

**Files:**
- Modify: `styles.css`, `index.html`, `parties.html`

- [ ] **Step 1: Add the styles**

Append to `styles.css`:

```css
/* ── Honesty markers ── */
.hours-tag{display:inline-block;margin-top:6px;font-size:.72rem;letter-spacing:.04em;
  text-transform:uppercase;color:#0e0b1a;background:var(--citrine);
  border-radius:999px;padding:2px 10px;font-weight:700}
.rating{text-align:center;margin-bottom:28px}
.rating__stars{font-size:1.5rem;letter-spacing:2px}
.rating__text{color:var(--muted);font-size:.9rem;margin-top:4px}
.rating__text a{color:var(--amethyst)}
```

- [ ] **Step 2: Tag the hours as unconfirmed on BOTH pages**

Find this block (identical in `index.html` and `parties.html`):

```html
        <h4>Hours</h4>
        <p>Mon–Fri 3pm–9pm<br>Sat–Sun 10am–8pm</p>
```

Replace with:

```html
        <h4>Hours</h4>
        <p>Mon–Fri 3pm–9pm<br>Sat–Sun 10am–8pm</p>
        <span class="hours-tag">Hours to confirm</span>
```

- [ ] **Step 3: Add the real rating above the testimonials in `index.html`**

In the testimonials section, replace this line:

```html
        <p class="section__sub">Representative placeholder quotes — real reviews coming soon!</p>
```

with:

```html
        <div class="rating">
          <div class="rating__stars" aria-hidden="true">★★★★☆</div>
          <p class="rating__text">
            Rated <strong>4.5 out of 5</strong> —
            <a href="https://www.indoorclimbinggym.com/gyms/gemstone-climbing-center-twin-falls/" target="_blank" rel="noopener">as listed on IndoorClimbingGym.com</a>
          </p>
        </div>
        <p class="section__sub"><strong>The quotes below are written placeholders, not real customer reviews.</strong> Swap in real Google or Facebook reviews before this goes live.</p>
```

- [ ] **Step 4: Verify**

Load `index.html`. Expected: a 4.5-star line with a working source link above the testimonials, and an unmistakable note that the quotes are placeholders. Both footers show a citrine "Hours to confirm" pill. Screenshot.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: honest hours tag + verifiable 4.5-star rating"
```

---

## Task 6: `PHOTO-SHOT-LIST.md` owner deliverable

**Files:**
- Create: `PHOTO-SHOT-LIST.md`

- [ ] **Step 1: Create the file** at the project root with exactly this content:

```markdown
# Photos We Need From Gemstone

The new website is built and ready — it just needs real photos of a birthday party.
Right now the site has great climbing shots, but **nothing showing the party room, cake,
or a group of kids celebrating**. That's the one thing parents most want to see before
they book, so these photos matter more than anything else on the page.

**Phone photos are completely fine.** Recent and real beats professional and stale.

## The 4 photos the page is waiting for

1. **The party room — wide shot.** Lights on, table set up like a party is about to start.
   This is the most important one.
2. **Cake & table moment.** Kids around the table mid-celebration.
3. **Group of kids on the wall.** Several climbing at once, with the staff host visible.
4. **Birthday kid topping out.** Arms up at the top, friends cheering below.

## 2–4 extras (nice to have)

5. A staff host helping a young climber into a harness.
6. The whole party group posed together, smiling.
7. Presents / decorations in the party room.
8. Parents relaxing while the kids climb.

## Quick tips

- **Shoot horizontal** (turn the phone sideways) — the website is built for wide photos.
- **Lights on.** Avoid shooting toward the big windows; faces come out dark.
- **Faces and smiles** beat empty rooms every time.
- Don't worry about editing — send them as-is.

## Also needed (not photos)

- **Real opening hours.** The site currently shows placeholder hours marked "to confirm."
- **Real party package names and prices.** The site shows sample tiers ($199 / $299 / $399).
- **Deposit and cancellation policy** wording.
- Whether **free parking on site** is accurate.

## One important note

Please get a parent's OK before using any photo showing a child on the website.
A quick verbal yes at the party is usually enough, but it's worth asking.
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "docs: add owner-facing photo shot list"
```

---

## Task 7: Final verification sweep

**Files:** none modified unless a defect is found.

- [ ] **Step 1: Responsive + overflow check**

Load each page at 375, 768, and 1280px. In `preview_eval` confirm:

```js
document.documentElement.scrollWidth - document.documentElement.clientWidth
```

Expected: `0` at every width on both pages.

- [ ] **Step 2: Console check**

`preview_console_logs` with level `error`. Expected: no errors. (A blocked Google Maps iframe may log a network warning; that is acceptable and not an error in page code.)

- [ ] **Step 3: Link audit**

```js
[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h!=='#')
```

Confirm on both pages: `tel:+12083297257` present, both `mailto:` addresses present, the Google Maps directions URL present, and all internal links still point at `index.html` / `parties.html` / valid `#` anchors (`#offer`, `#why`, `#footer`, `#request`).

- [ ] **Step 4: Screenshot both pages full-length at 1280px** for the record.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A && git commit -m "polish: final verification pass for credibility fixes"
```

If no defects were found, skip the commit and note that verification passed clean.

---

## Self-Review (completed by plan author)

**Spec coverage:**
- §1 Photo placeholder system → Task 4 ✓; `PHOTO-SHOT-LIST.md` → Task 6 ✓
- §2 Contact & directions (tel/mailto, address, map, directions, parking note, graceful degradation) → Tasks 2 & 3 ✓
- §3 Hours honest handling → Task 5 Step 2 ✓
- §4 Reviews honesty rule → Task 5 Step 3 ✓ (verbatim reviews were unobtainable — both TripAdvisor and IndoorClimbingGym returned HTTP 403 — so the plan uses the verifiable aggregate rating with a source link and explicitly labels the quotes as placeholders, exactly as the spec's fallback requires)
- §5 Hero swap → Task 1 ✓

**Placeholder scan:** No "TBD"/"handle edge cases"/unspecified-code steps. The `.photo-slot` and "hours to confirm" content are deliberate product features per the spec, not plan gaps.

**Consistency:** Class names `.photo-slot`, `.photo-slot--lg`, `.photo-slots`, `.photo-slot__icon`, `.photo-slot__hint`, `.visit`, `.visit__map`, `.visit__note`, `.hours-tag`, `.rating`, `.rating__stars`, `.rating__text`, `.contact-link` are each defined once and used consistently. Phone URI is `tel:+12083297257` everywhere.
