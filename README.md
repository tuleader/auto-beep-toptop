🇻🇳 Tiếng Việt · [🇬🇧 English](README.en.md)

<p align="center">
  <img src="docs/img/logo.png" width="96" alt="Auto Beep TopTop" />
</p>

<h1 align="center">Auto Beep TopTop</h1>

<p align="center">
  <b>Bình luận TikTok tự động, chạy hoàn toàn trên máy bạn.</b><br/>
  Quản lý tài khoản · Proxy tĩnh · Beep theo UID / theo video · Trình duyệt chống phát hiện · Giải captcha tích hợp sẵn
</p>

<p align="center">
  <a href="https://github.com/tuleader/auto-beep-toptop/releases/download/v1.0.0/AutoBeepTopTop-Setup-1.0.0.exe"><b>⬇ Tải AutoBeepTopTop-Setup-1.0.0.exe (Windows, 213 MB)</b></a> ·
  <a href="https://github.com/tuleader/auto-beep-toptop/releases/latest">Tất cả bản phát hành</a> ·
  <a href="https://auto-beep-toptop-site.vercel.app">Xem thử giao diện (demo)</a> ·
  <a href="https://github.com/tuleader/auto-beep-toptop/wiki">Hướng dẫn (Wiki)</a> ·
  <a href="https://github.com/tuleader/auto-beep-toptop/wiki/%C4%90i%E1%BB%81u-kho%E1%BA%A3n-s%E1%BB%AD-d%E1%BB%A5ng">Điều khoản sử dụng</a> ·
  <a href="https://www.facebook.com/100017717225379">Hỗ trợ &amp; hướng dẫn (Facebook)</a> ·
  <a href="#-mời-tác-giả-ly-cà-phê">☕ Mời cà phê</a>
</p>

---

## Phần mềm làm gì

| | |
|---|---|
| **Tài khoản TikTok** | Dán hàng loạt `username\|password\|2fa\|email\|pass_email\|cookie\|proxy`, cập nhật thông tin (mật khẩu, email, mật khẩu email, 2FA — đúng một tài khoản mỗi lần, chọn nhiều thì nút bị khoá), kiểm tra sống/chết, tự đăng nhập lại khi cookie hết hạn (kể cả 2FA), nhận proxy gán từ trang Proxy tĩnh, mở trình duyệt thao tác tay. |
| **Proxy tĩnh** | Kho proxy HTTP/HTTPS/SOCKS, kiểm tra sống/chết kèm IP ra và vị trí, đếm số tài khoản đang dùng; chọn proxy → **Gán cho tài khoản** → chọn tài khoản nhận, chế độ gán (1 proxy–1 tài khoản, xoay vòng, 1 proxy–nhiều tài khoản, ngẫu nhiên) và số lượng. |
| **Beep** | Chọn mục tiêu theo **UID** (app tự vào trang cá nhân, chọn video không bị ghim) hoặc theo **link video** — mỗi loại một danh sách mục tiêu riêng; "Mỗi tài khoản Beep từ" X đến Y link/UID, chia đều cho các tài khoản và ưu tiên mục tiêu đang được ít tài khoản nhận nhất; kho câu Beep dán tay hoặc nạp file `.txt`, tuỳ chọn tự xoá câu đã gửi khỏi kho và tự xoá link/UID khỏi danh sách sau khi Beep thành công; tuỳ chọn xem video / thả tym trước khi Beep — sau khi gửi cmt, trình duyệt luôn ở lại xem video thêm X đến Y giây (bắt buộc, tối thiểu 3 giây); **Beep không thương tiếc** (mỗi video từ X đến Y cmt) hoặc **Beep không ngừng nghỉ** (lặp tới khi hết kho câu); Beep cách nhau X đến Y giây; emoji ngẫu nhiên vui vẻ / tức giận; tag chủ video. |
| **Beep Browser** | Trình duyệt chống phát hiện đi kèm sẵn, không cần cài gì thêm. Có thể chuyển sang Google Chrome của máy trong Cài đặt. |
| **Captcha** | Tích hợp sẵn, không cần cấu hình. Khoá mặc định do tác giả tự chi trả và duy trì; khi hết lượt app sẽ báo để bạn dùng token riêng. |
| **Dữ liệu** | Tài khoản, cookie, proxy, nhật ký nằm trong `%APPDATA%\AutoBeepTopTop` trên máy bạn. Không có máy chủ, không thu thập gì. |

## Ảnh màn hình

| Beep | Tài khoản |
|---|---|
| ![Beep](docs/img/beep.png) | ![Tài khoản](docs/img/accounts.png) |

