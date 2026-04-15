import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Cell } from './Cell';
import type { Palace } from '@/lib/lasotuvi/types';

const palace: Palace = {
  cungID: 1,
  cungTen: 'Tý',
  cungChi: 'Tý',
  cungAmDuong: 1,
  cungNguHanh: 'T',
  palaceRole: 'Mệnh',
  cungSao: [
    { saoID: 1, saoTen: 'Tử vi', saoNguHanh: 'O', saoLoai: 1, saoDacTinh: 'V' },
    { saoID: 39, saoTen: 'Tràng sinh', saoNguHanh: 'T', saoLoai: 5, vongTrangSinh: 1, saoDacTinh: null },
    { saoID: 61, saoTen: 'Tả phù', saoNguHanh: 'O', saoLoai: 2, saoDacTinh: 'Đ' },
    { saoID: 52, saoTen: 'Kình dương', saoNguHanh: 'K', saoLoai: 11, saoDacTinh: 'H' },
  ],
  daiHan: 24,
  tieuHan: 'Tý',
  nguyetHan: 'Tý',
  isThan: true,
  tuanTrung: false,
  trietLo: false,
};

describe('Cell', () => {
  it('renders palace metadata and categorized stars', () => {
    render(<Cell palace={palace} />);

    expect(screen.getByText('Năm Tý')).toBeInTheDocument();
    expect(screen.getByText('Tháng 1')).toBeInTheDocument();
    expect(screen.getByText('Mệnh')).toBeInTheDocument();
    expect(screen.getByText('<Thân>')).toBeInTheDocument();
    expect(screen.getByText(/Tử vi/)).toBeInTheDocument();
    expect(screen.getByText('Tràng sinh')).toBeInTheDocument();
    expect(screen.getByText(/Tả phù/)).toBeInTheDocument();
    expect(screen.getByText(/Kình dương/)).toBeInTheDocument();
  });

  it('shows empty state when no primary stars exist', () => {
    render(
      <Cell
        palace={{
          ...palace,
          cungID: 2,
          cungSao: [],
          isThan: false,
          palaceRole: 'Phụ mẫu',
        }}
      />,
    );

    expect(screen.getByText('Trống')).toBeInTheDocument();
  });
});
