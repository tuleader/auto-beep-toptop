import { h, icon, ago, debounce, copyText } from '../lib/dom.js';
import { createTable } from '../lib/table.js';
import { openModal, confirm } from '../lib/modal.js';
import { toast, ok, err, warn } from '../lib/toast.js';
import { t } from '../i18n/index.js';

// Mirrors src/main/browser/proxy.cjs isSocksWithAuth (the renderer cannot require main-process modules).
const isSocksWithAuth = p => /^socks/i.test(String(p && p.type || '')) && !!(p && p.username);

export function ProxiesView({ root, api, app }) {
  let proxies = [];
  const checking = {};
  const table = createTable({
    empty: () => h('div', {}, h('b', {}, t('proxies.empty.title')), t('proxies.empty.hint')),
    columns: [
      { key: 'raw', label: t('accounts.col.proxy'), class: 'mono', render: p => h('span', {}, h('i', { class: `pdot ${p.status}` }), `${p.host}:${p.port}`, p.username ? h('span', { class: 'dim' }, `:${p.username}:••••`) : null) },
      // SOCKS + user/pass cannot authenticate from Chrome (main: browser/proxy.cjs isSocksWithAuth) — say so up front.
      { key: 'type', label: t('proxies.col.type'), render: p => h('span', {}, h('span', { class: 'badge info' }, p.type.toUpperCase()), isSocksWithAuth(p) ? h('span', { class: 'badge checkpoint', style: { marginLeft: '6px' }, title: t('proxies.socksAuth.detail') }, t('proxies.socksAuth.badge')) : null) },
      { key: 'used_by', label: t('proxies.col.usedBy'), render: p => p.used_by ? h('b', {}, p.used_by) : h('span', { class: 'dim' }, '0') },
      { key: 'status', label: t('accounts.col.status'), render: p => checking[p.id] ? h('span', { class: 'badge info' }, t('proxies.checkingBadge')) : h('span', { class: `badge ${p.status}` }, t({ live: 'status.live', die: 'status.die', unknown: 'status.unknown' }[p.status])) },
      { key: 'ip', label: t('proxies.col.ip'), class: 'mono dim', render: p => p.ip || '—' },
      { key: 'country', label: t('proxies.col.location'), render: p => p.country_code ? `${p.country_code}${p.city ? ' · ' + p.city : ''}` : '—' },
      { key: 'latency_ms', label: t('proxies.col.ping'), class: 'dim', render: p => p.latency_ms != null ? `${p.latency_ms} ms` : '—' },
      { key: 'last_checked_at', label: t('accounts.col.checked'), class: 'dim', render: p => ago(p.last_checked_at) },
      { key: 'last_error', label: t('proxies.col.error'), class: 'dim', render: p => h('span', { class: 'truncate', title: p.last_error || '' }, p.last_error || '—') },
      { key: 'note', label: t('accounts.col.note'), render: p => h('input', { value: p.note || '', placeholder: '…', style: { width: '120px', padding: '3px 6px' }, onChange: e => api.proxies.update(p.id, { note: e.target.value }) }) },
    ],
    onSelectionChange: ids => { selectedInfo.textContent = t('accounts.selectedCount', { n: ids.length }); for (const b of needSel) b.disabled = !ids.length; editBtn.disabled = ids.length !== 1; editBtn.title = ids.length > 1 ? t('proxies.editOneOnly') : ''; },
  });
  table.el.addEventListener('dblclick', e => { const tr = e.target.closest('tr'); if (!tr || e.target.closest('input,button')) return; const idx = [...tr.parentElement.children].indexOf(tr); const row = table.rows().filter(table.filterFn ? table.filterFn : () => true)[idx]; if (row) openEdit(row.id); });
  const selectedInfo = h('span', { class: 'hint' }, t('accounts.selectedCount', { n: 0 }));
  const stats = h('div', { class: 'stats' });
  const search = h('input', { placeholder: t('proxies.searchPlaceholder'), onInput: debounce(e => { const q = e.target.value.trim().toLowerCase(); table.setFilter(p => !q || [p.raw, p.note, p.city, p.country_code].some(v => String(v || '').toLowerCase().includes(q))); }) });
  const btn = (label, ic, cls, onClick) => h('button', { class: `btn ${cls || ''}`, onClick }, icon(ic), label);
  const needSel = []; const sel = b => { needSel.push(b); b.disabled = true; return b; };
  // Mirrors accounts.js "Cập nhật thông tin": edits exactly ONE proxy per open (not in needSel: own rule).
  const editBtn = btn(t('proxies.btn.edit'), 'file', '', () => { const ids = table.selectedIds(); if (ids.length !== 1) { warn(t('proxies.warn.selectOneTitle'), t('proxies.warn.selectOneDetail')); return; } openEdit(ids[0]); });
  editBtn.disabled = true;
  const toolbar = h('div', { class: 'toolbar' },
    h('div', { class: 'search' }, icon('search'), search), selectedInfo, h('span', { class: 'spacer' }),
    sel(btn(t('proxies.btn.check'), 'refresh', '', async () => { const ids = table.selectedIds(); ids.forEach(id => (checking[id] = true)); table.render(); try { const r = await api.proxies.check(ids); ok(t('proxies.ok.checkedTitle'), t('proxies.ok.checkedDetail', { live: r.live ?? '?', die: r.die ?? '?', unknown: r.unknown ?? 0 })); } catch (e) { err(t('proxies.err.checkFailed'), e.message); } finally { ids.forEach(id => delete checking[id]); load(); } })),
    editBtn,
    sel(btn(t('proxies.btn.assign'), 'link', '', () => openAssignAccounts(table.selectedIds()))),
    sel(btn(t('common.copy'), 'copy', '', async () => { await copyText(await api.proxies.exportText(table.selectedIds())); ok(t('donate.copied'), t('proxies.countProxies', { n: table.selectedIds().length })); })),
    sel(btn(t('accounts.btn.delete'), 'trash', 'danger', async () => { const ids = table.selectedIds(); const used = proxies.filter(p => ids.includes(p.id)).reduce((s, p) => s + p.used_by, 0); if (await confirm(t('proxies.confirm.deleteTitle'), t('proxies.confirm.deleteMessage', { n: ids.length, usedPart: used ? t('proxies.confirm.deleteUsedPart', { used }) : '' }), { okLabel: t('accounts.btn.delete'), danger: true })) { await api.proxies.remove(ids); ok(t('accounts.ok.deletedTitle'), t('proxies.countProxies', { n: ids.length })); } })),
    btn(t('proxies.btn.add'), 'plus', 'primary', openImport),
  );
  root.append(
    h('div', { class: 'topbar' }, h('div', {}, h('h1', {}, t('nav.proxies')), h('div', { class: 'sub' }, t('proxies.subtitle'))), h('span', { class: 'spacer' }), stats),
    h('div', { class: 'content' }, toolbar, table.el),
  );

  // Proxy-FIRST assignment, the original's order (proxy_updateProxyStaticByField: listProxyId chosen on the proxy
  // screen, then listAccountId + action — 12-original-proxy.md §2; owner 2026-09-25): pick proxies in the table,
  // then choose which accounts they go to and how (the same 4 modes, REQ-PRX-030).
  async function openAssignAccounts(proxyIds) {
    const chosen = proxies.filter(p => proxyIds.includes(p.id));
    if (!chosen.length) return;
    const dead = chosen.filter(p => p.status === 'die');
    if (dead.length && !(await confirm(t('proxies.assign.deadTitle'), t('proxies.assign.deadMessage', { n: dead.length }), { okLabel: t('proxies.assign.deadOk'), danger: true }))) return;
    let accounts = [];
    try { accounts = await api.accounts.list(); } catch (e) { err(t('proxies.assign.loadFail'), e.message); return; }
    if (!accounts.length) { warn(t('proxies.assign.noAccounts')); return; }
    const mode = h('select', {}, ['one_proxy_one_account', 'proxy_in_turn_account', 'one_proxy_many_account', 'random_one_proxy_one_account'].map(v => h('option', { value: v }, t(`accounts.assign.mode.${v}`))));
    const qty = h('input', { type: 'number', value: 2, min: 1, style: { width: '80px' } });
    const picked = new Set();
    const search = h('input', { placeholder: t('proxies.assign.searchPlaceholder'), style: { width: '100%' } });
    const count = h('span', { class: 'hint' });
    const list = h('div', { class: 'acc-pick', style: { maxHeight: '300px' } });
    const proxyLabel = a => a.proxy ? `${a.proxy.host}:${a.proxy.port}` : t('proxies.assign.noProxy');
    const renderList = () => {
      const q = search.value.trim().toLowerCase();
      const rows = accounts.filter(a => !q || a.username.toLowerCase().includes(q) || (a.proxy && a.proxy.raw && a.proxy.raw.toLowerCase().includes(q)));
      list.replaceChildren(
        h('label', { style: { background: 'var(--bg-3)' } }, h('input', { type: 'checkbox', checked: rows.length > 0 && rows.every(a => picked.has(a.id)), onChange: e => { rows.forEach(a => e.target.checked ? picked.add(a.id) : picked.delete(a.id)); renderList(); } }), h('b', {}, t('beep.selectAll')), h('span', { class: 'hint' }, `(${rows.length})`)),
        ...rows.map(a => h('label', {}, h('input', { type: 'checkbox', checked: picked.has(a.id), onChange: e => { if (e.target.checked) picked.add(a.id); else picked.delete(a.id); count.textContent = t('proxies.assign.pickedCount', { n: picked.size }); } }), h('span', { class: 'mono' }, a.username), h('span', { class: `badge ${a.status}` }, a.status), h('span', { class: 'hint' }, proxyLabel(a)))),
      );
      count.textContent = t('proxies.assign.pickedCount', { n: picked.size });
    };
    search.addEventListener('input', debounce(renderList));
    renderList();
    const m = openModal({ title: t('proxies.assign.modalTitle', { n: chosen.length }), body: [
      h('div', { class: 'callout info' }, h('span', {}, t('proxies.assign.intro', { n: chosen.length }), ' ', h('span', { class: 'mono' }, chosen.slice(0, 3).map(p => `${p.host}:${p.port}`).join(', ') + (chosen.length > 3 ? ' …' : '')))),
      h('div', { class: 'row gap-lg' }, h('label', { class: 'field' }, h('span', {}, t('accounts.assign.modeLabel')), mode), h('label', { class: 'field' }, h('span', {}, t('accounts.assign.qtyLabel')), qty)),
      h('div', { class: 'row', style: { marginTop: '8px' } }, search),
      h('div', { class: 'hint' }, t('proxies.assign.accountsHint')), list, count,
    ], foot: [h('span', { class: 'spacer' }), h('button', { class: 'btn', onClick: () => m.close() }, t('common.close')), h('button', { class: 'btn primary', onClick: async () => {
      const accountIds = accounts.filter(a => picked.has(a.id)).map(a => a.id);
      if (!accountIds.length) { warn(t('proxies.assign.pickSome')); return; }
      try { const n = await api.accounts.assignMany(accountIds, proxyIds, mode.value, Number(qty.value) || 1); m.close(); ok(t('accounts.assign.okTitle'), t('proxies.assign.okDetail', { n, proxies: proxyIds.length })); }
      catch (e) { err(t('accounts.assign.okTitle'), e.message); }
    } }, icon('link'), t('accounts.assign.submit'))] });
  }
  async function load() {
    proxies = await api.proxies.list();
    table.setRows(proxies);
    const n = s => proxies.filter(p => p.status === s).length;
    stats.replaceChildren(h('div', { class: 'stat' }, h('b', {}, proxies.length), h('span', {}, t('common.stat.total'))), h('div', { class: 'stat ok' }, h('b', {}, n('live')), h('span', {}, t('status.live'))), h('div', { class: 'stat bad' }, h('b', {}, n('die')), h('span', {}, t('status.die'))), h('div', { class: 'stat' }, h('b', {}, proxies.filter(p => !p.used_by).length), h('span', {}, t('proxies.stat.unused'))));
    app.setCount('proxies', proxies.length);
  }
  function openImport() {
    const type = h('select', {}, ['http', 'https', 'socks5', 'socks4'].map(v => h('option', { value: v }, v.toUpperCase())));
    const ta = h('textarea', { rows: 8, placeholder: '103.1.2.3:8080\n103.1.2.4:8080:user:pass\nsocks5://45.1.1.1:1080\nuser:pass:103.1.2.5:3128' });
    const m = openModal({ title: t('proxies.btn.add'), body: [
      h('div', { class: 'callout info' }, t('proxies.import.info1'), h('code', {}, 'host:port'), t('proxies.import.sep'), h('code', {}, 'host:port:user:pass'), t('proxies.import.sep'), h('code', {}, 'user:pass:host:port'), t('proxies.import.info2'), h('code', {}, 'socks5://'), t('proxies.import.info3')),
      h('label', { class: 'field' }, h('span', {}, t('proxies.import.defaultType')), type), ta,
    ], foot: [h('span', { class: 'spacer' }), h('button', { class: 'btn', onClick: () => m.close() }, t('common.cancel')), h('button', { class: 'btn primary', onClick: async () => { try { const r = await api.proxies.importText(ta.value, type.value); m.close(); ok(t('proxies.import.ok.title'), t('proxies.import.ok.detail', { added: r.added, skipped: r.skipped, invalidPart: r.invalid.length ? t('proxies.import.ok.invalidPart', { n: r.invalid.length, list: r.invalid.slice(0, 3).join(', ') }) : '' })); } catch (e) { err(t('accounts.import.err.title'), e.message); } } }, icon('plus'), t('proxies.import.submit'))] });
  }
  // "Cập nhật proxy": exactly one proxy, form pre-filled with its current host/port/user/pass/type/note.
  // raw is rebuilt from the four connection fields client-side; the db layer re-parses it and is the
  // source of truth for shape/validity. Only fields that actually changed are sent.
  function openEdit(proxyId) {
    const one = proxies.find(p => p.id === proxyId);
    if (!one) return;
    const f = {
      host: h('input', { value: one.host || '' }),
      port: h('input', { type: 'number', value: one.port || '', min: 1, max: 65535 }),
      username: h('input', { value: one.username || '' }),
      password: h('input', { type: 'password', value: one.password || '', autocomplete: 'new-password' }),
      note: h('input', { value: one.note || '' }),
    };
    const type = h('select', {}, ['http', 'https', 'socks5', 'socks4'].map(v => h('option', { value: v, selected: v === one.type }, v.toUpperCase())));
    const eye = input => h('button', { class: 'btn sm ghost', onClick: () => { input.type = input.type === 'password' ? 'text' : 'password'; } }, icon('eye'), t('common.show'));
    const field = (label, ctl, extra) => h('label', { class: 'field' }, h('span', {}, label), h('div', { class: 'row' }, ctl, extra || null));
    const body = [
      h('div', { class: 'callout info' }, h('span', {}, t('accounts.edit.calloutPrefix'), h('b', { class: 'mono' }, `${one.host}:${one.port}`), t('proxies.edit.calloutSuffix'))),
      field(t('proxies.edit.host'), f.host), field(t('proxies.edit.port'), f.port),
      field(t('accounts.col.username'), f.username), field(t('proxies.edit.password'), f.password, eye(f.password)),
      field(t('proxies.col.type'), type), field(t('accounts.col.note'), f.note),
    ];
    const m = openModal({ title: t('proxies.btn.edit'), body, foot: [
      h('span', { class: 'spacer' }), h('button', { class: 'btn', onClick: () => m.close() }, t('common.cancel')),
      h('button', { class: 'btn primary', onClick: async () => {
        const host = f.host.value.trim(), port = f.port.value.trim(), username = f.username.value.trim(), password = f.password.value;
        if (!host || !port) { err(t('proxies.err.missingTitle'), t('proxies.err.missingDetail')); return; }
        // Same canonical shape as main's formatProxy: host:port:user:pass. main's parseProxy takes everything
        // after the 3rd ':' as the password (so a ':' inside it survives) and, when the password is a valid
        // port number too, keeps this host-first reading as long as the host looks like a host.
        if (host.startsWith('[') || host.includes(':')) { err(t('proxies.err.ipv6Title'), t('proxies.err.ipv6Detail')); return; }
        if (username.includes(':')) { err(t('proxies.err.missingTitle'), t('proxies.err.userColon')); return; }
        const raw = username ? `${host}:${port}:${username}:${password}` : `${host}:${port}`;
        const patch = {};
        if (raw !== one.raw) patch.raw = raw;
        if (type.value !== one.type) patch.type = type.value;
        const note = f.note.value.trim();
        if (note !== (one.note || '')) patch.note = note;
        if (!Object.keys(patch).length) { m.close(); return; }
        try { await api.proxies.update(one.id, patch); m.close(); ok(t('accounts.edit.ok.title'), `${host}:${port}`); }
        catch (e) { err(t('common.err.saveFailed'), e.message); }
      } }, icon('check'), t('common.save')),
    ] });
  }
  const offs = [api.on.proxiesChanged(load), api.on.proxyChecked(e => { delete checking[e.id]; const p = proxies.find(x => x.id === e.id); if (p) { p.status = e.alive === true ? 'live' : e.alive === false ? 'die' : p.status; p.ip = e.ip ?? p.ip; p.country_code = e.country ?? p.country_code; p.latency_ms = e.latencyMs ?? p.latency_ms; p.last_error = e.error; p.last_checked_at = new Date().toISOString(); } table.render(); })];
  load();
  return { destroy() { offs.forEach(f => f()); } };
}
