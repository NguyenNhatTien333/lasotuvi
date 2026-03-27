import React from 'react';
import { Cell } from './Cell';
import { InfoPanel } from './InfoPanel';
import type { Chart } from '@/lib/lasotuvi/types';

const GRID_ORDER = [6, 7, 8, 9, 5, 4, 3, 2, 1, 12] as const;

export function Chart({ chart }: { chart: Chart }) {
  const getPalace = (id: number) => chart.palaces[id - 1];

  return (
    <div className="overflow-auto rounded-[28px] border border-stone-500/30 bg-[linear-gradient(135deg,rgba(250,245,235,0.95),rgba(231,229,228,0.98))] p-4 shadow-[0_24px_80px_rgba(28,25,23,0.12)]">
      <div className="mx-auto grid min-w-[980px] grid-cols-4 gap-2">
        <Cell palace={getPalace(6)} />
        <Cell palace={getPalace(7)} />
        <Cell palace={getPalace(8)} />
        <Cell palace={getPalace(9)} />

        <Cell palace={getPalace(5)} />
        <InfoPanel chart={chart} />
        <Cell palace={getPalace(10)} />

        <Cell palace={getPalace(4)} />
        <Cell palace={getPalace(11)} />

        <Cell palace={getPalace(3)} />
        <Cell palace={getPalace(2)} />
        <Cell palace={getPalace(1)} />
        <Cell palace={getPalace(12)} />
      </div>
    </div>
  );
}
