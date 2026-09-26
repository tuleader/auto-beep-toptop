// Shell: sidebar navigation, terms gate on first run, donate panel, notices, captcha status chip.
import { h, icon, clear } from './lib/dom.js';
import { api, isMock } from './lib/api.js';
import { toast, err, warn } from './lib/toast.js';
import { openTerms, TERMS_VERSION } from './components/terms.js';
import { openDonate, donateButton } from './components/donate.js';
import { AccountsView } from './views/accounts.js';
import { ProxiesView } from './views/proxies.js';
import { BeepView } from './views/beep.js';
import { SettingsView } from './views/settings.js';
import { t, getLang, setLang, onLangChange, localeTag } from './i18n/index.js';
import { applyCommentLogged, clearRunning } from './lib/beep-store.js';

// A file dropped anywhere on the window would navigate the renderer to it (Electron's default) — the main
// process blocks the navigation, and the renderer refuses the drop up front (review 2026-09-26 C-H2).
for (const ev of ['dragover', 'drop']) window.addEventListener(ev, e => { e.preventDefault(); }, { capture: true });

const VIEWS = [
  { id: 'accounts', labelKey: 'nav.accounts', icon: 'users', view: AccountsView },
  { id: 'proxies', labelKey: 'nav.proxies', icon: 'globe', view: ProxiesView },
  { id: 'beep', labelKey: 'nav.beep', icon: 'message', view: BeepView },
  { id: 'settings', labelKey: 'nav.settings', icon: 'settings', view: SettingsView },
];

const state = { route: (location.hash || '#accounts').slice(1), counts: {}, captcha: null, info: null, job: null, notices: [] };
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
let currentView = null;

// Language switch as flags (owner 2026-09-26). Inline SVG, not emoji: Windows renders flag emoji as letters.
const FLAG_SVG = {
  vi: '<svg viewBox="0 0 30 20" width="24" height="16" aria-hidden="true"><rect width="30" height="20" fill="#da251d"/><polygon fill="#ff0" points="15,4 16.9,9.4 22.6,9.4 18,12.8 19.8,18.2 15,14.8 10.2,18.2 12,12.8 7.4,9.4 13.1,9.4"/></svg>',
  en: '<svg viewBox="0 0 60 30" width="24" height="16" aria-hidden="true"><clipPath id="ukc"><rect width="60" height="30"/></clipPath><g clip-path="url(#ukc)"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" stroke-width="2"/><path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10"/><path d="M30,0 V30 M0,15 H60" stroke="#c8102e" stroke-width="6"/></g></svg>',
};
function langToggle() {
  const btn = (lang, title) => { const b = h('button', { class: getLang() === lang ? 'active' : '', title, 'aria-label': title, onClick: () => setLang(lang) }); b.innerHTML = FLAG_SVG[lang]; return b; };
  return h('div', { class: 'lang-toggle' }, h('span', { class: 'lang-label' }, t('sidebar.langLabel')), btn('vi', 'Tiếng Việt'), btn('en', 'English'));
}

function renderSidebar() {
  clear(sidebar);
  const cap = state.captcha;
  const capClass = !cap ? '' : cap.active ? 'ok' : cap.configured ? 'bad' : 'warn';
  const capText = !cap ? t('sidebar.captcha.checking') : cap.demo ? t('sidebar.captcha.demo') : cap.active === 'author' ? t('sidebar.captcha.author', { qty: fmtQty(cap.author) })
    : cap.active === 'user' ? t('sidebar.captcha.user', { qty: fmtQty(cap.user) }) : cap.needsUserKey ? t('sidebar.captcha.needsKey') : t('sidebar.captcha.noKey');
  sidebar.append(
    h('div', { class: 'brand' }, h('img', { class: 'brand-badge', src: 'data:image/png;base64,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', alt: 'AT' }), h('div', {}, h('div', { class: 'brand-name' }, 'Auto Beep TopTop'))),
    h('nav', { class: 'nav' }, VIEWS.map(v => h('button', { class: `nav-item ${state.route === v.id ? 'active' : ''}`, onClick: () => navigate(v.id) },
      icon(v.icon), h('span', {}, t(v.labelKey)), state.counts[v.id] != null ? h('span', { class: 'cnt' }, state.counts[v.id]) : null))),
    h('div', { class: 'sidebar-bottom' },
      h('div', { class: `chip ${capClass}`, title: cap && cap.checkedAt ? t('sidebar.captcha.checkedAt', { time: new Date(cap.checkedAt).toLocaleTimeString(localeTag()) }) : '', onClick: () => navigate('settings') }, h('span', { class: 'dot' }), h('span', {}, capText)),
      state.job ? h('div', { class: 'chip ok' }, h('span', { class: 'dot' }), h('span', {}, h('b', {}, state.job.kind === 'comment' ? t('sidebar.job.beep') : t('sidebar.job.checking')), ` ${state.job.done}/${state.job.total}`)) : null,
      donateButton(() => openDonate({ captcha: state.captcha })),
      langToggle(),
      h('div', { class: 'version' }, h('span', {}, state.info ? `v${state.info.version}${isMock ? t('sidebar.previewSuffix') : ''}` : ''), isMock ? null : h('button', { onClick: showTerms, title: t('sidebar.termsButton.title') }, t('sidebar.termsButton.label'))),
    ),
  );
}
function fmtQty(k) { return k && k.quantity != null ? Number(k.quantity).toLocaleString(localeTag()) : '?'; }

