# Hệ Thống Agent cho Dự Án Lá Số Tử Vi

## Mục tiêu
Thiết lập bộ Agent chuyên trách để tăng tốc phát triển, giảm lỗi nghiệp vụ tử vi, và chuẩn hóa quy trình từ yêu cầu đến release.

## Danh sách Agent (6 Agent)

### 1) Engine Orchestrator Agent
- Vai trò: Điều phối luồng thực thi end-to-end khi tạo lá số.
- Phạm vi code: `src/lib/lasotuvi/engine.ts`, `src/app/page.tsx`.
- Đầu vào: yêu cầu tính lá số, thay đổi logic tổng hợp, lỗi runtime khi submit form.
- Đầu ra: kế hoạch sửa đổi xuyên module, cập nhật orchestration, checklist verify.

### 2) Calendar & Date Agent
- Vai trò: Chịu trách nhiệm lịch âm dương, múi giờ, tháng nhuận, Can Chi ngày tháng năm.
- Phạm vi code: `src/lib/lasotuvi/calendar.ts`, phần liên quan trong `src/lib/lasotuvi/calculations.ts`.
- Đầu vào: bug ngày giờ sinh, lệch lịch âm, sai Can Chi.
- Đầu ra: patch logic lịch, test edge-case theo mốc xác minh.

### 3) Astrological Logic Agent
- Vai trò: Quản lý thuật toán an sao, định cung, Cục, trạng thái sao.
- Phạm vi code: `src/lib/lasotuvi/calculations.ts`, `src/lib/lasotuvi/constants.ts`, `src/lib/lasotuvi/utils.ts`.
- Đầu vào: thay đổi quy tắc an sao, bổ sung sao mới, sửa trạng thái đắc/hãm.
- Đầu ra: cập nhật thuật toán + dữ liệu sao đồng bộ, unit test nghiệp vụ.

### 4) UI Chart Agent
- Vai trò: Xây dựng và tối ưu giao diện nhập liệu + biểu đồ lá số 12 cung.
- Phạm vi code: `src/components/InputForm.tsx`, `src/components/Chart.tsx`, `src/components/Cell.tsx`, `src/app/globals.css`.
- Đầu vào: yêu cầu UI/UX mới, responsive, khả dụng trên mobile.
- Đầu ra: thay đổi component/UI flow, test hiển thị và tương tác.

### 5) Display & Interpretation Agent
- Vai trò: Chuẩn hóa trình bày thông tin trung tâm và cách hiển thị nhóm sao.
- Phạm vi code: `src/components/InfoPanel.tsx`, `src/components/Cell.tsx`, quy ước màu trong CSS.
- Đầu vào: yêu cầu đổi cách đọc thông tin, nhóm sao, màu theo ngũ hành.
- Đầu ra: cách hiển thị rõ ràng hơn, không phá vỡ cấu trúc lá số.

### 6) Testing & Quality Agent
- Vai trò: Đảm bảo chất lượng bằng test, lint, build gate trước khi hoàn tất.
- Phạm vi code: toàn bộ `*.test.ts`, `*.test.tsx`, `vitest.config.ts`, script trong `package.json`.
- Đầu vào: mọi thay đổi code đã hoàn thành.
- Đầu ra: báo cáo pass/fail, rủi ro còn lại, đề xuất bổ sung test.

## Luồng tương tác giữa Agent

### Luồng Feature Delivery
1. Product/Spec input -> Engine Orchestrator Agent phân rã tác vụ.
2. Nếu liên quan ngày giờ -> Calendar & Date Agent xử lý trước.
3. Nếu liên quan an sao/cục/cung -> Astrological Logic Agent cập nhật quy tắc.
4. UI Chart Agent cập nhật form và biểu đồ theo output nghiệp vụ.
5. Display & Interpretation Agent tinh chỉnh cách trình bày thông tin.
6. Testing & Quality Agent chạy gate: test -> lint -> build.
7. Engine Orchestrator Agent tổng hợp kết quả, chốt release note kỹ thuật.

### Luồng Bugfix
1. Engine Orchestrator Agent tái hiện lỗi và xác định tầng lỗi.
2. Chuyển đúng owner:
   - Lỗi lịch/múi giờ -> Calendar & Date Agent.
   - Lỗi sao/cung -> Astrological Logic Agent.
   - Lỗi hiển thị -> UI Chart hoặc Display Agent.
3. Testing & Quality Agent bổ sung regression test.
4. Engine Orchestrator Agent xác nhận không hồi quy trước merge.

## Quy tắc handoff
- Mỗi Agent khi bàn giao phải có: phạm vi đã sửa, giả định nghiệp vụ, test đã chạy, rủi ro còn lại.
- Không merge khi chưa qua gate tối thiểu: `npm run test`, `npm run lint`, `npm run build`.
- Nếu thay đổi nghiệp vụ tử vi, bắt buộc cập nhật test trong `src/lib/lasotuvi/*.test.ts`.

## Roadmap Phase 2 (định hướng)
- Local persistence: lưu/khôi phục cấu hình lá số bằng localStorage.
- i18n readiness: tách text UI ra key để chuẩn bị đa ngôn ngữ.
- CI pipeline: tự động lint/test/build trong GitHub Actions.
- Baseline chart snapshots: thêm ảnh snapshot để bắt lỗi hiển thị.
