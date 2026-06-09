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
