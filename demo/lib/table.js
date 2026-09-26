// Selectable data table: columns [{key, label, render?, class?}], rows with `id`, selection Set.
import { h } from './dom.js';
import { t } from '../i18n/index.js';

export function createTable({ columns, onSelectionChange, empty = () => t('common.noData') }) {
  const selected = new Set();
  const wrap = h('div', { class: 'table-wrap' });
  let rows = [];
  let filter = () => true;

  const headCb = h('input', { type: 'checkbox', onChange: e => { const vis = rows.filter(filter); if (e.target.checked) vis.forEach(r => selected.add(r.id)); else vis.forEach(r => selected.delete(r.id)); render(); onSelectionChange?.(ids()); } });
  function ids() { return [...selected]; }
  function render() {
    const vis = rows.filter(filter);
    wrap.replaceChildren(vis.length ? h('table', {},
      h('thead', {}, h('tr', {}, h('th', { style: { width: '34px' } }, headCb), columns.map(c => h('th', {}, c.label)))),
      h('tbody', {}, vis.map(r => {
        const cb = h('input', { type: 'checkbox', checked: selected.has(r.id), onChange: e => { if (e.target.checked) selected.add(r.id); else selected.delete(r.id); tr.classList.toggle('selected', selected.has(r.id)); onSelectionChange?.(ids()); } });
        const tr = h('tr', { class: selected.has(r.id) ? 'selected' : '' }, h('td', {}, cb), columns.map(c => h('td', { class: c.class || '' }, c.render ? c.render(r) : (r[c.key] ?? '—'))));
        return tr;
      })),
    ) : h('div', { class: 'empty' }, typeof empty === 'string' ? empty : empty()));
    headCb.checked = vis.length > 0 && vis.every(r => selected.has(r.id));
  }
  return {
    el: wrap,
    setRows(next) { rows = next; const alive = new Set(rows.map(r => r.id)); for (const id of [...selected]) if (!alive.has(id)) selected.delete(id); render(); onSelectionChange?.(ids()); },
    setFilter(fn) { filter = fn || (() => true); this.filterFn = filter; render(); },
    filterFn: null,
    selectedIds: ids, clearSelection() { selected.clear(); render(); onSelectionChange?.(ids()); }, rows: () => rows, render,
  };
}
