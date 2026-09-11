<script setup lang="ts">
/** Components */
import CatanHex from './CatanHex.vue'

/** Interfaces */
interface TileData {
  id: string
  q: number // Hexagonal axial coordinate q
  r: number // Hexagonal axial coordinate r
  title: string
  color: string
}

/** Composables */
const { moveTo, refIsMoving } = useCharacterController()

/** Constant Data */
const HEX_RADIUS = 2 // Consistent with the top radius of CatanHex
const hexToWorld = (q: number, r: number): [number, number, number] => {
  const x = HEX_RADIUS * Math.sqrt(3) * (q + r / 2)
  const z = HEX_RADIUS * 1.5 * r
  return [x, 0, z]
}

/** Ref Properties */
const refTiles = ref<TileData[]>([
  { id: 'home', q: 0, r: 0, title: '起點 (Home)', color: '#4ade80' },
  { id: 'about', q: -1, r: 0, title: '關於我 (About)', color: '#f472b6' },
  { id: 'skills', q: 1, r: 0, title: '專業技能 (Skills)', color: '#60a5fa' },
  { id: 'projects', q: 1, r: -1, title: '作品集 (Projects)', color: '#fbbf24' },
  { id: 'contact', q: 0, r: -1, title: '聯絡方式 (Contact)', color: '#a78bfa' },
])
const refSelectedTileId = ref<string>('home')

/**
 * Handles the click event on a tile. Updates the selected tile ID and calculates the target world position.
 */
const handleTileClick = (tile: TileData) => {
  if (refIsMoving.value) return // 角色移動中時禁止切換

  refSelectedTileId.value = tile.id

  // Calculate the target world coordinates
  // (which can be passed to character movement logic or camera focusing in the future).
  const targetWorldPos = hexToWorld(tile.q, tile.r)
  console.log(`點擊了 ${tile.title}，目標座標：`, targetWorldPos)

  // 執行角色移動動畫，並在抵達後觸發 UI 打開
  moveTo(targetWorldPos, () => {
    console.log(`角色已抵達 ${tile.title}，打開詳細 UI！`)
    // TODO: 開啟 UI 雙欄視窗 (如 openModal(tile.id))
  })
}
</script>

<template>
  <TresGroup>
    <CatanHex
      v-for="tile in refTiles"
      :key="tile.id"
      :position="hexToWorld(tile.q, tile.r)"
      :title="tile.title"
      :color="tile.color"
      :is-selected="refSelectedTileId === tile.id"
      @click="handleTileClick(tile)"
    />
  </TresGroup>
</template>
