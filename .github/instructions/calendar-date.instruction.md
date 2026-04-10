---
description: "Dùng cho các tác vụ liên quan lịch âm dương, tháng nhuận, Can Chi, và múi giờ giờ sinh."
applyTo: "src/lib/lasotuvi/calendar.ts,src/lib/lasotuvi/calculations.ts,src/lib/lasotuvi/*.test.ts"
---

# Calendar & Date Instruction

## Trách nhiệm chính
- Đảm bảo chuyển đổi solar/lunar chính xác theo mốc xác minh.
- Quản lý các edge-case: tháng nhuận, biên ngày, chênh lệch múi giờ.
- Bảo toàn tính nhất quán Can Chi năm/tháng/ngày/giờ.

## Tư duy bắt buộc
1. Ưu tiên tái hiện bằng case cụ thể trước khi sửa logic.
2. Kiểm tra hướng chuyển đổi hai chiều khi có thể: solar->lunar và lunar->solar.
3. Mọi thay đổi phải đi kèm regression test tương ứng.

## Quy tắc thực thi
- Không hardcode theo một năm cụ thể trừ khi là test fixture.
- Khi sửa công thức lịch, phải ghi rõ giới hạn áp dụng nếu có.
- Nếu động đến timezone, mô tả rõ giả định đầu vào (giờ địa phương hay UTC).
- Ưu tiên giữ hàm thuần (pure function) để dễ test.

## Checklist trước khi bàn giao
- Đã có ít nhất 1 test biên cho bug vừa sửa.
- Đã chạy test ở `calendar.test.ts` và test liên quan ở `calculations.test.ts`.
- Đã nêu ảnh hưởng xuống logic an sao/định cung nếu có.

## Anti-pattern
- Chỉ sửa output mong muốn mà không chứng minh công thức đúng.
- Bỏ qua case tháng nhuận khi thay đổi tháng âm.
- Chỉnh test theo output mới mà không giải thích nghiệp vụ.

## Định nghĩa hoàn thành
- Kết quả lịch ổn định trên bộ case chuẩn, không làm lệch các test tử vi phụ thuộc.
