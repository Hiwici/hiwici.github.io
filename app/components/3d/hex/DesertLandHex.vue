<script setup lang="ts">
import { Vector3 } from 'three'

/** Props */
interface Props {
  position: [number, number, number]
  type?: 'cactus'
  count?: number
  radius?: number
}
const props = withDefaults(defineProps<Props>(), {
  type: 'cactus',
  count: 2,
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

    const cylinderSize = getCylinderSize()
    const cylinderHeight = getCylinderHeight()

    const position = new Vector3(x, cylinderHeight / 2.5, z)
    const scale = new Vector3(baseScale, baseScale, baseScale)

    items.push({ position, scale, cylinderSize, cylinderHeight })
  }
  return items
})

/**
 * Returns a random cylinder size within the defined range.
 */
const getCylinderSize = () => {
  const min = 0.08
  const max = 0.18
  return Math.random() * (max - min) + min
}
/**
 * Returns a random cylinder height within the defined range.
 */
const getCylinderHeight = () => {
  const min = 0.6
  const max = 1.2
  return Math.random() * (max - min) + min
}
</script>

<template>
  <TresGroup
    v-for="(item, idx) in computedItemPositions"
    :key="idx"
    :position="item.position"
    :scale="item.scale"
  >
    <TresMesh cast-shadow>
      <TresCylinderGeometry
        :args="[item.cylinderSize, item.cylinderSize, item.cylinderHeight, 8]"
      />
      <!-- <TresCylinderGeometry :args="[0.08, 0.08, 0.6, 8]" /> -->
      <TresMeshToonMaterial color="#15803d" />
    </TresMesh>
  </TresGroup>
</template>
