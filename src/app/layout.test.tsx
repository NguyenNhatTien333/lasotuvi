import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders children inside html and body', () => {
    render(RootLayout({ children: <div>Nội dung kiểm thử</div> }));
    expect(screen.getByText('Nội dung kiểm thử')).toBeInTheDocument();
  });
});