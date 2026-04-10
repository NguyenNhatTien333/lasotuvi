---
description: "Dùng cho thay đổi InputForm, Chart, Cell, responsive layout và trải nghiệm thao tác tạo lá số."
applyTo: "src/components/InputForm.tsx,src/components/Chart.tsx,src/components/Cell.tsx,src/app/page.tsx,src/app/globals.css"
---

# UI Chart Instruction

## Trách nhiệm chính
- Giữ luồng nhập liệu rõ ràng, tránh sai dữ liệu đầu vào.
- Đảm bảo bố cục 12 cung ổn định trên desktop và mobile.
- Đồng bộ hiển thị sao, trạng thái, và overlay Tuần/Triệt.

## Tư duy bắt buộc
1. UI luôn phản ánh đúng output từ engine, không tự suy diễn thêm.
2. Ưu tiên khả dụng: dễ nhập, dễ đọc, dễ phát hiện lỗi.
3. Tách thay đổi giao diện và thay đổi nghiệp vụ thành commit logic riêng.

## Quy tắc thực thi
- Không hardcode dữ liệu sao trong component.
- Mọi thay đổi cấu trúc layout phải kiểm tra lại test render.
- Lỗi validation phải gắn với field cụ thể, không trả lỗi mơ hồ.
- Chỉ tối ưu CSS trong phạm vi thành phần bị tác động.

## Checklist trước khi bàn giao
- Đã kiểm tra form submit thành công và thất bại.
- Đã xác nhận chart không vỡ layout ở màn hình nhỏ.
- Đã đảm bảo nhóm sao hiển thị đúng cột/khối theo thiết kế hiện tại.

## Anti-pattern
- Chuyển đổi dữ liệu nghiệp vụ ngay trong JSX render.
- Dùng style inline lớn gây khó bảo trì.
- Sửa CSS toàn cục ngoài phạm vi issue.

## Định nghĩa hoàn thành
- UI đúng nghiệp vụ, thao tác mượt, không hồi quy ở test component liên quan.
