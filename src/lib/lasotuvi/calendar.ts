import { floorDiv } from './utils';
import type { LunarDate, SolarDate } from './types';

/**
 * Calendar conversion engine based on Ho Ngoc Duc's astronomical algorithms
 * Ported from Lich_HND.py
 * 
 * This is the authoritative calendar conversion module for Vietnamese lunar calendar.
 * All calculations assume GMT+7 by default.
 */

/**
 * Compute the integral Julian Day Number of a Gregorian/Julian date
 * Equivalent to jdFromDate() in Python
 */
export const jdFromDate = (dd: number, mm: number, yy: number): number => {
  const a = floorDiv(14 - mm, 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;

  let jd = dd + floorDiv(153 * m + 2, 5) + 365 * y + floorDiv(y, 4) - floorDiv(y, 100) + floorDiv(y, 400) - 32045;

  if (jd < 2299161) {
    jd = dd + floorDiv(153 * m + 2, 5) + 365 * y + floorDiv(y, 4) - 32083;
  }

  return jd;
};

/**
 * Convert a Julian Day Number to Gregorian/Julian date
 * Equivalent to jdToDate() in Python
 */
export const jdToDate = (jd: number): SolarDate => {
  let a: number;
  let b: number;
  let c: number;

  if (jd > 2299160) {
    a = jd + 32044;
    b = floorDiv(4 * a + 3, 146097);
    c = a - floorDiv(b * 146097, 4);
  } else {
    b = 0;
    c = jd + 32082;
  }

  const d = floorDiv(4 * c + 3, 1461);
  const e = c - floorDiv(1461 * d, 4);
  const m = floorDiv(5 * e + 2, 153);

  const day = e - floorDiv(153 * m + 2, 5) + 1;
  const month = m + 3 - 12 * floorDiv(m, 10);
  const year = b * 100 + d - 4800 + floorDiv(m, 10);

  return { day, month, year };
};

/**
 * Compute the time of the k-th new moon after the new moon of 1/1/1900 13:52 UCT
 * Returns Julian day as floating point
 * Equivalent to NewMoon() in Python
 */
export const newMoon = (k: number): number => {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;

  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));

  const deltat = T < -11
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;

  return jd1 + C1 - deltat;
};

/**
 * Compute the sun's longitude at any time (radians normalized to [0, 2π))
 * Equivalent to SunLongitude() in Python
 */
export const sunLongitude = (jdn: number): number => {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;

  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;

  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);

  let L = (L0 + DL) * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));

  return L;
};

/**
 * Compute sun position at local midnight of the day with given Julian day number
 * Returns a number between 0 and 11 representing solar terms
 * Equivalent to getSunLongitude() in Python
 */
export const getSunLongitude = (jdn: number, timeZone: number): number => {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T ** 2;
  const dr = Math.PI / 180;

  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;

  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);

  let L = L0 + DL;
  const omega = 125.04 - 1934.136 * T;
  L = L - 0.00569 - 0.00478 * Math.sin(omega * dr);
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));

  return Math.floor((L / Math.PI) * 6);
};

/**
 * Compute the day of the k-th new moon in the given time zone
 */
export const getNewMoonDay = (k: number, timeZone: number): number => {
  return Math.floor(newMoon(k) + 0.5 + timeZone / 24);
};

/**
 * Find the day that starts lunar month 11 of the given year
 */
export const getLunarMonth11 = (yy: number, timeZone: number): number => {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);

  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }

  return nm;
};

/**
 * Find the index of the leap month after the month starting on day a11
 */
export const getLeapMonthOffset = (a11: number, timeZone: number): number => {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);

  while (true) {
    last = arc;
    i += 1;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);

    if (!(arc !== last && i < 14)) {
      break;
    }
  }

  return i - 1;
};

/**
 * Convert solar date to lunar date
 * Equivalent to S2L() in Python
 */
export const solarToLunar = (
  dd: number,
  mm: number,
  yy: number,
  timeZone = 7,
): LunarDate => {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);

  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);

  let lunarLeap = 0;
  let lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        lunarLeap = 1;
      }
    }
  }

  if (lunarMonth > 12) {
    lunarMonth -= 12;
  }

  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeapMonth: lunarLeap === 1,
  };
};

/**
 * Convert lunar date to solar date
 * Equivalent to L2S() in Python
 */
export const lunarToSolar = (
  lunarD: number,
  lunarM: number,
  lunarY: number,
  lunarLeap: boolean,
  timeZone = 7,
): SolarDate => {
  let a11: number;
  let b11: number;

  if (lunarM < 11) {
    a11 = getLunarMonth11(lunarY - 1, timeZone);
    b11 = getLunarMonth11(lunarY, timeZone);
  } else {
    a11 = getLunarMonth11(lunarY, timeZone);
    b11 = getLunarMonth11(lunarY + 1, timeZone);
  }

  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarM - 11;

  if (off < 0) {
    off += 12;
  }

  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    let leapM = leapOff - 2;

    if (leapM < 0) {
      leapM += 12;
    }

    if (lunarLeap && lunarM !== leapM) {
      return { day: 0, month: 0, year: 0 };
    }

    if (lunarLeap || off >= leapOff) {
      off += 1;
    }
  }

  const monthStart = getNewMoonDay(k + off, timeZone);
  return jdToDate(monthStart + lunarD - 1);
};

/**
 * Validate the calendar engine against known test cases
 */
export const verifyCalendar = (): boolean => {
  const testCases = [
    { solar: { day: 24, month: 10, year: 1991 }, expected: { day: 17, month: 9, year: 1991, isLeapMonth: false } },
    { solar: { day: 29, month: 8, year: 1987 }, expected: { day: 6, month: 7, year: 1987, isLeapMonth: true } },
  ];

  return testCases.every(({ solar, expected }) => {
    const lunar = solarToLunar(solar.day, solar.month, solar.year);
    return (
      lunar.day === expected.day &&
      lunar.month === expected.month &&
      lunar.year === expected.year &&
      lunar.isLeapMonth === expected.isLeapMonth
    );
  });
};
