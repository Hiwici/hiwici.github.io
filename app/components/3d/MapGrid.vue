<script setup lang="ts">
/** Components */
import BiomeHex from '~/components/3d/BiomeHex.vue'

/** Stores */
const mapStore = useMapStore()

/** Composables */
const { HEX_RADIUS, hexToWorld, findNearestHex, findShortestHexPath } = useHexData()
const { moveAlongPath, refIsMoving, refPosition } = useCharacterController()
const { openModal } = useHexModal()

/** Ref Properties */
const refSelectedHex = ref<HexData | null>(null)

/**
 * Handles the click event on a tile. Updates the selected tile ID and calculates the target world position.
 */
const handleHexClick = (hex: HexData) => {
  if (refIsMoving.value) return

  refSelectedHex.value = hex

  const hexList = mapStore.getHexData()
  const startHex = findNearestHex(refPosition.value, hexList)

  if (!startHex) return

  const hexPath = findShortestHexPath(hexList, startHex, hex)

  if (hexPath.length === 0) return

  // Calculate the target world coordinates
  // (which can be passed to character movement logic or camera focusing in the future).
  const pathWorldPositions = hexPath.slice(1).map((pathHex) => {
    return hexToWorld(pathHex.q, pathHex.r)
  })

  // Execute character movement animation, and trigger UI opening upon arrival.
  moveAlongPath(pathWorldPositions, () => {
    if (!hex.interactive || !hex.type) return

    openModal({
      key: hex.key,
      title: hex.title,
      subtitle: '',
      type: hex.type,
    })
  })
}
</script>

<template>
  <TresGroup>
    <BiomeHex
      v-for="(hex, hexIndex) in mapStore.getHexData()"
      :key="hexIndex"
      :hex="hex"
      :radius="HEX_RADIUS"
      @click="handleHexClick(hex)"
    />
  </TresGroup>
</template>
