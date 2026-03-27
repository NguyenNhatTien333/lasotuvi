import { DIA_CHI, NGU_HANH_MAP, THIEN_CAN } from './constants';
import { jdFromDate, lunarToSolar, solarToLunar } from './calendar';
import { dichCung, mod } from './utils';
import type { ChartInput, Cuc, Element, LunarDate, SolarDate } from './types';

export const nguHanh = (tenHanh: string) => {
  const normalized = tenHanh as Element;
  const entry = NGU_HANH_MAP[normalized];
  if (!entry) {
    throw new Error('Tên Hành phải thuộc Kim (K), Mộc (M), Thủy (T), Hỏa (H) hoặc Thổ (O)');
  }

  return {
    id: normalized === 'K' ? 1 : normalized === 'M' ? 2 : normalized === 'T' ? 3 : normalized === 'H' ? 4 : 5,
    tenHanh: entry.name,
    cuc: entry.cuc,
    tenCuc:
      normalized === 'K'
        ? 'Kim tứ Cục'
        : normalized === 'M'
          ? 'Mộc tam Cục'
          : normalized === 'T'
            ? 'Thủy nhị Cục'
            : normalized === 'H'
              ? 'Hỏa lục Cục'
              : 'Thổ ngũ Cục',
    css: entry.css,
  };
};

export const ngayThangNam = (
  day: number,
  month: number,
  year: number,
  duongLich = true,
  timeZone = 7,
): [number, number, number, boolean] => {
  if (day <= 0 || day >= 32 || month <= 0 || month >= 13) {
    throw new Error('Ngày, tháng, năm không chính xác.');
  }

  if (duongLich) {
    const lunar = solarToLunar(day, month, year, timeZone);
    return [lunar.day, lunar.month, lunar.year, lunar.isLeapMonth];
  }

  return [day, month, year, false];
};

export const canChiNgay = (
  day: number,
  month: number,
  year: number,
  duongLich = true,
  timeZone = 7,
  thangNhuan = false,
): [number, number] => {
  let solarDay = day;
  let solarMonth = month;
  let solarYear = year;

  if (!duongLich) {
    const solar = lunarToSolar(day, month, year, thangNhuan, timeZone);
    solarDay = solar.day;
    solarMonth = solar.month;
    solarYear = solar.year;
  }

  const jd = jdFromDate(solarDay, solarMonth, solarYear);
  const canNgay = mod(jd + 9, 10) + 1;
  const chiNgay = mod(jd + 1, 12) + 1;
  return [canNgay, chiNgay];
};

export const canChiNgayThangNam = (
  day: number,
  month: number,
  year: number,
  duongLich = true,
  timeZone = 7,
): { canThang: number; canNam: number; chiNam: number; chiThang: number } => {
  let lunarDay = day;
  let lunarMonth = month;
  let lunarYear = year;

  if (duongLich) {
    [lunarDay, lunarMonth, lunarYear] = ngayThangNam(day, month, year, true, timeZone);
  }

  const canThang = mod(lunarYear * 12 + lunarMonth + 3, 10) + 1;
  const canNam = mod(lunarYear + 6, 10) + 1;
  const chiNam = mod(lunarYear + 8, 12) + 1;
  const chiThang = dichCung(3, lunarMonth - 1);

  void lunarDay;
  return { canThang, canNam, chiNam, chiThang };
};

export const canChiGio = (canNgay: number, gio: number): [number, number] => {
  const chiGio = gio;
  const canGio = mod((canNgay - 1) * 2 + (gio - 1), 10) + 1;
  return [canGio, chiGio];
};

