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

  it('passes internal engine verification', () => {
    expect(verifyEngine()).toBe(true);
  });
});