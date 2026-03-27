import { describe, expect, it } from 'vitest';
import { DIA_CHI, NGU_HANH_MAP, PALACE_NAMES, STARS, THIEN_CAN } from './constants';

describe('constants', () => {
  it('provides complete stem and branch definitions', () => {
    expect(THIEN_CAN).toHaveLength(11);
    expect(DIA_CHI).toHaveLength(13);
    expect(THIEN_CAN[1]?.tenCan).toBe('Giáp');
    expect(DIA_CHI[1]?.tenChi).toBe('Tý');
  });

  it('maps five elements to display metadata', () => {
    expect(NGU_HANH_MAP.K.name).toBe('Kim');
    expect(NGU_HANH_MAP.H.cuc).toBe(6);
  });

  it('defines 12 palace roles and core stars', () => {
    expect(PALACE_NAMES).toHaveLength(12);
    expect(STARS.saoTuVi.saoTen).toBe('Tử vi');
    expect(Object.keys(STARS).length).toBeGreaterThanOrEqual(80);
  });
});