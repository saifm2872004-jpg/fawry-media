/* =====================================================================
   [YOUR COMPANY NAME] — Animations
   Text splitting, IntersectionObserver reveals, scroll-highlighted
   statement text, process timeline interactions. Vanilla JS only.
   ===================================================================== */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Text splitting (accessible) ---------- */
  const splitText = (el) => {
    if (el.dataset.splitDone) return;
    const plain = el.textContent.trim();
    const state = { i: 0 };
    const stepDelay = parseFloat(el.dataset.splitDelay || 0.028);
    const base = parseFloat(el.dataset.splitStart || 0);
    const splitNode = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'word';
            Array.from(part).forEach((ch) => {
              const c = document.createElement('span'); c.className = 'char'; c.textContent = ch;
              c.style.setProperty('--d', `${(base + state.i++ * stepDelay).toFixed(3)}s`);
              w.appendChild(c);
            });
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) splitNode(child);
      });
    };
    const wrapper = document.createElement('span');
    wrapper.setAttribute('aria-hidden', 'true');
    while (el.firstChild) wrapper.appendChild(el.firstChild);
    splitNode(wrapper);
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = plain;
    el.append(sr, wrapper);
    el.classList.add('split');
    el.dataset.splitDone = '1';
  };
  $$('[data-split]').forEach(splitText);

  /* ---------- Reveal observer ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-visible');
      revealIO.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  const observe = (root = document) => {
    $$('[data-stagger]', root).forEach((g) => Array.from(g.children).forEach((c, i) => c.style.setProperty('--i', i)));
    $$('.reveal, .split, [data-stagger], [data-watch]', root).forEach((el) => {
      if (el.classList.contains('is-visible')) return;
      if (reduceMotion) { el.classList.add('is-visible'); return; }
      revealIO.observe(el);
    });
  };
  window.AGENCY = window.AGENCY || {};
  window.AGENCY.observe = observe;
  window.AGENCY.splitText = splitText;
  observe();

  /* ---------- Scroll-highlighted statement ---------- */
  $$('.statement').forEach((st) => {
    const html = st.innerHTML;
    const temp = document.createElement('div'); temp.innerHTML = html;
    const out = [];
    const walk = (node, hl) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          n.textContent.split(/\s+/).filter(Boolean).forEach((w) => out.push(`<span class="w${hl ? ' hl' : ''}">${w}</span>`));
        } else if (n.nodeType === Node.ELEMENT_NODE) walk(n, n.tagName === 'EM' || n.tagName === 'STRONG' || hl);
      });
    };
    walk(temp, false);
    const plain = st.textContent.trim();
    st.innerHTML = `<span class="sr-only">${plain}</span><span aria-hidden="true">${out.join(' ')}</span>`;
    const words = $$('.w', st);
    if (reduceMotion) { words.forEach((w) => w.classList.add('is-on')); return; }
    let ticking = false;
    const update = () => {
      const r = st.getBoundingClientRect();
      const start = innerHeight * 0.85, end = innerHeight * 0.35;
      const p = Math.min(1, Math.max(0, (start - r.top) / (r.height + (start - end))));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-on', i < n));
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  });

  /* ---------- Hero shapes depth init ---------- */
  $$('.shape[data-depth]').forEach((s) => s.style.setProperty('--depth', s.dataset.depth));

  /* ---------- Process page timeline ---------- */
  const timeline = $('.timeline');
  if (timeline) {
    const steps = $$('.step', timeline);
    const links = $$('.timeline__nav a', timeline);
    const progress = $('.timeline__progress', timeline);
    const list = $('.timeline__list', timeline);

    const setActive = (id) => {
      steps.forEach((s) => s.classList.toggle('is-active', s.id === id));
      links.forEach((l) => {
        const on = l.getAttribute('href') === `#${id}`;
        l.classList.toggle('is-active', on);
        if (on) l.setAttribute('aria-current', 'step'); else l.removeAttribute('aria-current');
      });
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    steps.forEach((s) => io.observe(s));

    let ticking = false;
    const upd = () => {
      const r = list.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.5 - r.top) / r.height));
      if (progress) progress.style.height = `${(p * 100).toFixed(2)}%`;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(upd); ticking = true; } }, { passive: true });
    upd();

    $$('.step__toggle', timeline).forEach((btn) => btn.addEventListener('click', () => {
      const step = btn.closest('.step');
      const open = step.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      const label = $('.step__toggle-text', btn);
      if (label) label.textContent = open ? btn.dataset.closeText : btn.dataset.openText;
    }));

    links.forEach((l) => l.addEventListener('click', (e) => {
      const target = $(l.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', l.getAttribute('href'));
    }));

    if (steps[0]) setActive(steps[0].id);
  }

  /* ---------- Hover tilt for highlighted cards (subtle) ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    $$('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }
})();
