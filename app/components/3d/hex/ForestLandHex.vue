<script setup lang="ts">
import { Vector3 } from 'three'

/** Props */
interface Props {
  position: [number, number, number]
  type?: 'trees'
  count?: number
  radius?: number
}
const props = withDefaults(defineProps<Props>(), {
  type: 'trees',
  count: 4,
  radius: 2,
})

/** Tres Data */
const trunkPosition = new Vector3(0, 0.2, 0)
const foliageConePosition = new Vector3(0, 0.6, 0)

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

    const position = new Vector3(x, 0, z)
    const scale = new Vector3(baseScale, baseScale, baseScale)

    items.push({ position, scale })
  }
  return items
})
</script>

<template>
  <TresGroup
    v-for="(item, idx) in computedItemPositions"
    :key="idx"
    :position="item.position"
    :scale="item.scale"
  >
    <!-- Trunk -->
    <TresMesh :position="trunkPosition">
      <TresCylinderGeometry :args="[0.05, 0.08, 0.4, 6]" />
      <TresMeshToonMaterial color="#451a03" />
    </TresMesh>
    <!-- Foliage Cone -->
    <TresMesh :position="foliageConePosition" cast-shadow>
      <TresConeGeometry :args="[0.35, 0.8, 6]" />
      <TresMeshToonMaterial color="#166534" />
    </TresMesh>
  </TresGroup>
</template>
