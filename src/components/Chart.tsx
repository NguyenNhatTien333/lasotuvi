import React from 'react';
import { Cell } from './Cell';
import { InfoPanel } from './InfoPanel';
import type { Chart } from '@/lib/lasotuvi/types';

// Grid layout: 4×4 grid (rows 0-3, cols 0-3)
// Row 0: cung 6,7,8,9  | Row 1: cung 5,[info],10 | Row 2: cung 4,[info],11 | Row 3: cung 3,2,1,12
const PALACE_GRID: Record<number, { row: number; col: number }> = {
  6:  { row: 0, col: 0 },
  7:  { row: 0, col: 1 },
  8:  { row: 0, col: 2 },
  9:  { row: 0, col: 3 },
  5:  { row: 1, col: 0 },
  10: { row: 1, col: 3 },
  4:  { row: 2, col: 0 },
  11: { row: 2, col: 3 },
  3:  { row: 3, col: 0 },
  2:  { row: 3, col: 1 },
  1:  { row: 3, col: 2 },
  12: { row: 3, col: 3 },
};

// Each cell occupies 1/4 of the container. For a 4×4 grid, each cell = 25% width/height.
const CELL_PCT = 25; // percentage

interface OverlayBar {
  key: string;
  label: string;
  style: React.CSSProperties;
}

function computeOverlays(palaces: Chart['palaces']): OverlayBar[] {
  const bars: OverlayBar[] = [];

  // Gather all cungIDs that are Tuần or Triệt
  const tuanIds = palaces.filter((p) => p.tuanTrung).map((p) => p.cungID);
  const trietIds = palaces.filter((p) => p.trietLo).map((p) => p.cungID);

  const processGroup = (ids: number[], label: string) => {
    if (ids.length < 2) return;
    for (let a = 0; a < ids.length; a++) {
      for (let b = a + 1; b < ids.length; b++) {
        const gA = PALACE_GRID[ids[a]];
        const gB = PALACE_GRID[ids[b]];
        if (!gA || !gB) continue;

        const rowDiff = Math.abs(gA.row - gB.row);
        const colDiff = Math.abs(gA.col - gB.col);

        // Adjacent horizontally (same row, cols differ by 1)
        if (rowDiff === 0 && colDiff === 1) {
          const leftCol = Math.min(gA.col, gB.col);
          const row = gA.row;
          bars.push({
            key: `${label}-h-${ids[a]}-${ids[b]}`,
            label,
            style: {
              position: 'absolute',
              top: `calc(${row * CELL_PCT}% + 30%)`,
              left: `calc(${(leftCol + 1) * CELL_PCT}% - 16px)`,
              width: '32px',
              height: '14px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '8px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '0.1em',
              zIndex: 10,
            },
          });
        }

        // Adjacent vertically (same col, rows differ by 1)
        if (colDiff === 0 && rowDiff === 1) {
          const topRow = Math.min(gA.row, gB.row);
          const col = gA.col;
          bars.push({
            key: `${label}-v-${ids[a]}-${ids[b]}`,
            label,
            style: {
              position: 'absolute',
              top: `calc(${(topRow + 1) * CELL_PCT}% - 7px)`,
              left: `calc(${col * CELL_PCT}% + 30%)`,
              width: '14px',
              height: '32px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '7px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '0.05em',
              writingMode: 'vertical-rl',
              zIndex: 10,
            },
          });
        }
      }
    }
  };

  processGroup(tuanIds, 'TUẦN');
  processGroup(trietIds, 'TRIỆT');

  return bars;
}

export function Chart({ chart }: { chart: Chart }) {
  const getPalace = (id: number) => chart.palaces[id - 1];
  const overlays = computeOverlays(chart.palaces);

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

        {/* Tuần / Triệt overlay bars */}
        {overlays.map((bar) => (
          <div key={bar.key} style={bar.style}>
            {bar.label}
          </div>
        ))}
      </div>
    </div>
  );
}
