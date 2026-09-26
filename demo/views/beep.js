// "Beep" — the comment feature. Layout: left column config cards, right column accounts + run controls +
// results + log (owner's layout spec 2026-09-25). Proxy is mandatory for every account that runs here
// (owner's fixed rule 2026-09-25) — the real-IP warnings that used to live on this page now live only on
// the Accounts page.
import { h, icon, fmtTime, debounce, copyText } from '../lib/dom.js';
import { toast, ok, err, warn } from '../lib/toast.js';
import { confirm } from '../lib/modal.js';
import { t, localeTag } from '../i18n/index.js';
import { loadRaw, saveRaw, setRunning, CHANGE_EVENT } from '../lib/beep-store.js';

const COLLAPSE_KEY = 'abt.beep.collapsed';
const DEFAULTS = {
  // one target list PER source (owner 2026-09-26): switching mode must not carry links into the UID box
  source: 'uid', items_uid: '', items_video: '', comments: '', comment_type: 'random',
  videos_per_uid: { from: 1, to: 2 },
  targets_per_account: { from: 1, to: 3 }, // links/UIDs per account; the engine spreads the list evenly
  mode: 'per_video', comments_per_video: { from: 1, to: 1 },
  interval: { from: 7, to: 10 },
  remove_sent: false,
  remove_done_targets: false, // drop a link/UID from the target list once a Beep on it was read back (owner 2026-09-26)
  require_proxy: true, // optional (owner 2026-09-26): off → accounts without a proxy run on the real IP
  emoji: 'random', tag_author: false,
  watch_before: { enabled: false, from: 5, to: 15 },
  watch_after: { enabled: true, from: 5, to: 12 },
  like_before: false,
  skip_commented: true, stop_on_captcha: true,
  accountIds: [],
};
function loadCollapsed() { try { return JSON.parse(localStorage.getItem(COLLAPSE_KEY) || '{}') || {}; } catch { return {}; } }
function saveCollapsed(state) { try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(state)); } catch { /* ignore */ } }
// Own PHASE map: identical wording to accounts.js' for most phases (reuses those i18n keys), but
// "login_password"/"run" read differently here ("Đăng nhập"/"Đang Beep" vs "Đăng nhập mật khẩu"/"Đang chạy") —
// that distinction is the original app's, not a refactor, so it keeps its own two keys.
const PHASE = { open_browser: 'accounts.phase.open_browser', session_check: 'accounts.phase.session_check', login_password: 'beep.phase.login_password', manual_verification: 'accounts.phase.manual_verification', session_ok: 'accounts.phase.session_ok', run: 'sidebar.job.beep', open: 'accounts.phase.open', wait: 'accounts.phase.wait', comment: 'accounts.phase.comment', skip: 'accounts.phase.skip', close_browser: 'accounts.phase.close_browser', finished: 'accounts.phase.finished' };

