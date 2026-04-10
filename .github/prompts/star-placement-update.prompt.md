---
description: "Mẫu lệnh cập nhật quy tắc an sao hoặc trạng thái sao trong calculations/constants."
---

# Star Placement Update Prompt

## Prompt mẫu
Hãy cập nhật quy tắc an sao cho hệ thống lá số tử vi.

Đầu vào:
- Quy tắc cần đổi: {{rule_change}}
- Sao/cụm sao bị tác động: {{stars_affected}}
- Điều kiện nghiệp vụ: {{business_rules}}
- Ví dụ đầu vào mong muốn: {{example_cases}}

Yêu cầu:
1. Xác định thay đổi là thuật toán hay dữ liệu constants.
2. Cập nhật đúng module: `calculations.ts`, `constants.ts`, `utils.ts` nếu cần.
3. Thêm test minh họa trước/sau thay đổi.
4. Xác minh output `generateChart` không mâu thuẫn với UI.

Đầu ra:
- Mô tả quy tắc mới.
- Danh sách hàm thay đổi.
- Test coverage tăng thêm.
- Rủi ro tương thích ngược.
