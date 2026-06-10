// Custom dot cursor
(function () {
  const dot = document.createElement('div');
  dot.id = 'cursor';
  document.body.appendChild(dot);
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });
})();

// Random dark pastel background color
(function () {
  const h = Math.floor(Math.random() * 360);
  const s = 45 + Math.floor(Math.random() * 20);
  const l = 38 + Math.floor(Math.random() * 15);
  document.documentElement.style.setProperty('--bg', `hsl(${h},${s}%,${l}%)`);
})();

// Active nav indicator
document.querySelectorAll('.nav-label').forEach(link => {
  if (link.href === location.href) {
    link.classList.add('active');
  }
});

// Hamburger menu — works for .site-nav (subpages) and nav.sidebar (matthew)
const siteNav = document.querySelector('.site-nav, nav.sidebar');

if (siteNav) {
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  document.body.appendChild(hamburger);

  function closeNav() {
    hamburger.classList.remove('open');
    siteNav.classList.remove('open');
    overlay.classList.remove('open');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    siteNav.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
  });

  overlay.addEventListener('click', closeNav);
}
