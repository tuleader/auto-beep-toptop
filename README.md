🇻🇳 Tiếng Việt · [🇬🇧 English](README.en.md)

<p align="center">
  <img src="docs/img/logo.png" width="96" alt="Auto Beep TopTop" />
</p>

# 📢 Auto Beep TopTop — TikTok Auto Beep 2026

![Version](https://img.shields.io/badge/version-1.0.0%20beta-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%2010%2F11-blue.svg)
![Status](https://img.shields.io/badge/status-Beta-orange.svg)
![Data](https://img.shields.io/badge/d%E1%BB%AF%20li%E1%BB%87u-ch%E1%BA%A1y%20tr%C3%AAn%20m%C3%A1y%20b%E1%BA%A1n-success.svg)

**Auto Beep TopTop** là công cụ giúp bạn "Beep" — bình luận tự động — lên TikTok bằng nhiều tài khoản cùng lúc, nhanh, đều tay và không phải ngồi canh từng video.

Bạn dán danh sách tài khoản, dán kho câu, chọn mục tiêu theo **UID** hay theo **link video**, bấm **"Bắt đầu Beep"** — phần còn lại app lo: mở mỗi tài khoản trong một trình duyệt riêng (qua proxy riêng nếu bạn gán), vào video, xem, thả tym, gõ câu, gửi. Một câu tính là **đã gửi** khi TikTok xác nhận đã nhận; app không kiểm tra bình luận có hiển thị công khai hay không (TikTok có thể ẩn bình luận của một số tài khoản với người khác). Mọi thứ chạy hoàn toàn trên máy bạn, không có máy chủ trung gian.

<p align="center">
  <a href="https://github.com/tuleader/auto-beep-toptop/releases/download/v1.0.0/AutoBeepTopTop-Setup-1.0.0.exe"><b>⬇ Tải AutoBeepTopTop-Setup-1.0.0.exe (Windows, 213 MB)</b></a> ·
  <a href="https://auto-beep-toptop-site.vercel.app">Xem thử giao diện (demo)</a> ·
  <a href="https://github.com/tuleader/auto-beep-toptop/wiki">Hướng dẫn (Wiki)</a> ·
  <a href="https://www.facebook.com/100017717225379">Hỗ trợ (Facebook)</a> ·
  <a href="#-mời-tác-giả-ly-cà-phê">☕ Mời cà phê</a>
</p>

---

## ✨ Tính năng nổi bật

* **One-Click Beep:** dán mục tiêu, dán kho câu, tick tài khoản, bấm **"Bắt đầu Beep"**. Không cấu hình trình duyệt, không cài thêm gì.
* **Beep theo UID hoặc theo video:** theo UID thì app tự vào trang cá nhân, chọn ngẫu nhiên video không bị ghim; theo link thì Beep đúng video bạn đưa. Mỗi kiểu có danh sách mục tiêu riêng.
* **Hai chế độ chạy:** **Beep không thương tiếc** — mỗi video từ X đến Y câu rồi sang video kế; **Beep không ngừng nghỉ** — lặp qua các mục tiêu tới khi cạn kho câu.
* **Chia việc thông minh:** đặt "mỗi tài khoản Beep từ X đến Y link/UID", app chia đều cho các tài khoản và luôn ưu tiên mục tiêu còn ít người Beep, nên danh sách được phủ đều trước khi có ai trùng.
* **Beep như người thật:** tuỳ chọn xem video và thả tym trước khi bình luận; sau khi gửi, trình duyệt **luôn ở lại xem tiếp video đó** vài giây rồi mới đi tiếp; giãn cách ngẫu nhiên giữa hai lần Beep; emoji vui vẻ / tức giận ngẫu nhiên; tag chủ video.
* **Kho câu tự gọn:** câu đã gửi tự rời khỏi kho, link/UID đã Beep xong tự rời khỏi danh sách (hai tuỳ chọn, mặc định tắt), kể cả khi bạn đang ở trang khác của app.
* **Mỗi tài khoản một trình duyệt riêng:** **Beep Browser** đi kèm sẵn, profile riêng cho từng tài khoản — cookie, cache không tài khoản nào dùng chung với tài khoản nào. Xoá một tài khoản là xoá luôn profile (phiên đăng nhập) của nó. Muốn thì chuyển sang Google Chrome của máy trong Cài đặt.
* **Proxy tĩnh cho từng tài khoản (tuỳ chọn, không bắt buộc):** kho proxy HTTP/HTTPS/SOCKS, kiểm tra sống/chết kèm IP ra và vị trí; chọn proxy → **Gán cho tài khoản** với 4 chế độ gán (1–1, xoay vòng, 1–nhiều, ngẫu nhiên). Tài khoản có proxy thì mọi tab của trình duyệt đó đều đi qua proxy; không có proxy thì chạy bằng IP thật của máy.
* **Quản lý tài khoản hàng loạt:** dán `username|password|2fa|email|pass_email|cookie|proxy`, kiểm tra sống/chết, tự đăng nhập lại bằng mật khẩu khi cookie hết hạn (kể cả 2FA), mở trình duyệt để thao tác tay khi cần.
* **Captcha tích hợp sẵn:** gặp captcha là app tự giải, có dải chữ báo ngay trên khung captcha để bạn biết nó đang làm gì. Khoá mặc định do tác giả duy trì; hết lượt app sẽ báo để bạn dùng khoá riêng.
* **Dữ liệu ở trên máy bạn:** tài khoản, cookie, proxy, nhật ký nằm trong `%APPDATA%\AutoBeepTopTop`. Không máy chủ, không thu thập gì.
* **Giao diện tiếng Việt / English**, đổi ngay bằng nút cờ ở thanh bên.

## 🖼 Ảnh màn hình

| Beep | Tài khoản |
|---|---|
| ![Beep](docs/img/beep.png) | ![Tài khoản](docs/img/accounts.png) |

| Proxy tĩnh | Cài đặt |
|---|---|
| ![Proxy](docs/img/proxies.png) | ![Cài đặt](docs/img/settings.png) |

## 🚀 Hướng dẫn sử dụng

1. Tải bộ cài **[AutoBeepTopTop-Setup-1.0.0.exe](https://github.com/tuleader/auto-beep-toptop/releases/download/v1.0.0/AutoBeepTopTop-Setup-1.0.0.exe)** và chạy (không cần quyền quản trị). Windows SmartScreen có thể hỏi vì bộ cài chưa ký số: chọn *More info → Run anyway*.
2. Mở app, đồng ý điều khoản, rồi thêm dữ liệu: **Tài khoản** → *Thêm tài khoản* → *Kiểm tra tài khoản*. Muốn dùng proxy (tuỳ chọn): **Proxy tĩnh** → *Thêm proxy* → *Kiểm tra proxy* → *Gán cho tài khoản*.
3. Vào tab **Beep**, chọn *Beep theo UID* hoặc *Beep theo video*, dán mục tiêu, dán kho câu, tick tài khoản, bấm **"Bắt đầu Beep"** và để Auto Beep TopTop lo phần còn lại!

> Chi tiết từng màn hình, cách đọc kết quả, xử lý mã xác minh: [Wiki → Hướng dẫn sử dụng](https://github.com/tuleader/auto-beep-toptop/wiki/H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-s%E1%BB%AD-d%E1%BB%A5ng) · [Cài đặt](https://github.com/tuleader/auto-beep-toptop/wiki/C%C3%A0i-%C4%91%E1%BA%B7t) · [Câu hỏi thường gặp](https://github.com/tuleader/auto-beep-toptop/wiki/C%C3%A2u-h%E1%BB%8Fi-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p).
>
> Yêu cầu: Windows 10/11 64-bit, ~1 GB dung lượng (đã gồm Beep Browser), Internet. Mỗi cửa sổ trình duyệt chạy song song cần khoảng 300–500 MB RAM. Proxy là tuỳ chọn: trong Beep → Nâng cao, "Chỉ chạy tài khoản đã gắn proxy" mặc định **bật** (tài khoản không có proxy bị bỏ qua kèm thông báo); tắt đi thì tài khoản đó vẫn chạy, bằng IP thật của máy.

## 📥 Tải xuống & Hỗ trợ

* **Bản phát hành:** [Releases](https://github.com/tuleader/auto-beep-toptop/releases/latest)
* **Xem thử giao diện không cần cài:** [auto-beep-toptop-site.vercel.app](https://auto-beep-toptop-site.vercel.app)
* **Hướng dẫn, câu hỏi thường gặp, điều khoản:** [Wiki](https://github.com/tuleader/auto-beep-toptop/wiki)
* **Báo lỗi / góp ý / cần hướng dẫn:** nhắn tác giả qua [Facebook](https://www.facebook.com/100017717225379) hoặc mở [Issue](https://github.com/tuleader/auto-beep-toptop/issues)

## ☕ Mời tác giả ly cà phê

Phần mềm miễn phí, và bản bạn đang dùng là bản beta. Một ly cà phê của bạn là một phần thúc đẩy để tác giả sớm hoàn thiện bản chính thức. Ủng hộ là tự nguyện, không đổi lấy tính năng hay quyền lợi gì trong bản hiện tại.

<table>
  <tr>
    <td width="260" align="center"><img src="docs/img/qr-tpbank.png" width="240" alt="VietQR TPBank"/></td>
    <td valign="top">
      <b>Ngân hàng:</b> TPBank<br/>
      <b>Chủ tài khoản:</b> TA NGOC TU<br/>
      <b>Số tài khoản:</b> <code>0066 6777 888</code><br/>
      <b>Nội dung:</b> <code>Moi cafe Auto Beep Toptop</code> (đã điền sẵn trong mã QR)<br/><br/>
      Quét mã VietQR bằng app ngân hàng bất kỳ, hoặc bấm <i>Ủng hộ tác giả</i> ngay trong phần mềm.<br/>
      Ủng hộ là tự nguyện, không kèm quyền lợi hay cam kết nào — cảm ơn bạn ❤
    </td>
  </tr>
</table>

## 🛣 Lộ trình bản chính thức

* **Beep bằng AI:** tự sinh câu bình luận theo ngữ cảnh từng video, không chỉ chọn từ kho câu có sẵn.
* **Đa ngôn ngữ:** Beep bằng nhiều thứ tiếng mà không cần tự viết kho câu cho từng ngôn ngữ.
* **Nhiều phong cách hơn:** chọn giọng điệu (vui, tức giận, nghiêm túc…) để AI sinh câu phù hợp.
* **Gợi ý câu Beep** dựa trên những câu đã từng gửi thành công.
* Vẫn chạy hoàn toàn trên máy bạn, không đổi mô hình dữ liệu hiện tại.

## 📜 Điều khoản

Toàn văn điều khoản sử dụng: [Wiki → Điều khoản sử dụng](https://github.com/tuleader/auto-beep-toptop/wiki/%C4%90i%E1%BB%81u-kho%E1%BA%A3n-s%E1%BB%AD-d%E1%BB%A5ng) (bản sao trong kho: [TERMS.md](TERMS.md)). Bản trong app và bản này là một; khi điều khoản đổi, app sẽ yêu cầu đồng ý lại.

## 🤝 Lời cảm ơn

* Beep Browser là bản dựng công khai từ **Chromium** (BSD), **ungoogled-chromium** và **fingerprint-chromium** (BSD-3-Clause); tác giả chỉ đóng gói, giấy phép nằm trong thư mục `browser` của bản cài.
* Giải captcha qua dịch vụ **omocaptcha**.
* Phát triển bởi **[tuleader](https://github.com/tuleader)**.

---

*Nếu bạn thấy công cụ hữu ích, đừng quên để lại một ⭐ trên repo nhé!*

<sub>Auto Beep TopTop không liên kết với TikTok hay Google.</sub>