| Proxy tĩnh | Cài đặt |
|---|---|
| ![Proxy](docs/img/proxies.png) | ![Cài đặt](docs/img/settings.png) |

## Cài đặt

> Hướng dẫn chi tiết (yêu cầu máy, dữ liệu nằm ở đâu, nâng cấp, gỡ): [Wiki → Cài đặt](https://github.com/tuleader/auto-beep-toptop/wiki/C%C3%A0i-%C4%91%E1%BA%B7t).

1. Tải bộ cài: **[AutoBeepTopTop-Setup-1.0.0.exe](https://github.com/tuleader/auto-beep-toptop/releases/download/v1.0.0/AutoBeepTopTop-Setup-1.0.0.exe)** (213 MB). Các bản khác ở trang [Releases](https://github.com/tuleader/auto-beep-toptop/releases/latest).
2. Chạy bộ cài (không cần quyền quản trị). Windows SmartScreen có thể cảnh báo vì bộ cài chưa ký số: chọn *More info → Run anyway*.
3. Mở app, đọc và đồng ý điều khoản, thêm tài khoản và proxy, vào tab **Beep**.

Yêu cầu: Windows 10/11 64-bit, ~1 GB dung lượng (đã gồm Beep Browser), kết nối Internet. Mỗi cửa sổ trình duyệt chạy song song cần khoảng 300–500 MB RAM.

## Cách dùng nhanh

> Hướng dẫn từng màn hình, đọc kết quả, xử lý mã xác minh: [Wiki → Hướng dẫn sử dụng](https://github.com/tuleader/auto-beep-toptop/wiki/H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-s%E1%BB%AD-d%E1%BB%A5ng) · [Câu hỏi thường gặp](https://github.com/tuleader/auto-beep-toptop/wiki/C%C3%A2u-h%E1%BB%8Fi-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p).

1. **Proxy tĩnh** → *Thêm proxy* (mỗi dòng một proxy) → *Kiểm tra proxy*.
2. **Tài khoản** → *Thêm tài khoản* (mỗi dòng một tài khoản, có thể kèm proxy) → *Kiểm tra tài khoản*.
3. **Beep** → chọn *Beep theo UID* hoặc *Beep theo video* → dán mục tiêu → dán kho câu → chọn tài khoản → **BẮT ĐẦU BEEP**.
4. Theo dõi bảng kết quả và nhật ký: cột *Beep xác nhận / gửi* là con số thật.

Trong Beep → Nâng cao, tuỳ chọn "Chỉ chạy tài khoản đã gắn proxy" mặc định **bật**: tài khoản không có proxy bị bỏ qua kèm thông báo. Tắt tuỳ chọn này thì tài khoản đó vẫn chạy — bằng IP thật của máy.

## Hỗ trợ

Cần hướng dẫn, gặp lỗi, hay muốn góp ý: nhắn qua **Facebook** → https://www.facebook.com/100017717225379

## ☕ Mời tác giả ly cà phê

Phần mềm miễn phí. Một ly cà phê của bạn là kinh phí để tác giả nuôi AI và ra mắt bản v2. Ủng hộ là tự nguyện, không đổi lấy tính năng hay quyền lợi gì trong bản hiện tại.

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

## Lộ trình v2

- Beep bằng AI: tự sinh câu bình luận theo ngữ cảnh từng video, không chỉ chọn từ kho câu có sẵn.
- Đa ngôn ngữ: Beep bằng nhiều thứ tiếng khác nhau, không cần bạn tự viết kho câu cho từng ngôn ngữ.
- Nhiều phong cách hơn: chọn giọng điệu (vui, tức giận, nghiêm túc…) để AI sinh câu phù hợp.
- Gợi ý câu Beep dựa trên những câu đã từng "xác nhận" thành công.
- Vẫn chạy hoàn toàn trên máy bạn, không đổi mô hình dữ liệu hiện tại.

## Điều khoản

Toàn văn điều khoản sử dụng: [Wiki → Điều khoản sử dụng](https://github.com/tuleader/auto-beep-toptop/wiki/%C4%90i%E1%BB%81u-kho%E1%BA%A3n-s%E1%BB%AD-d%E1%BB%A5ng) (bản sao trong kho: [TERMS.md](TERMS.md)). Bản trong app và bản này là một; khi điều khoản đổi, app sẽ yêu cầu đồng ý lại.

---

<sub>Auto Beep TopTop không liên kết với TikTok hay Google. Beep Browser dựng trên Chromium (BSD) và fingerprint-chromium (BSD-3-Clause).</sub>
