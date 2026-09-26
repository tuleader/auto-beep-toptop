import { h, clear } from './dom.js';
import { t } from '../i18n/index.js';
const root = () => document.getElementById('modal-root');

// openModal({ title, body: Node, foot: Node[], size, closable, onClose }) -> { close, el }
export function openModal({ title, body, foot = [], size = '', closable = true, onClose }) {
  // The Escape listener is removed on EVERY close, not only on Escape (review 2026-09-26 C-L6: each modal
  // closed by button left a keydown listener behind, and a later Escape closed nothing / fired stale onClose).
  let onKey = null;
  const close = () => { if (onKey) { document.removeEventListener('keydown', onKey); onKey = null; } wrap.remove(); onClose?.(); };
  const modal = h('div', { class: `modal ${size}` },
    h('div', { class: 'modal-head' }, h('h2', {}, title), closable ? h('button', { class: 'x', title: t('common.close'), onClick: close }, '✕') : null),
    h('div', { class: 'modal-body' }, body),
    foot.length ? h('div', { class: 'modal-foot' }, foot) : null,
  );
  const wrap = h('div', { class: 'modal-backdrop', onClick: e => { if (closable && e.target === wrap) close(); } }, modal);
  root().appendChild(wrap);
  if (closable) { onKey = e => { if (e.key === 'Escape') close(); }; document.addEventListener('keydown', onKey); }
  return { close, el: modal };
}

export function confirm(title, message, { okLabel = t('common.agree'), danger = false } = {}) {
  return new Promise(resolve => {
    const m = openModal({
      title, size: 'sm', body: h('p', { style: { margin: 0, color: 'var(--text-2)' } }, message),
      // resolve BEFORE close(): close() fires onClose → resolve(false), and a promise settles only once.
      // Bug found 2026-09-25: every confirm in the app answered "Hủy" — the Beep start never reached the engine.
      foot: [h('span', { class: 'spacer' }), h('button', { class: 'btn', onClick: () => { resolve(false); m.close(); } }, t('common.cancel')),
        h('button', { class: `btn ${danger ? 'danger' : 'primary'}`, onClick: () => { resolve(true); m.close(); } }, okLabel)],
      onClose: () => resolve(false),
    });
  });
}
export { clear };
