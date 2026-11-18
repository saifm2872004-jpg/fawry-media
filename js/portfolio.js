/* =====================================================================
   [YOUR COMPANY NAME] — Portfolio
   Renders work grids (home + portfolio), filtering, and the dynamic
   project details page driven by ?project=<slug>. Vanilla JS only.
   ===================================================================== */
(() => {
  'use strict';
  const P = window.AGENCY_PROJECTS;
  if (!P) return;
  const CATS = window.AGENCY_CATEGORIES;
  const esc = window.escapeHtml;
  const t = window.t || ((k) => k);
  const art = window.renderArtwork;
  const SITE = window.SITE_CONFIG || { name: 'Your Company Name' };
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const observe = (root) => window.AGENCY && window.AGENCY.observe && window.AGENCY.observe(root);

  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  const card = (p, i) => `
    <a class="work-card reveal" href="project.html?project=${p.slug}" data-cursor="${esc(t('view'))}" style="--d:${(i * 0.07).toFixed(2)}s">
      <div class="work-card__media">
        <img class="agency-work-photo" src="assets/images/${['branding-1.webp','responsive-1.webp','development-1.webp','branding-3.webp','responsive-3.webp','development-3.webp'][i % 6]}" alt="" loading="lazy" decoding="async">
        ${art(p, '', { id: 'grid' })}
        <div class="work-card__overlay" aria-hidden="true"></div>
        <span class="work-card__tag">${esc(t('concept'))}</span>
        <span class="work-card__cta" aria-hidden="true">${arrow}</span>
      </div>
      <div class="work-card__body">
        <h3 class="work-card__title">${esc(p.title)}</h3>
        <span class="work-card__cat">${esc(p.categoryLabel)} · ${esc(p.year)}</span>
      </div>
      <span class="sr-only">${esc(t('viewProject'))}: ${esc(p.title)}</span>
    </a>`;

  /* ---------- Full portfolio: one visible section per discipline ---------- */
  $$('[data-portfolio-category]').forEach((grid) => {
    const category = grid.dataset.portfolioCategory;
    const categoryPhotos = {
      branding: ['branding-1.webp', 'branding-2.webp'],
      graphic: ['branding-3.webp', 'branding-4.webp'],
      web: ['development-1.webp', 'development-3.webp'],
      uiux: ['responsive-1.webp', 'responsive-3.webp']
    };
    const items = P.filter((project) => project.category === category);
    grid.innerHTML = items.map((project, index) => {
      const photo = categoryPhotos[category][index % categoryPhotos[category].length];
      return `<a class="work-card portfolio-discipline__project reveal" href="project.html?project=${encodeURIComponent(project.slug)}" data-cursor="${esc(t('view'))}">
        <div class="work-card__media">
          <img class="agency-work-photo" src="assets/images/${photo}" alt="" loading="lazy" decoding="async">
          ${art(project, '', { id: 'portfolio-' + category + '-' + index })}
          <span class="work-card__tag">${esc(t('concept'))}</span>
          <span class="work-card__cta" aria-hidden="true">${arrow}</span>
        </div>
        <div class="work-card__body"><h4 class="work-card__title">${esc(project.title)}</h4><span class="work-card__cat">${esc(project.categoryLabel)} · ${esc(project.year)}</span></div>
      </a>`;
    }).join('');
    observe(grid);
  });

  /* ---------- Work grids ---------- */
  $$('[data-work-grid]').forEach((grid) => {
    const limit = parseInt(grid.dataset.limit, 10) || P.length;
    const exclude = grid.dataset.exclude || '';
    const filters = $$('.filter');
    const countEl = $('[data-work-count]');
    const params = new URLSearchParams(location.search);
    let current = params.get('filter') && CATS[params.get('filter')] ? params.get('filter') : 'all';

    const render = () => {
      let items = P.filter((p) => p.slug !== exclude && (current === 'all' || p.category === current));
      if (grid.dataset.related) {
        const base = P.find((p) => p.slug === exclude);
        items.sort((a, b) => (b.category === (base && base.category)) - (a.category === (base && base.category)));
      }
      items = items.slice(0, limit);
      grid.innerHTML = items.length ? items.map(card).join('') : `<p class="work-empty">${esc(t('noResults'))}</p>`;
      if (countEl) countEl.innerHTML = `<b>${String(items.length).padStart(2, '0')}</b> ${esc(t('results'))}`;
      observe(grid);
    };

    filters.forEach((btn) => {
      const key = btn.dataset.filter;
      const n = key === 'all' ? P.length : P.filter((p) => p.category === key).length;
      const small = $('small', btn); if (small) small.textContent = String(n).padStart(2, '0');
      const on = key === current;
      btn.classList.toggle('is-active', on); btn.setAttribute('aria-pressed', String(on));
      btn.addEventListener('click', () => {
        if (key === current) return;
        current = key;
        filters.forEach((b) => { const a = b === btn; b.classList.toggle('is-active', a); b.setAttribute('aria-pressed', String(a)); });
        const url = new URL(location.href); if (key === 'all') url.searchParams.delete('filter'); else url.searchParams.set('filter', key);
        history.replaceState(null, '', url);
        grid.classList.add('is-switching');
        setTimeout(() => { render(); grid.classList.remove('is-switching'); }, 320);
      });
    });
    render();
  });

  /* ---------- Project details page ---------- */
  const root = $('[data-project]');
  if (root) {
    const slug = new URLSearchParams(location.search).get('project');
    let idx = P.findIndex((p) => p.slug === slug);
    const notFound = idx === -1;
    if (notFound) idx = 0;
    const p = P[idx];
    const next = P[(idx + 1) % P.length];
    const prev = P[(idx - 1 + P.length) % P.length];

    document.title = `${p.title} — ${p.categoryLabel} Concept | ${SITE.name}`;
    const md = $('meta[name="description"]'); if (md) md.content = `${p.title}: ${p.summary} A concept ${p.categoryLabel.toLowerCase()} project by ${SITE.name}.`;
    const og = $('meta[property="og:title"]'); if (og) og.content = document.title;

    const isWeb = p.category === 'web';
    const [c1, c2] = p.palette;
    const palette = `<div class="palette" role="img" aria-label="Project colour palette">
        <div class="swatch" style="background:${c1};color:#08090D">${c1}</div>
        <div class="swatch" style="background:${c2};color:#08090D">${c2}</div>
        <div class="swatch" style="background:#F4F4F5;color:#08090D">#F4F4F5</div>
        <div class="swatch" style="background:#08090D;color:#fff;border-left:1px solid var(--line)">#08090D</div>
      </div>`;
    const specimen = `<div class="type-specimen">
        <div class="big grad-text" aria-hidden="true">Aa</div>
        <dl><div><b>Display</b> — ${esc(p.typefaces[0])}</div><div><b>Text</b> — ${esc(p.typefaces[1])}</div><div><b>Tone</b> — ${isWeb ? 'Clear, fast, structured' : 'Confident, editorial, precise'}</div></dl>
      </div>`;

    root.innerHTML = `
      <section class="project-hero">
        <div class="container">
          ${notFound ? `<p class="note reveal" style="margin-bottom:28px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg><span>The project you requested could not be found, so we're showing <strong>${esc(p.title)}</strong> instead. <a href="portfolio.html" style="text-decoration:underline">Browse all work</a>.</span></p>` : ''}
          <div class="project-hero__top">
            <div>
              <p class="eyebrow reveal"><span class="badge-sample">${esc(t('concept'))}</span> ${esc(p.categoryLabel)} · ${esc(p.year)}</p>
              <h1 class="display h1" data-split>${esc(p.title)}</h1>
              <p class="lead reveal" style="--d:.25s;margin-top:24px">${esc(p.summary)}</p>
            </div>
            <dl class="project-hero__meta reveal" style="--d:.35s">
              <div><dt>Sector</dt><dd><b>${esc(p.sector)}</b></dd></div>
              <div><dt>Discipline</dt><dd><b>${esc(p.categoryLabel)}</b></dd></div>
              <div><dt>Status</dt><dd><b>Concept study</b></dd></div>
            </dl>
          </div>
          <figure class="project-hero__media reveal reveal--scale" data-cursor="${esc(p.title)}">${art(p, '', { id: 'hero' })}</figure>
        </div>
      </section>

      <section class="section">
        <div class="container project-body">
          <dl class="project-side reveal">
            <div><dt>Client</dt><dd>Concept — not a commissioned project</dd></div>
            <div><dt>Services</dt><dd>${p.services.map(esc).join(', ')}</dd></div>
            <div><dt>Year</dt><dd>${esc(p.year)}</dd></div>
            <div><dt>Typefaces</dt><dd>${p.typefaces.map(esc).join(' + ')}</dd></div>
          </dl>
          <div>
            <div class="project-section reveal">
              <p class="eyebrow">Overview</p>
              <h2 class="display h2">The idea</h2>
              <p class="lead">${esc(p.overview)}</p>
            </div>
            <div class="project-section cs-split" data-stagger>
              <article class="cs-card"><p class="eyebrow">Challenge</p><h3 class="h3" style="margin-bottom:14px">What stood in the way</h3><p>${esc(p.challenge)}</p></article>
              <article class="cs-card"><p class="eyebrow">Creative solution</p><h3 class="h3" style="margin-bottom:14px">How we answered it</h3><p>${esc(p.solution)}</p></article>
            </div>
            <div class="project-section reveal">
              <p class="eyebrow">Process</p>
              <h2 class="display h2">From brief to delivery</h2>
              <ol class="proc-list">${p.process.map(([h, d]) => `<li><div><strong>${esc(h)}</strong><p>${esc(d)}</p></div></li>`).join('')}</ol>
            </div>
            <div class="project-section">
              <p class="eyebrow reveal">Visual showcase</p>
              <h2 class="display h2 reveal">Selected frames</h2>
              <div class="showcase" data-stagger>
                <figure class="showcase__item">${art(p, '', { id: 'show' })}</figure>
                <figure class="showcase__item">${palette}</figure>
                <figure class="showcase__item">${specimen}</figure>
              </div>
            </div>
            <div class="project-section reveal">
              <p class="eyebrow">${isWeb ? 'Technology used' : 'Design deliverables'}</p>
              <h2 class="display h2">${isWeb ? 'Built with' : 'What was delivered'}</h2>
              <div class="chips">${(isWeb ? p.tech : p.deliverables).map((d) => `<span class="chip">${esc(d)}</span>`).join('')}</div>
              ${isWeb ? `<p class="body-copy" style="margin-top:22px">Deliverables: ${p.deliverables.map(esc).join(', ')}.</p>` : ''}
            </div>
          </div>
        </div>
      </section>

      <section class="section section--flush-top">
        <div class="container">
          <div class="section__head">
            <div><p class="eyebrow reveal">Related work</p><h2 class="display h2 reveal">More concepts</h2></div>
            <a class="link-arrow reveal" href="portfolio.html">All projects ${arrow}</a>
          </div>
          <div class="work-grid" data-work-grid data-limit="3" data-exclude="${p.slug}" data-related="1"></div>
        </div>
      </section>

      <a class="next-project" href="project.html?project=${next.slug}" data-cursor="Next">
        <div class="container">
          <p class="eyebrow">Next project</p>
          <h2 class="display next-project__title">${esc(next.title)}</h2>
          <span class="cat">${esc(next.categoryLabel)} · ${esc(next.year)}</span>
        </div>
      </a>
      <div class="container" style="display:flex;justify-content:space-between;gap:16px;padding:20px 0 0;flex-wrap:wrap">
        <a class="link-arrow" href="project.html?project=${prev.slug}" style="flex-direction:row-reverse">${arrow} Previous: ${esc(prev.title)}</a>
        <a class="link-arrow" href="portfolio.html">Back to portfolio ${arrow}</a>
      </div>`;

    // Related grid was injected after the first grid pass → render it now
    const rel = $('[data-work-grid]', root);
    if (rel) {
      const items = P.filter((x) => x.slug !== p.slug).sort((a, b) => (b.category === p.category) - (a.category === p.category)).slice(0, 3);
      rel.innerHTML = items.map(card).join('');
    }
    $$('[data-split]', root).forEach((el) => window.AGENCY && window.AGENCY.splitText && window.AGENCY.splitText(el));
    observe(root);
    window.scrollTo(0, 0);
  }
})();
