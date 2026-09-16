/**
 * Restrict a numeric value to the provided minimum and maximum bounds.
 * @param value The numeric value to clamp.
 * @param min The minimum bound.
 * @param max The maximum bound.
 * @returns The clamped value.
 */
const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

export { clamp }
