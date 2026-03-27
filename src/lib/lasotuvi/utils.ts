/**
 * Utility functions for Lasotuvi calculations
 * Core mathematical and helper functions
 */

/**
 * Critical modulo function that handles negative numbers correctly
 * JavaScript's % operator differs from Python for negative numbers
 * This ensures consistent behavior with the original Python implementation
 * 
 * @param n - The number to take modulo of
 * @param m - The modulus
 * @returns The result, always in range [0, m-1]
 * 
 * @example
 * mod(-1, 12) // returns 11 (not -1 like JavaScript's %)
 * mod(13, 12) // returns 1
 */
export const mod = (n: number, m: number): number => ((n % m) + m) % m;

/**
 * Convert 1-based index to 0-based index
 * Vietnamese astrological system uses 1-based indexing (1-12 for palaces, 1-10 for stems)
 * JavaScript arrays use 0-based indexing
 */
export const toZeroIndex = (oneBasedIndex: number): number => oneBasedIndex - 1;

/**
 * Convert 0-based index to 1-based index
 */
export const toOneIndex = (zeroBasedIndex: number): number => zeroBasedIndex + 1;

/**
 * Dịch cung: Shift palace position by given offsets
 * This is the core operation for positioning stars
 * Uses modulo 12 for the 12 palaces
 * 
 * @param basePalace - Starting palace position (1-12)
 * @param offsets - Variable number of offset values to add
 * @returns Final palace position (1-12)
 * 
 * @example
 * dichCung(1, 3) // returns 4 (palace 1 + 3 = palace 4)
 * dichCung(11, 3) // returns 2 (palace 11 + 3 wraps to palace 2)
 * dichCung(1, -3) // returns 10 (palace 1 - 3 wraps to palace 10)
 */
export const dichCung = (basePalace: number, ...offsets: number[]): number => {
  const totalOffset = offsets.reduce((sum, offset) => sum + offset, 0);
  const result = mod(basePalace - 1 + totalOffset, 12) + 1;
  return result;
};

/**
 * Check if a number is within a range (inclusive)
 */
export const inRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Get floor division (integer division)
 * JavaScript's / operator returns float, Python's // returns integer
 */
export const floorDiv = (a: number, b: number): number => Math.floor(a / b);
