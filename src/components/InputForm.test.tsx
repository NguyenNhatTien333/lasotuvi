import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { InputForm } from './InputForm';
import type { ChartInput } from '@/lib/lasotuvi/types';

const value: ChartInput = {
  name: 'Nguyễn Văn A',
  day: 24,
  month: 10,
  year: 1991,
  hour: 4,
  gender: 1,
  calendarType: 'duongLich',
  timezone: 7,
};

describe('InputForm', () => {
  it('renders default values', () => {
    render(<InputForm value={value} onChange={vi.fn()} onSubmit={vi.fn()} />);

    expect(screen.getByDisplayValue('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('24')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tính lá số' })).toBeInTheDocument();
  });

  it('emits onChange and onSubmit', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSubmit = vi.fn();

    render(<InputForm value={value} onChange={onChange} onSubmit={onSubmit} />);

    await user.clear(screen.getByPlaceholderText('Ví dụ: Nguyễn Văn A'));
    await user.type(screen.getByPlaceholderText('Ví dụ: Nguyễn Văn A'), 'B');
    await user.click(screen.getByRole('button', { name: 'Tính lá số' }));

    expect(onChange).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('disables submit button when pending', () => {
    render(<InputForm value={value} pending onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Đang tính...' })).toBeDisabled();
  });
});