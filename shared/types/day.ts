import type { Vector3 } from 'three/src/math/Vector3.js'

export type TimeMode = 'day' | 'sunset' | 'night'

// Scene properties used for time-of-day transitions
export interface TimeConfig {
  clearColor: string // Base color for sky and fog
  ambientColor: string // Ambient light color
  ambientIntensity: number // Ambient light intensity
  sunColor: string // Sun or primary light color
  sunIntensity: number // Primary light intensity
  sunPosition: Vector3 // Primary light 3D position
  oceanColor: string // Ocean surface color
  starsOpacity: number // Night-sky star opacity
}
