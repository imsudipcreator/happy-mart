/**
 * Returns a random number between the given minimum and maximum values.
 * If only one value is given, it is used as the maximum value and the minimum value is set to 0.
 * @param {number} minOrMax - The minimum or maximum value.
 * @param {number} [max] - The maximum value.
 * @returns {number} A random number between the minimum and maximum values.
 */
export function random(minOrMax: number, max?: number): number {
  const actualMin = max === undefined ? 0 : minOrMax;
  const actualMax = max === undefined ? minOrMax : max;
  return Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin;
}
