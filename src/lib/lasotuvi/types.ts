/**
 * Type definitions for Lasotuvi astrology system
 */

// ===== ENUMS =====

/**
 * Five Elements (Ngũ hành)
 */
export type Element = 'K' | 'M' | 'T' | 'H' | 'O';
// K = Kim (Metal), M = Mộc (Wood), T = Thủy (Water), H = Hỏa (Fire), O = Thổ (Earth)

/**
 * Gender
 */
export type Gender = 1 | -1;  // 1 = Nam (Male), -1 = Nữ (Female)

/**
 * Yin / Yang (Âm Dương)
 */
export type YinYang = 1 | -1;  // 1 = Dương (Yang), -1 = Âm (Yin)

/**
 * Calendar type
 */
export type CalendarType = 'duongLich' | 'amLich';  // Solar or Lunar

/**
 * Star status (Đắc/Hãm)
 */
export type StarStatus = 'V' | 'M' | 'Đ' | 'B' | 'H' | null;
// V = Vượng (Prosperous), M = Miếu (Temple), Đ = Đắc (Auspicious), B = Bình (Neutral), H = Hãm (Weak)

/**
 * Star category
 */
export type StarCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 11 | 12 | 13 | 14 | 15 | 16;
// 1-8: Auspicious stars, 11-16: Inauspicious stars

/**
 * Cuc (Element power level)
 */
export type Cuc = 2 | 3 | 4 | 5 | 6;
// 2 = Thủy (Water), 3 = Mộc (Wood), 4 = Kim (Metal), 5 = Thổ (Earth), 6 = Hỏa (Fire)

// ===== INTERFACES =====

/**
 * Thiên Can (Heavenly Stem)
 */
export interface ThienCan {
  id: number;           // 1-10
  chuCaiDau: string;    // First letter abbreviation
  tenCan: string;       // Name (Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý)
  nguHanh: Element;     // Five element
  nguHanhID: number;    // Element ID (1=Kim, 2=Mộc, 3=Thủy, 4=Hỏa, 5=Thổ)
  vitriDiaBan: number;  // Position on the chart (1-12)
  amDuong: YinYang;     // Yin/Yang polarity
}

/**
 * Địa Chi (Earthly Branch)
 */
export interface DiaChi {
  id: number;          // 1-12
  tenChi: string;      // Name (Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi)
  tenHanh: Element;    // Five element
  menhChu: string;     // Destiny ruler star
  thanChu: string;     // Body ruler star
  amDuong: YinYang;    // Yin/Yang polarity
}

/**
 * Star (Sao)
 */
export interface Star {
  saoID: number;                    // Star ID
  saoTen: string;                   // Star name
  saoNguHanh: Element;              // Five element
  saoLoai: StarCategory;            // Star category (1-8 auspicious, 11-16 inauspicious)
  saoPhuongVi?: string;             // Direction (Bắc Đẩu, Nam Đẩu, etc.)
  saoAmDuong?: YinYang;             // Yin/Yang polarity (if applicable)
  vongTrangSinh?: 0 | 1;            // Belongs to Tràng sinh cycle (0=no, 1=yes)
  saoDacTinh?: StarStatus;          // Status in current palace (V/M/Đ/B/H)
  saoViTriCung?: number;            // Palace position (1-12)
  cssSao?: string;                  // CSS class for styling
}

/**
 * Palace (Cung)
 */
export interface Palace {
  cungID: number;                   // Palace ID (1-12, corresponds to địa chi)
  cungTen: string;                  // Palace name (Mệnh, Phụ mẫu, Phúc đức, etc.)
  cungChi: string;                  // Earthly branch of this palace
  cungAmDuong: YinYang;            // Yin/Yang of the palace
  cungNguHanh: Element;            // Five element of the palace
  cungSao: Star[];                  // Stars in this palace
  cungTrangSinh?: string;          // Tràng sinh lifecycle star (if any)
  daiHan?: number;                  // Major cycle year (Đại Hạn)
  tieuHan?: string;                 // Minor cycle year (Tiểu Hạn)
  nguyetHan?: string;               // Monthly cycle label (Nguyệt Hạn)
  isThan?: boolean;                 // Cung Thân marker
  tuanTrung?: boolean;              // Tuần marker
  trietLo?: boolean;                // Triệt marker
  palaceRole?: PalaceName;          // Functional role in the 12 houses
}

/**
 * Complete astrology chart (Lá số)
 */
export interface Chart {
  palaces: Palace[];                // 12 palaces (indexed 0-11, representing palaces 1-12)
  birthInfo: BirthInfo;            // Birth information
  canChiInfo: CanChiInfo;          // Can Chi information
  cuc: Cuc;                         // Cục (Element power level)
  menhPalace: number;              // Mệnh palace position (1-12)
  thanPalace: number;              // Thân palace position (1-12)
}

/**
 * Birth information
 */
export interface BirthInfo {
  name?: string;                    // Person's name (optional)
  day: number;                      // Lunar day
  month: number;                    // Lunar month
  year: number;                     // Lunar year
  viewYear: number;                 // Year being viewed (for age calculation)
  hour: number;                     // Hour (Earthly branch, 1-12)
  gender: Gender;                   // Gender (1=male, -1=female)
  isLeapMonth: boolean;            // Is birth month a leap month
  calendarType: CalendarType;      // Original input calendar type
  birthDaySolar?: {                // Original solar date (if input was solar)
    day: number;
    month: number;
    year: number;
  };
}

/**
 * Can Chi information
 */
export interface CanChiInfo {
  canNam: number;                  // Year stem (1-10)
  chiNam: number;                  // Year branch (1-12)
  canThang: number;                // Month stem (1-10)
  chiThang: number;                // Month branch (1-12)
  canNgay: number;                 // Day stem (1-10)
  chiNgay: number;                 // Day branch (1-12)
  canGio: number;                  // Hour stem (1-10)
  chiGio: number;                  // Hour branch (1-12)
}

/**
 * Lunar date result from calendar conversion
 */
export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeapMonth: boolean;
}

/**
 * Solar date
 */
export interface SolarDate {
  day: number;
  month: number;
  year: number;
}

/**
 * Input for chart generation
 */
export interface ChartInput {
  day: number;
  month: number;
  year: number;
  viewYear: number;
  hour: number;                    // 1-12 (Earthly branch)
  gender: Gender;
  calendarType: CalendarType;
  name?: string;
}

/**
 * Palace names mapping
 */
export type PalaceName = 
  | 'Mệnh'        // 1: Life/Fate
  | 'Phụ mẫu'     // 2: Parents
  | 'Phúc đức'    // 3: Blessings
  | 'Điền trạch'  // 4: Property
  | 'Quan lộc'    // 5: Career
  | 'Nô bộc'      // 6: Servants/Subordinates
  | 'Thiên di'    // 7: Travel/Migration
  | 'Tật ách'     // 8: Illness
  | 'Tài bạch'    // 9: Wealth
  | 'Tử tức'      // 10: Children
  | 'Phu thê'     // 11: Spouse
  | 'Huynh đệ';   // 12: Siblings
