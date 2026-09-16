<script setup lang="ts">
import { Vector3 } from 'three'
import { Billboard, Text3D } from '@tresjs/cientos'
/** Components */
import HexFoam from '../HexFoam.vue'

/** Props */
interface Props {
  hex: HexData
  topColor: string
  baseColor: string
  height?: number
  radius?: number
}
const props = withDefaults(defineProps<Props>(), {
  position: () => [0, 0, 0],
  radius: 2,
  showFoam: false,
})

/** Emits */
const emit = defineEmits<{
  (e: 'click'): void
}>()

/** Composables */
const { hexToWorld } = useHexData()
const { isHexModalOpen } = useHexModal()

/** Ref Properties */
const refIsHover = ref(false)

/** Tres Data */
const topCapHeight = 0.25

/**
 * Handles the pointer enter event on the hexagon. Sets the hover state to true and changes the cursor to a pointer.
 */
const handlePointerEnter = (e: PointerEvent) => {
  // Prevent the click event from propagating to parent elements
  e.stopPropagation()

  refIsHover.value = true
  document.body.style.cursor = 'pointer'
}

/**
 * Handles the pointer leave event on the hexagon. Sets the hover state to false and changes the cursor back to the default.
 */
const handlePointerLeave = () => {
  refIsHover.value = false
  document.body.style.cursor = 'default'
}

/**
 * Handles the click event on the hexagon. Prevents the event from propagating and emits a 'click' event.
 */
const handleClick = (e: PointerEvent) => {
  // Prevent the click event from propagating to parent elements
  e.stopPropagation()

  emit('click')
}

/**
 * Returns the text color based on the terrain type.
 */
const getTextColor = (terrain_type: TerrainType) => {
  switch (terrain_type) {
    case 'grass_land':
      return '#4ade80'
    case 'desert_land':
      return '#fb923c'
    case 'snow_land':
      return '#f8fafc'
    case 'forest_land':
      return '#15803d'
    default:
      return '#000000'
  }
}

/** Computed Properties */
const computedGroupPosition = computed(() => {
  return new Vector3(...hexToWorld(props.hex.q, props.hex.r))
})
// Calculate height offsets for layered geometry
const computedHexHeight = computed(() => props.height || 1)
const computedBaseHeight = computed(() => Math.max(0.05, computedHexHeight.value - topCapHeight))
// Position
const computedBaseCenterPosition = computed(() => {
  const centerY = computedBaseHeight.value / 2
  return new Vector3(0, centerY, 0)
})
const computedTopCapCenterPosition = computed(() => {
  const centerY = computedBaseHeight.value + topCapHeight / 2
  return new Vector3(0, centerY, 0)
})
</script>

<template>
  <TresGroup>
    <HexFoam
      v-if="props.hex.showFoam"
      :position="hexToWorld(props.hex.q, props.hex.r)"
      :radius="2"
    />

    <TresGroup
      :position="computedGroupPosition"
      @pointerenter="handlePointerEnter"
      @pointerleave="handlePointerLeave"
      @click="handleClick"
    >
      <!-- 1. BASE CLIFF / DIRT LAYER (Bottom Hex) -->
      <TresMesh :position="computedBaseCenterPosition" cast-shadow receive-shadow>
        <TresCylinderGeometry :args="[props.radius, props.radius, computedBaseHeight, 6]" />
        <TresMeshToonMaterial :color="props.baseColor" />
      </TresMesh>

      <!-- 2. TOP BIOME COVER (Grass / Sand / Snow Layer) -->
      <TresMesh :position="computedTopCapCenterPosition" cast-shadow receive-shadow>
        <!-- Slightly inset top radius (radius * 0.98) for stylized bevel edge -->
        <TresCylinderGeometry :args="[props.radius * 0.98, props.radius, topCapHeight, 6]" />
        <TresMeshToonMaterial :color="props.topColor" />
      </TresMesh>

      <Billboard v-if="props.hex.type && !isHexModalOpen" :position="[0, 1.2, 0]">
        <Text3D font="/fonts/helvetiker_regular.typeface.json" :text="props.hex.title" :size="0.5">
          <TresMeshStandardMaterial
            :color="getTextColor(props.hex.terrain_type)"
            :roughness="0.3"
          />
        </Text3D>
      </Billboard>

      <slot />
    </TresGroup>
  </TresGroup>
</template>
