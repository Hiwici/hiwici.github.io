export type TerrainType = 'grass_land' | 'desert_land' | 'snow_land' | 'forest_land'
export type HexModelType = 'about' | 'skills' | 'projects' | 'contact'

export interface HexData {
  key: string
  q: number // HEX coordinate q
  r: number // HEX coordinate r
  terrain_type: TerrainType
  type?: HexModelType
  title: string
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
