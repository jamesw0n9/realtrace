<!-- Translated from the English source README.md — English is the single source of truth. See docs/i18n.md. -->
<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.zh.md">简体中文</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.de.md">Deutsch</a> ·
  <a href="README.fr.md">Français</a> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.pt-BR.md">Português</a> ·
  <a href="README.ru.md">Русский</a> ·
  <a href="README.id.md">Bahasa Indonesia</a> ·
  <a href="README.it.md">Italiano</a> ·
  <a href="README.tr.md">Türkçe</a> ·
  <a href="README.vi.md">Tiếng Việt</a>
</p>
# RealTrace

> **Sự tạo ra bởi con người nên vẫn có thể được chứng minh trong thời đại của AI.**
>
> Dãy chữ ký Ed25519 · Ghi dấu thời gian thực · Không tải lên nội dung · Kiểm tra ngoại tuyến · Điểm dính chuỗi khởi đầu chính thức (miễn phí cho cá nhân)

[![Giấy phép: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Phiên bản](https://img.shields.io/badge/version-v0.5.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRs Chào mừng](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

<p align="center">
  <img src="docs/demo/realtrace-demo-25s-en.gif" alt="Demo RealTrace" width="640" />
  <br />
  <em>25 giây · từ ghi dấu thời gian thực đến kiểm tra ngoại tuyến (demo · không có âm thanh)</em>
  <br />
  <a href="docs/demo/realtrace-demo-25s-en.mp4">▶ Xem toàn bộ video demo (MP4)</a>
</p>

> Khi mọi thứ đều có thể bị làm giả, tính xác thực trở thành một thứ sang trọng. **Cảm biến đoán. RealTrace chứng minh.**

RealTrace là một **hệ thống chứng nhận hiện diện của sự tạo ra bởi con người**: nó sử dụng dãy chữ ký mật mã để chứng minh rằng một phần nội dung "đã được viết một cách chân thực bởi con người vào thời gian thực" — không phải được tạo ra bởi AI, không được dán vào sau, không bị thay đổi.

```text
Sự tạo ra bởi con người ── ghi dấu thời gian thực ── dãy chữ ký ── được niêm phong và điểm dính ── có thể kiểm tra · có thể theo dõi · không thể bị thay đổi
```

---

## Tuyên ngôn

Vào tháng 11 năm 2022, ChatGPT ra đời. Từ ngày đó, trong một thế giới mà mọi thứ đều có thể bị làm giả, tính xác thực trở thành một thứ sang trọng.

AI có thể bắt chước bất kỳ phong cách nào — ngoại trừ thời gian gõ của bạn. Cảm biến đoán. RealTrace chứng minh.

RealTrace là một **hệ thống chứng nhận hiện diện của sự tạo ra bởi con người**: từ giây đầu tiên bạn bắt đầu viết, mỗi giây dừng lại, mỗi lần xóa, mỗi nhịp gõ phím của bạn đều được ghi lại vào thời gian thực và khóa bằng các chữ ký Ed25519 vào một dãy tạo ra không thể thay đổi. Khi bạn hoàn thành, bạn sẽ có một tệp `.rt` chuỗi — có thể kiểm tra, có thể theo dõi, không thể bị thay đổi.

**Đây không còn là một câu hỏi nhiều lựa chọn.** Mỗi dấu ấn tham chiếu đến hash của dấu ấn trước đó. Thứ tự nguyên nhân được khóa bằng mật mã; bất kỳ sự thay đổi lại sau này nào đều có thể phát hiện được một cách toán học. Đây là bằng chứng từ vật lý và toán học, không phải là một đoán từ mô hình thống kê.

**Bạn là tác giả. Bạn xứng đáng có bằng chứng.** Khi ai đó hỏi "AI đã viết điều này chưa?", bạn không cần phải giải thích. RealTrace cung cấp cho bạn một bằng chứng hiện diện có thể kiểm tra độc lập — cho xuất bản, cho bảo vệ quyền lợi của bạn, cho bằng chứng. Tác giả không nên chiến đấu bằng tay trần.

**Nội dung của bạn thuộc về bạn. Luôn luôn.** Văn bản không bao giờ rời khỏi thiết bị của bạn; chuỗi chỉ ghi lại hash và đặc điểm hành vi. Chúng tôi không hứa sẽ bảo vệ quyền riêng tư của bạn — kiến trúc làm cho chúng tôi không thể có nội dung của bạn. Ghi dấu, kiểm tra và kiểm tra chứng chỉ đều xảy ra ngoại tuyến. Chuỗi vẫn hoạt động ngay cả khi trang web của chúng tôi ngừng hoạt động.

**Niềm tin không nên do một nền tảng duy nhất quyết định.** Các hash gốc của chuỗi con được điểm dính vào chuỗi khởi đầu chính thức. Các chuỗi được ký trên bất kỳ nền tảng nào đều có thể theo dõi lại cùng một điểm dính công khai cho kiểm tra độc lập.

RealTrace là mã nguồn mở. Miễn phí cho cá nhân. Mỗi tác giả có thể khóa công việc của mình.

**Tạo ra của bạn. Bằng chứng hiện diện của bạn.**

---

## Khi sự tạo ra bởi con người trở thành thứ cần tích trữ

Vào tháng 7 năm 2026, các tài liệu tòa án không được niêm phong tiết lộ "Dự án Panama" của Anthropic: việc mua lại hơn một triệu cuốn sách đã qua sử dụng thông qua các nhà buôn secondhand — các cuốn sách được cắt bỏ phần lưng bằng máy ép thủy lực, quét trang một cách riêng lẻ, sau đó bị hủy bỏ — tất cả để Claude có thể đọc thêm "các từ được viết bởi đôi tay con người." Trong một vụ án riêng biệt, khoảng 7 triệu cuốn sách không được phép sử dụng cho đào tạo, kết thúc bằng một khoản bồi thường 1,5 tỷ đô la, một kỷ lục trong tranh chấp bản quyền ở Hoa Kỳ.

Các công ty AI đang tích trữ sự tạo ra bởi con người. Bởi vì họ biết rõ hơn ai hết: mô hình có thể tạo ra vô hạn, nhưng suy nghĩ, kinh nghiệm và sự lựa chọn của con người là có hạn. Các cuốn sách cũ sẽ bị mua lại, quét và hủy bỏ; các từ được viết bởi thế hệ tiếp theo đang chìm trong cơn lũ AI — không thể thậm chí chứng minh "Tôi đã viết điều này."

Khi sự tạo ra bởi con người trở nên hiếm hoi, nó cần được chứng minh và bảo vệ.

Đó chính xác là điều mà RealTrace làm: từ giây đầu tiên bạn bắt đầu viết, quá trình sáng tạo của bạn được khóa vào một dãy chữ ký có thể kiểm tra, không thể bị thay đổi. Các từ của bạn luôn thuộc về bạn. Tạo ra của bạn có bằng chứng hiện diện.

**Khi sự tạo ra bởi con người trở nên hiếm hoi, RealTrace là bằng chứng hiện diện của nó.**

---

## Tại sao RealTrace tồn tại

Vào tháng 11 năm 2022, ChatGPT ra đời. Từ ngày đó, mọi thứ trên internet trở thành "không đáng tin cậy": tin tức, bình luận, bài viết, thơ, mã, hợp đồng, kiện tụng — không ai, không kể tác giả, có thể nhìn thấy bằng mắt thường để biết một đoạn văn bản đến từ con người hay từ máy móc.

Lo ngại hơn là "AI có thể viết điều đó": **khi mọi thứ đều có thể bị làm giả, tính xác thực trở thành một thứ sang trọng**. Giá trị của sự tạo ra bởi con người đang bị giảm dần một cách im lặng — suy nghĩ, cảm xúc, kinh nghiệm và sự lựa chọn của bạn trở thành văn bản không thể phân biệt được với đầu ra của máy móc.

Sứ mệnh của RealTrace là cung cấp "sự tạo ra bởi con người" một **bằng chứng hiện diện mật mã**:

- **Từ giây đầu tiên bạn viết**: không phải là một yêu cầu sau này của "Tôi đã viết điều này", mà là ghi lại và ký vào quá trình sáng tạo vào thời gian thực;
- **Không phụ thuộc vào uy tín của nền tảng**: mỗi chữ ký có thể được kiểm tra độc lập ngoại tuyến và kiểm tra toán học;
- **Không tải lên nội dung**: văn bản luôn ở trong tay bạn; chuỗi chỉ ghi lại hash và đặc điểm hành vi.

> Trong thời đại mà AI có thể bắt chước mọi thứ, sự tôn trọng của sự tạo ra bởi con người xứng đáng được bảo vệ.

---

## Các vấn đề chúng tôi giải quyết

| Vấn đề | Giải pháp của RealTrace |
|:--|:--|
| Nội dung được tạo ra bởi AI không thể phân biệt với sự tạo ra bởi con người | Ghi dấu thời gian thực: Các chữ ký Ed25519 được tạo ra tự động trong quá trình viết, ghi lại nhịp gõ phím, giây dừng lại, lượng xóa và các đặc điểm hành vi khác |
| Không thể phát hiện sự thay đổi hoặc thay thế sau này | Hash chuỗi: mỗi dấu ấn tham chiếu đến hash của dấu ấn trước đó; bất kỳ sự thay đổi lại sau này nào đều có thể phát hiện được một cách toán học |
| Tải lên nội dung tạo ra rủi ro về quyền riêng tư | Không tải lên nội dung: văn bản luôn ở địa phương; chuỗi chỉ ghi lại hash và đặc điểm hành vi |
| Kiểm tra phụ thuộc vào máy chủ; chuỗi chết khi trang web ngừng hoạt động | Hoàn toàn ngoại tuyến: ghi dấu, kiểm tra và kiểm tra chứng chỉ đều xảy ra địa phương; tệp `.rt` là tự bao gồm |
| Không thể theo dõi "ai đã ký, phiên bản nào đã được ký" | Điểm dính chuỗi khởi đầu: các hash gốc của chuỗi con được rút ra từ seed chính thức thông qua HKDF-SHA256; các hash gốc của chuỗi con được điểm dính vào chuỗi khởi đầu chính thức — có thể theo dõi lên và xuống (miễn phí cho cá nhân). |

---

## Nguyên tắc cốt lõi

**Dãy chữ ký (chuỗi dấu)** — mỗi dấu ấn trong quá trình viết là một nút trên dãy chữ ký:

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **Thứ tự nguyên nhân không thể bị làm giả**: mỗi dấu ấn hash tham chiếu đến dấu ấn trước đó; thứ tự拓扑 của chuỗi được xác định bởi `prevChainHash`, không phụ thuộc vào thời gian hệ thống — nó không thể được chèn hoặc sắp xếp lại sau này;
- **Các khóa riêng không thể bị làm giả**: các chữ ký Ed25519 được tạo ra bởi một khóa riêng được tạo địa phương mà không bao giờ rời khỏi thiết bị của bạn;
- **Dấu vân hành vi**: mỗi dấu ấn mang theo đặc điểm hành vi của nhịp gõ phím / giây dừng lại / xóa (chuỗi dấu hành vi HMAC) cho phân tích tính xác thực;
- **Điểm dính chuỗi khởi đầu**: các khóa gốc của chuỗi con được rút ra từ seed chính thức thông qua HKDF-SHA256; các hash gốc của chuỗi con được điểm dính vào chuỗi khởi đầu chính thức — có thể theo dõi lên và xuống (miễn phí cho cá nhân);
- **Liên kết Merkle toàn văn**: mỗi dấu ấn cũng tính toán root Merkle toàn văn và ghi nó vào chuỗi, cho phép tiết lộ chọn lọc bất kỳ đoạn nào mà không tiết lộ toàn văn.

**Định dạng tệp chuỗi (`.rt`)**: một hộp ZIP chứa `chain.json` (chuỗi chữ ký) và `meta.json` (phiên bản, thời gian, metadata chứng chỉ). Chuỗi chỉ ghi lại "bằng chứng quá trình sáng tạo", không phải nội dung.

Xem thêm [`docs/chain-spec.md`](docs/chain-spec.md) và [`docs/rt-file-format.md`](docs/rt-file-format.md).

---

## Bắt đầu nhanh chóng

### 1. Mở writer địa phương (không cần máy chủ)

 双击 `writer/index.html`，或使用任何静态服务器托管存储库根目录：

```bash
npx serve .
# mở http://localhost:3000/writer/
```

- Chọn "Viết ẩn danh" hoặc "Nhập .rt để tiếp tục" trước khi vào trình chỉnh sửa; nội dung được ghi dấu tự động khi bạn gõ;
- Nhấp vào "Niêm phong và điểm dính" để xác nhận: bạn sẽ được chuyển hướng đến trang kiểm tra ngoại tuyến để tải xuống tệp gốc `.txt` và tệp chuỗi `.rt` (xuất khẩu địa phương, không tải lên);
- Mở `verify/index.html` và kéo tệp `.rt` vào để kiểm tra toàn diện tính toàn vẹn của chuỗi.

### 2. Kích hoạt điểm dính chuỗi khởi đầu chính thức (tùy chọn, miễn phí cho cá nhân)

```bash
copy config.example.js config.js
```

Chỉnh sửa `config.js`:

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://official-anchor-service",  // sử dụng địa chỉ công bố chính thức
    genesisPublicKey: "official-genesis-root-public-key",
    enabled: true                                // gửi hash gốc chuỗi khi niêm phong
  }
};
```

> `config.js` được bỏ qua bởi `.gitignore` nên cấu hình đầu cuối của bạn sẽ không bị lưu trữ ngẫu nhiên.
> Điểm dính các tác phẩm cá nhân của bạn vào chuỗi là **miễn phí**; hợp tác doanh nghiệp / nền tảng được cấp phép (liên hệ với chúng tôi để hợp tác thương mại).

### 3. Chạy các bài kiểm tra

```bash
npm test
```

## Cấu trúc thư mục

| Đường dẫn | Mô tả |
|:--|:--|
| `core/` | Lõi front-end (browser IIFE, không có phụ thuộc vào việc xây dựng): stamping `stamp.js`, mật mã `rt-crypto.js`, xác thực ngoại tuyến `rt-verifier.js`, tệp chuỗi `rt-export.js`, tiết lộ Merkle `rt-merkle.js`, thời gian biểu `rt-timeline.js`, tải xuống tệp `rt-downloader.js` |
| `writer/` | Công cụ viết (HTML trang đơn): stamping tự động + tải xuống dấu seal |
| `verify/` | Trang xác thực chuỗi ngoại tuyến: kéo tệp `.rt` vào để xác thực |
| `anchor/` | Khách hàng gắn cột chính thức của chuỗi khởi đầu (miễn phí cho cá nhân) |
| `docs/` | Đặc tả chuỗi, định dạng tệp rt, tài liệu API gắn cột |
| `test/` | Kiểm tra hồi quy Node (24/24 đạt yêu cầu) |

---

## Cách mà dự án phát triển

| Ngày | Điểm mốc |
|:--|:--|
| 2022.11 | **Khởi đầu**: ChatGPT ra mắt; "Nội dung được tạo bởi AI không thể phân biệt bằng mắt thường" trở thành hiện thực, sinh ra ý tưởng về "chứng chỉ hiện diện của con người" |
| 2026.06 | **Thực hiện hoàn chỉnh đầu tiên**: stamping chuỗi → dấu seal → xác thực ngoại tuyến → chứng chỉ tự bao gồm, từ đầu đến cuối; 11 bằng sáng chế được đề xuất song song, vụ kiện cha được nộp tại cơ quan bằng sáng chế |
| 2026.07 | **Refactor theo mô-đun**: lõi stamping `stamp.js` được tách ra thành mô-đun, công cụ mật mã `rt-crypto.js` được phân tầng, dịch vụ writer / verifier / anchor được tách rời; đổi tên chính thức thành **RealTrace**; dịch vụ gắn cột chuỗi khởi đầu chính thức ra mắt |
| 2026.08 | **MVP v0.1.0 được phát hành** (AGPL-3.0 + giấy phép kép thương mại); mô hình cấp phép doanh nghiệp đang được lên kế hoạch |
| 2026.08 | **v0.2.0 được phát hành**: tiết lộ chọn lọc Merkle + tạo bằng chứng tiết lộ, giao diện UI đa ngôn ngữ (6 ngôn ngữ), quy tắc đặt tên ID chuỗi, chọn chế độ tạo, thời gian biểu mô-đun |
| 2026.08 | **v0.3.0 được phát hành**: hàng đợi gắn cột khởi đầu (hàng đợi ngoại tuyến + tự động thử lại + chống cướp chữ ký), bảng điều khiển hàng đợi gắn cột (6 ngôn ngữ) tích hợp vào writer |
| 2026.08 | **v0.4.0 được phát hành**: mô-đun nhận diện (export / import tệp `.rtkey` nhận diện, phục hồi nhận diện bằng mật khẩu, nhận diện gắn vào seal), ngữ nghĩa hợp nhất v3 (tiếp tục bằng cùng một khóa / hộp chứa tích hợp nhiều khóa), xác thực đa trình duyệt |
| 2026.08 | **v0.5.0 phát hành**: README 14 ngôn ngữ; tiếng Anh là nguồn duy nhất của bản dịch (docs/i18n.md) |
| 2026.08 | **v0.5.0 được phát hành**: hàng đợi gắn cột khởi đầu (hàng đợi ngoại tuyến + tự động thử lại + chống cướp chữ ký), bảng điều khiển hàng đợi gắn cột (6 ngôn ngữ) tích hợp vào writer |
| 2026.08 | **v0.6.0 được phát hành**: mô-đun nhận diện (.rtkey export/import, phục hồi nhận diện bằng mật khẩu, nhận diện gắn vào seal), ngữ nghĩa hợp nhất v3 (tiếp tục bằng cùng một khóa / hộp chứa tích hợp nhiều khóa), xác thực đa trình duyệt |

---

## Gói phát hành này (v0.4.0)

Thư viện này là một **gói xây dựng mở-source hoàn chỉnh**: nó thực hiện toàn bộ vòng lặp "viết → stamp → seal → verify → tiếp tục nhận diện → hợp nhất chuỗi". Gói phát hành này bao gồm:

- **Stamping thời gian thực**: chữ ký stamp Ed25519 được tạo tự động trong quá trình viết, ghi lại nhịp độ gõ phím, gián đoạn, lượng xóa và các đặc điểm hành vi khác;
- **Chuỗi không thể thay đổi**: mỗi stamp tham chiếu đến hash chuỗi của stamp trước đó; bất kỳ sự thay đổi sau này đều có thể phát hiện được một cách toán học;
- **Không tải lên nội dung**: văn bản vẫn ở địa phương; chuỗi chỉ ghi lại hash nội dung và đặc điểm hành vi;
- **Xác thực ngoại tuyến**: tệp chuỗi `.rt` có thể được xác thực hoàn toàn ngoại tuyến, không cần phụ thuộc vào máy chủ;
- **Dấu vân tay hành vi**: nhịp độ gõ phím / gián đoạn / đặc điểm xóa (chuỗi hành vi HMAC) cho phân tích tính đáng tin cậy;
- **Gắn cột chuỗi khởi đầu (tùy chọn, miễn phí cho cá nhân)**: sau khi dấu seal, hash gốc chuỗi được gửi đến chuỗi khởi đầu chính thức, tạo thành nguồn gốc có thể kiểm tra công khai;
- **Theo dõi phiên bản**: gói `.rt` ghi lại `appVersion` trong `meta.json` và phiên bản định dạng chuỗi trong `chain.json`; phiên bản được mang theo khi gắn cột vào chuỗi;
- **Tiết lộ chọn lọc Merkle**: mỗi seal gắn một root Merkle toàn văn bản, vì vậy bất kỳ đoạn văn bản nào cũng có thể được tiết lộ mà không tiết lộ toàn văn bản;
- **Tạo bằng chứng tiết lộ**: một cú nhấp để tạo bằng chứng cho bất kỳ đoạn văn bản nào trên trang xác thực ngoại tuyến, với visual hóa Merkle path và JSON có thể sao chép;
- **Giao diện UI đa ngôn ngữ (6 ngôn ngữ)**: writer / verifier / trang web trong 简体中文 · English · 日本語 · 한국어 · Deutsch · Français;
- **Quy tắc đặt tên ID chuỗi**: ID chuỗi 23 ký tự (`web-personal-…`) liên kết với khóa công khai + hash gốc — có thể xác thực, không thể ngược lại;
- **Chọn chế độ tạo**: chọn "Viết ẩn danh" hoặc "Nhập .rt để tiếp tục" trước khi viết; tiếp tục tự động mở rộng chuỗi gốc;
- **Thời gian biểu mô-đun**: thời gian biểu histogram mở rộng có thể mở rộng được tách ra thành mô-đun chia sẻ `core/rt-timeline.js`, làm cho nhịp độ viết dễ nhìn thấy ngay lập tức;

- **Hàng đợi gắn cột khởi đầu**: sau khi dấu seal, metadata chuỗi được hàng đợi địa phương trước và tự đồng bộ khi quay lại trực tuyến; chữ ký Ed25519 (`chainId|rootHash`) ngăn chặn cướp yêu cầu;
- **Bảng điều khiển hàng đợi gắn cột (6 ngôn ngữ)**: ⛓ chỉ thị trạng thái / đồng bộ thủ công một cú nhấp / chuyển đổi tự động đồng bộ trong writer — duy trì việc tải lên không nội dung;
- **Cập nhật thông báo riêng tư**: làm rõ rằng sau khi dấu seal, chỉ metadata chuỗi có thể đồng bộ lên chuỗi khởi đầu, và có thể tắt tự đồng bộ trong bảng điều khiển ⛓;
- **Mô-đun nhận diện**: khóa nhận diện được mã hóa PBKDF2-SHA256 (600K lần lặp lại) + AES-256-GCM; xuất / nhập tệp `.rtkey` khóa nhận diện; nhập tệp `.rt` mang theo nhận diện phục hồi người tạo thông qua mật khẩu; dấu seal gắn vào khóa mã hóa để cùng một khóa có thể tiếp tục chuỗi gốc;
- **Ngữ nghĩa hợp nhất v3**: tiếp tục tự động bằng cùng một khóa mở rộng chuỗi gốc (`mergeChainsVerified` ký và xác thực lại); chuỗi đa khóa có thể được tích hợp vào hộp chứa (`aggregateChains`), xác thực từng chuỗi con một;
- **Xác thực đa trình duyệt**: xác thực chữ ký tweetnacl thống nhất với WebCrypto làm fallback chỉ — kết quả nhất quán giữa các trình duyệt.

> Danh sách thay đổi đầy đủ: [CHANGELOG.md](CHANGELOG.md).

Tất cả các tính năng vẫn tương thích ngược: tệp chuỗi `.rt` được tạo bởi các phiên bản cũ phải vẫn có thể xác thực và theo dõi được trong các phiên bản sau này.

---

## Sự khác biệt của chúng tôi so với các giải pháp hiện có

| | RealTrace | Chữ ký điện tử thông thường | TSA timestamp | Đăng ký bản quyền |
|:--|:--|:--|:--|:--|
| Chứng minh "nội dung được viết bởi con người trong thời gian thực" | ✅ bằng chứng chuỗi cấp trình | ❌ chỉ chứng minh nhận diện người ký | ❌ chỉ chứng minh thời gian | ❌ đăng ký sau sự kiện |
| Ngăn chặn sự thay đổi sau này | ✅ hash chuỗi + chữ ký | ⚠️ chỉ đối tượng chữ ký | ⚠️ chỉ đối tượng hash | ❌ |
| Bao gồm toàn bộ quá trình sáng tạo | ✅ từ lần gõ phím đầu tiên đến dấu seal | ❌ | ❌ | ❌ |
| Xác thực ngoại tuyến | ✅ tệp `.rt` tự bao gồm | ⚠️ phụ thuộc vào PKI | ⚠️ phụ thuộc vào dịch vụ trực tuyến | ❌ phụ thuộc vào cơ quan đăng ký |
| Riêng tư (không tải lên nội dung) | ✅ không tải lên nội dung | — | — | ❌ nội dung phải được gửi |

---

## Các trường hợp sử dụng

- **Người sáng tạo gửi tác phẩm**: khi tác phẩm của bạn bị nghi ngờ với câu hỏi "AI đã viết điều này?", bằng chứng `.rt` về hiện diện của người sáng tạo giải thích quá trình sáng tạo — số từ, thời gian tiêu thụ, nhịp độ sáng tạo, có thể được xác thực bởi bất kỳ ai;
- **Bảo vệ bản quyền**: bằng chứng không còn là một yêu cầu miệng. Dấu vân tay hành vi và chuỗi chữ ký trên chuỗi cung cấp bằng chứng có thể kiểm tra về quá trình sáng tạo gốc;
- **Nhà xuất bản / cộng đồng nội dung**: xác thực xem một bài投稿 có thực sự được tạo ra trong thời gian thực bởi con người hay không, thay vì được dán vào sau này hoặc được tạo ra hàng loạt bởi máy móc;
- **Trường hợp học thuật**: bằng chứng quá trình gốc cho các bài báo, dự án và tài liệu kỹ thuật, để "Tôi đã viết điều này" có điều gì đó để dựa vào.

> Người sáng tạo không nên phải đối mặt với nghi ngờ một mình.

---

## Riêng tư & bảo mật

- **Không tải lên nội dung** theo mặc định: văn bản của bạn vẫn ở địa phương; chuỗi chỉ ghi lại hash nội dung và đặc điểm hành vi;
- Tệp chuỗi `.rt` hoàn toàn dưới quyền kiểm soát của bạn — lưu trữ chúng địa phương hoặc sao lưu bằng mật mã của riêng bạn;
- Gắn cột chính thức chỉ gửi hash gốc chuỗi và metadata chữ ký, không bao giờ là nội dung;
- Tất cả logic xác thực là mã nguồn mở và có thể kiểm tra;
- Nếu bạn phát hiện ra lỗ hổng bảo mật, gửi tin nhắn riêng cho người bảo trì; đừng công bố công khai trước khi có giải pháp.

---

---

## Đối tác · Mua tôi một cốc cà phê

Thích dự án này? Mua tôi một cốc cà phê ☕:

- [GitHub Sponsors](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)
- Trung Quốc: mã QR Alipay / WeChat Pay (chỉ là lời khuyên cá nhân, không phải là giấy phép thương mại)

| Alipay | WeChat Pay |
|:---:|:---:|
| <img src="site/sponsor/alipay.png" width="130" alt="Alipay QR"> | <img src="site/sponsor/wechat.png" width="130" alt="WeChat Pay QR"> |

> Đối tác chỉ là một biểu tượng hỗ trợ — **không phải là giấy phép thương mại**. Sử dụng cá nhân vẫn miễn phí; tích hợp doanh nghiệp / nền tảng yêu cầu giấy phép riêng biệt thông qua [`LICENSE.commercial`](LICENSE.commercial).

---

## Mở-source & thương mại

**Giấy phép kép AGPL-3.0 + thương mại** (phần mở-source được quản lý bởi văn bản đầy đủ của AGPL-3.0 trong [`LICENSE`](LICENSE)):

- **Cá nhân**: được phép sử dụng, sửa đổi và phân phối; chuỗi sáng tạo tự xây dựng / tự ký được hoàn toàn miễn phí và có thể tự xác thực ngoại tuyến; gắn cột vào chuỗi khởi đầu chính thức miễn phí cho cá nhân;
- **Cơ quan phi lợi nhuận / nhóm nhỏ** (trường học công cộng hoặc phi lợi nhuận, hiệp hội tác giả / ngành, v.v., được xác thực bởi chứng chỉ đăng ký phi lợi nhuận / chứng chỉ pháp nhân): miễn phí cho việc sử dụng nội bộ thành viên chỉ — không có dịch vụ trả phí, không hoạt động nền tảng công cộng, không bán lại hoặc phân phối lại sau khi tích hợp;
- **Doanh nghiệp / nền tảng**: hợp tác được cấp phép — xem [`LICENSE.commercial`](LICENSE.commercial).

> Miễn phí cho việc sử dụng cá nhân; tích hợp doanh nghiệp / nền tảng thương mại yêu cầu giấy phép riêng biệt. Các vấn đề và Pull Requests được chào đón — tương thích định dạng chuỗi, chính xác tính xác thực và vấn đề quyền riêng tư / bảo mật được ưu tiên.
