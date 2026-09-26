// Tiny i18n: t(key, params) looks a dotted key up in the active language table and substitutes
// {placeholder} params. Two tables only (vi.js, en.js) — plain objects, no nesting, no pluralization
// engine. Vietnamese is the product's original language and stays the fallback when a key is missing
// from the active table (should not happen — tools/i18n-check.cjs guards it).
import { vi } from './vi.js';
import { en } from './en.js';

const TABLES = { vi, en };
const STORAGE_KEY = 'abt.lang';
const listeners = new Set();

function detectDefault() {
  // Vietnamese-first product (owner's market): every fresh install opens in Vietnamese regardless of the OS locale
  // (a sandbox reporting en-US on a Vietnamese machine proved the locale is not a reliable signal, 2026-09-25).
  // Users switch to English from Settings or the VI | EN toggle; the choice is remembered.
  return 'vi';
}

function readSaved() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'vi' || v === 'en') return v;
  } catch { /* storage unavailable */ }
  return null;
}

let current = readSaved() || detectDefault();

export function getLang() { return current; }

export function setLang(lang) {
  if (lang !== 'vi' && lang !== 'en') return;
  if (lang === current) return;
  current = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable */ }
  listeners.forEach(fn => { try { fn(current); } catch { /* listener error is not our problem */ } });
}

export function onLangChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

// Locale tag for Number/Date formatting (toLocaleString etc.) — follows the active language, not the OS.
export function localeTag() { return current === 'vi' ? 'vi-VN' : 'en-US'; }

export function t(key, params) {
  const table = TABLES[current] || TABLES.vi;
  let str = table[key];
  if (str == null) str = TABLES.vi[key];
  if (str == null) str = key; // missing key: show the key itself rather than throw
  if (params) for (const k of Object.keys(params)) str = str.split(`{${k}}`).join(String(params[k]));
  return str;
}
