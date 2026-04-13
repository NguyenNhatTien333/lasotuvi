import type { DiaChi, Element, PalaceName, Star, ThienCan } from './types';

/**
 * Five elements mapping to CSS classes and additional metadata
 */
export const NGU_HANH_MAP: Record<Element, { name: string; css: string; cuc?: number }> = {
  K: { name: 'Kim', css: 'text-kim', cuc: 4 },
  M: { name: 'Mộc', css: 'text-moc', cuc: 3 },
  T: { name: 'Thủy', css: 'text-thuy', cuc: 2 },
  H: { name: 'Hỏa', css: 'text-hoa', cuc: 6 },
  O: { name: 'Thổ', css: 'text-tho', cuc: 5 },
};

/**
 * Nạp Âm entry for each of the 30 sexagenary pairs
 */
export interface NapAmEntry {
  ten: string;       // e.g. "Hải Trung Kim"
  yNghia: string;    // e.g. "Vàng dưới biển"
  nguHanh: Element;  // K | M | T | H | O
}

/**
 * 30 Nạp Âm names in sexagenary order (index = floor(sexagenary_index / 2))
 * sexagenary_index is the 0-based position in the 60-year cycle starting from Giáp Tý.
 */
export const NAP_AM_NAMES: NapAmEntry[] = [
  { ten: 'Hải Trung Kim',     yNghia: 'Vàng dưới biển',       nguHanh: 'K' }, // 0  Giáp Tý   / Ất Sửu
  { ten: 'Lộ Trung Hỏa',     yNghia: 'Lửa trong lò',          nguHanh: 'H' }, // 1  Bính Dần  / Đinh Mão
  { ten: 'Đại Lâm Mộc',      yNghia: 'Cây trong rừng lớn',    nguHanh: 'M' }, // 2  Mậu Thìn  / Kỷ Tỵ
  { ten: 'Lộ Bàng Thổ',      yNghia: 'Đất giữa đường',        nguHanh: 'O' }, // 3  Canh Ngọ  / Tân Mùi
  { ten: 'Kiếm Phong Kim',    yNghia: 'Vàng đầu mũi kiếm',    nguHanh: 'K' }, // 4  Nhâm Thân / Quý Dậu
  { ten: 'Sơn Đầu Hỏa',      yNghia: 'Lửa trên núi',          nguHanh: 'H' }, // 5  Giáp Tuất / Ất Hợi
  { ten: 'Giản Hạ Thủy',     yNghia: 'Nước dưới khe',         nguHanh: 'T' }, // 6  Bính Tý   / Đinh Sửu
  { ten: 'Thành Đầu Thổ',    yNghia: 'Đất trên thành',        nguHanh: 'O' }, // 7  Mậu Dần   / Kỷ Mão
  { ten: 'Bạch Lạp Kim',     yNghia: 'Vàng trong nến rắn',    nguHanh: 'K' }, // 8  Canh Thìn / Tân Tỵ
  { ten: 'Dương Liễu Mộc',   yNghia: 'Cây dương liễu',        nguHanh: 'M' }, // 9  Nhâm Ngọ  / Quý Mùi
  { ten: 'Tuyền Trung Thủy', yNghia: 'Nước trong suối',       nguHanh: 'T' }, // 10 Giáp Thân / Ất Dậu
  { ten: 'Ốc Thượng Thổ',    yNghia: 'Đất trên nóc nhà',      nguHanh: 'O' }, // 11 Bính Tuất / Đinh Hợi
  { ten: 'Tích Lịch Hỏa',    yNghia: 'Lửa sấm sét',           nguHanh: 'H' }, // 12 Mậu Tý   / Kỷ Sửu
  { ten: 'Tùng Bách Mộc',    yNghia: 'Cây tùng bách',         nguHanh: 'M' }, // 13 Canh Dần  / Tân Mão
  { ten: 'Trường Lưu Thủy',  yNghia: 'Dòng nước lớn',         nguHanh: 'T' }, // 14 Nhâm Thìn / Quý Tỵ
  { ten: 'Sa Trung Kim',      yNghia: 'Vàng trong cát',        nguHanh: 'K' }, // 15 Giáp Ngọ  / Ất Mùi
  { ten: 'Sơn Hạ Hỏa',       yNghia: 'Lửa dưới chân núi',    nguHanh: 'H' }, // 16 Bính Thân / Đinh Dậu
  { ten: 'Bình Địa Mộc',     yNghia: 'Cây ở đồng bằng',       nguHanh: 'M' }, // 17 Mậu Tuất  / Kỷ Hợi
  { ten: 'Bích Thượng Thổ',  yNghia: 'Đất trên vách',         nguHanh: 'O' }, // 18 Canh Tý   / Tân Sửu
  { ten: 'Kim Bạch Kim',      yNghia: 'Vàng pha bạch kim',     nguHanh: 'K' }, // 19 Nhâm Dần  / Quý Mão
  { ten: 'Phú Đăng Hỏa',     yNghia: 'Lửa đèn dầu',           nguHanh: 'H' }, // 20 Giáp Thìn / Ất Tỵ
  { ten: 'Thiên Hà Thủy',    yNghia: 'Nước trên trời',        nguHanh: 'T' }, // 21 Bính Ngọ  / Đinh Mùi
  { ten: 'Đại Dịch Thổ',     yNghia: 'Đất khu lớn',           nguHanh: 'O' }, // 22 Mậu Thân  / Kỷ Dậu
  { ten: 'Thoa Xuyến Kim',   yNghia: 'Vàng trang sức',        nguHanh: 'K' }, // 23 Canh Tuất / Tân Hợi
  { ten: 'Tang Đố Mộc',      yNghia: 'Gỗ cây dâu',            nguHanh: 'M' }, // 24 Nhâm Tý   / Quý Sửu
  { ten: 'Đại Khê Thủy',     yNghia: 'Nước khe lớn',          nguHanh: 'T' }, // 25 Giáp Dần  / Ất Mão
  { ten: 'Sa Trung Thổ',     yNghia: 'Đất lẫn trong cát',     nguHanh: 'O' }, // 26 Bính Thìn / Đinh Tỵ
  { ten: 'Thiên Thượng Hỏa', yNghia: 'Lửa trên trời',         nguHanh: 'H' }, // 27 Mậu Ngọ   / Kỷ Mùi
  { ten: 'Thạch Lựu Mộc',   yNghia: 'Cây thạch lựu',         nguHanh: 'M' }, // 28 Canh Thân / Tân Dậu
  { ten: 'Đại Hải Thủy',    yNghia: 'Nước đại dương',         nguHanh: 'T' }, // 29 Nhâm Tuất / Quý Hợi
];

