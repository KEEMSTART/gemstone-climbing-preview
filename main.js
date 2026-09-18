// Gemstone mockup — progressive enhancement (scroll reveal + confetti). Filled in Task 5.

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Reduced-motion guard ──────────────────────────────────────────────
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Mobile navigation ────────────────────────────────────────────────────
  // Without JS the nav links simply wrap below the bar (see styles.css), so
  // every page stays reachable either way.
  const nav = document.querySelector('.nav');
  const burger = nav && nav.querySelector('.nav__burger');
  if (burger) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    // Tapping a link or pressing Escape closes the panel.
    nav.querySelectorAll('.nav__links a').forEach((a) =>
      a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  // ── "More" dropdown in the desktop nav ──────────────────────────────────
  // Hover/focus-within opens it via CSS; this adds tap + Escape + outside-click.
  const more = document.querySelector('.nav__more');
  const moreBtn = more && more.querySelector('.nav__more-btn');
  if (moreBtn) {
    const setMore = (open) => {
      more.classList.toggle('is-open', open);
      moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    moreBtn.addEventListener('click', (e) => { e.stopPropagation(); setMore(!more.classList.contains('is-open')); });
    document.addEventListener('click', (e) => { if (!more.contains(e.target)) setMore(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMore(false); });
  }

  // ── 2. Scroll-reveal ─────────────────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    // Always make content visible — never leave anything hidden.
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  }

  // ── 3. Confetti ──────────────────────────────────────────────────────────
  const PALETTE = ['#ff2d9b', '#ffcb05', '#10b981', '#2563eb', '#7b2ff7'];
  let isRunning = false;

  function burstConfetti(durationMs) {
    if (reduce) return;
    if (isRunning) return;
    isRunning = true;

    // Create (or reuse) the canvas
    let canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
      document.body.appendChild(canvas);
    }

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Spawn a modest burst of pieces
    const pieces = Array.from({ length: 50 }, () => ({
      x: Math.random() * W,
      y: Math.random() * -H * 0.3,         // start above viewport
      w: 6 + Math.random() * 6,             // 6–12 px wide
      h: 4 + Math.random() * 5,             // 4–9 px tall
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      dx: (Math.random() - 0.5) * 2.5,     // horizontal drift
      dy: 2 + Math.random() * 3,            // downward speed
      rot: Math.random() * Math.PI * 2,     // initial rotation
      drot: (Math.random() - 0.5) * 0.2,   // rotation speed
    }));

    const start = performance.now();
    let rafId;

    function draw(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);

      ctx.clearRect(0, 0, W, H);

      // Fade out the last 30% of the animation
      const alpha = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
      ctx.globalAlpha = alpha;

      pieces.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.rot += p.drot;

        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (progress < 1) {
        rafId = requestAnimationFrame(draw);
      } else {
        // Cleanup
        ctx.clearRect(0, 0, W, H);
        canvas.remove();
        isRunning = false;
      }
    }

    rafId = requestAnimationFrame(draw);

    // Safety cleanup if the page unloads mid-animation
    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(rafId);
      canvas.remove();
      isRunning = false;
    }, { once: true });
  }

  // ── 4. Wire triggers ─────────────────────────────────────────────────────

  // Party page only: one gentle confetti burst on load.
  if (document.getElementById('party-hero')) {
    burstConfetti(1200);
  }

  // Weekly schedule: mark today's row. Enhancement only — the schedule
  // reads fine without it.
  const week = document.querySelector('.week');
  if (week) {
    const row = week.querySelector('[data-day="' + new Date().getDay() + '"]');
    if (row) row.classList.add('is-today');
  }

});
