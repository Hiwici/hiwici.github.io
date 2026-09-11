export interface TileData {
  id: string
  q: number // HEX coordinate q
  r: number // HEX coordinate r
  title: string
  type: 'home' | 'about' | 'skills' | 'projects' | 'contact'
  themeColor: string
  customProps?: string // 指定載入的 3D 模型
  details: {
    subtitle: string
    description: string
    tags: string[]
    characterExpression?: string
  }
}