/**
 * Heavenly Stems (Thiên Can) - 10 stems, 1-based indexed
 * Index 0 is placeholder for direct mapping from original Python arrays
 */
export const THIEN_CAN: Array<ThienCan | null> = [
  null,
  { id: 1, chuCaiDau: 'G', tenCan: 'Giáp', nguHanh: 'M', nguHanhID: 2, vitriDiaBan: 3, amDuong: 1 },
  { id: 2, chuCaiDau: 'A', tenCan: 'Ất', nguHanh: 'M', nguHanhID: 2, vitriDiaBan: 4, amDuong: -1 },
  { id: 3, chuCaiDau: 'B', tenCan: 'Bính', nguHanh: 'H', nguHanhID: 4, vitriDiaBan: 6, amDuong: 1 },
  { id: 4, chuCaiDau: 'D', tenCan: 'Đinh', nguHanh: 'H', nguHanhID: 4, vitriDiaBan: 7, amDuong: -1 },
  { id: 5, chuCaiDau: 'M', tenCan: 'Mậu', nguHanh: 'O', nguHanhID: 5, vitriDiaBan: 6, amDuong: 1 },
  { id: 6, chuCaiDau: 'K', tenCan: 'Kỷ', nguHanh: 'O', nguHanhID: 5, vitriDiaBan: 7, amDuong: -1 },
  { id: 7, chuCaiDau: 'C', tenCan: 'Canh', nguHanh: 'K', nguHanhID: 1, vitriDiaBan: 9, amDuong: 1 },
  { id: 8, chuCaiDau: 'T', tenCan: 'Tân', nguHanh: 'K', nguHanhID: 1, vitriDiaBan: 10, amDuong: -1 },
  { id: 9, chuCaiDau: 'N', tenCan: 'Nhâm', nguHanh: 'T', nguHanhID: 3, vitriDiaBan: 12, amDuong: 1 },
  { id: 10, chuCaiDau: 'Q', tenCan: 'Quý', nguHanh: 'T', nguHanhID: 3, vitriDiaBan: 1, amDuong: -1 },
];

/**
 * Earthly Branches (Địa Chi) - 12 branches, 1-based indexed
 * Index 0 is placeholder for direct mapping from original Python arrays
 */
