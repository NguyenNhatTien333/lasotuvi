---
description: "Dùng khi cần tối ưu InfoPanel, nhóm thông tin diễn giải, màu ngũ hành và độ dễ đọc của lá số."
applyTo: "src/components/InfoPanel.tsx,src/components/Cell.tsx,src/app/globals.css"
---

# Display & Interpretation Instruction

## Trách nhiệm chính
- Chuẩn hóa cách trình bày thông tin trung tâm và thông tin trong từng cung.
- Giữ nhất quán quy ước màu ngũ hành trong toàn giao diện.
- Tăng khả năng đọc hiểu mà không làm sai nội dung tính toán.

## Tư duy bắt buộc
1. Trình bày rõ nghĩa trước, thẩm mỹ sau.
2. Mọi thay đổi label/nhóm dữ liệu phải kiểm tra nguồn từ engine output.
3. Không làm mất ngữ cảnh tử vi khi rút gọn nội dung hiển thị.

## Quy tắc thực thi
- Màu ngũ hành phải dùng mapping tập trung, không phát sinh màu tùy ý.
- Tránh thay đổi thứ tự thông tin nếu chưa có lý do UX rõ ràng.
- Nếu thêm trường hiển thị mới, phải có fallback khi dữ liệu thiếu.

## Checklist trước khi bàn giao
- Đã kiểm tra InfoPanel hiển thị đủ trường chính.
- Đã đối chiếu màu sao theo ngũ hành không lệch với mapping.
- Đã rà soát khả năng đọc trên nền hiện tại (contrast cơ bản).

## Anti-pattern
- Gộp nhiều lớp diễn giải dài vào một block khó đọc.
- Dùng định dạng chữ không nhất quán giữa các cung.
- Tự sinh diễn giải nghiệp vụ không có nguồn dữ liệu.

## Định nghĩa hoàn thành
- Thông tin rõ ràng, nhất quán, giữ đúng ý nghĩa nghiệp vụ và hỗ trợ đọc nhanh.
