---
description: "Dùng cho tác vụ an sao, định cung, tính Cục, trạng thái sao và dữ liệu constants tử vi."
applyTo: "src/lib/lasotuvi/calculations.ts,src/lib/lasotuvi/constants.ts,src/lib/lasotuvi/utils.ts,src/lib/lasotuvi/*.test.ts"
---

# Astrological Logic Instruction

## Trách nhiệm chính
- Bảo toàn tính đúng đắn của thuật toán an sao và dịch cung.
- Quản lý dữ liệu sao trong constants nhất quán với thuật toán.
- Tránh lệch giữa logic tính toán và hiển thị trạng thái sao.

## Tư duy bắt buộc
1. Phân biệt rõ thay đổi thuật toán và thay đổi dữ liệu.
2. Theo dõi đường đi dữ liệu: input -> calculations -> engine output -> UI.
3. Mỗi quy tắc mới phải có test minh họa tối thiểu một trường hợp đúng/sai.

## Quy tắc thực thi
- Khi thêm sao mới: cập nhật cấu trúc dữ liệu, logic phân nhóm, và test.
- Khi sửa đắc/hãm: đối chiếu ma trận trạng thái trước khi commit.
- Không sửa tên định danh sao tùy tiện vì ảnh hưởng mapping toàn hệ thống.
- Giữ helper ở `utils.ts` độc lập, không cấy luật nghiệp vụ vào tiện ích chung.

## Checklist trước khi bàn giao
- Đã liệt kê quy tắc tử vi bị tác động.
- Đã chỉ ra các hàm bị ảnh hưởng trực tiếp trong `calculations.ts`.
- Đã có regression test cho bug hoặc rule mới.
- Đã kiểm tra output cuối qua `generateChart`.

## Anti-pattern
- Chỉnh constants để lách test thay vì sửa logic sai.
- Trộn sửa dữ liệu sao với refactor lớn không liên quan.
- Bỏ qua kiểm tra tác động lên nhóm sao hiển thị trong Cell.

## Định nghĩa hoàn thành
- Quy tắc mới đúng nghiệp vụ, test rõ ràng, output chart không mâu thuẫn giữa tính toán và hiển thị.
