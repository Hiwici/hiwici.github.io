<script setup lang="ts">
import { Vector3 } from 'three'
import { Html } from '@tresjs/cientos'
/** Components */
import BaseHex from '~/components/3d/hex/BaseHex.vue'
import DesertLandHex from '~/components/3d/hex/DesertLandHex.vue'
import ForestLandHex from '~/components/3d/hex/ForestLandHex.vue'
import GrassLandHex from '~/components/3d/hex/GrassLandHex.vue'
import SnowLandHex from '~/components/3d/hex/SnowLandHex.vue'

/** Props */
interface Props {
  hex: HexData
  height?: number
  radius?: number
}
const props = withDefaults(defineProps<Props>(), {
  height: 1,
  radius: 2,
})

/** Emits */
const emit = defineEmits<{
  (e: 'click'): void
}>()

/** Constant Data */
const COMPONENTS_MAP: Record<TerrainType, Component> = {
  grass_land: GrassLandHex,
  desert_land: DesertLandHex,
  snow_land: SnowLandHex,
  forest_land: ForestLandHex,
}

/** Stores */
const mapStore = useMapStore()

/** Composables */
const { hexToWorld } = useHexData()

/**
 * Handles the click event on the biome hexagon. Emits a 'click' event.
 */
const handleClick = () => {
  emit('click')
}

/** Computed Properties */
const computedItemPosition = computed(() => {
  return new Vector3(0, props.height, 0)
})
const computedBiome = computed(() => {
  return mapStore.getBiome(props.hex.terrain_type)
})
</script>

<template>
  <BaseHex
    :hex="props.hex"
    :top-color="computedBiome.topColor"
    :base-color="computedBiome.baseColor"
    :radius="props.radius"
    :height="props.height"
    @click="handleClick"
  >
    <TresGroup v-if="props.hex.showItem ?? true" :position="computedItemPosition">
      <component
        :is="COMPONENTS_MAP[props.hex.terrain_type]"
        :position="hexToWorld(props.hex.q, props.hex.r)"
        :radius="props.radius"
      />
    </TresGroup>
  </BaseHex>
</template>
