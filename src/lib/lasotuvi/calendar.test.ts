import { describe, expect, it } from 'vitest';
import {
  getLeapMonthOffset,
  getLunarMonth11,
  getNewMoonDay,
  jdFromDate,
  jdToDate,
  lunarToSolar,
  solarToLunar,
  verifyCalendar,
} from './calendar';

describe('calendar', () => {
  it('converts Gregorian dates to Julian day and back', () => {
    const julian = jdFromDate(24, 10, 1991);
    expect(julian).toBe(2448554);
    expect(jdToDate(julian)).toEqual({ day: 24, month: 10, year: 1991 });
  });

  it('converts solar to lunar using known reference dates', () => {
    expect(solarToLunar(24, 10, 1991)).toEqual({ day: 17, month: 9, year: 1991, isLeapMonth: false });
    expect(solarToLunar(29, 8, 1987)).toEqual({ day: 6, month: 7, year: 1987, isLeapMonth: true });
  });

  it('converts lunar back to solar', () => {
    expect(lunarToSolar(17, 9, 1991, false)).toEqual({ day: 24, month: 10, year: 1991 });
  });

  it('exposes lower-level astronomical helpers', () => {
    expect(getNewMoonDay(0, 7)).toBeTypeOf('number');
    expect(getLunarMonth11(1991, 7)).toBeTypeOf('number');
    expect(getLeapMonthOffset(getLunarMonth11(1987, 7), 7)).toBeGreaterThan(0);
  });

  it('passes built-in calendar verification', () => {
    expect(verifyCalendar()).toBe(true);
  });
});