export const DIA_CHI: Array<DiaChi | null> = [
  null,
  { id: 1, tenChi: 'Tý', tenHanh: 'T', menhChu: 'Tham lang', thanChu: 'Hỏa tinh', amDuong: 1 },
  { id: 2, tenChi: 'Sửu', tenHanh: 'O', menhChu: 'Cự môn', thanChu: 'Thiên tướng', amDuong: -1 },
  { id: 3, tenChi: 'Dần', tenHanh: 'M', menhChu: 'Lộc tồn', thanChu: 'Thiên lương', amDuong: 1 },
  { id: 4, tenChi: 'Mão', tenHanh: 'M', menhChu: 'Văn khúc', thanChu: 'Thiên đồng', amDuong: -1 },
  { id: 5, tenChi: 'Thìn', tenHanh: 'O', menhChu: 'Liêm trinh', thanChu: 'Văn xương', amDuong: 1 },
  { id: 6, tenChi: 'Tỵ', tenHanh: 'H', menhChu: 'Vũ khúc', thanChu: 'Thiên cơ', amDuong: -1 },
  { id: 7, tenChi: 'Ngọ', tenHanh: 'H', menhChu: 'Phá quân', thanChu: 'Linh tinh', amDuong: 1 },
  { id: 8, tenChi: 'Mùi', tenHanh: 'O', menhChu: 'Vũ khúc', thanChu: 'Thiên tướng', amDuong: -1 },
  { id: 9, tenChi: 'Thân', tenHanh: 'K', menhChu: 'Liêm trinh', thanChu: 'Thiên lương', amDuong: 1 },
  { id: 10, tenChi: 'Dậu', tenHanh: 'K', menhChu: 'Văn khúc', thanChu: 'Thiên đồng', amDuong: -1 },
  { id: 11, tenChi: 'Tuất', tenHanh: 'O', menhChu: 'Lộc tồn', thanChu: 'Văn xương', amDuong: 1 },
  { id: 12, tenChi: 'Hợi', tenHanh: 'T', menhChu: 'Cự môn', thanChu: 'Thiên cơ', amDuong: -1 },
];

/**
 * Palace names in order (1-12)
 * Traditional order: Mệnh, Phụ mẫu, Phúc đức, Điền trạch, Quan lộc, Nô bộc,
 * Thiên di, Tật ách, Tài bạch, Tử tức, Phu thê, Huynh đệ
 */
export const PALACE_NAMES: PalaceName[] = [
  'Mệnh',
  'Phụ mẫu',
  'Phúc đức',
  'Điền trạch',
  'Quan lộc',
  'Nô bộc',
  'Thiên di',
  'Tật ách',
  'Tài bạch',
  'Tử tức',
  'Phu thê',
  'Huynh đệ',
];

/**
 * Helper to create a star object with CSS class derived from element
 */
const createStar = (
  saoID: number,
  saoTen: string,
  saoNguHanh: Element,
  saoLoai = 2,
  saoPhuongVi = '',
  saoAmDuong?: 1 | -1,
  vongTrangSinh: 0 | 1 = 0,
): Star => ({
  saoID,
  saoTen,
  saoNguHanh,
  saoLoai: saoLoai as Star['saoLoai'],
  saoPhuongVi,
  saoAmDuong,
  vongTrangSinh,
  cssSao: NGU_HANH_MAP[saoNguHanh].css,
  saoDacTinh: null,
});

/**
 * Core star definitions (110+ stars)
 * This is the central star database used by the engine
 */
