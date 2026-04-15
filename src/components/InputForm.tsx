import React from 'react';
import type { ChartInput, Gender } from '@/lib/lasotuvi/types';

const HOURS = [
  { value: 1, label: 'Tý' },
  { value: 2, label: 'Sửu' },
  { value: 3, label: 'Dần' },
  { value: 4, label: 'Mão' },
  { value: 5, label: 'Thìn' },
  { value: 6, label: 'Tỵ' },
  { value: 7, label: 'Ngọ' },
  { value: 8, label: 'Mùi' },
  { value: 9, label: 'Thân' },
  { value: 10, label: 'Dậu' },
  { value: 11, label: 'Tuất' },
  { value: 12, label: 'Hợi' },
];

type FormProps = {
  value: ChartInput;
  pending?: boolean;
  onChange: (next: ChartInput) => void;
  onSubmit: () => void;
};

export function InputForm({ value, pending = false, onChange, onSubmit }: FormProps) {
  return (
    <section className="rounded-[28px] border border-stone-500/30 bg-[linear-gradient(160deg,rgba(28,25,23,0.96),rgba(68,64,60,0.92))] p-6 text-stone-50 shadow-[0_20px_60px_rgba(28,25,23,0.25)]">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.32em] text-amber-200/70">Biểu Mẫu</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-[0.06em] text-amber-50">Lập Lá Số Tử Vi</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-300">
          Giai đoạn đầu dùng nút bấm để tính lá số. Ưu tiên tiếng Việt 100% và hiển thị chính xác 12 cung cùng toàn bộ sao trên web.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-sm text-stone-300">Họ tên</span>
          <input
            className="w-full rounded-xl border border-stone-500/60 bg-stone-950/30 px-4 py-3 text-stone-50 outline-none transition focus:border-amber-300"
            value={value.name ?? ''}
            onChange={(event) => onChange({ ...value, name: event.target.value })}
            placeholder="Ví dụ: Nguyễn Văn A"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-stone-300">Ngày</span>
          <input
            type="number"
            min={1}
            max={31}
            className="w-full rounded-xl border border-stone-500/60 bg-stone-950/30 px-4 py-3 text-stone-50 outline-none transition focus:border-amber-300"
            value={value.day}
            onChange={(event) => onChange({ ...value, day: Number(event.target.value) })}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-stone-300">Tháng</span>
          <input
            type="number"
            min={1}
            max={12}
            className="w-full rounded-xl border border-stone-500/60 bg-stone-950/30 px-4 py-3 text-stone-50 outline-none transition focus:border-amber-300"
            value={value.month}
            onChange={(event) => onChange({ ...value, month: Number(event.target.value) })}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-stone-300">Năm</span>
          <input
            type="number"
            min={1000}
            max={3000}
            className="w-full rounded-xl border border-stone-500/60 bg-stone-950/30 px-4 py-3 text-stone-50 outline-none transition focus:border-amber-300"
            value={value.year}
            onChange={(event) => onChange({ ...value, year: Number(event.target.value) })}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-stone-300">Giờ sinh</span>
          <select
            className="w-full rounded-xl border border-stone-500/60 bg-stone-950/30 px-4 py-3 text-stone-50 outline-none transition focus:border-amber-300"
            value={value.hour}
            onChange={(event) => onChange({ ...value, hour: Number(event.target.value) })}
          >
            {HOURS.map((hour) => (
              <option key={hour.value} value={hour.value}>
                {hour.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-stone-300">Giới tính</span>
          <select
            className="w-full rounded-xl border border-stone-500/60 bg-stone-950/30 px-4 py-3 text-stone-50 outline-none transition focus:border-amber-300"
            value={value.gender}
            onChange={(event) => onChange({ ...value, gender: Number(event.target.value) as Gender })}
          >
            <option value={1}>Nam</option>
            <option value={-1}>Nữ</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-stone-300">Loại lịch</span>
          <select
            className="w-full rounded-xl border border-stone-500/60 bg-stone-950/30 px-4 py-3 text-stone-50 outline-none transition focus:border-amber-300"
            value={value.calendarType}
            onChange={(event) => onChange({ ...value, calendarType: event.target.value as ChartInput['calendarType'] })}
          >
            <option value="duongLich">Dương lịch</option>
            <option value="amLich">Âm lịch</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-stone-300">Năm xem</span>
          <input
            type="number"
            min={1000}
            max={3000}
            required
            className="w-full rounded-xl border border-stone-500/60 bg-stone-950/30 px-4 py-3 text-stone-50 outline-none transition focus:border-amber-300"
            value={value.viewYear}
            onChange={(event) => onChange({ ...value, viewYear: Number(event.target.value) })}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-900 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onSubmit}
          disabled={pending}
        >
          {pending ? 'Đang tính...' : 'Tính lá số'}
        </button>
        <div className="text-sm text-stone-300">Giai đoạn 1 chỉ tính khi bấm nút, chưa dùng localStorage.</div>
      </div>
    </section>
  );
}
