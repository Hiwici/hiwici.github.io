<script setup lang="ts">
import { Vector3 } from 'three'

/** Props */
interface Props {
  position: [number, number, number]
  type?: 'snow_peaks'
  count?: number
  radius?: number
}
const props = withDefaults(defineProps<Props>(), {
  type: 'snow_peaks',
  count: 3,
  radius: 2,
})

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

    const position = new Vector3(x, 0.35, z)
    const scale = new Vector3(baseScale, baseScale * 1.5, baseScale)

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
    :rotation="[0, item.position.x, 0]"
    :scale="item.scale"
    cast-shadow
  >
    <TresConeGeometry :args="[0.3, 0.8, 5]" />
    <TresMeshToonMaterial color="#ffffff" />
  </TresMesh>
</template>
