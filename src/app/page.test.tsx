import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Page from './page';
import { generateChart } from '@/lib/lasotuvi/engine';

const toPngMock = vi.fn(async () => 'data:image/png;base64,mock');

vi.mock('html-to-image', () => ({
  toPng: (...args: unknown[]) => toPngMock(...args),
}));

vi.mock('@/lib/lasotuvi/engine', async () => {
  const actual = await vi.importActual<typeof import('@/lib/lasotuvi/engine')>('@/lib/lasotuvi/engine');
  return {
    ...actual,
    verifyEngine: vi.fn(() => true),
    generateChart: vi.fn(actual.generateChart),
  };
});

describe('Page', () => {
  beforeEach(() => {
    toPngMock.mockClear();
  });

  it('renders generated chart on mount', async () => {
    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Bản lá số chuyển đổi từ Python sang Next.js')).toBeInTheDocument();
    });

    expect(screen.getByText(/Engine lịch pháp: Đã vượt kiểm tra cơ bản/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Lưu ảnh/i })).toBeEnabled();
  });

  it('re-generates chart when user clicks calculate', async () => {
    const user = userEvent.setup();
    render(<Page />);

    await waitFor(() => expect(screen.getByRole('button', { name: /Tính lá số/i })).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Tính lá số' }));

    expect(generateChart).toHaveBeenCalled();
  });

  it('exports chart as image', async () => {
    const user = userEvent.setup();
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(<Page />);

    await waitFor(() => expect(screen.getByRole('button', { name: /Lưu ảnh/i })).toBeEnabled());
    await user.click(screen.getByRole('button', { name: /Lưu ảnh/i }));

    await waitFor(() => expect(toPngMock).toHaveBeenCalled());
    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });
});