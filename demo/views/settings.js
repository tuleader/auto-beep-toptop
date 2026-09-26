import { h, icon, fmtTime } from '../lib/dom.js';
// The owner's omocaptcha referral link (owner 2026-09-26): users who need their own key register through it.
const OMOCAPTCHA_REGISTER_URL = 'https://omocaptcha.com/en/auth/register?affref=1002553';
import { ok, err } from '../lib/toast.js';
import { t, getLang, setLang, localeTag } from '../i18n/index.js';

export function SettingsView({ root, api, app }) {
  const f = {};
  const num = (k, attrs = {}) => (f[k] = h('input', { type: 'number', ...attrs }));
  const row = (label, small, ctl) => [h('div', { class: 'lbl' }, label, small ? h('small', {}, small) : null), h('div', { class: 'row' }, ctl)];
  f.browser = h('select', {}, h('option', { value: 'fingerprint' }, t('settings.browser.fingerprint')), h('option', { value: 'system' }, t('settings.browser.system')));
  f.timezone = h('input', { placeholder: 'Asia/Ho_Chi_Minh', style: { width: '200px' } });
  f.chrome_path = h('input', { placeholder: t('settings.chromePathPlaceholder'), style: { flex: 1 } });
  f.user_key = h('input', { placeholder: t('settings.userKeyPlaceholder'), style: { flex: 1 }, type: 'password' });
  const chromeInfo = h('div', { class: 'hint' });
  const capInfo = h('div', { class: 'hint' });

  // Responsive grid (item 9b): 2 columns ≥1400px — "Trình duyệt" | "Cửa sổ & luồng"; "Captcha" | "Dữ liệu/khác".
  // Nothing functional changes here, only the grouping/layout of the same fields.
  const browserCard = h('div', { class: 'card' }, h('h3', {}, t('settings.card.browser')),
    h('div', { class: 'form-grid' },
      ...row(t('settings.card.browser'), t('settings.browserHint'), f.browser),
      ...row(t('settings.timezoneLabel'), t('settings.timezoneHint'), f.timezone),
      ...row(t('settings.chromePathLabel'), t('settings.chromePathHint'), [f.chrome_path, h('button', { class: 'btn', onClick: async () => { const p = await api.app.pickChrome(); if (p) f.chrome_path.value = p; } }, icon('folder'), t('settings.pickBtn'))]),
    ),
    chromeInfo,
  );
  // Window grid 4×6, min 500×600, scale 0.5, mute, headless, close_on_finish are FIXED (owner 2026-09-25
  // evening: window size is fixed now, so those rows are gone from this page — the original's values are
  // what TikTok's page automation was measured against; user-adjustable sizes/mute broke it). Only
  // threads/thread delay remain editable; the fixed values are surfaced as a one-line hint instead.
  const windowCard = h('div', { class: 'card' }, h('h3', {}, t('settings.card.window')),
    h('div', { class: 'form-grid' },
      ...row(t('settings.threadsLabel'), t('settings.threadsHint'), num('threads', { min: 1, max: 20 })),
      ...row(t('settings.threadDelayLabel'), t('beep.unit.seconds'), num('thread_delay', { min: 0, max: 60 })),
    ),
    h('div', { class: 'hint' }, t('settings.windowFixedHint')),
  );
  const captchaCard = h('div', { class: 'card' }, h('h3', {}, t('settings.card.captcha')),
    h('div', { class: 'callout' }, t('settings.captchaCallout')),
    h('div', { class: 'form-grid' }, ...row(t('settings.userKeyLabel'), 'omocaptcha.com → API key', [f.user_key, h('button', { class: 'btn', onClick: async () => { await save(); const s = await app.refreshCaptcha(); renderCap(s); } }, icon('refresh'), t('settings.checkBtn'))])),
    capInfo,
  );
  const dataCard = h('div', { class: 'card' }, h('h3', {}, t('settings.card.data')),
    h('div', { class: 'hint' }, t('settings.dataHintPrefix'), h('a', { href: '#', onClick: e => { e.preventDefault(); api.app.openDataDir(); } }, t('settings.dataHintLink')), '.'),
  );
  const langSelect = h('select', {}, h('option', { value: 'vi' }, t('settings.lang.vi')), h('option', { value: 'en' }, t('settings.lang.en')));
  langSelect.value = getLang();
  langSelect.addEventListener('change', e => setLang(e.target.value));
  // span-2 (item 9c, owner 2026-09-25 evening): with the window-card rows removed, the grid has an odd
  // number of cards — spanning the language card across both columns keeps the last row from leaving an
  // empty right half at ≥1400px.
  const langCard = h('div', { class: 'card span-2' }, h('h3', {}, t('settings.lang.title')),
    h('div', { class: 'form-grid' }, ...row(t('settings.lang.title'), t('settings.lang.hint'), langSelect)),
  );
  const saveBtn = h('button', { class: 'btn primary', onClick: () => save(true) }, icon('check'), t('settings.saveBtn'));
  root.append(
    h('div', { class: 'topbar' }, h('div', {}, h('h1', {}, t('nav.settings')), h('div', { class: 'sub' }, t('settings.subtitle'))), h('span', { class: 'spacer' }), saveBtn),
    h('div', { class: 'content' }, h('div', { class: 'settings-grid' }, browserCard, windowCard, captchaCard, dataCard, langCard)),
  );

  function renderCap(s) {
    if (!s) return;
    const line = (who, x) => t('settings.cap.line', { who, status: x.present ? (x.ok ? `${t('settings.cap.working')}${x.quantity != null ? t('settings.cap.qtyPart', { qty: Number(x.quantity).toLocaleString(localeTag()) }) : ''}${x.packageName ? t('settings.cap.pkgPart', { name: x.packageName }) : ''}${x.dateEnd ? t('settings.cap.expPart', { date: new Date(x.dateEnd).toLocaleDateString(localeTag()) }) : ''}` : t('settings.cap.notUsable', { error: x.error || t('settings.cap.genericError') })) : t('settings.cap.none') });
    capInfo.replaceChildren(h('div', {}, t('settings.cap.registerPrefix'), ' ', h('a', { href: OMOCAPTCHA_REGISTER_URL, title: OMOCAPTCHA_REGISTER_URL, onClick: e => { e.preventDefault(); api.app.openExternal(OMOCAPTCHA_REGISTER_URL).catch(() => {}); } }, t('settings.cap.registerLink')), t('settings.cap.registerSuffix')), h('div', {}, line(t('settings.cap.userLabel'), s.user)), h('div', {}, t('settings.cap.activeLine', { which: s.active === 'author' ? t('settings.cap.activeAuthor') : s.active === 'user' ? t('settings.cap.activeUser') : t('settings.cap.activeNone'), time: fmtTime(s.checkedAt) })));
  }
  async function load() {
    const s = await api.settings.get();
    for (const k of ['browser', 'timezone', 'chrome_path', 'threads', 'thread_delay']) f[k].value = s.chrome[k] ?? '';
    f.user_key.value = s.captcha.user_key || '';
    api.settings.chromeInfo().then(i => { chromeInfo.textContent = i.error ? t('settings.chrome.errorPrefix', { error: i.error }) : t('settings.chrome.usingLine', { kind: i.kind === 'fingerprint' ? t('settings.chrome.kindFingerprint') : t('settings.chrome.kindSystem'), version: i.version || '?', path: i.path }); });
    renderCap(app.captcha());
  }
  async function save(announce) {
    try {
      const chrome = { browser: f.browser.value, timezone: f.timezone.value.trim() || 'Asia/Ho_Chi_Minh', chrome_path: f.chrome_path.value.trim(), threads: +f.threads.value || 1, thread_delay: +f.thread_delay.value || 0 };
      await api.settings.save({ chrome, captcha: { user_key: f.user_key.value.trim() } });
      if (announce) ok(t('settings.savedOk'));
      api.settings.chromeInfo().then(i => { chromeInfo.textContent = i.error ? t('settings.chrome.errorPrefix', { error: i.error }) : t('settings.chrome.usingLine', { kind: i.kind === 'fingerprint' ? t('settings.chrome.kindFingerprint') : t('settings.chrome.kindSystem'), version: i.version || '?', path: i.path }); });
    } catch (e) { err(t('common.err.saveFailed'), e.message); }
  }
  load();
  const off = api.on.captchaStatus(renderCap);
  return { destroy() { off(); } };
}
