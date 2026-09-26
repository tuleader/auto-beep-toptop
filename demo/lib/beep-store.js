// The Beep configuration lives in localStorage and is edited by the Beep view — but the comment bank and the
// target list also SHRINK while a job runs (remove_sent / remove_done_targets), and the job keeps running when
// the user is on another page. So the shrinking is done here, at app lifetime (app.js subscribes once), and the
// Beep view only refreshes its textareas from storage when told (review 2026-09-26 A-H-a: while the view was
// unmounted every event was lost and the bank came back un-shrunk on the next visit).
export const KEY = 'abt.beep.config.v1';
export const RUNNING_KEY = 'abt.beep.running.v1';
export const CHANGE_EVENT = 'abt:beep-config';

export function loadRaw() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } }
export function saveRaw(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch { /* ignore */ } }

// What the RUNNING job was started with (source + the two removal switches): the handlers follow the job's
// config, not what the user edits meanwhile (renderer rule since 2026-09-26).
export function setRunning(c) { try { localStorage.setItem(RUNNING_KEY, JSON.stringify({ source: c.source, remove_sent: !!c.remove_sent, remove_done_targets: !!c.remove_done_targets, at: Date.now() })); } catch { /* ignore */ } }
export function getRunning() { try { return JSON.parse(localStorage.getItem(RUNNING_KEY) || 'null'); } catch { return null; } }
export function clearRunning() { try { localStorage.removeItem(RUNNING_KEY); } catch { /* ignore */ } }

// "uid", "@uid", "https://www.tiktok.com/@uid/…" and a link with/without query all name the same target.
export const targetKey = s => { const v = String(s || '').trim(); const m = v.match(/^https?:\/\/(?:www\.|m\.)?tiktok\.com\/@([\w.-]+)(\/video\/\d+|\/photo\/\d+)?/i); if (m && !m[2]) return m[1].toLowerCase(); if (m) return v.split('?')[0].replace(/\/$/, '').toLowerCase(); return v.replace(/^@+/, '').split(/[/?#]/)[0].toLowerCase(); };

function removeFirstLine(text, match) {
  const lines = String(text || '').split('\n');
  const idx = lines.findIndex(match);
  if (idx < 0) return null;
  lines.splice(idx, 1);
  return lines.join('\n');
}

// Event contract: e.source_text is the exact original comment-bank line before emoji/tag decoration;
// e.consumed is true only when the engine CONSUMED the line (sent); e.verified === true means the Beep on
// e.target was read back on the page. Returns what changed so the mounted view can refresh.
export function applyCommentLogged(e) {
  const raw = loadRaw();
  if (!raw) return { bank: false, targets: false };
  const rc = getRunning() || { source: raw.source, remove_sent: !!raw.remove_sent, remove_done_targets: !!raw.remove_done_targets };
  let bank = false, targets = false;
  if (rc.remove_sent && e && e.consumed !== false && e.source_text) {
    const want = String(e.source_text).trim();
    const next = removeFirstLine(raw.comments, l => l.trim() === want); // Windows files carry \r
    if (next != null) { raw.comments = next; bank = true; }
  }
  if (rc.remove_done_targets && e && e.verified === true && e.target) {
    const field = rc.source === 'video' ? 'items_video' : 'items_uid';
    const key = targetKey(e.target);
    const next = removeFirstLine(raw[field], l => l.trim() && targetKey(l) === key);
    if (next != null) { raw[field] = next; targets = true; }
  }
  if (bank || targets) {
    saveRaw(raw);
    try { window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { bank, targets } })); } catch { /* ignore */ }
  }
  return { bank, targets };
}
