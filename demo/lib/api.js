// window.api comes from the preload inside Electron. In a plain browser (design preview, served over http)
// we fall back to an in-memory mock so the whole UI can be exercised without Chrome, a database, or TikTok.
// Inside the installed app (file://) a missing preload is a broken install, never a silent demo
// (review 2026-09-26 C-M2): say so instead of showing fake accounts.
import { createMockApi } from '../mock-api.js';

const inApp = location.protocol === 'file:';
if (!window.api && inApp) {
  document.body.innerHTML = '<pre style="padding:24px;color:#f66;font:14px/1.5 monospace;white-space:pre-wrap">Auto Beep TopTop không nạp được cầu nối (preload) — bản cài đặt bị hỏng.\nGỡ cài đặt rồi cài lại từ bản tải về chính thức. Dữ liệu tài khoản/proxy của bạn không bị ảnh hưởng.</pre>';
  throw new Error('preload missing inside the packaged app');
}
export const api = window.api || createMockApi();
export const isMock = !window.api;
