import React from 'react';
import { Cell } from './Cell';
import { InfoPanel } from './InfoPanel';
import type { Chart } from '@/lib/lasotuvi/types';

export function Chart({ chart }: { chart: Chart }) {
  const getPalace = (id: number) => chart.palaces[id - 1];

  return (
    <div
      className="overflow-x-auto rounded-sm shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
      style={{ border: '2px solid #6B5B3E' }}
    >
      <div
        className="relative mx-auto grid min-w-[900px] grid-cols-4"
        style={{ backgroundColor: '#FFFEF5' }}
      >
        {/* Row 0 */}
        <Cell palace={getPalace(6)} />
        <Cell palace={getPalace(7)} />
        <Cell palace={getPalace(8)} />
        <Cell palace={getPalace(9)} />

        {/* Row 1 */}
        <Cell palace={getPalace(5)} />
        <InfoPanel chart={chart} />
        <Cell palace={getPalace(10)} />

        {/* Row 2 */}
        <Cell palace={getPalace(4)} />
        <Cell palace={getPalace(11)} />

        {/* Row 3 */}
        <Cell palace={getPalace(3)} />
        <Cell palace={getPalace(2)} />
        <Cell palace={getPalace(1)} />
        <Cell palace={getPalace(12)} />
      </div>
    </div>
  );
}
