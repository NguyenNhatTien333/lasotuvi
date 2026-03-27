import React from 'react';
import type { Palace, Star } from '@/lib/lasotuvi/types';

const elementClass = (element: Star['saoNguHanh']) => {
  if (element === 'K') return 'text-kim';
  if (element === 'M') return 'text-moc';
  if (element === 'T') return 'text-thuy';
  if (element === 'H') return 'text-hoa';
  return 'text-tho';
};

const statusClass = (status: Star['saoDacTinh']) => {
  if (status === 'V') return 'star-v';
  if (status === 'M') return 'star-m';
  if (status === 'Đ') return 'star-d';
  if (status === 'H') return 'star-h';
  return 'star-b';
};

const classifyStars = (stars: Star[]) => {
  const primary = stars.filter((star) => star.saoLoai === 1);
  const lifecycle = stars.filter((star) => star.vongTrangSinh === 1);
  const auspicious = stars.filter((star) => star.saoLoai > 1 && star.saoLoai < 10 && star.vongTrangSinh !== 1);
  const inauspicious = stars.filter((star) => star.saoLoai >= 10 && star.vongTrangSinh !== 1);
  return { primary, lifecycle, auspicious, inauspicious };
};

const StarText = ({ star, large = false }: { star: Star; large?: boolean }) => (
  <div className={`${elementClass(star.saoNguHanh)} ${statusClass(star.saoDacTinh)} ${large ? 'text-[11px] font-semibold md:text-sm' : 'text-[9px] leading-tight md:text-[11px]'}`}>
    {star.saoTen}
    {star.saoDacTinh ? <span className="ml-1 opacity-75">{star.saoDacTinh}</span> : null}
  </div>
);

export function Cell({ palace }: { palace: Palace }) {
  const { primary, lifecycle, auspicious, inauspicious } = classifyStars(palace.cungSao);

  return (
    <div
      className={[
        'relative flex aspect-square min-h-[150px] flex-col overflow-hidden border border-stone-400/70 bg-stone-50/90 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
        palace.tuanTrung ? 'ring-2 ring-amber-500/80' : '',
        palace.trietLo ? 'ring-2 ring-rose-500/70' : '',
      ].join(' ')}
    >
      <div className="mb-1 flex items-start justify-between gap-2 text-[10px] uppercase tracking-[0.14em] text-stone-600 md:text-[11px]">
        <div>
          <div className="font-semibold text-stone-800">{palace.cungChi}</div>
          <div>{palace.palaceRole}</div>
        </div>
        <div className="text-right">
          {palace.isThan ? <div className="font-semibold text-amber-700">Thân</div> : null}
          {palace.daiHan ? <div>{palace.daiHan}</div> : null}
          {palace.tieuHan ? <div>{palace.tieuHan}</div> : null}
        </div>
      </div>

      <div className="grid flex-1 grid-rows-[auto_1fr_auto] gap-1">
        <div className="min-h-[18px] space-y-0.5 text-left text-stone-600">
          {lifecycle.slice(0, 2).map((star) => (
            <StarText key={`${star.saoID}-${palace.cungID}`} star={star} />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          {primary.length > 0 ? (
            primary.map((star) => <StarText key={`${star.saoID}-${palace.cungID}`} star={star} large />)
          ) : (
            <div className="text-[10px] uppercase tracking-[0.18em] text-stone-400">Trống</div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px] md:text-[11px]">
          <div className="space-y-0.5 text-left text-sky-700">
            {auspicious.slice(0, 6).map((star) => (
              <StarText key={`${star.saoID}-${palace.cungID}`} star={star} />
            ))}
          </div>
          <div className="space-y-0.5 text-right text-rose-700">
            {inauspicious.slice(0, 6).map((star) => (
              <StarText key={`${star.saoID}-${palace.cungID}`} star={star} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