const NAP_AM_MATRIX: Array<Array<string | false | number>> = [
  [0, 'G', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'N', 'Q'],
  [1, 'K1', false, 'T1', false, 'H1', false, 'O1', false, 'M1', false],
  [2, false, 'K1', false, 'T1', false, 'H1', false, 'O1', false, 'M1'],
  [3, 'T2', false, 'H2', false, 'O2', false, 'M2', false, 'K2', false],
  [4, false, 'T2', false, 'H2', false, 'O2', false, 'M2', false, 'K2'],
  [5, 'H3', false, 'O3', false, 'M3', false, 'K3', false, 'T3', false],
  [6, false, 'H3', false, 'O3', false, 'M3', false, 'K3', false, 'T3'],
  [7, 'K4', false, 'T4', false, 'H4', false, 'O4', false, 'M4', false],
  [8, false, 'K4', false, 'T4', false, 'H4', false, 'O4', false, 'M4'],
  [9, 'T5', false, 'H5', false, 'O5', false, 'M5', false, 'K5', false],
  [10, false, 'T5', false, 'H5', false, 'O5', false, 'M5', false, 'K5'],
  [11, 'H6', false, 'O6', false, 'M6', false, 'K6', false, 'T6', false],
  [12, false, 'H6', false, 'O6', false, 'M6', false, 'K6', false, 'T6'],
];

export const nguHanhNapAm = (diaChi: number, thienCan: number): Element => {
  const nh = NAP_AM_MATRIX[diaChi]?.[thienCan];
  if (!nh || typeof nh !== 'string') {
    throw new Error('Không tìm được Ngũ hành nạp âm');
  }
  return nh[0] as Element;
};

export const timCuc = (viTriCungMenhTrenDiaBan: number, canNamSinh: number): Element => {
  const canThangGieng = mod(canNamSinh * 2 + 1, 10);
  let canThangMenh = mod(mod(viTriCungMenhTrenDiaBan - 3, 12) + canThangGieng, 10);
  if (canThangMenh === 0) {
    canThangMenh = 10;
  }
  return nguHanhNapAm(viTriCungMenhTrenDiaBan, canThangMenh);
};

export const timTuVi = (cuc: Cuc, ngaySinhAmLich: number): number => {
  let cungDan = 3;
  const cucBanDau = cuc;
  let currentCuc = cuc;

  if (![2, 3, 4, 5, 6].includes(cuc)) {
    throw new Error('Số cục phải là 2, 3, 4, 5, 6');
  }

  while (currentCuc < ngaySinhAmLich) {
    currentCuc += cucBanDau;
    cungDan += 1;
  }

  let saiLech = currentCuc - ngaySinhAmLich;
  if (saiLech % 2 === 1) {
    saiLech = -saiLech;
  }

  return dichCung(cungDan, saiLech);
};

export const timTrangSinh = (cucSo: Cuc): number => {
  if (cucSo === 6) return 3;
  if (cucSo === 4) return 6;
  if (cucSo === 2 || cucSo === 5) return 9;
  if (cucSo === 3) return 12;
  throw new Error('Không tìm được cung an sao Tràng sinh');
};

export const timHoaLinh = (
  chiNamSinh: number,
  gioSinh: number,
  gioiTinh: number,
  amDuongNamSinh: number,
): [number, number] => {
  let khoiCungHoaTinh: number;
  let khoiCungLinhTinh: number;

  if ([3, 7, 11].includes(chiNamSinh)) {
    khoiCungHoaTinh = 2;
    khoiCungLinhTinh = 4;
  } else if ([1, 5, 9].includes(chiNamSinh)) {
    khoiCungHoaTinh = 3;
    khoiCungLinhTinh = 11;
  } else if ([6, 10, 2].includes(chiNamSinh)) {
    khoiCungHoaTinh = 11;
    khoiCungLinhTinh = 4;
  } else if ([12, 4, 8].includes(chiNamSinh)) {
    khoiCungHoaTinh = 10;
    khoiCungLinhTinh = 11;
  } else {
    throw new Error('Không thể khởi cung tìm Hỏa-Linh');
  }

  if (gioiTinh * amDuongNamSinh === -1) {
    return [dichCung(khoiCungHoaTinh + 1, -gioSinh), dichCung(khoiCungLinhTinh - 1, gioSinh)];
  }

  return [dichCung(khoiCungHoaTinh - 1, gioSinh), dichCung(khoiCungLinhTinh + 1, -gioSinh)];
};