export function navigate(route) {
  state.route = route;
  location.hash = `#${route}`;
  renderSidebar();
  renderMain();
}
function renderMain() {
  const def = VIEWS.find(v => v.id === state.route) || VIEWS[0];
  if (currentView && currentView.destroy) currentView.destroy();
  clear(main);
  currentView = def.view({ root: main, api, app: appApi });
}

const appApi = {
  navigate, setCount: (id, n) => { state.counts[id] = n; renderSidebar(); }, openDonate: () => openDonate({ captcha: state.captcha }),
  captcha: () => state.captcha, refreshCaptcha: async () => { state.captcha = await api.captcha.status(true); renderSidebar(); return state.captcha; },
  job: () => state.job,
};

async function showTerms() {
  const accepted = await api.terms.get().catch(() => null);
  openTerms({ api, accepted, blocking: false });
}

// Language switch re-renders the whole shell live (owner's rule 2026-09-25): the router already tears
// down and rebuilds the current view on every navigate(), so reusing that path here needs no reload and
// no extra per-view lang wiring — app state stays in the DB/localStorage either way.
onLangChange(() => { renderSidebar(); renderMain(); });

async function boot() {
  state.info = await api.app.info().catch(() => null);
  renderSidebar();
  renderMain();
  api.ready?.();
  // Terms gate — ONCE (owner's rule 2026-09-25): shown only while no acceptance is on record. Accepting any
  // version ends it for good; a newer terms text is readable from the sidebar link but never re-prompted.
  const accepted = await api.terms.get().catch(() => null);
  if (!accepted) openTerms({ api, accepted, blocking: true, onAccepted: () => toast(t('terms.thanksTitle'), t('terms.thanksDetail'), 'ok') });
  api.captcha.status(false).then(s => { state.captcha = s; renderSidebar(); }).catch(() => {});

  api.on.captchaStatus(s => { state.captcha = s; renderSidebar(); });
  api.on.notice(n => {
    if (n.type === 'manual_login') warn(t('notice.manualLogin.title', { username: n.username }), n.message);
    else if (n.type === 'captcha_key_needed') { err(t('notice.captchaKeyNeeded.title'), n.message); appApi.refreshCaptcha().catch(() => {}); }
    else toast(t('notice.generic.title'), n.message, 'warn');
  });
  api.on.jobStarted(j => { state.job = { ...j, done: 0 }; renderSidebar(); });
  api.on.jobProgress(p => { if (state.job && p.phase === 'finished') { state.job.done++; renderSidebar(); } });
  api.on.jobFinished(j => { state.job = null; renderSidebar(); if (j.kind === 'comment') clearRunning(); const s = j.summary || {}; toast(j.stopped ? t('job.stoppedTitle') : t('job.doneTitle'), t('job.summary', { ok: s.ok ?? 0, failed: s.failed ?? 0, total: s.total ?? 0 }), j.stopped ? 'warn' : 'ok', 6000); });
  // Bank / target-list shrinking follows the job wherever the user is in the app (lib/beep-store.js).
  api.on.commentLogged(e => { try { applyCommentLogged(e); } catch { /* storage unavailable */ } });
  api.on.accountsChanged(async () => { const list = await api.accounts.list().catch(() => []); appApi.setCount('accounts', list.length); });
  api.on.proxiesChanged(async () => { const list = await api.proxies.list().catch(() => []); appApi.setCount('proxies', list.length); });
  const [a, p] = await Promise.all([api.accounts.list().catch(() => []), api.proxies.list().catch(() => [])]);
  state.counts.accounts = a.length; state.counts.proxies = p.length; renderSidebar();
  window.addEventListener('hashchange', () => { const r = location.hash.slice(1); if (r && r !== state.route) navigate(r); });
}
boot();
