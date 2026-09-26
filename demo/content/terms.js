// Điều khoản sử dụng Auto Beep TopTop. Cấu trúc: title + intro + sections[{heading, paras[], label, bullets[], after[]}]
// Bố cục và cơ chế (cuộn hết → tick 2 ô → Đồng ý) phỏng theo ModalTerm của bản gốc; nội dung viết riêng cho
// sản phẩm này — xem docs/TERMS-ANALYSIS.md. Căn cứ pháp lý cập nhật tới 2026-09-25 (mục 12).
export const TERMS_VERSION = '2026-09-25.4';

export const TERMS = {
  title: 'Điều khoản sử dụng Auto Beep TopTop',
  intro: 'Điều khoản này là thoả thuận giữa bạn ("Người dùng") và tác giả phần mềm Auto Beep TopTop ("Tác giả") về việc sử dụng phần mềm Auto Beep TopTop ("Phần mềm"). Bạn cần đọc kỹ toàn bộ nội dung. Bằng cách nhấn "Đồng ý", bạn xác nhận đã đọc, hiểu và chấp thuận. Nếu không đồng ý, Phần mềm sẽ đóng lại và bạn không được sử dụng.',
  sections: [
    {
      heading: '1. Phần mềm và các bên',
      paras: [
        'Auto Beep TopTop là công cụ cá nhân giúp bạn quản lý các tài khoản TikTok của chính mình, quản lý proxy tĩnh và đăng bình luận tự động lên video ("Beep"). Phần mềm chạy hoàn toàn trên máy tính của bạn, điều khiển một trình duyệt đi kèm (Beep Browser, dựng trên Chromium mã nguồn mở có tính năng vân tay) hoặc Google Chrome đã cài sẵn trên máy, tuỳ bạn chọn.',
        'Tác giả là cá nhân phát triển và phát hành Phần mềm. Phần mềm được cung cấp miễn phí cho mục đích sử dụng cá nhân. Không có máy chủ trung gian, không có tài khoản đăng nhập vào Phần mềm, không có gói bán license, không có hợp đồng dịch vụ.',
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
        'Beep Browser đi kèm là bản Chromium mã nguồn mở (giấy phép BSD-3-Clause) có vá vân tay. Tính năng vân tay chỉ nhằm giảm khả năng nhiều tài khoản trên cùng máy bị nhận ra là một, KHÔNG phải cam kết không bị phát hiện. Google Chrome là sản phẩm của Google; khi bạn chọn Chrome, Phần mềm chỉ điều khiển bản đã cài trên máy bạn.',
        'Giải captcha dùng dịch vụ của bên thứ ba (omocaptcha). Gói dịch vụ mặc định do Tác giả chi trả và duy trì bằng đóng góp tự nguyện; khi hết lượt, tính năng này có thể tạm dừng cho tới khi được nạp lại hoặc bạn nhập khoá riêng. Đây không phải lỗi của Phần mềm và không phải căn cứ khiếu nại.',
        'Các thành phần mã nguồn mở đi kèm (Electron, Chromium, playwright-core, better-sqlite3 và các thư viện khác) thuộc giấy phép riêng của từng thành phần; giấy phép được lưu kèm trong bộ cài.',
      ],
    },
    {
      heading: '6. Quyền sở hữu trí tuệ',
      bullets: [
        'Mã nguồn, thiết kế giao diện, tên gọi, biểu tượng Auto Beep TopTop thuộc quyền tác giả của Tác giả, được bảo hộ theo Luật Sở hữu trí tuệ.',
        'Bạn được cấp quyền sử dụng Phần mềm không độc quyền, không chuyển nhượng, cho mục đích cá nhân. Bạn không được bán, cho thuê, đóng gói lại thành sản phẩm khác, gỡ bỏ thông báo quyền tác giả, hay tuyên bố Phần mềm là của mình.',
        'Bạn không được dùng tên, biểu tượng của Phần mềm hay của Tác giả để quảng cáo dịch vụ của bạn khi chưa có sự đồng ý bằng văn bản.',
      ],
    },
    {
      heading: '7. Không bảo hành; giới hạn trách nhiệm',
      bullets: [
        'Phần mềm được cung cấp "NHƯ HIỆN TẠI" và "TUỲ KHẢ NĂNG SẴN CÓ", không kèm bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý, về tính phù hợp cho một mục đích cụ thể, tính liên tục, không lỗi, hay kết quả đạt được. Phần mềm có thể ngừng hoạt động khi TikTok thay đổi giao diện hoặc chính sách.',
        'Trong phạm vi tối đa pháp luật cho phép, Tác giả không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hay hệ quả nào (mất tài khoản, mất dữ liệu, mất doanh thu, mất cơ hội kinh doanh, bị nền tảng xử phạt) phát sinh từ việc dùng hoặc không dùng được Phần mềm, kể cả khi đã được cảnh báo về khả năng xảy ra.',
        'Vì Phần mềm miễn phí, tổng trách nhiệm của Tác giả (nếu có) trong mọi trường hợp không vượt quá 0 đồng. Điều này không loại trừ trách nhiệm mà pháp luật không cho phép loại trừ.',
        'Bạn đồng ý bảo vệ và bồi hoàn cho Tác giả trước mọi khiếu nại, yêu cầu của bên thứ ba phát sinh từ việc bạn vi phạm điều khoản này hoặc pháp luật khi dùng Phần mềm.',
      ],
    },
    {
      heading: '8. Hỗ trợ, đóng góp và hoàn tiền',
      bullets: [
        'Hỗ trợ và hướng dẫn sử dụng được cung cấp qua Facebook của Tác giả (https://www.facebook.com/100017717225379) theo khả năng của Tác giả, không có cam kết thời gian phản hồi và không có hotline.',
        'Mọi đóng góp qua mục "Ủng hộ tác giả" là tự nguyện, không phải khoản thanh toán để mua Phần mềm hay dịch vụ, không kèm bất kỳ quyền lợi, cam kết hay ưu tiên nào, và không được hoàn lại.',
        'Vì không có khoản thu bắt buộc, không áp dụng chính sách bảo hành có thu phí hay hoàn tiền; các quyền theo pháp luật của bạn (nếu có) vẫn được giữ nguyên.',
      ],
    },
    {
      heading: '9. Cập nhật, tạm ngừng, chấm dứt',
      bullets: [
        'Tác giả có thể phát hành bản cập nhật, thay đổi hoặc gỡ bỏ tính năng, ngừng phát triển hoặc ngừng duy trì dịch vụ captcha bất kỳ lúc nào mà không cần báo trước.',
        'Bạn có thể chấm dứt bằng cách gỡ Phần mềm. Tác giả có thể chấm dứt quyền sử dụng của bạn nếu bạn vi phạm điều khoản này.',
        'Các điều khoản về sở hữu trí tuệ, giới hạn trách nhiệm, bồi hoàn và luật áp dụng tiếp tục có hiệu lực sau khi chấm dứt.',
      ],
    },
    {
      heading: '10. Thay đổi điều khoản',
      bullets: [
        'Tác giả có thể sửa đổi điều khoản này để phù hợp với pháp luật hoặc thay đổi của Phần mềm. Phiên bản mới được ghi số hiệu và ngày, công bố tại trang GitHub của Phần mềm và xem được trong Phần mềm qua mục "Điều khoản".',
        'Tiếp tục sử dụng Phần mềm sau khi phiên bản mới được công bố nghĩa là bạn chấp thuận phiên bản mới. Nếu không đồng ý, bạn dừng sử dụng và gỡ Phần mềm.',
      ],
    },
    {
      heading: '11. Luật áp dụng và giải quyết tranh chấp',
      bullets: [
        'Điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Người dùng ngoài Việt Nam phải tuân thủ cả pháp luật nước sở tại.',
        'Mọi tranh chấp trước hết được giải quyết bằng thương lượng, hoà giải qua kênh liên hệ ở mục Liên hệ. Không đạt được thoả thuận thì đưa ra Toà án có thẩm quyền tại Việt Nam.',
        'Nếu một phần của điều khoản bị vô hiệu, các phần còn lại vẫn giữ nguyên hiệu lực. Điều khoản này là toàn bộ thoả thuận giữa bạn và Tác giả về Phần mềm. Bản tiếng Việt là bản có giá trị.',
        'Tác giả không chịu trách nhiệm khi không thể thực hiện nghĩa vụ vì sự kiện bất khả kháng (thiên tai, dịch bệnh, sự cố hạ tầng Internet, thay đổi của nền tảng bên thứ ba).',
      ],
    },
    {
      heading: '12. Căn cứ pháp lý',
      paras: ['Điều khoản này được soạn theo các văn bản đang có hiệu lực tại thời điểm ban hành:'],
      bullets: [
        'Bộ luật Dân sự 2015 (số 91/2015/QH13).',
        'Luật An ninh mạng 2018 (số 24/2018/QH14, hiệu lực 01/01/2019).',
        'Luật Sở hữu trí tuệ 2005, sửa đổi bổ sung 2009, 2019, 2022 (Luật số 07/2022/QH15, hiệu lực 01/01/2023).',
        'Luật Giao dịch điện tử 2023 (số 20/2023/QH15, hiệu lực 01/07/2024) — chấp thuận điện tử bằng thao tác "Đồng ý" trong Phần mềm có giá trị pháp lý.',
        'Luật Bảo vệ quyền lợi người tiêu dùng 2023 (số 19/2023/QH15, hiệu lực 01/07/2024).',
        'Nghị định 147/2024/NĐ-CP về quản lý, cung cấp, sử dụng dịch vụ Internet và thông tin trên mạng (hiệu lực 25/12/2024, thay thế Nghị định 72/2013/NĐ-CP).',
        'Luật Bảo vệ dữ liệu cá nhân 2025 (số 91/2025/QH15, hiệu lực 01/01/2026, thay thế Nghị định 13/2023/NĐ-CP).',
        'Luật Công nghiệp công nghệ số 2025 (số 71/2025/QH15, hiệu lực 01/01/2026).',
      ],
      after: ['Khi văn bản nêu trên được thay thế hoặc sửa đổi, điều khoản này được hiểu theo văn bản mới tương ứng cho tới khi được cập nhật.'],
    },
    {
      heading: '13. Đồng ý',
      paras: ['Bằng cách nhấn "Đồng ý", bạn xác nhận đã đọc, hiểu và chấp thuận toàn bộ điều khoản trên, và xác nhận đáp ứng điều kiện ở mục 2. Nếu không đồng ý, hãy nhấn "Không đồng ý" — Phần mềm sẽ đóng lại.'],
    },
  ],
  contact: { facebook: 'https://www.facebook.com/100017717225379', github: 'https://github.com/tuleader/auto-beep-toptop' },
  definitions: [
    ['"Phần mềm"', 'Auto Beep TopTop, gồm ứng dụng, Beep Browser đi kèm, mã nguồn và tài liệu đi kèm, do Tác giả phát triển.'],
    ['"Tác giả"', 'Cá nhân phát triển và phát hành Phần mềm, liên hệ qua kênh ở mục Liên hệ.'],
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
