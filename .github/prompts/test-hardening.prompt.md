---
description: "Mẫu lệnh tăng độ phủ test và bổ sung regression suite cho các thay đổi rủi ro cao."
---

# Test Hardening Prompt

## Prompt mẫu
Hãy tăng độ vững test cho thay đổi gần đây trong dự án lá số tử vi.

Đầu vào:
- Phạm vi thay đổi: {{change_scope}}
- Module rủi ro cao: {{high_risk_modules}}
- Bug/edge-case đã biết: {{known_edge_cases}}

Yêu cầu:
1. Đánh giá khoảng trống test hiện tại theo phạm vi thay đổi.
2. Viết thêm unit/integration test cần thiết.
3. Ưu tiên regression test cho bug đã từng xảy ra.
4. Chạy test liên quan và tổng hợp kết quả.

Đầu ra:
- Danh sách test mới.
- Độ phủ logic được cải thiện (mô tả định tính theo module).
- Rủi ro chưa cover.
