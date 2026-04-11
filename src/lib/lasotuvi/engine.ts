import { DIA_CHI, NGU_HANH_MAP, PALACE_NAMES, STARS, THIEN_CAN } from './constants';
import {
  getAdjustedMonthForStarPlacement,
  getCanChiFull,
  khoangCachCung,
  normalizeInputToLunar,
  nguHanh,
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
  canChiGio,
} from './calculations';
import { verifyCalendar } from './calendar';
import { dichCung } from './utils';
import type { Chart, ChartInput, Cuc, Palace, PalaceName, Star, StarStatus } from './types';

const HANH_CUNG: Array<'T' | 'O' | 'M' | 'H' | 'K' | null> = [null, 'T', 'O', 'M', 'M', 'O', 'H', 'H', 'O', 'K', 'K', 'O', 'T'];

const DAC_TINH_MATRIX: Record<number, Array<StarStatus | string>> = {
  1: ['Tử vi', 'B', 'Đ', 'M', 'B', 'V', 'M', 'M', 'Đ', 'M', 'B', 'V', 'B'],
  2: ['Liêm trinh', 'V', 'Đ', 'V', 'H', 'M', 'H', 'V', 'Đ', 'V', 'H', 'M', 'H'],
  3: ['Thiên đồng', 'V', 'H', 'M', 'Đ', 'H', 'Đ', 'H', 'H', 'M', 'H', 'H', 'Đ'],
  4: ['Vũ khúc', 'V', 'M', 'V', 'Đ', 'M', 'H', 'V', 'M', 'V', 'Đ', 'M', 'H'],
  5: ['Thái dương', 'H', 'Đ', 'V', 'V', 'V', 'M', 'M', 'Đ', 'H', 'H', 'H', 'H'],
  6: ['Thiên cơ', 'Đ', 'Đ', 'H', 'M', 'M', 'V', 'Đ', 'Đ', 'V', 'M', 'M', 'H'],
  7: ['Thiên phủ', 'M', 'B', 'M', 'B', 'V', 'Đ', 'M', 'Đ', 'M', 'B', 'V', 'Đ'],
  8: ['Thái âm', 'V', 'Đ', 'H', 'H', 'H', 'H', 'H', 'Đ', 'V', 'M', 'M', 'M'],
  9: ['Tham lang', 'H', 'M', 'Đ', 'H', 'V', 'H', 'H', 'M', 'Đ', 'H', 'V', 'H'],
  10: ['Cự môn', 'V', 'H', 'V', 'M', 'H', 'H', 'V', 'H', 'Đ', 'M', 'H', 'Đ'],
  11: ['Thiên tướng', 'V', 'Đ', 'M', 'H', 'V', 'Đ', 'V', 'Đ', 'M', 'H', 'V', 'Đ'],
  12: ['Thiên lương', 'V', 'Đ', 'V', 'V', 'M', 'H', 'M', 'Đ', 'V', 'H', 'M', 'H'],
  13: ['Thất sát', 'M', 'Đ', 'M', 'H', 'H', 'V', 'M', 'Đ', 'M', 'H', 'H', 'V'],
  14: ['Phá quân', 'M', 'V', 'H', 'H', 'Đ', 'H', 'M', 'V', 'H', 'H', 'Đ', 'H'],
  51: ['Đà la', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H'],
  52: ['Kình dương', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H'],
  53: ['Địa không', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ'],
  54: ['Địa kiếp', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ'],
  55: ['Linh tinh', 'H', 'H', 'Đ', 'Đ', 'Đ', 'Đ', 'Đ', 'H', 'H', 'H', 'H', 'H'],
  56: ['Hỏa tinh', 'H', 'H', 'Đ', 'Đ', 'Đ', 'Đ', 'Đ', 'H', 'H', 'H', 'H', 'H'],
  57: ['Văn xương', 'H', 'Đ', 'H', 'Đ', 'H', 'Đ', 'H', 'Đ', 'H', 'H', 'Đ', 'Đ'],
  58: ['Văn khúc', 'H', 'Đ', 'H', 'Đ', 'H', 'Đ', 'H', 'Đ', 'H', 'H', 'Đ', 'Đ'],
  69: ['Thiên khốc', 'Đ', 'Đ', null, 'Đ', null, null, 'Đ', 'Đ', null, 'Đ', null, null],
  70: ['Thiên hư', 'Đ', 'Đ', null, 'Đ', null, null, 'Đ', 'Đ', null, 'Đ', null, null],
  73: ['Thiên hình', null, null, 'Đ', 'Đ', null, null, null, null, 'Đ', 'Đ', null, null],
  74: ['Thiên riêu', null, null, 'Đ', 'Đ', null, null, null, null, null, 'Đ', 'Đ', null],
  95: ['Hóa kỵ', null, 'Đ', null, null, 'Đ', null, null, 'Đ', null, null, 'Đ', null],
  98: ['Thiên mã', null, null, 'Đ', null, null, 'Đ', null, null, null, null, null, null],
};

const cloneStar = (star: Star, palacePosition: number): Star => {
  const status = (DAC_TINH_MATRIX[star.saoID]?.[palacePosition] as StarStatus | undefined) ?? null;
  return {
    ...star,
    saoViTriCung: palacePosition,
    saoDacTinh: status ?? null,
  };
};

const buildPalaces = (thangSinhAmLich: number, gioSinhAmLich: number) => {
  const palaces: Palace[] = Array.from({ length: 12 }, (_, index) => {
    const palacePosition = index + 1;
    const branch = DIA_CHI[palacePosition];
    return {
      cungID: palacePosition,
      cungTen: branch?.tenChi ?? '',
      cungChi: branch?.tenChi ?? '',
      cungAmDuong: palacePosition % 2 === 0 ? -1 : 1,
      cungNguHanh: HANH_CUNG[palacePosition] ?? 'T',
      cungSao: [],
      isThan: false,
      tuanTrung: false,
      trietLo: false,
    };
  });

  const cungThan = dichCung(3, thangSinhAmLich - 1, gioSinhAmLich - 1);
  const cungMenh = dichCung(3, thangSinhAmLich - 1, -gioSinhAmLich + 1);
  const palacePositions = [
    cungMenh,
    dichCung(cungMenh, 1),
    dichCung(cungMenh, 2),
    dichCung(cungMenh, 3),
    dichCung(cungMenh, 4),
    dichCung(cungMenh, 5),
    dichCung(cungMenh, 6),
    dichCung(cungMenh, 7),
    dichCung(cungMenh, 8),
    dichCung(cungMenh, 9),
    dichCung(cungMenh, 10),
    dichCung(cungMenh, 11),
  ];

  PALACE_NAMES.forEach((role, index) => {
    palaces[palacePositions[index] - 1].palaceRole = role;
  });

  palaces[cungThan - 1].isThan = true;

  return {
    palaces,
    cungMenh,
    cungThan,
    cungNoboc: palacePositions[5],
    cungTatAch: palacePositions[7],
  };
};

const nhapDaiHan = (palaces: Palace[], cucSo: Cuc, gioiTinhDirection: number, cungMenh: number) => {
  palaces.forEach((palace) => {
    const khoangCach = khoangCachCung(palace.cungID, cungMenh, gioiTinhDirection);
    palace.daiHan = cucSo + khoangCach * 10;
  });
};

const nhapTieuHan = (palaces: Palace[], khoiTieuHan: number, gioiTinh: number, chiNam: number) => {
  const viTriCungTy1 = dichCung(khoiTieuHan, -gioiTinh * (chiNam - 1));
  palaces.forEach((palace) => {
    const khoangCach = khoangCachCung(palace.cungID, viTriCungTy1, gioiTinh);
    palace.tieuHan = DIA_CHI[khoangCach + 1]?.tenChi ?? '';
  });
};

const nhapSao = (palaces: Palace[], cungSo: number, ...stars: Star[]) => {
  const palace = palaces[cungSo - 1];
  stars.forEach((star) => {
    palace.cungSao.push(cloneStar(star, cungSo));
  });
};

const nhapTuan = (palaces: Palace[], ...positions: number[]) => {
  positions.forEach((position) => {
    palaces[position - 1].tuanTrung = true;
  });
};

const nhapTriet = (palaces: Palace[], ...positions: number[]) => {
  positions.forEach((position) => {
    palaces[position - 1].trietLo = true;
  });
};

const anTuHoa = (canNam: number, positions: Record<string, number>) => {
  if (canNam === 1) return [positions.viTriLiemTrinh, positions.viTriPhaQuan, positions.viTriVuKhuc, positions.vitriThaiDuong];
  if (canNam === 2) return [positions.viTriThienCo, positions.viTriThienLuong, positions.viTriTuVi, positions.viTriThaiAm];
  if (canNam === 3) return [positions.viTriThienDong, positions.viTriThienCo, positions.viTriVanXuong, positions.viTriLiemTrinh];
  if (canNam === 4) return [positions.viTriThaiAm, positions.viTriThienDong, positions.viTriThienCo, positions.viTriCuMon];
  if (canNam === 5) return [positions.viTriThamLang, positions.viTriThaiAm, positions.viTriHuuBat, positions.viTriThienCo];
  if (canNam === 6) return [positions.viTriVuKhuc, positions.viTriThamLang, positions.viTriThienLuong, positions.viTriVanKhuc];
  if (canNam === 7) return [positions.vitriThaiDuong, positions.viTriVuKhuc, positions.viTriThienDong, positions.viTriThaiAm];
  if (canNam === 8) return [positions.viTriCuMon, positions.vitriThaiDuong, positions.viTriVanKhuc, positions.viTriVanXuong];
  if (canNam === 9) return [positions.viTriThienLuong, positions.viTriTuVi, positions.viTriThienPhu, positions.viTriVuKhuc];
  return [positions.viTriPhaQuan, positions.viTriCuMon, positions.viTriThaiAm, positions.viTriThamLang];
};

export const generateChart = (input: ChartInput): Chart => {
  const lunar = normalizeInputToLunar(input);
  const adjustedMonthForStars = getAdjustedMonthForStarPlacement(lunar);
  const base = buildPalaces(lunar.month, input.hour);
  const canChiBase = getCanChiFull(lunar, lunar.originalSolar);
  const [canGio, chiGio] = canChiGio(canChiBase.canNgay, input.hour);

  const canNamData = THIEN_CAN[canChiBase.canNam];
  const chiNamData = DIA_CHI[canChiBase.chiNam];
  if (!canNamData || !chiNamData) {
    throw new Error('Không xác định được Can Chi năm');
  }

  const hanhCuc = timCuc(base.cungMenh, canChiBase.canNam);
  const cuc = nguHanh(hanhCuc);
  const cucSo = cuc.cuc as Cuc;
  const amDuongNamSinh = tinhAmDuongNamSinh(lunar.year);
  const amDuongChiNamSinh = chiNamData.amDuong;
  const amDuongNamNu = input.gender * amDuongNamSinh;

  nhapDaiHan(base.palaces, cucSo, input.gender * amDuongChiNamSinh, base.cungMenh);
  const khoiHan = dichCung(11, -3 * (canChiBase.chiNam - 1));
  nhapTieuHan(base.palaces, khoiHan, input.gender, canChiBase.chiNam);

  const viTriTuVi = timTuVi(cucSo, lunar.day);
  nhapSao(base.palaces, viTriTuVi, STARS.saoTuVi);

  const viTriLiemTrinh = dichCung(viTriTuVi, 4);
  const viTriThienDong = dichCung(viTriTuVi, 7);
  const viTriVuKhuc = dichCung(viTriTuVi, 8);
  const vitriThaiDuong = dichCung(viTriTuVi, 9);
  const viTriThienCo = dichCung(viTriTuVi, 11);
  nhapSao(base.palaces, viTriLiemTrinh, STARS.saoLiemTrinh);
  nhapSao(base.palaces, viTriThienDong, STARS.saoThienDong);
  nhapSao(base.palaces, viTriVuKhuc, STARS.saoVuKhuc);
  nhapSao(base.palaces, vitriThaiDuong, STARS.saoThaiDuong);
  nhapSao(base.palaces, viTriThienCo, STARS.saoThienCo);

  const viTriThienPhu = dichCung(3, 3 - viTriTuVi);
  const viTriThaiAm = dichCung(viTriThienPhu, 1);
  const viTriThamLang = dichCung(viTriThienPhu, 2);
  const viTriCuMon = dichCung(viTriThienPhu, 3);
  const viTriThienTuong = dichCung(viTriThienPhu, 4);
  const viTriThienLuong = dichCung(viTriThienPhu, 5);
  const viTriThatSat = dichCung(viTriThienPhu, 6);
  const viTriPhaQuan = dichCung(viTriThienPhu, 10);
  nhapSao(base.palaces, viTriThienPhu, STARS.saoThienPhu);
  nhapSao(base.palaces, viTriThaiAm, STARS.saoThaiAm);
  nhapSao(base.palaces, viTriThamLang, STARS.saoThamLang);
  nhapSao(base.palaces, viTriCuMon, STARS.saoCuMon);
  nhapSao(base.palaces, viTriThienTuong, STARS.saoThienTuong);
  nhapSao(base.palaces, viTriThienLuong, STARS.saoThienLuong);
  nhapSao(base.palaces, viTriThatSat, STARS.saoThatSat);
  nhapSao(base.palaces, viTriPhaQuan, STARS.saoPhaQuan);

  const viTriLocTon = canNamData.vitriDiaBan;
  nhapSao(base.palaces, viTriLocTon, STARS.saoLocTon, STARS.saoBacSy);
  nhapSao(base.palaces, dichCung(viTriLocTon, 1 * amDuongNamNu), STARS.saoLucSi);
  nhapSao(base.palaces, dichCung(viTriLocTon, 2 * amDuongNamNu), STARS.saoThanhLong);
  nhapSao(base.palaces, dichCung(viTriLocTon, 3 * amDuongNamNu), STARS.saoTieuHao);
  nhapSao(base.palaces, dichCung(viTriLocTon, 4 * amDuongNamNu), STARS.saoTuongQuan);
  nhapSao(base.palaces, dichCung(viTriLocTon, 5 * amDuongNamNu), STARS.saoTauThu);
  nhapSao(base.palaces, dichCung(viTriLocTon, 6 * amDuongNamNu), STARS.saoPhiLiem);
  nhapSao(base.palaces, dichCung(viTriLocTon, 7 * amDuongNamNu), STARS.saoHyThan);
  nhapSao(base.palaces, dichCung(viTriLocTon, 8 * amDuongNamNu), STARS.saoBenhPhu);
  nhapSao(base.palaces, dichCung(viTriLocTon, 9 * amDuongNamNu), STARS.saoDaiHao);
  nhapSao(base.palaces, dichCung(viTriLocTon, 10 * amDuongNamNu), STARS.saoPhucBinh);
  nhapSao(base.palaces, dichCung(viTriLocTon, 11 * amDuongNamNu), STARS.saoQuanPhu2);

  const viTriThaiTue = canChiBase.chiNam;
  nhapSao(base.palaces, viTriThaiTue, STARS.saoThaiTue);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 1), STARS.saoThieuDuong, STARS.saoThienKhong);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 2), STARS.saoTangMon);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 3), STARS.saoThieuAm);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 4), STARS.saoQuanPhu3);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 5), STARS.saoTuPhu, STARS.saoNguyetDuc);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 6), STARS.saoTuePha);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 7), STARS.saoLongDuc);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 8), STARS.saoBachHo);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 9), STARS.saoPhucDuc, STARS.saoThienDuc);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 10), STARS.saoDieuKhach);
  nhapSao(base.palaces, dichCung(viTriThaiTue, 11), STARS.saoTrucPhu);

  const viTriTrangSinh = timTrangSinh(cucSo);
  nhapSao(base.palaces, viTriTrangSinh, STARS.saoTrangSinh);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 1), STARS.saoMocDuc);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 2), STARS.saoQuanDoi);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 3), STARS.saoLamQuan);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 4), STARS.saoDeVuong);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 5), STARS.saoSuy);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 6), STARS.saoBenh);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 7), STARS.saoTu);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 8), STARS.saoMo);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * 9), STARS.saoTuyet);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * -1), STARS.saoThai);
  nhapSao(base.palaces, dichCung(viTriTrangSinh, amDuongNamNu * -2), STARS.saoDuong);

  const viTriDaLa = dichCung(viTriLocTon, -1);
  const viTriKinhDuong = dichCung(viTriLocTon, 1);
  nhapSao(base.palaces, viTriDaLa, STARS.saoDaLa);
  nhapSao(base.palaces, viTriKinhDuong, STARS.saoKinhDuong);

  const viTriDiaKiep = dichCung(11, input.hour);
  const viTriDiaKhong = dichCung(12, 12 - viTriDiaKiep);
  nhapSao(base.palaces, viTriDiaKiep, STARS.saoDiaKiep);
  nhapSao(base.palaces, viTriDiaKhong, STARS.saoDiaKhong);

  const [viTriHoaTinh, viTriLinhTinh] = timHoaLinh(canChiBase.chiNam, input.hour, input.gender, amDuongNamSinh);
  nhapSao(base.palaces, viTriHoaTinh, STARS.saoHoaTinh);
  nhapSao(base.palaces, viTriLinhTinh, STARS.saoLinhTinh);

  const viTriLongTri = dichCung(5, canChiBase.chiNam - 1);
  const viTriPhuongCac = dichCung(2, 2 - viTriLongTri);
  const viTriTaPhu = dichCung(5, adjustedMonthForStars - 1);
  const viTriHuuBat = dichCung(2, 2 - viTriTaPhu);
  const viTriVanKhuc = dichCung(5, input.hour - 1);
  const viTriVanXuong = dichCung(2, 2 - viTriVanKhuc);
  const viTriTamThai = dichCung(5, adjustedMonthForStars + lunar.day - 2);
  const viTriBatToa = dichCung(2, 2 - viTriTamThai);
  nhapSao(base.palaces, viTriLongTri, STARS.saoLongTri);
  nhapSao(base.palaces, viTriPhuongCac, STARS.saoPhuongCac, STARS.saoGiaiThan);
  nhapSao(base.palaces, viTriTaPhu, STARS.saoTaPhu);
  nhapSao(base.palaces, viTriHuuBat, STARS.saoHuuBat);
  nhapSao(base.palaces, viTriVanKhuc, STARS.saoVanKhuc);
  nhapSao(base.palaces, viTriVanXuong, STARS.saoVanXuong);
  nhapSao(base.palaces, viTriTamThai, STARS.saoTamThai);
  nhapSao(base.palaces, viTriBatToa, STARS.saoBatToa);

  const viTriAnQuang = dichCung(viTriVanXuong, lunar.day - 2);
  const viTriThienQuy = dichCung(2, 2 - viTriAnQuang);
  const viTriThienKhoi = timThienKhoi(canChiBase.canNam);
  const viTriThienViet = dichCung(5, 5 - viTriThienKhoi);
  const viTriThienHu = dichCung(7, canChiBase.chiNam - 1);
  const viTriThienKhoc = dichCung(7, -canChiBase.chiNam + 1);
  const viTriThienTai = dichCung(base.cungMenh, canChiBase.chiNam - 1);
  const viTriThienTho = dichCung(base.cungThan, canChiBase.chiNam - 1);
  const viTriHongLoan = dichCung(4, -canChiBase.chiNam + 1);
  const viTriThienHy = dichCung(viTriHongLoan, 6);
  const [viTriThienQuan, viTriThienPhuc] = timThienQuanThienPhuc(canChiBase.canNam);
  const viTriThienHinh = dichCung(10, adjustedMonthForStars - 1);
  const viTriThienRieu = dichCung(viTriThienHinh, 4);
  const viTriCoThan = timCoThan(canChiBase.chiNam);
  const viTriQuaTu = dichCung(viTriCoThan, -4);
  const viTriVanTinh = dichCung(viTriKinhDuong, 2);
  const viTriDuongPhu = dichCung(viTriVanTinh, 2);
  const viTriQuocAn = dichCung(viTriDuongPhu, 3);
  const viTriThaiPhu = dichCung(viTriVanKhuc, 2);
  const viTriPhongCao = dichCung(viTriVanKhuc, -2);
  const viTriThienGiai = dichCung(9, adjustedMonthForStars * 2 - 2);
  const viTriDiaGiai = dichCung(viTriTaPhu, 3);
  const viTriThienMa = timThienMa(canChiBase.chiNam);
  const viTriHoaCai = dichCung(viTriThienMa, 2);
  const viTriKiepSat = dichCung(viTriThienMa, 3);
  const viTriDaoHoa = dichCung(viTriKiepSat, 4);
  const viTriPhaToai = timPhaToai(canChiBase.chiNam);
  const viTriDauQuan = dichCung(canChiBase.chiNam, -adjustedMonthForStars + input.hour);

  nhapSao(base.palaces, viTriAnQuang, STARS.saoAnQuang);
  nhapSao(base.palaces, viTriThienQuy, STARS.saoThienQuy);
  nhapSao(base.palaces, viTriThienKhoi, STARS.saoThienKhoi);
  nhapSao(base.palaces, viTriThienViet, STARS.saoThienViet);
  nhapSao(base.palaces, viTriThienHu, STARS.saoThienHu);
  nhapSao(base.palaces, viTriThienKhoc, STARS.saoThienKhoc);
  nhapSao(base.palaces, viTriThienTai, STARS.saoThienTai);
  nhapSao(base.palaces, viTriThienTho, STARS.saoThienTho);
  nhapSao(base.palaces, viTriHongLoan, STARS.saoHongLoan);
  nhapSao(base.palaces, viTriThienHy, STARS.saoThienHy);
  nhapSao(base.palaces, viTriThienQuan, STARS.saoThienQuan);
  nhapSao(base.palaces, viTriThienPhuc, STARS.saoThienPhuc);
  nhapSao(base.palaces, viTriThienHinh, STARS.saoThienHinh);
  nhapSao(base.palaces, viTriThienRieu, STARS.saoThienRieu, STARS.saoThienY);
  nhapSao(base.palaces, viTriCoThan, STARS.saoCoThan);
  nhapSao(base.palaces, viTriQuaTu, STARS.saoQuaTu);
  nhapSao(base.palaces, viTriVanTinh, STARS.saoVanTinh);
  nhapSao(base.palaces, viTriDuongPhu, STARS.saoDuongPhu);
  nhapSao(base.palaces, viTriQuocAn, STARS.saoQuocAn);
  nhapSao(base.palaces, viTriThaiPhu, STARS.saoThaiPhu);
  nhapSao(base.palaces, viTriPhongCao, STARS.saoPhongCao);
  nhapSao(base.palaces, viTriThienGiai, STARS.saoThienGiai);
  nhapSao(base.palaces, viTriDiaGiai, STARS.saoDiaGiai);
  nhapSao(base.palaces, 5, STARS.saoThienLa);
  nhapSao(base.palaces, 11, STARS.saoDiaVong);
  nhapSao(base.palaces, base.cungNoboc, STARS.saoThienThuong);
  nhapSao(base.palaces, base.cungTatAch, STARS.saoThienSu);
  nhapSao(base.palaces, viTriThienMa, STARS.saoThienMa);
  nhapSao(base.palaces, viTriHoaCai, STARS.saoHoaCai);
  nhapSao(base.palaces, viTriKiepSat, STARS.saoKiepSat);
  nhapSao(base.palaces, viTriDaoHoa, STARS.saoDaoHoa);
  nhapSao(base.palaces, viTriPhaToai, STARS.saoPhaToai);
  nhapSao(base.palaces, viTriDauQuan, STARS.saoDauQuan);

  const [viTriHoaLoc, viTriHoaQuyen, viTriHoaKhoa, viTriHoaKy] = anTuHoa(canChiBase.canNam, {
    viTriLiemTrinh,
    viTriPhaQuan,
    viTriVuKhuc,
    vitriThaiDuong,
    viTriThienCo,
    viTriThienLuong,
    viTriTuVi,
    viTriThaiAm,
    viTriThienDong,
    viTriVanXuong,
    viTriCuMon,
    viTriThamLang,
    viTriHuuBat,
    viTriVanKhuc,
    viTriThienPhu,
  });
  nhapSao(base.palaces, viTriHoaLoc, STARS.saoHoaLoc);
  nhapSao(base.palaces, viTriHoaQuyen, STARS.saoHoaQuyen);
  nhapSao(base.palaces, viTriHoaKhoa, STARS.saoHoaKhoa);
  nhapSao(base.palaces, viTriHoaKy, STARS.saoHoaKy);

  const [viTriLuuHa, viTriThienTru] = timLuuTru(canChiBase.canNam);
  nhapSao(base.palaces, viTriLuuHa, STARS.saoLuuHa);
  nhapSao(base.palaces, viTriThienTru, STARS.saoThienTru);

  const ketThucTuan = dichCung(canChiBase.chiNam, 10 - canChiBase.canNam);
  nhapTuan(base.palaces, dichCung(ketThucTuan, 1), dichCung(ketThucTuan, 2));
  const [viTriTriet1, viTriTriet2] = timTriet(canChiBase.canNam);
  nhapTriet(base.palaces, viTriTriet1, viTriTriet2);

  return {
    palaces: base.palaces,
    birthInfo: {
      name: input.name,
      day: lunar.day,
      month: lunar.month,
      year: lunar.year,
      hour: input.hour,
      gender: input.gender,
      isLeapMonth: lunar.isLeapMonth,
      calendarType: input.calendarType,
      birthDaySolar: lunar.originalSolar,
    },
    canChiInfo: {
      canNam: canChiBase.canNam,
      chiNam: canChiBase.chiNam,
      canThang: canChiBase.canThang,
      chiThang: canChiBase.chiThang,
      canNgay: canChiBase.canNgay,
      chiNgay: canChiBase.chiNgay,
      canGio,
      chiGio,
    },
    cuc: cucSo,
    menhPalace: base.cungMenh,
    thanPalace: base.cungThan,
  };
};

export const verifyEngine = (): boolean => {
  if (!verifyCalendar()) {
    return false;
  }

  const checks = [
    generateChart({ day: 24, month: 10, year: 1991, hour: 4, gender: 1, calendarType: 'duongLich', name: 'Mốc 1991' }),
    generateChart({ day: 29, month: 8, year: 1987, hour: 7, gender: -1, calendarType: 'duongLich', name: 'Mốc 1987' }),
    generateChart({ day: 1, month: 1, year: 2000, hour: 1, gender: 1, calendarType: 'duongLich', name: 'Mốc 2000' }),
  ];

  return checks.every((chart) => chart.palaces.length === 12 && chart.palaces.every((palace) => palace.cungSao.length > 0));
};
