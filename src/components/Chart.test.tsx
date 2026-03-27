import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { generateChart } from '@/lib/lasotuvi/engine';
import { Chart } from './Chart';

describe('Chart', () => {
  it('renders a 12-palace chart with info panel', () => {
    const chart = generateChart({ day: 24, month: 10, year: 1991, hour: 4, gender: 1, calendarType: 'duongLich' });
    render(<Chart chart={chart} />);

    expect(screen.getByText('Thiên Bàn')).toBeInTheDocument();
    expect(screen.getByText('Lá Số Tử Vi')).toBeInTheDocument();
    expect(screen.getAllByText(/Mệnh|Phụ mẫu|Phúc đức|Điền trạch|Quan lộc|Nô bộc|Thiên di|Tật ách|Tài bạch|Tử tức|Phu thê|Huynh đệ/).length).toBeGreaterThan(0);
  });
});