import type { Vector3 } from 'three/src/math/Vector3.js'

export type LocaleCode = 'en' | 'zh-Hans' | 'zh-Hant'

export type TimeMode = 'day' | 'sunset' | 'night'

export type TerrainType = 'grass_land' | 'desert_land' | 'snow_land' | 'forest_land'

export type HexModelType = 'about' | 'skills' | 'projects' | 'contact'

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

export interface HexData {
  key: string
  q: number // HEX coordinate q
  r: number // HEX coordinate r
  terrain_type: TerrainType
  type?: HexModelType
  title: string
  translatedTitle?: Record<LocaleCode, string>
  interactive: boolean
  showItem?: boolean
  showFoam?: boolean
}

export interface HexModalData {
  key: string
  title: string
  subtitle?: string
  type: HexModelType
}

export interface Option {
  key: string
  label: string
  value: string
}
