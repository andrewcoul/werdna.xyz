/* werdna.xyz — shared behavior
   1. custom dot cursor (grows over interactive elements)
   2. random warm background, contrast-checked against white text
   3. active nav indicator
   4. mobile sidebar toggle
*/

// ── 1. Custom dot cursor ───────────────────────────────────────────────────
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.id = 'cursor';
  dot.style.opacity = '0';
  document.body.appendChild(dot);

  addEventListener('mousemove', e => {
    dot.style.opacity = '1';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });
  addEventListener('mouseover', e => {
    if (e.target.closest('a, button, [role="button"]')) dot.classList.add('is-hover');
  });
  addEventListener('mouseout', e => {
    if (e.target.closest('a, button, [role="button"]')) dot.classList.remove('is-hover');
  });
})();

// ── 2. Random warm background (guaranteed legible with white text) ──────────
(function () {
  // Reading pages keep a fixed identity color — skip them.
  if (document.querySelector('.sidebar')) return;

  function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return [f(0), f(8), f(4)].map(x => Math.round(x * 255));
  }
  function luminance([r, g, b]) {
    const c = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  // contrast of white (#fff, luminance 1) against the candidate background
  const contrastWithWhite = rgb => 1.05 / (luminance(rgb) + 0.05);

  const h = Math.floor(Math.random() * 360);
  const s = 35 + Math.floor(Math.random() * 30);   // 35–65%
  let l = 30 + Math.floor(Math.random() * 12);      // 30–42% to start
  // Darken until white text clears WCAG AA (4.5:1), with a little headroom.
  while (l > 12 && contrastWithWhite(hslToRgb(h, s, l)) < 4.6) l -= 1;

  document.documentElement.style.setProperty('--bg', `hsl(${h}, ${s}%, ${l}%)`);
})();

// ── 3. Active nav indicator ─────────────────────────────────────────────────
document.querySelectorAll('.nav-label').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

// ── 4. Mobile sidebar toggle ────────────────────────────────────────────────
const siteNav = document.querySelector('.site-nav');

if (siteNav) {
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  document.body.appendChild(hamburger);

  function closeNav() {
    hamburger.classList.remove('open');
    siteNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    siteNav.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  overlay.addEventListener('click', closeNav);
  addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
}
