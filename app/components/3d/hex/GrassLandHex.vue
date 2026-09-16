<script setup lang="ts">
import { Vector3 } from 'three'

/** Props */
interface Props {
  position: [number, number, number]
  type?: 'flowers'
  count?: number
  radius?: number
}
const props = withDefaults(defineProps<Props>(), {
  type: 'flowers',
  count: 5,
  radius: 1.3,
})

/**
 * Get a random flower color from the predefined set of colors.
 */
const getFlowerColor = () => {
  const colors = ['#f43f5e', '#facc15', '#34d399', '#3b82f6']
  return colors[Math.floor(Math.random() * colors.length)]
}

/** Computed Properties */
const computedItemPositions = computed(() => {
  const items = []
  const itemRadius = props.radius * 0.65

  for (let i = 0; i < props.count; i++) {
    const angle = (i / props.count) * Math.PI * 2 + Math.random() * 0.5
    const dist = Math.random() * itemRadius
    const x = Math.cos(angle) * dist
    const z = Math.sin(angle) * dist
    const baseScale = 0.7 + Math.random() * 0.5

    const position = new Vector3(x, 0.1, z)
    const scale = new Vector3(baseScale, baseScale, baseScale)

    items.push({ position, scale })
  }
  return items
})
</script>

<template>
  <TresMesh
    v-for="(item, idx) in computedItemPositions"
    :key="idx"
    :position="item.position"
    :scale="item.scale"
  >
    <TresDodecahedronGeometry :args="[0.12]" />
    <TresMeshToonMaterial :color="getFlowerColor()" />
  </TresMesh>
</template>
