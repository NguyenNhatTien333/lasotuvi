import React from 'react';
import { DIA_CHI, THIEN_CAN } from '@/lib/lasotuvi/constants';
import type { Chart } from '@/lib/lasotuvi/types';

const gioiTinhText = (gender: number) => (gender === 1 ? 'Nam' : 'Nữ');

export function InfoPanel({ chart }: { chart: Chart }) {
  const { birthInfo, canChiInfo, cuc } = chart;
  const namCan = THIEN_CAN[canChiInfo.canNam]?.tenCan;
  const namChi = DIA_CHI[canChiInfo.chiNam]?.tenChi;
  const thangCan = THIEN_CAN[canChiInfo.canThang]?.tenCan;
  const thangChi = DIA_CHI[canChiInfo.chiThang]?.tenChi;
  const ngayCan = THIEN_CAN[canChiInfo.canNgay]?.tenCan;
  const ngayChi = DIA_CHI[canChiInfo.chiNgay]?.tenChi;
  const gioCan = THIEN_CAN[canChiInfo.canGio]?.tenCan;
  const gioChi = DIA_CHI[canChiInfo.chiGio]?.tenChi;

  return (
    <div className="col-span-2 row-span-2 flex h-full flex-col justify-between border border-stone-500/70 bg-[radial-gradient(circle_at_top,_rgba(255,251,235,0.95),_rgba(231,229,228,0.9))] p-4 text-stone-800">
      <div>
        <div className="text-[11px] uppercase tracking-[0.32em] text-stone-500">Thiên Bàn</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-[0.08em] text-stone-900">Lá Số Tử Vi</h2>
        <p className="mt-1 text-sm text-stone-600">Ưu tiên hiển thị chính xác 12 cung và toàn bộ sao trên giao diện web.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm leading-6">
        <div>
          <div className="text-stone-500">Họ tên</div>
          <div className="font-medium">{birthInfo.name || 'Chưa nhập'}</div>
        </div>
        <div>
          <div className="text-stone-500">Giới tính</div>
          <div className="font-medium">{gioiTinhText(birthInfo.gender)}</div>
        </div>
        <div>
          <div className="text-stone-500">Âm lịch</div>
          <div className="font-medium">
            {birthInfo.day}/{birthInfo.month}/{birthInfo.year}
            {birthInfo.isLeapMonth ? ' (Nhuận)' : ''}
          </div>
        </div>
        <div>
          <div className="text-stone-500">Giờ sinh</div>
          <div className="font-medium">{gioChi}</div>
        </div>
      </div>

      <div className="space-y-2 border-y border-stone-400/60 py-3 text-sm">
        <div><span className="text-stone-500">Năm:</span> {namCan} {namChi}</div>
        <div><span className="text-stone-500">Tháng:</span> {thangCan} {thangChi}</div>
        <div><span className="text-stone-500">Ngày:</span> {ngayCan} {ngayChi}</div>
        <div><span className="text-stone-500">Giờ:</span> {gioCan} {gioChi}</div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md border border-stone-400/60 bg-white/60 p-3">
          <div className="text-stone-500">Cục</div>
          <div className="text-lg font-semibold text-stone-900">{cuc}</div>
        </div>
        <div className="rounded-md border border-stone-400/60 bg-white/60 p-3">
          <div className="text-stone-500">Mệnh / Thân</div>
          <div className="text-lg font-semibold text-stone-900">{chart.menhPalace} / {chart.thanPalace}</div>
        </div>
      </div>
    </div>
  );
}
