<script setup lang="ts">
import type { Mesh, PlaneGeometry, BufferAttribute } from 'three'
import { Vector3, DoubleSide } from 'three'

/** Ref Element Properties */
const refElPlane = ref<Mesh>()
const refElGeometry = ref<PlaneGeometry>()
const refBasePositions = ref<Float32Array | null>(null)
const refNormalFrameCounter = ref(0)

/** Tres Data */
const oceanPosition = new Vector3(0, -0.1, 0)
const WAVE_SPEED = 1.5
const WAVE_SCALE = 0.15
const WAVE_FREQUENCY_X = 0.3
const WAVE_FREQUENCY_Y = 0.3
const NORMAL_UPDATE_INTERVAL = 3

/** Tres Composables */
const { onBeforeRender } = useLoop()

// Dynamic vertex wave animation
onBeforeRender(({ elapsed }) => {
  if (!refElGeometry.value) return

  const positionAttribute = refElGeometry.value.attributes.position as BufferAttribute

  if (!refBasePositions.value) {
    // Keep an immutable copy of original vertex positions to avoid cumulative drift.
    refBasePositions.value = new Float32Array(positionAttribute.array as Float32Array)
  }

  const positions = positionAttribute.array as Float32Array
  const basePositions = refBasePositions.value

  for (let i = 0; i < positionAttribute.count; i++) {
    const index = i * 3
    const x = basePositions[index] ?? 0
    const y = basePositions[index + 1] ?? 0

    // Sine-wave algorithm (combines X and Y coordinates to calculate displacement)
    const wave = Math.sin(elapsed * WAVE_SPEED + x * WAVE_FREQUENCY_X + y * WAVE_FREQUENCY_Y) * WAVE_SCALE
    positions[index + 2] = wave
  }

  positionAttribute.needsUpdate = true

  // Recompute normals every few frames to keep the toon look while reducing CPU cost.
  refNormalFrameCounter.value += 1
  if (refNormalFrameCounter.value >= NORMAL_UPDATE_INTERVAL) {
    refElGeometry.value.computeVertexNormals()
    refNormalFrameCounter.value = 0
  }
})
</script>

<template>
  <TresMesh
    ref="refElPlane"
    :position="oceanPosition"
    :rotation="[-Math.PI / 2, 0, 0]"
    receive-shadow
  >
    <!-- Subdivided plane 40x40 balances wave quality and frame-time cost -->
    <TresPlaneGeometry ref="refElGeometry" :args="[300, 300, 40, 40]" />

    <!-- Light-blue toon material -->
    <TresMeshToonMaterial color="#38bdf8" :side="DoubleSide" />
  </TresMesh>
</template>
