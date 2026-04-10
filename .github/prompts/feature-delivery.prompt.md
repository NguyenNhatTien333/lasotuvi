---
description: "Mẫu lệnh triển khai tính năng mới theo luồng 6 Agent cho dự án lá số tử vi."
---

# Feature Delivery Prompt

## Mục tiêu
Triển khai tính năng mới có kiểm soát rủi ro nghiệp vụ và chất lượng.

## Prompt mẫu
Bạn hãy thực hiện tác vụ theo luồng Agent cho dự án lá số tử vi.

Thông tin đầu vào:
- Tính năng: {{feature_name}}
- Phạm vi nghiệp vụ: {{business_scope}}
- Phạm vi UI: {{ui_scope}}
- Điều kiện chấp nhận: {{acceptance_criteria}}

Yêu cầu thực hiện:
1. Engine Orchestrator: phân rã task theo module.
2. Calendar/Astrological Agent: xử lý logic nghiệp vụ liên quan.
3. UI/Display Agent: cập nhật hiển thị và trải nghiệm.
4. Testing Agent: thêm test cần thiết và chạy quality gate.
5. Trả về: danh sách file sửa, patch tóm tắt, kết quả test/lint/build, rủi ro còn lại.

Ràng buộc:
- Không phá API hiện tại nếu không được yêu cầu.
- Nếu thay đổi logic tử vi phải có regression test.
- Kết quả cuối phải nêu rõ phần đã verify.
