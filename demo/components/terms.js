// Terms popup. Mechanics follow the original's ModalTerm (scroll to the bottom → checkbox 1 → checkbox 2
// → Đồng ý), with the three deliberate deviations listed in docs/TERMS-ANALYSIS.md §2.
// i18n note: the legal TEXT (title/intro/sections/definitions/contact/checkbox+button labels) comes from
// content/terms.js (Vietnamese, binding) or content/terms.en.js (English translation) depending on the
// active language — that selection is what "the popup shows the text of the active language" means.
// Everything else in this file (headings/hints that are not part of the legal document itself, like
// "Định nghĩa"/"Liên hệ") is ordinary UI chrome and goes through t() against i18n/vi.js + en.js.
// The acceptance record stays version-based and language-independent: TERMS_VERSION always comes from
// content/terms.js, never from the English mirror.
import { h, icon, fmtTime } from '../lib/dom.js';
import { openModal } from '../lib/modal.js';
import { TERMS, TERMS_VERSION } from '../content/terms.js';
import { TERMS_EN } from '../content/terms.en.js';
import { t, getLang } from '../i18n/index.js';
import { copyText } from '../lib/dom.js';
import { toast } from '../lib/toast.js';

// An external link: the real URL in href (copyable, shown on hover), opened through the main process
// (shell.openExternal, host allow-listed). If that fails on a machine (no default browser, blocked), the
// URL is copied to the clipboard and shown, so the user is never left with a dead click (owner 2026-09-26).
export function extLink(api, url, label) {
  return h('a', { href: url, title: url, onClick: async e => {
    e.preventDefault();
    try { await api.app.openExternal(url); }
    catch (err) { try { await copyText(url); } catch { /* */ } toast(t('terms.linkFallbackTitle'), `${url} — ${t('terms.linkFallbackDetail')}`, 'warn'); }
  } }, label);
}

export function openTerms({ api, accepted, onAccepted, blocking = false }) {
  const TXT = getLang() === 'en' ? TERMS_EN : TERMS;
  const already = !!accepted; // any accepted version counts — the popup is a one-time gate
  let canCheck = already, read = already, agree = already;
  const cb1 = h('input', { type: 'checkbox', checked: read, disabled: !canCheck });
  const cb2 = h('input', { type: 'checkbox', checked: agree, disabled: !read });
  const btnAgree = h('button', { class: 'btn primary', disabled: !(read && agree) }, icon('check'), TXT.agree);
  const hint = h('div', { class: 'scroll-hint' }, canCheck ? '' : t('terms.scrollHint'));
  const sync = () => { cb1.disabled = !canCheck; cb2.disabled = !read; btnAgree.disabled = !(read && agree); hint.textContent = canCheck ? '' : t('terms.scrollHint'); cb1.parentElement.classList.toggle('off', !canCheck); cb2.parentElement.classList.toggle('off', !read); };
  cb1.addEventListener('change', () => { read = cb1.checked; if (!read) { agree = false; cb2.checked = false; } sync(); });
  cb2.addEventListener('change', () => { agree = cb2.checked; sync(); });

  const section = s => [
    h('h4', {}, s.heading),
    ...(s.paras || []).map(p => h('p', {}, p)),
    s.label ? h('p', {}, h('b', {}, s.label)) : null,
    s.bullets ? h('ul', {}, s.bullets.map(b => h('li', {}, b))) : null,
    ...(s.after || []).map(p => h('p', {}, p)),
  ];
  const body = h('div', { class: 'terms-body', onScroll: e => { const el = e.target; if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10 && !canCheck) { canCheck = true; sync(); } } },
    TXT === TERMS_EN ? h('div', { class: 'callout warn' }, TXT.legalNote) : null,
    h('p', {}, TXT.intro),
    TXT.sections.map(section),
    h('h4', {}, t('terms.definitionsHeading')),
    h('dl', { class: 'defs' }, TXT.definitions.map(([k, v]) => [h('dt', {}, k), h('dd', {}, v)])),
    h('h4', {}, t('terms.contactHeading')),
    h('p', {}, t('terms.contactPrefix'), ' ', extLink(api, TXT.contact.facebook, t('terms.contactFacebook')), ` · ${t('terms.contactSuffix')} `, extLink(api, TXT.contact.github, 'GitHub')),
    h('p', { class: 'hint' }, t('terms.versionLabel', { version: TERMS_VERSION })),
  );
  const checks = h('div', { class: 'terms-checks' },
    h('label', { class: canCheck ? '' : 'off' }, cb1, TXT.checkbox1),
    h('label', { class: read ? '' : 'off' }, cb2, TXT.checkbox2),
    accepted ? h('div', { class: 'hint' }, `${TXT.acceptedAtLabel} ${fmtTime(accepted.accepted_at)}`) : null,
    hint,
  );
  const m = openModal({
    title: TXT.title, size: 'lg', closable: !blocking,
    body: [body, checks],
    foot: [
      h('button', { class: 'btn danger', onClick: () => {
        if (!blocking) { m.close(); return; }
        api.app.quit(); // owner's rule: refusing the terms closes the app, no second question
      } }, TXT.disagree),
      h('span', { class: 'spacer' }),
      btnAgree,
    ],
  });
  btnAgree.addEventListener('click', async () => { const r = await api.terms.accept(TERMS_VERSION); m.close(); onAccepted?.(r); });
  setTimeout(() => { body.scrollTop = 0; }, 0);
  return m;
}
export { TERMS_VERSION };
