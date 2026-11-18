/* =====================================================================
   [YOUR COMPANY NAME] — Main
   Site configuration, i18n hook, header, navigation, cursor, magnetic
   buttons, page transitions, hero canvas, counters, tabs, accordions,
   process preview, testimonials. Vanilla JS only.
   ===================================================================== */
(() => {
  'use strict';

  /* ---------- Site configuration (single source of truth) ---------- */
  const SITE = (window.SITE_CONFIG = {
    name: 'Fawry Media',            // TODO: replace with the agency name
    shortName: 'Fawry Media',                  // used where space is limited
    tagline: 'Creative Digital Agency',
    email: 'hello@yourcompany.com',       // TODO: replace with the agency email
    phone: '+00 000 000 0000',            // TODO: replace
    location: '[City, Country]',          // TODO: replace
    hours: 'Sun – Thu, 9:00 – 18:00',
    social: {                             // TODO: replace '#' with real profile URLs
      instagram: '#', behance: '#', dribbble: '#', linkedin: '#'
    }
  });

  /* ---------- i18n hook (English now; add `ar` later) ---------- */
  const I18N = (window.I18N = {
    en: {
      viewProject: 'View Project',
      view: 'View',
      concept: 'Concept Work',
      noResults: 'No projects in this category yet.',
      copied: 'Copied',
      copy: 'Copy email',
      project: 'Project',
      results: 'projects'
    }
    // ar: { ... }  ← add Arabic strings here and set <html lang="ar" dir="rtl">
  });
  const lang = (document.documentElement.lang || 'en').split('-')[0];
  const t = (window.t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  window.AGENCY = window.AGENCY || {};
  window.AGENCY.reduceMotion = reduceMotion;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Populate placeholders from config ---------- */
  $$('[data-site]').forEach((el) => {
    const key = el.dataset.site;
    const val = key.includes('.') ? key.split('.').reduce((o, k) => (o ? o[k] : undefined), SITE) : SITE[key];
    if (val === undefined) return;
    if (el.tagName === 'A') {
      if (key === 'email') { el.href = `mailto:${val}`; el.textContent = val; }
      else if (key === 'phone') { el.href = `tel:${val.replace(/\s+/g, '')}`; el.textContent = val; }
      else if (key.startsWith('social.')) { el.href = val; }
      else el.textContent = val;
    } else {
      el.textContent = val;
    }
  });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  if (document.title.includes('[YOUR COMPANY NAME]')) {
    document.title = document.title.replace('[YOUR COMPANY NAME]', SITE.name);
  }

  /* ---------- Header, progress, back-to-top ---------- */
  const header = $('#header');
  const progress = $('.progress span');
  const toTop = $('.to-top');
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY || 0;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    }
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Active navigation ---------- */
  const page = document.body.dataset.page;
  $$('[data-page-link]').forEach((a) => {
    if (a.dataset.pageLink === page) { a.classList.add('is-active'); a.setAttribute('aria-current', 'page'); }
  });

  /* ---------- Mobile navigation ---------- */
  const burger = $('.burger');
  const mobileNav = $('.mobile-nav');
  const setMenu = (open) => {
    if (!burger || !mobileNav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
    if (open) { const first = $('a', mobileNav); first && setTimeout(() => first.focus(), 400); }
  };
  if (burger && mobileNav) {
    $$('.mobile-nav__link', mobileNav).forEach((a, i) => a.style.setProperty('--i', i));
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', mobileNav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 1024) setMenu(false); });
  }

  /* ---------- Page transitions ---------- */
  const overlay = $('.page-transition');
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#') { e.preventDefault(); return; }
    if (!overlay || reduceMotion || a.target === '_blank' || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey) return;
    let url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (!/^(https?|file):$/.test(url.protocol)) return;
    if (url.origin !== location.origin) return;
    const samePage = url.pathname === location.pathname && url.search === location.search;
    if (samePage) return; // hash links scroll natively
    e.preventDefault();
    overlay.classList.add('is-active');
    setTimeout(() => { location.href = a.href; }, 520);
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted && overlay) overlay.classList.remove('is-active'); });

  /* ---------- Custom cursor ---------- */
  const cursor = $('.cursor');
  if (cursor && finePointer && !reduceMotion) {
    document.body.classList.add('has-cursor');
    const dot = $('.cursor__dot', cursor);
    const ring = $('.cursor__ring', cursor);
    const label = $('.cursor__label', cursor);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf = null;
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (!cursor.classList.contains('is-on')) { cursor.classList.add('is-on'); if (!raf) loop(); }
    }, { passive: true });
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, select, textarea, label');
      cursor.classList.toggle('is-hover', !!target);
      const txt = target && target.dataset ? target.dataset.cursor : '';
      cursor.classList.toggle('is-label', !!txt);
      label.textContent = txt || '';
    });
    document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-on'));
    document.documentElement.addEventListener('mouseenter', () => cursor.classList.add('is-on'));
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    $$('[data-magnetic]').forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.3;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Hero: interactive dot-field canvas + parallax shapes ---------- */
  const canvas = $('#hero-canvas');
  if (canvas) {
    const hero = canvas.closest('.hero');
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, pts = [], raf = null, time = 0;
    const mouse = { x: -9999, y: -9999 };
    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w < 768 ? 34 : 44;
      pts = [];
      for (let x = gap / 2; x < w; x += gap) for (let y = gap / 2; y < h; y += gap) pts.push({ x, y });
    };
    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, w, h);
      const R = 190;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        let ox = 0, oy = 0, s = 1, a = 0.16;
        const wave = Math.sin(p.x * 0.012 + time * 2 + p.y * 0.01) * 0.5 + 0.5;
        a += wave * 0.14;
        if (d < R) {
          const f = 1 - d / R;
          ox = (dx / (d || 1)) * f * 24; oy = (dy / (d || 1)) * f * 24;
          s = 1 + f * 2.2; a = 0.25 + f * 0.7;
          ctx.fillStyle = `rgba(${f > 0.5 ? '0,217,255' : '139,92,246'},${a})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${a})`;
        }
        ctx.beginPath(); ctx.arc(p.x + ox, p.y + oy, 1.1 * s, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = null; };
    build();
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 120); });
    hero.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (!reduceMotion) {
        hero.style.setProperty('--mx', (e.clientX - innerWidth / 2).toFixed(1));
        hero.style.setProperty('--my', (e.clientY - innerHeight / 2).toFixed(1));
      }
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    if (reduceMotion) { draw(); stop(); }
    else {
      const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { stop(); draw(); } else stop(); }, { threshold: 0 });
      io.observe(canvas);
      document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else if (!raf) draw(); });
    }
  }

  /* ---------- Rotating words ---------- */
  $$('.rotator').forEach((rot) => {
    const words = $$('.rotator__word', rot);
    if (words.length < 2 || reduceMotion) { words[0] && words[0].classList.add('is-active'); return; }
    let i = 0; words[0].classList.add('is-active');
    setInterval(() => {
      const cur = words[i]; i = (i + 1) % words.length;
      cur.classList.remove('is-active'); cur.classList.add('is-leaving');
      setTimeout(() => cur.classList.remove('is-leaving'), 700);
      words[i].classList.add('is-active');
    }, 2600);
  });

  /* ---------- Counters (demonstrative metrics only) ---------- */
  const counters = $$('[data-count]');
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count); const dur = 1400; const start = performance.now();
      const dec = (el.dataset.decimals || 0) | 0;
      if (reduceMotion) { el.textContent = target.toFixed(dec); return; }
      const step = (now) => {
        const p = Math.min(1, (now - start) / dur); const e = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * e).toFixed(dec);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }), { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------- Generic tabs (services page) ---------- */
  $$('[data-tabs]').forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const panels = $$('[role="tabpanel"]', root);
    const activate = (tab, focus = false) => {
      tabs.forEach((tb) => { const on = tb === tab; tb.setAttribute('aria-selected', String(on)); tb.tabIndex = on ? 0 : -1; });
      panels.forEach((p) => p.classList.toggle('is-active', p.id === tab.getAttribute('aria-controls')));
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (e) => {
        const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (!(e.key in map)) return;
        e.preventDefault();
        activate(tabs[(i + map[e.key] + tabs.length) % tabs.length], true);
      });
    });
    const initial = tabs.find((tb) => tb.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initial) activate(initial);
  });

  /* ---------- Accordion (FAQ) ---------- */
  $$('[data-accordion]').forEach((acc) => {
    const btns = $$('.faq__btn', acc);
    btns.forEach((btn) => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btns.forEach((b) => { b.setAttribute('aria-expanded', 'false'); b.closest('.faq__item').classList.remove('is-open'); });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); btn.closest('.faq__item').classList.add('is-open'); }
    }));
  });

  /* ---------- Bento tiles: tap-to-reveal on touch ---------- */
  $$('.bento__toggle').forEach((btn) => btn.addEventListener('click', () => {
    const tile = btn.closest('.bento__tile');
    const open = tile.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  }));

  /* ---------- Process preview (home) ---------- */
  const proc = $('.proc');
  if (proc) {
    const tabs = $$('.proc__tab', proc);
    const panels = $$('.proc__panel', proc);
    const marker = $('.proc__orbit b', proc);
    const counter = $('.proc__orbit strong', proc);
    const dur = 4500;
    let i = 0, timer = null;
    proc.style.setProperty('--proc-dur', `${dur}ms`);
    const show = (n) => {
      i = (n + tabs.length) % tabs.length;
      tabs.forEach((tb, k) => { const on = k === i; tb.classList.toggle('is-active', on); tb.setAttribute('aria-selected', String(on)); tb.tabIndex = on ? 0 : -1; });
      panels.forEach((p, k) => p.classList.toggle('is-active', k === i));
      if (marker) marker.style.setProperty('--step', i);
      if (counter) counter.textContent = String(i + 1).padStart(2, '0');
      // restart the bar animation
      tabs[i].classList.remove('is-active'); void tabs[i].offsetWidth; tabs[i].classList.add('is-active');
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    const play = () => { if (reduceMotion) return; stopPlay(); timer = setInterval(() => show(i + 1), dur); };
    const stopPlay = () => { if (timer) clearInterval(timer); timer = null; };
    tabs.forEach((tb, k) => {
      tb.addEventListener('click', () => { show(k); play(); });
      tb.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { show(i + 1); tabs[i].focus(); }
        if (e.key === 'ArrowLeft') { show(i - 1); tabs[i].focus(); }
      });
    });
    proc.addEventListener('mouseenter', stopPlay);
    proc.addEventListener('mouseleave', play);
    proc.addEventListener('focusin', stopPlay);
    proc.addEventListener('focusout', play);
    show(0);
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) play(); else stopPlay(); }, { threshold: 0.3 });
    io.observe(proc);
  }

  /* ---------- Testimonials scroller ---------- */
  $$('.testi-wrap').forEach((wrap) => {
    const track = $('.testi-track', wrap);
    const prev = $('[data-prev]', wrap), next = $('[data-next]', wrap);
    const step = () => { const card = $('.testi', track); return card ? card.getBoundingClientRect().width + 22 : 300; };
    prev && prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    next && next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
  });

  /* ---------- Copy to clipboard ---------- */
  $$('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
    const text = btn.dataset.copy === 'email' ? SITE.email : btn.dataset.copy;
    const original = btn.innerHTML;
    try {
      await navigator.clipboard.writeText(text);
      btn.querySelector('span').textContent = t('copied');
      setTimeout(() => { btn.innerHTML = original; }, 1800);
    } catch (_) {
      // Clipboard API unavailable: select the adjacent text so the user can copy manually
      const el = btn.previousElementSibling; if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    }
  }));

  /* ---------- Current-year, external link safety ---------- */
  $$('a[target="_blank"]').forEach((a) => { if (!a.rel.includes('noopener')) a.rel = (a.rel + ' noopener noreferrer').trim(); });
})();
