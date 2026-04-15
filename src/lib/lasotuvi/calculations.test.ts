import { describe, expect, it } from 'vitest';
import {
  calculateLunarAge,
  canChiGio,
  canChiNgay,
  canChiNgayThangNam,
  getCanChiYearName,
  getAdjustedMonthForStarPlacement,
  getCanChiFull,
  khoangCachCung,
  nguHanh,
  nguHanhNapAm,
  normalizeInputToLunar,
  timCoThan,
  timCuc,
  timHoaLinh,
  timLuuTru,
  timPhaToai,
  timThienKhoi,
  timThienMa,
  timThienQuanThienPhuc,
  timTrangSinh,
  timTriet,
  timTuVi,
  tinhAmDuongNamSinh,
} from './calculations';

describe('calculations', () => {
  it('maps ngũ hành and nạp âm correctly', () => {
    expect(nguHanh('K').tenHanh).toBe('Kim');
    expect(nguHanhNapAm(1, 1)).toBe('K');
  });

  it('computes can chi values for date and hour', () => {
    const monthYear = canChiNgayThangNam(24, 10, 1991, true, 7);
    expect(monthYear.canNam).toBe(8);
    expect(monthYear.chiNam).toBe(8);

    const [canNgay, chiNgay] = canChiNgay(24, 10, 1991, true, 7, false);
    expect(canNgay).toBeGreaterThanOrEqual(1);
    expect(chiNgay).toBeGreaterThanOrEqual(1);

    const [canGio, chiGio] = canChiGio(canNgay, 4);
    expect(canGio).toBeGreaterThanOrEqual(1);
    expect(chiGio).toBe(4);
  });

  it('normalizes input and adjusts leap month rule for star placement', () => {
    const lunar = normalizeInputToLunar({ day: 29, month: 8, year: 1987, hour: 7, gender: -1, calendarType: 'duongLich' });
    expect(lunar.month).toBe(7);
    expect(lunar.isLeapMonth).toBe(true);
    expect(getAdjustedMonthForStarPlacement({ day: 20, month: 7, year: 1987, isLeapMonth: true })).toBe(8);
  });

  it('computes core astrological placement helpers', () => {
    expect(timCuc(3, 8)).toBe('M');
    expect(timTuVi(3, 17)).toBeGreaterThanOrEqual(1);
    expect(timTrangSinh(6)).toBe(3);
    expect(timHoaLinh(8, 7, -1, -1)).toHaveLength(2);
    expect(timThienKhoi(8)).toBe(7);
    expect(timThienQuanThienPhuc(8)).toEqual([10, 6]);
    expect(timCoThan(8)).toBe(9);
    expect(timThienMa(8)).toBe(6);
    expect(timPhaToai(8)).toBe(2);
    expect(timTriet(8)).toEqual([5, 6]);
    expect(timLuuTru(8)).toEqual([4, 7]);
  });

  it('computes palace distances and full can chi package', () => {
    expect(khoangCachCung(5, 3, 1)).toBe(2);
    expect(khoangCachCung(5, 3, -1)).toBe(10);

    const result = getCanChiFull({ day: 17, month: 9, year: 1991, isLeapMonth: false }, { day: 24, month: 10, year: 1991 });
    expect(result.canNam).toBe(8);
    expect(result.chiNam).toBe(8);
    expect(result.canNgay).toBeGreaterThan(0);
  });

  it('derives yin-yang from the year ending digit', () => {
    expect(tinhAmDuongNamSinh(2008)).toBe(1);
    expect(tinhAmDuongNamSinh(1991)).toBe(-1);
    expect(tinhAmDuongNamSinh(2000)).toBe(1);
  });

  it('calculates lunar age from viewing year', () => {
    expect(calculateLunarAge(1991, 2026)).toBe(36);
    expect(calculateLunarAge(2000, 2026)).toBe(27);
  });

  it('maps Gregorian year to Can Chi name', () => {
    expect(getCanChiYearName(2026)).toBe('Bính Ngọ');
    expect(getCanChiYearName(1995)).toBe('Ất Hợi');
  });
});