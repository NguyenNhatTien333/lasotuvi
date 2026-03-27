'use client';

import React, { startTransition, useEffect, useReducer, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Chart } from '@/components/Chart';
import { InputForm } from '@/components/InputForm';
import { generateChart, verifyEngine } from '@/lib/lasotuvi/engine';
import type { Chart as ChartModel, ChartInput } from '@/lib/lasotuvi/types';

type State = {
  input: ChartInput;
  chart: ChartModel | null;
  error: string | null;
};

type Action =
  | { type: 'update-input'; payload: ChartInput }
  | { type: 'generate-success'; payload: ChartModel }
  | { type: 'generate-error'; payload: string };

const initialInput: ChartInput = {
  name: 'Mẫu tham chiếu',
  day: 24,
  month: 10,
  year: 1991,
  hour: 4,
  gender: 1,
  calendarType: 'duongLich',
  timezone: 7,
};

const reducer = (state: State, action: Action): State => {
  if (action.type === 'update-input') {
    return { ...state, input: action.payload, error: null };
  }
  if (action.type === 'generate-success') {
    return { ...state, chart: action.payload, error: null };
  }
  return { ...state, error: action.payload };
};

export default function Page() {
  const [state, dispatch] = useReducer(reducer, { input: initialInput, chart: null, error: null });
  const [pending, setPending] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEngineReady(verifyEngine());
    try {
      const chart = generateChart(initialInput);
      dispatch({ type: 'generate-success', payload: chart });
    } catch (error) {
      dispatch({ type: 'generate-error', payload: error instanceof Error ? error.message : 'Không thể tạo lá số mặc định.' });
    }
  }, []);

  const handleGenerate = () => {
    setPending(true);
    startTransition(() => {
      try {
        const chart = generateChart(state.input);
        dispatch({ type: 'generate-success', payload: chart });
      } catch (error) {
        dispatch({ type: 'generate-error', payload: error instanceof Error ? error.message : 'Không thể tạo lá số.' });
      } finally {
        setPending(false);
      }
    });
  };

  const handleExport = async () => {
    if (!chartRef.current || !state.chart) {
      return;
    }

    const dataUrl = await toPng(chartRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#f5f5f4',
    });

    const link = document.createElement('a');
    link.download = `la-so-tu-vi-${state.chart.birthInfo.year}-${state.chart.birthInfo.month}-${state.chart.birthInfo.day}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,rgba(245,245,244,1),rgba(231,229,228,1)_35%,rgba(214,211,209,1))] px-4 py-6 text-stone-900 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
        <InputForm
          value={state.input}
          pending={pending}
          onChange={(next) => dispatch({ type: 'update-input', payload: next })}
          onSubmit={handleGenerate}
        />

        <section className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="rounded-[28px] border border-stone-400/40 bg-white/60 p-4 backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-stone-500">Trạng thái</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-[0.05em]">Bản lá số chuyển đổi từ Python sang Next.js</h2>
                <p className="mt-1 text-sm text-stone-600">
                  Engine lịch pháp: {engineReady ? 'Đã vượt kiểm tra cơ bản' : 'Chưa xác minh hoàn chỉnh'}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-stone-400 bg-stone-900 px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleExport}
                disabled={!state.chart}
              >
                <Download size={16} />
                Lưu ảnh
              </button>
            </div>

            {state.error ? (
              <div className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.error}</div>
            ) : null}

            {state.chart ? (
              <div ref={chartRef}>
                <Chart chart={state.chart} />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-400/60 bg-white/50 px-6 py-16 text-center text-stone-500">
                Chưa có lá số để hiển thị.
              </div>
            )}
          </div>

          <aside className="rounded-[28px] border border-stone-400/40 bg-stone-950 p-5 text-stone-100 shadow-[0_24px_70px_rgba(28,25,23,0.25)] lg:sticky lg:top-6 lg:w-[320px]">
            <div className="text-[11px] uppercase tracking-[0.32em] text-amber-200/70">Phạm vi</div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-stone-300">
              <p>Ưu tiên giai đoạn này là engine tính toán và bố cục web chuẩn cho 12 cung cùng hệ sao.</p>
              <p>Cập nhật thời gian thực đang dùng nút bấm để kiểm soát tính toán.</p>
              <p>localStorage được để cho Phase 2. Đa ngôn ngữ và tính năng luận giải nằm ngoài phạm vi đợt chuyển đổi này.</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
