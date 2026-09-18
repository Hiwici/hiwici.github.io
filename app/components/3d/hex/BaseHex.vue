<script setup lang="ts">
import { Vector3, Group } from 'three'
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

/** Store */
const localeStore = useLocaleStore()

/** Tres Composables */
const { invalidate } = useTres()

/** Composables */
const { hexToWorld } = useHexData()
const { font } = useFont()

/** Ref Element Properties */
const refElText3DGroup = ref<Group>()

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
    case 'desert_land':
    case 'snow_land':
    case 'forest_land':
      return '#64748b'
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
const computedTitle = computed(() => {
  return props.hex.translatedTitle?.[localeStore.locale] || props.hex.title
})

watch(computedTitle, async () => {
  await nextTick()
  refElText3DGroup.value?.updateMatrixWorld(true)
  invalidate()
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
      <TresMesh :position="computedBaseCenterPosition" receive-shadow>
        <TresCylinderGeometry :args="[props.radius, props.radius, computedBaseHeight, 6]" />
        <TresMeshToonMaterial :color="props.baseColor" />
      </TresMesh>

      <!-- 2. TOP BIOME COVER (Grass / Sand / Snow Layer) -->
      <TresMesh :position="computedTopCapCenterPosition" receive-shadow>
        <!-- Slightly inset top radius (radius * 0.98) for stylized bevel edge -->
        <TresCylinderGeometry :args="[props.radius * 0.98, props.radius, topCapHeight, 6]" />
        <TresMeshToonMaterial :color="props.topColor" />
      </TresMesh>

      <TresGroup ref="refElText3DGroup">
        <Billboard v-if="props.hex.type" :position="[0, 1.5, 0]">
          <Text3D v-if="font" :key="computedTitle" :font="font" :text="computedTitle" :size="0.5">
            <TresMeshStandardMaterial
              :color="getTextColor(props.hex.terrain_type)"
              :roughness="0.3"
            />
          </Text3D>
        </Billboard>
      </TresGroup>

      <slot />
    </TresGroup>
  </TresGroup>
</template>
