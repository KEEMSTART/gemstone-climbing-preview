// Gemstone mockup — progressive enhancement (scroll reveal + confetti). Filled in Task 5.

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Reduced-motion guard ──────────────────────────────────────────────
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    // Spawn ~120 pieces
    const pieces = Array.from({ length: 120 }, () => ({
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

  // Party page: fire confetti on load
  if (document.getElementById('party-hero')) {
    burstConfetti(1500);
  }

  // Every CTA button: confetti on hover
  document.querySelectorAll('.btn--cta').forEach(btn => {
    btn.addEventListener('mouseenter', () => burstConfetti(900));
  });

});
