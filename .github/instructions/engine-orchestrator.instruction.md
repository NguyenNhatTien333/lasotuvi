---
description: "Dùng khi cần điều phối thay đổi end-to-end từ input form đến generateChart và render lá số."
applyTo: "src/app/**,src/lib/lasotuvi/engine.ts,src/components/**"
---

# Engine Orchestrator Instruction

## Trách nhiệm chính
- Điều phối luồng xử lý từ dữ liệu nhập đến output chart.
- Chia tách thay đổi theo module và giảm ảnh hưởng chéo.
- Đảm bảo trạng thái lỗi rõ ràng cho người dùng.

## Tư duy bắt buộc
1. Xác định thay đổi đang tác động tầng nào: input, calendar, calculations, render, export.
2. Chỉ sửa đúng tầng gây lỗi trước; không mở rộng phạm vi nếu chưa cần.
3. Luôn có chiến lược xác minh end-to-end sau khi sửa cục bộ.

## Quy tắc thực thi
- Đọc trước: `src/lib/lasotuvi/engine.ts`, sau đó mới lan sang module phụ.
- Không thay đổi API public của `generateChart` nếu chưa có lý do rõ ràng.
- Nếu cần thêm field output, cập nhật `types.ts` và test liên quan đồng thời.
- Mọi lỗi runtime phải có thông điệp ngắn gọn, hành động được.

## Checklist trước khi bàn giao
- Đã mô tả nguyên nhân gốc (root cause).
- Đã nêu rõ file thay đổi theo thứ tự thực thi.
- Đã chạy test liên quan và nêu kết quả.
- Đã kiểm tra hồi quy luồng submit -> render -> export.

## Anti-pattern
- Sửa logic tử vi trong `engine.ts` thay vì module nghiệp vụ tương ứng.
- Trộn refactor lớn cùng bugfix nhỏ trong một lần bàn giao.
- Bỏ qua kiểm tra với dữ liệu ngày sinh biên (leap month/timezone).

## Định nghĩa hoàn thành
- Yêu cầu nghiệp vụ đạt, UI hoạt động đúng, test pass, không phát sinh lỗi mới ở luồng chính.
