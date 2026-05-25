// Year in footer
document.getElementById('y').textContent = new Date().getFullYear();

// Theme toggle (persists in localStorage)
(function(){
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('kb-theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  themeBtn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effective = current || (systemDark ? 'dark' : 'light');
    const next = effective === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('kb-theme', next);
  });
})();

// Mobile menu (class-based, CSS handles the styling)
(function(){
  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  if (!btn || !menu) return;
  let menuOpen = false;
  function setMenu(open){
    menuOpen = open;
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  btn.addEventListener('click', () => setMenu(!menuOpen));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  // Close menu when crossing into desktop breakpoint
  const mq = window.matchMedia('(min-width: 760px)');
  mq.addEventListener('change', e => { if (e.matches) setMenu(false); });
  // Close on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) setMenu(false); });
})();

// Hero video: slow it down, and gracefully handle Brave/Safari/etc.
// blocking autoplay. If play() rejects, the CSS poster on .hero
// remains visible so the section is never empty.
(function(){
  const heroVideo = document.querySelector('.hero__video');
  if (!heroVideo) return;
  heroVideo.playbackRate = 0.75;
  const tryPlay = () => {
    const p = heroVideo.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => { /* autoplay blocked — poster background stays */ });
    }
  };
  // Some browsers (incl. Brave with certain shields) need a nudge after load.
  if (heroVideo.readyState >= 2) {
    tryPlay();
  } else {
    heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
  }
  // Retry on first user interaction in case autoplay was blocked silently.
  const retryOnce = () => { tryPlay(); window.removeEventListener('pointerdown', retryOnce); };
  window.addEventListener('pointerdown', retryOnce, { once: true });
})();
