/* Fawry Media | Studio-wide cinematic micro-interactions (vanilla JS). */
(() => {
  'use strict';
  const doc = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  // Never reflow/reorder any sections. Only add cosmetic classes.
  const headingSelector = 'main h1, main h2, main .section-heading, main .section__title, main .section-title';
  const cardSelector = 'main [class*="__card"], main [class*="-card"], main .portfolio-item, main .project-item, main .service-item, main .feature-item, main .process-step';
  const used = new WeakSet();
  const watcher = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('studio-in');
      watcher.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px -25px 0px' });

  function register(root = document) {
    const targets = root.querySelectorAll(`${headingSelector}, ${cardSelector}`);
    targets.forEach((el) => {
      if (used.has(el) || el.closest('.nav, .menu, .mobile-nav, .footer') || el.hasAttribute('data-studio-ignore')) return;
      used.add(el);
      const isHeading = el.matches(headingSelector);
      // Existing animated cards keep their own effect; only use a light reveal on non-reveal cards.
      if (el.classList.contains('reveal') || el.hasAttribute('data-watch') || el.hasAttribute('data-stagger')) {
        if (!isHeading) {el.classList.add('studio-surface'); return;}
      }
      el.classList.add('studio-enter');
      if (isHeading) el.classList.add('studio-heading');
      const siblings = Array.from(el.parentElement?.children || []);
      const index = siblings.indexOf(el);
      el.style.setProperty('--studio-delay', `${Math.min(index % 5, 4) * 85}ms`);
      if (el.getBoundingClientRect().top < innerHeight * .96) el.classList.add('studio-in');
      else watcher.observe(el);
      if (!isHeading) el.classList.add('studio-surface');
    });
    root.querySelectorAll('main a:not(.btn), .footer a').forEach(a => a.classList.add('studio-link'));
    root.querySelectorAll('main .portfolio-item, main [class*="project-card"], main [class*="service-card"]').forEach(el => el.classList.add('studio-visual'));
  }

  register();
  doc.classList.add('studio-motion');
  // Portfolio may inject content after load; observe only newly added HTML nodes.
  const main = document.querySelector('main');
  if (main) {
    let queued = false;
    const mutations = new MutationObserver(records => {
      if (!records.some(r => [...r.addedNodes].some(n => n.nodeType === 1))) return;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {queued = false; register(main);});
    });
    mutations.observe(main, { childList: true, subtree: true });
  }

  if (finePointer) {
    let frame = 0, target = null, x = 0, y = 0;
    document.addEventListener('pointermove', e => {
      const card = e.target.closest('.studio-surface');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      target = card;
      x = 100 * (e.clientX - rect.left) / Math.max(rect.width, 1);
      y = 100 * (e.clientY - rect.top) / Math.max(rect.height, 1);
      if (!frame) frame = requestAnimationFrame(() => {
        target?.style.setProperty('--studio-x', `${x}%`);
        target?.style.setProperty('--studio-y', `${y}%`);
        frame = 0;
      });
    }, { passive: true });
  }
})();
