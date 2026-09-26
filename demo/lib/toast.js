import { h } from './dom.js';
const root = () => document.getElementById('toast-root');
export function toast(title, detail = '', kind = 'info', ms = 3600) {
  const el = h('div', { class: `toast ${kind}` }, h('b', {}, title), detail ? h('small', {}, detail) : null);
  root().appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .25s'; setTimeout(() => el.remove(), 260); }, ms);
  return el;
}
export const ok = (t, d) => toast(t, d, 'ok');
export const err = (t, d) => toast(t, d, 'error', 6000);
export const warn = (t, d) => toast(t, d, 'warn', 5000);