export function BeepView({ root, api, app }) {
  let cfg = load();
  let accounts = [];
  let accQuery = '';
  const rows = new Map(); // accountId -> {username, phase, verified, total, status, error, leftMs}
  const logLines = [];

  // ---- collapsible left-column cards (owner's layout spec 2026-09-25 evening): every left-column card
  // gets a clickable h3 header (chevron + title) that toggles its body; collapsed state remembered per
  // card id in localStorage, default all expanded. Right column is unaffected. ----------------------
  const collapsed = loadCollapsed();
  const card = (id, titleText, ...bodyChildren) => {
    const body = h('div', { class: 'card-body' }, ...bodyChildren);
    // CSS-drawn triangle (border trick), not a Unicode ▾/▸ glyph: the Beep Browser/Chromium font stack
    // rendered those as an unreadable dot at some sizes — a border-triangle renders identically everywhere.
    // Its rotation follows the ancestor .card.collapsed class in styles.css, so no JS textContent flip needed.
    const chev = h('span', { class: 'chev', 'aria-hidden': 'true' });
    const label = h('span', {}, titleText);
    const toggleBtn = h('button', { type: 'button', class: 'card-toggle', 'aria-expanded': collapsed[id] ? 'false' : 'true', onClick: () => { collapsed[id] = !collapsed[id]; saveCollapsed(collapsed); apply(); } }, chev, label);
    const el = h('div', { class: `card collapsible${collapsed[id] ? ' collapsed' : ''}` }, h('h3', {}, toggleBtn), body);
    function apply() {
      el.classList.toggle('collapsed', !!collapsed[id]);
      toggleBtn.setAttribute('aria-expanded', collapsed[id] ? 'false' : 'true');
    }
    return el;
  };

  // ---- controls ---------------------------------------------------------------------------------
  const seg = (opts, get, set) => { const el = h('div', { class: 'seg' }); const render = () => el.replaceChildren(...opts.map(([v, l]) => h('button', { class: get() === v ? 'active' : '', onClick: () => { set(v); render(); } }, l))); render(); return el; };
  const chk = (key, label, small) => h('label', { class: 'row', style: { gap: '8px', alignItems: 'flex-start' } }, h('input', { type: 'checkbox', checked: !!cfg[key], style: { marginTop: '3px' }, onChange: e => { cfg[key] = e.target.checked; save(); } }), h('span', {}, label, small ? h('small', { class: 'hint', style: { display: 'block' } }, small) : null));
  const rangeOf = (obj, suffix, min = 1) => h('span', { class: 'range' }, t('beep.range.from'),
    h('input', { type: 'number', min, max: 9999, value: obj.from, onChange: e => { obj.from = +e.target.value || min; save(); } }),
    t('beep.range.to'),
    h('input', { type: 'number', min, max: 9999, value: obj.to, onChange: e => { obj.to = +e.target.value || min; save(); } }),
    suffix);

  const itemsTa = h('textarea', { rows: 7, value: cfg.items, onInput: e => { cfg.items = e.target.value; save(); countItems(); } }); // cfg.items ⇄ items_uid / items_video (accessor below)
  const itemsCount = h('span', { class: 'hint' });
  const itemsHint = h('div', { class: 'hint' });
  const countItems = () => { const n = cfg.items.split('\n').filter(l => l.trim()).length; itemsCount.textContent = t('beep.items.count', { n }); itemsHint.textContent = cfg.source === 'uid' ? t('beep.items.hintUid') : t('beep.items.hintVideo'); itemsTa.placeholder = cfg.source === 'uid' ? t('beep.items.placeholderUid') : t('beep.items.placeholderVideo'); };
  const sourceSeg = seg([['uid', t('beep.source.uid')], ['video', t('beep.source.video')]], () => cfg.source, v => { cfg.source = v; itemsTa.value = cfg.items; save(); countItems(); vpuRow.style.display = v === 'uid' ? '' : 'none'; tagRow.style.display = v === 'uid' ? '' : 'none'; tpaUnit.textContent = v === 'uid' ? t('beep.tpa.unitUid') : t('beep.tpa.unitVideo'); });

  const commentsTa = h('textarea', { rows: 9, value: cfg.comments, placeholder: t('beep.comments.placeholder'), onInput: e => { cfg.comments = e.target.value; save(); countComments(); } });
  const commentsCount = h('span', { class: 'hint' });
  const countComments = () => { commentsCount.textContent = t('beep.comments.count', { n: cfg.comments.split('\n').filter(l => l.trim()).length }); };
  const fileInput = h('input', { type: 'file', accept: '.txt', style: { display: 'none' }, onChange: e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { cfg.comments = String(r.result).replace(/\r\n?/g, '\n'); commentsTa.value = cfg.comments; save(); countComments(); ok(t('beep.comments.loadedTitle'), f.name); }; r.readAsText(f, 'utf-8'); } });

  const tpaUnit = h('span', {}, cfg.source === 'uid' ? t('beep.tpa.unitUid') : t('beep.tpa.unitVideo'));
  const tpaRow = h('div', { class: 'row' }, t('beep.tpa.label'), rangeOf(cfg.targets_per_account, tpaUnit), h('small', { class: 'hint' }, t('beep.tpa.hint')));
  const vpuRow = h('div', { class: 'row' }, t('beep.vpu.label'), rangeOf(cfg.videos_per_uid, 'video'));
  vpuRow.style.display = cfg.source === 'uid' ? '' : 'none';

  const emojiSelect = h('select', {}, h('option', { value: 'off' }, t('beep.emoji.off')), h('option', { value: 'random' }, t('beep.emoji.random')), h('option', { value: 'happy' }, t('beep.emoji.happy')), h('option', { value: 'angry' }, t('beep.emoji.angry')));
  emojiSelect.value = cfg.emoji; emojiSelect.addEventListener('change', e => { cfg.emoji = e.target.value; save(); });

  // ---- "Cấu hình Beep": mode radio (per_video with inline cmt range, endless — forces remove_sent) ---
  const modeWrap = h('div', {});
  const renderMode = () => {
    modeWrap.replaceChildren(
      h('label', { class: 'row', style: { alignItems: 'flex-start' } },
        h('input', { type: 'radio', name: 'beep-mode', checked: cfg.mode === 'per_video', onChange: () => { cfg.mode = 'per_video'; save(); renderMode(); syncRemoveSent(); } }),
        h('span', {}, t('beep.mode.perVideoPrefix'), rangeOf(cfg.comments_per_video, t('beep.unit.cmt'), 1)),
      ),
      h('label', { class: 'row', style: { alignItems: 'flex-start' } },
        h('input', { type: 'radio', name: 'beep-mode', checked: cfg.mode === 'endless', onChange: () => { cfg.mode = 'endless'; save(); renderMode(); syncRemoveSent(); } }),
        h('span', {}, h('span', { title: t('beep.mode.endlessHint') }, t('beep.mode.endlessLabel')), h('small', { class: 'hint', style: { display: 'block' } }, t('beep.mode.endlessHint'))),
      ),
    );
  };

  // ---- "Nâng cao": remove_sent (forced when endless), watch_before, like_before, skip/stop/tag ------
  const removeSentInput = h('input', { type: 'checkbox', style: { marginTop: '3px' }, onChange: e => { cfg.remove_sent = e.target.checked; save(); } });
  const syncRemoveSent = () => { if (cfg.mode === 'endless') { cfg.remove_sent = true; removeSentInput.checked = true; removeSentInput.disabled = true; } else { removeSentInput.disabled = false; removeSentInput.checked = !!cfg.remove_sent; } save(); };
  const removeSentRow = h('label', { class: 'row', style: { gap: '8px', alignItems: 'flex-start' } }, removeSentInput, h('span', {}, t('beep.removeSent.label'), h('small', { class: 'hint', style: { display: 'block' } }, t('beep.removeSent.hint'))));
  // Targets: a link / UID leaves the list once a Beep on it was READ BACK on the page (verified === true) — a hidden
  // or refused comment keeps the target so the next run tries again.
  const removeDoneInput = h('input', { type: 'checkbox', style: { marginTop: '3px' }, checked: !!cfg.remove_done_targets, onChange: e => { cfg.remove_done_targets = e.target.checked; save(); } });
  const removeDoneRow = h('label', { class: 'row', style: { gap: '8px', alignItems: 'flex-start' } }, removeDoneInput, h('span', {}, t('beep.removeDone.label'), h('small', { class: 'hint', style: { display: 'block' } }, t('beep.removeDone.hint'))));

  const watchRange = rangeOf(cfg.watch_before, t('beep.unit.seconds'));
  const setWatchRangeDisabled = () => watchRange.querySelectorAll('input').forEach(i => { i.disabled = !cfg.watch_before.enabled; });
  const watchChk = h('input', { type: 'checkbox', style: { marginTop: '3px' }, checked: !!cfg.watch_before.enabled, onChange: e => { cfg.watch_before.enabled = e.target.checked; save(); setWatchRangeDisabled(); } });
  const watchRow = h('label', { class: 'row', style: { gap: '8px', alignItems: 'flex-start' } }, watchChk, h('span', {}, h('div', {}, t('beep.watchBefore.label')), h('div', { class: 'row', style: { marginTop: '4px' } }, watchRange)));
  setWatchRangeDisabled();

  const watchAfterRange = rangeOf(cfg.watch_after, t('beep.unit.seconds'), 3); // engine floor is 3 s
  const setWatchAfterRangeDisabled = () => watchAfterRange.querySelectorAll('input').forEach(i => { i.disabled = !cfg.watch_after.enabled; });
  const watchAfterChk = h('input', { type: 'checkbox', style: { marginTop: '3px' }, checked: !!cfg.watch_after.enabled, onChange: e => { cfg.watch_after.enabled = e.target.checked; save(); setWatchAfterRangeDisabled(); } });
  const watchAfterRow = h('label', { class: 'row', style: { gap: '8px', alignItems: 'flex-start' } }, watchAfterChk, h('span', {}, h('div', {}, t('beep.watchAfter.label')), h('div', { class: 'row', style: { marginTop: '4px' } }, watchAfterRange)));
  setWatchAfterRangeDisabled();

  const tagRow = chk('tag_author', t('beep.tagAuthor.label'), t('beep.tagAuthor.hint'));
  tagRow.style.display = cfg.source === 'uid' ? '' : 'none';

  // ---- accounts (Beep chỉ chạy tài khoản có proxy — C-2, quyết định 2026-09-25) ----------------------
  const accPick = h('div', { class: 'acc-pick' });
  const accInfo = h('span', { class: 'hint' });
  const accSearch = h('input', { placeholder: t('beep.accSearchPlaceholder'), onInput: debounce(e => { accQuery = e.target.value.trim().toLowerCase(); renderAccounts(); }) });
  const isEligible = a => (a.proxy ? a.proxy.status !== 'die' : cfg.require_proxy === false);
  const renderAccounts = () => {
    const eligible = accounts.filter(isEligible);
    const picked = new Set(cfg.accountIds.filter(id => eligible.some(a => a.id === id)));
    cfg.accountIds = [...picked];
    const list = accQuery ? accounts.filter(a => a.username.toLowerCase().includes(accQuery)) : accounts;
    accPick.replaceChildren(
      h('label', { style: { background: 'var(--bg-3)' } }, h('input', { type: 'checkbox', checked: eligible.length > 0 && eligible.every(a => picked.has(a.id)), onChange: e => { cfg.accountIds = e.target.checked ? eligible.map(a => a.id) : []; save(); renderAccounts(); } }), h('b', {}, t('beep.selectAll')), h('span', { class: 'hint' }, t('beep.eligibleCount', { n: eligible.length }))),
      ...(list.length ? list.map(a => {
        const noProxy = !a.proxy && cfg.require_proxy !== false; // without the rule a proxy-less account is selectable (real IP)
        const dead = a.proxy && a.proxy.status === 'die';
        const disabled = noProxy || dead;
        return h('label', { style: disabled ? { opacity: .45 } : {} },
          h('input', { type: 'checkbox', disabled, checked: picked.has(a.id), onChange: e => { if (e.target.checked) picked.add(a.id); else picked.delete(a.id); cfg.accountIds = [...picked]; save(); updateAccInfo(); } }),
          h('span', { class: 'mono' }, a.username), h('span', { class: `badge ${a.status}` }, t({ live: 'status.live', die: 'status.die', checkpoint: 'status.checkpoint', unknown: 'status.unknown' }[a.status]) || a.status),
          noProxy ? h('span', { class: 'badge unknown' }, t('beep.badge.needProxy')) : dead ? h('span', { class: 'badge die' }, t('beep.badge.proxyDie')) : !a.proxy ? h('span', { class: 'badge checkpoint' }, t('beep.badge.realIp')) : null,
        );
      }) : [h('div', { class: 'empty' }, t('beep.noMatch'))]),
    );
    updateAccInfo();
  };
  const updateAccInfo = () => { accInfo.textContent = t('beep.selectedAccounts', { n: cfg.accountIds.length }); };

  const startBtn = h('button', { class: 'btn primary', style: { padding: '14px 22px', fontSize: '16px', flex: 1, justifyContent: 'center' }, onClick: () => start() }, icon('play'), t('beep.btn.start'));
  const stopBtn = h('button', { class: 'btn danger', style: { padding: '14px 18px', fontSize: '15px' }, disabled: true, onClick: async () => { await api.comment.stop(); warn(t('beep.stopping.title'), t('beep.stopping.detail')); } }, icon('stop'), t('beep.btn.stop'));
  const progressBar = h('div', { class: 'progress' }, h('i', { style: { width: '0%' } }));
  const progressText = h('div', { class: 'hint' }, t('beep.notRunning'));
  const resultsBody = h('tbody');
  const logEl = h('div', { class: 'log' });
  // Log toolbar: clear (owner 2026-09-26) and copy — the panel keeps the last 400 lines of this session.
  const logBar = h('div', { class: 'row', style: { justifyContent: 'flex-end', gap: '6px', margin: '6px 0 -6px' } },
    h('button', { class: 'btn sm ghost', onClick: async () => { await copyText(logLines.map(e => `${new Date(e.at).toLocaleTimeString(localeTag())} ${e.message}`).join(String.fromCharCode(10))); ok(t('beep.log.copiedTitle'), t('beep.log.copiedDetail', { n: logLines.length })); } }, icon('copy'), t('beep.log.copy')),
    h('button', { class: 'btn sm ghost', onClick: () => { logLines.length = 0; logEl.replaceChildren(); appendLog({ level: 'info', message: t('beep.log.cleared'), at: new Date().toISOString() }); } }, icon('trash'), t('beep.log.clear')));

  // ---- layout: left = config cards, right = accounts + run + results + log --------------------------
  root.append(
    h('div', { class: 'topbar' }, h('div', {}, h('h1', {}, t('beep.title')), h('div', { class: 'sub' }, t('beep.subtitle')))),
    h('div', { class: 'content' },
      h('div', { class: 'beep-grid' },
        h('div', { class: 'beep-left' },
          card('targets', t('beep.card.targets'), sourceSeg, h('div', { style: { height: '8px' } }), itemsTa, h('div', { class: 'row' }, itemsCount, h('span', { class: 'spacer' })), itemsHint, h('div', { style: { height: '6px' } }), tpaRow, vpuRow, removeDoneRow),
          card('content', t('beep.card.content'), commentsTa, h('div', { class: 'row', style: { marginTop: '6px' } }, commentsCount, h('span', { class: 'spacer' }), fileInput, h('button', { class: 'btn sm', onClick: () => fileInput.click() }, icon('file'), t('beep.btn.loadFile')), h('button', { class: 'btn sm ghost', onClick: () => { cfg.comments = ''; commentsTa.value = ''; save(); countComments(); } }, t('accounts.btn.delete'))), h('div', { class: 'hint' }, t('beep.content.hint'))),
          card('style', t('beep.card.style'),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
              h('div', { class: 'row' }, h('span', {}, t('beep.style.emojiLabel')), emojiSelect),
              h('div', { class: 'row gap-lg' }, h('span', {}, t('beep.style.pickLabel')), seg([['random', t('beep.emoji.random')], ['default', t('beep.pick.sequential')]], () => cfg.comment_type, v => { cfg.comment_type = v; save(); })),
            )),
          card('config', t('beep.title'), modeWrap, h('div', { class: 'row', style: { marginTop: '8px' } }, t('beep.interval.label'), rangeOf(cfg.interval, t('beep.unit.seconds')))),
          card('advanced', t('beep.card.advanced'),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
              // Optional (owner 2026-09-26): on = accounts without a proxy are skipped; off = they run on the real IP.
              h('label', { class: 'row', style: { gap: '8px', alignItems: 'flex-start' } }, h('input', { type: 'checkbox', checked: cfg.require_proxy !== false, style: { marginTop: '3px' }, onChange: e => { cfg.require_proxy = e.target.checked; save(); renderAccounts(); } }), h('span', {}, t('beep.proxyOnly.label'), h('small', { class: 'hint', style: { display: 'block' } }, t('beep.proxyOnly.hint')))),
              removeSentRow, watchRow, watchAfterRow,
              chk('like_before', t('beep.likeBefore.label')),
              chk('skip_commented', t('beep.skipCommented.label'), t('beep.skipCommented.hint')),
              chk('stop_on_captcha', t('beep.stopOnCaptcha.label')),
              tagRow,
              h('label', { class: 'row', style: { opacity: .7 } }, h('input', { type: 'checkbox', checked: true, disabled: true }), h('span', {}, t('beep.autoCaptcha.label'), h('small', { class: 'hint', style: { display: 'block' } }, t('beep.autoCaptcha.hint')))),
              h('label', { class: 'row', style: { opacity: .7 } }, h('input', { type: 'checkbox', checked: true, disabled: true }), h('span', {}, t('beep.autoStop.label'), h('small', { class: 'hint', style: { display: 'block' } }, t('beep.autoStop.hint')))),
            )),
        ),
        h('div', { class: 'beep-right' },
          h('div', { class: 'card' }, h('h3', {}, t('beep.card.accounts')), h('div', { class: 'search' }, icon('search'), accSearch), h('div', { style: { height: '8px' } }), accPick, h('div', { class: 'row', style: { marginTop: '6px' } }, accInfo, h('span', { class: 'spacer' }), h('a', { href: '#accounts', class: 'hint' }, t('beep.manageAccountsLink')))),
          h('div', { class: 'card', style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
            h('div', { class: 'row' }, startBtn, stopBtn),
            progressBar, progressText),
          h('div', { class: 'card', style: { padding: 0 } }, h('div', { class: 'table-wrap', style: { border: 0, minHeight: '120px', maxHeight: '260px' } }, h('table', {}, h('thead', {}, h('tr', {}, [t('beep.results.account'), t('beep.results.phase'), t('beep.results.confirmSent'), t('accounts.col.lastError'), t('beep.results.updated')].map(txt => h('th', {}, txt)))), resultsBody))),
          logBar, logEl,
        ),
      ),
    ),
  );
  renderMode(); syncRemoveSent(); countItems(); countComments(); renderResults(); appendLog({ level: 'info', message: t('beep.log.ready'), at: new Date().toISOString() });

  // ---- behaviour --------------------------------------------------------------------------------
  function buildConfig() {
    if (!cfg.items.trim()) { warn(t('beep.warn.noTargetsTitle'), cfg.source === 'uid' ? t('beep.warn.noTargetsUid') : t('beep.warn.noTargetsVideo')); return null; }
    if (!cfg.comments.trim()) { warn(t('beep.warn.noComments')); return null; }
    if (!cfg.accountIds.length) { warn(t('beep.warn.noAccounts')); return null; }
    return {
      source: cfg.source, items: cfg.items, comments: cfg.comments, comment_type: cfg.comment_type,
      videos_per_uid: cfg.videos_per_uid, targets_per_account: cfg.targets_per_account, mode: cfg.mode, comments_per_video: cfg.comments_per_video,
      interval: cfg.interval, remove_sent: cfg.mode === 'endless' ? true : cfg.remove_sent, require_proxy: cfg.require_proxy !== false, remove_done_targets: cfg.remove_done_targets === true,
      emoji: cfg.emoji, tag_author: cfg.tag_author, watch_before: cfg.watch_before, watch_after: cfg.watch_after, like_before: cfg.like_before,
      skip_commented: cfg.skip_commented, stop_on_captcha: cfg.stop_on_captcha,
    };
  }
  async function start() {
    const c = buildConfig(); if (!c) return;
    if (!(await confirm(t('beep.confirm.startTitle'), t('beep.confirm.startMessage', { accounts: cfg.accountIds.length, targets: cfg.items.split('\n').filter(l => l.trim()).length }), { okLabel: t('beep.confirm.startOk') }))) return;
    setRunning(c); // the bank/target removals (lib/beep-store.js) follow the config the JOB runs with, not what the user edits meanwhile
    try { rows.clear(); renderResults(); await api.comment.start(cfg.accountIds, c); toast(t('beep.toast.startedTitle'), t('accounts.countAccounts', { n: cfg.accountIds.length }), 'ok'); }
    catch (e) { err(t('beep.err.cantStart'), e.message); }
  }
  // The store shrank the bank / a target list while a job runs (possibly while this view was not mounted):
  // pull the new text into the fields without touching anything else the user is editing.
  function refreshFromStore() {
    const raw = loadRaw(); if (!raw) return;
    if (typeof raw.comments === 'string' && raw.comments !== cfg.comments) { cfg.comments = raw.comments; commentsTa.value = cfg.comments; countComments(); }
    let items = false;
    if (typeof raw.items_uid === 'string' && raw.items_uid !== cfg.items_uid) { cfg.items_uid = raw.items_uid; items = true; }
    if (typeof raw.items_video === 'string' && raw.items_video !== cfg.items_video) { cfg.items_video = raw.items_video; items = true; }
    if (items) { itemsTa.value = cfg.items; countItems(); }
  }
  const onStoreChange = () => refreshFromStore();
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  function setRunningUi(on) { startBtn.disabled = on; stopBtn.disabled = !on; }
  function renderResults() {
    const list = [...rows.values()];
    resultsBody.replaceChildren(...(list.length ? list.map(r => h('tr', {}, h('td', { class: 'mono' }, r.username), h('td', {}, h('span', { class: `badge ${r.status === 'ok' ? 'live' : r.status === 'failed' ? 'die' : r.phase === 'manual_verification' ? 'checkpoint' : 'info'}` }, r.phase === 'manual_verification' && r.leftMs != null ? t('beep.waitingCode', { s: Math.ceil(r.leftMs / 1000) }) : (t(PHASE[r.phase]) || r.phase))), h('td', {}, `${r.verified} / ${r.total}`), h('td', { class: 'dim' }, h('span', { class: 'truncate', title: r.error || '' }, r.error || '—')), h('td', { class: 'dim' }, fmtTime(r.at)))) : [h('tr', {}, h('td', { colspan: 5, class: 'empty' }, t('beep.results.empty')))]));
  }
  function appendLog(e) { logLines.push(e); if (logLines.length > 400) logLines.shift(); logEl.appendChild(h('div', { class: e.level }, h('time', {}, new Date(e.at).toLocaleTimeString(localeTag())), e.message)); logEl.scrollTop = logEl.scrollHeight; }
  // `items` reads/writes the list of the CURRENT source; both lists persist. Not enumerable → not saved twice.
  function withItemsAccessor(o) {
    if (Object.getOwnPropertyDescriptor(o, 'items') && Object.getOwnPropertyDescriptor(o, 'items').get) return o;
    Object.defineProperty(o, 'items', { enumerable: false, configurable: true, get() { return o.source === 'uid' ? (o.items_uid || '') : (o.items_video || ''); }, set(v) { if (o.source === 'uid') o.items_uid = v; else o.items_video = v; } });
    return o;
  }
  function save() { saveRaw(cfg); }
  function load() {
    try {
      const s = loadRaw();
      if (!s) return withItemsAccessor(structuredClone(DEFAULTS));
      // migrate pre-2026-09-25 shape: boolean emoji, duration_min/require_proxy/dryRun removed, mode/remove_sent/watch_before/watch_after/like_before are new
      const emoji = typeof s.emoji === 'boolean' ? (s.emoji ? 'random' : 'off') : (s.emoji || DEFAULTS.emoji);
      const merged = { ...DEFAULTS, ...s, emoji };
      delete merged.duration_min; delete merged.require_proxy; delete merged.dryRun;
      merged.videos_per_uid = { ...DEFAULTS.videos_per_uid, ...(s.videos_per_uid || {}) };
      merged.targets_per_account = { ...DEFAULTS.targets_per_account, ...(s.targets_per_account || {}) };
      merged.remove_done_targets = s.remove_done_targets === true;
      merged.require_proxy = s.require_proxy !== false;
      if (typeof s.items === 'string' && s.items.trim() && !s.items_uid && !s.items_video) { if ((s.source || 'uid') === 'uid') merged.items_uid = s.items; else merged.items_video = s.items; }
      delete merged.items;
      withItemsAccessor(merged);
      merged.comments_per_video = { ...DEFAULTS.comments_per_video, ...(s.comments_per_video || {}) };
      merged.interval = { ...DEFAULTS.interval, ...(s.interval || {}) };
      merged.watch_before = { ...DEFAULTS.watch_before, ...(s.watch_before || {}) };
      merged.watch_after = { ...DEFAULTS.watch_after, ...(s.watch_after || {}) };
      merged.mode = s.mode === 'endless' ? 'endless' : 'per_video';
      return merged;
    } catch { return withItemsAccessor(structuredClone(DEFAULTS)); }
  }

  let total = 0;
  const offs = [
    api.on.accountsChanged(async () => { accounts = await api.accounts.list(); renderAccounts(); }),
    api.on.jobStarted(j => { if (j.kind !== 'comment') return; total = j.total; setRunningUi(true); progressBar.firstChild.style.width = '0%'; progressText.textContent = t('beep.progressCount', { done: 0, total: j.total }); }),
    api.on.jobProgress(p => {
      const r = rows.get(p.accountId) || { username: p.username, phase: '', verified: 0, total: 0, status: 'running', error: null, at: null };
      r.phase = p.phase; r.at = new Date().toISOString(); r.leftMs = p.leftMs ?? null;
      if (p.phase === 'comment') { r.total++; if (p.verified === true) r.verified++; if (p.error) r.error = p.error; }
      if (p.phase === 'finished') { r.status = p.status; r.error = p.error || r.error; const done = [...rows.values()].filter(x => x.status !== 'running').length + 1; progressBar.firstChild.style.width = `${Math.round(done / Math.max(1, total) * 100)}%`; progressText.textContent = t('beep.progressCount', { done, total }); }
      rows.set(p.accountId, r); renderResults();
    }),
    api.on.jobFinished(j => { if (j.kind !== 'comment') return; setRunningUi(false); progressText.textContent = j.stopped ? t('job.stoppedTitle') : t('job.doneTitle'); }),
    // The bank / target-list removals on commentLogged live in app.js + lib/beep-store.js (app lifetime);
    // this view only mirrors the stored text (refreshFromStore above).
    api.on.log(appendLog),
  ];
  (async () => {
    accounts = await api.accounts.list().catch(() => []); renderAccounts();
    const s = await api.comment.status().catch(() => null); if (s && s.running && s.kind === 'comment') setRunningUi(true);
    const hist = await api.comment.history().catch(() => null); if (hist) for (const e of hist.activity.slice(-60)) appendLog({ level: e.level, message: e.message, at: e.created_at || e.at });
  })();
  return { destroy() { offs.forEach(f => f()); window.removeEventListener(CHANGE_EVENT, onStoreChange); } };
}
