import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { generateChart } from '@/lib/lasotuvi/engine';
import { InfoPanel } from './InfoPanel';

describe('InfoPanel', () => {
  it('renders chart metadata and can-chi information', () => {
    const chart = generateChart({ day: 24, month: 10, year: 1991, hour: 4, gender: 1, calendarType: 'duongLich', name: 'Nguyễn Văn A' });
    render(<InfoPanel chart={chart} />);

    expect(screen.getByText('Thiên Bàn')).toBeInTheDocument();
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByText('Nam')).toBeInTheDocument();
    expect(screen.getByText(/17\/9\/1991/)).toBeInTheDocument();
    expect(screen.getByText(/Mệnh \/ Thân/)).toBeInTheDocument();
  });
});