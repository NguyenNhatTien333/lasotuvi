import { describe, expect, it } from 'vitest';
import { dichCung, floorDiv, inRange, mod, toOneIndex, toZeroIndex } from './utils';

describe('utils', () => {
  it('handles modulo with negative numbers like rotational palace math', () => {
    expect(mod(-1, 12)).toBe(11);
    expect(mod(13, 12)).toBe(1);
  });

  it('converts between one-based and zero-based indexes', () => {
    expect(toZeroIndex(1)).toBe(0);
    expect(toOneIndex(0)).toBe(1);
  });

  it('shifts palaces correctly with dichCung', () => {
    expect(dichCung(1, 3)).toBe(4);
    expect(dichCung(11, 3)).toBe(2);
    expect(dichCung(1, -3)).toBe(10);
    expect(dichCung(3, 1, -2, 12)).toBe(2);
  });

  it('supports range and floor helpers', () => {
    expect(inRange(7, 1, 12)).toBe(true);
    expect(inRange(13, 1, 12)).toBe(false);
    expect(floorDiv(11, 2)).toBe(5);
  });
});