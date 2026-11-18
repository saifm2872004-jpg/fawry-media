/* =====================================================================
   [YOUR COMPANY NAME] — Contact form
   Client-side validation with accessible error messaging, honest
   front-end-only status, and an optional mailto: handoff.
   NOTE: this never pretends a server received the message.
   ===================================================================== */
(() => {
  'use strict';
  const form = document.getElementById('contact-form');
  if (!form) return;

  const SITE = window.SITE_CONFIG || { email: 'hello@yourcompany.com', name: 'Your Company Name' };
  const status = document.getElementById('form-status');
  const fields = {
    name: { el: form.elements.name, test: (v) => v.trim().length >= 2, msg: 'Please enter your name (at least 2 characters).' },
    email: { el: form.elements.email, test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: 'Please enter a valid email address, e.g. name@company.com.' },
    company: { el: form.elements.company, test: () => true, msg: '' },
    service: { el: form.elements.service, test: (v) => v !== '', msg: 'Please choose the service you are interested in.' },
    budget: { el: form.elements.budget, test: (v) => v !== '', msg: 'Please select an approximate budget range.' },
    message: { el: form.elements.message, test: (v) => v.trim().length >= 20, msg: 'Tell us a little more — at least 20 characters helps us respond properly.' },
    consent: { el: form.elements.consent, test: (v, el) => el.checked, msg: 'Please confirm you are happy for us to contact you about this inquiry.' }
  };

  /* Pre-select service from ?service= (used by service page CTAs) */
  const params = new URLSearchParams(location.search);
  const pre = params.get('service');
  if (pre && fields.service.el) {
    const opt = Array.from(fields.service.el.options).find((o) => o.value === pre);
    if (opt) { fields.service.el.value = pre; fields.service.el.closest('.field').classList.add('is-valid'); }
  }

  /* Character counter */
  const counter = document.getElementById('message-count');
  if (counter && fields.message.el) {
    const upd = () => { counter.textContent = `${fields.message.el.value.length} characters`; };
    fields.message.el.addEventListener('input', upd); upd();
  }

  const setError = (key, show) => {
    const f = fields[key]; if (!f.el) return;
    const wrap = f.el.closest('.field') || f.el.closest('.form__consent');
    const err = document.getElementById(`${key}-error`);
    if (!wrap) return;
    wrap.classList.toggle('is-invalid', show);
    wrap.classList.toggle('is-valid', !show && f.el.value.trim() !== '' && key !== 'consent');
    f.el.setAttribute('aria-invalid', String(show));
    if (err) err.textContent = show ? f.msg : '';
  };
  const validate = (key) => {
    const f = fields[key]; if (!f.el) return true;
    const ok = f.test(f.el.value, f.el);
    setError(key, !ok);
    return ok;
  };

  Object.keys(fields).forEach((key) => {
    const el = fields[key].el; if (!el) return;
    el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') validate(key); });
    el.addEventListener('input', () => { if (el.closest('.field, .form__consent').classList.contains('is-invalid')) validate(key); });
    el.addEventListener('change', () => validate(key));
  });

  const icons = {
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>',
    err: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v5m0 3h.01"/></svg>'
  };
  const showStatus = (type, html) => {
    status.className = `form__status is-shown form__status--${type}`;
    status.setAttribute('role', type === 'err' ? 'alert' : 'status');
    status.innerHTML = `${icons[type]}<div>${html}</div>`;
    status.scrollIntoView({ behavior: window.AGENCY && window.AGENCY.reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  };

  const buildMessage = () => {
    const v = (k) => (fields[k].el ? fields[k].el.value.trim() : '');
    const serviceLabel = fields.service.el.options[fields.service.el.selectedIndex].text;
    const budgetLabel = fields.budget.el.options[fields.budget.el.selectedIndex].text;
    const subject = `Project inquiry — ${serviceLabel} — ${v('name')}`;
    const body = [
      `Name: ${v('name')}`,
      `Email: ${v('email')}`,
      `Company: ${v('company') || '—'}`,
      `Service: ${serviceLabel}`,
      `Budget: ${budgetLabel}`,
      `Timeline: ${form.elements.timeline ? form.elements.timeline.options[form.elements.timeline.selectedIndex].text : 'Flexible'}`,
      '',
      'Project description:',
      v('message'),
      '',
      `Sent from the ${SITE.name} website contact form.`
    ].join('\n');
    return { subject, body };
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = Object.keys(fields).filter((k) => !validate(k));
    if (invalid.length) {
      const list = invalid.map((k) => `<li><a href="#field-${k}">${fields[k].msg}</a></li>`).join('');
      showStatus('err', `<strong>Please fix ${invalid.length} ${invalid.length === 1 ? 'field' : 'fields'} before continuing.</strong><ul>${list}</ul>`);
      fields[invalid[0]].el.focus();
      return;
    }
    const { subject, body } = buildMessage();
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showStatus('ok', `
      <strong>Your message is ready — one more step.</strong>
      <p>This website is front-end only, so nothing has been sent to a server. You can hand the message to your own email application below. Note that the <em>mailto</em> option depends on an email client being configured on your device; if nothing opens, use “Copy message” and email us directly at <a href="mailto:${SITE.email}" style="text-decoration:underline">${SITE.email}</a>.</p>
      <div class="form__handoff">
        <a class="btn btn--primary btn--sm" href="${mailto}" id="mailto-link">Open in your email app</a>
        <button type="button" class="btn btn--ghost btn--sm" id="copy-message">Copy message</button>
      </div>`);
    const copyBtn = document.getElementById('copy-message');
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(`To: ${SITE.email}\nSubject: ${subject}\n\n${body}`);
        copyBtn.textContent = 'Copied to clipboard';
      } catch (_) {
        copyBtn.textContent = 'Copy not available — select the text above';
      }
      setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 2200);
    });
    document.getElementById('mailto-link').focus();
  });

  form.addEventListener('reset', () => {
    Object.keys(fields).forEach((k) => {
      const el = fields[k].el; if (!el) return;
      const wrap = el.closest('.field') || el.closest('.form__consent');
      wrap && wrap.classList.remove('is-invalid', 'is-valid');
      el.removeAttribute('aria-invalid');
      const err = document.getElementById(`${k}-error`); if (err) err.textContent = '';
    });
    status.className = 'form__status'; status.innerHTML = '';
    if (counter) counter.textContent = '0 characters';
  });
})();
