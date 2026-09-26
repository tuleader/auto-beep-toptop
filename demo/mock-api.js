// In-memory stand-in for window.api, same surface as src/preload/index.cjs. Used for the design
// preview in a browser and for UI tests. Nothing here touches a network or a disk.
import { t } from './i18n/index.js';

// Helpers used deep inside runJob()/postOne() (bottom of createMockApi(), below its `return {...}`).
// They must live at module scope, not as `const` bindings placed physically after that `return`: control
// flow exits createMockApi() at the `return` statement, so a same-scope `const lines = ...` sitting below
// it is hoisted (TDZ) but its initializer NEVER runs — the nested closures (runJob/postOne) still capture
// the binding by reference and only blow up the first time a real call reaches it, with "ReferenceError:
// Cannot access 'lines' before initialization" (found 2026-09-25 15:24: BẮT ĐẦU BEEP on the mock/preview
// build). Fix: plain top-of-file declarations, which always run before createMockApi() is ever called.
function lines(raw) { return String(raw || '').split('\n').map(s => s.trim()).filter(Boolean); }
const EMOJI_POOL = { random: ['🔥', '😂', '👏', '✨', '💯'], happy: ['😄', '🥳', '😍', '🙌'], angry: ['😤', '😡', '🤬'] };

export function createMockApi() {
  const listeners = {};
  const on = ch => fn => { (listeners[ch] ||= []).push(fn); return () => { listeners[ch] = listeners[ch].filter(f => f !== fn); }; };
  const emit = (ch, p) => (listeners[ch] || []).forEach(f => f(p));
  const uid = () => Math.random().toString(36).slice(2, 10);
  const now = () => new Date().toISOString();

  const proxies = [
    { id: 'p1', host: '103.171.0.12', port: 6120, username: 'tikpro', password: 'x9Kq', type: 'http', status: 'live', ip: '103.171.0.12', country: 'Vietnam', country_code: 'VN', city: 'Hanoi', timezone: 'Asia/Bangkok', latency_ms: 412, last_checked_at: now(), note: '' },
    { id: 'p2', host: '45.77.20.9', port: 8080, username: '', password: '', type: 'http', status: 'die', ip: null, country: null, country_code: null, city: null, latency_ms: null, last_checked_at: now(), last_error: 'ECONNREFUSED', note: '' },
    { id: 'p3', host: '171.244.10.55', port: 1080, username: 'u3', password: 'p3', type: 'socks5', status: 'unknown', ip: null, country: null, country_code: null, city: null, latency_ms: null, last_checked_at: null, note: '' },
    { id: 'p4', host: '14.225.3.100', port: 3128, username: 'abc', password: 'def', type: 'http', status: 'live', ip: '14.225.3.100', country: 'Vietnam', country_code: 'VN', city: 'Ho Chi Minh City', latency_ms: 288, last_checked_at: now(), note: 'gói 1 tháng' },
  ];
  const accounts = [
    { id: 'a1', username: 'tinytippi.official', password: 'Secret1!', twofa: '', email: 'tt@powerscrews.com', email_password: 'mailpw', cookie: '[]', proxy_id: 'p1', status: 'live', note: '', last_checked_at: now(), last_action_at: now(), last_error: null, comments_verified: 12, comments_total: 14 },
    { id: 'a2', username: 'dinh.khoa.2024', password: 'Secret2!', twofa: 'JBSWY3DPEHPK3PXP', email: 'dk@outlook.com', email_password: 'mailpw', cookie: null, proxy_id: 'p4', status: 'checkpoint', note: 'cần xác minh email', last_checked_at: now(), last_action_at: null, last_error: 'needs_email_code', comments_verified: 0, comments_total: 0 },
    { id: 'a3', username: 'beep.shop.vn', password: 'Secret3!', twofa: '', email: '', email_password: '', cookie: '[]', proxy_id: null, status: 'unknown', note: '', last_checked_at: null, last_action_at: null, last_error: null, comments_verified: 0, comments_total: 0 },
    { id: 'a4', username: 'reviewer.hn', password: 'Secret4!', twofa: '', email: 'r@dcpa.net', email_password: 'x', cookie: '[]', proxy_id: 'p2', status: 'die', note: '', last_checked_at: now(), last_action_at: null, last_error: 'logged_out', comments_verified: 3, comments_total: 5 },
  ];
  const withProxy = a => { const p = proxies.find(x => x.id === a.proxy_id); return { ...a, proxy: p ? { ...p, raw: fmt(p) } : null, has_cookie: !!a.cookie, has_session: !!a.cookie }; };
  const fmt = p => p.username ? `${p.host}:${p.port}:${p.username}:${p.password}` : `${p.host}:${p.port}`;
  const settings = { chrome: { browser: 'fingerprint', timezone: 'Asia/Ho_Chi_Minh', chrome_path: '', threads: 3, columns: 4, rows: 6, min_width: 500, min_height: 600, scale: 0.5, mute: true, headless: false, lang: 'vi-VN', thread_delay: 3, close_on_finish: true }, captcha: { user_key: '' } };
  let terms = { version: 'preview', accepted_at: now() }; // the demo never shows the terms (owner 2026-09-26): they belong to the installed app
  let job = null;
  const comments = [];
  const activity = [];
  const parseProxy = line => { const m = String(line).trim().replace(/^[a-z0-9]+:\/\//i, '').split(':'); return m.length >= 2 && Number(m[1]) ? { host: m[0], port: Number(m[1]), username: m[2] || '', password: m[3] || '', type: /^socks5/i.test(line) ? 'socks5' : 'http' } : null; };

  return {
    mock: true,
    ready() {},
    app: { info: async () => ({ name: 'Auto Beep TopTop', version: '1.0.0 (preview)', dataDir: 'C:\\Users\\you\\AppData\\Roaming\\AutoBeepTopTop', electron: '30.0.5' }), openExternal: async url => { try { window.open(String(url), '_blank', 'noopener'); } catch { /* popup blocked */ } }, openDataDir: async () => {}, quit: async () => alert('(preview) app.quit()'), pickChrome: async () => 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' },
    terms: { get: async () => terms, accept: async v => (terms = { version: v, accepted_at: now() }) },
    accounts: {
      list: async () => accounts.map(withProxy),
      importText: async text => { let added = 0, updated = 0; for (const l of text.split('\n')) { const [u, p = '', t = '', e = '', ep = '', c = '', pr = ''] = l.split('|').map(s => s.trim()); if (!u) continue; let proxy_id = null; if (pr) { const pp = parseProxy(pr); if (pp) { let ex = proxies.find(x => x.host === pp.host && x.port === pp.port); if (!ex) { ex = { id: uid(), ...pp, status: 'unknown', note: '' }; proxies.push(ex); } proxy_id = ex.id; } } const ex = accounts.find(a => a.username === u); if (ex) { Object.assign(ex, { password: p || ex.password, proxy_id: proxy_id || ex.proxy_id }); updated++; } else { accounts.unshift({ id: uid(), username: u, password: p, twofa: t, email: e, email_password: ep, cookie: c || null, proxy_id, status: 'unknown', note: '', comments_verified: 0, comments_total: 0 }); added++; } } emit('event:accountsChanged'); return { added, updated, invalid: [] }; },
      update: async (id, patch) => { const a = accounts.find(x => x.id === id); Object.assign(a, patch); emit('event:accountsChanged'); return withProxy(a); },
      assignProxy: async (ids, proxy_id) => { accounts.filter(a => ids.includes(a.id)).forEach(a => (a.proxy_id = proxy_id)); emit('event:accountsChanged'); emit('event:proxiesChanged'); return ids.length; },
      assignMany: async (aids, pids, mode) => { aids.forEach((id, i) => { const a = accounts.find(x => x.id === id); if (a) a.proxy_id = mode === 'proxy_in_turn_account' ? pids[i % pids.length] : (pids[i] || a.proxy_id); }); emit('event:accountsChanged'); emit('event:proxiesChanged'); return aids.length; },
      remove: async ids => { for (const id of ids) { const i = accounts.findIndex(a => a.id === id); if (i >= 0) accounts.splice(i, 1); } emit('event:accountsChanged'); return ids.length; },
      exportText: async ids => accounts.filter(a => !ids?.length || ids.includes(a.id)).map(a => [a.username, a.password, a.twofa, a.email, a.email_password, a.cookie || '', a.proxy_id ? fmt(proxies.find(p => p.id === a.proxy_id)) : ''].join('|')).join('\n'),
      check: async ids => runJob('check_live', ids),
      openBrowser: async () => ({ pid: 4242 }),
      closeBrowser: async () => ({ closed: true }),
    },
    proxies: {
      list: async () => proxies.map(p => ({ ...p, raw: fmt(p), used_by: accounts.filter(a => a.proxy_id === p.id).length })),
      importText: async (text, type) => { let added = 0; const invalid = []; for (const l of text.split('\n')) { if (!l.trim()) continue; const p = parseProxy(l); if (!p) { invalid.push(l); continue; } if (proxies.some(x => x.host === p.host && x.port === p.port)) continue; proxies.unshift({ id: uid(), ...p, type: p.type || type, status: 'unknown', note: '' }); added++; } emit('event:proxiesChanged'); return { added, skipped: 0, invalid }; },
      // Mirrors src/main/db/proxies.cjs update(): a raw patch is re-parsed into host/port/user/pass, a
      // changed host/port/user/pass/type is checked for collision with another proxy and, if it truly
      // changed, resets status/ip/geo/latency/last_error — the old check result no longer applies.
      update: async (id, patch) => {
        const p = proxies.find(x => x.id === id);
        if (!p) throw new Error(t('mock.err.proxyNotFound'));
        const next = { ...patch };
        let identityChanged = false;
        if (next.raw !== undefined) {
          const parsed = parseProxy(next.raw);
          if (!parsed) throw new Error(t('mock.err.invalidProxy', { raw: next.raw }));
          if (parsed.host !== p.host || parsed.port !== p.port || (parsed.username || '') !== (p.username || '') || (parsed.password || '') !== (p.password || '')) identityChanged = true;
          Object.assign(next, { host: parsed.host, port: parsed.port, username: parsed.username || '', password: parsed.password || '' });
          delete next.raw;
        }
        if (next.type !== undefined && next.type !== p.type) identityChanged = true;
        if (identityChanged) {
          const type = next.type !== undefined ? next.type : p.type;
          const host = next.host !== undefined ? next.host : p.host;
          const port = next.port !== undefined ? next.port : p.port;
          const username = next.username !== undefined ? next.username : (p.username || '');
          const password = next.password !== undefined ? next.password : (p.password || '');
          const dup = proxies.find(x => x.id !== id && x.type === type && x.host === host && x.port === port && (x.username || '') === username && (x.password || '') === password);
          if (dup) throw new Error(t('mock.err.duplicateProxy', { addr: `${host}:${port}${username ? ':' + username : ''}` }));
          Object.assign(next, { status: 'unknown', ip: null, country: null, country_code: null, city: null, timezone: null, latency_ms: null, last_error: null });
        }
        Object.assign(p, next);
        emit('event:proxiesChanged');
        return p;
      },
      remove: async ids => { for (const id of ids) { const i = proxies.findIndex(p => p.id === id); if (i >= 0) proxies.splice(i, 1); accounts.forEach(a => { if (a.proxy_id === id) a.proxy_id = null; }); } emit('event:proxiesChanged'); emit('event:accountsChanged'); return { removed: ids.length }; },
      check: async ids => { let i = 0; for (const id of ids) { await sleep(400); const p = proxies.find(x => x.id === id); const alive = Math.random() > 0.3; Object.assign(p, { status: alive ? 'live' : 'die', ip: alive ? p.host : null, country_code: alive ? 'VN' : null, city: alive ? 'Hanoi' : null, latency_ms: alive ? 200 + Math.floor(Math.random() * 400) : null, last_checked_at: now() }); emit('event:proxyChecked', { id, done: ++i, total: ids.length, alive }); } emit('event:proxiesChanged'); return { checked: ids.length }; },
      exportText: async ids => proxies.filter(p => !ids?.length || ids.includes(p.id)).map(fmt).join('\n'),
    },
    comment: {
      start: async (ids, config) => runJob('comment', ids, config),
      stop: async () => { if (job) job.stop = true; return { stopped: !!job }; },
      status: async () => (job ? { running: true, id: job.id, kind: job.kind } : { running: false }),
      history: async () => ({ jobs: [], comments: comments.slice(0, 200), activity: activity.slice(-200) }),
      items: async () => [],
    },
    settings: { get: async () => JSON.parse(JSON.stringify(settings)), save: async patch => { Object.assign(settings.chrome, patch.chrome || {}); Object.assign(settings.captcha, patch.captcha || {}); return settings; }, chromeInfo: async () => ({ path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', version: '153.0.8010.48', source: 'system' }) },
    captcha: { status: async () => ({ configured: true, active: 'author', demo: true, needsUserKey: false, author: { present: true, source: '.env.local', ok: true, quantity: null, balance: null, packageName: null, dateEnd: null, packages: [], error: null }, user: { present: !!settings.captcha.user_key, ok: null, quantity: null, balance: null, packageName: null, error: settings.captcha.user_key ? null : t('mock.err.noTokenEntered') }, checkedAt: now() }) },
    browsers: { list: async () => ({ manual: [], all: [] }), closeAll: async () => ({ closed: 0 }) },
    on: { log: on('event:log'), notice: on('event:notice'), jobStarted: on('event:jobStarted'), jobProgress: on('event:jobProgress'), jobFinished: on('event:jobFinished'), commentLogged: on('event:commentLogged'), proxyChecked: on('event:proxyChecked'), accountsChanged: on('event:accountsChanged'), proxiesChanged: on('event:proxiesChanged'), captchaStatus: on('event:captchaStatus') },
  };

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  function log(level, message, extra = {}) { const e = { level, message, at: now(), ...extra }; activity.push(e); emit('event:log', e); }
  async function runJob(kind, ids, config = {}) {
    if (job) throw new Error(t('mock.err.jobRunning'));
    job = { id: uid(), kind, stop: false };
    const list = accounts.filter(a => ids.includes(a.id));
    emit('event:jobStarted', { id: job.id, kind, total: list.length });
    log('info', t('mock.log.starting', { what: kind === 'comment' ? t('mock.what.beep') : t('mock.what.checkAccounts'), n: list.length }));
    (async () => {
      let okc = 0, failed = 0;
      for (const a of list) {
        if (job.stop) break;
        const P = (phase, extra) => emit('event:jobProgress', { jobId: job.id, accountId: a.id, username: a.username, phase, ...extra });
        // Beep chỉ chạy tài khoản có proxy (C-2, quyết định 2026-09-25) — không còn nhánh chạy bằng IP thật.
        if (!a.proxy_id) { failed++; P('finished', { status: 'failed', error: t('mock.err.noProxyRefuse') }); log('error', t('mock.log.noProxy', { username: a.username }), { account_id: a.id }); continue; }
        P('open_browser'); await sleep(500); P('session_check'); await sleep(600);
        if (a.status === 'checkpoint') { P('manual_verification', { outcome: 'needs_email_code', waitMs: 120000 }); emit('event:notice', { type: 'manual_login', account_id: a.id, username: a.username, message: t('mock.notice.manualVerify', { username: a.username }), at: now() }); await sleep(2500); }
        a.status = 'live'; a.last_checked_at = now(); emit('event:accountsChanged'); P('session_ok', { via: 'cookie' });
        if (kind === 'comment') {
          P('run');
          const targets = lines(config.items).length ? lines(config.items) : ['demo.uid'];
          // A mutable copy of the comment bank: remove_sent (or endless, which forces it) shrinks this as lines get verified.
          const pool = lines(config.comments).length ? lines(config.comments) : ['Hay quá!'];
          let idx = 0;
          const postOne = async target => {
            if (job.stop || !pool.length) return false;
            await sleep(900);
            const source_text = config.comment_type === 'random' ? pool[Math.floor(Math.random() * pool.length)] : pool[idx++ % pool.length];
            let text = source_text;
            if (config.tag_author && config.source === 'uid') text = `@${target} ${text}`;
            if (config.emoji && config.emoji !== 'off') { const pool2 = EMOJI_POOL[config.emoji] || EMOJI_POOL.random; text = `${text} ${pool2[Math.floor(Math.random() * pool2.length)]}`; }
            if (config.watch_before && config.watch_before.enabled) log('info', t('mock.log.watchBefore', { username: a.username }), { account_id: a.id });
            if (config.like_before) log('info', t('mock.log.likeBefore', { username: a.username }), { account_id: a.id });
            const verified = Math.random() > 0.15;
            const video_url = config.source === 'uid' ? `https://www.tiktok.com/@${target}/video/73${Math.floor(Math.random() * 1e15)}` : target;
            const e = { jobId: job.id, accountId: a.id, username: a.username, target_type: config.source, target, video_url, text, source_text, verified, error: null, created_at: now() };
            comments.unshift(e); a.comments_total++; if (verified) a.comments_verified++;
            e.sent = true; e.consumed = true; emit('event:commentLogged', e); P('comment', { video_url, verified, source_text });
            log(verified === false ? 'warn' : 'info', t('mock.log.beepResult', { username: a.username, url: video_url, result: verified === true ? t('mock.result.verified') : t('mock.result.notFound') }), { account_id: a.id });
            if (config.remove_sent) { const i = pool.indexOf(source_text); if (i >= 0) pool.splice(i, 1); } // consumed on SEND, like the engine
            return true;
          };
          if (config.mode === 'endless') {
            outer: while (!job.stop && pool.length) { // eslint-disable-line no-labels -- clearer than a done-flag here
              for (const t of targets) { if (job.stop || !pool.length) break outer; await postOne(t); }
            }
          } else {
            const from = (config.comments_per_video && config.comments_per_video.from) || 1;
            const to = (config.comments_per_video && config.comments_per_video.to) || 1;
            for (const t of targets.slice(0, 2)) {
              if (job.stop) break;
              const n = from + Math.floor(Math.random() * Math.max(1, to - from + 1));
              for (let k = 0; k < n; k++) { if (job.stop || !pool.length) break; await postOne(t); }
            }
          }
        }
        P('close_browser'); await sleep(300); okc++;
        P('finished', { status: 'ok', result: { verified: 1 } }); log('info', t('mock.log.accountDone', { username: a.username }), { account_id: a.id });
      }
      const summary = { total: list.length, done: okc + failed, ok: okc, failed };
      log('info', t('mock.log.finished', { ok: okc, failed, total: list.length }));
      emit('event:jobFinished', { id: job.id, kind, summary, stopped: job.stop });
      job = null; emit('event:accountsChanged');
    })();
    return { id: job.id };
  }
}
