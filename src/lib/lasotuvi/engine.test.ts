import { describe, expect, it } from 'vitest';
import { generateChart, verifyEngine } from './engine';

describe('engine', () => {
  it('generates a complete chart from solar input', () => {
    const chart = generateChart({
      day: 24,
      month: 10,
      year: 1991,
      hour: 4,
      gender: 1,
      calendarType: 'duongLich',
      timezone: 7,
      name: 'Test User',
    });

    expect(chart.palaces).toHaveLength(12);
    expect(chart.birthInfo.day).toBe(17);
    expect(chart.birthInfo.month).toBe(9);
    expect(chart.canChiInfo.canNam).toBe(8);
    expect(chart.palaces.some((palace) => palace.isThan)).toBe(true);
    expect(chart.palaces.every((palace) => palace.cungSao.length > 0)).toBe(true);
  });

  it('marks tuần and triệt on at least one palace', () => {
    const chart = generateChart({
      day: 24,
      month: 10,
      year: 1991,
      hour: 4,
      gender: 1,
      calendarType: 'duongLich',
    });

    expect(chart.palaces.some((palace) => palace.tuanTrung)).toBe(true);
    expect(chart.palaces.some((palace) => palace.trietLo)).toBe(true);
  });

  it('assigns saoDacTinh to Thiên Phủ based on palace position', () => {
    // Mapping palace positions 1–12 (Tý → Hợi) to expected Thiên Phủ states
    const THIEN_PHU_STATUS: Record<number, string> = {
      1: 'M', // Tý   - Miếu
      2: 'B', // Sửu  - Bình hoà
      3: 'M', // Dần  - Miếu
      4: 'B', // Mão  - Bình hoà
      5: 'V', // Thìn - Vượng
      6: 'Đ', // Tị   - Đắc
      7: 'M', // Ngọ  - Miếu
      8: 'Đ', // Mùi  - Đắc
      9: 'M', // Thân - Miếu
      10: 'B', // Dậu  - Bình hoà
      11: 'V', // Tuất - Vượng
      12: 'Đ', // Hợi  - Đắc
    };

    const chart = generateChart({
      day: 24,
      month: 10,
      year: 1991,
      hour: 4,
      gender: 1,
      calendarType: 'duongLich',
    });

    const thienPhu = chart.palaces.flatMap((p) => p.cungSao).find((s) => s.saoID === 7);

    expect(thienPhu).toBeDefined();
    expect(thienPhu!.saoDacTinh).not.toBeNull();
    expect(thienPhu!.saoDacTinh).toBe(THIEN_PHU_STATUS[thienPhu!.saoViTriCung!]);
  });

  it('passes internal engine verification', () => {
    expect(verifyEngine()).toBe(true);
  });
});