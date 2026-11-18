# [YOUR COMPANY NAME] — Creative Digital Agency Website

A premium, multi-page static website for a creative digital agency specialising in **graphic design** and **web development**.
Built with **HTML5, CSS3 and Vanilla JavaScript (ES6+) only** — no frameworks, no libraries, no build tools.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, services preview, about preview, selected work, why us, process preview, testimonials (sample layout), CTA |
| `about.html` | Company introduction, philosophy, mission/vision, values, expertise, team layout, approach |
| `services.html` | 7 Graphic Design services (interactive tab panel) + 7 Web Development services (interactive bento grid) + FAQ |
| `portfolio.html` | Filterable, asymmetric project grid (All / Branding / Graphic Design / UI/UX / Web Development) |
| `project.html` | Reusable project details page — loads content via `?project=<slug>` |
| `process.html` | Interactive 7-stage timeline with scroll progress and expandable details |
| `contact.html` | Validated inquiry form with accessible error/success states and an optional `mailto:` handoff |

## File architecture

```
project/
  index.html  about.html  services.html  portfolio.html  project.html  process.html  contact.html
  css/
    style.css        — design tokens, layout primitives, components, all page sections
    animations.css   — keyframes, reveal states, text-split states, reduced-motion overrides
    responsive.css   — breakpoints 1920 / 1200 / 1024 / 768 / 560 / 430 / 375 / 320
  js/
    main.js          — SITE_CONFIG, i18n hook, header, nav, cursor, magnetic buttons, page transitions,
                       hero canvas, counters, tabs, accordion, process preview, testimonials, clipboard
    animations.js    — text splitting, IntersectionObserver reveals, scroll-highlighted statement, timeline
    portfolio.js     — work grids, filters, dynamic project page
    projects-data.js — project content + procedural SVG artwork generator
    contact.js       — validation, status messaging, mailto handoff
  assets/
    images/og-cover.svg   — Open Graph placeholder (replace with a 1200×630 PNG/JPG for best crawler support)
    icons/                — reserved for custom icon assets (favicon is currently an inline SVG data URI)
  README.md
```

## Running the site

Open `index.html` directly in a browser, or serve the folder with any static server
(e.g. `python3 -m http.server`). No build step is required.

## Customisation checklist

1. **Company details** — edit `SITE_CONFIG` at the top of `js/main.js` (name, email, phone, location, social URLs).
   Every `[data-site]` element across the site updates automatically. Also search-and-replace
   `[YOUR COMPANY NAME]` in page `<title>` / meta tags and `hello@yourcompany.com` in static `mailto:` links.
2. **Projects** — replace the entries in `js/projects-data.js`. Add an `image: 'assets/images/your-file.jpg'`
   property to any project to use a real photograph/mockup instead of the generated SVG artwork.
   The "Concept Work" label is driven by `I18N.en.concept` — change or remove it once genuine case studies are in place.
3. **Testimonials** — the home page section is clearly labelled as a sample layout. Replace the quotes and remove
   the `badge-sample` element once you have genuine, permissioned client feedback.
4. **Team** — update names, roles and avatars in `about.html`.
5. **Budget ranges** — update the `[Amount]` placeholders in the contact form's budget selector.
6. **Open Graph image** — replace `assets/images/og-cover.svg` with a 1200×630 raster image and update the `og:image` tags.

## Contact form behaviour (important)

The site is front-end only. The form validates client-side and then offers a **real `mailto:` handoff**,
which opens the visitor's configured email application with the subject and body pre-filled. It also offers
"Copy message" as a fallback. It never claims that a message was sent to a server.
To connect a real backend later, replace the `submit` handler in `js/contact.js` with a `fetch()` call to your endpoint.

## Adding Arabic (RTL) later

The architecture is prepared for a second locale:

- Layout rules use CSS logical properties (`inset-inline`, `padding-inline-start`, `margin-inline`, `text-align: start`).
- Set `<html lang="ar" dir="rtl">` on the Arabic pages — the header, cards, forms and timeline mirror automatically.
- JavaScript-generated strings are read from the `I18N` object in `js/main.js`; add an `ar` key with translations.
- Static copy lives in the HTML; create `ar/` copies of the pages (or a language switcher) and translate the content.
- Add an Arabic display/body typeface in the `<link>` font request and extend `--font-display` / `--font-body` for `[lang="ar"]`.

## Accessibility & performance notes

- Semantic landmarks, logical heading order, skip link, focus-visible styles, ARIA on tabs/accordions/menus/forms.
- Animated text keeps a screen-reader copy (`.sr-only`) and hides the split characters from assistive tech.
- `prefers-reduced-motion` disables the canvas loop, parallax, marquee, autoplay and transitions.
- Animations use only `transform` and `opacity`; the hero canvas pauses when off-screen or when the tab is hidden.
- Custom cursor and magnetic effects are enabled only on fine-pointer, hover-capable devices.
- No external images are requested; all project visuals are generated inline SVG.

## Content policy

No lorem ipsum, invented awards, fabricated statistics or fictional client endorsements are used.
Demonstrative counters on the home page reflect real facts about the site's own structure (2 divisions, 14 services, 7 stages).
