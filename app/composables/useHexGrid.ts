export const useHexGrid = () => {
  const HEX_RADIUS = 2 // HEX radius

  const hexToWorld = (q: number, r: number) => {
    const x = HEX_RADIUS * Math.sqrt(3) * (q + r / 2)
    const z = HEX_RADIUS * 1.5 * r
    return [x, 0, z] as [number, number, number]
  }

  return { hexToWorld }
}
