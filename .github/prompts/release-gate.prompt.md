---
description: "Mẫu lệnh kiểm tra điều kiện phát hành: test, lint, build và báo cáo rủi ro trước merge."
---

# Release Gate Prompt

## Prompt mẫu
Hãy thực hiện release gate cho thay đổi hiện tại.

Yêu cầu bắt buộc:
1. Chạy `npm run test`.
2. Chạy `npm run lint`.
3. Chạy `npm run build`.
4. Tổng hợp lỗi (nếu có) theo mức độ nghiêm trọng.
5. Kết luận trạng thái: PASS hoặc BLOCKED.

Đầu ra chuẩn:
- Kết quả từng lệnh.
- File/lỗi chính cần xử lý nếu BLOCKED.
- Danh sách rủi ro còn lại dù PASS.
- Khuyến nghị bước tiếp theo.

Lưu ý:
- Không kết luận PASS nếu thiếu bất kỳ bước nào trong 3 bước bắt buộc.