export const timThienKhoi = (canNam: number): number => {
  const khoiViet = [0, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
  return khoiViet[canNam] ?? (() => { throw new Error('Không tìm được vị trí Khôi-Việt'); })();
};

export const timThienQuanThienPhuc = (canNam: number): [number, number] => {
  const thienQuan = [0, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
  const thienPhuc = [0, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
  return [thienQuan[canNam], thienPhuc[canNam]];
};

export const timCoThan = (chiNam: number): number => {
  if ([12, 1, 2].includes(chiNam)) return 3;
  if ([3, 4, 5].includes(chiNam)) return 6;
  if ([6, 7, 8].includes(chiNam)) return 9;
  return 12;
};

export const timThienMa = (chiNam: number): number => {
  const demNghich = chiNam % 4;
  if (demNghich === 1) return 3;
  if (demNghich === 2) return 12;
  if (demNghich === 3) return 9;
  return 6;
};

export const timPhaToai = (chiNam: number): number => {
  const demNghich = chiNam % 3;
  if (demNghich === 0) return 6;
  if (demNghich === 1) return 10;
  return 2;
};

export const timTriet = (canNam: number): [number, number] => {
  if ([1, 6].includes(canNam)) return [9, 10];
  if ([2, 7].includes(canNam)) return [7, 8];
  if ([3, 8].includes(canNam)) return [5, 6];
  if ([4, 9].includes(canNam)) return [3, 4];
  if ([5, 10].includes(canNam)) return [1, 2];
  throw new Error('Không tìm được Triệt');
};

export const timLuuTru = (canNam: number): [number, number] => {
  const maTranLuuHa = [0, 10, 11, 8, 5, 6, 7, 9, 4, 12, 3];
  const maTranThienTru = [0, 6, 7, 1, 6, 7, 9, 3, 7, 10, 11];
  return [maTranLuuHa[canNam], maTranThienTru[canNam]];
};

export const khoangCachCung = (cung1: number, cung2: number, chieu = 1): number => {
  if (chieu === 1) {
    return mod(cung1 - cung2 + 12, 12);
  }
  return mod(cung2 - cung1 + 12, 12);
};

export const normalizeInputToLunar = (input: ChartInput): LunarDate & { originalSolar?: SolarDate } => {
  if (input.calendarType === 'duongLich') {
    const lunar = solarToLunar(input.day, input.month, input.year, input.timezone ?? 7);
    return { ...lunar, originalSolar: { day: input.day, month: input.month, year: input.year } };
  }

  return { day: input.day, month: input.month, year: input.year, isLeapMonth: false };
};

export const getAdjustedMonthForStarPlacement = (lunar: LunarDate): number => {
  if (lunar.isLeapMonth && lunar.day >= 16) {
    return lunar.month === 12 ? 1 : lunar.month + 1;
  }
  return lunar.month;
};

export const getCanChiFull = (lunar: LunarDate, originalSolar?: SolarDate) => {
  const { canThang, canNam, chiNam, chiThang } = canChiNgayThangNam(
    originalSolar?.day ?? lunar.day,
    originalSolar?.month ?? lunar.month,
    originalSolar?.year ?? lunar.year,
    Boolean(originalSolar),
    7,
  );
  const [canNgay, chiNgay] = canChiNgay(
    originalSolar?.day ?? lunar.day,
    originalSolar?.month ?? lunar.month,
    originalSolar?.year ?? lunar.year,
    Boolean(originalSolar),
    7,
    lunar.isLeapMonth,
  );
  return { canThang, canNam, chiNam, chiThang, canNgay, chiNgay };
};

export const getStemById = (id: number) => THIEN_CAN[id] ?? null;
export const getBranchById = (id: number) => DIA_CHI[id] ?? null;
