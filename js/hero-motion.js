/* Hero-only interactive motion. All other pages and sections untouched. */
(() => {
  const hero = document.querySelector('.fhero');
  if (!hero || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const visual = hero.querySelector('.fhero__visual');
  const frame = hero.querySelector('.fhero__image-frame');
  if (!visual || !frame) return;
  let raf = 0, x = 0, y = 0;
  visual.addEventListener('pointermove', (e) => {
    if (innerWidth <= 980) return;
    const rect = visual.getBoundingClientRect();
    x = ((e.clientX - rect.left) / rect.width - .5) * 14;
    y = ((e.clientY - rect.top) / rect.height - .5) * 12;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      frame.style.setProperty('--fh-x', `${x.toFixed(1)}px`);
      frame.style.setProperty('--fh-y', `${y.toFixed(1)}px`);
      raf = 0;
    });
  }, { passive: true });
  visual.addEventListener('pointerleave', () => {
    frame.style.setProperty('--fh-x', '0px');
    frame.style.setProperty('--fh-y', '0px');
  });
})();
