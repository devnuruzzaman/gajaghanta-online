// Ensure preloader exists early so it appears immediately
(function injectPreloader(){
  if (!document.getElementById('loading')){
    const wrap = document.createElement('div');
    wrap.id = 'loading';
    wrap.innerHTML = `
      <div id="loading-center">
        <div id="loading-center-absolute">
          <div class="loader-ring" aria-hidden="true"></div>
          <img class="logo" src="assets/img/logo/logo.png" alt="গজঘন্টা অনলাইন" />
          <div class="object" id="object_four"></div>
          <div class="object" id="object_three"></div>
          <div class="object" id="object_two"></div>
          <div class="object" id="object_one"></div>
        </div>
      </div>`;
    document.body.prepend(wrap);
    // Prevent scrolling while preloader is visible
    document.body.classList.add('preloading');
    // Fail-safe: hide preloader automatically after 6s in case load never fires
    if (!wrap.dataset._failsafe){
      wrap.dataset._failsafe = '1';
      setTimeout(() => {
        if (wrap && wrap.style.display !== 'none') hidePreloader();
      }, 6000);
    }
  }
})();

// Always start at top on reload or navigation restores
(function forceScrollTop(){
  try{ if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; }catch(_){}
  const jumpTop = () => window.scrollTo(0, 0);
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', jumpTop, { once: true });
  } else {
    jumpTop();
  }
  // Handle back/forward cache restore
  window.addEventListener('pageshow', (e) => { if (e.persisted) jumpTop(); });
})();

function initUI(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav && !menuBtn.dataset._wired) {
    menuBtn.dataset._wired = '1';
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.style.display === 'block';
      mobileNav.style.display = isOpen ? 'none' : 'block';
      menuBtn.textContent = isOpen ? '≡' : '✕';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileNav.style.display = 'none';
      menuBtn.textContent = '≡';
    }));
  }
}
initUI();

// SEO helpers: set canonical and og:url dynamically; lazy-load images
(function enhanceSEO(){
  try{
    const url = window.location.href;
    const canonicalEl = document.querySelector('link#canonical') || document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', url);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);
  }catch(_){}
  try{
    // Defer non-critical images
    document.querySelectorAll('img:not([fetchpriority="high"])').forEach(img => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
    });
  }catch(_){}
})();

