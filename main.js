/* ==========================================================================
   RYVEN GOJU DOJO — SITE BEHAVIOUR
   Small, dependency-free modules. Each does one job so future features
   (new pages, new widgets) can hook in without touching the others.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initHeaderShrink();
  initScrollReveal();
});

/* ---- Mobile nav: hamburger toggle ---- */
function initMobileNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if(!toggle || !nav) return;

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if(window.innerWidth > 900) close();
  });
}

/* ---- Highlight the nav link matching the current page ---- */
function initActiveNavLink(){
  const links = document.querySelectorAll('.site-nav a');
  const current = (location.pathname.split('/').pop() || 'Goju-Ryu Karate.html');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if(!href) return;
    const target = href.split('#')[0];
    const isHome = (target === 'Goju-Ryu Karate.html' || target === '') &&
                   (current === 'Goju-Ryu Karate.html' || current === '' || current === 'index.html');
    if(target === current || isHome){
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ---- Condense the header after a small scroll ---- */
function initHeaderShrink(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  const onScroll = () => header.classList.toggle('is-condensed', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}

/* ---- Fade/slide sections in as they enter the viewport ---- */
function initScrollReveal(){
  const targets = document.querySelectorAll('.reveal');
  if(!targets.length) return;

  if(!('IntersectionObserver' in window)){
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });

  targets.forEach(t => observer.observe(t));
}
