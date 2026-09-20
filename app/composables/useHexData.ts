/** 1. Constant Data */
const HEX_RADIUS = 2
const HEX_DIRECTIONS: Array<[number, number]> = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
]

interface HexNode {
  key: string
  q: number
  r: number
}

const getAxialKey = (q: number, r: number) => {
  return `${q},${r}`
}

/**
 * Composable for managing hexagonal grid data and conversions.
 */
export const useHexData = () => {
  /**
   * Converts axial hex coordinates (q, r) to 3D world coordinates (x, y, z).
   * @param q The axial q coordinate of the hex.
   * @param r The axial r coordinate of the hex.
   * @returns A tuple representing the 3D world coordinates [x, y, z].
   */
  const hexToWorld = (q: number, r: number) => {
    const x = HEX_RADIUS * Math.sqrt(3) * (q + r / 2)
    const z = HEX_RADIUS * 1.5 * r
    return [x, 0, z] as [number, number, number]
  }

  /**
   * Returns the nearest hex from world position based on planar (x,z) distance.
   */
  const findNearestHex = <THex extends HexNode>(
    worldPos: [number, number, number],
    hexList: THex[],
  ) => {
    if (hexList.length === 0) return null

    const [worldX, , worldZ] = worldPos
    let nearestHex: THex | null = null
    let minDistance = Number.POSITIVE_INFINITY

    for (const hex of hexList) {
      const [hexX, , hexZ] = hexToWorld(hex.q, hex.r)
      const distance = Math.hypot(hexX - worldX, hexZ - worldZ)

      if (distance < minDistance) {
        minDistance = distance
        nearestHex = hex
      }
    }

    return nearestHex
  }

  /**
   * Find shortest path on existing hex tiles using BFS (uniform edge cost).
   */
  const findShortestHexPath = <THex extends HexNode>(
    hexList: THex[],
    startHex: THex,
    targetHex: THex,
  ) => {
    if (startHex.key === targetHex.key) return [startHex]

    const hexByAxialKey = new Map<string, THex>()

    for (const hex of hexList) {
      hexByAxialKey.set(getAxialKey(hex.q, hex.r), hex)
    }

    const startAxialKey = getAxialKey(startHex.q, startHex.r)
    const targetAxialKey = getAxialKey(targetHex.q, targetHex.r)

    if (!hexByAxialKey.has(startAxialKey) || !hexByAxialKey.has(targetAxialKey)) {
      return []
    }

    const queue: string[] = [startAxialKey]
    const visited = new Set<string>([startAxialKey])
    const previous = new Map<string, string | null>([[startAxialKey, null]])

    while (queue.length > 0) {
      const currentAxialKey = queue.shift()

      if (!currentAxialKey) continue
      if (currentAxialKey === targetAxialKey) break

      const currentHex = hexByAxialKey.get(currentAxialKey)

      if (!currentHex) continue

      for (const [dq, dr] of HEX_DIRECTIONS) {
        const nextAxialKey = getAxialKey(currentHex.q + dq, currentHex.r + dr)

        if (!hexByAxialKey.has(nextAxialKey) || visited.has(nextAxialKey)) {
          continue
        }

        visited.add(nextAxialKey)
        previous.set(nextAxialKey, currentAxialKey)
        queue.push(nextAxialKey)
      }
    }

    if (!visited.has(targetAxialKey)) {
      return []
    }

    const path: THex[] = []
    let cursor: string | null = targetAxialKey

    while (cursor) {
      const hex = hexByAxialKey.get(cursor)

      if (hex) {
        path.push(hex)
      }

      cursor = previous.get(cursor) ?? null
    }

    return path.reverse()
  }

  return { HEX_RADIUS, hexToWorld, findNearestHex, findShortestHexPath }
}
