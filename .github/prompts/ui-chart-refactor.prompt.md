---
description: "Mẫu lệnh cải tiến giao diện InputForm/Chart/Cell, đảm bảo responsive và không sai dữ liệu tử vi."
---

# UI Chart Refactor Prompt

## Prompt mẫu
Hãy refactor UI cho trang lập lá số tử vi theo yêu cầu sau.

Đầu vào:
- Mục tiêu UX: {{ux_goal}}
- Thành phần cần sửa: {{components}}
- Ràng buộc thiết kế: {{design_constraints}}
- Thiết bị ưu tiên: {{target_devices}}

Yêu cầu:
1. Giữ nguyên logic nghiệp vụ, chỉ thay đổi phần hiển thị/trải nghiệm.
2. Cập nhật `InputForm`, `Chart`, `Cell` theo phạm vi.
3. Đảm bảo hiển thị ổn trên mobile và desktop.
4. Cập nhật test component bị ảnh hưởng.

Đầu ra:
- Tóm tắt trước/sau về UX.
- File đã sửa.
- Kết quả test liên quan.
- Điểm còn hạn chế nếu có.