function initImageAnimations(){
  const imgs = Array.from(document.querySelectorAll('main img'));
  if (!imgs.length) return;
  imgs.forEach(img => img.classList.add('animated-img'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  imgs.forEach(img => io.observe(img));
}
initImageAnimations();

// Partials loader (head, header, footer)
(async () => {
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');

  // Detect GitHub Pages project base (first path segment), e.g. '/gajaghanta-onlinebd'
  const segs = window.location.pathname.split('/').filter(Boolean);
  const projectBase = segs.length ? `/${segs[0]}` : '';

  const tryFetch = async (paths, label) => {
    for (const p of paths) {
      try {
        const r = await fetch(p);
        if (r.ok) return r.text();
      } catch(_) {}
    }
    if (label) console.warn(`[partials] Unable to load ${label} from`, paths);
    return null;
  };

  // Inject head partial into the real <head> ONLY if core CSS is not already present
  {
    const hasCoreCss = !!document.querySelector('link[href*="assets/css/style.css"],link[href*="../assets/css/style.css"]');
    if (!hasCoreCss) {
      const headHtml = await tryFetch([
        'assets/header/head.html',
        '../assets/header/head.html',
        `${projectBase}/assets/header/head.html`,
        'assets/headerFooter/head.html',
        '../assets/headerFooter/head.html',
        `${projectBase}/assets/headerFooter/head.html`
      ], 'head');
      if (headHtml) {
        const wrap = document.createElement('div');
        wrap.innerHTML = headHtml;
        Array.from(wrap.children).forEach(node => document.head.appendChild(node));
      }
    }
  }

  if (headerMount) {
    const headerHtml = await tryFetch([
      'assets/header/header.html',
      '../assets/header/header.html',
      `${projectBase}/assets/header/header.html`,
      'assets/headerFooter/header.html',
      '../assets/headerFooter/header.html',
      `${projectBase}/assets/headerFooter/header.html`
    ], 'header');
    if (headerHtml) headerMount.innerHTML = headerHtml;
  }
  if (footerMount) {
    const footerHtml = await tryFetch([
      'assets/header/footer.html',
      '../assets/header/footer.html',
      `${projectBase}/assets/header/footer.html`,
      'assets/headerFooter/footer.html',
      '../assets/headerFooter/footer.html',
      `${projectBase}/assets/headerFooter/footer.html`
    ], 'footer');
    if (footerHtml) footerMount.innerHTML = footerHtml;
  }
  // Normalize navigation links to absolute project-root paths so they don't become nested like /Service/Packages
  (function rewriteNavLinks(){
    const base = (location.hostname.endsWith('github.io') && projectBase) ? (projectBase + '/') : '/';
    const routes = {
      home: '',
      about: 'About',
      service: 'Service',
      packages: 'Packages',
      payment: 'Payment',
      contact: 'Contact',
      register: 'Register'
    };
    document.querySelectorAll('[data-nav]').forEach(a => {
      const key = a.getAttribute('data-nav');
      if (key && key in routes) a.setAttribute('href', base + routes[key]);
    });
  })();
  // If we are on a subpage (e.g., /gajaghanta-onlinebd/About/ or /.../Register/index.html),
  // fix asset paths inside injected partials by modifying the original attribute values,
  // NOT the resolved absolute URLs (important for GitHub Pages).
  // For GitHub Pages, segs[0] is usually the repo name (e.g., 'gajaghanta-onlinebd')
  const isSubpage = segs.length > 1; // more than just the repo root
  if (isSubpage) {
    // Prepend '../' to any relative asset path starting with 'assets/'
    document.querySelectorAll('img[src^="assets/"]').forEach(img => {
      const val = img.getAttribute('src');
      if (val && val.indexOf('../') !== 0) img.setAttribute('src', `../${val}`);
    });
    document.querySelectorAll('link[href^="assets/"]').forEach(link => {
      const val = link.getAttribute('href');
      if (val && val.indexOf('../') !== 0) link.setAttribute('href', `../${val}`);
    });
    document.querySelectorAll('script[src^="assets/"]').forEach(scr => {
      const val = scr.getAttribute('src');
      if (val && val.indexOf('../') !== 0) scr.setAttribute('src', `../${val}`);
    });
    // Fix anchors that point to 'index.html' from subpages
    document.querySelectorAll('a[href^="index.html"]').forEach(a => {
      const rest = a.getAttribute('href').slice('index.html'.length);
      a.setAttribute('href', `../index.html${rest}`);
    });
  }
  // Re-initialize after injection
  initUI();
  initImageAnimations();
  wireBackToTop();
})();

// Note: If opening with file:// protocol, fetch() may be blocked by the browser.
// Use a local server (e.g., VS Code Live Server) for partial loading.

// Support form handler (demo only)
const supportForm = document.getElementById('supportForm');
if (supportForm) {
  supportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    if (msg) msg.style.display = 'block';
    supportForm.reset();
  });
}

// Newsletter form (demo only)
const newsForm = document.getElementById('newsForm');
if (newsForm) {
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for subscribing!');
    newsForm.reset();
  });
}

// WhatsApp button
const waBtn = document.getElementById('whatsapp');
if (waBtn) {
  waBtn.addEventListener('click', () => {
    window.open('https://wa.me/+8801988084009', '_blank');
  });
}

// Preloader hide & back-to-top logic
window.addEventListener('load', () => {
  hidePreloader();
});

function wireBackToTop(){
  const backWrap = document.querySelector('.back-to-top-wrapper');
  const backBtn = document.getElementById('back_to_top');
  if (!backWrap && !backBtn) return; // header may not be present on some pages
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (backWrap){
      if (y > 200) backWrap.classList.add('show'); else backWrap.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (backBtn && !backBtn.dataset._wired){
    backBtn.dataset._wired = '1';
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

// Try to wire once at startup as well
wireBackToTop();

// Shared hide function with smooth transition and motion preference
function hidePreloader(){
  const loading = document.getElementById('loading');
  if (!loading) { document.body.classList.remove('preloading'); return; }
  try{
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced){
      loading.style.display = 'none';
      document.body.classList.remove('preloading');
      return;
    }
    loading.style.opacity = '0';
    loading.style.transition = 'opacity .3s ease';
    setTimeout(() => {
      loading.style.display = 'none';
      document.body.classList.remove('preloading');
    }, 320);
  }catch(_){
    loading.style.display = 'none';
    document.body.classList.remove('preloading');
  }
}

