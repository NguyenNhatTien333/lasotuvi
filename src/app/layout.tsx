import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lá Số Tử Vi',
  description: 'Ứng dụng lập lá số Tử Vi từ mã nguồn lasotuvi chuyển sang Next.js TypeScript',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
