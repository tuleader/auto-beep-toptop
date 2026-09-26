import { h, icon, ago, debounce, copyText } from '../lib/dom.js';
import { createTable } from '../lib/table.js';
import { openModal, confirm } from '../lib/modal.js';
import { toast, ok, err, warn } from '../lib/toast.js';
import { t } from '../i18n/index.js';

const STATUS_LABEL = { live: 'status.live', die: 'status.die', checkpoint: 'status.checkpoint', unknown: 'status.unknown' };
const PHASE_LABEL = { open_browser: 'accounts.phase.open_browser', session_check: 'accounts.phase.session_check', login_password: 'accounts.phase.login_password', manual_verification: 'accounts.phase.manual_verification', session_ok: 'accounts.phase.session_ok', run: 'accounts.phase.run', close_browser: 'accounts.phase.close_browser', finished: 'accounts.phase.finished', wait: 'accounts.phase.wait', open: 'accounts.phase.open', comment: 'accounts.phase.comment', skip: 'accounts.phase.skip' };

export function AccountsView({ root, api, app }) {
  let accounts = [], proxies = [];
  const live = {}; // account_id -> current phase text (from job events)
  const statusBadge = a => h('span', { class: `badge ${a.status}` }, t(STATUS_LABEL[a.status]) || a.status);
  const pwCell = a => { const s = h('span', {}, '••••••'); let shown = false; return h('span', { class: 'pw' }, s, h('button', { title: t('accounts.pwToggle'), onClick: () => { shown = !shown; s.textContent = shown ? a.password : '••••••'; } }, icon('eye', 'ico'))); };

  const table = createTable({
    empty: () => h('div', {}, h('b', {}, t('accounts.empty.title')), t('accounts.empty.hint')),
    columns: [
      { key: 'username', label: t('accounts.col.username'), class: 'mono', render: a => h('span', {}, a.username, live[a.id] ? h('span', { class: 'badge info', style: { marginLeft: '8px' } }, live[a.id]) : null) },
      { key: 'password', label: t('accounts.col.password'), render: pwCell },
      { key: 'proxy', label: t('accounts.col.proxy'), class: 'mono', render: a => a.proxy ? h('span', { title: a.proxy.raw }, h('i', { class: `pdot ${a.proxy.status}` }), `${a.proxy.host}:${a.proxy.port}`) : h('span', { class: 'badge checkpoint', title: t('accounts.col.proxy.realIpTitle') }, t('accounts.badge.realIp')) },
      { key: 'cookie', label: t('accounts.col.cookie'), render: a => h('span', { class: `badge ${a.has_session ? 'live' : a.has_cookie ? 'checkpoint' : 'unknown'}` }, a.has_session ? t('accounts.cookie.hasSession') : a.has_cookie ? t('accounts.cookie.noSessionId') : t('accounts.cookie.empty')) },
      { key: 'email', label: t('accounts.col.email'), render: a => h('span', { class: 'truncate', title: a.email }, a.email || '—') },
      { key: 'twofa', label: t('accounts.col.twofa'), render: a => a.twofa ? h('span', { class: 'badge info' }, t('accounts.twofa.yes')) : h('span', { class: 'dim' }, '—') },
      { key: 'status', label: t('accounts.col.status'), render: statusBadge },
      { key: 'comments', label: t('accounts.col.beepConfirmed'), render: a => `${a.comments_verified || 0} / ${a.comments_total || 0}` },
      { key: 'last_checked_at', label: t('accounts.col.checked'), class: 'dim', render: a => ago(a.last_checked_at) },
      { key: 'last_error', label: t('accounts.col.lastError'), class: 'dim', render: a => h('span', { class: 'truncate', title: a.last_error || '' }, a.last_error || '—') },
      { key: 'note', label: t('accounts.col.note'), render: a => h('input', { value: a.note || '', placeholder: '…', style: { width: '140px', padding: '3px 6px' }, onChange: e => api.accounts.update(a.id, { note: e.target.value }) }) },
    ],
    onSelectionChange: ids => { selectedInfo.textContent = t('accounts.selectedCount', { n: ids.length }); for (const b of needSel) b.disabled = !ids.length; editBtn.disabled = ids.length !== 1; editBtn.title = ids.length > 1 ? t('accounts.editOneOnly') : ''; },
  });
  table.el.addEventListener('dblclick', e => { const tr = e.target.closest('tr'); if (!tr || e.target.closest('input,button')) return; const idx = [...tr.parentElement.children].indexOf(tr); const row = table.rows().filter(table.filterFn ? table.filterFn : () => true)[idx]; if (row) openEdit(row.id); });

  const selectedInfo = h('span', { class: 'hint' }, t('accounts.selectedCount', { n: 0 }));
  const stats = h('div', { class: 'stats' });
  const search = h('input', { placeholder: t('accounts.searchPlaceholder'), onInput: debounce(e => { const q = e.target.value.trim().toLowerCase(); table.setFilter(a => !q || [a.username, a.email, a.proxy && a.proxy.raw, a.note].some(v => String(v || '').toLowerCase().includes(q))); }) });
  const statusFilter = h('select', { onChange: e => { const v = e.target.value; table.setFilter(a => v === 'all' || a.status === v); } }, ['all', 'live', 'die', 'checkpoint', 'unknown'].map(v => h('option', { value: v }, v === 'all' ? t('accounts.filterAll') : t(STATUS_LABEL[v]))));

  const btn = (label, ic, cls, onClick) => h('button', { class: `btn ${cls || ''}`, onClick }, icon(ic), label);
  const needSel = [];
  const sel = b => { needSel.push(b); b.disabled = true; return b; };
  // Owner's rule 2026-09-25: "Cập nhật thông tin" edits exactly ONE account per open (not in needSel: it has its own rule).
  const editBtn = btn(t('accounts.btn.edit'), 'file', '', () => { const ids = table.selectedIds(); if (ids.length !== 1) { warn(t('accounts.warn.selectOneTitle'), t('accounts.warn.selectOneDetail')); return; } openEdit(ids[0]); });
  editBtn.disabled = true;
  const toolbar = h('div', { class: 'toolbar' },
    h('div', { class: 'search' }, icon('search'), search), statusFilter, selectedInfo,
    h('span', { class: 'spacer' }),
    sel(btn(t('accounts.btn.check'), 'refresh', '', async () => { const ids = table.selectedIds(); if (!(await warnNoProxy(ids))) return; try { await api.accounts.check(ids); toast(t('accounts.toast.checkingTitle'), t('accounts.toast.checkingDetail')); } catch (e) { err(t('accounts.err.cantRun'), e.message); } })),
    editBtn,
    sel(btn(t('accounts.btn.openBrowser'), 'chrome', '', async () => { const ids = table.selectedIds(); if (!(await warnNoProxy(ids))) return; for (const id of ids.slice(0, 5)) { try { await api.accounts.openBrowser(id); } catch (e) { err(t('accounts.err.cantOpen'), e.message); } } if (ids.length > 5) warn(t('accounts.warn.onlyFirst5')); })),
    sel(btn(t('accounts.btn.export'), 'download', '', async () => { const txt = await api.accounts.exportText(table.selectedIds()); await copyText(txt); ok(t('accounts.ok.copiedTitle'), t('accounts.ok.copiedDetail', { n: table.selectedIds().length })); })),
    sel(btn(t('accounts.btn.delete'), 'trash', 'danger', async () => { const ids = table.selectedIds(); if (await confirm(t('accounts.confirm.deleteTitle'), t('accounts.confirm.deleteMessage', { n: ids.length }), { okLabel: t('accounts.btn.delete'), danger: true })) { await api.accounts.remove(ids); ok(t('accounts.ok.deletedTitle'), t('accounts.countAccounts', { n: ids.length })); } })),
    btn(t('accounts.btn.add'), 'plus', 'primary', openImport),
  );

  // Owner's rule: no proxy → still allowed, but advise at most 10 accounts on the real IP.
  async function warnNoProxy(ids) {
    const n = accounts.filter(a => ids.includes(a.id) && !a.proxy).length;
    if (!n) return true;
    return confirm(t('accounts.confirm.noProxyTitle'), t('accounts.confirm.noProxyMessage', { n, extra: n > 10 ? t('accounts.confirm.noProxyExtra') : '' }), { okLabel: n > 10 ? t('accounts.confirm.noProxyOkMore') : t('accounts.confirm.noProxyOkLess'), danger: n > 10 });
  }
  root.append(
    h('div', { class: 'topbar' }, h('div', {}, h('h1', {}, t('accounts.title')), h('div', { class: 'sub' }, t('accounts.subtitle'))), h('span', { class: 'spacer' }), stats),
    h('div', { class: 'content' }, toolbar, table.el),
  );

  async function load() {
    [accounts, proxies] = await Promise.all([api.accounts.list(), api.proxies.list()]);
    table.setRows(accounts);
    const n = s => accounts.filter(a => a.status === s).length;
    stats.replaceChildren(h('div', { class: 'stat' }, h('b', {}, accounts.length), h('span', {}, t('common.stat.total'))), h('div', { class: 'stat ok' }, h('b', {}, n('live')), h('span', {}, t('status.live'))), h('div', { class: 'stat bad' }, h('b', {}, n('die')), h('span', {}, t('status.die'))), h('div', { class: 'stat warn' }, h('b', {}, n('checkpoint')), h('span', {}, t('status.checkpoint'))), h('div', { class: 'stat' }, h('b', {}, accounts.filter(a => !a.proxy).length), h('span', {}, t('accounts.stat.missingProxy'))));
    app.setCount('accounts', accounts.length);
  }

  function openImport() {
    const ta = h('textarea', { rows: 8, placeholder: t('accounts.import.placeholder') });
    const preview = h('div', { class: 'hint' }, t('accounts.import.lineCount', { n: 0 }));
    ta.addEventListener('input', () => { const n = ta.value.split('\n').filter(l => l.trim() && !l.trim().startsWith('#')).length; preview.textContent = t('accounts.import.lineCount', { n }); });
    const m = openModal({ title: t('accounts.btn.add'), body: [
      h('div', { class: 'callout info' }, t('accounts.import.info1'), h('code', {}, '|'), t('accounts.import.info2'), h('code', {}, 'username | password | 2fa | email | pass_email | cookie | proxy'), t('accounts.import.info3'), h('code', {}, 'host:port'), t('accounts.import.info4'), h('code', {}, 'host:port:user:pass'), t('accounts.import.info5')),
      ta, preview,
      h('div', { class: 'hint' }, t('accounts.import.dupHint')),
    ], foot: [h('span', { class: 'spacer' }), h('button', { class: 'btn', onClick: () => m.close() }, t('common.cancel')), h('button', { class: 'btn primary', onClick: async () => { try { const r = await api.accounts.importText(ta.value); m.close(); const bad = r.badProxy || []; const detail = t('accounts.import.ok.detail', { added: r.added, updated: r.updated, invalidPart: (r.invalid.length ? t('accounts.import.ok.invalidPart', { n: r.invalid.length }) : '') + (bad.length ? t('accounts.import.ok.badProxyPart', { n: bad.length, list: bad.slice(0, 3).map(b => b.username).join(', ') + (bad.length > 3 ? '…' : '') }) : '') }); (bad.length ? warn : ok)(t('accounts.import.ok.title'), detail); } catch (e) { err(t('accounts.import.err.title'), e.message); } } }, icon('plus'), t('accounts.import.submit'))] });
  }

  // "Cập nhật thông tin tài khoản": exactly one account, form pre-filled with its current values.
  // Password / email / email password / 2FA / note; only changed fields are written.
  function openEdit(accountId) {
    const one = accounts.find(a => a.id === accountId);
    if (!one) return;
    const f = {
      password: h('input', { type: 'password', value: one.password || '', autocomplete: 'new-password' }),
      email: h('input', { value: one.email || '' }),
      email_password: h('input', { type: 'password', value: one.email_password || '', autocomplete: 'new-password' }),
      twofa: h('input', { value: one.twofa || '', placeholder: t('accounts.edit.twofaPlaceholder'), class: 'mono' }),
      note: h('input', { value: one.note || '' }),
    };
    const eye = input => h('button', { class: 'btn sm ghost', onClick: () => { input.type = input.type === 'password' ? 'text' : 'password'; } }, icon('eye'), t('common.show'));
    const field = (label, ctl, extra) => h('label', { class: 'field' }, h('span', {}, label), h('div', { class: 'row' }, ctl, extra || null));
    const clear2fa = h('label', { class: 'row' }, h('input', { type: 'checkbox' }), t('accounts.edit.clear2fa'));
    const body = [
      h('div', { class: 'callout info' }, h('span', {}, t('accounts.edit.calloutPrefix'), h('b', { class: 'mono' }, one.username), t('accounts.edit.calloutSuffix'))),
      field(t('accounts.edit.password'), f.password, eye(f.password)),
      field(t('accounts.col.email'), f.email),
      field(t('accounts.edit.emailPassword'), f.email_password, eye(f.email_password)),
      field(t('accounts.edit.twofa'), f.twofa),
      clear2fa,
      field(t('accounts.col.note'), f.note),
    ];
    const m = openModal({ title: t('accounts.edit.modalTitle'), body, foot: [
      h('span', { class: 'spacer' }), h('button', { class: 'btn', onClick: () => m.close() }, t('common.cancel')),
      h('button', { class: 'btn primary', onClick: async () => {
        const patch = {};
        for (const k of ['password', 'email', 'email_password', 'twofa', 'note']) { const v = f[k].value.trim(); if (v !== (one[k] || '')) patch[k] = v; }
        if (clear2fa.firstChild.checked) patch.twofa = '';
        if (!Object.keys(patch).length) { m.close(); return; }
        try { await api.accounts.update(one.id, patch); m.close(); ok(t('accounts.edit.ok.title'), t('accounts.edit.ok.detail', { username: one.username, fields: Object.keys(patch).join(', ') })); }
        catch (e) { err(t('common.err.saveFailed'), e.message); }
      } }, icon('check'), t('common.save')),
    ] });
  }

  // Proxy assignment lives on the Proxies page only (owner 2026-09-25): pick proxies first, then accounts.


  const offs = [api.on.accountsChanged(load), api.on.proxiesChanged(load),
    api.on.jobProgress(p => { if (p.phase === 'finished') delete live[p.accountId]; else live[p.accountId] = t(PHASE_LABEL[p.phase]) || p.phase; table.render(); })];
  load();
  return { destroy() { offs.forEach(f => f()); } };
}
