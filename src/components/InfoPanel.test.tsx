import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DIA_CHI } from '@/lib/lasotuvi/constants';
import { generateChart } from '@/lib/lasotuvi/engine';
import { InfoPanel } from './InfoPanel';

describe('InfoPanel', () => {
  it('renders chart metadata and can-chi information', () => {
    const chart = generateChart({ day: 24, month: 10, year: 1991, viewYear: 2026, hour: 4, gender: 1, calendarType: 'duongLich', name: 'Nguyễn Văn A' });
    render(<InfoPanel chart={chart} />);

    expect(screen.getByText('LÁ SỐ TỬ VI')).toBeInTheDocument();
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByText('Nam')).toBeInTheDocument();
    expect(screen.getByText(/Chủ Mệnh/)).toBeInTheDocument();
    expect(screen.getByText(/Chủ Thân/)).toBeInTheDocument();
    expect(screen.getByText(/^Cục:$/)).toBeInTheDocument();
    expect(screen.getByText('2026 (Bính Ngọ)')).toBeInTheDocument();
    expect(screen.getByText(/36\s*tuổi/)).toBeInTheDocument();
  });

  it('renders âm dương label from year ending and gender', () => {
    const chart = generateChart({ day: 15, month: 6, year: 2008, viewYear: 2026, hour: 4, gender: -1, calendarType: 'duongLich', name: 'Nguyễn Thị B' });
    render(<InfoPanel chart={chart} />);

    expect(screen.getByText('Dương Nữ')).toBeInTheDocument();
  });

  it('computes Chủ Mệnh and Chủ Thân from địa chi rules', () => {
    const chart = generateChart({ day: 24, month: 10, year: 1991, viewYear: 2026, hour: 4, gender: 1, calendarType: 'duongLich', name: 'Nguyễn Văn A' });
    render(<InfoPanel chart={chart} />);

    const expectedChuMenh = DIA_CHI[chart.menhPalace]?.menhChu;
    const expectedChuThan = DIA_CHI[chart.canChiInfo.chiNam]?.thanChu;

    expect(expectedChuMenh).toBeDefined();
    expect(expectedChuThan).toBeDefined();
    expect(screen.getByText(expectedChuMenh!)).toBeInTheDocument();
    expect(screen.getByText(expectedChuThan!)).toBeInTheDocument();
  });

  it('shows âm dương thuận lý hoặc nghịch lý note', () => {
    const chart = generateChart({ day: 24, month: 10, year: 1991, viewYear: 2026, hour: 4, gender: 1, calendarType: 'duongLich', name: 'Nguyễn Văn A' });
    render(<InfoPanel chart={chart} />);

    expect(screen.getByText(/Âm Dương (thuận lý|nghịch lý)/)).toBeInTheDocument();
  });
});