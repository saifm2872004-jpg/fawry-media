/* =====================================================================
   [YOUR COMPANY NAME] — Projects data layer
   All projects below are CONCEPT WORK (clearly labeled in the UI).
   Replace this array with genuine agency case studies when available.
   Artwork is generated procedurally as inline SVG (copyright-safe,
   zero external image requests). To use real images, add an `image`
   property (path under assets/images/) and renderArtwork() will use it.
   ===================================================================== */
(function () {
  'use strict';

  const CATEGORIES = {
    branding: 'Branding',
    graphic: 'Graphic Design',
    uiux: 'UI/UX',
    web: 'Web Development'
  };

  const PROJECTS = [
    {
      slug: 'lumen',
      title: 'Lumen',
      category: 'branding',
      year: '2025',
      sector: 'Architectural lighting studio',
      palette: ['#8B5CF6', '#F472B6'],
      pattern: 'rings',
      typefaces: ['Syne', 'Manrope'],
      services: ['Brand Strategy', 'Visual Identity', 'Art Direction'],
      deliverables: ['Logo system', 'Brand guidelines', 'Stationery suite', 'Signage concepts', 'Social templates'],
      summary: 'A luminous identity system for a studio that sculpts space with light.',
      overview: 'Lumen is a concept identity for an architectural lighting studio that treats light as a building material. The brief we set ourselves was to create a brand that behaves like its subject: quiet in daylight, radiant when it matters. The result is a modular system built around a single expanding ring — a visual shorthand for a beam of light opening into a room.',
      challenge: 'Lighting studios tend to look either clinical and technical or vague and “atmospheric”. The identity had to speak fluently to architects and engineers while still carrying the emotion of a beautifully lit space, all without relying on photography the studio did not yet have.',
      solution: 'We designed a generative ring mark that expands or contracts depending on the format, paired with a restrained typographic voice and a gradient drawn from the warm-to-cool temperature range of real lighting. Guidelines describe the system as rules rather than fixed layouts, so it can scale across signage, proposals and digital touchpoints.',
      process: [
        ['Discovery', 'Audit of twelve lighting and architecture brands to map the visual territory and locate the open space.'],
        ['Concept', 'Three identity directions explored through quick mood frames, then narrowed to the ring system.'],
        ['System design', 'Logo construction, colour temperature palette, typographic scale and motion principles.'],
        ['Rollout', 'Templates for proposals, social media, signage and a compact digital guideline document.']
      ]
    },
    {
      slug: 'nova-finance',
      title: 'Nova',
      category: 'uiux',
      year: '2025',
      sector: 'Personal finance app',
      palette: ['#00D9FF', '#8B5CF6'],
      pattern: 'phone',
      typefaces: ['Manrope', 'Inter'],
      services: ['UX Research', 'Product Design', 'Design System'],
      deliverables: ['User flows', 'Wireframes', 'High-fidelity UI', 'Interactive prototype', 'Component library'],
      summary: 'A calm, confidence-building interface for everyday money management.',
      overview: 'Nova is a concept personal finance product designed for people who find banking apps stressful. Instead of dashboards full of alarming numbers, Nova leads with clarity: one question per screen, generous spacing and language that explains rather than warns.',
      challenge: 'Financial interfaces must show a lot of data without overwhelming users, meet strict accessibility expectations, and still feel like a product people want to open. The concept needed to prove that a “calm” aesthetic could coexist with dense information.',
      solution: 'We built a progressive-disclosure model where summaries come first and detail is one tap away. A dark interface with a cyan-to-violet accent range creates hierarchy, while a 4-point spacing system and a WCAG-checked colour palette keep everything legible. The design system ships as tokens, components and documented states.',
      process: [
        ['Research', 'Interviews-style scenario mapping and a heuristic review of common finance app patterns.'],
        ['Architecture', 'Information architecture and primary flows: onboarding, overview, budgeting, insights.'],
        ['UI design', 'Visual language, component library and motion specification for transitions.'],
        ['Prototype', 'Clickable prototype covering the core journey for usability walkthroughs.']
      ]
    },
    {
      slug: 'atlas-architects',
      title: 'Atlas',
      category: 'web',
      year: '2025',
      sector: 'Architecture practice',
      palette: ['#00D9FF', '#0EA5E9'],
      pattern: 'browser',
      typefaces: ['Syne', 'Manrope'],
      services: ['Web Design', 'Front-End Development', 'Performance'],
      tech: ['HTML5', 'CSS Grid', 'Vanilla JavaScript', 'IntersectionObserver', 'SVG'],
      deliverables: ['Responsive website', 'Project archive', 'CMS-ready templates', 'Performance budget'],
      summary: 'An editorial, image-led corporate website built for speed and longevity.',
      overview: 'Atlas is a concept corporate website for an architecture practice with a large body of work. The site is designed as a digital monograph: full-bleed project imagery, generous white space and a typographic rhythm that lets the architecture breathe.',
      challenge: 'Image-heavy architecture sites are often slow and fragile. The concept had to deliver a cinematic experience while keeping load times low, remaining accessible, and staying easy to extend as new projects are added.',
      solution: 'A component-based front end written in plain HTML, CSS and JavaScript — no framework overhead. Images are lazy-loaded with responsive sizes, layouts use CSS Grid with graceful fallbacks, and every animation is driven by IntersectionObserver so nothing runs off-screen. Templates are structured for a straightforward CMS integration.',
      process: [
        ['Discovery', 'Content audit and definition of page templates: home, practice, projects, project detail, journal.'],
        ['Design', 'Editorial grid system, typographic scale and art direction for imagery.'],
        ['Build', 'Semantic templates, performance-first asset strategy and accessible navigation.'],
        ['QA & launch prep', 'Cross-browser testing, Lighthouse checks and a handover document.']
      ]
    },
    {
      slug: 'verdant',
      title: 'Verdant',
      category: 'graphic',
      year: '2025',
      sector: 'Plant-based skincare',
      palette: ['#34D399', '#00D9FF'],
      pattern: 'blocks',
      typefaces: ['Syne', 'Manrope'],
      services: ['Packaging Design', 'Campaign Design', 'Print'],
      deliverables: ['Packaging range', 'Campaign key visual', 'Print advertising', 'Retail display concepts', 'Social launch kit'],
      summary: 'A packaging and campaign system that puts botanical honesty on the shelf.',
      overview: 'Verdant is a concept launch campaign for a plant-based skincare range. The system is built on bold colour blocking and oversized typography — a deliberate departure from the pastel minimalism that dominates the category.',
      challenge: 'Natural skincare brands share a visual vocabulary of beige tones and thin serif type. Verdant needed to feel genuinely natural without being invisible on a crowded shelf or a crowded feed.',
      solution: 'We paired saturated botanical greens with a cool cyan accent and a confident typographic voice. Each product in the range owns a colour block, so the full line reads as a spectrum when displayed together. The campaign extends the system into print, out-of-home concepts and animated social assets.',
      process: [
        ['Category audit', 'Shelf and social landscape review to identify the visual conventions worth breaking.'],
        ['Design system', 'Colour architecture, typography and a flexible layout grid for packaging faces.'],
        ['Campaign', 'Key visual development and adaptation across print and digital formats.'],
        ['Production files', 'Print-ready artwork with dielines and colour specifications.']
      ]
    },
    {
      slug: 'orbit',
      title: 'Orbit',
      category: 'web',
      year: '2025',
      sector: 'Independent photographer',
      palette: ['#8B5CF6', '#00D9FF'],
      pattern: 'browser',
      typefaces: ['Syne', 'Manrope'],
      services: ['Portfolio Website', 'Interaction Design', 'Front-End Development'],
      tech: ['HTML5', 'CSS Animations', 'Vanilla JavaScript', 'Canvas API', 'Lazy loading'],
      deliverables: ['Portfolio website', 'Gallery system', 'Contact flow', 'Deployment guide'],
      summary: 'An immersive portfolio site where the work leads and the interface disappears.',
      overview: 'Orbit is a concept portfolio website for an independent photographer. The experience is built around a horizontal gallery that responds to scroll and cursor, with a minimal interface that steps aside the moment imagery appears.',
      challenge: 'Portfolio sites must balance personality with restraint. Too much interaction distracts from the work; too little and the site is forgettable. Everything also had to degrade gracefully on touch devices and respect reduced-motion preferences.',
      solution: 'We designed a scroll-driven gallery with momentum and a subtle parallax layer, implemented with plain JavaScript and CSS transforms. On touch devices the layout switches to a vertical rhythm, and all motion honours prefers-reduced-motion. The result is fast, distinctive and easy to maintain.',
      process: [
        ['Concept', 'Interaction sketches and a motion study for the gallery behaviour.'],
        ['Design', 'Typography, layout and image treatment across three breakpoints.'],
        ['Development', 'Custom gallery engine, lazy-loading strategy and accessibility pass.'],
        ['Refinement', 'Performance tuning and device testing.']
      ]
    },
    {
      slug: 'helix-health',
      title: 'Helix',
      category: 'uiux',
      year: '2025',
      sector: 'Telehealth platform',
      palette: ['#A78BFA', '#F0ABFC'],
      pattern: 'phone',
      typefaces: ['Manrope', 'Inter'],
      services: ['UX Design', 'UI Design', 'Accessibility'],
      deliverables: ['Patient app UI', 'Clinician dashboard', 'Accessibility audit', 'Design tokens'],
      summary: 'A reassuring, accessible interface for remote consultations.',
      overview: 'Helix is a concept telehealth platform covering two audiences: patients booking and attending remote consultations, and clinicians managing their day. The design focuses on reassurance — clear next steps, readable type and an interface that never feels rushed.',
      challenge: 'Healthcare interfaces must serve people of every age and ability, often in moments of stress. The concept needed to be WCAG-conscious from the first wireframe while still feeling modern and warm rather than institutional.',
      solution: 'Large touch targets, high-contrast text, plain-language microcopy and a soft violet palette form the patient experience. The clinician dashboard uses the same tokens with denser layouts optimised for keyboard navigation. Both are documented as a shared design-token set.',
      process: [
        ['Discovery', 'Journey mapping for the two user groups and definition of critical paths.'],
        ['Wireframes', 'Low-fidelity flows with a focus on error prevention and clarity.'],
        ['Visual design', 'Accessible colour system, typography and component states.'],
        ['Validation', 'Contrast checks, keyboard walkthroughs and screen-reader review of key screens.']
      ]
    },
    {
      slug: 'mono-coffee',
      title: 'Mono',
      category: 'branding',
      year: '2025',
      sector: 'Specialty coffee roaster',
      palette: ['#F59E0B', '#8B5CF6'],
      pattern: 'type',
      typefaces: ['Syne', 'Manrope'],
      services: ['Naming Support', 'Visual Identity', 'Packaging'],
      deliverables: ['Wordmark & monogram', 'Colour & type system', 'Coffee bag labels', 'Café signage', 'Merchandise'],
      summary: 'A typographic identity for a roaster obsessed with single origins.',
      overview: 'Mono is a concept identity for a specialty roaster that only sells single-origin coffee. The name became the idea: one origin, one typeface, one bold monogram that anchors every touchpoint.',
      challenge: 'Specialty coffee branding is crowded with illustration-led and craft-inspired identities. Mono needed a sharper, more contemporary stance that would still feel warm enough for a neighbourhood café.',
      solution: 'A heavy geometric “M” monogram sits inside a strict typographic grid, with origin names set in a single weight to reinforce the “mono” idea. A warm amber and deep violet pairing gives the brand an unexpected, premium temperature across bags, cups and signage.',
      process: [
        ['Positioning', 'Clarifying the single-origin promise into a one-line brand idea.'],
        ['Identity', 'Monogram construction, typographic system and colour exploration.'],
        ['Packaging', 'Label architecture that adapts to each origin while staying unmistakably Mono.'],
        ['Guidelines', 'A concise brand book covering logo use, type, colour and tone of voice.']
      ]
    },
    {
      slug: 'pulse-festival',
      title: 'Pulse',
      category: 'graphic',
      year: '2025',
      sector: 'Electronic music festival',
      palette: ['#F43F5E', '#8B5CF6'],
      pattern: 'waves',
      typefaces: ['Syne', 'Manrope'],
      services: ['Campaign Identity', 'Poster Design', 'Motion Graphics'],
      deliverables: ['Festival key art', 'Poster series', 'Wayfinding system', 'Animated social assets', 'Merchandise graphics'],
      summary: 'A kinetic poster and campaign system driven by waveform geometry.',
      overview: 'Pulse is a concept visual campaign for a two-day electronic music festival. The entire system is generated from a waveform: lineup posters, stage signage and animated social content all share the same oscillating geometry.',
      challenge: 'Festival campaigns need to be instantly recognisable across hundreds of formats produced on tight timelines. The system had to be flexible enough for a design team to extend quickly without losing its identity.',
      solution: 'We built a small set of parametric wave patterns and a rigid typographic hierarchy. Artwork for any format is composed from these parts, which keeps production fast and consistent. Motion versions reuse the same curves, so static and animated pieces feel like one campaign.',
      process: [
        ['Concept', 'Exploration of sound-derived geometry as the core visual device.'],
        ['System', 'Pattern library, colour pairs and typographic rules for every format.'],
        ['Production', 'Poster series, wayfinding and animated social kit.'],
        ['Toolkit', 'A template pack and usage notes for the festival’s in-house team.']
      ]
    }
  ];

  PROJECTS.forEach((p) => { p.categoryLabel = CATEGORIES[p.category]; });

  /* ---------- Procedural artwork ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function patternShapes(p, g) {
    const [c1, c2] = p.palette;
    const T = esc(p.title.toUpperCase());
    const text = (x, y, size, extra = '') => `<text x="${x}" y="${y}" font-family="Syne, Arial Black, sans-serif" font-weight="800" font-size="${size}" letter-spacing="-4" fill="#fff" ${extra}>${T}</text>`;
    switch (p.pattern) {
      case 'rings': {
        let r = '';
        for (let i = 0; i < 7; i++) r += `<circle cx="560" cy="300" r="${40 + i * 38}" fill="none" stroke="url(#${g})" stroke-width="${1.2 + i * .3}" opacity="${0.95 - i * .12}"/>`;
        return `${r}<circle cx="560" cy="300" r="22" fill="#fff"/>${text(56, 540, 112)}<rect x="56" y="80" width="90" height="4" fill="url(#${g})"/>`;
      }
      case 'phone': {
        const phone = (x, y, s, o) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}"><rect width="230" height="470" rx="38" fill="#12141C" stroke="rgba(255,255,255,.14)"/><rect x="14" y="14" width="202" height="442" rx="28" fill="#0B0D14"/><rect x="30" y="46" width="90" height="12" rx="6" fill="rgba(255,255,255,.35)"/><rect x="30" y="72" width="170" height="110" rx="18" fill="url(#${g})"/><text x="46" y="140" font-family="Manrope, sans-serif" font-weight="800" font-size="34" fill="#fff">24.8k</text><rect x="30" y="200" width="170" height="54" rx="14" fill="rgba(255,255,255,.06)"/><rect x="30" y="266" width="170" height="54" rx="14" fill="rgba(255,255,255,.06)"/><rect x="30" y="332" width="170" height="54" rx="14" fill="rgba(255,255,255,.06)"/><circle cx="56" cy="227" r="12" fill="${c1}"/><circle cx="56" cy="293" r="12" fill="${c2}"/><circle cx="56" cy="359" r="12" fill="#fff" opacity=".6"/><polyline points="30,420 70,400 110,412 150,380 200,392" fill="none" stroke="url(#${g})" stroke-width="3" stroke-linecap="round"/></g>`;
        return `${phone(210, 70, 1, 1)}${phone(470, 150, .78, .92)}<circle cx="140" cy="480" r="60" fill="url(#${g})" opacity=".35"/>`;
      }
      case 'browser':
        return `<rect x="70" y="80" width="660" height="470" rx="18" fill="#12141C" stroke="rgba(255,255,255,.12)"/><circle cx="100" cy="108" r="5" fill="rgba(255,255,255,.25)"/><circle cx="118" cy="108" r="5" fill="rgba(255,255,255,.25)"/><circle cx="136" cy="108" r="5" fill="rgba(255,255,255,.25)"/><rect x="300" y="98" width="200" height="20" rx="10" fill="rgba(255,255,255,.06)"/><rect x="70" y="132" width="660" height="1" fill="rgba(255,255,255,.08)"/><rect x="110" y="176" width="250" height="26" rx="6" fill="#fff" opacity=".9"/><rect x="110" y="212" width="180" height="26" rx="6" fill="url(#${g})"/><rect x="110" y="262" width="300" height="10" rx="5" fill="rgba(255,255,255,.22)"/><rect x="110" y="282" width="240" height="10" rx="5" fill="rgba(255,255,255,.14)"/><rect x="110" y="320" width="130" height="38" rx="19" fill="url(#${g})"/><rect x="470" y="172" width="220" height="190" rx="16" fill="url(#${g})" opacity=".9"/><circle cx="640" cy="222" r="30" fill="rgba(255,255,255,.35)"/><rect x="110" y="400" width="180" height="110" rx="12" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)"/><rect x="310" y="400" width="180" height="110" rx="12" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)"/><rect x="510" y="400" width="180" height="110" rx="12" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)"/><rect x="126" y="418" width="60" height="8" rx="4" fill="${c1}"/><rect x="326" y="418" width="60" height="8" rx="4" fill="${c2}"/><rect x="526" y="418" width="60" height="8" rx="4" fill="#fff" opacity=".5"/>`;
      case 'blocks':
        return `<g transform="rotate(-10 400 320)"><rect x="150" y="150" width="150" height="330" rx="10" fill="${c1}"/><rect x="320" y="120" width="150" height="330" rx="10" fill="url(#${g})"/><rect x="490" y="150" width="150" height="330" rx="10" fill="${c2}"/><rect x="170" y="180" width="110" height="60" rx="4" fill="rgba(8,9,13,.85)"/><rect x="340" y="150" width="110" height="60" rx="4" fill="rgba(8,9,13,.85)"/><rect x="510" y="180" width="110" height="60" rx="4" fill="rgba(8,9,13,.85)"/><text x="180" y="218" font-family="Syne, sans-serif" font-weight="800" font-size="20" fill="#fff">${T}</text><text x="350" y="188" font-family="Syne, sans-serif" font-weight="800" font-size="20" fill="#fff">${T}</text><text x="520" y="218" font-family="Syne, sans-serif" font-weight="800" font-size="20" fill="#fff">${T}</text><rect x="170" y="420" width="70" height="6" rx="3" fill="rgba(8,9,13,.6)"/><rect x="340" y="390" width="70" height="6" rx="3" fill="rgba(8,9,13,.6)"/><rect x="510" y="420" width="70" height="6" rx="3" fill="rgba(8,9,13,.6)"/></g><circle cx="700" cy="90" r="40" fill="#fff" opacity=".9"/>`;
      case 'type':
        return `<g stroke="rgba(255,255,255,.07)"><line x1="0" y1="150" x2="800" y2="150"/><line x1="0" y1="300" x2="800" y2="300"/><line x1="0" y1="450" x2="800" y2="450"/><line x1="200" y1="0" x2="200" y2="600"/><line x1="400" y1="0" x2="400" y2="600"/><line x1="600" y1="0" x2="600" y2="600"/></g><text x="400" y="440" text-anchor="middle" font-family="Syne, Arial Black, sans-serif" font-weight="800" font-size="420" letter-spacing="-30" fill="url(#${g})">${esc(p.title[0])}</text><rect x="520" y="400" width="220" height="130" rx="12" fill="#F4F4F5" transform="rotate(-6 630 465)"/><rect x="540" y="430" width="80" height="8" rx="4" fill="#08090D" transform="rotate(-6 630 465)"/><rect x="540" y="450" width="120" height="6" rx="3" fill="#A1A1AA" transform="rotate(-6 630 465)"/><circle cx="700" cy="500" r="14" fill="${c1}" transform="rotate(-6 630 465)"/>${text(56, 120, 60)}`;
      case 'waves': {
        let w = '';
        for (let i = 0; i < 9; i++) {
          const y = 280 + i * 22;
          w += `<path d="M-20 ${y} C 180 ${y - 160 + i * 18}, 380 ${y + 160 - i * 18}, 560 ${y - 60 + i * 10} S 760 ${y + 80 - i * 10}, 840 ${y}" fill="none" stroke="url(#${g})" stroke-width="${2.4 - i * .18}" opacity="${1 - i * .09}"/>`;
        }
        return `${w}${text(56, 160, 128)}<text x="56" y="200" font-family="Manrope, sans-serif" font-weight="700" font-size="18" letter-spacing="6" fill="rgba(255,255,255,.6)">FESTIVAL · DAY 01 — 02</text><circle cx="700" cy="110" r="46" fill="none" stroke="#fff" stroke-width="1.5" opacity=".7"/>`;
      }
      default:
        return text(56, 520, 120);
    }
  }

  function renderArtwork(p, cls = '', opts = {}) {
    if (p.image) {
      return `<img class="artwork ${cls}" src="${esc(p.image)}" alt="${esc(p.title)} — ${esc(p.categoryLabel)} project visual" loading="lazy" decoding="async" width="800" height="600">`;
    }
    const g = `g-${p.slug}-${opts.id || 'a'}`;
    const [c1, c2] = p.palette;
    return `<svg class="artwork ${cls}" viewBox="0 0 800 600" role="img" aria-label="${esc(p.title)} — ${esc(p.categoryLabel)} concept visual" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
        <radialGradient id="${g}-r" cx=".85" cy=".1" r=".9"><stop offset="0" stop-color="${c1}" stop-opacity=".5"/><stop offset="1" stop-color="#0B0C12" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="600" fill="#0C0E15"/>
      <rect width="800" height="600" fill="url(#${g}-r)"/>
      ${patternShapes(p, g)}
    </svg>`;
  }

  window.AGENCY_CATEGORIES = CATEGORIES;
  window.AGENCY_PROJECTS = PROJECTS;
  window.renderArtwork = renderArtwork;
  window.escapeHtml = esc;
})();
