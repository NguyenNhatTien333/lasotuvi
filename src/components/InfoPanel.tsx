import React from 'react';
import { DIA_CHI, NGU_HANH_MAP, THIEN_CAN } from '@/lib/lasotuvi/constants';
import type { Chart } from '@/lib/lasotuvi/types';
import { getColorByElement } from './Cell';

const gioiTinhText = (gender: number) => (gender === 1 ? 'Nam' : 'Nữ');
const amDuongText  = (gender: number) => (gender === 1 ? 'Dương Nam' : 'Âm Nữ');

const CUC_NAMES: Record<number, string> = {
  2: 'Thủy nhị cục',
  3: 'Mộc tam cục',
  4: 'Kim tứ cục',
  5: 'Thổ ngũ cục',
  6: 'Hỏa lục cục',
};

const CUC_ELEMENT: Record<number, 'T' | 'M' | 'K' | 'O' | 'H'> = {
  2: 'T', 3: 'M', 4: 'K', 5: 'O', 6: 'H',
};

export function InfoPanel({ chart }: { chart: Chart }) {
  const { birthInfo, canChiInfo, cuc, palaces, menhPalace } = chart;

  const namCan   = THIEN_CAN[canChiInfo.canNam]?.tenCan   ?? '';
  const namChi   = DIA_CHI[canChiInfo.chiNam]?.tenChi     ?? '';
  const thangCan = THIEN_CAN[canChiInfo.canThang]?.tenCan ?? '';
  const thangChi = DIA_CHI[canChiInfo.chiThang]?.tenChi   ?? '';
  const ngayCan  = THIEN_CAN[canChiInfo.canNgay]?.tenCan  ?? '';
  const ngayChi  = DIA_CHI[canChiInfo.chiNgay]?.tenChi    ?? '';
  const gioCan   = THIEN_CAN[canChiInfo.canGio]?.tenCan   ?? '';
  const gioChi   = DIA_CHI[canChiInfo.chiGio]?.tenChi     ?? '';

  // Compute Chủ Mệnh from Cung Mệnh's chính tinh
  const menhPalaceObj = palaces.find((p) => p.cungID === menhPalace);
  const chuMenh = menhPalaceObj?.cungSao.find((s) => s.saoLoai === 1)?.saoTen ?? 'N/A';

  // Compute Chủ Thân from Cung Thân
  const thanPalaceObj = palaces.find((p) => p.isThan);
  const chuThan = thanPalaceObj?.cungSao.find((s) => s.saoLoai === 1)?.saoTen ?? 'N/A';

  // Mệnh element (from cung Mệnh's nguHanh)
  const menhElement = menhPalaceObj?.cungNguHanh ?? 'O';
  const menhElementColor = getColorByElement(menhElement);
  const menhElementName  = NGU_HANH_MAP[menhElement]?.name ?? '';

  // Note flags
  const cucElement = CUC_ELEMENT[cuc];
  const isThangMenhDongCung = menhPalace === thanPalaceObj?.cungID;

  // Solar date display
  const solarDate = birthInfo.birthDaySolar
    ? `${birthInfo.birthDaySolar.day}/${birthInfo.birthDaySolar.month}/${birthInfo.birthDaySolar.year}`
    : null;
  const lunarDate = `${birthInfo.day}/${birthInfo.month}/${birthInfo.year}${birthInfo.isLeapMonth ? ' (Nhuận)' : ''}`;

  const rowClass   = 'flex gap-2 items-baseline text-[11px] md:text-xs';
  const labelClass = 'text-stone-500 w-[72px] shrink-0';
  const valueClass = 'font-medium text-stone-800';

  return (
    <div
      className="col-span-2 row-span-2 flex h-full flex-col overflow-hidden"
      style={{ border: '1px solid #C4B49A', backgroundColor: '#FFFEF5' }}
    >
      {/* ── TITLE ── */}
      <div
        className="px-3 py-2 text-center"
        style={{ borderBottom: '1px solid #C4B49A', backgroundColor: '#FFF8E0' }}
      >
        <div className="font-serif text-xl font-bold tracking-[0.15em] text-stone-900">
          LÁ SỐ TỬ VI
        </div>
        <div className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-stone-500">
          Thiên Bàn
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-auto p-3 text-[11px]">
        {/* ── IDENTITY TABLE ── */}
        <div className="space-y-0.5">
          <div className={rowClass}>
            <span className={labelClass}>Họ tên:</span>
            <span className={valueClass}>{birthInfo.name || '—'}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Giới tính:</span>
            <span className={valueClass}>{gioiTinhText(birthInfo.gender)}</span>
          </div>
          {solarDate && (
            <div className={rowClass}>
              <span className={labelClass}>Dương lịch:</span>
              <span className={valueClass}>{solarDate}</span>
            </div>
          )}
          <div className={rowClass}>
            <span className={labelClass}>Âm lịch:</span>
            <span className={valueClass}>{lunarDate}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Giờ sinh:</span>
            <span className={valueClass}>{gioChi}</span>
          </div>
        </div>

        {/* ── CAN CHI TABLE ── */}
        <div
          className="space-y-0.5"
          style={{ borderTop: '1px solid #E5D9C6', paddingTop: '6px' }}
        >
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
            <div className={rowClass}>
              <span className={labelClass}>Năm:</span>
              <span className={valueClass}>{namCan} {namChi}</span>
            </div>
            <div className={rowClass}>
              <span className={labelClass}>Tháng:</span>
              <span className={valueClass}>{thangCan} {thangChi}</span>
            </div>
            <div className={rowClass}>
              <span className={labelClass}>Ngày:</span>
              <span className={valueClass}>{ngayCan} {ngayChi}</span>
            </div>
            <div className={rowClass}>
              <span className={labelClass}>Giờ:</span>
              <span className={valueClass}>{gioCan} {gioChi}</span>
            </div>
          </div>
        </div>

        {/* ── MỆNH LÝ ── */}
        <div
          className="space-y-0.5"
          style={{ borderTop: '1px solid #E5D9C6', paddingTop: '6px' }}
        >
          <div className={rowClass}>
            <span className={labelClass}>Âm Dương:</span>
            <span className={valueClass}>{amDuongText(birthInfo.gender)}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Mệnh:</span>
            <span className="font-bold" style={{ color: menhElementColor }}>
              {menhElementName}
            </span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Cục:</span>
            <span className="font-bold" style={{ color: getColorByElement(cucElement) }}>
              {CUC_NAMES[cuc] ?? cuc}
            </span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Chủ Mệnh:</span>
            <span className={valueClass}>{chuMenh}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Chủ Thân:</span>
            <span className={valueClass}>{chuThan}</span>
          </div>
        </div>

        {/* ── CHÚ THÍCH ── */}
        <div
          className="space-y-0.5 text-[10px] italic text-stone-600"
          style={{ borderTop: '1px solid #E5D9C6', paddingTop: '6px' }}
        >
          {isThangMenhDongCung && <div>✦ Thân Mệnh đồng cung</div>}
        </div>
      </div>
    </div>
  );
}
