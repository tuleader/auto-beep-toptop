// Điều khoản sử dụng Auto Beep TopTop. Cấu trúc: title + intro + sections[{heading, paras[], label, bullets[], after[]}]
// Bố cục và cơ chế (cuộn hết → tick 2 ô → Đồng ý) phỏng theo ModalTerm của bản gốc; nội dung viết riêng cho
// sản phẩm này — xem docs/TERMS-ANALYSIS.md. Rút gọn 2026-09-27 (chủ dự án): mục 6–12 cũ gộp thành một mục 6 ngắn.
// 2026-09-27.7 (chủ dự án): nêu tên Tác giả (§1); Beep Browser mô tả trung thực (ungoogled-chromium +
// fingerprint-chromium, Tác giả không biên dịch, giấy phép trong thư mục `browser`) và cam kết không mã độc thu
// hẹp về phần Tác giả viết (§5, §6); "vân tay"/"chống phát hiện" → "profile riêng cho từng tài khoản"; đổi phiên
// bản điều khoản thì app hỏi đồng ý lại (§6).
export const TERMS_VERSION = '2026-09-27.7';

export const TERMS = {
  title: 'Điều khoản sử dụng Auto Beep TopTop',
  intro: 'Điều khoản này là thoả thuận giữa bạn ("Người dùng") và tác giả phần mềm Auto Beep TopTop ("Tác giả") về việc sử dụng phần mềm Auto Beep TopTop ("Phần mềm"). Bạn cần đọc kỹ toàn bộ nội dung. Bằng cách nhấn "Đồng ý", bạn xác nhận đã đọc, hiểu và chấp thuận. Nếu không đồng ý, Phần mềm sẽ đóng lại và bạn không được sử dụng.',
  sections: [
    {
      heading: '1. Phần mềm và các bên',
      paras: [
        'Auto Beep TopTop là công cụ cá nhân giúp bạn quản lý các tài khoản TikTok của chính mình, quản lý proxy tĩnh và đăng bình luận tự động lên video ("Beep"). Phần mềm chạy hoàn toàn trên máy tính của bạn, điều khiển một trình duyệt đi kèm (Beep Browser, dựng trên Chromium mã nguồn mở, với profile riêng cho từng tài khoản) hoặc Google Chrome đã cài sẵn trên máy, tuỳ bạn chọn.',
        'Tác giả là cá nhân phát triển và phát hành Phần mềm. Tác giả: Tạ Ngọc Tú (GitHub: tuleader). Phần mềm được cung cấp miễn phí cho mục đích sử dụng cá nhân. Không có máy chủ trung gian, không có tài khoản đăng nhập vào Phần mềm, không có gói bán license, không có hợp đồng dịch vụ.',
        'Phần mềm không liên kết, không được tài trợ hay chứng nhận bởi TikTok, ByteDance, Google hay bất kỳ nền tảng nào được nhắc tới.',
      ],
    },
    {
      heading: '2. Điều kiện sử dụng',
      bullets: [
        'Bạn phải đủ 18 tuổi, hoặc từ đủ 15 tuổi và có sự đồng ý của cha mẹ hoặc người giám hộ hợp pháp theo Bộ luật Dân sự.',
        'Bạn chỉ được dùng Phần mềm trên các tài khoản TikTok thuộc quyền sử dụng hợp pháp của bạn.',
        'Bạn chịu trách nhiệm về mọi hoạt động thực hiện bằng Phần mềm trên máy của bạn, kể cả khi người khác dùng máy đó.',
      ],
    },
    {
      heading: '3. Quy định sử dụng',
      paras: ['Bạn được phép dùng Phần mềm cho các mục đích hợp pháp: chăm sóc, tương tác và tiếp thị trên các tài khoản TikTok của mình, tuân thủ pháp luật Việt Nam và điều khoản của nền tảng.'],
      label: 'NGHIÊM CẤM dùng Phần mềm để:',
      bullets: [
        'Chống phá Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam, xâm phạm an ninh quốc gia, trật tự an toàn xã hội (Luật An ninh mạng 2018, Điều 8).',
        'Tuyên truyền chiến tranh, khủng bố, kích động bạo lực, phát tán nội dung đồi trụy, mê tín dị đoan, thông tin sai sự thật, thông tin xúc phạm dân tộc, tôn giáo.',
        'Vu khống, xúc phạm danh dự, nhân phẩm, uy tín của cá nhân hoặc tổ chức; quấy rối, đe doạ, bắt nạt người khác.',
        'Quảng cáo, mua bán hàng hoá hoặc dịch vụ bị pháp luật cấm hoặc hạn chế; lừa đảo, hoặc tiếp tay cho lừa đảo.',
        'Thu thập, xử lý dữ liệu cá nhân của người khác trái pháp luật; tấn công mạng; phát tán mã độc; gửi tin nhắn, bình luận rác hàng loạt.',
        'Giả mạo tổ chức, cá nhân; tạo tương tác giả nhằm thao túng thị trường, đánh giá hay xếp hạng trái quy định.',
        'Tương tác lên tài khoản TikTok không thuộc quyền sử dụng của bạn, hoặc lách các biện pháp kỹ thuật của nền tảng vì mục đích trái pháp luật.',
      ],
      after: ['Bạn chịu hoàn toàn trách nhiệm trước pháp luật về nội dung bạn tạo ra và cách bạn dùng Phần mềm. Tác giả không kiểm soát, không kiểm duyệt và không chịu trách nhiệm về nội dung bình luận do bạn cung cấp.'],
    },
    {
      heading: '4. Dữ liệu cá nhân và quyền riêng tư',
      bullets: [
        'Phần mềm KHÔNG thu thập họ tên, email, số điện thoại, địa chỉ hay bất kỳ dữ liệu cá nhân nào của bạn; KHÔNG dùng công cụ phân tích; KHÔNG gửi báo cáo về Tác giả.',
        'Dữ liệu bạn nhập (tài khoản TikTok, mật khẩu, cookie, proxy, kho câu, nhật ký) được lưu trong thư mục dữ liệu trên máy của bạn (%APPDATA%\\AutoBeepTopTop). Tác giả không có quyền truy cập và không nhận được dữ liệu này.',
        'Bạn là người kiểm soát dữ liệu theo Luật Bảo vệ dữ liệu cá nhân 2025. Nếu dữ liệu bạn nhập vào Phần mềm có chứa dữ liệu cá nhân của người khác (ví dụ tài khoản do người khác uỷ quyền), bạn phải có căn cứ pháp lý để xử lý.',
        'Kết nối ra ngoài chỉ gồm: TikTok (qua trình duyệt), proxy do bạn cấu hình, dịch vụ giải captcha (chỉ gửi ảnh thử thách captcha, không gửi dữ liệu tài khoản), dịch vụ hộp thư tạm nếu bạn dùng để nhận mã xác minh, và dịch vụ tra cứu địa chỉ IP khi bạn bấm kiểm tra proxy.',
        'Bạn tự chịu trách nhiệm bảo vệ máy tính và thư mục dữ liệu. Ai truy cập được máy của bạn sẽ đọc được dữ liệu này; hãy dùng mật khẩu máy và không chia sẻ thư mục dữ liệu.',
        'Khi bạn gỡ Phần mềm, thư mục dữ liệu được giữ lại để bạn tự quyết định xoá hay giữ.',
      ],
    },
    {
      heading: '5. Tài nguyên và dịch vụ bên thứ ba',
      bullets: [
        'Tài khoản TikTok và proxy là của bạn. Phần mềm KHÔNG cung cấp, trao đổi hay phân phối tài khoản, proxy hay bất kỳ tài nguyên nào. Bạn chịu trách nhiệm về nguồn gốc và tính hợp pháp của các tài nguyên đó.',
        'TikTok là nền tảng của bên thứ ba với Điều khoản dịch vụ và Nguyên tắc cộng đồng riêng. Việc dùng công cụ tự động hoá có thể vi phạm điều khoản của TikTok và dẫn tới tài khoản bị hạn chế, khoá hoặc xoá. Bạn tự đánh giá và tự chịu rủi ro này. Tác giả KHÔNG cam kết tài khoản của bạn an toàn.',
        'Beep Browser đi kèm là trình duyệt dựng trên Chromium mã nguồn mở, dùng để tạo profile riêng cho từng tài khoản (cookie, bộ nhớ đệm và thông số trình duyệt của các tài khoản không lẫn vào nhau). Đây KHÔNG phải cam kết tài khoản của bạn an toàn hay không bị TikTok hạn chế. Giấy phép của Chromium, ungoogled-chromium và fingerprint-chromium được kèm trong thư mục cài đặt (thư mục `browser`). Google Chrome là sản phẩm của Google; khi bạn chọn Chrome, Phần mềm chỉ điều khiển bản đã cài trên máy bạn.',
        'Giải captcha dùng dịch vụ của bên thứ ba (omocaptcha). Gói dịch vụ mặc định do Tác giả chi trả và duy trì bằng đóng góp tự nguyện; khi hết lượt, tính năng này có thể tạm dừng cho tới khi được nạp lại hoặc bạn nhập khoá riêng. Đây không phải lỗi của Phần mềm và không phải căn cứ khiếu nại.',
        'Các thành phần mã nguồn mở đi kèm (Electron, Chromium, playwright-core, better-sqlite3 và các thư viện khác) thuộc giấy phép riêng của từng thành phần; giấy phép được lưu kèm trong bộ cài.',
      ],
    },
    {
      heading: '6. Trách nhiệm và luật áp dụng',
      bullets: [
        'Phần mềm miễn phí và được cung cấp "như hiện tại": Tác giả không bảo đảm Phần mềm chạy liên tục, không lỗi, hay đạt một kết quả cụ thể; Phần mềm có thể ngừng hoạt động khi TikTok thay đổi giao diện hoặc chính sách.',
        'Tác giả cam kết phần do Tác giả viết (ứng dụng Auto Beep TopTop và bộ cài của nó) không chứa virus, mã độc, phần mềm gián điệp hay mã theo dõi, và không tự tải hay chạy mã từ nguồn nào khác ngoài bộ cài bạn đã tải. Beep Browser đi kèm là trình duyệt Chromium mã nguồn mở (cùng nền với Google Chrome) do cộng đồng chỉnh sửa: gỡ các kết nối tới Google (ungoogled-chromium) và thêm tuỳ chỉnh vân tay để mỗi tài khoản có một profile riêng biệt (fingerprint-chromium); Tác giả không biên dịch Beep Browser, chỉ đóng gói bản dựng công khai và kèm giấy phép của nó. Bộ cài chưa ký số nên Windows SmartScreen có thể cảnh báo; đó là cảnh báo mặc định cho phần mềm chưa ký, không phải kết luận có mã độc.',
        'Đóng góp qua mục "Ủng hộ tác giả" là tự nguyện, không phải khoản thanh toán mua Phần mềm hay dịch vụ và không được hoàn lại. Hỗ trợ được cung cấp qua Facebook của Tác giả theo khả năng, không cam kết thời gian phản hồi.',
        'Tác giả có thể cập nhật Phần mềm hoặc điều khoản này; phiên bản mới được ghi số hiệu, công bố trên GitHub và xem được trong Phần mềm. Khi Tác giả phát hành phiên bản điều khoản mới, Phần mềm sẽ hiển thị lại và yêu cầu bạn đồng ý trước khi dùng tiếp; không đồng ý thì dừng dùng và gỡ Phần mềm.',
        'Điều khoản này theo pháp luật Việt Nam; tranh chấp được giải quyết bằng thương lượng trước, không được thì tại Toà án có thẩm quyền tại Việt Nam. Bản tiếng Việt là bản có giá trị.',
      ],
    },
    {
      heading: '7. Đồng ý',
      paras: ['Bằng cách nhấn "Đồng ý", bạn xác nhận đã đọc, hiểu và chấp thuận toàn bộ điều khoản trên, và xác nhận đáp ứng điều kiện ở mục 2. Nếu không đồng ý, hãy nhấn "Không đồng ý" — Phần mềm sẽ đóng lại.'],
    },
  ],
  contact: { facebook: 'https://www.facebook.com/100017717225379', github: 'https://github.com/tuleader/auto-beep-toptop' },
  definitions: [
    ['"Phần mềm"', 'Auto Beep TopTop, gồm ứng dụng, mã nguồn và tài liệu do Tác giả phát triển, cùng Beep Browser được đóng gói kèm (xem mục 5 và 6).'],
    ['"Tác giả"', 'Tạ Ngọc Tú (GitHub: tuleader), cá nhân phát triển và phát hành Phần mềm, liên hệ qua kênh ở mục Liên hệ.'],
    ['"Bạn" / "Người dùng"', 'Cá nhân cài và sử dụng Phần mềm trên máy tính của mình.'],
    ['"Beep"', 'Một lần đăng bình luận tự động lên video TikTok bằng Phần mềm.'],
    ['"Tài nguyên bên thứ ba"', 'Tài khoản TikTok, proxy, Google Chrome, Chromium, dịch vụ giải captcha, dịch vụ hộp thư — không thuộc quyền kiểm soát của Tác giả.'],
    ['"Dữ liệu cá nhân"', 'Theo định nghĩa tại Luật Bảo vệ dữ liệu cá nhân 2025.'],
  ],
  checkbox1: 'Tôi đã đọc và nắm rõ Điều khoản sử dụng',
  checkbox2: 'Tôi đồng ý với Điều khoản sử dụng và xác nhận đủ điều kiện sử dụng',
  acceptedAtLabel: 'Bạn đã chấp nhận điều khoản vào:',
  agree: 'Đồng ý',
  disagree: 'Không đồng ý',
  disagreeConfirm: 'Không đồng ý điều khoản thì không thể sử dụng phần mềm. Thoát ứng dụng?',
};
