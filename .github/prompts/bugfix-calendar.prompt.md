---
description: "Mẫu lệnh sửa lỗi liên quan lịch âm dương, tháng nhuận, múi giờ và Can Chi."
---

# Calendar Bugfix Prompt

## Prompt mẫu
Hãy xử lý bug lịch cho dự án lá số tử vi.

Đầu vào:
- Mô tả bug: {{bug_description}}
- Case tái hiện: {{repro_steps}}
- Kỳ vọng đúng: {{expected_behavior}}
- Dữ liệu ngày giờ mẫu: {{sample_inputs}}

Yêu cầu:
1. Tái hiện bug và xác định root cause trong `calendar.ts`/`calculations.ts`.
2. Đề xuất sửa tối thiểu, không mở rộng phạm vi ngoài bug.
3. Thêm regression test cho case lỗi.
4. Chạy test liên quan và báo cáo kết quả.
5. Đánh giá tác động tới an sao/định cung nếu có.

Đầu ra bắt buộc:
- Nguyên nhân gốc.
- File đã sửa.
- Test mới/thay đổi.
- Mức rủi ro sau sửa.
