<script setup lang="ts">
import { AdditiveBlending, Vector3 } from 'three'
import type { Points } from 'three'

/** Tres Composables */
const { onBeforeRender } = useLoop()

/** Composables */
const { timeState } = useTimeOfDay()

/** Tres Data */
// Build a night sky star field (1000 anime-style twinkling stars)
const starCount = 1000
const starPositions = new Float32Array(starCount * 3)

for (let i = 0; i < starCount; i++) {
  starPositions[i * 3] = (Math.random() - 0.5) * 200
  starPositions[i * 3 + 1] = Math.random() * 80 + 10 // Distributed in the upper sky
  starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200
}

/** Ref Element Properties */
const refElStars = ref<Points>()

onBeforeRender(({ elapsed }) => {
  if (refElStars.value) {
    refElStars.value.rotation.y = elapsed * 0.005 // Very slow star-field rotation
  }
})

/** Computed Properties */
const computedSunPosition = computed(() => {
  const { x, y, z } = timeState.sunPosition
  return new Vector3(x, y, z)
})
const computedSunColor = computed(() => timeState.sunColor)
const computedStarsOpacity = computed(() => timeState.starsOpacity)
</script>

<template>
  <TresGroup>
    <!-- 1. Dynamic sun / moon body -->
    <TresGroup :position="computedSunPosition">
      <TresMesh>
        <TresSphereGeometry :args="[3.5, 32, 32]" />
        <TresMeshBasicMaterial :color="computedSunColor" />
      </TresMesh>

      <!-- Two-layer sun/moon glow -->
      <TresMesh>
        <TresSphereGeometry :args="[4.8, 32, 32]" />
        <TresMeshBasicMaterial
          :color="computedSunColor"
          :transparent="true"
          :opacity="0.4"
          :blending="AdditiveBlending"
        />
      </TresMesh>
    </TresGroup>

    <!-- 2. Anime-style twinkling stars (opacity driven by timeState.starsOpacity) -->
    <TresPoints ref="refElStars">
      <TresBufferGeometry>
        <TresBufferAttribute attach="attributes-position" :args="[starPositions, 3]" />
      </TresBufferGeometry>
      <TresPointsMaterial
        color="#ffffff"
        :size="0.6"
        :transparent="true"
        :opacity="computedStarsOpacity"
        :blending="AdditiveBlending"
      />
    </TresPoints>
  </TresGroup>
</template>
