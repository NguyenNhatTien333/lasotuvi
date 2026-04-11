import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { generateChart } from '@/lib/lasotuvi/engine';
import { InfoPanel } from './InfoPanel';

describe('InfoPanel', () => {
  it('renders chart metadata and can-chi information', () => {
    const chart = generateChart({ day: 24, month: 10, year: 1991, hour: 4, gender: 1, calendarType: 'duongLich', name: 'Nguyễn Văn A' });
    render(<InfoPanel chart={chart} />);

    expect(screen.getByText('LÁ SỐ TỬ VI')).toBeInTheDocument();
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByText('Nam')).toBeInTheDocument();
    expect(screen.getByText(/Chủ Mệnh/)).toBeInTheDocument();
    expect(screen.getByText(/Chủ Thân/)).toBeInTheDocument();
    expect(screen.getByText(/Cục/)).toBeInTheDocument();
  });

  it('renders âm dương label from year ending and gender', () => {
    const chart = generateChart({ day: 15, month: 6, year: 2008, hour: 4, gender: -1, calendarType: 'duongLich', name: 'Nguyễn Thị B' });
    render(<InfoPanel chart={chart} />);

    expect(screen.getByText('Dương Nữ')).toBeInTheDocument();
  });
});