# QUICK START - Dự án Lập Lá Số Tử Vi (Next.js)

Tài liệu này giúp bạn chạy dự án nhanh từ đầu, kiểm tra chất lượng mã nguồn, và dùng đúng luồng thao tác của ứng dụng.

## Tài liệu liên quan

- Tổng quan dự án: [README.md](README.md)
- Đặc tả UI data-rich truyền thống: [spec-2.md](spec-2.md)

## 1. Yêu cầu môi trường

- Hệ điều hành: macOS, Linux hoặc Windows.
- Node.js: khuyến nghị `>= 18.17` (phù hợp với Next.js 14).
- npm: đi kèm Node.js.

Kiểm tra phiên bản hiện tại:

```bash
node -v
npm -v
```

Nếu máy báo thiếu `npm` trên macOS:

```bash
brew install node
```

Sau đó mở terminal mới và kiểm tra lại `node -v`, `npm -v`.

## 2. Cài đặt dự án

Di chuyển vào thư mục dự án:

```bash
cd /Users/mac/Desktop/project/lasotuvi
```

Cài dependencies:

```bash
npm install
```

## 3. Chạy ứng dụng ở môi trường phát triển

```bash
npm run dev
```

Mở trình duyệt:

- `http://localhost:3000`

Khi chạy thành công, bạn sẽ thấy màn hình:

- Form nhập dữ liệu sinh (họ tên, ngày/tháng/năm, giờ sinh, giới tính, loại lịch, múi giờ).
- Nút `Tính lá số` để sinh lại lá số.
- Khu vực hiển thị 12 cung và hệ sao.
- Nút `Lưu ảnh` để xuất lá số thành PNG.

## 4. Luồng sử dụng nhanh

1. Nhập thông tin vào form đầu trang.
2. Nhấn `Tính lá số`.
3. Kiểm tra kết quả hiển thị ở khung lá số.
4. Nhấn `Lưu ảnh` nếu muốn tải ảnh PNG về máy.

Ghi chú:

- Bản hiện tại tính toán theo cơ chế bấm nút (không auto cập nhật theo từng ký tự).
- `localStorage` chưa được bật ở giai đoạn hiện tại.

## 5. Các lệnh quan trọng

### Chạy development

```bash
npm run dev
```

### Build production

```bash
npm run build
```

### Chạy bản production sau khi build

```bash
npm run start
```

### Kiểm tra lint

```bash
npm run lint
```

### Chạy toàn bộ test (Vitest)

```bash
npm run test
```

### Chạy test watch mode

```bash
npm run test:watch
```

## 6. Kiểm tra nhanh sau khi cài

Sau `npm install`, bạn có thể chạy chuỗi kiểm tra nhanh:

```bash
npm run test && npm run lint && npm run build
```

Nếu cả 3 lệnh đều pass, dự án đã ở trạng thái tốt để phát triển hoặc deploy.

## 7. Cấu trúc chính để bắt đầu đọc code

- `src/app/page.tsx`: trang chính, điều phối state nhập liệu và sinh lá số.
- `src/components/InputForm.tsx`: form nhập dữ liệu người dùng.
- `src/components/Chart.tsx`: render lá số và các cung/sao.
- `src/lib/lasotuvi/engine.ts`: engine tổng hợp tính toán lá số.
- `src/lib/lasotuvi/calendar.ts`: xử lý chuyển đổi lịch và lịch pháp.
- `src/lib/lasotuvi/calculations.ts`: hàm tính toán lõi.

## 8. Xử lý lỗi thường gặp

### Lỗi `npm: command not found` (mã thoát 127)

Nguyên nhân: máy chưa cài Node.js/npm hoặc PATH chưa nhận.

Khắc phục trên macOS:

```bash
brew install node
```

Mở terminal mới, kiểm tra lại:

```bash
node -v
npm -v
```

### Cổng `3000` đã bị chiếm

Chạy với cổng khác:

```bash
npm run dev -- -p 3001
```

Sau đó mở `http://localhost:3001`.

### `node_modules` lỗi hoặc xung đột lockfile

```bash
rm -rf node_modules package-lock.json
npm install
```

## 9. Gợi ý quy trình làm việc hằng ngày

1. `npm run dev` để phát triển tính năng.
2. `npm run test` trước khi commit.
3. `npm run lint` để giữ chuẩn code style.
4. `npm run build` để chắc chắn bản production không lỗi.

## 10. Quy trình đẩy code lên git

Kiểm tra thay đổi:

```bash
git status
```

Thêm file và tạo commit:

```bash
git add .
git commit -m "docs: cập nhật tài liệu README, quick-start và đặc tả UI"
```

Đẩy lên nhánh hiện tại:

```bash
git push origin main
```

---

Nếu bạn cần, có thể mở rộng tiếp tài liệu này theo từng vai trò:

- Hướng dẫn cho dev mới vào team.
- Checklist release/deploy.
- Quy ước viết test cho từng module `src/lib/lasotuvi`.
