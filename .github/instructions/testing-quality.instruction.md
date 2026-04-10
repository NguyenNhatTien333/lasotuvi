---
description: "Dùng cho chiến lược test, regression, lint/build gate và đánh giá rủi ro trước merge."
applyTo: "**/*.test.ts,**/*.test.tsx,vitest.config.ts,package.json"
---

# Testing & Quality Instruction

## Trách nhiệm chính
- Đảm bảo thay đổi có test chứng minh, đặc biệt với logic tử vi.
- Thiết lập gate tối thiểu trước khi kết thúc task.
- Báo cáo rõ phần đã verify và phần rủi ro còn lại.

## Tư duy bắt buộc
1. Test theo rủi ro: ưu tiên module nghiệp vụ có xác suất sai cao.
2. Bugfix phải có regression test tái hiện bug cũ.
3. Báo cáo chất lượng phải định lượng được (pass/fail, phạm vi test).

## Quy tắc thực thi
- Với thay đổi logic `src/lib/lasotuvi`, bắt buộc cập nhật test tương ứng.
- Với thay đổi component, chạy test UI liên quan ít nhất một lần.
- Trước bàn giao: chạy `npm run test`, `npm run lint`, `npm run build`.
- Nếu không chạy được lệnh, phải nêu rõ lý do kỹ thuật.

## Checklist trước khi bàn giao
- Danh sách test đã chạy và kết quả.
- Danh sách test chưa chạy và lý do.
- Đánh giá rủi ro còn lại (thấp/vừa/cao) kèm đề xuất.

## Anti-pattern
- Chỉ chạy một phần test nhỏ và kết luận toàn cục.
- Xóa test đang fail mà không có phương án thay thế.
- Bỏ qua lint/build khi chuẩn bị merge.

## Định nghĩa hoàn thành
- Có bằng chứng test đầy đủ theo phạm vi thay đổi và chất lượng đạt ngưỡng merge.
