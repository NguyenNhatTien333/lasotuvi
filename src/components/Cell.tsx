import React from 'react';
import type { Palace, Star, Element } from '@/lib/lasotuvi/types';

// Maps element code → hex color per spec-2.md (Kim/Thổ) + Tailwind palette (Mộc/Thủy/Hỏa)
export const getColorByElement = (element: Element): string => {
  switch (element) {
    case 'K': return '#D4AF37'; // Kim — vàng đồng
    case 'M': return '#10B981'; // Mộc — xanh lá (Tailwind emerald)
    case 'T': return '#3B82F6'; // Thủy — xanh dương (Tailwind blue)
    case 'H': return '#EF4444'; // Hỏa — đỏ (Tailwind red)
    case 'O': return '#A52A2A'; // Thổ — nâu đậm (spec)
  }
};

const statusWeight = (status: Star['saoDacTinh']): React.CSSProperties => {
  switch (status) {
    case 'V': return { fontWeight: 700 };
    case 'M': return { fontWeight: 600 };
    case 'Đ': return { fontWeight: 500 };
    case 'B': return { fontWeight: 400 };
    case 'H': return { fontWeight: 300, opacity: 0.7 };
    default:  return { fontWeight: 400 };
  }
};

const classifyStars = (stars: Star[]) => {
  const primary      = stars.filter((s) => s.saoLoai === 1);
  const lifecycle    = stars.filter((s) => s.vongTrangSinh === 1);
  const auspicious   = stars.filter((s) => s.saoLoai > 1 && s.saoLoai < 10 && s.vongTrangSinh !== 1);
  const inauspicious = stars.filter((s) => s.saoLoai >= 10 && s.vongTrangSinh !== 1);
  return { primary, lifecycle, auspicious, inauspicious };
};

const StarItem = ({ star, size = 'sm' }: { star: Star; size?: 'sm' | 'lg' }) => {
  const color = getColorByElement(star.saoNguHanh);
  const weight = statusWeight(star.saoDacTinh);
  const sizeClass = size === 'lg'
    ? 'text-[13px] leading-snug md:text-[15px]'
    : 'text-[9px] leading-tight md:text-[11px]';

  return (
    <div
      className={sizeClass}
      style={{ color, ...weight }}
    >
      {star.saoTen}
      {star.saoDacTinh ? `(${star.saoDacTinh})` : null}
    </div>
  );
};

export function Cell({ palace }: { palace: Palace }) {
  const { primary, lifecycle, auspicious, inauspicious } = classifyStars(palace.cungSao);

  // Tràng sinh label from lifecycle stars
  const trangSinhLabel = lifecycle.length > 0 ? lifecycle[0].saoTen : null;

  return (
    <div
      className="relative flex min-h-[160px] flex-col overflow-hidden bg-[#FFFEF5] p-1.5"
      style={{ border: '1px solid #C4B49A' }}
    >
      {/* ── HEADER: tieuHan left | tên cung center | daiHan right ── */}
      <div className="mb-0.5 flex items-start justify-between text-[9px] leading-tight md:text-[10px]">
        <div className="text-stone-500">{palace.tieuHan ?? ''}</div>
        <div className="flex flex-col items-center text-center">
          <span className="font-bold uppercase tracking-wide text-stone-800 md:text-[11px]">
            {palace.palaceRole ?? palace.cungTen}
          </span>
          {palace.isThan ? (
            <span className="text-[8px] font-semibold uppercase tracking-widest text-amber-700">
              &lt;Thân&gt;
            </span>
          ) : null}
        </div>
        <div className="text-right text-stone-600">
          {palace.daiHan ? <div>{palace.daiHan}</div> : null}
        </div>
      </div>

      {/* ── CHI + CHÍNH TINH sub-header ── */}
      <div className="mb-1 text-center">
        <div className="text-[9px] text-stone-500 md:text-[10px]">{palace.cungChi}</div>
        {primary.length > 0 ? (
          <div className="flex flex-col items-center gap-0.5">
            {primary.map((star) => (
              <div
                key={`p-${star.saoID}-${palace.cungID}`}
                className="font-bold uppercase leading-tight text-[13px] md:text-[15px]"
                style={{ color: getColorByElement(star.saoNguHanh), ...statusWeight(star.saoDacTinh) }}
              >
                {star.saoTen}
                {star.saoDacTinh ? `(${star.saoDacTinh})` : ''}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[10px] uppercase tracking-widest text-stone-400">Trống</div>
        )}
      </div>

      {/* ── MAIN 3-COL: cát left | spacer | hung right ── */}
      <div className="flex flex-1 gap-0.5 overflow-hidden">
        {/* Cát tinh — left */}
        <div className="flex-1 space-y-0.5 text-left">
          {auspicious.map((star) => (
            <StarItem key={`a-${star.saoID}-${palace.cungID}`} star={star} />
          ))}
        </div>

        {/* Hung tinh — right */}
        <div className="flex-1 space-y-0.5 text-right">
          {inauspicious.map((star) => (
            <StarItem key={`i-${star.saoID}-${palace.cungID}`} star={star} />
          ))}
        </div>
      </div>

      {/* ── FOOTER: tràng sinh left | tháng right ── */}
      <div
        className="mt-0.5 flex items-end justify-between text-[9px] text-stone-600"
        style={{ borderTop: '1px solid #E5D9C6' }}
      >
        <span>{trangSinhLabel ?? ''}</span>
        <span>{palace.tieuHan ? `Tháng ${palace.tieuHan}` : ''}</span>
      </div>
    </div>
  );
}