export const STARS = {
  // Tử Vi system
  saoTuVi: createStar(1, 'Tử vi', 'O', 1, 'Đế tinh', 1),
  saoLiemTrinh: createStar(2, 'Liêm trinh', 'H', 1, 'Bắc đẩu tinh', 1),
  saoThienDong: createStar(3, 'Thiên đồng', 'T', 1, 'Bắc đẩu tinh', 1),
  saoVuKhuc: createStar(4, 'Vũ khúc', 'K', 1, 'Bắc đẩu tinh', -1),
  saoThaiDuong: createStar(5, 'Thái Dương', 'H', 1, 'Nam đẩu tinh', 1),
  saoThienCo: createStar(6, 'Thiên cơ', 'M', 1, 'Nam đẩu tinh', -1),

  // Thiên phủ system
  saoThienPhu: createStar(7, 'Thiên phủ', 'O', 1, 'Nam đẩu tinh', 1),
  saoThaiAm: createStar(8, 'Thái âm', 'T', 1, 'Bắc đẩu tinh', -1),
  saoThamLang: createStar(9, 'Tham lang', 'T', 1, 'Bắc đẩu tinh', -1),
  saoCuMon: createStar(10, 'Cự môn', 'T', 1, 'Bắc đẩu tinh', -1),
  saoThienTuong: createStar(11, 'Thiên tướng', 'T', 1, 'Nam đẩu tinh', 1),
  saoThienLuong: createStar(12, 'Thiên lương', 'M', 1, 'Nam đẩu tinh', -1),
  saoThatSat: createStar(13, 'Thất sát', 'K', 1, 'Nam đẩu tinh', 1),
  saoPhaQuan: createStar(14, 'Phá quân', 'T', 1, 'Bắc đẩu tinh', -1),

  // Vòng Địa chi - Thái tuế
  saoThaiTue: createStar(15, 'Thái tuế', 'H', 15),
  saoThieuDuong: createStar(16, 'Thiếu dương', 'H', 5),
  saoTangMon: createStar(17, 'Tang môn', 'M', 12),
  saoThieuAm: createStar(18, 'Thiếu âm', 'T', 5),
  saoQuanPhu3: createStar(19, 'Quan phù', 'H', 12),
  saoTuPhu: createStar(20, 'Tử phù', 'K', 12),
  saoTuePha: createStar(21, 'Tuế phá', 'H', 12),
  saoLongDuc: createStar(22, 'Long đức', 'T', 5),
  saoBachHo: createStar(23, 'Bạch hổ', 'K', 12),
  saoPhucDuc: createStar(24, 'Phúc đức', 'O', 5),
  saoDieuKhach: createStar(25, 'Điếu khách', 'H', 12),
  saoTrucPhu: createStar(26, 'Trực phù', 'K', 16),

  // Vòng Thiên can - Lộc tồn
  saoLocTon: createStar(27, 'Lộc tồn', 'O', 3, 'Bắc đẩu tinh'),
  saoLucSi: createStar(28, 'Lực sĩ', 'H', 2),
  saoThanhLong: createStar(29, 'Thanh long', 'T', 5),
  saoTieuHao: createStar(30, 'Tiểu hao', 'H', 12),
  saoTuongQuan: createStar(31, 'Tướng quân', 'M', 4),
  saoTauThu: createStar(32, 'Tấu thư', 'K', 3),
  saoPhiLiem: createStar(33, 'Phi liêm', 'H', 2),
  saoHyThan: createStar(34, 'Hỷ thần', 'H', 5),
  saoBenhPhu: createStar(35, 'Bệnh phù', 'O', 12),
  saoDaiHao: createStar(36, 'Đại hao', 'H', 12),
  saoPhucBinh: createStar(37, 'Phục binh', 'H', 13),
  saoQuanPhu2: createStar(38, 'Quan phù', 'H', 12),
  saoBacSy: createStar(109, 'Bác sỹ', 'T', 5),

  // Vòng Tràng sinh
  saoTrangSinh: createStar(39, 'Tràng sinh', 'T', 5, '', undefined, 1),
  saoMocDuc: createStar(40, 'Mộc dục', 'T', 14, '', undefined, 1),
  saoQuanDoi: createStar(41, 'Quan đới', 'K', 4, '', undefined, 1),
  saoLamQuan: createStar(42, 'Lâm quan', 'K', 7, '', undefined, 1),
  saoDeVuong: createStar(43, 'Đế vượng', 'K', 5, '', undefined, 1),
  saoSuy: createStar(44, 'Suy', 'T', 12, '', undefined, 1),
  saoBenh: createStar(45, 'Bệnh', 'H', 12, '', undefined, 1),
  saoTu: createStar(46, 'Tử', 'H', 12, '', undefined, 1),
  saoMo: createStar(47, 'Mộ', 'O', 2, '', undefined, 1),
  saoTuyet: createStar(48, 'Tuyệt', 'O', 12, '', undefined, 1),
  saoThai: createStar(49, 'Thai', 'O', 14, '', undefined, 1),
  saoDuong: createStar(50, 'Dưỡng', 'M', 2, '', undefined, 1),

  // Lục sát and important auxiliary stars
  saoDaLa: createStar(51, 'Đà la', 'K', 11),
  saoKinhDuong: createStar(52, 'Kình dương', 'K', 11),
  saoDiaKhong: createStar(53, 'Địa không', 'H', 11),
  saoDiaKiep: createStar(54, 'Địa kiếp', 'H', 11),
  saoLinhTinh: createStar(55, 'Linh tinh', 'H', 11),
  saoHoaTinh: createStar(56, 'Hỏa tinh', 'H', 11),

  // Sao Âm Dương
  saoVanXuong: createStar(57, 'Văn xương', 'K', 6),
  saoVanKhuc: createStar(58, 'Văn Khúc', 'T', 6),
  saoThienKhoi: createStar(59, 'Thiên khôi', 'H', 6),
  saoThienViet: createStar(60, 'Thiên việt', 'H', 6),
  saoTaPhu: createStar(61, 'Tả phù', 'O', 2),
  saoHuuBat: createStar(62, 'Hữu bật', 'O', 2),
  saoLongTri: createStar(63, 'Long trì', 'T', 3),
  saoPhuongCac: createStar(64, 'Phượng các', 'O', 3),
  saoTamThai: createStar(65, 'Tam thai', 'M', 7),
  saoBatToa: createStar(66, 'Bát tọa', 'T', 7),
  saoAnQuang: createStar(67, 'Ân quang', 'M', 3),
  saoThienQuy: createStar(68, 'Thiên quý', 'O', 3),

  // Other stars (continued in engine logic)
  saoThienKhoc: createStar(69, 'Thiên khốc', 'T', 12),
  saoThienHu: createStar(70, 'Thiên hư', 'T', 12),
  saoThienDuc: createStar(71, 'Thiên đức', 'H', 5),
  saoNguyetDuc: createStar(72, 'Nguyệt đức', 'H', 5),
  saoThienHinh: createStar(73, 'Thiên hình', 'H', 15),
  saoThienRieu: createStar(74, 'Thiên riêu', 'T', 13),
  saoThienY: createStar(75, 'Thiên y', 'T', 5),
  saoQuocAn: createStar(76, 'Quốc ấn', 'O', 6),
  saoDuongPhu: createStar(77, 'Đường phù', 'M', 4),
  saoDaoHoa: createStar(78, 'Đào hoa', 'M', 8),
  saoHongLoan: createStar(79, 'Hồng loan', 'T', 8),
  saoThienHy: createStar(80, 'Thiên hỷ', 'T', 5),
  saoThienGiai: createStar(81, 'Thiên giải', 'H', 5),
  saoDiaGiai: createStar(82, 'Địa giải', 'O', 5),
  saoGiaiThan: createStar(83, 'Giải thần', 'M', 5),
  saoThaiPhu: createStar(84, 'Thai phụ', 'K', 6),
  saoPhongCao: createStar(85, 'Phong cáo', 'O', 4),
  saoThienTai: createStar(86, 'Thiên tài', 'O', 2),
  saoThienTho: createStar(87, 'Thiên thọ', 'O', 5),
  saoThienThuong: createStar(88, 'Thiên thương', 'O', 12),
  saoThienSu: createStar(89, 'Thiên sứ', 'T', 12),
  saoThienLa: createStar(90, 'Thiên la', 'O', 12),
  saoDiaVong: createStar(91, 'Địa võng', 'O', 12),
  saoHoaKhoa: createStar(92, 'Hóa khoa', 'T', 5),
  saoHoaQuyen: createStar(93, 'Hóa quyền', 'T', 4),
  saoHoaLoc: createStar(94, 'Hóa lộc', 'M', 3),
  saoHoaKy: createStar(95, 'Hóa kỵ', 'T', 13),
  saoCoThan: createStar(96, 'Cô thần', 'O', 13),
  saoQuaTu: createStar(97, 'Quả tú', 'O', 13),
  saoThienMa: createStar(98, 'Thiên mã', 'H', 3),
  saoPhaToai: createStar(99, 'Phá toái', 'H', 12),
  saoThienQuan: createStar(100, 'Thiên quan', 'H', 5),
  saoThienPhuc: createStar(101, 'Thiên phúc', 'H', 5),
  saoLuuHa: createStar(102, 'Lưu hà', 'T', 12),
  saoThienTru: createStar(103, 'Thiên trù', 'O', 5),
  saoKiepSat: createStar(104, 'Kiếp sát', 'H', 11),
  saoHoaCai: createStar(105, 'Hoa cái', 'K', 14),
  saoVanTinh: createStar(106, 'Văn tinh', 'H', 6),
  saoDauQuan: createStar(107, 'Đẩu quân', 'H', 5),
  saoThienKhong: createStar(108, 'Thiên không', 'T', 11),
};

export type StarKey = keyof typeof STARS;
